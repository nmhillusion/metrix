import { TsCommentModel } from "./TsComment.model";
import { TsPropertyModel } from "./TsProperty.model";

export interface TsInterfaceModel {
  interfaceName: string;
  propertyList: TsPropertyModel[];
  comments: TsCommentModel[];
}
