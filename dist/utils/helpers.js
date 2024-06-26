"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isValidJson = void 0;
function isValidJson(jsonString) {
    try {
        JSON.parse(jsonString);
        return true;
    }
    catch (error) {
        return false;
    }
}
exports.isValidJson = isValidJson;
//# sourceMappingURL=helpers.js.map