import ts from "typescript";
import { TsPropertyModel } from "../model";
import { parseCommentFromNode } from "./comment.parse";

export function parsePropertyFromNode(
  tsSourceFile: ts.SourceFile,
  propertyNode: ts.PropertyDeclaration | ts.PropertySignature
): TsPropertyModel {
  let isStatic = false;
  propertyNode.modifiers?.forEach((md) => {
    if ("StaticKeyword" === ts.SyntaxKind[md.kind]) {
      isStatic = true;
    }
  });

  return {
    propertyName: propertyNode.name.getText(tsSourceFile),
    isStatic,
    comments: parseCommentFromNode(tsSourceFile, propertyNode),
    type: propertyNode.type?.getText(tsSourceFile),
    optional: !!propertyNode.questionToken,
  };
}
