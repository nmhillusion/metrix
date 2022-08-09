import { TsCommentModel } from "./TsComment.model";
import { TsFunctionModel } from "./TsFunction.model";
import { TsPropertyModel } from "./TsProperty.model";

export interface TsInterfaceModel {
  interfaceName: string;
  isExport: boolean;
  propertyList: TsPropertyModel[];
  methodList: TsFunctionModel[];
  comments: TsCommentModel[];
}
