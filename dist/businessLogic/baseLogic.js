"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
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
// baseLogic.ts
const typeorm_1 = require("typeorm");
const typeorm_typedi_extensions_1 = require("typeorm-typedi-extensions");
const typeorm_plus_1 = require("typeorm-plus");
class BaseLogic {
    createOrUpdate(model, entity) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log("model", model, "fghjk", this.modelName(), "entity", entity);
                let entityManager = (0, typeorm_plus_1.getManager)();
                console.log("entityManager", entityManager);
                return yield entityManager.save(entity, model);
            }
            catch (error) {
                console.log("Error_in_createOrUpdate::: ", error);
                throw error;
            }
        });
    }
}
__decorate([
    (0, typeorm_typedi_extensions_1.InjectManager)(),
    __metadata("design:type", typeorm_1.EntityManager)
], BaseLogic.prototype, "entityManager", void 0);
exports.default = BaseLogic;
//# sourceMappingURL=baseLogic.js.map