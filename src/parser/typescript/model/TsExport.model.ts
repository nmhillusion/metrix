import { TsCommentModel } from "./TsComment.model";

export interface TsExportModel {
  filePath: string;
  comments: TsCommentModel[];
  exportName?: string;
  moduleSpecifier?: string;
}
