import { TsCommentModel } from "./TsComment.model";

export class TsPropertyModel {
  name: string;
  type?: string;
  isStatic: boolean;
  comments: TsCommentModel[];
  optional: boolean;
}
