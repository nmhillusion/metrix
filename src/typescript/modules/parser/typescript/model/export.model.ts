import { TsCommentModel } from "./TsComment.model";

export interface TsExportModel {
  comments: TsCommentModel[];
  exportName?: string;
  moduleSpecifier?: string;
}
