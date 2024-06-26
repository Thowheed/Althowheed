"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connect = void 0;
require("reflect-metadata");
const typeorm_1 = require("typeorm");
const typeorm_plus_1 = require("typeorm-plus");
const typeorm_typedi_extensions_1 = require("typeorm-typedi-extensions");
let connections;
function connect() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const AppDataSource = Object.assign({
                type: "sqlite",
                database: "C:/Learnings/assgn.db/assgn.sqlite",
                synchronize: false,
                logging: "all",
                entities: [__dirname + "/entity/*.js"],
            });
            const AllDatabases = [AppDataSource];
            (0, typeorm_1.useContainer)(typeorm_typedi_extensions_1.Container);
            try {
                connections = yield (0, typeorm_plus_1.createConnections)(AllDatabases);
                console.log("connections", connections);
            }
            catch (error) {
                console.log("db error ::::", error);
            }
            if (AppDataSource) {
                console.log("created successfully");
            }
            return AppDataSource;
        }
        catch (error) {
            console.log("Error_in_Connection:::", error);
        }
    });
}
exports.connect = connect;
;
//# sourceMappingURL=data-source.js.map