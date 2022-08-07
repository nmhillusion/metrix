import { TsCommentModel } from "./TsComment.model";

export class TsPropertyModel {
  propertyName: string;
  type?: string;
  isStatic: boolean;
  comments: TsCommentModel[];
  optional: boolean;
}
