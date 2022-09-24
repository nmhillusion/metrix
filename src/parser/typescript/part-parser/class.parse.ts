import ts from "typescript";
import { parseCommentFromNode } from "./comment.parse";
import {
  KeywordType,
  TsClassModel,
  TsFunctionModel,
  TsPropertyModel,
} from "../model";
import { parsePropertyFromNode } from "./property.parse";
import { parseFunctionFromNode } from "./function.parse";
import { LogFactory } from "@nmhillusion/n2log4web";

export function parseClassFromNode(
  tsSourceFile: ts.SourceFile,
  classNode: ts.ClassDeclaration
): TsClassModel {
  const methodList: TsFunctionModel[] = [];
  const propertyList: TsPropertyModel[] = [];

  let isExport = false;
  classNode.modifiers?.forEach((md) => {
    if (KeywordType.ExportKeyword === ts.SyntaxKind[md.kind]) {
      isExport = true;
    }
  });

  classNode.forEachChild((member) => {
    if (ts.isMethodDeclaration(member)) {
      methodList.push(parseFunctionFromNode(tsSourceFile, member));
    } else if (ts.isPropertyDeclaration(member)) {
      propertyList.push(parsePropertyFromNode(tsSourceFile, member));
    } else {
      LogFactory.getNodeLog(__filename).info(
        "other member kind: ",
        ts.SyntaxKind[member.kind]
      );
    }
  });

  return {
    className: classNode.name.escapedText.toString(),
    comments: parseCommentFromNode(tsSourceFile, classNode),
    isExport,
    methodList,
    propertyList,
  };
}
