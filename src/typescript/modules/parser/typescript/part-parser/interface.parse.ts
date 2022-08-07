import ts from "typescript";
import { parseCommentFromNode } from "./comment.parse";
import { TsInterfaceModel, TsPropertyModel } from "../model";
import { parsePropertyFromNode } from "./property.parse";

export function parseInterfaceFromNode(
  tsSourceFile: ts.SourceFile,
  interfNode: ts.InterfaceDeclaration
): TsInterfaceModel {
  const propertyList: TsPropertyModel[] = [];

  // console.log({ interfNode });

  interfNode.forEachChild((member) => {
    // console.log("interface member: ", member.getFullText(tsSourceFile));

    if (ts.isPropertyDeclaration(member)) {
      propertyList.push(parsePropertyFromNode(tsSourceFile, member));
    } else if (ts.isPropertySignature(member)) {
      propertyList.push(parsePropertyFromNode(tsSourceFile, member));
    } else {
      console.log("other member kind: ", ts.SyntaxKind[member.kind]);
    }
  });

  return {
    interfaceName: interfNode.name.escapedText.toString(),
    comments: parseCommentFromNode(tsSourceFile, interfNode),
    propertyList,
  };
}
