import { TsClassModel } from "./TsClass.model";
import { TsFunctionModel } from "./TsFunction.model";
import { TsInterfaceModel } from "./TsInterface.model";

export interface TsFileModel {
  tsFunctionList: TsFunctionModel[];
  tsClassList: TsClassModel[];
  tsInterfaceList: TsInterfaceModel[];
}
