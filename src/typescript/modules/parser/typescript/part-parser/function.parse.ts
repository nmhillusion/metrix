import ts from "typescript";
import { KeywordType, TsFunctionModel, TsParamModel } from "../model";
import { parseCommentFromNode } from "./comment.parse";

export function parseFunctionFromNode(
  tsSourceFile: ts.SourceFile,
  funcNode: ts.FunctionDeclaration | ts.MethodDeclaration | ts.MethodSignature
): TsFunctionModel {
  let isStatic = false;
  funcNode.modifiers?.forEach((md) => {
    // console.log("mod kind: ", ts.SyntaxKind[md.kind]);
    if (KeywordType.StaticKeyword === ts.SyntaxKind[md.kind]) {
      isStatic = true;
    }
  });

  const paramList: TsParamModel[] = [];
  for (const param of funcNode.parameters) {
    paramList.push({
      name: param.name.getText(tsSourceFile),
      type: param.type?.getText(tsSourceFile),
      optional: !!param.questionToken,
      comments: parseCommentFromNode(tsSourceFile, param),
    });
  }

  return {
    functionName: funcNode.name.getText(tsSourceFile),
    returnType: funcNode.type?.getText(tsSourceFile),
    isStatic,
    paramList,
    comments: parseCommentFromNode(tsSourceFile, funcNode),
  };
}
