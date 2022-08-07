import { TsCommentModel } from "./TsComment.model";

export interface TsParamModel {
  name: string;
  comments: TsCommentModel[];
  type?: string;
  optional: boolean;
}
