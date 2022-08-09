import ts from "typescript";
import { parseCommentFromNode } from "./comment.parse";
import {
  KeywordType,
  TsFunctionModel,
  TsInterfaceModel,
  TsPropertyModel,
} from "../model";
import { parsePropertyFromNode } from "./property.parse";
import { parseFunctionFromNode } from "./function.parse";

export function parseTypeAliasFromNode(
  tsSourceFile: ts.SourceFile,
  typeAliasNode: ts.TypeAliasDeclaration | ts.TypeLiteralNode
): TsInterfaceModel {
  const propertyList: TsPropertyModel[] = [];
  const methodList: TsFunctionModel[] = [];
  // console.log({ interfNode });

  let isExport = false;
  typeAliasNode.modifiers?.forEach((md) => {
    // console.log("modifier kind: ", ts.SyntaxKind[md.kind]);
    if (KeywordType.ExportKeyword === ts.SyntaxKind[md.kind]) {
      isExport = true;
    }
  });

  typeAliasNode.forEachChild((member) => {
    if (ts.isTypeLiteralNode(member)) {
      const typeLiteralNode: ts.TypeLiteralNode = member;
      propertyList.push(
        ...parseTypeAliasFromNode(tsSourceFile, typeLiteralNode).propertyList
      );
    } else if (ts.isPropertySignature(member)) {
      propertyList.push(parsePropertyFromNode(tsSourceFile, member));
    } else if (ts.isMethodSignature(member)) {
      methodList.push(parseFunctionFromNode(tsSourceFile, member));
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
    methodList,
    isExport,
  };
}
