import { TsCommentModel } from "./TsComment.model";
import { TsFunctionModel } from "./TsFunction.model";
import { TsPropertyModel } from "./TsProperty.model";

export interface TsClassModel {
  filePath?: string;
  className: string;
  isExport: boolean;
  comments: TsCommentModel[];
  methodList: TsFunctionModel[];
  propertyList: TsPropertyModel[];
}
