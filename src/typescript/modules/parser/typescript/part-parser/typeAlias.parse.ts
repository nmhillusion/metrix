import ts from "typescript";
import { parseCommentFromNode } from "./comment.parse";
import { TsInterfaceModel, TsPropertyModel } from "../model";
import { parsePropertyFromNode } from "./property.parse";

export function parseTypeAliasFromNode(
  tsSourceFile: ts.SourceFile,
  typeAliasNode: ts.TypeAliasDeclaration | ts.TypeLiteralNode
): TsInterfaceModel {
  const propertyList: TsPropertyModel[] = [];

  // console.log({ interfNode });

  typeAliasNode.forEachChild((member) => {
    if (ts.isTypeLiteralNode(member)) {
      const typeLiteralNode: ts.TypeLiteralNode = member;
      propertyList.push(
        ...parseTypeAliasFromNode(tsSourceFile, typeLiteralNode).propertyList
      );
    } else if (ts.isPropertySignature(member)) {
      propertyList.push(parsePropertyFromNode(tsSourceFile, member));
    } else {
      console.log("other member kind: ", ts.SyntaxKind[member.kind]);
    }
  });

  return {
    interfaceName: ts.isTypeAliasDeclaration(typeAliasNode)
      ? typeAliasNode.name.escapedText.toString()
      : "",
    comments: parseCommentFromNode(tsSourceFile, typeAliasNode),
    propertyList,
  };
}
