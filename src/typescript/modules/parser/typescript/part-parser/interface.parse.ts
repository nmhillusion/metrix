import ts from "typescript";
import { parseCommentFromNode } from "./comment.parse";
import { TsFunctionModel, TsInterfaceModel, TsPropertyModel } from "../model";
import { parsePropertyFromNode } from "./property.parse";
import { parseFunctionFromNode } from "./function.parse";

export function parseInterfaceFromNode(
  tsSourceFile: ts.SourceFile,
  interfNode: ts.InterfaceDeclaration
): TsInterfaceModel {
  const propertyList: TsPropertyModel[] = [];
  const methodList: TsFunctionModel[] = [];

  // console.log({ interfNode });

  interfNode.forEachChild((member) => {
    // console.log("interface member: ", member.getFullText(tsSourceFile));

    if (ts.isPropertyDeclaration(member)) {
      propertyList.push(parsePropertyFromNode(tsSourceFile, member));
    } else if (ts.isPropertySignature(member)) {
      propertyList.push(parsePropertyFromNode(tsSourceFile, member));
    } else if (ts.isMethodSignature(member)) {
      methodList.push(parseFunctionFromNode(tsSourceFile, member));
    } else {
      console.log("other member kind: ", ts.SyntaxKind[member.kind]);
    }
  });

  return {
    interfaceName: interfNode.name.escapedText.toString(),
    comments: parseCommentFromNode(tsSourceFile, interfNode),
    propertyList,
    methodList,
  };
}
