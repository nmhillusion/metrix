import { TsClassModel } from "./TsClass.model";
import { TsExportModel } from "./TsExport.model";
import { TsFunctionModel } from "./TsFunction.model";
import { TsInterfaceModel } from "./TsInterface.model";

export interface TsFileModel {
  tsFunctionList: TsFunctionModel[];
  tsClassList: TsClassModel[];
  tsInterfaceList: TsInterfaceModel[];
  tsExportList: TsExportModel[];
}
