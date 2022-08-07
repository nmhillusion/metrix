import ts from "typescript";
import { TsCommentModel } from "../model";

export function parseCommentFromNode(
  tsSourceFile: ts.SourceFile,
  node: ts.Node
) {
  const fullText = node.getFullText(tsSourceFile);
  const statementText = node.getText(tsSourceFile);
  const commentText = fullText?.replace(statementText, "");

  function removeFromStartLine(line: string, patternToRemove: string) {
    while (
      line.startsWith(patternToRemove) &&
      patternToRemove.length <= line.length
    ) {
      line = line.substring(patternToRemove.length);
    }
    return line;
  }

  const prettyComment: TsCommentModel[] = [];

  if (commentText) {
    prettyComment.push(
      ...commentText
        .split("\n")
        .map((line) => {
          line = line.trim();
          line = removeFromStartLine(line, "/*");
          line = removeFromStartLine(line, "*/");
          line = removeFromStartLine(line, "*");
          line = removeFromStartLine(line, "//");
          return line.trim();
        })
        .filter((l) => l)
        .map((line) => ({
          content: line,
        }))
    );
  }

  return prettyComment;
}
