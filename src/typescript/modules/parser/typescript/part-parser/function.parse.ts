import ts from "typescript";
import { TsFunctionModel } from "../model";
import { TsParamModel } from "../model/TsParam.model";
import { parseCommentFromNode } from "./comment.parse";

export function parseFunctionFromNode(
  tsSourceFile: ts.SourceFile,
  funcNode: ts.FunctionDeclaration | ts.MethodDeclaration
): TsFunctionModel {
  let isStatic = false;
  funcNode.modifiers?.forEach((md) => {
    // console.log("mod kind: ", ts.SyntaxKind[md.kind]);
    if ("StaticKeyword" === ts.SyntaxKind[md.kind]) {
      isStatic = true;
    }
  });

  const paramList: TsParamModel[] = [];
  for (const param of funcNode.parameters) {
    paramList.push({
      name: param.name.getText(tsSourceFile),
      type: param.type?.getText(tsSourceFile),
      optional: !!param.questionToken,
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
