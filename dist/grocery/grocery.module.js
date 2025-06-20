"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GroceryModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const grocery_controller_1 = require("./grocery.controller");
const grocery_service_1 = require("./grocery.service");
const grocery_schema_1 = require("./schemas/grocery.schema");
const auth_module_1 = require("../auth/auth.module");
let GroceryModule = class GroceryModule {
};
exports.GroceryModule = GroceryModule;
exports.GroceryModule = GroceryModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([{ name: grocery_schema_1.Grocery.name, schema: grocery_schema_1.GrocerySchema }]),
            auth_module_1.AuthModule,
        ],
        controllers: [grocery_controller_1.GroceryController],
        providers: [grocery_service_1.GroceryService],
        exports: [grocery_service_1.GroceryService],
    })
], GroceryModule);
//# sourceMappingURL=grocery.module.js.map