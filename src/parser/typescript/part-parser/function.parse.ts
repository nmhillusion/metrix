import ts from "typescript";
import { KeywordType, TsFunctionModel, TsParamModel } from "../model";
import { parseCommentFromNode } from "./comment.parse";

export function parseFunctionFromNode(
  filePath: string,
  tsSourceFile: ts.SourceFile,
  funcNode: ts.FunctionDeclaration | ts.MethodDeclaration | ts.MethodSignature
): TsFunctionModel {
  let isStatic = false;
  let isExport = false;
  funcNode.modifiers?.forEach((md) => {
    // console.log("modifier kind: ", ts.SyntaxKind[md.kind]);
    if (KeywordType.StaticKeyword === ts.SyntaxKind[md.kind]) {
      isStatic = true;
    } else if (KeywordType.ExportKeyword === ts.SyntaxKind[md.kind]) {
      isExport = true;
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

  // funcNode.forEachChild((node) => {
  //   console.log("func node: ", ts.SyntaxKind[node.kind]);
  // });

  return {
    filePath,
    functionName: funcNode.name.getText(tsSourceFile),
    returnType: funcNode.type?.getText(tsSourceFile),
    isStatic,
    isExport,
    paramList,
    comments: parseCommentFromNode(tsSourceFile, funcNode),
  };
}
