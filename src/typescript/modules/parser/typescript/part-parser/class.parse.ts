import ts from "typescript";
import { parseCommentFromNode } from "./comment.parse";
import { TsClassModel, TsFunctionModel, TsPropertyModel } from "../model";
import { parsePropertyFromNode } from "./property.parse";
import { parseFunctionFromNode } from "./function.parse";

export function parseClassFromNode(
  tsSourceFile: ts.SourceFile,
  classNode: ts.ClassDeclaration
): TsClassModel {
  const methodList: TsFunctionModel[] = [];
  const propertyList: TsPropertyModel[] = [];

  classNode.forEachChild((member) => {
    if (ts.isMethodDeclaration(member)) {
      methodList.push(parseFunctionFromNode(tsSourceFile, member));
    } else if (ts.isPropertyDeclaration(member)) {
      propertyList.push(parsePropertyFromNode(tsSourceFile, member));
    } else {
      console.log("other member kind: ", ts.SyntaxKind[member.kind]);
    }
  });

  return {
    className: classNode.name.escapedText.toString(),
    comments: parseCommentFromNode(tsSourceFile, classNode),
    methodList,
    propertyList,
  };
}
