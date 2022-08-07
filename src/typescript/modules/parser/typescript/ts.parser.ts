import path from "path";
import * as fs from "fs";
import ts from "typescript";
import { TsFileModel, TsFunctionModel } from "./model";
import { TsClassModel } from "./model";
import {
  parseClassFromNode,
  parseFunctionFromNode,
  parseInterfaceFromNode,
  parseTypeAliasFromNode,
} from "./part-parser";

export class TsParser {
  constructor(private tsFilePath: string) {
    tsFilePath = path.resolve(tsFilePath);
  }

  parse(): TsFileModel {
    const tsSourceFile = ts.createSourceFile(
      path.basename(this.tsFilePath),
      fs.readFileSync(this.tsFilePath).toString(),
      ts.ScriptTarget.Latest
    );

    const tsClassList: TsClassModel[] = [];
    const tsFunctionList: TsFunctionModel[] = [];
    const tsInterfaceList = [];

    tsSourceFile.forEachChild((child) => {
      if (ts.isClassDeclaration(child)) {
        tsClassList.push(parseClassFromNode(tsSourceFile, child));
      } else if (ts.isFunctionDeclaration(child)) {
        tsFunctionList.push(parseFunctionFromNode(tsSourceFile, child));
      } else if (ts.isInterfaceDeclaration(child)) {
        tsInterfaceList.push(parseInterfaceFromNode(tsSourceFile, child));
      } else if (ts.isTypeAliasDeclaration(child)) {
        tsInterfaceList.push(parseTypeAliasFromNode(tsSourceFile, child));
      } else {
        console.warn("NOT define > nodeKind: ", ts.SyntaxKind[child.kind]);
      }
    });

    return {
      tsClassList,
      tsFunctionList,
      tsInterfaceList,
    };
  }
}
