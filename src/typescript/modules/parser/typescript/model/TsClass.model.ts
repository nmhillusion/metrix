import { TsCommentModel } from "./TsComment.model";
import { TsFunctionModel } from "./TsFunction.model";
import { TsPropertyModel } from "./TsProperty.model";

export interface TsClassModel {
  className: string;
  comments: TsCommentModel[];
  methodList: TsFunctionModel[];
  propertyList: TsPropertyModel[];
}
