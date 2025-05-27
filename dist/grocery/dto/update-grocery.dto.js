"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateGroceryDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const create_grocery_dto_1 = require("./create-grocery.dto");
class UpdateGroceryDto extends (0, swagger_1.PartialType)(create_grocery_dto_1.CreateGroceryDto) {
}
exports.UpdateGroceryDto = UpdateGroceryDto;
//# sourceMappingURL=update-grocery.dto.js.map