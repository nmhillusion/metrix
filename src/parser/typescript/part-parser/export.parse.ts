import ts from "typescript";
import { TsExportModel } from "../model/TsExport.model";
import { parseCommentFromNode } from "./comment.parse";

export function parseExportFromNode(
  filePath: string,
  tsSourceFile: ts.SourceFile,
  expNode: ts.ExportDeclaration
): TsExportModel {
  let exportName = expNode.name?.getText(tsSourceFile);

  if (!exportName && expNode.exportClause) {
    for (
      let childIdx = 0;
      childIdx < expNode.exportClause?.getChildCount(tsSourceFile);
      ++childIdx
    ) {
      const clauseChild = expNode.exportClause.getChildAt(
        childIdx,
        tsSourceFile
      );

      if (ts.isIdentifier(clauseChild)) {
        exportName = clauseChild.getText(tsSourceFile);
        break;
      }
    }
  }

  return {
    filePath,
    exportName,
    comments: parseCommentFromNode(tsSourceFile, expNode),
    moduleSpecifier: expNode.moduleSpecifier?.getText(tsSourceFile),
  };
}
