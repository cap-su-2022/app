/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./apps/backend/src/app/config/firebase.config.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.initializeFirebaseApp = void 0;
const admin = __webpack_require__("firebase-admin");
const firebaseServiceAccountFile = './fptu-library-booking-firebase-adminsdk-gbxgk-75d2eb543f.json';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const fs = __webpack_require__("fs");
const firebaseSettings = JSON.parse(fs.readFileSync(firebaseServiceAccountFile, 'utf-8'));
const initializeFirebaseApp = () => {
    admin.initializeApp({
        credential: admin.credential.cert({
            projectId: firebaseSettings.project_id,
            clientEmail: firebaseSettings.client_email,
            privateKey: firebaseSettings.private_key.replace(/\\n/g, '\n'),
        })
    });
    return firebaseSettings.project_id;
};
exports.initializeFirebaseApp = initializeFirebaseApp;
exports["default"] = admin;


/***/ }),

/***/ "./apps/backend/src/app/constants/config/configuration.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const yaml = __webpack_require__("js-yaml");
const fs_1 = __webpack_require__("fs");
const path_1 = __webpack_require__("path");
const YAML_CONFIG_FILENAME = 'environment.yaml';
exports["default"] = () => {
    return yaml.load((0, fs_1.readFileSync)((0, path_1.join)(YAML_CONFIG_FILENAME), 'utf8'));
};


/***/ }),

/***/ "./apps/backend/src/app/constants/config/swagger.config.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.getSwaggerConfig = exports.SWAGGER_CONFIG = void 0;
const swagger_1 = __webpack_require__("@nestjs/swagger");
exports.SWAGGER_CONFIG = {
    contextPath: '/',
    app: {
        title: 'FPTU Library Room Booking Management',
        description: 'Room booking and management for easily access for the lecturers and students',
        version: '1.0',
    },
};
const getSwaggerConfig = () => {
    return new swagger_1.DocumentBuilder()
        .setTitle(exports.SWAGGER_CONFIG.app.title)
        .setDescription(exports.SWAGGER_CONFIG.app.description)
        .setVersion(exports.SWAGGER_CONFIG.app.version)
        .addBearerAuth({
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'Token',
    }, 'access-token')
        .addOAuth2()
        .build();
};
exports.getSwaggerConfig = getSwaggerConfig;


/***/ }),

/***/ "./apps/backend/src/app/constants/controllers/keycloak/path.constant.ts":
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.KEYCLOAK_PATH = void 0;
exports.KEYCLOAK_PATH = {
    requestPath: '/v1/auth',
    signIn: 'signin',
    refreshAccessToken: 'refresh',
    signOut: 'signout',
    countUsers: 'users/count',
    getUsers: 'users',
    getUserById: 'users/:id',
    createNewUser: 'users',
    refreshUserPasswordById: 'users/reset-password/:id',
};


/***/ }),

/***/ "./apps/backend/src/app/constants/exception.constant.ts":
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const Exception = {
    googleAccessTokenException: {
        invalidToken: 'Google access token is not validated.',
        expired: 'Google access token is expired',
    }
};
exports["default"] = Exception;


/***/ }),

/***/ "./apps/backend/src/app/constants/network/headers.constant.ts":
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AUTHORIZATION_LOWERCASE = exports.AUTHORIZATION = exports.CONTENT_TYPE = void 0;
exports.CONTENT_TYPE = "Content-Type";
exports.AUTHORIZATION = "Authorization";
exports.AUTHORIZATION_LOWERCASE = "authorization";


/***/ }),

/***/ "./apps/backend/src/app/controllers/accounts-pagination.model.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AccountsPaginationParams = void 0;
const tslib_1 = __webpack_require__("tslib");
const pagination_model_1 = __webpack_require__("./apps/backend/src/app/controllers/pagination.model.ts");
const class_validator_1 = __webpack_require__("class-validator");
class AccountsPaginationParams extends pagination_model_1.PaginationParams {
}
tslib_1.__decorate([
    (0, class_validator_1.IsString)({
        message: 'Role type must be a string',
    }),
    (0, class_validator_1.IsOptional)(),
    tslib_1.__metadata("design:type", String)
], AccountsPaginationParams.prototype, "role", void 0);
exports.AccountsPaginationParams = AccountsPaginationParams;


/***/ }),

/***/ "./apps/backend/src/app/controllers/accounts.controller.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var AccountsController_1, _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _0;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AccountsController = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const services_1 = __webpack_require__("./apps/backend/src/app/services/index.ts");
const swagger_1 = __webpack_require__("@nestjs/swagger");
const users_validation_1 = __webpack_require__("./apps/backend/src/app/pipes/validation/users.validation.ts");
const keycloak_user_decorator_1 = __webpack_require__("./apps/backend/src/app/decorators/keycloak-user.decorator.ts");
const path_logger_interceptor_1 = __webpack_require__("./apps/backend/src/app/interceptors/path-logger.interceptor.ts");
const role_decorator_1 = __webpack_require__("./apps/backend/src/app/decorators/role.decorator.ts");
const roles_enum_1 = __webpack_require__("./apps/backend/src/app/enum/roles.enum.ts");
const keycloak_user_1 = __webpack_require__("./apps/backend/src/app/dto/keycloak.user.ts");
const fastify_file_interceptor_1 = __webpack_require__("./apps/backend/src/app/interceptors/fastify-file.interceptor.ts");
const change_password_request_payload_1 = __webpack_require__("./apps/backend/src/app/payload/request/change-password.request.payload.ts");
const accounts_pagination_model_1 = __webpack_require__("./apps/backend/src/app/controllers/accounts-pagination.model.ts");
const account_add_request_payload_1 = __webpack_require__("./apps/backend/src/app/payload/request/account-add.request.payload.ts");
const account_update_profile_request_payload_1 = __webpack_require__("./apps/backend/src/app/payload/request/account-update-profile.request.payload.ts");
let AccountsController = AccountsController_1 = class AccountsController {
    constructor(service) {
        this.service = service;
    }
    getAll(payload) {
        return this.service.getAll(payload);
    }
    syncUsersFromKeycloak() {
        return this.service.syncUsersFromKeycloak();
    }
    getAccountById(payload) {
        return this.service.getById(payload.id);
    }
    //   @ApiResponse({
    //   status: HttpStatus.OK,
    //   description: 'Successfully created a new user',
    //   type: Accounts,
    //   schema: {
    //     allOf: [
    //       {
    //         $ref: getSchemaPath(Accounts),
    //       },
    //       {
    //         properties: {
    //           results: {
    //             type: 'object',
    //             items: { $ref: getSchemaPath(Accounts) },
    //           },
    //         },
    //       },
    //     ],
    //   },
    // })
    createNewUser(user, account) {
        return this.service.add(account, user.account_id);
    }
    getCurrentProfileInformation(user) {
        return this.service.getCurrentProfileInformation(user.sub);
    }
    getAccountByKeycloakId(payload) {
        return this.service.getAccountByKeycloakId(payload.id);
    }
    getAccountsByRoleId(roleId = '') {
        return this.service.getAccountsByRoleId(roleId);
    }
    disableAccountById(user, id) {
        return this.service.disableById(user.account_id, id);
    }
    getDisabledAccounts(search = '') {
        return this.service.getDisabledAccounts(search);
    }
    restoreDisabledAccountById(user, payload) {
        return this.service.handleRestoreDisabledAccountById(user.account_id, payload.id);
    }
    getDeletedAccounts(search = '') {
        return this.service.getDeletedAccounts(search);
    }
    restoreDeletedUserById(user, payload) {
        return this.service.handleRestoreDeletedAccountById(user.account_id, payload.id);
    }
    updateAccountById(user, payload, body) {
        return this.service.updateById(user.account_id, payload.id, body);
    }
    updateMyProfile(user, body) {
        return this.service.updateMyProfile(user, body);
    }
    deleteAccountById(user, payload) {
        return this.service.deleteById(user.account_id, payload.id);
    }
    updateAccountUploadAvatarById(user, image, payload) {
        return this.service.uploadAvatarByAccountId(image, payload.id);
    }
    updateCurrentProfileAvatar(user, image) {
        return this.service.uploadAvatarByAccountId(image, user.account_id);
    }
    changePassword(keycloakUser, payload) {
        return this.service.changePassword(keycloakUser, payload);
    }
    changePasswordByKeycloakId(payload, requestPayload) {
        return this.service.changePasswordByKeycloakId(payload.id, requestPayload.password);
    }
    getMyAvatarURL(keycloakUser) {
        return this.service.getAvatarURLByAccountId(keycloakUser.account_id);
    }
};
tslib_1.__decorate([
    (0, common_1.Get)(),
    (0, common_1.UsePipes)(new users_validation_1.UsersValidation()),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, role_decorator_1.Roles)(roles_enum_1.Role.APP_LIBRARIAN, roles_enum_1.Role.APP_MANAGER, roles_enum_1.Role.APP_ADMIN),
    (0, swagger_1.ApiOperation)({
        summary: 'Get the list of accounts',
        description: 'Get the list of accounts with the provided pagination payload',
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
        description: 'Successfully retrieved the users list',
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.BAD_REQUEST,
        description: 'Error while getting users or request payload is invalid',
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.UNAUTHORIZED,
        description: 'Access token is invalid',
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.FORBIDDEN,
        description: 'Not enough privileges',
    }),
    tslib_1.__param(0, (0, common_1.Query)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof accounts_pagination_model_1.AccountsPaginationParams !== "undefined" && accounts_pagination_model_1.AccountsPaginationParams) === "function" ? _a : Object]),
    tslib_1.__metadata("design:returntype", void 0)
], AccountsController.prototype, "getAll", null);
tslib_1.__decorate([
    (0, common_1.Get)('syncKeycloak'),
    (0, common_1.UsePipes)(new users_validation_1.UsersValidation()),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, role_decorator_1.Roles)(roles_enum_1.Role.APP_LIBRARIAN, roles_enum_1.Role.APP_MANAGER, roles_enum_1.Role.APP_ADMIN),
    (0, swagger_1.ApiOperation)({
        description: 'Sync users from Keycloak to current DB',
    }),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", void 0)
], AccountsController.prototype, "syncUsersFromKeycloak", null);
tslib_1.__decorate([
    (0, common_1.Get)('find/:id'),
    (0, role_decorator_1.Roles)(roles_enum_1.Role.APP_LIBRARIAN, roles_enum_1.Role.APP_MANAGER, roles_enum_1.Role.APP_ADMIN),
    (0, swagger_1.ApiOperation)({
        summary: 'Retrieve account information by id',
        description: 'Get account information by id',
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
        description: 'Successfully retrieved the account information',
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.BAD_REQUEST,
        description: 'Error while retrieving account information by id',
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.UNAUTHORIZED,
        description: 'Invalid access token',
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.FORBIDDEN,
        description: 'Insufficient privileges',
    }),
    tslib_1.__param(0, (0, common_1.Param)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", void 0)
], AccountsController.prototype, "getAccountById", null);
tslib_1.__decorate([
    (0, common_1.Post)('add'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, role_decorator_1.Roles)(roles_enum_1.Role.APP_LIBRARIAN, roles_enum_1.Role.APP_MANAGER, roles_enum_1.Role.APP_ADMIN),
    (0, swagger_1.ApiOperation)({
        summary: 'Create a new account',
        description: 'Create a new account with the provided payload',
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.CREATED,
        description: 'Successfully created a new device',
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.BAD_REQUEST,
        description: 'Request payload for user is not validated',
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.UNAUTHORIZED,
        description: 'Access token is invalidated',
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.FORBIDDEN,
        description: 'Insufficient privileges',
    }),
    tslib_1.__param(0, (0, keycloak_user_decorator_1.User)()),
    tslib_1.__param(1, (0, common_1.Body)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_b = typeof keycloak_user_1.KeycloakUserInstance !== "undefined" && keycloak_user_1.KeycloakUserInstance) === "function" ? _b : Object, typeof (_c = typeof account_add_request_payload_1.AccountAddRequestPayload !== "undefined" && account_add_request_payload_1.AccountAddRequestPayload) === "function" ? _c : Object]),
    tslib_1.__metadata("design:returntype", typeof (_d = typeof Promise !== "undefined" && Promise) === "function" ? _d : Object)
], AccountsController.prototype, "createNewUser", null);
tslib_1.__decorate([
    (0, common_1.Get)('my-profile'),
    (0, role_decorator_1.Roles)(roles_enum_1.Role.APP_LIBRARIAN, roles_enum_1.Role.APP_MANAGER, roles_enum_1.Role.APP_ADMIN, roles_enum_1.Role.APP_STAFF),
    (0, swagger_1.ApiOperation)({
        summary: 'Retrieve current profile information',
        description: 'Get profile information',
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
        description: 'Successfully retrieved the profile information',
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.BAD_REQUEST,
        description: 'Error while retrieving profile information',
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.UNAUTHORIZED,
        description: 'Access token is invalid',
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.FORBIDDEN,
        description: 'Not enough privileges',
    }),
    tslib_1.__param(0, (0, keycloak_user_decorator_1.User)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_e = typeof keycloak_user_1.KeycloakUserInstance !== "undefined" && keycloak_user_1.KeycloakUserInstance) === "function" ? _e : Object]),
    tslib_1.__metadata("design:returntype", typeof (_f = typeof Promise !== "undefined" && Promise) === "function" ? _f : Object)
], AccountsController.prototype, "getCurrentProfileInformation", null);
tslib_1.__decorate([
    (0, common_1.Get)('find-by-keycloak-id/:id'),
    (0, role_decorator_1.Roles)(roles_enum_1.Role.APP_LIBRARIAN, roles_enum_1.Role.APP_MANAGER, roles_enum_1.Role.APP_ADMIN),
    (0, swagger_1.ApiOperation)({
        summary: 'Get account information by keycloak id',
        description: 'Get account information by keycloak id',
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
        description: 'Successfully retrieve account information',
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.BAD_REQUEST,
        description: 'Error while retrieving account information by keycloak id',
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.UNAUTHORIZED,
        description: 'Access token is invalid',
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.FORBIDDEN,
        description: 'Not enough privileges',
    }),
    tslib_1.__param(0, (0, common_1.Param)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", void 0)
], AccountsController.prototype, "getAccountByKeycloakId", null);
tslib_1.__decorate([
    (0, common_1.Get)('by-role'),
    (0, role_decorator_1.Roles)(roles_enum_1.Role.APP_LIBRARIAN, roles_enum_1.Role.APP_MANAGER, roles_enum_1.Role.APP_ADMIN),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.UNAUTHORIZED,
        description: 'Access token is invalidated',
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.BAD_REQUEST,
        description: 'One or more payload parameters are invalid',
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
        description: 'Successfully fetched accounts',
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.FORBIDDEN,
        description: 'Insufficient privileges',
    }),
    tslib_1.__param(0, (0, common_1.Query)('role')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", typeof (_g = typeof Promise !== "undefined" && Promise) === "function" ? _g : Object)
], AccountsController.prototype, "getAccountsByRoleId", null);
tslib_1.__decorate([
    (0, common_1.Put)('disable/:id'),
    (0, role_decorator_1.Roles)(roles_enum_1.Role.APP_LIBRARIAN, roles_enum_1.Role.APP_MANAGER, roles_enum_1.Role.APP_ADMIN),
    (0, swagger_1.ApiOperation)({
        summary: 'Disable account by id',
        description: 'Disable account by provided id',
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
        description: 'Successfully disabled the account',
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.BAD_REQUEST,
        description: 'Error while disabling the account',
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.UNAUTHORIZED,
        description: 'Invalid access token',
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.FORBIDDEN,
        description: 'Insufficient privileges',
    }),
    tslib_1.__param(0, (0, keycloak_user_decorator_1.User)()),
    tslib_1.__param(1, (0, common_1.Param)('id')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_h = typeof keycloak_user_1.KeycloakUserInstance !== "undefined" && keycloak_user_1.KeycloakUserInstance) === "function" ? _h : Object, String]),
    tslib_1.__metadata("design:returntype", void 0)
], AccountsController.prototype, "disableAccountById", null);
tslib_1.__decorate([
    (0, common_1.Get)('disabled'),
    (0, swagger_1.ApiOperation)({
        summary: 'Get a list of disabled accounts',
        description: 'Get a list of disabled accounts',
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.UNAUTHORIZED,
        description: 'Access token is invalid',
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.FORBIDDEN,
        description: 'Not enough privileges',
    }),
    (0, role_decorator_1.Roles)(roles_enum_1.Role.APP_LIBRARIAN, roles_enum_1.Role.APP_MANAGER, roles_enum_1.Role.APP_ADMIN),
    tslib_1.__param(0, (0, common_1.Query)('search')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", void 0)
], AccountsController.prototype, "getDisabledAccounts", null);
tslib_1.__decorate([
    (0, common_1.Put)('restore-disabled/:id'),
    (0, role_decorator_1.Roles)(roles_enum_1.Role.APP_LIBRARIAN, roles_enum_1.Role.APP_MANAGER, roles_enum_1.Role.APP_ADMIN),
    (0, swagger_1.ApiOperation)({
        summary: 'Restore the disabled account by id',
        description: 'Restore the disabled account by provided id',
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
        description: 'Successfully restored the disabled account',
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.BAD_REQUEST,
        description: 'Error while restoring the disabled the account',
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.UNAUTHORIZED,
        description: 'Invalid access token',
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.FORBIDDEN,
        description: 'Insufficient privileges',
    }),
    tslib_1.__param(0, (0, keycloak_user_decorator_1.User)()),
    tslib_1.__param(1, (0, common_1.Param)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_j = typeof keycloak_user_1.KeycloakUserInstance !== "undefined" && keycloak_user_1.KeycloakUserInstance) === "function" ? _j : Object, Object]),
    tslib_1.__metadata("design:returntype", void 0)
], AccountsController.prototype, "restoreDisabledAccountById", null);
tslib_1.__decorate([
    (0, common_1.Get)('deleted'),
    (0, role_decorator_1.Roles)(roles_enum_1.Role.APP_LIBRARIAN, roles_enum_1.Role.APP_MANAGER, roles_enum_1.Role.APP_ADMIN),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.UNAUTHORIZED,
        description: 'Access token is invalid',
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.FORBIDDEN,
        description: 'Not enough privileges',
    }),
    tslib_1.__param(0, (0, common_1.Query)('search')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", void 0)
], AccountsController.prototype, "getDeletedAccounts", null);
tslib_1.__decorate([
    (0, common_1.Put)('restore-deleted/:id'),
    (0, role_decorator_1.Roles)(roles_enum_1.Role.APP_LIBRARIAN, roles_enum_1.Role.APP_MANAGER, roles_enum_1.Role.APP_ADMIN),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.UNAUTHORIZED,
        description: 'Access token is invalid',
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.FORBIDDEN,
        description: 'Not enough privileges',
    }),
    tslib_1.__param(0, (0, keycloak_user_decorator_1.User)()),
    tslib_1.__param(1, (0, common_1.Param)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_k = typeof keycloak_user_1.KeycloakUserInstance !== "undefined" && keycloak_user_1.KeycloakUserInstance) === "function" ? _k : Object, Object]),
    tslib_1.__metadata("design:returntype", void 0)
], AccountsController.prototype, "restoreDeletedUserById", null);
tslib_1.__decorate([
    (0, common_1.Put)('update/:id'),
    (0, role_decorator_1.Roles)(roles_enum_1.Role.APP_LIBRARIAN, roles_enum_1.Role.APP_MANAGER, roles_enum_1.Role.APP_ADMIN),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.UNAUTHORIZED,
        description: 'Access token is invalid',
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.FORBIDDEN,
        description: 'Not enough privileges',
    }),
    tslib_1.__param(0, (0, keycloak_user_decorator_1.User)()),
    tslib_1.__param(1, (0, common_1.Param)()),
    tslib_1.__param(2, (0, common_1.Body)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_l = typeof keycloak_user_1.KeycloakUserInstance !== "undefined" && keycloak_user_1.KeycloakUserInstance) === "function" ? _l : Object, Object, typeof (_m = typeof account_add_request_payload_1.AccountAddRequestPayload !== "undefined" && account_add_request_payload_1.AccountAddRequestPayload) === "function" ? _m : Object]),
    tslib_1.__metadata("design:returntype", void 0)
], AccountsController.prototype, "updateAccountById", null);
tslib_1.__decorate([
    (0, common_1.Put)('update-profile'),
    (0, role_decorator_1.Roles)(roles_enum_1.Role.APP_LIBRARIAN, roles_enum_1.Role.APP_MANAGER, roles_enum_1.Role.APP_ADMIN),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.UNAUTHORIZED,
        description: 'Access token is invalid',
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.FORBIDDEN,
        description: 'Not enough privileges',
    }),
    tslib_1.__param(0, (0, keycloak_user_decorator_1.User)()),
    tslib_1.__param(1, (0, common_1.Body)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_o = typeof keycloak_user_1.KeycloakUserInstance !== "undefined" && keycloak_user_1.KeycloakUserInstance) === "function" ? _o : Object, typeof (_p = typeof account_update_profile_request_payload_1.AccountUpdateProfilePayload !== "undefined" && account_update_profile_request_payload_1.AccountUpdateProfilePayload) === "function" ? _p : Object]),
    tslib_1.__metadata("design:returntype", void 0)
], AccountsController.prototype, "updateMyProfile", null);
tslib_1.__decorate([
    (0, common_1.Delete)(':id'),
    (0, role_decorator_1.Roles)(roles_enum_1.Role.APP_LIBRARIAN, roles_enum_1.Role.APP_MANAGER, roles_enum_1.Role.APP_ADMIN),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.UNAUTHORIZED,
        description: 'Access token is invalid',
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.FORBIDDEN,
        description: 'Not enough privileges',
    }),
    tslib_1.__param(0, (0, keycloak_user_decorator_1.User)()),
    tslib_1.__param(1, (0, common_1.Param)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_q = typeof keycloak_user_1.KeycloakUserInstance !== "undefined" && keycloak_user_1.KeycloakUserInstance) === "function" ? _q : Object, Object]),
    tslib_1.__metadata("design:returntype", void 0)
], AccountsController.prototype, "deleteAccountById", null);
tslib_1.__decorate([
    (0, common_1.Put)('update/upload-avatar/:id'),
    (0, swagger_1.ApiConsumes)('multipart/form-data'),
    (0, common_1.UseInterceptors)(fastify_file_interceptor_1.FastifyFileInterceptor),
    (0, role_decorator_1.Roles)(roles_enum_1.Role.APP_LIBRARIAN, roles_enum_1.Role.APP_MANAGER, roles_enum_1.Role.APP_ADMIN),
    (0, swagger_1.ApiOperation)({
        summary: 'Update account avatar by account id',
        description: 'Update account avatar by account id',
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.UNAUTHORIZED,
        description: 'Access token is invalid',
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.FORBIDDEN,
        description: 'Not enough privileges',
    }),
    tslib_1.__param(0, (0, keycloak_user_decorator_1.User)()),
    tslib_1.__param(1, (0, common_1.UploadedFile)()),
    tslib_1.__param(2, (0, common_1.Param)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_r = typeof keycloak_user_1.KeycloakUserInstance !== "undefined" && keycloak_user_1.KeycloakUserInstance) === "function" ? _r : Object, typeof (_t = typeof Express !== "undefined" && (_s = Express.Multer) !== void 0 && _s.File) === "function" ? _t : Object, Object]),
    tslib_1.__metadata("design:returntype", void 0)
], AccountsController.prototype, "updateAccountUploadAvatarById", null);
tslib_1.__decorate([
    (0, common_1.Put)('update/upload-avatar/profile'),
    (0, swagger_1.ApiConsumes)('multipart/form-data'),
    (0, common_1.UseInterceptors)((0, fastify_file_interceptor_1.FastifyFileInterceptor)('file', {})),
    (0, role_decorator_1.Roles)(roles_enum_1.Role.APP_LIBRARIAN, roles_enum_1.Role.APP_MANAGER, roles_enum_1.Role.APP_ADMIN),
    (0, swagger_1.ApiOperation)({
        summary: 'Update account avatar by account id',
        description: 'Update account avatar by account id',
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.UNAUTHORIZED,
        description: 'Access token is invalid',
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.FORBIDDEN,
        description: 'Not enough privileges',
    }),
    tslib_1.__param(0, (0, keycloak_user_decorator_1.User)()),
    tslib_1.__param(1, (0, common_1.UploadedFile)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_u = typeof keycloak_user_1.KeycloakUserInstance !== "undefined" && keycloak_user_1.KeycloakUserInstance) === "function" ? _u : Object, typeof (_w = typeof Express !== "undefined" && (_v = Express.Multer) !== void 0 && _v.File) === "function" ? _w : Object]),
    tslib_1.__metadata("design:returntype", void 0)
], AccountsController.prototype, "updateCurrentProfileAvatar", null);
tslib_1.__decorate([
    (0, common_1.Put)('update/change-password'),
    (0, role_decorator_1.Roles)(roles_enum_1.Role.APP_LIBRARIAN, roles_enum_1.Role.APP_MANAGER, roles_enum_1.Role.APP_ADMIN, roles_enum_1.Role.APP_STAFF),
    (0, swagger_1.ApiOperation)({
        summary: 'Change password by current profile',
        description: 'Change password by current profile',
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.UNAUTHORIZED,
        description: 'Access token is invalid',
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.FORBIDDEN,
        description: 'Not enough privileges',
    }),
    tslib_1.__param(0, (0, keycloak_user_decorator_1.User)()),
    tslib_1.__param(1, (0, common_1.Body)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_x = typeof keycloak_user_1.KeycloakUserInstance !== "undefined" && keycloak_user_1.KeycloakUserInstance) === "function" ? _x : Object, typeof (_y = typeof change_password_request_payload_1.ChangeProfilePasswordRequest !== "undefined" && change_password_request_payload_1.ChangeProfilePasswordRequest) === "function" ? _y : Object]),
    tslib_1.__metadata("design:returntype", void 0)
], AccountsController.prototype, "changePassword", null);
tslib_1.__decorate([
    (0, common_1.Put)('update/change-password/:id'),
    (0, role_decorator_1.Roles)(roles_enum_1.Role.APP_LIBRARIAN, roles_enum_1.Role.APP_MANAGER, roles_enum_1.Role.APP_ADMIN),
    (0, swagger_1.ApiOperation)({
        summary: 'Change password by keycloak id',
        description: 'Change password by keycloak id',
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.UNAUTHORIZED,
        description: 'Access token is invalid',
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.FORBIDDEN,
        description: 'Not enough privileges',
    }),
    tslib_1.__param(0, (0, common_1.Param)()),
    tslib_1.__param(1, (0, common_1.Body)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object, Object]),
    tslib_1.__metadata("design:returntype", void 0)
], AccountsController.prototype, "changePasswordByKeycloakId", null);
tslib_1.__decorate([
    (0, common_1.Get)('avatar'),
    (0, role_decorator_1.Roles)(roles_enum_1.Role.APP_LIBRARIAN, roles_enum_1.Role.APP_MANAGER, roles_enum_1.Role.APP_ADMIN, roles_enum_1.Role.APP_STAFF),
    (0, swagger_1.ApiOperation)({
        summary: 'Get avatar URL by keycloak id',
        description: 'Get avatar URL by keycloak id',
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.UNAUTHORIZED,
        description: 'Access token is invalid',
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.FORBIDDEN,
        description: 'Not enough privileges',
    }),
    tslib_1.__param(0, (0, keycloak_user_decorator_1.User)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_z = typeof keycloak_user_1.KeycloakUserInstance !== "undefined" && keycloak_user_1.KeycloakUserInstance) === "function" ? _z : Object]),
    tslib_1.__metadata("design:returntype", void 0)
], AccountsController.prototype, "getMyAvatarURL", null);
AccountsController = AccountsController_1 = tslib_1.__decorate([
    (0, common_1.Controller)('v1/accounts'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiTags)('Accounts'),
    (0, common_1.UseInterceptors)(new path_logger_interceptor_1.PathLoggerInterceptor(AccountsController_1.name)),
    tslib_1.__metadata("design:paramtypes", [typeof (_0 = typeof services_1.AccountsService !== "undefined" && services_1.AccountsService) === "function" ? _0 : Object])
], AccountsController);
exports.AccountsController = AccountsController;


/***/ }),

/***/ "./apps/backend/src/app/controllers/app.controller.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var AppController_1, _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AppController = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const services_1 = __webpack_require__("./apps/backend/src/app/services/index.ts");
const config_1 = __webpack_require__("@nestjs/config");
const swagger_1 = __webpack_require__("@nestjs/swagger");
const path_logger_interceptor_1 = __webpack_require__("./apps/backend/src/app/interceptors/path-logger.interceptor.ts");
let AppController = AppController_1 = class AppController {
    constructor(appService, configService) {
        this.appService = appService;
        this.configService = configService;
    }
    getData() {
        return this.appService.getData();
    }
};
tslib_1.__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiCreatedResponse)({
        description: 'Test if Web API is working correctly',
        status: common_1.HttpStatus.OK,
    }),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", void 0)
], AppController.prototype, "getData", null);
AppController = AppController_1 = tslib_1.__decorate([
    (0, common_1.Controller)(),
    (0, swagger_1.ApiTags)("Application"),
    (0, common_1.UseInterceptors)(new path_logger_interceptor_1.PathLoggerInterceptor(AppController_1.name)),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof services_1.AppService !== "undefined" && services_1.AppService) === "function" ? _a : Object, typeof (_b = typeof config_1.ConfigService !== "undefined" && config_1.ConfigService) === "function" ? _b : Object])
], AppController);
exports.AppController = AppController;


/***/ }),

/***/ "./apps/backend/src/app/controllers/authentication.controller.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var AuthenticationController_1, _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AuthenticationController = exports.AuthenticationRequest = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const services_1 = __webpack_require__("./apps/backend/src/app/services/index.ts");
const swagger_1 = __webpack_require__("@nestjs/swagger");
const path_constant_1 = __webpack_require__("./apps/backend/src/app/constants/controllers/keycloak/path.constant.ts");
const headers_constant_1 = __webpack_require__("./apps/backend/src/app/constants/network/headers.constant.ts");
const services_2 = __webpack_require__("./apps/backend/src/app/services/index.ts");
const path_logger_interceptor_1 = __webpack_require__("./apps/backend/src/app/interceptors/path-logger.interceptor.ts");
const refresh_token_request_payload_1 = __webpack_require__("./apps/backend/src/app/payload/response/refresh-token.request.payload.ts");
const role_decorator_1 = __webpack_require__("./apps/backend/src/app/decorators/role.decorator.ts");
const roles_enum_1 = __webpack_require__("./apps/backend/src/app/enum/roles.enum.ts");
const fastify_1 = __webpack_require__("fastify");
class AuthenticationRequest {
}
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({
        example: "admin"
    }),
    tslib_1.__metadata("design:type", String)
], AuthenticationRequest.prototype, "username", void 0);
exports.AuthenticationRequest = AuthenticationRequest;
class GoogleIDTokenRequest {
}
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({
        example: "example-id-token-as-jwt",
        type: String,
        required: true,
        description: "JWT ID Token given by Google Authentication Provider",
        name: "token",
        title: "Google ID Token"
    }),
    tslib_1.__metadata("design:type", String)
], GoogleIDTokenRequest.prototype, "token", void 0);
let AuthenticationController = AuthenticationController_1 = class AuthenticationController {
    constructor(service, authenticationService) {
        this.service = service;
        this.authenticationService = authenticationService;
    }
    validateTokenAndGetUserInfo(payload) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            if (Object.keys(payload).length < 1) {
                throw new common_1.BadRequestException("Must provide access token");
            }
            return this.service.getUserInfo(payload.token);
        });
    }
    signIn(httpResponse, account) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const resp = yield this.authenticationService.handleUsernamePasswordLogin(account);
            httpResponse.header("Authorization", resp.accessToken);
            httpResponse.header("AuthorizationRefreshToken", resp.refreshToken);
            httpResponse.header("Set-Cookie", [
                `accessToken=${resp.accessToken}; Max-Age=999999; HttpOnly; path=/`,
                `refreshToken=${resp.accessToken}; Max-Age=999999; HttpOnly; path=/`
            ]);
            return {
                email: resp.email,
                id: resp.id,
                googleId: resp.googleId,
                phone: resp.phone,
                username: resp.username,
                keycloakId: resp.keycloakId,
                role: resp.role,
                fullname: resp.fullname,
                avatar: resp.avatar
            };
        });
    }
    signInWithGoogle(httpResponse, request) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const resp = yield this.authenticationService.handleGoogleSignin(request.token);
            httpResponse.header("Authorization", resp.accessToken);
            httpResponse.header("AuthorizationRefreshToken", resp.refreshToken);
            httpResponse.header("Set-Cookie", [
                `accessToken=${resp.accessToken}; Max-Age=999999; HttpOnly; path=/`,
                `refreshToken=${resp.accessToken}; Max-Age=999999; HttpOnly; path=/`
            ]);
            return {
                email: resp.email,
                id: resp.id,
                googleId: resp.googleId,
                phone: resp.phone,
                username: resp.username,
                keycloakId: resp.keycloakId,
                role: resp.role,
                fullname: resp.fullname
            };
        });
    }
    refreshAccessToken(res, payload) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const response = yield this.service.refreshAccessToken(payload);
            res.cookie("accessToken", response.accessToken);
            res.cookie("refreshToken", response.refreshToken);
            return response;
        });
    }
    signOut(req, id) {
        return this.service.signOutKeycloakUser(req.headers[headers_constant_1.AUTHORIZATION_LOWERCASE], id);
    }
    countUsers(request) {
        return this.service.countUsers(request.headers[headers_constant_1.AUTHORIZATION_LOWERCASE]);
    }
    getAllKeycloakUsers(req) {
        return this.service.getAllUsers(req.headers[headers_constant_1.AUTHORIZATION_LOWERCASE]);
    }
    getKeycloakUserById(req, id) {
        return this.service.getUserById(req.headers[headers_constant_1.AUTHORIZATION_LOWERCASE], id);
    }
    createUser(user, req) {
        return this.service.createKeycloakUser(req.headers[headers_constant_1.AUTHORIZATION_LOWERCASE], user);
    }
    resetKeycloakUserPassword(req, id, password) {
        return this.service.resetKeycloakUserById(req, id, password.rawPasswword);
    }
};
tslib_1.__decorate([
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, common_1.Post)("info"),
    tslib_1.__param(0, (0, common_1.Body)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], AuthenticationController.prototype, "validateTokenAndGetUserInfo", null);
tslib_1.__decorate([
    (0, swagger_1.ApiOperation)({
        summary: "Username password login",
        description: "Login into the system using provided username and password"
    }),
    (0, swagger_1.ApiBody)({
        required: true,
        description: "Contains the username and password value.",
        type: AuthenticationRequest
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK
    }),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, common_1.Post)(path_constant_1.KEYCLOAK_PATH.signIn),
    tslib_1.__param(0, (0, common_1.Res)({ passthrough: true })),
    tslib_1.__param(1, (0, common_1.Body)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof fastify_1.FastifyReply !== "undefined" && fastify_1.FastifyReply) === "function" ? _a : Object, Object]),
    tslib_1.__metadata("design:returntype", typeof (_b = typeof Promise !== "undefined" && Promise) === "function" ? _b : Object)
], AuthenticationController.prototype, "signIn", null);
tslib_1.__decorate([
    (0, common_1.Post)("signin/google"),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({
        summary: "Login into system using Google ID Token",
        description: "Use Google ID Token to login into the system then return the user instance with access token and refresh token"
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
        description: "Successfully logged into the system"
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.UNAUTHORIZED,
        description: "Invalid Google ID Token credentials"
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.BAD_REQUEST,
        description: "User"
    }),
    tslib_1.__param(0, (0, common_1.Res)({ passthrough: true })),
    tslib_1.__param(1, (0, common_1.Body)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_c = typeof fastify_1.FastifyReply !== "undefined" && fastify_1.FastifyReply) === "function" ? _c : Object, GoogleIDTokenRequest]),
    tslib_1.__metadata("design:returntype", Promise)
], AuthenticationController.prototype, "signInWithGoogle", null);
tslib_1.__decorate([
    (0, common_1.Post)(path_constant_1.KEYCLOAK_PATH.refreshAccessToken),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({
        summary: "Refresh access token using provided refresh token",
        description: "Provide new access token and new refresh token by using provided refresh token"
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
        description: "Successfully provides new access and refresh token"
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.UNAUTHORIZED,
        description: "Failed to validate provided refresh token"
    }),
    tslib_1.__param(0, (0, common_1.Res)({ passthrough: true })),
    tslib_1.__param(1, (0, common_1.Body)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object, typeof (_d = typeof refresh_token_request_payload_1.RefreshTokenPayload !== "undefined" && refresh_token_request_payload_1.RefreshTokenPayload) === "function" ? _d : Object]),
    tslib_1.__metadata("design:returntype", typeof (_e = typeof Promise !== "undefined" && Promise) === "function" ? _e : Object)
], AuthenticationController.prototype, "refreshAccessToken", null);
tslib_1.__decorate([
    (0, common_1.Post)(path_constant_1.KEYCLOAK_PATH.signOut),
    tslib_1.__param(0, (0, common_1.Request)()),
    tslib_1.__param(1, (0, common_1.Param)("id")),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_f = typeof common_1.Request !== "undefined" && common_1.Request) === "function" ? _f : Object, String]),
    tslib_1.__metadata("design:returntype", void 0)
], AuthenticationController.prototype, "signOut", null);
tslib_1.__decorate([
    (0, common_1.Get)(path_constant_1.KEYCLOAK_PATH.countUsers),
    tslib_1.__param(0, (0, common_1.Request)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_g = typeof common_1.Request !== "undefined" && common_1.Request) === "function" ? _g : Object]),
    tslib_1.__metadata("design:returntype", void 0)
], AuthenticationController.prototype, "countUsers", null);
tslib_1.__decorate([
    (0, common_1.Get)(path_constant_1.KEYCLOAK_PATH.getUsers),
    tslib_1.__param(0, (0, common_1.Request)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_h = typeof common_1.Request !== "undefined" && common_1.Request) === "function" ? _h : Object]),
    tslib_1.__metadata("design:returntype", void 0)
], AuthenticationController.prototype, "getAllKeycloakUsers", null);
tslib_1.__decorate([
    (0, common_1.Get)(path_constant_1.KEYCLOAK_PATH.getUserById),
    (0, swagger_1.ApiParam)({
        name: 'id',
        description: "The ID of the existed keycloak user",
        type: String,
        required: true,
        example: 'ABCD1234',
    }),
    tslib_1.__param(0, (0, common_1.Request)()),
    tslib_1.__param(1, (0, common_1.Param)("id")),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_j = typeof common_1.Request !== "undefined" && common_1.Request) === "function" ? _j : Object, String]),
    tslib_1.__metadata("design:returntype", void 0)
], AuthenticationController.prototype, "getKeycloakUserById", null);
tslib_1.__decorate([
    (0, common_1.Post)(path_constant_1.KEYCLOAK_PATH.createNewUser),
    tslib_1.__param(0, (0, common_1.Body)()),
    tslib_1.__param(1, (0, common_1.Request)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object, typeof (_k = typeof common_1.Request !== "undefined" && common_1.Request) === "function" ? _k : Object]),
    tslib_1.__metadata("design:returntype", void 0)
], AuthenticationController.prototype, "createUser", null);
tslib_1.__decorate([
    (0, common_1.Put)(path_constant_1.KEYCLOAK_PATH.refreshUserPasswordById),
    (0, swagger_1.ApiParam)({
        name: "id",
        description: "The ID of the existed keycloak user",
        type: String,
        required: true,
        example: "ABCD1234"
    }),
    (0, role_decorator_1.Roles)(roles_enum_1.Role.APP_STAFF),
    tslib_1.__param(0, (0, common_1.Request)()),
    tslib_1.__param(1, (0, common_1.Param)("id")),
    tslib_1.__param(2, (0, common_1.Body)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_l = typeof common_1.Request !== "undefined" && common_1.Request) === "function" ? _l : Object, Object, Object]),
    tslib_1.__metadata("design:returntype", void 0)
], AuthenticationController.prototype, "resetKeycloakUserPassword", null);
AuthenticationController = AuthenticationController_1 = tslib_1.__decorate([
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Controller)(path_constant_1.KEYCLOAK_PATH.requestPath),
    (0, swagger_1.ApiTags)("Authentication"),
    (0, common_1.UseInterceptors)(new path_logger_interceptor_1.PathLoggerInterceptor(AuthenticationController_1.name)),
    tslib_1.__metadata("design:paramtypes", [typeof (_m = typeof services_1.KeycloakService !== "undefined" && services_1.KeycloakService) === "function" ? _m : Object, typeof (_o = typeof services_2.AuthenticationService !== "undefined" && services_2.AuthenticationService) === "function" ? _o : Object])
], AuthenticationController);
exports.AuthenticationController = AuthenticationController;


/***/ }),

/***/ "./apps/backend/src/app/controllers/booking-reason.controller.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b, _c, _d, _e, _f, _g;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.BookingReasonController = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const booking_reason_service_1 = __webpack_require__("./apps/backend/src/app/services/booking-reason.service.ts");
const swagger_1 = __webpack_require__("@nestjs/swagger");
const role_decorator_1 = __webpack_require__("./apps/backend/src/app/decorators/role.decorator.ts");
const roles_enum_1 = __webpack_require__("./apps/backend/src/app/enum/roles.enum.ts");
const keycloak_user_decorator_1 = __webpack_require__("./apps/backend/src/app/decorators/keycloak-user.decorator.ts");
const keycloak_user_1 = __webpack_require__("./apps/backend/src/app/dto/keycloak.user.ts");
const booking_reason_request_payload_1 = __webpack_require__("./apps/backend/src/app/payload/request/booking-reason.request.payload.ts");
const pagination_model_1 = __webpack_require__("./apps/backend/src/app/controllers/pagination.model.ts");
let BookingReasonController = class BookingReasonController {
    constructor(service) {
        this.service = service;
    }
    getBookingReasonTypes(payload) {
        return this.service.getBookingReasonTypesWithPagination(payload);
    }
    getBookingReasonNames() {
        return this.service.getBookingReasonNames();
    }
    getBookingReasonById(id) {
        return this.service.getBookingReasonById(id);
    }
    addNewBookingReason(user, payload) {
        return this.service.createNewBookingReason(user.account_id, payload);
    }
    updateBookingReasonById(payload, id, user) {
        return this.service.updateBookingReasonById(user.account_id, payload, id);
    }
    deleteBookingReasonById(id, user) {
        return this.service.deleteBookingReasonById(user.account_id, id);
    }
    getDeletedBookingReasons(search) {
        return this.service.getDeletedReasons(search);
    }
    restoreDeletedReasonById(id, keycloakUser) {
        return this.service.restoreDeletedReasonById(keycloakUser.account_id, id);
    }
    permanentlyDeleteReasonById(id) {
        return this.service.permanentlyDeleteReasonById(id);
    }
};
tslib_1.__decorate([
    (0, common_1.Get)(),
    (0, role_decorator_1.Roles)(roles_enum_1.Role.APP_LIBRARIAN, roles_enum_1.Role.APP_MANAGER, roles_enum_1.Role.APP_ADMIN),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
        description: 'Successfully fetched booking reason by pagination',
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.BAD_REQUEST,
        description: 'Request params for roles is not validated',
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.UNAUTHORIZED,
        description: 'Access token is invalidated',
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.FORBIDDEN,
        description: 'Insufficient privileges',
    }),
    (0, swagger_1.ApiOperation)({
        summary: 'Get booking reason type by pagination',
        description: 'Get booking reason type by pagination',
    }),
    tslib_1.__param(0, (0, common_1.Query)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof pagination_model_1.PaginationParams !== "undefined" && pagination_model_1.PaginationParams) === "function" ? _a : Object]),
    tslib_1.__metadata("design:returntype", void 0)
], BookingReasonController.prototype, "getBookingReasonTypes", null);
tslib_1.__decorate([
    (0, common_1.Get)('name'),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
        description: 'Successfully got booking reason',
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.BAD_REQUEST,
        description: 'Request params for roles is not validated',
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.FORBIDDEN,
        description: 'Insufficient privileges',
    }),
    (0, swagger_1.ApiOperation)({
        summary: 'Get booking reason',
        description: 'Get booking reason',
    }),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", void 0)
], BookingReasonController.prototype, "getBookingReasonNames", null);
tslib_1.__decorate([
    (0, common_1.Get)(':id'),
    (0, role_decorator_1.Roles)(roles_enum_1.Role.APP_LIBRARIAN, roles_enum_1.Role.APP_MANAGER, roles_enum_1.Role.APP_ADMIN),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
        description: 'Successfully fetched room type by id',
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.BAD_REQUEST,
        description: 'Request params for roles is not validated',
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.UNAUTHORIZED,
        description: 'Access token is invalidated',
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.FORBIDDEN,
        description: 'Insufficient privileges',
    }),
    (0, swagger_1.ApiOperation)({
        summary: 'Get booking-reason by id',
        description: 'Get booking-reason by id',
    }),
    tslib_1.__param(0, (0, common_1.Param)('id')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String]),
    tslib_1.__metadata("design:returntype", void 0)
], BookingReasonController.prototype, "getBookingReasonById", null);
tslib_1.__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({
        summary: 'Add booking reason',
        description: 'Add booking reason',
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
        description: 'Successfully added booking reason',
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.BAD_REQUEST,
        description: 'Request params for roles is not validated',
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.UNAUTHORIZED,
        description: 'Access token is invalidated',
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.FORBIDDEN,
        description: 'Insufficient privileges',
    }),
    tslib_1.__param(0, (0, keycloak_user_decorator_1.User)()),
    tslib_1.__param(1, (0, common_1.Body)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_b = typeof keycloak_user_1.KeycloakUserInstance !== "undefined" && keycloak_user_1.KeycloakUserInstance) === "function" ? _b : Object, Object]),
    tslib_1.__metadata("design:returntype", void 0)
], BookingReasonController.prototype, "addNewBookingReason", null);
tslib_1.__decorate([
    (0, common_1.Put)(':id'),
    (0, role_decorator_1.Roles)(roles_enum_1.Role.APP_LIBRARIAN, roles_enum_1.Role.APP_MANAGER, roles_enum_1.Role.APP_ADMIN),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
        description: 'Successfully updated booking-reason by id',
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.BAD_REQUEST,
        description: 'Request params for roles is not validated',
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.UNAUTHORIZED,
        description: 'Access token is invalidated',
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.FORBIDDEN,
        description: 'Insufficient privileges',
    }),
    (0, swagger_1.ApiOperation)({
        summary: 'Update booking-reason by id',
        description: 'Update booking-reason by id',
    }),
    tslib_1.__param(0, (0, common_1.Body)()),
    tslib_1.__param(1, (0, common_1.Param)('id')),
    tslib_1.__param(2, (0, keycloak_user_decorator_1.User)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_c = typeof booking_reason_request_payload_1.BookingReasonUpdateRequestPayload !== "undefined" && booking_reason_request_payload_1.BookingReasonUpdateRequestPayload) === "function" ? _c : Object, String, typeof (_d = typeof keycloak_user_1.KeycloakUserInstance !== "undefined" && keycloak_user_1.KeycloakUserInstance) === "function" ? _d : Object]),
    tslib_1.__metadata("design:returntype", void 0)
], BookingReasonController.prototype, "updateBookingReasonById", null);
tslib_1.__decorate([
    (0, common_1.Delete)(':id'),
    (0, role_decorator_1.Roles)(roles_enum_1.Role.APP_LIBRARIAN, roles_enum_1.Role.APP_MANAGER, roles_enum_1.Role.APP_ADMIN),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
        description: 'Successfully deleted booking reason',
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.BAD_REQUEST,
        description: 'Request params for roles is not validated',
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.UNAUTHORIZED,
        description: 'Access token is invalidated',
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.FORBIDDEN,
        description: 'Insufficient privileges',
    }),
    (0, swagger_1.ApiOperation)({
        summary: 'Deleted booking reason',
        description: 'Deleted booking reason',
    }),
    tslib_1.__param(0, (0, common_1.Param)('id')),
    tslib_1.__param(1, (0, keycloak_user_decorator_1.User)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, typeof (_e = typeof keycloak_user_1.KeycloakUserInstance !== "undefined" && keycloak_user_1.KeycloakUserInstance) === "function" ? _e : Object]),
    tslib_1.__metadata("design:returntype", void 0)
], BookingReasonController.prototype, "deleteBookingReasonById", null);
tslib_1.__decorate([
    (0, common_1.Get)('deleted'),
    (0, role_decorator_1.Roles)(roles_enum_1.Role.APP_LIBRARIAN, roles_enum_1.Role.APP_MANAGER, roles_enum_1.Role.APP_ADMIN),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
        description: 'Successfully deleted reason',
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.BAD_REQUEST,
        description: 'Request params for roles is not validated',
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.UNAUTHORIZED,
        description: 'Access token is invalidated',
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.FORBIDDEN,
        description: 'Insufficient privileges',
    }),
    (0, swagger_1.ApiOperation)({
        summary: 'Get deleted reason',
        description: 'Get deleted reason',
    }),
    tslib_1.__param(0, (0, common_1.Query)('search')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String]),
    tslib_1.__metadata("design:returntype", void 0)
], BookingReasonController.prototype, "getDeletedBookingReasons", null);
tslib_1.__decorate([
    (0, common_1.Put)('restore-deleted/:id'),
    (0, role_decorator_1.Roles)(roles_enum_1.Role.APP_LIBRARIAN, roles_enum_1.Role.APP_MANAGER, roles_enum_1.Role.APP_ADMIN),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
        description: 'Successfully restored deleted booking reason by id',
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.BAD_REQUEST,
        description: 'Request params for deleted booking reason type is not validated',
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.UNAUTHORIZED,
        description: 'Access token is invalidated',
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.FORBIDDEN,
        description: 'Insufficient privileges',
    }),
    (0, swagger_1.ApiOperation)({
        summary: 'Successfully restored deleted booking reason type by id',
        description: 'Successfully restored deleted booking reason type by id',
    }),
    tslib_1.__param(0, (0, common_1.Param)('id')),
    tslib_1.__param(1, (0, keycloak_user_decorator_1.User)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, typeof (_f = typeof keycloak_user_1.KeycloakUserInstance !== "undefined" && keycloak_user_1.KeycloakUserInstance) === "function" ? _f : Object]),
    tslib_1.__metadata("design:returntype", void 0)
], BookingReasonController.prototype, "restoreDeletedReasonById", null);
tslib_1.__decorate([
    (0, common_1.Delete)('permanent/:id'),
    (0, role_decorator_1.Roles)(roles_enum_1.Role.APP_LIBRARIAN, roles_enum_1.Role.APP_MANAGER, roles_enum_1.Role.APP_ADMIN),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
        description: 'Successfully permanent deleted room type by id',
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.BAD_REQUEST,
        description: 'Request params for permanent delete room type is not validated',
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.UNAUTHORIZED,
        description: 'Access token is invalidated',
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.FORBIDDEN,
        description: 'Insufficient privileges',
    }),
    (0, swagger_1.ApiOperation)({
        summary: 'Permanently delete room type by id',
        description: 'Permanently delete room type by id',
    }),
    tslib_1.__param(0, (0, common_1.Param)('id')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String]),
    tslib_1.__metadata("design:returntype", void 0)
], BookingReasonController.prototype, "permanentlyDeleteReasonById", null);
BookingReasonController = tslib_1.__decorate([
    (0, common_1.Controller)('/v1/booking-reasons'),
    tslib_1.__metadata("design:paramtypes", [typeof (_g = typeof booking_reason_service_1.BookingReasonService !== "undefined" && booking_reason_service_1.BookingReasonService) === "function" ? _g : Object])
], BookingReasonController);
exports.BookingReasonController = BookingReasonController;


/***/ }),

/***/ "./apps/backend/src/app/controllers/booking-room.controller.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var BookingRoomController_1, _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.BookingRoomController = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const services_1 = __webpack_require__("./apps/backend/src/app/services/index.ts");
const keycloak_user_decorator_1 = __webpack_require__("./apps/backend/src/app/decorators/keycloak-user.decorator.ts");
const wishlist_booking_room_request_dto_1 = __webpack_require__("./apps/backend/src/app/dto/wishlist-booking-room.request.dto.ts");
const swagger_1 = __webpack_require__("@nestjs/swagger");
const path_logger_interceptor_1 = __webpack_require__("./apps/backend/src/app/interceptors/path-logger.interceptor.ts");
const role_decorator_1 = __webpack_require__("./apps/backend/src/app/decorators/role.decorator.ts");
const roles_enum_1 = __webpack_require__("./apps/backend/src/app/enum/roles.enum.ts");
const keycloak_user_1 = __webpack_require__("./apps/backend/src/app/dto/keycloak.user.ts");
const booking_request_add_request_payload_1 = __webpack_require__("./apps/backend/src/app/payload/request/booking-request-add.request.payload.ts");
let BookingRoomController = BookingRoomController_1 = class BookingRoomController {
    constructor(service) {
        this.service = service;
    }
    getAllBookingRoomsPagination(search, sort, limit, page, reasonType, checkInAt, checkOutAt, status, dir) {
        return this.service.getAllBookingRoomsPagination({
            checkOutAt: checkOutAt,
            checkInAt: checkInAt,
            search: search,
            dir: dir,
            page: page,
            sort: sort,
            limit: limit,
            reasonType: reasonType,
            status: status,
        });
    }
    getBookingByRoomInWeek(roomId, date) {
        return this.service.getBookingByRoomInWeek({
            roomId: roomId,
            date: date,
        });
    }
    getBookingWithSameSlot(checkinSlotId, checkoutSlotId, roomId, requestId, date, user) {
        return this.service.getBookingWithSameSlot({
            roomId: roomId,
            requestId: requestId,
            date: date,
            checkinSlotId: checkinSlotId,
            checkoutSlotId: checkoutSlotId,
        });
    }
    getRequestBookingByRoomId(roomId = '') {
        return this.service.getRequestBookingByRoomId(roomId);
    }
    getRequestBookingByAccountId(accountId = '') {
        return this.service.getRequestBookingByAccountId(accountId);
    }
    getBookingRoomById(id) {
        return this.service.getBookingRoomById(id);
    }
    getChoosingBookingRooms(filter) {
        return this.service.getChoosingBookingRooms(filter);
    }
    getCurrentRoomBookingListOfCurrentUser(user) {
        return this.service.getCurrentRoomBookingList(user.account_id);
    }
    getCurrentRoomBookingDetail(user, payload) {
        return this.service.getCurrentRoomBookingDetail(user.account_id, payload.id);
    }
    getCountRequestBookingPending() {
        return this.service.getCountRequestBookingPending();
    }
    getBookingRooms(search, sorting, slot) {
        return this.service.getBookingRooms({
            sorting: sorting,
            search: search,
            slot: slot,
        });
    }
    addNewRequest(user, request) {
        return this.service.addNewRequest(request, user.account_id);
    }
    acceptRequestById(user, payload) {
        return this.service.acceptById(user.account_id, payload.id);
    }
    rejectRequestById(user, payload) {
        return this.service.rejectById(user.account_id, payload.id);
    }
    cancelRoomBookingById(user, payload) {
        return this.service.cancelRoomBookingById(user.account_id, payload.id);
    }
    getUsernameList() {
        return this.service.getUsernameList();
    }
    getRoomsName() {
        return this.service.getRoomNames();
    }
    getBookingRoomDevices(name, type, sort) {
        return this.service.getBookingRoomDevices(name, type, sort);
    }
    getWishlistBookingRooms(user, roomName, slotFrom, slotTo) {
        return this.service.getWishlistBookingRooms(roomName, slotFrom, slotTo, user);
    }
    addToBookingRoomWishlist(user, bookingRoomWishlist) {
        return this.service.addToBookingRoomWishlist(user, bookingRoomWishlist);
    }
    removeFromBookingRoomWishlist(user, roomId, slot) {
        return this.service.removeFromBookingRoomWishlist(user, {
            roomId: roomId,
            slot: slot,
        });
    }
};
tslib_1.__decorate([
    (0, common_1.Get)('search'),
    (0, role_decorator_1.Roles)(roles_enum_1.Role.APP_LIBRARIAN, roles_enum_1.Role.APP_MANAGER, roles_enum_1.Role.APP_ADMIN),
    tslib_1.__param(0, (0, common_1.Query)('search', new common_1.DefaultValuePipe(''))),
    tslib_1.__param(1, (0, common_1.Query)('sort', new common_1.DefaultValuePipe('requested_at'))),
    tslib_1.__param(2, (0, common_1.Query)('limit', new common_1.DefaultValuePipe(5), common_1.ParseIntPipe)),
    tslib_1.__param(3, (0, common_1.Query)('page', new common_1.DefaultValuePipe(1), common_1.ParseIntPipe)),
    tslib_1.__param(4, (0, common_1.Query)('reasonType', new common_1.DefaultValuePipe(''))),
    tslib_1.__param(5, (0, common_1.Query)('checkInAt', new common_1.DefaultValuePipe(''))),
    tslib_1.__param(6, (0, common_1.Query)('checkOutAt', new common_1.DefaultValuePipe(''))),
    tslib_1.__param(7, (0, common_1.Query)('status', new common_1.DefaultValuePipe(''))),
    tslib_1.__param(8, (0, common_1.Query)('dir', new common_1.DefaultValuePipe('ASC'))),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, String, Number, Number, String, String, String, String, String]),
    tslib_1.__metadata("design:returntype", void 0)
], BookingRoomController.prototype, "getAllBookingRoomsPagination", null);
tslib_1.__decorate([
    (0, common_1.Get)('list-booking-by-room-in-week'),
    (0, role_decorator_1.Roles)(roles_enum_1.Role.APP_LIBRARIAN, roles_enum_1.Role.APP_MANAGER, roles_enum_1.Role.APP_ADMIN, roles_enum_1.Role.APP_STAFF),
    tslib_1.__param(0, (0, common_1.Query)('roomId', new common_1.DefaultValuePipe(''))),
    tslib_1.__param(1, (0, common_1.Query)('date', new common_1.DefaultValuePipe(''))),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, String]),
    tslib_1.__metadata("design:returntype", void 0)
], BookingRoomController.prototype, "getBookingByRoomInWeek", null);
tslib_1.__decorate([
    (0, common_1.Get)('list-booking-with-same-slot'),
    (0, role_decorator_1.Roles)(roles_enum_1.Role.APP_LIBRARIAN, roles_enum_1.Role.APP_MANAGER, roles_enum_1.Role.APP_ADMIN, roles_enum_1.Role.APP_STAFF),
    tslib_1.__param(0, (0, common_1.Query)('checkinSlotId', new common_1.DefaultValuePipe(''))),
    tslib_1.__param(1, (0, common_1.Query)('checkoutSlotId', new common_1.DefaultValuePipe(''))),
    tslib_1.__param(2, (0, common_1.Query)('roomId', new common_1.DefaultValuePipe(''))),
    tslib_1.__param(3, (0, common_1.Query)('requestId', new common_1.DefaultValuePipe(''))),
    tslib_1.__param(4, (0, common_1.Query)('date', new common_1.DefaultValuePipe(''))),
    tslib_1.__param(5, (0, keycloak_user_decorator_1.User)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, String, String, String, String, typeof (_a = typeof keycloak_user_1.KeycloakUserInstance !== "undefined" && keycloak_user_1.KeycloakUserInstance) === "function" ? _a : Object]),
    tslib_1.__metadata("design:returntype", void 0)
], BookingRoomController.prototype, "getBookingWithSameSlot", null);
tslib_1.__decorate([
    (0, common_1.Get)('by-room-id'),
    (0, role_decorator_1.Roles)(roles_enum_1.Role.APP_LIBRARIAN, roles_enum_1.Role.APP_MANAGER, roles_enum_1.Role.APP_ADMIN),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.UNAUTHORIZED,
        description: 'Access token is invalidated',
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.BAD_REQUEST,
        description: 'One or more payload parameters are invalid',
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
        description: 'Successfully fetched deleted rooms',
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.FORBIDDEN,
        description: 'Insufficient privileges',
    }),
    tslib_1.__param(0, (0, common_1.Query)('room-id')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", typeof (_b = typeof Promise !== "undefined" && Promise) === "function" ? _b : Object)
], BookingRoomController.prototype, "getRequestBookingByRoomId", null);
tslib_1.__decorate([
    (0, common_1.Get)('by-account-id'),
    (0, role_decorator_1.Roles)(roles_enum_1.Role.APP_LIBRARIAN, roles_enum_1.Role.APP_MANAGER, roles_enum_1.Role.APP_ADMIN),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.UNAUTHORIZED,
        description: 'Access token is invalidated',
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.BAD_REQUEST,
        description: 'One or more payload parameters are invalid',
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
        description: 'Successfully fetched deleted rooms',
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.FORBIDDEN,
        description: 'Insufficient privileges',
    }),
    tslib_1.__param(0, (0, common_1.Query)('account-id')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", typeof (_c = typeof Promise !== "undefined" && Promise) === "function" ? _c : Object)
], BookingRoomController.prototype, "getRequestBookingByAccountId", null);
tslib_1.__decorate([
    (0, common_1.Get)(':id'),
    (0, role_decorator_1.Roles)(roles_enum_1.Role.APP_LIBRARIAN, roles_enum_1.Role.APP_MANAGER, roles_enum_1.Role.APP_ADMIN),
    (0, swagger_1.ApiOperation)({
        summary: 'Retrieving booking room detail',
        description: 'Retrieving a booking room detail',
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
        description: 'Successfully retrieved a list of booking rooms',
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.BAD_REQUEST,
        description: 'Error while retrieving a list of booking rooms',
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.UNAUTHORIZED,
        description: 'Invalid access token',
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.FORBIDDEN,
        description: 'Insufficient privileges',
    }),
    tslib_1.__param(0, (0, common_1.Param)('id')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String]),
    tslib_1.__metadata("design:returntype", void 0)
], BookingRoomController.prototype, "getBookingRoomById", null);
tslib_1.__decorate([
    (0, common_1.Get)('rooms'),
    (0, role_decorator_1.Roles)(roles_enum_1.Role.APP_LIBRARIAN, roles_enum_1.Role.APP_MANAGER, roles_enum_1.Role.APP_ADMIN, roles_enum_1.Role.APP_STAFF),
    tslib_1.__param(0, (0, common_1.Query)('filter')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String]),
    tslib_1.__metadata("design:returntype", void 0)
], BookingRoomController.prototype, "getChoosingBookingRooms", null);
tslib_1.__decorate([
    (0, common_1.Get)('current-booking-list'),
    (0, role_decorator_1.Roles)(roles_enum_1.Role.APP_LIBRARIAN, roles_enum_1.Role.APP_MANAGER, roles_enum_1.Role.APP_ADMIN, roles_enum_1.Role.APP_STAFF),
    tslib_1.__param(0, (0, keycloak_user_decorator_1.User)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_d = typeof keycloak_user_1.KeycloakUserInstance !== "undefined" && keycloak_user_1.KeycloakUserInstance) === "function" ? _d : Object]),
    tslib_1.__metadata("design:returntype", void 0)
], BookingRoomController.prototype, "getCurrentRoomBookingListOfCurrentUser", null);
tslib_1.__decorate([
    (0, common_1.Get)('current-booking/:id'),
    (0, role_decorator_1.Roles)(roles_enum_1.Role.APP_LIBRARIAN, roles_enum_1.Role.APP_MANAGER, roles_enum_1.Role.APP_ADMIN, roles_enum_1.Role.APP_STAFF),
    tslib_1.__param(0, (0, keycloak_user_decorator_1.User)()),
    tslib_1.__param(1, (0, common_1.Param)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_e = typeof keycloak_user_1.KeycloakUserInstance !== "undefined" && keycloak_user_1.KeycloakUserInstance) === "function" ? _e : Object, Object]),
    tslib_1.__metadata("design:returntype", void 0)
], BookingRoomController.prototype, "getCurrentRoomBookingDetail", null);
tslib_1.__decorate([
    (0, common_1.Get)('count-pending'),
    (0, role_decorator_1.Roles)(roles_enum_1.Role.APP_LIBRARIAN, roles_enum_1.Role.APP_MANAGER, roles_enum_1.Role.APP_ADMIN),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.UNAUTHORIZED,
        description: 'Access token is invalidated',
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.BAD_REQUEST,
        description: 'One or more payload parameters are invalid',
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
        description: 'Successfully get count request booking pending',
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.FORBIDDEN,
        description: 'Insufficient privileges',
    }),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", void 0)
], BookingRoomController.prototype, "getCountRequestBookingPending", null);
tslib_1.__decorate([
    (0, common_1.Get)(),
    (0, role_decorator_1.Roles)(roles_enum_1.Role.APP_LIBRARIAN, roles_enum_1.Role.APP_MANAGER, roles_enum_1.Role.APP_ADMIN),
    (0, swagger_1.ApiOperation)({
        summary: 'Retrieving a list of booking rooms',
        description: 'Retrieving a list of booking rooms',
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
        description: 'Successfully retrieved a list of booking rooms',
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.BAD_REQUEST,
        description: 'Error while retrieving a list of booking rooms',
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.UNAUTHORIZED,
        description: 'Invalid access token',
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.FORBIDDEN,
        description: 'Insufficient privileges',
    }),
    (0, swagger_1.ApiParam)({
        name: 'roomName',
        description: 'The name of the library room',
        example: 'LB01',
        type: String,
        required: true,
    }),
    tslib_1.__param(0, (0, common_1.Query)('search')),
    tslib_1.__param(1, (0, common_1.Query)('sorting')),
    tslib_1.__param(2, (0, common_1.Query)('slot')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, String, Number]),
    tslib_1.__metadata("design:returntype", typeof (_f = typeof Promise !== "undefined" && Promise) === "function" ? _f : Object)
], BookingRoomController.prototype, "getBookingRooms", null);
tslib_1.__decorate([
    (0, common_1.Post)('new-request'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, role_decorator_1.Roles)(roles_enum_1.Role.APP_LIBRARIAN, roles_enum_1.Role.APP_MANAGER, roles_enum_1.Role.APP_ADMIN, roles_enum_1.Role.APP_STAFF),
    (0, swagger_1.ApiOperation)({
        summary: 'Create a new request',
        description: 'Create new request with the provided payload',
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.CREATED,
        description: 'Successfully created a new request',
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.BAD_REQUEST,
        description: 'Request payload for request is not validated',
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.UNAUTHORIZED,
        description: 'Access token is invalidated',
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.FORBIDDEN,
        description: 'Insufficient privileges',
    }),
    tslib_1.__param(0, (0, keycloak_user_decorator_1.User)()),
    tslib_1.__param(1, (0, common_1.Body)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_g = typeof keycloak_user_1.KeycloakUserInstance !== "undefined" && keycloak_user_1.KeycloakUserInstance) === "function" ? _g : Object, typeof (_h = typeof booking_request_add_request_payload_1.BookingRequestAddRequestPayload !== "undefined" && booking_request_add_request_payload_1.BookingRequestAddRequestPayload) === "function" ? _h : Object]),
    tslib_1.__metadata("design:returntype", void 0)
], BookingRoomController.prototype, "addNewRequest", null);
tslib_1.__decorate([
    (0, common_1.Put)('accept/:id'),
    (0, role_decorator_1.Roles)(roles_enum_1.Role.APP_LIBRARIAN, roles_enum_1.Role.APP_MANAGER, roles_enum_1.Role.APP_ADMIN),
    (0, swagger_1.ApiOperation)({
        summary: 'Accept request by id',
        description: 'Accept request by provided id',
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
        description: 'Successfully accept the request',
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.BAD_REQUEST,
        description: 'Error while accept the request',
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.UNAUTHORIZED,
        description: 'Invalid access token',
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.FORBIDDEN,
        description: 'Insufficient privileges',
    }),
    tslib_1.__param(0, (0, keycloak_user_decorator_1.User)()),
    tslib_1.__param(1, (0, common_1.Param)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_j = typeof keycloak_user_1.KeycloakUserInstance !== "undefined" && keycloak_user_1.KeycloakUserInstance) === "function" ? _j : Object, Object]),
    tslib_1.__metadata("design:returntype", void 0)
], BookingRoomController.prototype, "acceptRequestById", null);
tslib_1.__decorate([
    (0, common_1.Put)('reject/:id'),
    (0, role_decorator_1.Roles)(roles_enum_1.Role.APP_LIBRARIAN, roles_enum_1.Role.APP_MANAGER, roles_enum_1.Role.APP_ADMIN),
    (0, swagger_1.ApiOperation)({
        summary: 'Reject request by id',
        description: 'Reject request by provided id',
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
        description: 'Successfully reject the request',
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.BAD_REQUEST,
        description: 'Error while reject the request',
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.UNAUTHORIZED,
        description: 'Invalid access token',
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.FORBIDDEN,
        description: 'Insufficient privileges',
    }),
    tslib_1.__param(0, (0, keycloak_user_decorator_1.User)()),
    tslib_1.__param(1, (0, common_1.Param)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_k = typeof keycloak_user_1.KeycloakUserInstance !== "undefined" && keycloak_user_1.KeycloakUserInstance) === "function" ? _k : Object, Object]),
    tslib_1.__metadata("design:returntype", void 0)
], BookingRoomController.prototype, "rejectRequestById", null);
tslib_1.__decorate([
    (0, common_1.Put)('cancel/:id'),
    (0, role_decorator_1.Roles)(roles_enum_1.Role.APP_LIBRARIAN, roles_enum_1.Role.APP_MANAGER, roles_enum_1.Role.APP_ADMIN, roles_enum_1.Role.APP_STAFF),
    tslib_1.__param(0, (0, keycloak_user_decorator_1.User)()),
    tslib_1.__param(1, (0, common_1.Param)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_l = typeof keycloak_user_1.KeycloakUserInstance !== "undefined" && keycloak_user_1.KeycloakUserInstance) === "function" ? _l : Object, Object]),
    tslib_1.__metadata("design:returntype", void 0)
], BookingRoomController.prototype, "cancelRoomBookingById", null);
tslib_1.__decorate([
    (0, common_1.Get)('accounts-name'),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", void 0)
], BookingRoomController.prototype, "getUsernameList", null);
tslib_1.__decorate([
    (0, common_1.Get)('rooms-name'),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", void 0)
], BookingRoomController.prototype, "getRoomsName", null);
tslib_1.__decorate([
    (0, common_1.Get)('devices'),
    (0, role_decorator_1.Roles)(roles_enum_1.Role.APP_LIBRARIAN, roles_enum_1.Role.APP_ADMIN, roles_enum_1.Role.APP_MANAGER, roles_enum_1.Role.APP_STAFF),
    tslib_1.__param(0, (0, common_1.Query)('name')),
    tslib_1.__param(1, (0, common_1.Query)('type')),
    tslib_1.__param(2, (0, common_1.Query)('sort')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, String, String]),
    tslib_1.__metadata("design:returntype", void 0)
], BookingRoomController.prototype, "getBookingRoomDevices", null);
tslib_1.__decorate([
    (0, common_1.Get)('wishlist'),
    (0, role_decorator_1.Roles)(roles_enum_1.Role.APP_LIBRARIAN, roles_enum_1.Role.APP_MANAGER, roles_enum_1.Role.APP_ADMIN),
    (0, swagger_1.ApiOperation)({
        summary: 'Retrieving a list of booking rooms in wishlist',
        description: 'Retrieving a list of booking rooms in wishlist',
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
        description: 'Successfully retrieved a list of booking rooms',
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.BAD_REQUEST,
        description: 'Error while retrieving a list of booking rooms',
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.UNAUTHORIZED,
        description: 'Invalid access token',
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.FORBIDDEN,
        description: 'Insufficient privileges',
    }),
    (0, swagger_1.ApiParam)({
        name: 'roomName',
        description: 'The name of the library room',
        example: 'LB01',
        type: String,
        required: true,
    }),
    tslib_1.__param(0, (0, keycloak_user_decorator_1.User)()),
    tslib_1.__param(1, (0, common_1.Query)('roomName')),
    tslib_1.__param(2, (0, common_1.Query)('from')),
    tslib_1.__param(3, (0, common_1.Query)('to')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_m = typeof keycloak_user_1.KeycloakUserInstance !== "undefined" && keycloak_user_1.KeycloakUserInstance) === "function" ? _m : Object, String, Number, Number]),
    tslib_1.__metadata("design:returntype", typeof (_o = typeof Promise !== "undefined" && Promise) === "function" ? _o : Object)
], BookingRoomController.prototype, "getWishlistBookingRooms", null);
tslib_1.__decorate([
    (0, common_1.Post)('add-to-wishlist'),
    (0, role_decorator_1.Roles)(roles_enum_1.Role.APP_LIBRARIAN, roles_enum_1.Role.APP_MANAGER, roles_enum_1.Role.APP_ADMIN, roles_enum_1.Role.APP_STAFF),
    (0, swagger_1.ApiOperation)({
        summary: 'Add booking room to wishlist',
        description: 'Add requested booking room to wishlist',
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
        description: 'Successfully added the booking room to the wishlist',
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.BAD_REQUEST,
        description: 'Error while adding the booking room to the wishlist',
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.UNAUTHORIZED,
        description: 'Invalid access token',
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.FORBIDDEN,
        description: 'Insufficient privileges',
    }),
    tslib_1.__param(0, (0, keycloak_user_decorator_1.User)()),
    tslib_1.__param(1, (0, common_1.Body)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_p = typeof keycloak_user_1.KeycloakUserInstance !== "undefined" && keycloak_user_1.KeycloakUserInstance) === "function" ? _p : Object, typeof (_q = typeof wishlist_booking_room_request_dto_1.WishlistBookingRoomRequestDTO !== "undefined" && wishlist_booking_room_request_dto_1.WishlistBookingRoomRequestDTO) === "function" ? _q : Object]),
    tslib_1.__metadata("design:returntype", typeof (_r = typeof Promise !== "undefined" && Promise) === "function" ? _r : Object)
], BookingRoomController.prototype, "addToBookingRoomWishlist", null);
tslib_1.__decorate([
    (0, common_1.Delete)('remove-from-wishlist'),
    (0, role_decorator_1.Roles)(roles_enum_1.Role.APP_LIBRARIAN, roles_enum_1.Role.APP_MANAGER, roles_enum_1.Role.APP_ADMIN, roles_enum_1.Role.APP_STAFF),
    tslib_1.__param(0, (0, keycloak_user_decorator_1.User)()),
    tslib_1.__param(1, (0, common_1.Query)('roomId')),
    tslib_1.__param(2, (0, common_1.Query)('slot')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_s = typeof keycloak_user_1.KeycloakUserInstance !== "undefined" && keycloak_user_1.KeycloakUserInstance) === "function" ? _s : Object, String, Number]),
    tslib_1.__metadata("design:returntype", void 0)
], BookingRoomController.prototype, "removeFromBookingRoomWishlist", null);
BookingRoomController = BookingRoomController_1 = tslib_1.__decorate([
    (0, common_1.Controller)('/v1/booking-room'),
    (0, swagger_1.ApiTags)('Booking Room'),
    (0, common_1.UseInterceptors)(new path_logger_interceptor_1.PathLoggerInterceptor(BookingRoomController_1.name)),
    (0, swagger_1.ApiBearerAuth)(),
    tslib_1.__metadata("design:paramtypes", [typeof (_t = typeof services_1.BookingRoomService !== "undefined" && services_1.BookingRoomService) === "function" ? _t : Object])
], BookingRoomController);
exports.BookingRoomController = BookingRoomController;


/***/ }),

/***/ "./apps/backend/src/app/controllers/device-type.controller.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.DeviceTypeController = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const device_type_service_1 = __webpack_require__("./apps/backend/src/app/services/device-type.service.ts");
const keycloak_user_decorator_1 = __webpack_require__("./apps/backend/src/app/decorators/keycloak-user.decorator.ts");
const keycloak_user_1 = __webpack_require__("./apps/backend/src/app/dto/keycloak.user.ts");
const role_decorator_1 = __webpack_require__("./apps/backend/src/app/decorators/role.decorator.ts");
const roles_enum_1 = __webpack_require__("./apps/backend/src/app/enum/roles.enum.ts");
const swagger_1 = __webpack_require__("@nestjs/swagger");
const pagination_model_1 = __webpack_require__("./apps/backend/src/app/controllers/pagination.model.ts");
const master_data_add_request_payload_1 = __webpack_require__("./apps/backend/src/app/payload/request/master-data-add.request.payload.ts");
let DeviceTypeController = class DeviceTypeController {
    constructor(service) {
        this.service = service;
    }
    getAllDeviceTypes(payload) {
        return this.service.getAllDeviceTypes(payload);
    }
    getDeviceTypeNames() {
        return this.service.getDeviceTypeNames();
    }
    getDeviceTypeById(id) {
        return this.service.getDeviceTypeById(id);
    }
    addNewDeviceType(user, payload) {
        return this.service.addNewDeviceType(user.account_id, payload);
    }
    updateDeviceTypeById(id, payload, user) {
        return this.service.updateDeviceTypeById(user.account_id, id, payload);
    }
    deleteDeviceTypeById(id, user) {
        return this.service.deleteDeviceTypeById(user.account_id, id);
    }
    getDeletedDeviceTypes(search) {
        return this.service.getDeletedDeviceTypes(search);
    }
    restoreDeletedTypeById(id, keycloakUser) {
        return this.service.restoreDeletedDeviceTypeById(keycloakUser.account_id, id);
    }
    permanentlyDeleteDeviceTypeById(id) {
        return this.service.permanentlyDeleteDeviceTypeById(id);
    }
};
tslib_1.__decorate([
    (0, common_1.Get)(),
    (0, role_decorator_1.Roles)(roles_enum_1.Role.APP_LIBRARIAN, roles_enum_1.Role.APP_MANAGER, roles_enum_1.Role.APP_ADMIN),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
        description: 'Successfully got get all device types',
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.BAD_REQUEST,
        description: 'Request params for roles is not validated',
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.UNAUTHORIZED,
        description: 'Access token is invalidated',
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.FORBIDDEN,
        description: 'Insufficient privileges',
    }),
    (0, swagger_1.ApiOperation)({
        summary: 'Get all device types',
        description: 'Get all device types',
    }),
    tslib_1.__param(0, (0, common_1.Query)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof pagination_model_1.PaginationParams !== "undefined" && pagination_model_1.PaginationParams) === "function" ? _a : Object]),
    tslib_1.__metadata("design:returntype", typeof (_b = typeof Promise !== "undefined" && Promise) === "function" ? _b : Object)
], DeviceTypeController.prototype, "getAllDeviceTypes", null);
tslib_1.__decorate([
    (0, common_1.Get)('name'),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
        description: 'Successfully got device type name',
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.BAD_REQUEST,
        description: 'Request params for roles is not validated',
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.FORBIDDEN,
        description: 'Insufficient privileges',
    }),
    (0, swagger_1.ApiOperation)({
        summary: 'Get device type name',
        description: 'Get device type name',
    }),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", void 0)
], DeviceTypeController.prototype, "getDeviceTypeNames", null);
tslib_1.__decorate([
    (0, common_1.Get)(':id'),
    (0, role_decorator_1.Roles)(roles_enum_1.Role.APP_LIBRARIAN, roles_enum_1.Role.APP_MANAGER, roles_enum_1.Role.APP_ADMIN),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
        description: 'Successfully fetched device type by id',
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.BAD_REQUEST,
        description: 'Request params for roles is not validated',
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.UNAUTHORIZED,
        description: 'Access token is invalidated',
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.FORBIDDEN,
        description: 'Insufficient privileges',
    }),
    (0, swagger_1.ApiOperation)({
        summary: 'Get device type by id',
        description: 'Get device type by id',
    }),
    tslib_1.__param(0, (0, common_1.Param)('id')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String]),
    tslib_1.__metadata("design:returntype", typeof (_c = typeof Promise !== "undefined" && Promise) === "function" ? _c : Object)
], DeviceTypeController.prototype, "getDeviceTypeById", null);
tslib_1.__decorate([
    (0, common_1.Post)(),
    (0, role_decorator_1.Roles)(roles_enum_1.Role.APP_LIBRARIAN, roles_enum_1.Role.APP_MANAGER, roles_enum_1.Role.APP_ADMIN),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({
        summary: 'Add device type',
        description: 'Add device type',
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
        description: 'Successfully added device type',
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.BAD_REQUEST,
        description: 'Request params for roles is not validated',
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.UNAUTHORIZED,
        description: 'Access token is invalidated',
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.FORBIDDEN,
        description: 'Insufficient privileges',
    }),
    tslib_1.__param(0, (0, keycloak_user_decorator_1.User)()),
    tslib_1.__param(1, (0, common_1.Body)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_d = typeof keycloak_user_1.KeycloakUserInstance !== "undefined" && keycloak_user_1.KeycloakUserInstance) === "function" ? _d : Object, typeof (_e = typeof master_data_add_request_payload_1.MasterDataAddRequestPayload !== "undefined" && master_data_add_request_payload_1.MasterDataAddRequestPayload) === "function" ? _e : Object]),
    tslib_1.__metadata("design:returntype", void 0)
], DeviceTypeController.prototype, "addNewDeviceType", null);
tslib_1.__decorate([
    (0, common_1.Put)(':id'),
    (0, role_decorator_1.Roles)(roles_enum_1.Role.APP_LIBRARIAN, roles_enum_1.Role.APP_MANAGER, roles_enum_1.Role.APP_ADMIN),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
        description: 'Successfully updated device type by id',
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.BAD_REQUEST,
        description: 'Request params for roles is not validated',
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.UNAUTHORIZED,
        description: 'Access token is invalidated',
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.FORBIDDEN,
        description: 'Insufficient privileges',
    }),
    (0, swagger_1.ApiOperation)({
        summary: 'Update device type by id',
        description: 'Update device type by id',
    }),
    tslib_1.__param(0, (0, common_1.Param)('id')),
    tslib_1.__param(1, (0, common_1.Body)()),
    tslib_1.__param(2, (0, keycloak_user_decorator_1.User)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, typeof (_f = typeof master_data_add_request_payload_1.MasterDataAddRequestPayload !== "undefined" && master_data_add_request_payload_1.MasterDataAddRequestPayload) === "function" ? _f : Object, typeof (_g = typeof keycloak_user_1.KeycloakUserInstance !== "undefined" && keycloak_user_1.KeycloakUserInstance) === "function" ? _g : Object]),
    tslib_1.__metadata("design:returntype", void 0)
], DeviceTypeController.prototype, "updateDeviceTypeById", null);
tslib_1.__decorate([
    (0, common_1.Delete)(':id'),
    (0, role_decorator_1.Roles)(roles_enum_1.Role.APP_LIBRARIAN, roles_enum_1.Role.APP_MANAGER, roles_enum_1.Role.APP_ADMIN),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
        description: 'Successfully deleted device types',
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.BAD_REQUEST,
        description: 'Request params for roles is not validated',
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.UNAUTHORIZED,
        description: 'Access token is invalidated',
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.FORBIDDEN,
        description: 'Insufficient privileges',
    }),
    (0, swagger_1.ApiOperation)({
        summary: 'Deleted device types',
        description: 'Deleted device types',
    }),
    tslib_1.__param(0, (0, common_1.Param)('id')),
    tslib_1.__param(1, (0, keycloak_user_decorator_1.User)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, typeof (_h = typeof keycloak_user_1.KeycloakUserInstance !== "undefined" && keycloak_user_1.KeycloakUserInstance) === "function" ? _h : Object]),
    tslib_1.__metadata("design:returntype", void 0)
], DeviceTypeController.prototype, "deleteDeviceTypeById", null);
tslib_1.__decorate([
    (0, common_1.Get)('deleted'),
    (0, role_decorator_1.Roles)(roles_enum_1.Role.APP_LIBRARIAN, roles_enum_1.Role.APP_MANAGER, roles_enum_1.Role.APP_ADMIN),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
        description: 'Successfully deleted device types',
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.BAD_REQUEST,
        description: 'Request params for roles is not validated',
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.UNAUTHORIZED,
        description: 'Access token is invalidated',
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.FORBIDDEN,
        description: 'Insufficient privileges',
    }),
    (0, swagger_1.ApiOperation)({
        summary: 'Get deleted device types',
        description: 'Get deleted device types',
    }),
    tslib_1.__param(0, (0, common_1.Query)('search')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String]),
    tslib_1.__metadata("design:returntype", void 0)
], DeviceTypeController.prototype, "getDeletedDeviceTypes", null);
tslib_1.__decorate([
    (0, common_1.Put)('restore-deleted/:id'),
    (0, role_decorator_1.Roles)(roles_enum_1.Role.APP_LIBRARIAN, roles_enum_1.Role.APP_MANAGER, roles_enum_1.Role.APP_ADMIN),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
        description: 'Successfully restored deleted device by id',
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.BAD_REQUEST,
        description: 'Request params for deleted device type is not validated',
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.UNAUTHORIZED,
        description: 'Access token is invalidated',
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.FORBIDDEN,
        description: 'Insufficient privileges',
    }),
    (0, swagger_1.ApiOperation)({
        summary: 'Successfully restored deleted device type by id',
        description: 'Successfully restored deleted device type by id',
    }),
    tslib_1.__param(0, (0, common_1.Param)('id')),
    tslib_1.__param(1, (0, keycloak_user_decorator_1.User)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, typeof (_j = typeof keycloak_user_1.KeycloakUserInstance !== "undefined" && keycloak_user_1.KeycloakUserInstance) === "function" ? _j : Object]),
    tslib_1.__metadata("design:returntype", void 0)
], DeviceTypeController.prototype, "restoreDeletedTypeById", null);
tslib_1.__decorate([
    (0, common_1.Delete)('permanent/:id'),
    (0, role_decorator_1.Roles)(roles_enum_1.Role.APP_LIBRARIAN, roles_enum_1.Role.APP_MANAGER, roles_enum_1.Role.APP_ADMIN),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
        description: 'Successfully permanent deleted device type by id',
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.BAD_REQUEST,
        description: 'Request params for permanent delete device type is not validated',
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.UNAUTHORIZED,
        description: 'Access token is invalidated',
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.FORBIDDEN,
        description: 'Insufficient privileges',
    }),
    (0, swagger_1.ApiOperation)({
        summary: 'Permanently delete device type by id',
        description: 'Permanently delete device type by id',
    }),
    tslib_1.__param(0, (0, common_1.Param)('id')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String]),
    tslib_1.__metadata("design:returntype", void 0)
], DeviceTypeController.prototype, "permanentlyDeleteDeviceTypeById", null);
DeviceTypeController = tslib_1.__decorate([
    (0, common_1.Controller)('/v1/device-type'),
    tslib_1.__metadata("design:paramtypes", [typeof (_k = typeof device_type_service_1.DeviceTypeService !== "undefined" && device_type_service_1.DeviceTypeService) === "function" ? _k : Object])
], DeviceTypeController);
exports.DeviceTypeController = DeviceTypeController;


/***/ }),

/***/ "./apps/backend/src/app/controllers/devices-pagination.model.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.DevicesPaginationParams = void 0;
const tslib_1 = __webpack_require__("tslib");
const pagination_model_1 = __webpack_require__("./apps/backend/src/app/controllers/pagination.model.ts");
const class_validator_1 = __webpack_require__("class-validator");
class DevicesPaginationParams extends pagination_model_1.PaginationParams {
}
tslib_1.__decorate([
    (0, class_validator_1.IsString)({
        message: 'Room type must be a string',
    }),
    (0, class_validator_1.IsOptional)(),
    tslib_1.__metadata("design:type", String)
], DevicesPaginationParams.prototype, "deviceType", void 0);
exports.DevicesPaginationParams = DevicesPaginationParams;


/***/ }),

/***/ "./apps/backend/src/app/controllers/devices.controller.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var DevicesController_1, _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.DevicesController = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const services_1 = __webpack_require__("./apps/backend/src/app/services/index.ts");
const swagger_1 = __webpack_require__("@nestjs/swagger");
const devices_validation_1 = __webpack_require__("./apps/backend/src/app/pipes/validation/devices.validation.ts");
const path_logger_interceptor_1 = __webpack_require__("./apps/backend/src/app/interceptors/path-logger.interceptor.ts");
const role_decorator_1 = __webpack_require__("./apps/backend/src/app/decorators/role.decorator.ts");
const roles_enum_1 = __webpack_require__("./apps/backend/src/app/enum/roles.enum.ts");
const keycloak_user_1 = __webpack_require__("./apps/backend/src/app/dto/keycloak.user.ts");
const keycloak_user_decorator_1 = __webpack_require__("./apps/backend/src/app/decorators/keycloak-user.decorator.ts");
const devices_pagination_model_1 = __webpack_require__("./apps/backend/src/app/controllers/devices-pagination.model.ts");
const data_add_request_payload_1 = __webpack_require__("./apps/backend/src/app/payload/request/data-add.request.payload.ts");
let DevicesController = DevicesController_1 = class DevicesController {
    constructor(service) {
        this.service = service;
    }
    getDevices(payload) {
        return this.service.getAll(payload);
    }
    getDeviceNames() {
        return this.service.getDeviceNames();
    }
    getDevicesByDeviceType(deviceTypeId = '') {
        return this.service.getDevicesByDeviceType(deviceTypeId);
    }
    getDeviceById(payload) {
        return this.service.findById(payload.id);
    }
    createNewDevice(user, device) {
        return this.service.add(device, user.account_id);
    }
    updateDeviceById(user, payload, body) {
        return this.service.updateById(user.account_id, payload.id, body);
    }
    disableDeviceById(user, id) {
        return this.service.disableById(user.account_id, id);
    }
    getDisableDevices(search = '') {
        return this.service.getDisabledDevices(search);
    }
    restoreDisabledDeviceById(payload, user) {
        return this.service.handleRestoreDisabledDeviceById(user.account_id, payload.id);
    }
    deleteDeviceById(user, payload) {
        return this.service.deleteById(user.account_id, payload.id);
    }
    getDeletedDevices(search = '') {
        return this.service.getDeletedDevices(search);
    }
    restoreDeletedDeviceById(payload) {
        return this.service.handleRestoreDeletedDeviceById(payload.id);
    }
};
tslib_1.__decorate([
    (0, common_1.Get)(),
    (0, common_1.UsePipes)(new devices_validation_1.DevicesValidation()),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, role_decorator_1.Roles)(roles_enum_1.Role.APP_LIBRARIAN, roles_enum_1.Role.APP_MANAGER, roles_enum_1.Role.APP_ADMIN),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.UNAUTHORIZED,
        description: 'Access token is invalidated',
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.BAD_REQUEST,
        description: 'One or more payload parameters are invalid',
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
        description: 'Successfully fetched devices',
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.FORBIDDEN,
        description: 'Not enough privileges to access this endpoint',
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.FORBIDDEN,
        description: 'Insufficient privileges',
    }),
    tslib_1.__param(0, (0, common_1.Query)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof devices_pagination_model_1.DevicesPaginationParams !== "undefined" && devices_pagination_model_1.DevicesPaginationParams) === "function" ? _a : Object]),
    tslib_1.__metadata("design:returntype", void 0)
], DevicesController.prototype, "getDevices", null);
tslib_1.__decorate([
    (0, common_1.Get)('name'),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
        description: 'Successfully got device type name',
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.BAD_REQUEST,
        description: 'Request params for roles is not validated',
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.FORBIDDEN,
        description: 'Insufficient privileges',
    }),
    (0, swagger_1.ApiOperation)({
        summary: 'Get device type name',
        description: 'Get device type name',
    }),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", void 0)
], DevicesController.prototype, "getDeviceNames", null);
tslib_1.__decorate([
    (0, common_1.Get)('by-device-type'),
    (0, role_decorator_1.Roles)(roles_enum_1.Role.APP_LIBRARIAN, roles_enum_1.Role.APP_MANAGER, roles_enum_1.Role.APP_ADMIN),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.UNAUTHORIZED,
        description: 'Access token is invalidated',
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.BAD_REQUEST,
        description: 'One or more payload parameters are invalid',
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
        description: 'Successfully fetched deleted devices',
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.FORBIDDEN,
        description: 'Insufficient privileges',
    }),
    tslib_1.__param(0, (0, common_1.Query)('type')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", typeof (_b = typeof Promise !== "undefined" && Promise) === "function" ? _b : Object)
], DevicesController.prototype, "getDevicesByDeviceType", null);
tslib_1.__decorate([
    (0, common_1.Get)('find/:id'),
    (0, role_decorator_1.Roles)(roles_enum_1.Role.APP_LIBRARIAN, roles_enum_1.Role.APP_MANAGER, roles_enum_1.Role.APP_ADMIN),
    (0, swagger_1.ApiOperation)({
        summary: 'Retrieving device by id',
        description: 'Retrieving device by id',
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
        description: 'Successfully retrieving device by id',
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.BAD_REQUEST,
        description: 'Error while retrieving device by id',
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.UNAUTHORIZED,
        description: 'Invalid access token',
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.FORBIDDEN,
        description: 'Insufficient privileges',
    }),
    tslib_1.__param(0, (0, common_1.Param)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", typeof (_c = typeof Promise !== "undefined" && Promise) === "function" ? _c : Object)
], DevicesController.prototype, "getDeviceById", null);
tslib_1.__decorate([
    (0, common_1.Post)('add'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, role_decorator_1.Roles)(roles_enum_1.Role.APP_LIBRARIAN, roles_enum_1.Role.APP_MANAGER, roles_enum_1.Role.APP_ADMIN),
    (0, swagger_1.ApiOperation)({
        summary: 'Create a new device',
        description: 'Create new device with the provided payload',
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.CREATED,
        description: 'Successfully created a new device',
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.BAD_REQUEST,
        description: 'Request payload for device is not validated',
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.UNAUTHORIZED,
        description: 'Access token is invalidated',
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.FORBIDDEN,
        description: 'Insufficient privileges',
    }),
    tslib_1.__param(0, (0, keycloak_user_decorator_1.User)()),
    tslib_1.__param(1, (0, common_1.Body)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_d = typeof keycloak_user_1.KeycloakUserInstance !== "undefined" && keycloak_user_1.KeycloakUserInstance) === "function" ? _d : Object, typeof (_e = typeof data_add_request_payload_1.DataAddRequestPayload !== "undefined" && data_add_request_payload_1.DataAddRequestPayload) === "function" ? _e : Object]),
    tslib_1.__metadata("design:returntype", void 0)
], DevicesController.prototype, "createNewDevice", null);
tslib_1.__decorate([
    (0, common_1.Put)('update/:id'),
    (0, role_decorator_1.Roles)(roles_enum_1.Role.APP_LIBRARIAN, roles_enum_1.Role.APP_MANAGER, roles_enum_1.Role.APP_ADMIN),
    (0, swagger_1.ApiOperation)({
        summary: 'Update the device by id',
        description: 'Update the device by provided id',
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
        description: 'Successfully updated the device',
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.BAD_REQUEST,
        description: 'Error while updating the device',
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.UNAUTHORIZED,
        description: 'Invalid access token',
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.FORBIDDEN,
        description: 'Insufficient privileges',
    }),
    tslib_1.__param(0, (0, keycloak_user_decorator_1.User)()),
    tslib_1.__param(1, (0, common_1.Param)()),
    tslib_1.__param(2, (0, common_1.Body)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_f = typeof keycloak_user_1.KeycloakUserInstance !== "undefined" && keycloak_user_1.KeycloakUserInstance) === "function" ? _f : Object, Object, typeof (_g = typeof data_add_request_payload_1.DataAddRequestPayload !== "undefined" && data_add_request_payload_1.DataAddRequestPayload) === "function" ? _g : Object]),
    tslib_1.__metadata("design:returntype", void 0)
], DevicesController.prototype, "updateDeviceById", null);
tslib_1.__decorate([
    (0, common_1.Put)('disable/:id'),
    (0, role_decorator_1.Roles)(roles_enum_1.Role.APP_LIBRARIAN, roles_enum_1.Role.APP_MANAGER, roles_enum_1.Role.APP_ADMIN),
    (0, swagger_1.ApiOperation)({
        summary: 'Removing the device by id',
        description: 'Removing the device by provided id',
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
        description: 'Successfully removed the device',
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.BAD_REQUEST,
        description: 'Error while removing the device',
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.UNAUTHORIZED,
        description: 'Invalid access token',
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.FORBIDDEN,
        description: 'Insufficient privileges',
    }),
    tslib_1.__param(0, (0, keycloak_user_decorator_1.User)()),
    tslib_1.__param(1, (0, common_1.Param)('id')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_h = typeof keycloak_user_1.KeycloakUserInstance !== "undefined" && keycloak_user_1.KeycloakUserInstance) === "function" ? _h : Object, String]),
    tslib_1.__metadata("design:returntype", void 0)
], DevicesController.prototype, "disableDeviceById", null);
tslib_1.__decorate([
    (0, common_1.Get)('disabled'),
    (0, role_decorator_1.Roles)(roles_enum_1.Role.APP_LIBRARIAN, roles_enum_1.Role.APP_MANAGER, roles_enum_1.Role.APP_ADMIN),
    (0, swagger_1.ApiOperation)({
        summary: 'Retrieving a list of disabled devices',
        description: 'Retrieving a list of disabled devices',
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
        description: 'Successfully retrieving a list of disabled devices',
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.BAD_REQUEST,
        description: 'Error while retrieving a list of disabled devices',
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.UNAUTHORIZED,
        description: 'Invalid access token',
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.FORBIDDEN,
        description: 'Insufficient privileges',
    }),
    tslib_1.__param(0, (0, common_1.Query)('search')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", typeof (_j = typeof Promise !== "undefined" && Promise) === "function" ? _j : Object)
], DevicesController.prototype, "getDisableDevices", null);
tslib_1.__decorate([
    (0, common_1.Put)('restore-disabled/:id'),
    (0, role_decorator_1.Roles)(roles_enum_1.Role.APP_LIBRARIAN, roles_enum_1.Role.APP_MANAGER, roles_enum_1.Role.APP_ADMIN),
    (0, swagger_1.ApiOperation)({
        summary: 'Restore the disabled device by id',
        description: 'Restore the disabled device by provided id',
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
        description: 'Successfully restored the disabled device',
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.BAD_REQUEST,
        description: 'Error while restoring the disabled device',
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.UNAUTHORIZED,
        description: 'Invalid access token',
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.FORBIDDEN,
        description: 'Insufficient privileges',
    }),
    tslib_1.__param(0, (0, common_1.Param)()),
    tslib_1.__param(1, (0, keycloak_user_decorator_1.User)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object, typeof (_k = typeof keycloak_user_1.KeycloakUserInstance !== "undefined" && keycloak_user_1.KeycloakUserInstance) === "function" ? _k : Object]),
    tslib_1.__metadata("design:returntype", void 0)
], DevicesController.prototype, "restoreDisabledDeviceById", null);
tslib_1.__decorate([
    (0, common_1.Delete)(':id'),
    (0, role_decorator_1.Roles)(roles_enum_1.Role.APP_LIBRARIAN, roles_enum_1.Role.APP_MANAGER, roles_enum_1.Role.APP_ADMIN),
    (0, swagger_1.ApiOperation)({
        summary: 'Removing the device by id',
        description: 'Removing the device by provided id',
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
        description: 'Successfully removed the device',
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.BAD_REQUEST,
        description: 'Error while removing the device',
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.UNAUTHORIZED,
        description: 'Invalid access token',
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.FORBIDDEN,
        description: 'Insufficient privileges',
    }),
    tslib_1.__param(0, (0, keycloak_user_decorator_1.User)()),
    tslib_1.__param(1, (0, common_1.Param)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_l = typeof keycloak_user_1.KeycloakUserInstance !== "undefined" && keycloak_user_1.KeycloakUserInstance) === "function" ? _l : Object, Object]),
    tslib_1.__metadata("design:returntype", void 0)
], DevicesController.prototype, "deleteDeviceById", null);
tslib_1.__decorate([
    (0, common_1.Get)('deleted'),
    (0, role_decorator_1.Roles)(roles_enum_1.Role.APP_LIBRARIAN, roles_enum_1.Role.APP_MANAGER, roles_enum_1.Role.APP_ADMIN),
    (0, swagger_1.ApiOperation)({
        summary: 'Retrieving a list of deleted devices',
        description: 'Retrieving a list of deleted devices',
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
        description: 'Successfully retrieving a list of deleted devices',
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.BAD_REQUEST,
        description: 'Error while retrieving a list of deleted devices',
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.UNAUTHORIZED,
        description: 'Invalid access token',
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.FORBIDDEN,
        description: 'Insufficient privileges',
    }),
    tslib_1.__param(0, (0, common_1.Query)('search')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", typeof (_m = typeof Promise !== "undefined" && Promise) === "function" ? _m : Object)
], DevicesController.prototype, "getDeletedDevices", null);
tslib_1.__decorate([
    (0, common_1.Put)('restore-deleted/:id'),
    (0, role_decorator_1.Roles)(roles_enum_1.Role.APP_LIBRARIAN, roles_enum_1.Role.APP_MANAGER, roles_enum_1.Role.APP_ADMIN),
    (0, swagger_1.ApiOperation)({
        summary: 'Restore the deleted device by id',
        description: 'Restore the deleted device by provided id',
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
        description: 'Successfully restored the deleted device',
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.BAD_REQUEST,
        description: 'Error while restoring the deleted device',
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.UNAUTHORIZED,
        description: 'Invalid access token',
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.FORBIDDEN,
        description: 'Insufficient privileges',
    }),
    tslib_1.__param(0, (0, common_1.Param)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", void 0)
], DevicesController.prototype, "restoreDeletedDeviceById", null);
DevicesController = DevicesController_1 = tslib_1.__decorate([
    (0, common_1.Controller)('/v1/devices'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiTags)('Devices'),
    (0, common_1.UseInterceptors)(new path_logger_interceptor_1.PathLoggerInterceptor(DevicesController_1.name)),
    tslib_1.__metadata("design:paramtypes", [typeof (_o = typeof services_1.DevicesService !== "undefined" && services_1.DevicesService) === "function" ? _o : Object])
], DevicesController);
exports.DevicesController = DevicesController;


/***/ }),

/***/ "./apps/backend/src/app/controllers/health-check.controller.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var HealthCheckController_1, _a, _b, _c;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.HealthCheckController = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const swagger_1 = __webpack_require__("@nestjs/swagger");
const path_logger_interceptor_1 = __webpack_require__("./apps/backend/src/app/interceptors/path-logger.interceptor.ts");
const auth_guard_1 = __webpack_require__("./apps/backend/src/app/guards/auth.guard.ts");
const fastify_1 = __webpack_require__("fastify");
let HealthCheckController = HealthCheckController_1 = class HealthCheckController {
    doHealthCheck() {
        return new Promise((resolve, reject) => {
            resolve("pong!");
            reject("dead");
        });
    }
    doHealthCheckWithAuth(request) {
        console.log(request.headers["Authorization"]);
        return new Promise((resolve, reject) => {
            resolve("pong!");
            reject("dead");
        });
    }
};
tslib_1.__decorate([
    (0, swagger_1.ApiOperation)({
        description: "Health check endpoint without authentication"
    }),
    (0, common_1.Get)(),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", typeof (_a = typeof Promise !== "undefined" && Promise) === "function" ? _a : Object)
], HealthCheckController.prototype, "doHealthCheck", null);
tslib_1.__decorate([
    (0, swagger_1.ApiOperation)({
        description: "Health check endpoint without authentication"
    }),
    (0, common_1.Get)("auth"),
    (0, common_1.UseGuards)(auth_guard_1.default),
    tslib_1.__param(0, (0, common_1.Req)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_b = typeof fastify_1.FastifyRequest !== "undefined" && fastify_1.FastifyRequest) === "function" ? _b : Object]),
    tslib_1.__metadata("design:returntype", typeof (_c = typeof Promise !== "undefined" && Promise) === "function" ? _c : Object)
], HealthCheckController.prototype, "doHealthCheckWithAuth", null);
HealthCheckController = HealthCheckController_1 = tslib_1.__decorate([
    (0, common_1.Controller)("/v1/health"),
    (0, swagger_1.ApiTags)("Health Check"),
    (0, common_1.UseInterceptors)(new path_logger_interceptor_1.PathLoggerInterceptor(HealthCheckController_1.name))
], HealthCheckController);
exports.HealthCheckController = HealthCheckController;


/***/ }),

/***/ "./apps/backend/src/app/controllers/index.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__("tslib");
tslib_1.__exportStar(__webpack_require__("./apps/backend/src/app/controllers/app.controller.ts"), exports);
tslib_1.__exportStar(__webpack_require__("./apps/backend/src/app/controllers/accounts.controller.ts"), exports);
tslib_1.__exportStar(__webpack_require__("./apps/backend/src/app/controllers/authentication.controller.ts"), exports);
tslib_1.__exportStar(__webpack_require__("./apps/backend/src/app/controllers/booking-room.controller.ts"), exports);
tslib_1.__exportStar(__webpack_require__("./apps/backend/src/app/controllers/devices.controller.ts"), exports);
// export * from "./equipments-history.controller";
tslib_1.__exportStar(__webpack_require__("./apps/backend/src/app/controllers/health-check.controller.ts"), exports);
tslib_1.__exportStar(__webpack_require__("./apps/backend/src/app/controllers/rooms.controller.ts"), exports);
tslib_1.__exportStar(__webpack_require__("./apps/backend/src/app/controllers/users-otp.controller.ts"), exports);
tslib_1.__exportStar(__webpack_require__("./apps/backend/src/app/controllers/users-warning-flag.controller.ts"), exports);


/***/ }),

/***/ "./apps/backend/src/app/controllers/pagination.model.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PaginationParams = void 0;
const tslib_1 = __webpack_require__("tslib");
const class_validator_1 = __webpack_require__("class-validator");
const class_transformer_1 = __webpack_require__("class-transformer");
const contains_many_validator_1 = __webpack_require__("./apps/backend/src/app/validators/contains-many.validator.ts");
class PaginationParams {
    constructor() {
        this.search = '';
    }
}
tslib_1.__decorate([
    (0, class_validator_1.IsString)({
        message: 'Search value must be a string',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.MaxLength)(100, {
        message: 'Maximum length for search is 100 characters',
    }),
    tslib_1.__metadata("design:type", Object)
], PaginationParams.prototype, "search", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsInt)({
        message: 'Page number must be integer',
    }),
    (0, class_validator_1.IsNotEmpty)({
        message: 'Page number must not be empty',
    }),
    (0, class_transformer_1.Transform)((val) => Number.parseInt(val.value)),
    (0, class_validator_1.Min)(1, {
        message: 'Minimum value for page number is 1',
    }),
    tslib_1.__metadata("design:type", Number)
], PaginationParams.prototype, "page", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsInt)({
        message: 'Items per page must be integer',
    }),
    (0, class_validator_1.IsNotEmpty)({
        message: 'Items per page must not be empty',
    }),
    (0, class_transformer_1.Transform)((val) => Number.parseInt(val.value)),
    (0, class_validator_1.Min)(1, {
        message: 'Items per page must be at least 1',
    }),
    (0, class_validator_1.Max)(50, {
        message: 'Items per page maximum value is 50',
    }),
    tslib_1.__metadata("design:type", Number)
], PaginationParams.prototype, "limit", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, contains_many_validator_1.ContainsMany)(['ASC', 'DESC'], {
        message: 'Direction must be ASC or DESC',
    }),
    tslib_1.__metadata("design:type", String)
], PaginationParams.prototype, "dir", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNotEmpty)({
        message: 'Sorting field must not be empty',
    }),
    (0, class_validator_1.IsString)({
        message: 'Sorting field must be a string',
    }),
    tslib_1.__metadata("design:type", String)
], PaginationParams.prototype, "sort", void 0);
exports.PaginationParams = PaginationParams;


/***/ }),

/***/ "./apps/backend/src/app/controllers/role.controller.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var RoleController_1, _a, _b, _c, _d, _e, _f, _g, _h;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.RoleController = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const pagination_model_1 = __webpack_require__("./apps/backend/src/app/controllers/pagination.model.ts");
const keycloak_user_decorator_1 = __webpack_require__("./apps/backend/src/app/decorators/keycloak-user.decorator.ts");
const keycloak_user_1 = __webpack_require__("./apps/backend/src/app/dto/keycloak.user.ts");
const role_service_1 = __webpack_require__("./apps/backend/src/app/services/role.service.ts");
const swagger_1 = __webpack_require__("@nestjs/swagger");
const path_logger_interceptor_1 = __webpack_require__("./apps/backend/src/app/interceptors/path-logger.interceptor.ts");
const roles_enum_1 = __webpack_require__("./apps/backend/src/app/enum/roles.enum.ts");
const role_decorator_1 = __webpack_require__("./apps/backend/src/app/decorators/role.decorator.ts");
const master_data_add_request_payload_1 = __webpack_require__("./apps/backend/src/app/payload/request/master-data-add.request.payload.ts");
let RoleController = RoleController_1 = class RoleController {
    constructor(service) {
        this.service = service;
    }
    getRolesByPagination(payload) {
        return this.service.getRolesByPagination(payload);
    }
    getRoleNames() {
        return this.service.getRoleNames();
    }
    getRoleById(id) {
        return this.service.getRoleById(id);
    }
    addRole(body, user) {
        return this.service.addRole(body, user.account_id);
    }
    updateRoleById(body, user, id) {
        return this.service.updateRoleById(user.account_id, body, id);
    }
    deleteRoleById(keycloakUser, id) {
        return this.service.deleteRoleById(keycloakUser.account_id, id);
    }
    getDeletedRoles(search) {
        return this.service.getDeletedRoles(search);
    }
    restoreDeletedRoleById(payload, keycloakUser) {
        return this.service.handleRestoreDeletedRoleById(keycloakUser.account_id, payload.id);
    }
    permanentDeleteRoleById(id) {
        return this.service.permanentDeleteRoleById(id);
    }
};
tslib_1.__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({
        summary: 'Get roles by pagination',
        description: 'Get roles by pagination',
    }),
    (0, swagger_1.ApiProduces)('application/json'),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
        description: 'Successfully fetched roles by pagination',
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.BAD_REQUEST,
        description: 'Request params for roles is not validated',
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.UNAUTHORIZED,
        description: 'Access token is invalidated',
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.FORBIDDEN,
        description: 'Insufficient privileges',
    }),
    tslib_1.__param(0, (0, common_1.Query)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof pagination_model_1.PaginationParams !== "undefined" && pagination_model_1.PaginationParams) === "function" ? _a : Object]),
    tslib_1.__metadata("design:returntype", void 0)
], RoleController.prototype, "getRolesByPagination", null);
tslib_1.__decorate([
    (0, common_1.Get)('name'),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
        description: 'Successfully get role name',
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.BAD_REQUEST,
        description: 'Request params for roles is not validated',
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.FORBIDDEN,
        description: 'Insufficient privileges',
    }),
    (0, swagger_1.ApiOperation)({
        summary: 'Get role name',
        description: 'Get role name',
    }),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", void 0)
], RoleController.prototype, "getRoleNames", null);
tslib_1.__decorate([
    (0, common_1.Get)(':id'),
    (0, role_decorator_1.Roles)(roles_enum_1.Role.APP_LIBRARIAN, roles_enum_1.Role.APP_MANAGER, roles_enum_1.Role.APP_ADMIN),
    (0, swagger_1.ApiOperation)({
        summary: 'Get role by id',
        description: 'Get role by id',
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.BAD_REQUEST,
        description: 'Id for roel is not validated',
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.UNAUTHORIZED,
        description: 'Access token is invalidated',
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.FORBIDDEN,
        description: 'Insufficient privileges',
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
        description: 'Successfully fetched role by id',
    }),
    tslib_1.__param(0, (0, common_1.Param)('id')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String]),
    tslib_1.__metadata("design:returntype", void 0)
], RoleController.prototype, "getRoleById", null);
tslib_1.__decorate([
    (0, common_1.Post)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, role_decorator_1.Roles)(roles_enum_1.Role.APP_LIBRARIAN, roles_enum_1.Role.APP_MANAGER, roles_enum_1.Role.APP_ADMIN),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.BAD_REQUEST,
        description: 'Request payload for role is not validated',
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.UNAUTHORIZED,
        description: 'Access token is invalidated',
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.FORBIDDEN,
        description: 'Insufficient privileges',
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
        description: 'Successfully added role',
    }),
    (0, swagger_1.ApiOperation)({
        summary: 'Add role',
        description: 'Add role',
    }),
    tslib_1.__param(0, (0, common_1.Body)()),
    tslib_1.__param(1, (0, keycloak_user_decorator_1.User)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_b = typeof master_data_add_request_payload_1.MasterDataAddRequestPayload !== "undefined" && master_data_add_request_payload_1.MasterDataAddRequestPayload) === "function" ? _b : Object, typeof (_c = typeof keycloak_user_1.KeycloakUserInstance !== "undefined" && keycloak_user_1.KeycloakUserInstance) === "function" ? _c : Object]),
    tslib_1.__metadata("design:returntype", void 0)
], RoleController.prototype, "addRole", null);
tslib_1.__decorate([
    (0, common_1.Put)(':id'),
    (0, swagger_1.ApiOperation)({
        summary: 'Update role by id',
        description: 'Update role by id',
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.BAD_REQUEST,
        description: 'Request payload for role is not validated',
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.UNAUTHORIZED,
        description: 'Access token is invalidated',
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.FORBIDDEN,
        description: 'Insufficient privileges',
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
        description: 'Successfully updated role with provided id',
    }),
    (0, role_decorator_1.Roles)(roles_enum_1.Role.APP_LIBRARIAN, roles_enum_1.Role.APP_MANAGER, roles_enum_1.Role.APP_ADMIN),
    tslib_1.__param(0, (0, common_1.Body)()),
    tslib_1.__param(1, (0, keycloak_user_decorator_1.User)()),
    tslib_1.__param(2, (0, common_1.Param)('id')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_d = typeof master_data_add_request_payload_1.MasterDataAddRequestPayload !== "undefined" && master_data_add_request_payload_1.MasterDataAddRequestPayload) === "function" ? _d : Object, typeof (_e = typeof keycloak_user_1.KeycloakUserInstance !== "undefined" && keycloak_user_1.KeycloakUserInstance) === "function" ? _e : Object, String]),
    tslib_1.__metadata("design:returntype", void 0)
], RoleController.prototype, "updateRoleById", null);
tslib_1.__decorate([
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
        description: 'Successfully removed role with provided id',
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.BAD_REQUEST,
        description: 'Id for role is not validated',
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.UNAUTHORIZED,
        description: 'Access token is invalidated',
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.FORBIDDEN,
        description: 'Insufficient privileges',
    }),
    (0, swagger_1.ApiOperation)({
        summary: 'Delete role by id',
        description: 'Delete role by id',
    }),
    (0, role_decorator_1.Roles)(roles_enum_1.Role.APP_LIBRARIAN, roles_enum_1.Role.APP_MANAGER, roles_enum_1.Role.APP_ADMIN),
    tslib_1.__param(0, (0, keycloak_user_decorator_1.User)()),
    tslib_1.__param(1, (0, common_1.Param)('id')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_f = typeof keycloak_user_1.KeycloakUserInstance !== "undefined" && keycloak_user_1.KeycloakUserInstance) === "function" ? _f : Object, String]),
    tslib_1.__metadata("design:returntype", void 0)
], RoleController.prototype, "deleteRoleById", null);
tslib_1.__decorate([
    (0, common_1.Get)('deleted'),
    (0, role_decorator_1.Roles)(roles_enum_1.Role.APP_LIBRARIAN, roles_enum_1.Role.APP_MANAGER, roles_enum_1.Role.APP_ADMIN),
    (0, swagger_1.ApiOperation)({
        summary: 'Retrieving a list of deleted role',
        description: 'Retrieving a list of deleted role',
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
        description: 'Successfully retrieving a list of deleted role',
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.BAD_REQUEST,
        description: 'Error while retrieving a list of deleted role',
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.UNAUTHORIZED,
        description: 'Invalid access token',
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.FORBIDDEN,
        description: 'Insufficient privileges',
    }),
    tslib_1.__param(0, (0, common_1.Query)('search')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String]),
    tslib_1.__metadata("design:returntype", void 0)
], RoleController.prototype, "getDeletedRoles", null);
tslib_1.__decorate([
    (0, common_1.Put)('restore-deleted/:id'),
    (0, role_decorator_1.Roles)(roles_enum_1.Role.APP_LIBRARIAN, roles_enum_1.Role.APP_MANAGER, roles_enum_1.Role.APP_ADMIN),
    (0, swagger_1.ApiOperation)({
        summary: 'Restore the deleted role by id',
        description: 'Restore the deleted role by provided id',
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
        description: 'Successfully restored the deleted role',
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.BAD_REQUEST,
        description: 'Error while restoring the deleted the role',
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.UNAUTHORIZED,
        description: 'Invalid access token',
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.FORBIDDEN,
        description: 'Insufficient privileges',
    }),
    tslib_1.__param(0, (0, common_1.Param)()),
    tslib_1.__param(1, (0, keycloak_user_decorator_1.User)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object, typeof (_g = typeof keycloak_user_1.KeycloakUserInstance !== "undefined" && keycloak_user_1.KeycloakUserInstance) === "function" ? _g : Object]),
    tslib_1.__metadata("design:returntype", void 0)
], RoleController.prototype, "restoreDeletedRoleById", null);
tslib_1.__decorate([
    (0, common_1.Delete)('permanent/:id'),
    (0, role_decorator_1.Roles)(roles_enum_1.Role.APP_LIBRARIAN, roles_enum_1.Role.APP_MANAGER, roles_enum_1.Role.APP_ADMIN),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
        description: 'Successfully permanent deleted role by id',
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.BAD_REQUEST,
        description: 'Request params for permanent delete role is not validated',
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.UNAUTHORIZED,
        description: 'Access token is invalidated',
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.FORBIDDEN,
        description: 'Insufficient privileges',
    }),
    (0, swagger_1.ApiOperation)({
        summary: 'Permanently delete role by id',
        description: 'Permanently delete role by id',
    }),
    tslib_1.__param(0, (0, common_1.Param)('id')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String]),
    tslib_1.__metadata("design:returntype", void 0)
], RoleController.prototype, "permanentDeleteRoleById", null);
RoleController = RoleController_1 = tslib_1.__decorate([
    (0, common_1.Controller)('/v1/roles'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiTags)('Role'),
    (0, common_1.UseInterceptors)(new path_logger_interceptor_1.PathLoggerInterceptor(RoleController_1.name)),
    tslib_1.__metadata("design:paramtypes", [typeof (_h = typeof role_service_1.RoleService !== "undefined" && role_service_1.RoleService) === "function" ? _h : Object])
], RoleController);
exports.RoleController = RoleController;


/***/ }),

/***/ "./apps/backend/src/app/controllers/room-type.controller.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b, _c, _d, _e, _f, _g, _h;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.RoomTypeController = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const swagger_1 = __webpack_require__("@nestjs/swagger");
const room_type_service_1 = __webpack_require__("./apps/backend/src/app/services/room-type.service.ts");
const master_data_add_request_payload_1 = __webpack_require__("./apps/backend/src/app/payload/request/master-data-add.request.payload.ts");
const keycloak_user_decorator_1 = __webpack_require__("./apps/backend/src/app/decorators/keycloak-user.decorator.ts");
const keycloak_user_1 = __webpack_require__("./apps/backend/src/app/dto/keycloak.user.ts");
const path_logger_interceptor_1 = __webpack_require__("./apps/backend/src/app/interceptors/path-logger.interceptor.ts");
const role_decorator_1 = __webpack_require__("./apps/backend/src/app/decorators/role.decorator.ts");
const roles_enum_1 = __webpack_require__("./apps/backend/src/app/enum/roles.enum.ts");
const pagination_model_1 = __webpack_require__("./apps/backend/src/app/controllers/pagination.model.ts");
let RoomTypeController = class RoomTypeController {
    constructor(service) {
        this.service = service;
    }
    getRoomTypes(payload) {
        return this.service.getRoomTypesWithPagination(payload);
    }
    getRoomTypeNames() {
        return this.service.getRoomTypeNames();
    }
    getRoomTypeById(id) {
        return this.service.getRoomTypeById(id);
    }
    addRoomType(keycloakUser, addRoomType) {
        return this.service.addRoomType(keycloakUser.account_id, addRoomType);
    }
    updateRoomTypeById(id, updatePayload, keycloakUser) {
        return this.service.updateRoomTypeById(keycloakUser.account_id, updatePayload, id);
    }
    deleteRoomTypeById(id, keycloakUser) {
        return this.service.deleteRoomTypeById(keycloakUser.account_id, id);
    }
    getDeletedRoomTypes(search) {
        return this.service.getDeletedRoomTypes(search);
    }
    restoreDeletedRoomTypeById(id, keycloakUser) {
        return this.service.restoreDeletedRoomTypeById(keycloakUser.account_id, id);
    }
    permanentDeleteRoomTypeById(id) {
        return this.service.permanentDeleteRoomTypeById(id);
    }
};
tslib_1.__decorate([
    (0, common_1.Get)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, role_decorator_1.Roles)(roles_enum_1.Role.APP_LIBRARIAN, roles_enum_1.Role.APP_MANAGER, roles_enum_1.Role.APP_ADMIN),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
        description: 'Successfully fetched room types by pagination',
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.BAD_REQUEST,
        description: 'Request params for roles is not validated',
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.UNAUTHORIZED,
        description: 'Access token is invalidated',
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.FORBIDDEN,
        description: 'Insufficient privileges',
    }),
    (0, swagger_1.ApiOperation)({
        summary: 'Get room type by pagination',
        description: 'Get room type by pagination',
    }),
    (0, role_decorator_1.Roles)(roles_enum_1.Role.APP_LIBRARIAN, roles_enum_1.Role.APP_MANAGER, roles_enum_1.Role.APP_ADMIN),
    tslib_1.__param(0, (0, common_1.Query)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof pagination_model_1.PaginationParams !== "undefined" && pagination_model_1.PaginationParams) === "function" ? _a : Object]),
    tslib_1.__metadata("design:returntype", void 0)
], RoomTypeController.prototype, "getRoomTypes", null);
tslib_1.__decorate([
    (0, common_1.Get)('name'),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
        description: 'Successfully get room types name',
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.BAD_REQUEST,
        description: 'Request params for roles is not validated',
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.FORBIDDEN,
        description: 'Insufficient privileges',
    }),
    (0, swagger_1.ApiOperation)({
        summary: 'Get room types name',
        description: 'Get room types name',
    }),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", void 0)
], RoomTypeController.prototype, "getRoomTypeNames", null);
tslib_1.__decorate([
    (0, common_1.Get)(':id'),
    (0, role_decorator_1.Roles)(roles_enum_1.Role.APP_LIBRARIAN, roles_enum_1.Role.APP_MANAGER, roles_enum_1.Role.APP_ADMIN),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
        description: 'Successfully fetched room type by id',
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.BAD_REQUEST,
        description: 'Request params for roles is not validated',
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.UNAUTHORIZED,
        description: 'Access token is invalidated',
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.FORBIDDEN,
        description: 'Insufficient privileges',
    }),
    (0, swagger_1.ApiOperation)({
        summary: 'Get room type by id',
        description: 'Get room type by id',
    }),
    tslib_1.__param(0, (0, common_1.Param)('id')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String]),
    tslib_1.__metadata("design:returntype", void 0)
], RoomTypeController.prototype, "getRoomTypeById", null);
tslib_1.__decorate([
    (0, common_1.Post)(),
    (0, role_decorator_1.Roles)(roles_enum_1.Role.APP_LIBRARIAN, roles_enum_1.Role.APP_MANAGER, roles_enum_1.Role.APP_ADMIN),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({
        summary: 'Add room type',
        description: 'Add room type',
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
        description: 'Successfully added room type',
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.BAD_REQUEST,
        description: 'Request params for roles is not validated',
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.UNAUTHORIZED,
        description: 'Access token is invalidated',
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.FORBIDDEN,
        description: 'Insufficient privileges',
    }),
    tslib_1.__param(0, (0, keycloak_user_decorator_1.User)()),
    tslib_1.__param(1, (0, common_1.Body)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_b = typeof keycloak_user_1.KeycloakUserInstance !== "undefined" && keycloak_user_1.KeycloakUserInstance) === "function" ? _b : Object, typeof (_c = typeof master_data_add_request_payload_1.MasterDataAddRequestPayload !== "undefined" && master_data_add_request_payload_1.MasterDataAddRequestPayload) === "function" ? _c : Object]),
    tslib_1.__metadata("design:returntype", void 0)
], RoomTypeController.prototype, "addRoomType", null);
tslib_1.__decorate([
    (0, common_1.Put)(':id'),
    (0, role_decorator_1.Roles)(roles_enum_1.Role.APP_LIBRARIAN, roles_enum_1.Role.APP_MANAGER, roles_enum_1.Role.APP_ADMIN),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
        description: 'Successfully updated room type by id',
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.BAD_REQUEST,
        description: 'Request params for roles is not validated',
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.UNAUTHORIZED,
        description: 'Access token is invalidated',
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.FORBIDDEN,
        description: 'Insufficient privileges',
    }),
    (0, swagger_1.ApiOperation)({
        summary: 'Update room type by id',
        description: 'Update room type by id',
    }),
    tslib_1.__param(0, (0, common_1.Param)('id')),
    tslib_1.__param(1, (0, common_1.Body)()),
    tslib_1.__param(2, (0, keycloak_user_decorator_1.User)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, typeof (_d = typeof master_data_add_request_payload_1.MasterDataAddRequestPayload !== "undefined" && master_data_add_request_payload_1.MasterDataAddRequestPayload) === "function" ? _d : Object, typeof (_e = typeof keycloak_user_1.KeycloakUserInstance !== "undefined" && keycloak_user_1.KeycloakUserInstance) === "function" ? _e : Object]),
    tslib_1.__metadata("design:returntype", void 0)
], RoomTypeController.prototype, "updateRoomTypeById", null);
tslib_1.__decorate([
    (0, common_1.Delete)(':id'),
    (0, role_decorator_1.Roles)(roles_enum_1.Role.APP_LIBRARIAN, roles_enum_1.Role.APP_MANAGER, roles_enum_1.Role.APP_ADMIN),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
        description: 'Successfully deleted room type by id',
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.BAD_REQUEST,
        description: 'Request params for delete room type is not validated',
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.UNAUTHORIZED,
        description: 'Access token is invalidated',
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.FORBIDDEN,
        description: 'Insufficient privileges',
    }),
    (0, swagger_1.ApiOperation)({
        summary: 'Delete room type by id',
        description: 'Delete room type by id',
    }),
    tslib_1.__param(0, (0, common_1.Param)('id')),
    tslib_1.__param(1, (0, keycloak_user_decorator_1.User)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, typeof (_f = typeof keycloak_user_1.KeycloakUserInstance !== "undefined" && keycloak_user_1.KeycloakUserInstance) === "function" ? _f : Object]),
    tslib_1.__metadata("design:returntype", void 0)
], RoomTypeController.prototype, "deleteRoomTypeById", null);
tslib_1.__decorate([
    (0, common_1.Get)('deleted'),
    (0, role_decorator_1.Roles)(roles_enum_1.Role.APP_LIBRARIAN, roles_enum_1.Role.APP_MANAGER, roles_enum_1.Role.APP_ADMIN),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
        description: 'Successfully deleted room types',
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.BAD_REQUEST,
        description: 'Request params for roles is not validated',
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.UNAUTHORIZED,
        description: 'Access token is invalidated',
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.FORBIDDEN,
        description: 'Insufficient privileges',
    }),
    (0, swagger_1.ApiOperation)({
        summary: 'Get deleted room types',
        description: 'Get deleted room types',
    }),
    tslib_1.__param(0, (0, common_1.Query)('search')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String]),
    tslib_1.__metadata("design:returntype", void 0)
], RoomTypeController.prototype, "getDeletedRoomTypes", null);
tslib_1.__decorate([
    (0, common_1.Put)('restore-deleted/:id'),
    (0, role_decorator_1.Roles)(roles_enum_1.Role.APP_LIBRARIAN, roles_enum_1.Role.APP_MANAGER, roles_enum_1.Role.APP_ADMIN),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
        description: 'Successfully restored deleted room by id',
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.BAD_REQUEST,
        description: 'Request params for deleted room type is not validated',
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.UNAUTHORIZED,
        description: 'Access token is invalidated',
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.FORBIDDEN,
        description: 'Insufficient privileges',
    }),
    (0, swagger_1.ApiOperation)({
        summary: 'Successfully restored deleted room type by id',
        description: 'Successfully restored deleted room type by id',
    }),
    tslib_1.__param(0, (0, common_1.Param)('id')),
    tslib_1.__param(1, (0, keycloak_user_decorator_1.User)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, typeof (_g = typeof keycloak_user_1.KeycloakUserInstance !== "undefined" && keycloak_user_1.KeycloakUserInstance) === "function" ? _g : Object]),
    tslib_1.__metadata("design:returntype", void 0)
], RoomTypeController.prototype, "restoreDeletedRoomTypeById", null);
tslib_1.__decorate([
    (0, common_1.Delete)('permanent/:id'),
    (0, role_decorator_1.Roles)(roles_enum_1.Role.APP_LIBRARIAN, roles_enum_1.Role.APP_MANAGER, roles_enum_1.Role.APP_ADMIN),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
        description: 'Successfully permanent deleted room type by id',
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.BAD_REQUEST,
        description: 'Request params for permanent delete room type is not validated',
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.UNAUTHORIZED,
        description: 'Access token is invalidated',
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.FORBIDDEN,
        description: 'Insufficient privileges',
    }),
    (0, swagger_1.ApiOperation)({
        summary: 'Permanently delete room type by id',
        description: 'Permanently delete room type by id',
    }),
    tslib_1.__param(0, (0, common_1.Param)('id')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String]),
    tslib_1.__metadata("design:returntype", void 0)
], RoomTypeController.prototype, "permanentDeleteRoomTypeById", null);
RoomTypeController = tslib_1.__decorate([
    (0, common_1.Controller)('/v1/room-type'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiTags)('Room Type'),
    (0, common_1.UseInterceptors)(new path_logger_interceptor_1.PathLoggerInterceptor(room_type_service_1.RoomTypeService.name)),
    tslib_1.__metadata("design:paramtypes", [typeof (_h = typeof room_type_service_1.RoomTypeService !== "undefined" && room_type_service_1.RoomTypeService) === "function" ? _h : Object])
], RoomTypeController);
exports.RoomTypeController = RoomTypeController;


/***/ }),

/***/ "./apps/backend/src/app/controllers/rooms-pagination.model.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.RoomsPaginationParams = void 0;
const tslib_1 = __webpack_require__("tslib");
const pagination_model_1 = __webpack_require__("./apps/backend/src/app/controllers/pagination.model.ts");
const class_validator_1 = __webpack_require__("class-validator");
class RoomsPaginationParams extends pagination_model_1.PaginationParams {
}
tslib_1.__decorate([
    (0, class_validator_1.IsString)({
        message: 'Room type must be a string',
    }),
    (0, class_validator_1.IsOptional)(),
    tslib_1.__metadata("design:type", String)
], RoomsPaginationParams.prototype, "roomType", void 0);
exports.RoomsPaginationParams = RoomsPaginationParams;


/***/ }),

/***/ "./apps/backend/src/app/controllers/rooms.controller.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var RoomsController_1, _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.RoomsController = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const services_1 = __webpack_require__("./apps/backend/src/app/services/index.ts");
const rooms_validation_1 = __webpack_require__("./apps/backend/src/app/pipes/validation/rooms.validation.ts");
const swagger_1 = __webpack_require__("@nestjs/swagger");
const path_logger_interceptor_1 = __webpack_require__("./apps/backend/src/app/interceptors/path-logger.interceptor.ts");
const role_decorator_1 = __webpack_require__("./apps/backend/src/app/decorators/role.decorator.ts");
const roles_enum_1 = __webpack_require__("./apps/backend/src/app/enum/roles.enum.ts");
const add_room_validation_1 = __webpack_require__("./apps/backend/src/app/pipes/validation/add-room.validation.ts");
const keycloak_user_decorator_1 = __webpack_require__("./apps/backend/src/app/decorators/keycloak-user.decorator.ts");
const keycloak_user_1 = __webpack_require__("./apps/backend/src/app/dto/keycloak.user.ts");
const rooms_pagination_model_1 = __webpack_require__("./apps/backend/src/app/controllers/rooms-pagination.model.ts");
const data_add_request_payload_1 = __webpack_require__("./apps/backend/src/app/payload/request/data-add.request.payload.ts");
let RoomsController = RoomsController_1 = class RoomsController {
    constructor(service) {
        this.service = service;
    }
    getRooms(payload) {
        return this.service.getAll(payload);
    }
    getRoomsByRoomType(roomTypeId = '') {
        return this.service.getRoomsByRoomType(roomTypeId);
    }
    getRoomNames() {
        return this.service.getRoomNames();
    }
    getRoomById(payload) {
        return this.service.findById(payload.id);
    }
    addRoom(user, room) {
        return this.service.add(user, room);
    }
    updateRoomById(user, payload, body) {
        return this.service.updateById(user.account_id, payload.id, body);
    }
    disableRoomById(user, id) {
        return this.service.disableById(user.account_id, id);
    }
    getDisableRooms(search = '') {
        return this.service.getDisabledRooms(search);
    }
    restoreDisabledRoomById(user, payload) {
        return this.service.handleRestoreDisabledRoomById(user.account_id, payload.id);
    }
    deleteRoomById(user, payload) {
        return this.service.deleteById(user.account_id, payload.id);
    }
    getDeletedRooms(search = '') {
        return this.service.getDeletedRooms(search);
    }
    restoreDeletedRoomById(payload, user) {
        return this.service.handleRestoreDeletedRoomById(user.account_id, payload.id);
    }
};
tslib_1.__decorate([
    (0, common_1.Get)(),
    (0, common_1.UsePipes)(new rooms_validation_1.RoomsValidation()),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, role_decorator_1.Roles)(roles_enum_1.Role.APP_LIBRARIAN, roles_enum_1.Role.APP_MANAGER, roles_enum_1.Role.APP_ADMIN),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.UNAUTHORIZED,
        description: 'Access token is invalidated',
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.BAD_REQUEST,
        description: 'One or more payload parameters are invalid',
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
        description: 'Successfully fetched rooms',
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.FORBIDDEN,
        description: 'Not enough privileges to access this endpoint',
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.FORBIDDEN,
        description: 'Insufficient privileges',
    }),
    tslib_1.__param(0, (0, common_1.Query)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof rooms_pagination_model_1.RoomsPaginationParams !== "undefined" && rooms_pagination_model_1.RoomsPaginationParams) === "function" ? _a : Object]),
    tslib_1.__metadata("design:returntype", void 0)
], RoomsController.prototype, "getRooms", null);
tslib_1.__decorate([
    (0, common_1.Get)('by-room-type'),
    (0, role_decorator_1.Roles)(roles_enum_1.Role.APP_LIBRARIAN, roles_enum_1.Role.APP_MANAGER, roles_enum_1.Role.APP_ADMIN),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.UNAUTHORIZED,
        description: 'Access token is invalidated',
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.BAD_REQUEST,
        description: 'One or more payload parameters are invalid',
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
        description: 'Successfully fetched deleted rooms',
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.FORBIDDEN,
        description: 'Insufficient privileges',
    }),
    tslib_1.__param(0, (0, common_1.Query)('type')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", typeof (_b = typeof Promise !== "undefined" && Promise) === "function" ? _b : Object)
], RoomsController.prototype, "getRoomsByRoomType", null);
tslib_1.__decorate([
    (0, common_1.Get)('name'),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
        description: 'Successfully get role name',
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.BAD_REQUEST,
        description: 'Request params for roles is not validated',
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.FORBIDDEN,
        description: 'Insufficient privileges',
    }),
    (0, swagger_1.ApiOperation)({
        summary: 'Get room name',
        description: 'Get room name',
    }),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", void 0)
], RoomsController.prototype, "getRoomNames", null);
tslib_1.__decorate([
    (0, common_1.Get)('find/:id'),
    (0, role_decorator_1.Roles)(roles_enum_1.Role.APP_LIBRARIAN, roles_enum_1.Role.APP_MANAGER, roles_enum_1.Role.APP_ADMIN, roles_enum_1.Role.APP_STAFF),
    (0, swagger_1.ApiOperation)({
        summary: 'Retrieving the library room by id',
        description: 'Retrieving the library room by provided id',
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
        description: 'Successfully retrieved the library room',
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.BAD_REQUEST,
        description: 'Error while retrieving the library room',
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.UNAUTHORIZED,
        description: 'Invalid access token',
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.FORBIDDEN,
        description: 'Insufficient privileges',
    }),
    tslib_1.__param(0, (0, common_1.Param)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", typeof (_c = typeof Promise !== "undefined" && Promise) === "function" ? _c : Object)
], RoomsController.prototype, "getRoomById", null);
tslib_1.__decorate([
    (0, common_1.Post)('add'),
    (0, common_1.UsePipes)(new add_room_validation_1.AddRoomValidation()),
    (0, role_decorator_1.Roles)(roles_enum_1.Role.APP_MANAGER, roles_enum_1.Role.APP_ADMIN),
    (0, swagger_1.ApiOperation)({
        summary: 'Create a new library room',
        description: 'Create new library room with the provided payload',
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.CREATED,
        description: 'Successfully created a new library room',
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.BAD_REQUEST,
        description: 'Request payload for libary room is not validated',
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.UNAUTHORIZED,
        description: 'Access token is invalidated',
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.FORBIDDEN,
        description: 'Insufficient privileges',
    }),
    tslib_1.__param(0, (0, keycloak_user_decorator_1.User)()),
    tslib_1.__param(1, (0, common_1.Body)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_d = typeof keycloak_user_1.KeycloakUserInstance !== "undefined" && keycloak_user_1.KeycloakUserInstance) === "function" ? _d : Object, typeof (_e = typeof data_add_request_payload_1.DataAddRequestPayload !== "undefined" && data_add_request_payload_1.DataAddRequestPayload) === "function" ? _e : Object]),
    tslib_1.__metadata("design:returntype", typeof (_f = typeof Promise !== "undefined" && Promise) === "function" ? _f : Object)
], RoomsController.prototype, "addRoom", null);
tslib_1.__decorate([
    (0, common_1.Put)('update/:id'),
    (0, role_decorator_1.Roles)(roles_enum_1.Role.APP_LIBRARIAN, roles_enum_1.Role.APP_MANAGER, roles_enum_1.Role.APP_ADMIN),
    (0, swagger_1.ApiOperation)({
        summary: 'Update library room by id',
        description: 'Update library room by provided id',
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
        description: 'Successfully updated the library room',
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.BAD_REQUEST,
        description: 'Error while updating the library room',
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.UNAUTHORIZED,
        description: 'Invalid access token',
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.FORBIDDEN,
        description: 'Insufficient privileges',
    }),
    tslib_1.__param(0, (0, keycloak_user_decorator_1.User)()),
    tslib_1.__param(1, (0, common_1.Param)()),
    tslib_1.__param(2, (0, common_1.Body)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_g = typeof keycloak_user_1.KeycloakUserInstance !== "undefined" && keycloak_user_1.KeycloakUserInstance) === "function" ? _g : Object, Object, typeof (_h = typeof data_add_request_payload_1.DataAddRequestPayload !== "undefined" && data_add_request_payload_1.DataAddRequestPayload) === "function" ? _h : Object]),
    tslib_1.__metadata("design:returntype", void 0)
], RoomsController.prototype, "updateRoomById", null);
tslib_1.__decorate([
    (0, common_1.Put)('disable/:id'),
    (0, role_decorator_1.Roles)(roles_enum_1.Role.APP_LIBRARIAN, roles_enum_1.Role.APP_MANAGER, roles_enum_1.Role.APP_ADMIN),
    (0, swagger_1.ApiOperation)({
        summary: 'Disable library room by id',
        description: 'Disable library room by provided id',
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
        description: 'Successfully disabled the library room',
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.BAD_REQUEST,
        description: 'Error while disabling the library room',
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.UNAUTHORIZED,
        description: 'Invalid access token',
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.FORBIDDEN,
        description: 'Insufficient privileges',
    }),
    tslib_1.__param(0, (0, keycloak_user_decorator_1.User)()),
    tslib_1.__param(1, (0, common_1.Param)('id')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_j = typeof keycloak_user_1.KeycloakUserInstance !== "undefined" && keycloak_user_1.KeycloakUserInstance) === "function" ? _j : Object, String]),
    tslib_1.__metadata("design:returntype", void 0)
], RoomsController.prototype, "disableRoomById", null);
tslib_1.__decorate([
    (0, common_1.Get)('disabled'),
    (0, role_decorator_1.Roles)(roles_enum_1.Role.APP_LIBRARIAN, roles_enum_1.Role.APP_MANAGER, roles_enum_1.Role.APP_ADMIN),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.UNAUTHORIZED,
        description: 'Access token is invalidated',
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.BAD_REQUEST,
        description: 'One or more payload parameters are invalid',
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
        description: 'Successfully fetched disabled rooms',
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.FORBIDDEN,
        description: 'Insufficient privileges',
    }),
    tslib_1.__param(0, (0, common_1.Query)('search')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", typeof (_k = typeof Promise !== "undefined" && Promise) === "function" ? _k : Object)
], RoomsController.prototype, "getDisableRooms", null);
tslib_1.__decorate([
    (0, common_1.Put)('restore-disabled/:id'),
    (0, role_decorator_1.Roles)(roles_enum_1.Role.APP_LIBRARIAN, roles_enum_1.Role.APP_MANAGER, roles_enum_1.Role.APP_ADMIN),
    (0, swagger_1.ApiOperation)({
        summary: 'Restore the disabled library room by id',
        description: 'Restore the disabled library room by provided id',
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
        description: 'Successfully restored the disabled library room',
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.BAD_REQUEST,
        description: 'Error while restoring the disabled the library room',
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.UNAUTHORIZED,
        description: 'Invalid access token',
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.FORBIDDEN,
        description: 'Insufficient privileges',
    }),
    tslib_1.__param(0, (0, keycloak_user_decorator_1.User)()),
    tslib_1.__param(1, (0, common_1.Param)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_l = typeof keycloak_user_1.KeycloakUserInstance !== "undefined" && keycloak_user_1.KeycloakUserInstance) === "function" ? _l : Object, Object]),
    tslib_1.__metadata("design:returntype", void 0)
], RoomsController.prototype, "restoreDisabledRoomById", null);
tslib_1.__decorate([
    (0, common_1.Delete)(':id'),
    (0, role_decorator_1.Roles)(roles_enum_1.Role.APP_LIBRARIAN, roles_enum_1.Role.APP_MANAGER, roles_enum_1.Role.APP_ADMIN),
    (0, swagger_1.ApiOperation)({
        summary: 'Remove library room by id',
        description: 'Remove library room by provided id',
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
        description: 'Successfully removed the library room',
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.BAD_REQUEST,
        description: 'Error while removing the library room',
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.UNAUTHORIZED,
        description: 'Invalid access token',
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.FORBIDDEN,
        description: 'Insufficient privileges',
    }),
    tslib_1.__param(0, (0, keycloak_user_decorator_1.User)()),
    tslib_1.__param(1, (0, common_1.Param)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_m = typeof keycloak_user_1.KeycloakUserInstance !== "undefined" && keycloak_user_1.KeycloakUserInstance) === "function" ? _m : Object, Object]),
    tslib_1.__metadata("design:returntype", void 0)
], RoomsController.prototype, "deleteRoomById", null);
tslib_1.__decorate([
    (0, common_1.Get)('deleted'),
    (0, role_decorator_1.Roles)(roles_enum_1.Role.APP_LIBRARIAN, roles_enum_1.Role.APP_MANAGER, roles_enum_1.Role.APP_ADMIN),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.UNAUTHORIZED,
        description: 'Access token is invalidated',
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.BAD_REQUEST,
        description: 'One or more payload parameters are invalid',
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
        description: 'Successfully fetched deleted rooms',
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.FORBIDDEN,
        description: 'Insufficient privileges',
    }),
    tslib_1.__param(0, (0, common_1.Query)('search')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", typeof (_o = typeof Promise !== "undefined" && Promise) === "function" ? _o : Object)
], RoomsController.prototype, "getDeletedRooms", null);
tslib_1.__decorate([
    (0, common_1.Put)('restore-deleted/:id'),
    (0, role_decorator_1.Roles)(roles_enum_1.Role.APP_LIBRARIAN, roles_enum_1.Role.APP_MANAGER, roles_enum_1.Role.APP_ADMIN),
    (0, swagger_1.ApiOperation)({
        summary: 'Restore the deleted library room by id',
        description: 'Restore the deleted library room by provided id',
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
        description: 'Successfully restored the deleted library room',
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.BAD_REQUEST,
        description: 'Error while restoring the deleted the library room',
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.UNAUTHORIZED,
        description: 'Invalid access token',
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.FORBIDDEN,
        description: 'Insufficient privileges',
    }),
    tslib_1.__param(0, (0, common_1.Param)()),
    tslib_1.__param(1, (0, keycloak_user_decorator_1.User)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object, typeof (_p = typeof keycloak_user_1.KeycloakUserInstance !== "undefined" && keycloak_user_1.KeycloakUserInstance) === "function" ? _p : Object]),
    tslib_1.__metadata("design:returntype", void 0)
], RoomsController.prototype, "restoreDeletedRoomById", null);
RoomsController = RoomsController_1 = tslib_1.__decorate([
    (0, common_1.Controller)('/v1/rooms'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiTags)('Rooms'),
    (0, common_1.UseInterceptors)(new path_logger_interceptor_1.PathLoggerInterceptor(RoomsController_1.name)),
    tslib_1.__metadata("design:paramtypes", [typeof (_q = typeof services_1.RoomsService !== "undefined" && services_1.RoomsService) === "function" ? _q : Object])
], RoomsController);
exports.RoomsController = RoomsController;


/***/ }),

/***/ "./apps/backend/src/app/controllers/slots.controller.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SlotController = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const slot_service_1 = __webpack_require__("./apps/backend/src/app/services/slot.service.ts");
const pagination_model_1 = __webpack_require__("./apps/backend/src/app/controllers/pagination.model.ts");
const role_decorator_1 = __webpack_require__("./apps/backend/src/app/decorators/role.decorator.ts");
const roles_enum_1 = __webpack_require__("./apps/backend/src/app/enum/roles.enum.ts");
let SlotController = class SlotController {
    constructor(service) {
        this.service = service;
    }
    getAllSlotsByPagination(params) {
        return this.service.getAllByPagination(params);
    }
    getRoomNames() {
        return this.service.getSlotNames();
    }
    getSlotById(id) {
        return this.service.getById(id);
    }
};
tslib_1.__decorate([
    (0, common_1.Get)(),
    (0, role_decorator_1.Roles)(roles_enum_1.Role.APP_LIBRARIAN, roles_enum_1.Role.APP_MANAGER, roles_enum_1.Role.APP_ADMIN),
    tslib_1.__param(0, (0, common_1.Optional)()),
    tslib_1.__param(0, (0, common_1.Query)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof pagination_model_1.PaginationParams !== "undefined" && pagination_model_1.PaginationParams) === "function" ? _a : Object]),
    tslib_1.__metadata("design:returntype", void 0)
], SlotController.prototype, "getAllSlotsByPagination", null);
tslib_1.__decorate([
    (0, common_1.Get)('name'),
    (0, role_decorator_1.Roles)(roles_enum_1.Role.APP_LIBRARIAN, roles_enum_1.Role.APP_MANAGER, roles_enum_1.Role.APP_ADMIN, roles_enum_1.Role.APP_STAFF),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", void 0)
], SlotController.prototype, "getRoomNames", null);
tslib_1.__decorate([
    (0, common_1.Get)(':id'),
    (0, role_decorator_1.Roles)(roles_enum_1.Role.APP_LIBRARIAN, roles_enum_1.Role.APP_MANAGER, roles_enum_1.Role.APP_ADMIN),
    tslib_1.__param(0, (0, common_1.Param)('id')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String]),
    tslib_1.__metadata("design:returntype", void 0)
], SlotController.prototype, "getSlotById", null);
SlotController = tslib_1.__decorate([
    (0, common_1.Controller)('/v1/slots'),
    tslib_1.__metadata("design:paramtypes", [typeof (_b = typeof slot_service_1.SlotService !== "undefined" && slot_service_1.SlotService) === "function" ? _b : Object])
], SlotController);
exports.SlotController = SlotController;


/***/ }),

/***/ "./apps/backend/src/app/controllers/users-otp.controller.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var UsersOTPController_1, _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UsersOTPController = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const services_1 = __webpack_require__("./apps/backend/src/app/services/index.ts");
const swagger_1 = __webpack_require__("@nestjs/swagger");
const path_logger_interceptor_1 = __webpack_require__("./apps/backend/src/app/interceptors/path-logger.interceptor.ts");
const role_decorator_1 = __webpack_require__("./apps/backend/src/app/decorators/role.decorator.ts");
const roles_enum_1 = __webpack_require__("./apps/backend/src/app/enum/roles.enum.ts");
let UsersOTPController = UsersOTPController_1 = class UsersOTPController {
    constructor(service) {
        this.service = service;
    }
    getAll() {
        return this.service.getAllByPagination();
    }
};
tslib_1.__decorate([
    (0, swagger_1.ApiOperation)({
        description: "UsersOTP"
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.BAD_REQUEST,
        description: 'Request payload for UsersOTP is not validated',
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.UNAUTHORIZED,
        description: 'Access token is invalidated',
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.FORBIDDEN,
        description: 'Invalid role',
    }),
    (0, common_1.Get)(),
    (0, role_decorator_1.Roles)(roles_enum_1.Role.APP_LIBRARIAN, roles_enum_1.Role.APP_MANAGER, roles_enum_1.Role.APP_ADMIN),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", typeof (_a = typeof Promise !== "undefined" && Promise) === "function" ? _a : Object)
], UsersOTPController.prototype, "getAll", null);
UsersOTPController = UsersOTPController_1 = tslib_1.__decorate([
    (0, common_1.Controller)("/v1/users-otp"),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiTags)("Users OTP"),
    (0, common_1.UseInterceptors)(new path_logger_interceptor_1.PathLoggerInterceptor(UsersOTPController_1.name)),
    tslib_1.__metadata("design:paramtypes", [typeof (_b = typeof services_1.UsersOTPService !== "undefined" && services_1.UsersOTPService) === "function" ? _b : Object])
], UsersOTPController);
exports.UsersOTPController = UsersOTPController;


/***/ }),

/***/ "./apps/backend/src/app/controllers/users-warning-flag-history.controller.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var UsersWarningFlagHistoryController_1, _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UsersWarningFlagHistoryController = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const services_1 = __webpack_require__("./apps/backend/src/app/services/index.ts");
const swagger_1 = __webpack_require__("@nestjs/swagger");
const path_logger_interceptor_1 = __webpack_require__("./apps/backend/src/app/interceptors/path-logger.interceptor.ts");
const role_decorator_1 = __webpack_require__("./apps/backend/src/app/decorators/role.decorator.ts");
const roles_enum_1 = __webpack_require__("./apps/backend/src/app/enum/roles.enum.ts");
let UsersWarningFlagHistoryController = UsersWarningFlagHistoryController_1 = class UsersWarningFlagHistoryController {
    constructor(service) {
        this.service = service;
    }
    getAll() {
        return this.service.getAllByPagination();
    }
};
tslib_1.__decorate([
    (0, swagger_1.ApiOperation)({
        description: "History of warning users flag"
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.BAD_REQUEST,
        description: 'Request payload for room booking is not validated',
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.UNAUTHORIZED,
        description: 'Access token is invalidated',
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.FORBIDDEN,
        description: 'Invalid role',
    }),
    (0, common_1.Get)(),
    (0, role_decorator_1.Roles)(roles_enum_1.Role.APP_LIBRARIAN, roles_enum_1.Role.APP_MANAGER, roles_enum_1.Role.APP_ADMIN),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", typeof (_a = typeof Promise !== "undefined" && Promise) === "function" ? _a : Object)
], UsersWarningFlagHistoryController.prototype, "getAll", null);
UsersWarningFlagHistoryController = UsersWarningFlagHistoryController_1 = tslib_1.__decorate([
    (0, common_1.Controller)("/v1/users-warning-flag-history"),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseInterceptors)(new path_logger_interceptor_1.PathLoggerInterceptor(UsersWarningFlagHistoryController_1.name)),
    (0, swagger_1.ApiTags)("Users Warning Flag History"),
    tslib_1.__metadata("design:paramtypes", [typeof (_b = typeof services_1.UsersWarningFlagHistoryService !== "undefined" && services_1.UsersWarningFlagHistoryService) === "function" ? _b : Object])
], UsersWarningFlagHistoryController);
exports.UsersWarningFlagHistoryController = UsersWarningFlagHistoryController;


/***/ }),

/***/ "./apps/backend/src/app/controllers/users-warning-flag.controller.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var UsersWarningFlagController_1, _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UsersWarningFlagController = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const services_1 = __webpack_require__("./apps/backend/src/app/services/index.ts");
const path_logger_interceptor_1 = __webpack_require__("./apps/backend/src/app/interceptors/path-logger.interceptor.ts");
const swagger_1 = __webpack_require__("@nestjs/swagger");
const role_decorator_1 = __webpack_require__("./apps/backend/src/app/decorators/role.decorator.ts");
const roles_enum_1 = __webpack_require__("./apps/backend/src/app/enum/roles.enum.ts");
let UsersWarningFlagController = UsersWarningFlagController_1 = class UsersWarningFlagController {
    constructor(service) {
        this.service = service;
    }
    getAll() {
        return this.service.getAllByPagination();
    }
};
tslib_1.__decorate([
    (0, common_1.Get)(),
    (0, role_decorator_1.Roles)(roles_enum_1.Role.APP_LIBRARIAN, roles_enum_1.Role.APP_MANAGER, roles_enum_1.Role.APP_ADMIN),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", typeof (_a = typeof Promise !== "undefined" && Promise) === "function" ? _a : Object)
], UsersWarningFlagController.prototype, "getAll", null);
UsersWarningFlagController = UsersWarningFlagController_1 = tslib_1.__decorate([
    (0, common_1.Controller)("/v1/users-warning-flag"),
    (0, swagger_1.ApiTags)("Users Warning Flag"),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseInterceptors)(new path_logger_interceptor_1.PathLoggerInterceptor(UsersWarningFlagController_1.name)),
    tslib_1.__metadata("design:paramtypes", [typeof (_b = typeof services_1.UsersWarningFlagService !== "undefined" && services_1.UsersWarningFlagService) === "function" ? _b : Object])
], UsersWarningFlagController);
exports.UsersWarningFlagController = UsersWarningFlagController;


/***/ }),

/***/ "./apps/backend/src/app/decorators/keycloak-user.decorator.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.User = exports.KeycloakUser = void 0;
const common_1 = __webpack_require__("@nestjs/common");
const parse_token_pipe_1 = __webpack_require__("./apps/backend/src/app/pipes/parse-token.pipe.ts");
const access_token_extractor_util_1 = __webpack_require__("./apps/backend/src/app/validators/utils/access-token-extractor.util.ts");
exports.KeycloakUser = (0, common_1.createParamDecorator)((data, ctx) => {
    var _a;
    const request = ctx.switchToHttp().getRequest();
    const accessToken = (_a = request.headers["authorization"]) !== null && _a !== void 0 ? _a : (0, access_token_extractor_util_1.getAccessTokenViaCookie)(request);
    if (accessToken === undefined || accessToken === null) {
        throw new common_1.UnauthorizedException("Access token is not provided");
    }
    return accessToken;
});
const User = (additionalOptions) => (0, exports.KeycloakUser)(additionalOptions, parse_token_pipe_1.ParseTokenPipe);
exports.User = User;


/***/ }),

/***/ "./apps/backend/src/app/decorators/role.decorator.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Roles = exports.ROLES_KEY = void 0;
const common_1 = __webpack_require__("@nestjs/common");
exports.ROLES_KEY = "roles";
const Roles = (...roles) => (0, common_1.SetMetadata)(exports.ROLES_KEY, roles);
exports.Roles = Roles;


/***/ }),

/***/ "./apps/backend/src/app/decorators/typeorm-ex.decorator.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CustomRepository = exports.TYPEORM_EX_CUSTOM_REPOSITORY = void 0;
const common_1 = __webpack_require__("@nestjs/common");
exports.TYPEORM_EX_CUSTOM_REPOSITORY = "TYPEORM_EX_CUSTOM_REPOSITORY";
// eslint-disable-next-line @typescript-eslint/ban-types
function CustomRepository(entity) {
    return (0, common_1.SetMetadata)(exports.TYPEORM_EX_CUSTOM_REPOSITORY, entity);
}
exports.CustomRepository = CustomRepository;


/***/ }),

/***/ "./apps/backend/src/app/dto/keycloak.user.ts":
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));


/***/ }),

/***/ "./apps/backend/src/app/dto/wishlist-booking-room.request.dto.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.WishlistBookingRoomRequestDTO = void 0;
const tslib_1 = __webpack_require__("tslib");
const swagger_1 = __webpack_require__("@nestjs/swagger");
class WishlistBookingRoomRequestDTO {
}
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({
        name: "roomId",
        type: String,
        description: "Id of the requested booking library room",
        example: "LB01",
        title: "Room ID",
        required: true
    }),
    tslib_1.__metadata("design:type", String)
], WishlistBookingRoomRequestDTO.prototype, "roomId", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({
        name: "slot",
        type: Number,
        description: "Requested booking room slot",
        example: 1,
        title: "Slot",
        required: true
    }),
    tslib_1.__metadata("design:type", Number)
], WishlistBookingRoomRequestDTO.prototype, "slot", void 0);
exports.WishlistBookingRoomRequestDTO = WishlistBookingRoomRequestDTO;


/***/ }),

/***/ "./apps/backend/src/app/enum/booking-room-status.enum.ts":
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.BookingRoomStatus = void 0;
var BookingRoomStatus;
(function (BookingRoomStatus) {
    BookingRoomStatus["Booking"] = "BOOKING";
    BookingRoomStatus["Booked"] = "BOOKED";
    BookingRoomStatus["Rejected"] = "REJECTED";
})(BookingRoomStatus = exports.BookingRoomStatus || (exports.BookingRoomStatus = {}));


/***/ }),

/***/ "./apps/backend/src/app/enum/roles.enum.ts":
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Role = void 0;
var Role;
(function (Role) {
    Role["APP_ADMIN"] = "System Admin";
    Role["APP_MANAGER"] = "Manager";
    Role["APP_LIBRARIAN"] = "Librarian";
    Role["APP_STAFF"] = "Staff";
})(Role = exports.Role || (exports.Role = {}));


/***/ }),

/***/ "./apps/backend/src/app/enum/room-type.enum.ts":
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.RoomType = void 0;
var RoomType;
(function (RoomType) {
    RoomType["LIBRARY_ROOM"] = "Library Room";
    RoomType["SEMINAR_ROOM"] = "Seminar Room";
    RoomType["LIBRARY_HALL"] = "Library Hall";
})(RoomType = exports.RoomType || (exports.RoomType = {}));


/***/ }),

/***/ "./apps/backend/src/app/guards/auth.guard.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const services_1 = __webpack_require__("./apps/backend/src/app/services/index.ts");
const access_token_extractor_util_1 = __webpack_require__("./apps/backend/src/app/validators/utils/access-token-extractor.util.ts");
let AuthGuard = class AuthGuard {
    constructor(keycloakService) {
        this.keycloakService = keycloakService;
    }
    canActivate(context) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const request = context.switchToHttp().getRequest();
            const accessToken = (0, access_token_extractor_util_1.getAccessTokenViaCookie)(request);
            const response = yield this.keycloakService.getUserInfo(accessToken);
            return !!response;
        });
    }
};
AuthGuard = tslib_1.__decorate([
    tslib_1.__param(0, (0, common_1.Inject)(services_1.KeycloakService)),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof services_1.KeycloakService !== "undefined" && services_1.KeycloakService) === "function" ? _a : Object])
], AuthGuard);
exports["default"] = AuthGuard;


/***/ }),

/***/ "./apps/backend/src/app/guards/role.guard.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b, _c;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.RolesGuard = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const core_1 = __webpack_require__("@nestjs/core");
const role_decorator_1 = __webpack_require__("./apps/backend/src/app/decorators/role.decorator.ts");
const services_1 = __webpack_require__("./apps/backend/src/app/services/index.ts");
const access_token_extractor_util_1 = __webpack_require__("./apps/backend/src/app/validators/utils/access-token-extractor.util.ts");
let RolesGuard = class RolesGuard {
    constructor(reflector, keycloakService, accountsService) {
        this.reflector = reflector;
        this.keycloakService = keycloakService;
        this.accountsService = accountsService;
    }
    canActivate(context) {
        var _a;
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const requiredRoles = this.reflector.getAllAndOverride(role_decorator_1.ROLES_KEY, [
                context.getHandler(),
                context.getClass(),
            ]);
            if (!requiredRoles) {
                return true;
            }
            const request = context.switchToHttp().getRequest();
            const requestHeaders = request.headers;
            const accessToken = (_a = requestHeaders['authorization']) !== null && _a !== void 0 ? _a : (0, access_token_extractor_util_1.getAccessTokenViaCookie)(request);
            const keycloakUser = yield this.keycloakService.getUserInfo(accessToken);
            const accountRole = yield this.accountsService.getAccountRoleByKeycloakId(keycloakUser.sub);
            return requiredRoles.some((role) => accountRole === role);
        });
    }
};
RolesGuard = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof core_1.Reflector !== "undefined" && core_1.Reflector) === "function" ? _a : Object, typeof (_b = typeof services_1.KeycloakService !== "undefined" && services_1.KeycloakService) === "function" ? _b : Object, typeof (_c = typeof services_1.AccountsService !== "undefined" && services_1.AccountsService) === "function" ? _c : Object])
], RolesGuard);
exports.RolesGuard = RolesGuard;


/***/ }),

/***/ "./apps/backend/src/app/interceptors/fastify-file.interceptor.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.FastifyFileInterceptor = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const fastify_multer_1 = __webpack_require__("fastify-multer");
const multer_1 = __webpack_require__("multer");
function FastifyFileInterceptor(fieldName, localOptions) {
    var _a;
    let MixinInterceptor = class MixinInterceptor {
        constructor(options) {
            this.multer = fastify_multer_1.default(Object.assign(Object.assign({}, options), localOptions));
        }
        intercept(context, next) {
            return tslib_1.__awaiter(this, void 0, void 0, function* () {
                const ctx = context.switchToHttp();
                yield new Promise((resolve, reject) => this.multer.single(fieldName)(ctx.getRequest(), ctx.getResponse(), (error) => {
                    if (error) {
                        // const error = transformException(err);
                        return reject(error);
                    }
                    resolve();
                }));
                return next.handle();
            });
        }
    };
    MixinInterceptor = tslib_1.__decorate([
        tslib_1.__param(0, (0, common_1.Optional)()),
        tslib_1.__param(0, (0, common_1.Inject)("MULTER_MODULE_OPTIONS")),
        tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof multer_1.Multer !== "undefined" && multer_1.Multer) === "function" ? _a : Object])
    ], MixinInterceptor);
    const Interceptor = (0, common_1.mixin)(MixinInterceptor);
    return Interceptor;
}
exports.FastifyFileInterceptor = FastifyFileInterceptor;


/***/ }),

/***/ "./apps/backend/src/app/interceptors/path-logger.interceptor.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PathLoggerInterceptor = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
let PathLoggerInterceptor = class PathLoggerInterceptor {
    constructor(className) {
        this.className = className;
        this.logger = new common_1.Logger(this.className);
    }
    intercept(context, next) {
        const request = context.switchToHttp().getRequest();
        this.logger.debug(`API: [${request.method}] - ${request.url}`);
        return next.handle();
    }
};
PathLoggerInterceptor = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__metadata("design:paramtypes", [String])
], PathLoggerInterceptor);
exports.PathLoggerInterceptor = PathLoggerInterceptor;


/***/ }),

/***/ "./apps/backend/src/app/models/account-hist.entity.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AccountHist = void 0;
const tslib_1 = __webpack_require__("tslib");
const typeorm_1 = __webpack_require__("typeorm");
const base_entity_1 = __webpack_require__("./apps/backend/src/app/models/base/base.entity.ts");
let AccountHist = class AccountHist extends base_entity_1.BaseEntity {
};
tslib_1.__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid', {
        name: 'id',
    }),
    tslib_1.__metadata("design:type", String)
], AccountHist.prototype, "id", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({
        name: 'account_id',
        type: 'uuid',
    }),
    tslib_1.__metadata("design:type", String)
], AccountHist.prototype, "accountId", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({
        name: 'keycloak_id',
        type: 'varchar',
        length: 100,
    }),
    tslib_1.__metadata("design:type", String)
], AccountHist.prototype, "keycloakId", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({
        name: 'google_id',
        type: 'varchar',
        length: 100,
    }),
    tslib_1.__metadata("design:type", String)
], AccountHist.prototype, "googleId", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({
        name: 'username',
        type: 'varchar',
        length: 100,
    }),
    tslib_1.__metadata("design:type", String)
], AccountHist.prototype, "username", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({
        name: 'email',
        type: 'varchar',
        length: 100,
    }),
    tslib_1.__metadata("design:type", String)
], AccountHist.prototype, "email", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({
        name: 'phone',
        type: 'varchar',
        length: 100,
    }),
    tslib_1.__metadata("design:type", String)
], AccountHist.prototype, "phone", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({
        name: 'fullname',
        type: 'varchar',
        length: 100,
    }),
    tslib_1.__metadata("design:type", String)
], AccountHist.prototype, "fullname", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({
        name: 'avatar',
        type: 'varchar',
        length: 250,
    }),
    tslib_1.__metadata("design:type", String)
], AccountHist.prototype, "avatar", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({
        name: 'role_id',
        type: 'varchar',
        length: 100,
    }),
    tslib_1.__metadata("design:type", String)
], AccountHist.prototype, "roleId", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({
        name: 'description',
        type: 'varchar',
        length: 500,
    }),
    tslib_1.__metadata("design:type", String)
], AccountHist.prototype, "description", void 0);
AccountHist = tslib_1.__decorate([
    (0, typeorm_1.Entity)('account_hist')
], AccountHist);
exports.AccountHist = AccountHist;


/***/ }),

/***/ "./apps/backend/src/app/models/account.entity.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var Accounts_1;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Accounts = void 0;
const tslib_1 = __webpack_require__("tslib");
const typeorm_1 = __webpack_require__("typeorm");
const base_entity_1 = __webpack_require__("./apps/backend/src/app/models/base/base.entity.ts");
let Accounts = Accounts_1 = class Accounts extends base_entity_1.BaseEntityWithDisabled {
};
tslib_1.__decorate([
    (0, typeorm_1.PrimaryColumn)('uuid', {
        name: 'id',
        comment: 'ID for Room',
    }),
    (0, typeorm_1.Generated)('uuid'),
    tslib_1.__metadata("design:type", String)
], Accounts.prototype, "id", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({
        name: 'keycloak_id',
        nullable: false,
        unique: true,
        length: 36,
        type: 'varchar',
        comment: 'The keycloak account id that associated with this user.',
    }),
    tslib_1.__metadata("design:type", String)
], Accounts.prototype, "keycloakId", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({
        type: 'varchar',
        name: 'google_id',
    }),
    tslib_1.__metadata("design:type", String)
], Accounts.prototype, "googleId", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({
        name: 'username',
        nullable: false,
        unique: true,
        length: 100,
        type: 'varchar',
    }),
    tslib_1.__metadata("design:type", String)
], Accounts.prototype, "username", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({
        name: 'fullname',
        nullable: false,
        unique: true,
        length: 200,
        type: 'varchar',
    }),
    tslib_1.__metadata("design:type", String)
], Accounts.prototype, "fullname", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({
        name: 'email',
        nullable: false,
        unique: true,
        length: 100,
        type: 'varchar',
        comment: 'The email of the user',
    }),
    tslib_1.__metadata("design:type", String)
], Accounts.prototype, "email", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({
        name: 'phone',
        nullable: false,
        unique: true,
        length: 10,
        type: 'varchar',
        comment: 'The phone number of the user',
    }),
    tslib_1.__metadata("design:type", String)
], Accounts.prototype, "phone", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({
        name: 'description',
        nullable: false,
        unique: false,
        length: 500,
        type: 'varchar',
        comment: 'Describe the user.',
    }),
    tslib_1.__metadata("design:type", String)
], Accounts.prototype, "description", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({
        name: 'role_id',
        type: 'varchar',
        length: '36',
        nullable: false,
        comment: 'Role of the associated user.',
    }),
    tslib_1.__metadata("design:type", String)
], Accounts.prototype, "roleId", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({
        name: 'avatar',
        nullable: false,
        unique: true,
        length: 256,
        type: 'varchar',
    }),
    tslib_1.__metadata("design:type", String)
], Accounts.prototype, "avatar", void 0);
Accounts = Accounts_1 = tslib_1.__decorate([
    (0, typeorm_1.Entity)(Accounts_1.name.toLocaleLowerCase())
], Accounts);
exports.Accounts = Accounts;


/***/ }),

/***/ "./apps/backend/src/app/models/base/base.entity.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b, _c, _d;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.BaseEntityWithDisabled = exports.BaseEntity = void 0;
const tslib_1 = __webpack_require__("tslib");
const typeorm_1 = __webpack_require__("typeorm");
let BaseEntity = class BaseEntity {
};
tslib_1.__decorate([
    (0, typeorm_1.Column)({
        name: 'created_by',
        nullable: false,
        default: false,
        type: 'uuid',
    }),
    tslib_1.__metadata("design:type", String)
], BaseEntity.prototype, "createdBy", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({
        name: 'updated_by',
        nullable: false,
        default: false,
        type: 'uuid',
    }),
    tslib_1.__metadata("design:type", String)
], BaseEntity.prototype, "updatedBy", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({
        name: 'deleted_by',
        nullable: false,
        default: false,
        type: 'uuid',
    }),
    tslib_1.__metadata("design:type", String)
], BaseEntity.prototype, "deletedBy", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({
        type: 'timestamptz',
        name: 'deleted_at',
    }),
    tslib_1.__metadata("design:type", typeof (_a = typeof Date !== "undefined" && Date) === "function" ? _a : Object)
], BaseEntity.prototype, "deletedAt", void 0);
tslib_1.__decorate([
    (0, typeorm_1.CreateDateColumn)({
        name: 'created_at',
    }),
    tslib_1.__metadata("design:type", typeof (_b = typeof Date !== "undefined" && Date) === "function" ? _b : Object)
], BaseEntity.prototype, "createdAt", void 0);
tslib_1.__decorate([
    (0, typeorm_1.UpdateDateColumn)({
        name: 'updated_at',
    }),
    tslib_1.__metadata("design:type", typeof (_c = typeof Date !== "undefined" && Date) === "function" ? _c : Object)
], BaseEntity.prototype, "updatedAt", void 0);
BaseEntity = tslib_1.__decorate([
    (0, typeorm_1.Entity)()
], BaseEntity);
exports.BaseEntity = BaseEntity;
class BaseEntityWithDisabled extends BaseEntity {
}
tslib_1.__decorate([
    (0, typeorm_1.Column)({
        type: 'timestamptz',
        name: 'disabled_at',
    }),
    tslib_1.__metadata("design:type", typeof (_d = typeof Date !== "undefined" && Date) === "function" ? _d : Object)
], BaseEntityWithDisabled.prototype, "disabledAt", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({
        name: 'disabled_by',
        nullable: false,
        default: false,
        type: 'uuid',
    }),
    tslib_1.__metadata("design:type", String)
], BaseEntityWithDisabled.prototype, "disabledBy", void 0);
exports.BaseEntityWithDisabled = BaseEntityWithDisabled;


/***/ }),

/***/ "./apps/backend/src/app/models/booking-reason-hist.entity.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.BookingReasonHist = void 0;
const tslib_1 = __webpack_require__("tslib");
const typeorm_1 = __webpack_require__("typeorm");
const base_entity_1 = __webpack_require__("./apps/backend/src/app/models/base/base.entity.ts");
let BookingReasonHist = class BookingReasonHist extends base_entity_1.BaseEntity {
};
tslib_1.__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid', {
        name: 'id',
    }),
    tslib_1.__metadata("design:type", String)
], BookingReasonHist.prototype, "id", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({
        name: 'booking_reason_id',
        type: 'uuid',
    }),
    tslib_1.__metadata("design:type", String)
], BookingReasonHist.prototype, "bookingReasonId", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({
        name: 'name',
        type: 'varchar',
        length: 100,
    }),
    tslib_1.__metadata("design:type", String)
], BookingReasonHist.prototype, "name", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({
        name: 'description',
        type: 'varchar',
        length: 500,
    }),
    tslib_1.__metadata("design:type", String)
], BookingReasonHist.prototype, "description", void 0);
BookingReasonHist = tslib_1.__decorate([
    (0, typeorm_1.Entity)('booking_reason_hist')
], BookingReasonHist);
exports.BookingReasonHist = BookingReasonHist;


/***/ }),

/***/ "./apps/backend/src/app/models/booking-reason.entity.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.BookingReason = void 0;
const tslib_1 = __webpack_require__("tslib");
const typeorm_1 = __webpack_require__("typeorm");
const base_entity_1 = __webpack_require__("./apps/backend/src/app/models/base/base.entity.ts");
let BookingReason = class BookingReason extends base_entity_1.BaseEntity {
};
tslib_1.__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid', {
        name: 'id',
    }),
    tslib_1.__metadata("design:type", String)
], BookingReason.prototype, "id", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({
        name: 'name',
        type: 'varchar',
        length: 100,
    }),
    tslib_1.__metadata("design:type", String)
], BookingReason.prototype, "name", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({
        name: 'description',
        type: 'varchar',
        length: 500,
    }),
    tslib_1.__metadata("design:type", String)
], BookingReason.prototype, "description", void 0);
BookingReason = tslib_1.__decorate([
    (0, typeorm_1.Entity)('booking_reason')
], BookingReason);
exports.BookingReason = BookingReason;


/***/ }),

/***/ "./apps/backend/src/app/models/booking-request-hist.entity.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b, _c, _d, _e, _f;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.BookingRequestHist = void 0;
const tslib_1 = __webpack_require__("tslib");
const typeorm_1 = __webpack_require__("typeorm");
let BookingRequestHist = class BookingRequestHist {
};
tslib_1.__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid', {
        name: 'id',
        comment: 'ID of the Booking Request Hist',
    }),
    tslib_1.__metadata("design:type", String)
], BookingRequestHist.prototype, "id", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({
        name: 'booking_request_id',
        type: 'uuid',
    }),
    tslib_1.__metadata("design:type", String)
], BookingRequestHist.prototype, "bookingRequestId", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({
        name: 'room_id',
        nullable: false,
    }),
    tslib_1.__metadata("design:type", String)
], BookingRequestHist.prototype, "roomId", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({
        name: 'requested_by',
        type: 'uuid',
    }),
    tslib_1.__metadata("design:type", String)
], BookingRequestHist.prototype, "requestedBy", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({
        name: 'requested_at',
        nullable: false,
        type: 'timestamptz',
        default: () => 'CURRENT_TIMESTAMP',
    }),
    tslib_1.__metadata("design:type", typeof (_a = typeof Date !== "undefined" && Date) === "function" ? _a : Object)
], BookingRequestHist.prototype, "requestedAt", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({
        name: 'status',
        nullable: false,
    }),
    tslib_1.__metadata("design:type", String)
], BookingRequestHist.prototype, "status", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({
        name: 'checkin_at',
        nullable: false,
        type: 'timestamptz',
    }),
    tslib_1.__metadata("design:type", typeof (_b = typeof Date !== "undefined" && Date) === "function" ? _b : Object)
], BookingRequestHist.prototype, "checkedInAt", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({
        name: 'checkout_at',
        nullable: false,
        type: 'timestamptz',
    }),
    tslib_1.__metadata("design:type", typeof (_c = typeof Date !== "undefined" && Date) === "function" ? _c : Object)
], BookingRequestHist.prototype, "checkedOutAt", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({
        name: 'updated_at',
        nullable: false,
        type: 'timestamptz',
    }),
    tslib_1.__metadata("design:type", typeof (_d = typeof Date !== "undefined" && Date) === "function" ? _d : Object)
], BookingRequestHist.prototype, "updatedAt", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({
        name: 'updated_by',
        type: 'uuid',
    }),
    tslib_1.__metadata("design:type", String)
], BookingRequestHist.prototype, "updatedBy", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({
        name: 'booking_reason_id',
        type: 'uuid',
    }),
    tslib_1.__metadata("design:type", String)
], BookingRequestHist.prototype, "bookingReasonId", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({
        name: 'description',
        type: 'varchar',
        length: 500,
    }),
    tslib_1.__metadata("design:type", String)
], BookingRequestHist.prototype, "description", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({
        name: 'cancelled_at',
        nullable: false,
        type: 'timestamptz',
    }),
    tslib_1.__metadata("design:type", typeof (_e = typeof Date !== "undefined" && Date) === "function" ? _e : Object)
], BookingRequestHist.prototype, "cancelledAt", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({
        name: 'cancelled_by',
        type: 'uuid',
    }),
    tslib_1.__metadata("design:type", String)
], BookingRequestHist.prototype, "cancelledBy", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({
        name: 'checkin_slot',
        type: 'uuid',
    }),
    tslib_1.__metadata("design:type", String)
], BookingRequestHist.prototype, "checkinSlot", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({
        name: 'checkout_slot',
        type: 'uuid',
    }),
    tslib_1.__metadata("design:type", String)
], BookingRequestHist.prototype, "checkoutSlot", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({
        name: "checkin_date",
        nullable: false,
    }),
    tslib_1.__metadata("design:type", String)
], BookingRequestHist.prototype, "checkinDate", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({
        name: 'accepted_at',
        nullable: false,
        type: 'timestamptz',
    }),
    tslib_1.__metadata("design:type", typeof (_f = typeof Date !== "undefined" && Date) === "function" ? _f : Object)
], BookingRequestHist.prototype, "acceptedAt", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({
        name: 'accepted_by',
        type: 'uuid',
    }),
    tslib_1.__metadata("design:type", String)
], BookingRequestHist.prototype, "acceptedBy", void 0);
BookingRequestHist = tslib_1.__decorate([
    (0, typeorm_1.Entity)('booking_request_hist')
], BookingRequestHist);
exports.BookingRequestHist = BookingRequestHist;


/***/ }),

/***/ "./apps/backend/src/app/models/booking-request.entity.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b, _c, _d, _e, _f;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.BookingRequest = void 0;
const tslib_1 = __webpack_require__("tslib");
const typeorm_1 = __webpack_require__("typeorm");
let BookingRequest = class BookingRequest {
};
tslib_1.__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)("uuid", {
        name: "id",
        comment: "ID of the Booking Request"
    }),
    tslib_1.__metadata("design:type", String)
], BookingRequest.prototype, "id", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({
        name: "room_id",
        nullable: false,
    }),
    tslib_1.__metadata("design:type", String)
], BookingRequest.prototype, "roomId", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({
        name: "requested_by",
        type: "uuid",
    }),
    tslib_1.__metadata("design:type", String)
], BookingRequest.prototype, "requestedBy", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({
        name: "requested_at",
        nullable: false,
        type: "timestamptz",
        default: () => "CURRENT_TIMESTAMP"
    }),
    tslib_1.__metadata("design:type", typeof (_a = typeof Date !== "undefined" && Date) === "function" ? _a : Object)
], BookingRequest.prototype, "requestedAt", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({
        name: "status",
        nullable: false
    }),
    tslib_1.__metadata("design:type", String)
], BookingRequest.prototype, "status", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({
        name: "booking_reason_id",
        nullable: false
    }),
    tslib_1.__metadata("design:type", String)
], BookingRequest.prototype, "bookingReasonId", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({
        name: "cancelled_by",
        type: "uuid",
    }),
    tslib_1.__metadata("design:type", String)
], BookingRequest.prototype, "cancelledBy", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({
        name: "cancelled_at",
        nullable: false,
        type: "timestamptz",
        default: () => "CURRENT_TIMESTAMP"
    }),
    tslib_1.__metadata("design:type", typeof (_b = typeof Date !== "undefined" && Date) === "function" ? _b : Object)
], BookingRequest.prototype, "cancelledAt", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({
        name: "updated_by",
        type: "uuid",
    }),
    tslib_1.__metadata("design:type", String)
], BookingRequest.prototype, "updatedBy", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({
        name: "updated_at",
        nullable: false,
        type: "timestamptz",
        default: () => "CURRENT_TIMESTAMP"
    }),
    tslib_1.__metadata("design:type", typeof (_c = typeof Date !== "undefined" && Date) === "function" ? _c : Object)
], BookingRequest.prototype, "updatedAt", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({
        name: "accepted_by",
        type: "uuid",
    }),
    tslib_1.__metadata("design:type", String)
], BookingRequest.prototype, "acceptedBy", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({
        name: "accepted_at",
        nullable: false,
        type: "timestamptz",
        default: () => "CURRENT_TIMESTAMP"
    }),
    tslib_1.__metadata("design:type", typeof (_d = typeof Date !== "undefined" && Date) === "function" ? _d : Object)
], BookingRequest.prototype, "acceptedAt", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({
        name: "checkin_slot",
        nullable: false,
    }),
    tslib_1.__metadata("design:type", String)
], BookingRequest.prototype, "checkinSlot", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({
        name: "checkout_slot",
        nullable: false,
    }),
    tslib_1.__metadata("design:type", String)
], BookingRequest.prototype, "checkoutSlot", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({
        name: "checkin_date",
        nullable: false,
    }),
    tslib_1.__metadata("design:type", String)
], BookingRequest.prototype, "checkinDate", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({
        name: "checkedin_at",
        nullable: false,
        type: "timestamptz"
    }),
    tslib_1.__metadata("design:type", typeof (_e = typeof Date !== "undefined" && Date) === "function" ? _e : Object)
], BookingRequest.prototype, "checkedinAt", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({
        name: "checkedout_at",
        nullable: false,
        type: "timestamptz"
    }),
    tslib_1.__metadata("design:type", typeof (_f = typeof Date !== "undefined" && Date) === "function" ? _f : Object)
], BookingRequest.prototype, "checkedoutAt", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({
        name: 'description',
        type: 'varchar',
        length: 500,
    }),
    tslib_1.__metadata("design:type", String)
], BookingRequest.prototype, "description", void 0);
BookingRequest = tslib_1.__decorate([
    (0, typeorm_1.Entity)("booking_request")
], BookingRequest);
exports.BookingRequest = BookingRequest;


/***/ }),

/***/ "./apps/backend/src/app/models/device-type-hist.entity.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.DeviceTypeHist = void 0;
const tslib_1 = __webpack_require__("tslib");
const typeorm_1 = __webpack_require__("typeorm");
const base_entity_1 = __webpack_require__("./apps/backend/src/app/models/base/base.entity.ts");
let DeviceTypeHist = class DeviceTypeHist extends base_entity_1.BaseEntity {
};
tslib_1.__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid', {
        name: 'id',
    }),
    tslib_1.__metadata("design:type", String)
], DeviceTypeHist.prototype, "id", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({
        name: 'device_type_id',
        type: 'uuid',
    }),
    tslib_1.__metadata("design:type", String)
], DeviceTypeHist.prototype, "deviceTypeId", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({
        name: 'name',
        type: 'varchar',
        length: 100,
    }),
    tslib_1.__metadata("design:type", String)
], DeviceTypeHist.prototype, "name", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({
        name: 'description',
        type: 'varchar',
        length: 500,
    }),
    tslib_1.__metadata("design:type", String)
], DeviceTypeHist.prototype, "description", void 0);
DeviceTypeHist = tslib_1.__decorate([
    (0, typeorm_1.Entity)('device_type_hist')
], DeviceTypeHist);
exports.DeviceTypeHist = DeviceTypeHist;


/***/ }),

/***/ "./apps/backend/src/app/models/device-type.entity.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.DeviceType = void 0;
const tslib_1 = __webpack_require__("tslib");
const typeorm_1 = __webpack_require__("typeorm");
const base_entity_1 = __webpack_require__("./apps/backend/src/app/models/base/base.entity.ts");
let DeviceType = class DeviceType extends base_entity_1.BaseEntity {
};
tslib_1.__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid', {
        name: 'id',
    }),
    tslib_1.__metadata("design:type", String)
], DeviceType.prototype, "id", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({
        name: 'name',
        type: 'varchar',
        length: 100,
    }),
    tslib_1.__metadata("design:type", String)
], DeviceType.prototype, "name", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({
        name: 'description',
        type: 'varchar',
        length: 500,
    }),
    tslib_1.__metadata("design:type", String)
], DeviceType.prototype, "description", void 0);
DeviceType = tslib_1.__decorate([
    (0, typeorm_1.Entity)('device_type')
], DeviceType);
exports.DeviceType = DeviceType;


/***/ }),

/***/ "./apps/backend/src/app/models/devices-hist.entity.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.DeviceHist = void 0;
const tslib_1 = __webpack_require__("tslib");
const typeorm_1 = __webpack_require__("typeorm");
const base_entity_1 = __webpack_require__("./apps/backend/src/app/models/base/base.entity.ts");
let DeviceHist = class DeviceHist extends base_entity_1.BaseEntityWithDisabled {
};
tslib_1.__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid', {
        name: 'id',
    }),
    tslib_1.__metadata("design:type", String)
], DeviceHist.prototype, "id", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({
        name: 'device_id',
        type: 'uuid',
    }),
    tslib_1.__metadata("design:type", String)
], DeviceHist.prototype, "deviceId", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({
        name: 'name',
        type: 'varchar',
        length: 100,
    }),
    tslib_1.__metadata("design:type", String)
], DeviceHist.prototype, "name", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({
        name: 'type',
        type: 'uuid',
    }),
    tslib_1.__metadata("design:type", String)
], DeviceHist.prototype, "type", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({
        name: 'description',
        type: 'varchar',
        length: 500,
    }),
    tslib_1.__metadata("design:type", String)
], DeviceHist.prototype, "description", void 0);
DeviceHist = tslib_1.__decorate([
    (0, typeorm_1.Entity)('device_hist')
], DeviceHist);
exports.DeviceHist = DeviceHist;


/***/ }),

/***/ "./apps/backend/src/app/models/devices.entity.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var Devices_1;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Devices = void 0;
const tslib_1 = __webpack_require__("tslib");
const typeorm_1 = __webpack_require__("typeorm");
const base_entity_1 = __webpack_require__("./apps/backend/src/app/models/base/base.entity.ts");
let Devices = Devices_1 = class Devices extends base_entity_1.BaseEntityWithDisabled {
};
tslib_1.__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid', {
        name: 'id',
        comment: 'ID for Equipments',
    }),
    tslib_1.__metadata("design:type", String)
], Devices.prototype, "id", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({
        name: 'name',
        nullable: false,
        unique: true,
        length: 250,
        type: 'varchar',
        comment: `Equipment's name`,
    }),
    tslib_1.__metadata("design:type", String)
], Devices.prototype, "name", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({
        name: 'description',
        nullable: false,
        unique: false,
        length: 500,
        type: 'varchar',
        comment: 'Equipments description',
    }),
    tslib_1.__metadata("design:type", String)
], Devices.prototype, "description", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({
        name: 'type',
        nullable: false,
        unique: false,
        length: 250,
        type: 'varchar',
        comment: 'Equipments description',
    }),
    tslib_1.__metadata("design:type", String)
], Devices.prototype, "type", void 0);
Devices = Devices_1 = tslib_1.__decorate([
    (0, typeorm_1.Entity)(Devices_1.name.toLowerCase())
], Devices);
exports.Devices = Devices;


/***/ }),

/***/ "./apps/backend/src/app/models/index.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__("tslib");
tslib_1.__exportStar(__webpack_require__("./apps/backend/src/app/models/account.entity.ts"), exports);
tslib_1.__exportStar(__webpack_require__("./apps/backend/src/app/models/booking-request.entity.ts"), exports);
tslib_1.__exportStar(__webpack_require__("./apps/backend/src/app/models/room-wishlist.entity.ts"), exports);
tslib_1.__exportStar(__webpack_require__("./apps/backend/src/app/models/users-otp.entity.ts"), exports);
tslib_1.__exportStar(__webpack_require__("./apps/backend/src/app/models/users-warning-flag.entity.ts"), exports);
tslib_1.__exportStar(__webpack_require__("./apps/backend/src/app/models/users-warning-flag.hist.entity.ts"), exports);
tslib_1.__exportStar(__webpack_require__("./apps/backend/src/app/models/booking-reason-hist.entity.ts"), exports);
tslib_1.__exportStar(__webpack_require__("./apps/backend/src/app/models/rooms.entity.ts"), exports);
tslib_1.__exportStar(__webpack_require__("./apps/backend/src/app/models/room-type.entity.ts"), exports);
tslib_1.__exportStar(__webpack_require__("./apps/backend/src/app/models/room-hist.entity.ts"), exports);
tslib_1.__exportStar(__webpack_require__("./apps/backend/src/app/models/room-type-hist.entity.ts"), exports);
tslib_1.__exportStar(__webpack_require__("./apps/backend/src/app/models/devices.entity.ts"), exports);
tslib_1.__exportStar(__webpack_require__("./apps/backend/src/app/models/device-type.entity.ts"), exports);
tslib_1.__exportStar(__webpack_require__("./apps/backend/src/app/models/devices-hist.entity.ts"), exports);
tslib_1.__exportStar(__webpack_require__("./apps/backend/src/app/models/device-type-hist.entity.ts"), exports);
tslib_1.__exportStar(__webpack_require__("./apps/backend/src/app/models/account-hist.entity.ts"), exports);
tslib_1.__exportStar(__webpack_require__("./apps/backend/src/app/models/booking-request-hist.entity.ts"), exports);


/***/ }),

/***/ "./apps/backend/src/app/models/role-hist.entity.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.RoleHist = void 0;
const tslib_1 = __webpack_require__("tslib");
const typeorm_1 = __webpack_require__("typeorm");
const base_entity_1 = __webpack_require__("./apps/backend/src/app/models/base/base.entity.ts");
let RoleHist = class RoleHist extends base_entity_1.BaseEntity {
};
tslib_1.__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid', {
        name: 'id',
    }),
    tslib_1.__metadata("design:type", String)
], RoleHist.prototype, "id", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({
        name: 'role_id',
        type: 'uuid',
    }),
    tslib_1.__metadata("design:type", String)
], RoleHist.prototype, "roleId", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({
        name: 'name',
        type: 'varchar',
        length: 100,
    }),
    tslib_1.__metadata("design:type", String)
], RoleHist.prototype, "name", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({
        name: 'description',
        type: 'varchar',
        length: 500,
    }),
    tslib_1.__metadata("design:type", String)
], RoleHist.prototype, "description", void 0);
RoleHist = tslib_1.__decorate([
    (0, typeorm_1.Entity)('role_hist')
], RoleHist);
exports.RoleHist = RoleHist;


/***/ }),

/***/ "./apps/backend/src/app/models/role.entity.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Roles = void 0;
const tslib_1 = __webpack_require__("tslib");
const typeorm_1 = __webpack_require__("typeorm");
const base_entity_1 = __webpack_require__("./apps/backend/src/app/models/base/base.entity.ts");
let Roles = class Roles extends base_entity_1.BaseEntity {
};
tslib_1.__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid', {
        name: 'id',
    }),
    tslib_1.__metadata("design:type", String)
], Roles.prototype, "id", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({
        name: 'name',
        type: 'varchar',
    }),
    tslib_1.__metadata("design:type", String)
], Roles.prototype, "name", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({
        name: 'description',
        type: 'varchar',
    }),
    tslib_1.__metadata("design:type", String)
], Roles.prototype, "description", void 0);
Roles = tslib_1.__decorate([
    (0, typeorm_1.Entity)('role')
], Roles);
exports.Roles = Roles;


/***/ }),

/***/ "./apps/backend/src/app/models/room-hist.entity.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.RoomHist = void 0;
const tslib_1 = __webpack_require__("tslib");
const typeorm_1 = __webpack_require__("typeorm");
const base_entity_1 = __webpack_require__("./apps/backend/src/app/models/base/base.entity.ts");
let RoomHist = class RoomHist extends base_entity_1.BaseEntity {
};
tslib_1.__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid', {
        name: 'id',
    }),
    tslib_1.__metadata("design:type", String)
], RoomHist.prototype, "id", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({
        name: 'room_id',
        type: 'uuid',
    }),
    tslib_1.__metadata("design:type", String)
], RoomHist.prototype, "roomId", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({
        name: 'name',
        type: 'varchar',
        length: 100,
    }),
    tslib_1.__metadata("design:type", String)
], RoomHist.prototype, "name", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({
        name: 'description',
        type: 'varchar',
        length: 500,
    }),
    tslib_1.__metadata("design:type", String)
], RoomHist.prototype, "description", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({
        name: 'type',
        type: 'varchar',
        length: 500,
    }),
    tslib_1.__metadata("design:type", String)
], RoomHist.prototype, "type", void 0);
RoomHist = tslib_1.__decorate([
    (0, typeorm_1.Entity)('room_hist')
], RoomHist);
exports.RoomHist = RoomHist;


/***/ }),

/***/ "./apps/backend/src/app/models/room-type-hist.entity.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.RoomTypeHist = void 0;
const tslib_1 = __webpack_require__("tslib");
const typeorm_1 = __webpack_require__("typeorm");
const base_entity_1 = __webpack_require__("./apps/backend/src/app/models/base/base.entity.ts");
let RoomTypeHist = class RoomTypeHist extends base_entity_1.BaseEntity {
};
tslib_1.__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid', {
        name: 'id',
    }),
    tslib_1.__metadata("design:type", String)
], RoomTypeHist.prototype, "id", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({
        name: 'room_type_id',
        type: 'uuid',
    }),
    tslib_1.__metadata("design:type", String)
], RoomTypeHist.prototype, "roomTypeId", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({
        name: 'name',
        type: 'varchar',
        length: 100,
    }),
    tslib_1.__metadata("design:type", String)
], RoomTypeHist.prototype, "name", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({
        name: 'description',
        type: 'varchar',
        length: 500,
    }),
    tslib_1.__metadata("design:type", String)
], RoomTypeHist.prototype, "description", void 0);
RoomTypeHist = tslib_1.__decorate([
    (0, typeorm_1.Entity)('room_type_hist')
], RoomTypeHist);
exports.RoomTypeHist = RoomTypeHist;


/***/ }),

/***/ "./apps/backend/src/app/models/room-type.entity.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.RoomType = void 0;
const tslib_1 = __webpack_require__("tslib");
const typeorm_1 = __webpack_require__("typeorm");
const base_entity_1 = __webpack_require__("./apps/backend/src/app/models/base/base.entity.ts");
let RoomType = class RoomType extends base_entity_1.BaseEntity {
};
tslib_1.__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid', {
        name: 'id',
    }),
    tslib_1.__metadata("design:type", String)
], RoomType.prototype, "id", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({
        name: 'name',
        type: 'varchar',
        length: 100,
    }),
    tslib_1.__metadata("design:type", String)
], RoomType.prototype, "name", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({
        name: 'description',
        type: 'varchar',
        length: 500,
    }),
    tslib_1.__metadata("design:type", String)
], RoomType.prototype, "description", void 0);
RoomType = tslib_1.__decorate([
    (0, typeorm_1.Entity)('room_type')
], RoomType);
exports.RoomType = RoomType;


/***/ }),

/***/ "./apps/backend/src/app/models/room-wishlist.entity.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.RoomWishlist = void 0;
const tslib_1 = __webpack_require__("tslib");
const typeorm_1 = __webpack_require__("typeorm");
let RoomWishlist = class RoomWishlist {
};
tslib_1.__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)("uuid", {
        comment: "Id for room wishlist",
        name: "id"
    }),
    tslib_1.__metadata("design:type", String)
], RoomWishlist.prototype, "id", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({
        type: "uuid",
        name: "room_id",
    }),
    tslib_1.__metadata("design:type", String)
], RoomWishlist.prototype, "roomId", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({
        type: "uuid",
        name: "created_by"
    }),
    tslib_1.__metadata("design:type", String)
], RoomWishlist.prototype, "createdBy", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({
        name: "created_at",
        nullable: false,
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP',
    }),
    tslib_1.__metadata("design:type", typeof (_a = typeof Date !== "undefined" && Date) === "function" ? _a : Object)
], RoomWishlist.prototype, "createdAt", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({
        name: "slot_num",
        nullable: false,
        type: "smallint"
    }),
    tslib_1.__metadata("design:type", Number)
], RoomWishlist.prototype, "slotNum", void 0);
RoomWishlist = tslib_1.__decorate([
    (0, typeorm_1.Entity)("room_wishlist")
], RoomWishlist);
exports.RoomWishlist = RoomWishlist;


/***/ }),

/***/ "./apps/backend/src/app/models/rooms.entity.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var Rooms_1;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Rooms = void 0;
const tslib_1 = __webpack_require__("tslib");
const typeorm_1 = __webpack_require__("typeorm");
const room_type_enum_1 = __webpack_require__("./apps/backend/src/app/enum/room-type.enum.ts");
const base_entity_1 = __webpack_require__("./apps/backend/src/app/models/base/base.entity.ts");
let Rooms = Rooms_1 = class Rooms extends base_entity_1.BaseEntityWithDisabled {
};
tslib_1.__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid', {
        name: 'id',
    }),
    tslib_1.__metadata("design:type", String)
], Rooms.prototype, "id", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({
        name: 'name',
        nullable: false,
        unique: true,
        length: 100,
    }),
    tslib_1.__metadata("design:type", String)
], Rooms.prototype, "name", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({
        name: 'description',
        nullable: true,
        length: 500,
        type: 'varchar',
    }),
    tslib_1.__metadata("design:type", String)
], Rooms.prototype, "description", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({
        name: 'type',
        nullable: false,
        length: 100,
        default: room_type_enum_1.RoomType.LIBRARY_ROOM,
    }),
    tslib_1.__metadata("design:type", String)
], Rooms.prototype, "type", void 0);
Rooms = Rooms_1 = tslib_1.__decorate([
    (0, typeorm_1.Entity)(Rooms_1.name.toLowerCase())
], Rooms);
exports.Rooms = Rooms;


/***/ }),

/***/ "./apps/backend/src/app/models/slot.entity.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Slot = void 0;
const tslib_1 = __webpack_require__("tslib");
const typeorm_1 = __webpack_require__("typeorm");
const base_entity_1 = __webpack_require__("./apps/backend/src/app/models/base/base.entity.ts");
let Slot = class Slot extends base_entity_1.BaseEntity {
};
tslib_1.__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid', {
        name: 'id',
    }),
    tslib_1.__metadata("design:type", String)
], Slot.prototype, "id", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({
        name: 'time_start',
        type: 'time',
    }),
    tslib_1.__metadata("design:type", String)
], Slot.prototype, "timeStart", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({
        name: 'time_end',
        type: 'time',
    }),
    tslib_1.__metadata("design:type", String)
], Slot.prototype, "timeEnd", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({
        name: 'name',
        type: 'varchar',
    }),
    tslib_1.__metadata("design:type", String)
], Slot.prototype, "name", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({
        name: 'description',
        type: 'varchar',
    }),
    tslib_1.__metadata("design:type", String)
], Slot.prototype, "description", void 0);
Slot = tslib_1.__decorate([
    (0, typeorm_1.Entity)('slot')
], Slot);
exports.Slot = Slot;


/***/ }),

/***/ "./apps/backend/src/app/models/users-otp.entity.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var UsersOTP_1, _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UsersOTP = void 0;
const tslib_1 = __webpack_require__("tslib");
const typeorm_1 = __webpack_require__("typeorm");
let UsersOTP = UsersOTP_1 = class UsersOTP {
};
tslib_1.__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)("increment", {
        name: "id",
        comment: "ID for Users OTP",
        type: 'int',
    }),
    tslib_1.__metadata("design:type", Number)
], UsersOTP.prototype, "id", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({
        name: 'user_id',
        type: 'varchar',
        length: 36,
        comment: 'The user id that references to Users table',
        nullable: false,
        unique: false
    }),
    tslib_1.__metadata("design:type", String)
], UsersOTP.prototype, "userId", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({
        name: 'otp',
        type: 'varchar',
        length: 6,
        comment: 'The OTP that is to authenticating user',
        nullable: false,
        unique: false
    }),
    tslib_1.__metadata("design:type", String)
], UsersOTP.prototype, "otp", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({
        name: "created_at",
        nullable: false,
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP',
        comment: 'The date that the OTP is generated'
    }),
    tslib_1.__metadata("design:type", typeof (_a = typeof Date !== "undefined" && Date) === "function" ? _a : Object)
], UsersOTP.prototype, "createdAt", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({
        name: "used_date",
        nullable: true,
        type: 'timestamp',
        comment: 'The date that the OTP is consumed'
    }),
    tslib_1.__metadata("design:type", typeof (_b = typeof Date !== "undefined" && Date) === "function" ? _b : Object)
], UsersOTP.prototype, "usedDate", void 0);
UsersOTP = UsersOTP_1 = tslib_1.__decorate([
    (0, typeorm_1.Entity)(UsersOTP_1.name.toLowerCase())
], UsersOTP);
exports.UsersOTP = UsersOTP;


/***/ }),

/***/ "./apps/backend/src/app/models/users-warning-flag.entity.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var UsersWarningFlag_1, _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UsersWarningFlag = void 0;
const tslib_1 = __webpack_require__("tslib");
const typeorm_1 = __webpack_require__("typeorm");
let UsersWarningFlag = UsersWarningFlag_1 = class UsersWarningFlag {
};
tslib_1.__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)("uuid", {
        name: "id",
        comment: "ID for Users Warning Flag",
    }),
    tslib_1.__metadata("design:type", String)
], UsersWarningFlag.prototype, "id", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({
        name: "user_id",
        nullable: false,
        unique: true,
        length: 36,
        type: 'varchar',
        comment: 'The used id that references to User table'
    }),
    tslib_1.__metadata("design:type", String)
], UsersWarningFlag.prototype, "userId", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({
        name: "warn_num",
        nullable: false,
        unique: false,
        type: 'int',
        comment: 'The number of warnings that user is received.'
    }),
    tslib_1.__metadata("design:type", Number)
], UsersWarningFlag.prototype, "warnNum", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({
        name: "description",
        nullable: true,
        unique: false,
        length: 500,
        type: 'varchar',
    }),
    tslib_1.__metadata("design:type", String)
], UsersWarningFlag.prototype, "description", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({
        name: "created_at",
        nullable: false,
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP',
        comment: 'The date that this warning flag is created.'
    }),
    tslib_1.__metadata("design:type", typeof (_a = typeof Date !== "undefined" && Date) === "function" ? _a : Object)
], UsersWarningFlag.prototype, "createdAt", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({
        name: "updated_at",
        nullable: true,
        type: 'timestamp',
        comment: 'The date that this warning flag is updated.'
    }),
    tslib_1.__metadata("design:type", typeof (_b = typeof Date !== "undefined" && Date) === "function" ? _b : Object)
], UsersWarningFlag.prototype, "updatedAt", void 0);
UsersWarningFlag = UsersWarningFlag_1 = tslib_1.__decorate([
    (0, typeorm_1.Entity)(UsersWarningFlag_1.name.toLowerCase())
], UsersWarningFlag);
exports.UsersWarningFlag = UsersWarningFlag;


/***/ }),

/***/ "./apps/backend/src/app/models/users-warning-flag.hist.entity.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var UsersWarningFlagHistory_1, _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UsersWarningFlagHistory = void 0;
const tslib_1 = __webpack_require__("tslib");
const typeorm_1 = __webpack_require__("typeorm");
let UsersWarningFlagHistory = UsersWarningFlagHistory_1 = class UsersWarningFlagHistory {
};
tslib_1.__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)("uuid", {
        name: "id",
        comment: "ID for Users Warning Flag History",
    }),
    tslib_1.__metadata("design:type", String)
], UsersWarningFlagHistory.prototype, "usersWarningFlagId", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({
        name: "id",
        nullable: true,
        unique: false,
        length: 36,
        type: 'varchar',
        comment: 'The old ID used for Users Warning Flag',
    }),
    tslib_1.__metadata("design:type", String)
], UsersWarningFlagHistory.prototype, "id", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({
        name: "user_id",
        nullable: true,
        unique: false,
        length: 36,
        type: 'varchar',
        comment: 'The used id that references to User table'
    }),
    tslib_1.__metadata("design:type", String)
], UsersWarningFlagHistory.prototype, "userId", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({
        name: "warn_num",
        nullable: true,
        unique: false,
        type: 'int',
        comment: 'The number of warnings that user is received.'
    }),
    tslib_1.__metadata("design:type", Number)
], UsersWarningFlagHistory.prototype, "warnNum", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({
        name: "description",
        nullable: true,
        unique: false,
        length: 500,
        type: 'varchar',
    }),
    tslib_1.__metadata("design:type", String)
], UsersWarningFlagHistory.prototype, "description", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({
        name: "created_at",
        nullable: true,
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP',
        comment: 'The date that this warning flag is created.'
    }),
    tslib_1.__metadata("design:type", typeof (_a = typeof Date !== "undefined" && Date) === "function" ? _a : Object)
], UsersWarningFlagHistory.prototype, "createdAt", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({
        name: "updated_at",
        nullable: true,
        type: 'timestamp',
        comment: 'The date that this warning flag is updated.'
    }),
    tslib_1.__metadata("design:type", typeof (_b = typeof Date !== "undefined" && Date) === "function" ? _b : Object)
], UsersWarningFlagHistory.prototype, "updatedAt", void 0);
UsersWarningFlagHistory = UsersWarningFlagHistory_1 = tslib_1.__decorate([
    (0, typeorm_1.Entity)(UsersWarningFlagHistory_1.name.toLowerCase())
], UsersWarningFlagHistory);
exports.UsersWarningFlagHistory = UsersWarningFlagHistory;


/***/ }),

/***/ "./apps/backend/src/app/modules/accounts.module.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AccountsModule = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const controllers_1 = __webpack_require__("./apps/backend/src/app/controllers/index.ts");
const services_1 = __webpack_require__("./apps/backend/src/app/services/index.ts");
const repositories_1 = __webpack_require__("./apps/backend/src/app/repositories/index.ts");
const services_2 = __webpack_require__("./apps/backend/src/app/services/index.ts");
const config_module_1 = __webpack_require__("./apps/backend/src/app/modules/global/config.module.ts");
const axios_1 = __webpack_require__("@nestjs/axios");
const services_3 = __webpack_require__("./apps/backend/src/app/services/index.ts");
const typeorm_ex_module_1 = __webpack_require__("./apps/backend/src/app/modules/global/typeorm-ex.module.ts");
const account_hist_service_1 = __webpack_require__("./apps/backend/src/app/services/account-hist.service.ts");
const account_hist_repository_1 = __webpack_require__("./apps/backend/src/app/repositories/account-hist.repository.ts");
let AccountsModule = class AccountsModule {
};
AccountsModule = tslib_1.__decorate([
    (0, common_1.Module)({
        imports: [
            config_module_1.default,
            axios_1.HttpModule,
            typeorm_ex_module_1.TypeOrmExModule.forCustomRepository([
                repositories_1.AccountRepository,
                account_hist_repository_1.AccountHistRepository,
            ]),
        ],
        controllers: [controllers_1.AccountsController],
        providers: [
            services_1.AccountsService,
            services_2.KeycloakService,
            services_3.CloudinaryService,
            account_hist_service_1.AccountHistService,
        ],
        exports: [services_1.AccountsService, account_hist_service_1.AccountHistService],
    })
], AccountsModule);
exports.AccountsModule = AccountsModule;


/***/ }),

/***/ "./apps/backend/src/app/modules/app.module.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var AppModule_1;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AppModule = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const keycloak_module_1 = __webpack_require__("./apps/backend/src/app/modules/keycloak.module.ts");
const rooms_module_1 = __webpack_require__("./apps/backend/src/app/modules/rooms.module.ts");
const health_check_module_1 = __webpack_require__("./apps/backend/src/app/modules/health-check.module.ts");
const accounts_module_1 = __webpack_require__("./apps/backend/src/app/modules/accounts.module.ts");
const devices_module_1 = __webpack_require__("./apps/backend/src/app/modules/devices.module.ts");
const users_warning_flag_module_1 = __webpack_require__("./apps/backend/src/app/modules/users-warning-flag.module.ts");
const cache_module_1 = __webpack_require__("./apps/backend/src/app/modules/global/cache.module.ts");
const config_module_1 = __webpack_require__("./apps/backend/src/app/modules/global/config.module.ts");
const typeorm_module_1 = __webpack_require__("./apps/backend/src/app/modules/global/typeorm.module.ts");
const axios_1 = __webpack_require__("@nestjs/axios");
const booking_room_module_1 = __webpack_require__("./apps/backend/src/app/modules/booking-room.module.ts");
const cloudinary_module_1 = __webpack_require__("./apps/backend/src/app/modules/cloudinary.module.ts");
const core_1 = __webpack_require__("@nestjs/core");
const role_guard_1 = __webpack_require__("./apps/backend/src/app/guards/role.guard.ts");
const schedule_1 = __webpack_require__("@nestjs/schedule");
const roles_module_1 = __webpack_require__("./apps/backend/src/app/modules/roles.module.ts");
const room_type_module_1 = __webpack_require__("./apps/backend/src/app/modules/room-type.module.ts");
const device_type_module_1 = __webpack_require__("./apps/backend/src/app/modules/device-type.module.ts");
const booking_reason_module_1 = __webpack_require__("./apps/backend/src/app/modules/booking-reason.module.ts");
const slot_module_1 = __webpack_require__("./apps/backend/src/app/modules/slot.module.ts");
let AppModule = AppModule_1 = class AppModule {
    static forRoot() {
        return {
            module: AppModule_1,
            imports: [
                cache_module_1.default,
                config_module_1.default,
                typeorm_module_1.default,
                axios_1.HttpModule,
                cloudinary_module_1.CloudinaryModule,
                health_check_module_1.HealthCheckModule,
                keycloak_module_1.KeycloakModule,
                rooms_module_1.RoomsModule,
                accounts_module_1.AccountsModule,
                devices_module_1.DevicesModule,
                users_warning_flag_module_1.UsersWarningFlagModule,
                booking_room_module_1.BookingRoomModule,
                room_type_module_1.RoomTypeModule,
                device_type_module_1.DeviceTypeModule,
                booking_reason_module_1.BookingReasonModule,
                roles_module_1.RolesModule,
                slot_module_1.SlotModule,
                schedule_1.ScheduleModule.forRoot(),
            ],
            controllers: [],
            exports: [],
            providers: [
                {
                    provide: core_1.APP_GUARD,
                    useClass: role_guard_1.RolesGuard,
                    scope: common_1.Scope.REQUEST,
                    inject: [keycloak_module_1.KeycloakModule],
                },
            ],
        };
    }
};
AppModule = AppModule_1 = tslib_1.__decorate([
    (0, common_1.Global)()
], AppModule);
exports.AppModule = AppModule;


/***/ }),

/***/ "./apps/backend/src/app/modules/booking-reason.module.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.BookingReasonModule = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const config_module_1 = __webpack_require__("./apps/backend/src/app/modules/global/config.module.ts");
const axios_1 = __webpack_require__("@nestjs/axios");
const accounts_module_1 = __webpack_require__("./apps/backend/src/app/modules/accounts.module.ts");
const typeorm_ex_module_1 = __webpack_require__("./apps/backend/src/app/modules/global/typeorm-ex.module.ts");
const booking_reason_controller_1 = __webpack_require__("./apps/backend/src/app/controllers/booking-reason.controller.ts");
const booking_reason_service_1 = __webpack_require__("./apps/backend/src/app/services/booking-reason.service.ts");
const booking_reason_hist_service_1 = __webpack_require__("./apps/backend/src/app/services/booking-reason-hist.service.ts");
const booking_reason_repository_1 = __webpack_require__("./apps/backend/src/app/repositories/booking-reason.repository.ts");
const booking_reason_hist_repository_1 = __webpack_require__("./apps/backend/src/app/repositories/booking-reason-hist.repository.ts");
const services_1 = __webpack_require__("./apps/backend/src/app/services/index.ts");
let BookingReasonModule = class BookingReasonModule {
};
BookingReasonModule = tslib_1.__decorate([
    (0, common_1.Module)({
        imports: [
            config_module_1.default,
            axios_1.HttpModule,
            accounts_module_1.AccountsModule,
            typeorm_ex_module_1.TypeOrmExModule.forCustomRepository([
                booking_reason_repository_1.BookingReasonRepository,
                booking_reason_hist_repository_1.BookingReasonHistRepository,
            ]),
        ],
        controllers: [booking_reason_controller_1.BookingReasonController],
        providers: [booking_reason_service_1.BookingReasonService, booking_reason_hist_service_1.BookingReasonHistService, services_1.KeycloakService],
        exports: [booking_reason_service_1.BookingReasonService, booking_reason_hist_service_1.BookingReasonHistService],
    })
], BookingReasonModule);
exports.BookingReasonModule = BookingReasonModule;


/***/ }),

/***/ "./apps/backend/src/app/modules/booking-room.module.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.BookingRoomModule = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const controllers_1 = __webpack_require__("./apps/backend/src/app/controllers/index.ts");
const services_1 = __webpack_require__("./apps/backend/src/app/services/index.ts");
const repositories_1 = __webpack_require__("./apps/backend/src/app/repositories/index.ts");
const rooms_module_1 = __webpack_require__("./apps/backend/src/app/modules/rooms.module.ts");
const keycloak_module_1 = __webpack_require__("./apps/backend/src/app/modules/keycloak.module.ts");
const room_wishlist_module_1 = __webpack_require__("./apps/backend/src/app/modules/room-wishlist.module.ts");
const typeorm_ex_module_1 = __webpack_require__("./apps/backend/src/app/modules/global/typeorm-ex.module.ts");
const devices_module_1 = __webpack_require__("./apps/backend/src/app/modules/devices.module.ts");
const task_service_1 = __webpack_require__("./apps/backend/src/app/services/task.service.ts");
const accounts_module_1 = __webpack_require__("./apps/backend/src/app/modules/accounts.module.ts");
const room_type_module_1 = __webpack_require__("./apps/backend/src/app/modules/room-type.module.ts");
const booking_room_hist_service_1 = __webpack_require__("./apps/backend/src/app/services/booking-room-hist.service.ts");
const booking_request_hist_repository_1 = __webpack_require__("./apps/backend/src/app/repositories/booking-request-hist.repository.ts");
const slot_module_1 = __webpack_require__("./apps/backend/src/app/modules/slot.module.ts");
let BookingRoomModule = class BookingRoomModule {
};
BookingRoomModule = tslib_1.__decorate([
    (0, common_1.Module)({
        imports: [
            devices_module_1.DevicesModule,
            room_wishlist_module_1.RoomWishlistModule,
            keycloak_module_1.KeycloakModule,
            rooms_module_1.RoomsModule,
            accounts_module_1.AccountsModule,
            room_type_module_1.RoomTypeModule,
            slot_module_1.SlotModule,
            typeorm_ex_module_1.TypeOrmExModule.forCustomRepository([
                repositories_1.BookingRoomRepository,
                repositories_1.AccountRepository,
                booking_request_hist_repository_1.BookingRequestHistRepository
            ]),
        ],
        controllers: [controllers_1.BookingRoomController],
        providers: [services_1.BookingRoomService, task_service_1.TasksService, booking_room_hist_service_1.BookingRequestHistService],
        exports: [services_1.BookingRoomService, booking_room_hist_service_1.BookingRequestHistService],
    })
], BookingRoomModule);
exports.BookingRoomModule = BookingRoomModule;


/***/ }),

/***/ "./apps/backend/src/app/modules/cloudinary.module.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CloudinaryModule = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const services_1 = __webpack_require__("./apps/backend/src/app/services/index.ts");
const config_module_1 = __webpack_require__("./apps/backend/src/app/modules/global/config.module.ts");
let CloudinaryModule = class CloudinaryModule {
};
CloudinaryModule = tslib_1.__decorate([
    (0, common_1.Module)({
        imports: [
            config_module_1.default
        ],
        exports: [services_1.CloudinaryService],
        providers: [services_1.CloudinaryService]
    })
], CloudinaryModule);
exports.CloudinaryModule = CloudinaryModule;


/***/ }),

/***/ "./apps/backend/src/app/modules/device-type.module.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.DeviceTypeModule = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const device_type_controller_1 = __webpack_require__("./apps/backend/src/app/controllers/device-type.controller.ts");
const device_type_service_1 = __webpack_require__("./apps/backend/src/app/services/device-type.service.ts");
const typeorm_ex_module_1 = __webpack_require__("./apps/backend/src/app/modules/global/typeorm-ex.module.ts");
const device_type_repository_1 = __webpack_require__("./apps/backend/src/app/repositories/device-type.repository.ts");
const accounts_module_1 = __webpack_require__("./apps/backend/src/app/modules/accounts.module.ts");
const config_module_1 = __webpack_require__("./apps/backend/src/app/modules/global/config.module.ts");
const axios_1 = __webpack_require__("@nestjs/axios");
const services_1 = __webpack_require__("./apps/backend/src/app/services/index.ts");
const device_type_hist_repository_1 = __webpack_require__("./apps/backend/src/app/repositories/device-type-hist.repository.ts");
const device_type_hist_service_1 = __webpack_require__("./apps/backend/src/app/services/device-type-hist.service.ts");
const devices_module_1 = __webpack_require__("./apps/backend/src/app/modules/devices.module.ts");
let DeviceTypeModule = class DeviceTypeModule {
};
DeviceTypeModule = tslib_1.__decorate([
    (0, common_1.Module)({
        imports: [
            config_module_1.default,
            axios_1.HttpModule,
            accounts_module_1.AccountsModule,
            devices_module_1.DevicesModule,
            typeorm_ex_module_1.TypeOrmExModule.forCustomRepository([device_type_repository_1.DeviceTypeRepository, device_type_hist_repository_1.DeviceTypeHistRepository]),
        ],
        controllers: [device_type_controller_1.DeviceTypeController],
        exports: [device_type_service_1.DeviceTypeService, device_type_hist_service_1.DeviceTypeHistService],
        providers: [device_type_service_1.DeviceTypeService, services_1.KeycloakService, device_type_hist_service_1.DeviceTypeHistService],
    })
], DeviceTypeModule);
exports.DeviceTypeModule = DeviceTypeModule;


/***/ }),

/***/ "./apps/backend/src/app/modules/devices.module.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.DevicesModule = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const controllers_1 = __webpack_require__("./apps/backend/src/app/controllers/index.ts");
// import { EquipmentsHistoryController } from '../controllers';
const services_1 = __webpack_require__("./apps/backend/src/app/services/index.ts");
const services_2 = __webpack_require__("./apps/backend/src/app/services/index.ts");
const repositories_1 = __webpack_require__("./apps/backend/src/app/repositories/index.ts");
const repositories_2 = __webpack_require__("./apps/backend/src/app/repositories/index.ts");
const services_3 = __webpack_require__("./apps/backend/src/app/services/index.ts");
const config_1 = __webpack_require__("@nestjs/config");
const axios_1 = __webpack_require__("@nestjs/axios");
const typeorm_ex_module_1 = __webpack_require__("./apps/backend/src/app/modules/global/typeorm-ex.module.ts");
const accounts_module_1 = __webpack_require__("./apps/backend/src/app/modules/accounts.module.ts");
let DevicesModule = class DevicesModule {
};
DevicesModule = tslib_1.__decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule,
            axios_1.HttpModule,
            accounts_module_1.AccountsModule,
            typeorm_ex_module_1.TypeOrmExModule.forCustomRepository([
                repositories_1.DevicesRepository,
                repositories_2.DeviceHistRepository,
            ]),
        ],
        controllers: [controllers_1.DevicesController],
        providers: [services_1.DevicesService, services_2.DeviceHistService, services_3.KeycloakService],
        exports: [services_1.DevicesService],
    })
], DevicesModule);
exports.DevicesModule = DevicesModule;


/***/ }),

/***/ "./apps/backend/src/app/modules/global/cache.module.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const common_1 = __webpack_require__("@nestjs/common");
const config_1 = __webpack_require__("@nestjs/config");
const redisStore = __webpack_require__("cache-manager-redis-store");
const GlobalCacheModule = common_1.CacheModule.register({
    imports: [config_1.ConfigModule],
    inject: [config_1.ConfigService],
    useFactory: (configService) => ({
        isGlobal: true,
        store: redisStore,
        ttl: 120,
        socket: {
            host: 'fu-lib-room.tk',
            port: 6379,
            password: '12345678x@X',
        }
    })
});
exports["default"] = GlobalCacheModule;


/***/ }),

/***/ "./apps/backend/src/app/modules/global/config.module.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const config_1 = __webpack_require__("@nestjs/config");
const configuration_1 = __webpack_require__("./apps/backend/src/app/constants/config/configuration.ts");
const Joi = __webpack_require__("joi");
const GlobalConfigModule = config_1.ConfigModule.forRoot({
    load: [configuration_1.default],
    validationSchema: Joi.object({
        'db.mysql.url': Joi.string().ip({ version: 'ipv4' }),
        'db.mysql.port': Joi.string().default(3306),
        'db.mysql.username': Joi.string().min(1).max(100),
        'db.mysql.password': Joi.string().min(1).max(255),
        'db.mysql.database': Joi.string().min(1).max(255),
        'db.mysql.synchronize': Joi.boolean(),
        'http.host': Joi.string(),
        'http.port': Joi.number(),
        'https.host': Joi.string(),
        'https.port': Joi.number(),
        'keycloak.host': Joi.string().ip({ version: 'ipv4' }),
        'keycloak.port': Joi.number(),
        'keycloak.client.realm': Joi.string().min(1).max(255),
        'keycloak.client.id': Joi.string().min(1).max(255),
        'keycloak.client.secret': Joi.string().min(1).max(1000),
        'redis.host': Joi.string().ip({ version: 'ipv4' }),
        'redis.port': Joi.number(),
        'redis.username': Joi.string().min(0).max(100),
        'redis.password': Joi.string().min(0).max(255),
        'elasticsearch.username': Joi.string().min(0).max(100),
        'elasticsearch.password': Joi.string().min(0).max(100),
        'firebase.apiKey': Joi.string(),
        'firebase.authDomain': Joi.string(),
        'firebase.projectId': Joi.string(),
        'firebase.storageBucket': Joi.string(),
        'firebase.messagingSenderId': Joi.string(),
        'firebase.appId': Joi.string(),
        'firebase.measurementId': Joi.string(),
        'firebase.oauth.clientId': Joi.string(),
        'firebase.oauth.audience': Joi.array(),
    })
});
exports["default"] = GlobalConfigModule;


/***/ }),

/***/ "./apps/backend/src/app/modules/global/typeorm-ex.module.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.TypeOrmExModule = void 0;
const typeorm_1 = __webpack_require__("@nestjs/typeorm");
const typeorm_ex_decorator_1 = __webpack_require__("./apps/backend/src/app/decorators/typeorm-ex.decorator.ts");
class TypeOrmExModule {
    static forCustomRepository(repositories) {
        const providers = [];
        for (const repository of repositories) {
            const entity = Reflect.getMetadata(typeorm_ex_decorator_1.TYPEORM_EX_CUSTOM_REPOSITORY, repository);
            if (!entity) {
                continue;
            }
            providers.push({
                inject: [(0, typeorm_1.getDataSourceToken)()],
                provide: repository,
                useFactory: (dataSource) => {
                    const baseRepository = dataSource.getRepository(entity);
                    return new repository(baseRepository.target, baseRepository.manager, baseRepository.queryRunner);
                }
            });
        }
        return {
            exports: providers,
            module: TypeOrmExModule,
            providers
        };
    }
}
exports.TypeOrmExModule = TypeOrmExModule;


/***/ }),

/***/ "./apps/backend/src/app/modules/global/typeorm.module.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const typeorm_1 = __webpack_require__("@nestjs/typeorm");
const config_1 = __webpack_require__("@nestjs/config");
const constants_1 = __webpack_require__("./libs/constants/src/index.ts");
const models_1 = __webpack_require__("./apps/backend/src/app/models/index.ts");
const role_entity_1 = __webpack_require__("./apps/backend/src/app/models/role.entity.ts");
const models_2 = __webpack_require__("./apps/backend/src/app/models/index.ts");
const device_type_entity_1 = __webpack_require__("./apps/backend/src/app/models/device-type.entity.ts");
const booking_reason_entity_1 = __webpack_require__("./apps/backend/src/app/models/booking-reason.entity.ts");
const slot_entity_1 = __webpack_require__("./apps/backend/src/app/models/slot.entity.ts");
const role_hist_entity_1 = __webpack_require__("./apps/backend/src/app/models/role-hist.entity.ts");
const GlobalTypeOrmModule = typeorm_1.TypeOrmModule.forRootAsync({
    imports: [config_1.ConfigModule],
    useFactory: (configService) => ({
        type: 'postgres',
        host: configService.get(constants_1.Environment.db.postgres.url),
        port: configService.get(constants_1.Environment.db.postgres.port),
        username: configService.get(constants_1.Environment.db.postgres.username),
        password: configService.get(constants_1.Environment.db.postgres.password),
        database: configService.get(constants_1.Environment.db.postgres.database),
        entities: [
            models_1.Accounts,
            models_1.AccountHist,
            models_1.Rooms,
            models_1.RoomHist,
            models_2.RoomType,
            models_1.RoomTypeHist,
            models_1.Devices,
            device_type_entity_1.DeviceType,
            models_1.DeviceHist,
            models_1.DeviceTypeHist,
            models_1.BookingRequest,
            models_1.RoomWishlist,
            models_1.UsersOTP,
            models_1.UsersWarningFlag,
            models_1.UsersWarningFlagHistory,
            role_entity_1.Roles,
            role_hist_entity_1.RoleHist,
            booking_reason_entity_1.BookingReason,
            slot_entity_1.Slot,
            models_1.BookingReasonHist,
        ],
        synchronize: configService.get(constants_1.Environment.db.postgres.synchronize),
        logging: ['query'],
        cache: false,
        timezone: '+7',
    }),
    inject: [config_1.ConfigService],
});
exports["default"] = GlobalTypeOrmModule;


/***/ }),

/***/ "./apps/backend/src/app/modules/health-check.module.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.HealthCheckModule = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const controllers_1 = __webpack_require__("./apps/backend/src/app/controllers/index.ts");
const services_1 = __webpack_require__("./apps/backend/src/app/services/index.ts");
const axios_1 = __webpack_require__("@nestjs/axios");
const config_module_1 = __webpack_require__("./apps/backend/src/app/modules/global/config.module.ts");
let HealthCheckModule = class HealthCheckModule {
};
HealthCheckModule = tslib_1.__decorate([
    (0, common_1.Module)({
        imports: [
            axios_1.HttpModule,
            config_module_1.default
        ],
        controllers: [
            controllers_1.HealthCheckController
        ],
        providers: [services_1.KeycloakService],
        exports: []
    })
], HealthCheckModule);
exports.HealthCheckModule = HealthCheckModule;


/***/ }),

/***/ "./apps/backend/src/app/modules/keycloak.module.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.KeycloakModule = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const services_1 = __webpack_require__("./apps/backend/src/app/services/index.ts");
const axios_1 = __webpack_require__("@nestjs/axios");
const typeorm_1 = __webpack_require__("@nestjs/typeorm");
const repositories_1 = __webpack_require__("./apps/backend/src/app/repositories/index.ts");
const config_module_1 = __webpack_require__("./apps/backend/src/app/modules/global/config.module.ts");
const services_2 = __webpack_require__("./apps/backend/src/app/services/index.ts");
const services_3 = __webpack_require__("./apps/backend/src/app/services/index.ts");
const accounts_module_1 = __webpack_require__("./apps/backend/src/app/modules/accounts.module.ts");
const controllers_1 = __webpack_require__("./apps/backend/src/app/controllers/index.ts");
let KeycloakModule = class KeycloakModule {
};
KeycloakModule = tslib_1.__decorate([
    (0, common_1.Module)({
        imports: [axios_1.HttpModule,
            typeorm_1.TypeOrmModule.forFeature([
                repositories_1.AccountRepository
            ]),
            config_module_1.default,
            accounts_module_1.AccountsModule
        ],
        controllers: [
            controllers_1.AuthenticationController
        ],
        providers: [
            services_1.KeycloakService,
            services_2.AuthenticationService,
            services_3.CloudinaryService
        ],
        exports: [services_1.KeycloakService]
    })
], KeycloakModule);
exports.KeycloakModule = KeycloakModule;


/***/ }),

/***/ "./apps/backend/src/app/modules/roles.module.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.RolesModule = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const role_service_1 = __webpack_require__("./apps/backend/src/app/services/role.service.ts");
const typeorm_ex_module_1 = __webpack_require__("./apps/backend/src/app/modules/global/typeorm-ex.module.ts");
const role_controller_1 = __webpack_require__("./apps/backend/src/app/controllers/role.controller.ts");
const roles_repository_1 = __webpack_require__("./apps/backend/src/app/repositories/roles.repository.ts");
const services_1 = __webpack_require__("./apps/backend/src/app/services/index.ts");
const config_module_1 = __webpack_require__("./apps/backend/src/app/modules/global/config.module.ts");
const axios_1 = __webpack_require__("@nestjs/axios");
const accounts_module_1 = __webpack_require__("./apps/backend/src/app/modules/accounts.module.ts");
const role_hist_repository_1 = __webpack_require__("./apps/backend/src/app/repositories/role-hist.repository.ts");
const role_hist_service_1 = __webpack_require__("./apps/backend/src/app/services/role-hist.service.ts");
let RolesModule = class RolesModule {
};
RolesModule = tslib_1.__decorate([
    (0, common_1.Module)({
        imports: [
            config_module_1.default,
            axios_1.HttpModule,
            accounts_module_1.AccountsModule,
            typeorm_ex_module_1.TypeOrmExModule.forCustomRepository([roles_repository_1.RolesRepository, role_hist_repository_1.RoleHistRepository]),
        ],
        controllers: [role_controller_1.RoleController],
        providers: [role_service_1.RoleService, role_hist_service_1.RoleHistService, services_1.KeycloakService],
        exports: [role_service_1.RoleService, role_hist_service_1.RoleHistService],
    })
], RolesModule);
exports.RolesModule = RolesModule;


/***/ }),

/***/ "./apps/backend/src/app/modules/room-type.module.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.RoomTypeModule = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const room_type_service_1 = __webpack_require__("./apps/backend/src/app/services/room-type.service.ts");
const room_type_controller_1 = __webpack_require__("./apps/backend/src/app/controllers/room-type.controller.ts");
const typeorm_ex_module_1 = __webpack_require__("./apps/backend/src/app/modules/global/typeorm-ex.module.ts");
const room_type_repository_1 = __webpack_require__("./apps/backend/src/app/repositories/room-type.repository.ts");
const services_1 = __webpack_require__("./apps/backend/src/app/services/index.ts");
const config_module_1 = __webpack_require__("./apps/backend/src/app/modules/global/config.module.ts");
const axios_1 = __webpack_require__("@nestjs/axios");
const accounts_module_1 = __webpack_require__("./apps/backend/src/app/modules/accounts.module.ts");
const room_type_hist_service_1 = __webpack_require__("./apps/backend/src/app/services/room-type-hist.service.ts");
const room_type_hist_repository_1 = __webpack_require__("./apps/backend/src/app/repositories/room-type-hist.repository.ts");
const rooms_module_1 = __webpack_require__("./apps/backend/src/app/modules/rooms.module.ts");
let RoomTypeModule = class RoomTypeModule {
};
RoomTypeModule = tslib_1.__decorate([
    (0, common_1.Module)({
        imports: [
            config_module_1.default,
            axios_1.HttpModule,
            accounts_module_1.AccountsModule,
            rooms_module_1.RoomsModule,
            typeorm_ex_module_1.TypeOrmExModule.forCustomRepository([
                room_type_repository_1.RoomTypeRepository,
                room_type_hist_repository_1.RoomTypeHistRepository,
            ]),
        ],
        controllers: [room_type_controller_1.RoomTypeController],
        exports: [
            room_type_service_1.RoomTypeService,
            room_type_hist_service_1.RoomTypeHistService,
        ],
        providers: [
            room_type_service_1.RoomTypeService,
            services_1.KeycloakService,
            room_type_hist_service_1.RoomTypeHistService,
        ],
    })
], RoomTypeModule);
exports.RoomTypeModule = RoomTypeModule;


/***/ }),

/***/ "./apps/backend/src/app/modules/room-wishlist.module.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.RoomWishlistModule = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const repositories_1 = __webpack_require__("./apps/backend/src/app/repositories/index.ts");
const services_1 = __webpack_require__("./apps/backend/src/app/services/index.ts");
const accounts_module_1 = __webpack_require__("./apps/backend/src/app/modules/accounts.module.ts");
const typeorm_ex_module_1 = __webpack_require__("./apps/backend/src/app/modules/global/typeorm-ex.module.ts");
let RoomWishlistModule = class RoomWishlistModule {
};
RoomWishlistModule = tslib_1.__decorate([
    (0, common_1.Module)({
        imports: [
            accounts_module_1.AccountsModule,
            typeorm_ex_module_1.TypeOrmExModule.forCustomRepository([repositories_1.RoomWishlistRepository])
        ],
        exports: [services_1.RoomWishlistService],
        providers: [services_1.RoomWishlistService]
    })
], RoomWishlistModule);
exports.RoomWishlistModule = RoomWishlistModule;


/***/ }),

/***/ "./apps/backend/src/app/modules/rooms.module.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.RoomsModule = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const controllers_1 = __webpack_require__("./apps/backend/src/app/controllers/index.ts");
const services_1 = __webpack_require__("./apps/backend/src/app/services/index.ts");
const repositories_1 = __webpack_require__("./apps/backend/src/app/repositories/index.ts");
const axios_1 = __webpack_require__("@nestjs/axios");
const config_module_1 = __webpack_require__("./apps/backend/src/app/modules/global/config.module.ts");
const typeorm_ex_module_1 = __webpack_require__("./apps/backend/src/app/modules/global/typeorm-ex.module.ts");
const keycloak_module_1 = __webpack_require__("./apps/backend/src/app/modules/keycloak.module.ts");
const accounts_module_1 = __webpack_require__("./apps/backend/src/app/modules/accounts.module.ts");
const room_hist_repository_1 = __webpack_require__("./apps/backend/src/app/repositories/room-hist.repository.ts");
const room_hist_service_1 = __webpack_require__("./apps/backend/src/app/services/room-hist.service.ts");
let RoomsModule = class RoomsModule {
};
RoomsModule = tslib_1.__decorate([
    (0, common_1.Module)({
        imports: [
            accounts_module_1.AccountsModule,
            typeorm_ex_module_1.TypeOrmExModule.forCustomRepository([repositories_1.RoomsRepository, room_hist_repository_1.RoomHistRepository]),
            axios_1.HttpModule,
            config_module_1.default,
            keycloak_module_1.KeycloakModule,
        ],
        controllers: [controllers_1.RoomsController],
        providers: [services_1.RoomsService, room_hist_service_1.RoomHistService],
        exports: [services_1.RoomsService, room_hist_service_1.RoomHistService],
    })
], RoomsModule);
exports.RoomsModule = RoomsModule;


/***/ }),

/***/ "./apps/backend/src/app/modules/slot.module.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SlotModule = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const typeorm_ex_module_1 = __webpack_require__("./apps/backend/src/app/modules/global/typeorm-ex.module.ts");
const slot_repository_1 = __webpack_require__("./apps/backend/src/app/repositories/slot.repository.ts");
const slots_controller_1 = __webpack_require__("./apps/backend/src/app/controllers/slots.controller.ts");
const slot_service_1 = __webpack_require__("./apps/backend/src/app/services/slot.service.ts");
let SlotModule = class SlotModule {
};
SlotModule = tslib_1.__decorate([
    (0, common_1.Module)({
        imports: [typeorm_ex_module_1.TypeOrmExModule.forCustomRepository([slot_repository_1.SlotRepository])],
        controllers: [slots_controller_1.SlotController],
        providers: [slot_service_1.SlotService],
        exports: [slot_service_1.SlotService],
    })
], SlotModule);
exports.SlotModule = SlotModule;


/***/ }),

/***/ "./apps/backend/src/app/modules/users-warning-flag.module.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UsersWarningFlagModule = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const typeorm_1 = __webpack_require__("@nestjs/typeorm");
const controllers_1 = __webpack_require__("./apps/backend/src/app/controllers/index.ts");
const users_warning_flag_history_controller_1 = __webpack_require__("./apps/backend/src/app/controllers/users-warning-flag-history.controller.ts");
const services_1 = __webpack_require__("./apps/backend/src/app/services/index.ts");
const services_2 = __webpack_require__("./apps/backend/src/app/services/index.ts");
const repositories_1 = __webpack_require__("./apps/backend/src/app/repositories/index.ts");
const repositories_2 = __webpack_require__("./apps/backend/src/app/repositories/index.ts");
const keycloak_module_1 = __webpack_require__("./apps/backend/src/app/modules/keycloak.module.ts");
let UsersWarningFlagModule = class UsersWarningFlagModule {
};
UsersWarningFlagModule = tslib_1.__decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([
                repositories_1.UsersWarningFlagRepository,
                repositories_2.UsersWarningFlagHistoryRepository
            ]),
            keycloak_module_1.KeycloakModule
        ],
        controllers: [
            controllers_1.UsersWarningFlagController,
            users_warning_flag_history_controller_1.UsersWarningFlagHistoryController,
        ],
        providers: [
            services_1.UsersWarningFlagService,
            services_2.UsersWarningFlagHistoryService,
            repositories_1.UsersWarningFlagRepository,
            repositories_2.UsersWarningFlagHistoryRepository
        ]
    })
], UsersWarningFlagModule);
exports.UsersWarningFlagModule = UsersWarningFlagModule;


/***/ }),

/***/ "./apps/backend/src/app/payload/request/account-add.request.payload.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AccountAddRequestPayload = void 0;
const tslib_1 = __webpack_require__("tslib");
const pagination_model_1 = __webpack_require__("./apps/backend/src/app/controllers/pagination.model.ts");
const class_validator_1 = __webpack_require__("class-validator");
const class_transformer_1 = __webpack_require__("class-transformer");
const swagger_1 = __webpack_require__("@nestjs/swagger");
class AccountAddRequestPayload extends pagination_model_1.PaginationParams {
}
tslib_1.__decorate([
    (0, class_transformer_1.Transform)(({ value }) => value === null || value === void 0 ? void 0 : value.trim()),
    (0, class_validator_1.MinLength)(8),
    (0, class_validator_1.MaxLength)(100),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)({
        message: 'Userame can not be empty',
    }),
    tslib_1.__metadata("design:type", String)
], AccountAddRequestPayload.prototype, "username", void 0);
tslib_1.__decorate([
    (0, class_transformer_1.Transform)(({ value }) => value === null || value === void 0 ? void 0 : value.trim()),
    (0, class_validator_1.MinLength)(8),
    (0, class_validator_1.MaxLength)(100),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)({
        message: 'FullName can not be empty',
    }),
    tslib_1.__metadata("design:type", String)
], AccountAddRequestPayload.prototype, "fullname", void 0);
tslib_1.__decorate([
    (0, class_transformer_1.Transform)(({ value }) => value === null || value === void 0 ? void 0 : value.trim()),
    (0, class_validator_1.MinLength)(11),
    (0, class_validator_1.MaxLength)(11),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    tslib_1.__metadata("design:type", String)
], AccountAddRequestPayload.prototype, "phone", void 0);
tslib_1.__decorate([
    (0, class_transformer_1.Transform)(({ value }) => value === null || value === void 0 ? void 0 : value.trim()),
    (0, class_validator_1.MinLength)(11),
    (0, class_validator_1.MaxLength)(11),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    tslib_1.__metadata("design:type", String)
], AccountAddRequestPayload.prototype, "email", void 0);
tslib_1.__decorate([
    (0, class_transformer_1.Transform)(({ value }) => value === null || value === void 0 ? void 0 : value.trim()),
    (0, class_validator_1.MaxLength)(100),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)({
        message: 'Description can not be empty',
    }),
    tslib_1.__metadata("design:type", String)
], AccountAddRequestPayload.prototype, "description", void 0);
tslib_1.__decorate([
    (0, class_transformer_1.Transform)(({ value }) => value === null || value === void 0 ? void 0 : value.trim()),
    (0, class_validator_1.IsNotEmpty)({
        message: 'Role can not be empty',
    }),
    tslib_1.__metadata("design:type", String)
], AccountAddRequestPayload.prototype, "roleId", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({
        name: 'avatar',
        description: 'Avatar of the account',
        required: true,
        type: String,
        title: 'avatar',
        example: 'http://google.com/',
        minLength: 1,
        maxLength: 256,
    }),
    tslib_1.__metadata("design:type", String)
], AccountAddRequestPayload.prototype, "avatar", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({
        name: 'isDisabled',
        description: 'Is the account should be disabled',
        type: Boolean,
        example: true,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    tslib_1.__metadata("design:type", Boolean)
], AccountAddRequestPayload.prototype, "isDisabled", void 0);
exports.AccountAddRequestPayload = AccountAddRequestPayload;


/***/ }),

/***/ "./apps/backend/src/app/payload/request/account-update-profile.request.payload.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AccountUpdateProfilePayload = void 0;
const tslib_1 = __webpack_require__("tslib");
const pagination_model_1 = __webpack_require__("./apps/backend/src/app/controllers/pagination.model.ts");
const class_validator_1 = __webpack_require__("class-validator");
const class_transformer_1 = __webpack_require__("class-transformer");
class AccountUpdateProfilePayload extends pagination_model_1.PaginationParams {
}
tslib_1.__decorate([
    (0, class_transformer_1.Transform)(({ value }) => value === null || value === void 0 ? void 0 : value.trim()),
    (0, class_validator_1.IsNotEmpty)({
        message: 'Full name can not be empty',
    }),
    (0, class_validator_1.MinLength)(0),
    (0, class_validator_1.MaxLength)(55),
    (0, class_validator_1.IsString)(),
    tslib_1.__metadata("design:type", String)
], AccountUpdateProfilePayload.prototype, "fullname", void 0);
tslib_1.__decorate([
    (0, class_transformer_1.Transform)(({ value }) => value === null || value === void 0 ? void 0 : value.trim()),
    (0, class_validator_1.IsNotEmpty)({
        message: 'Email can not be empty',
    }),
    (0, class_validator_1.IsEmail)(),
    tslib_1.__metadata("design:type", String)
], AccountUpdateProfilePayload.prototype, "email", void 0);
tslib_1.__decorate([
    (0, class_transformer_1.Transform)(({ value }) => value === null || value === void 0 ? void 0 : value.trim()),
    (0, class_validator_1.Matches)(/[0-9]/, {
        message: 'Phone number must be numbers'
    }),
    (0, class_validator_1.MinLength)(10),
    (0, class_validator_1.MaxLength)(11),
    (0, class_validator_1.IsNotEmpty)({
        message: 'Phone can not be empty',
    }),
    tslib_1.__metadata("design:type", String)
], AccountUpdateProfilePayload.prototype, "phone", void 0);
tslib_1.__decorate([
    (0, class_transformer_1.Transform)(({ value }) => value === null || value === void 0 ? void 0 : value.trim()),
    (0, class_validator_1.IsOptional)(),
    tslib_1.__metadata("design:type", String)
], AccountUpdateProfilePayload.prototype, "description", void 0);
exports.AccountUpdateProfilePayload = AccountUpdateProfilePayload;


/***/ }),

/***/ "./apps/backend/src/app/payload/request/booking-reason.request.payload.ts":
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));


/***/ }),

/***/ "./apps/backend/src/app/payload/request/booking-request-add.request.payload.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.BookingRequestAddRequestPayload = void 0;
const tslib_1 = __webpack_require__("tslib");
const pagination_model_1 = __webpack_require__("./apps/backend/src/app/controllers/pagination.model.ts");
const class_validator_1 = __webpack_require__("class-validator");
const class_transformer_1 = __webpack_require__("class-transformer");
class BookingRequestAddRequestPayload extends pagination_model_1.PaginationParams {
}
tslib_1.__decorate([
    (0, class_transformer_1.Transform)(({ value }) => value === null || value === void 0 ? void 0 : value.trim()),
    (0, class_validator_1.MaxLength)(100),
    (0, class_validator_1.IsNotEmpty)({
        message: 'Room can not be empty',
    }),
    (0, class_validator_1.IsString)(),
    tslib_1.__metadata("design:type", String)
], BookingRequestAddRequestPayload.prototype, "roomId", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)({
        message: 'Day checkin can not be empty',
    }),
    (0, class_validator_1.IsString)(),
    tslib_1.__metadata("design:type", String)
], BookingRequestAddRequestPayload.prototype, "checkinDate", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    tslib_1.__metadata("design:type", String)
], BookingRequestAddRequestPayload.prototype, "checkoutDate", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)({
        message: 'Slot check in can not be empty',
    }),
    (0, class_validator_1.IsString)(),
    tslib_1.__metadata("design:type", String)
], BookingRequestAddRequestPayload.prototype, "checkinSlot", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)({
        message: 'Slot check out can not be empty',
    }),
    (0, class_validator_1.IsString)(),
    tslib_1.__metadata("design:type", String)
], BookingRequestAddRequestPayload.prototype, "checkoutSlot", void 0);
tslib_1.__decorate([
    (0, class_validator_1.MaxLength)(500),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    tslib_1.__metadata("design:type", String)
], BookingRequestAddRequestPayload.prototype, "description", void 0);
tslib_1.__decorate([
    (0, class_transformer_1.Transform)(({ value }) => value === null || value === void 0 ? void 0 : value.trim()),
    (0, class_validator_1.IsNotEmpty)({
        message: 'Reason type can not be empty',
    }),
    (0, class_validator_1.IsString)(),
    tslib_1.__metadata("design:type", String)
], BookingRequestAddRequestPayload.prototype, "bookingReasonId", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    tslib_1.__metadata("design:type", Array)
], BookingRequestAddRequestPayload.prototype, "device", void 0);
exports.BookingRequestAddRequestPayload = BookingRequestAddRequestPayload;


/***/ }),

/***/ "./apps/backend/src/app/payload/request/change-password.request.payload.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ChangeProfilePasswordRequest = void 0;
const tslib_1 = __webpack_require__("tslib");
const swagger_1 = __webpack_require__("@nestjs/swagger");
class ChangeProfilePasswordRequest {
}
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({
        name: "username",
        required: true,
        type: String,
        example: "example-account",
        minLength: 1,
        maxLength: 100
    }),
    tslib_1.__metadata("design:type", String)
], ChangeProfilePasswordRequest.prototype, "username", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({
        name: "password",
        required: true,
        type: String,
        example: "my-password",
        minLength: 1,
        maxLength: 100
    }),
    tslib_1.__metadata("design:type", String)
], ChangeProfilePasswordRequest.prototype, "password", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({
        name: "newPassword",
        required: true,
        type: String,
        example: "my-password",
        minLength: 1,
        maxLength: 100
    }),
    tslib_1.__metadata("design:type", String)
], ChangeProfilePasswordRequest.prototype, "newPassword", void 0);
exports.ChangeProfilePasswordRequest = ChangeProfilePasswordRequest;


/***/ }),

/***/ "./apps/backend/src/app/payload/request/data-add.request.payload.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.DataAddRequestPayload = void 0;
const tslib_1 = __webpack_require__("tslib");
const pagination_model_1 = __webpack_require__("./apps/backend/src/app/controllers/pagination.model.ts");
const class_validator_1 = __webpack_require__("class-validator");
const class_transformer_1 = __webpack_require__("class-transformer");
const swagger_1 = __webpack_require__("@nestjs/swagger");
class DataAddRequestPayload extends pagination_model_1.PaginationParams {
}
tslib_1.__decorate([
    (0, class_transformer_1.Transform)(({ value }) => value === null || value === void 0 ? void 0 : value.trim()),
    (0, class_validator_1.MaxLength)(100),
    (0, class_validator_1.IsNotEmpty)({
        message: 'Name can not be empty',
    }),
    tslib_1.__metadata("design:type", String)
], DataAddRequestPayload.prototype, "name", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({
        name: 'description',
        description: 'Description to be added',
        maxLength: 500,
        minLength: 0,
        type: String,
        example: 'New entity',
    }),
    (0, class_validator_1.MaxLength)(500),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    tslib_1.__metadata("design:type", String)
], DataAddRequestPayload.prototype, "description", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({
        name: 'isDisabled',
        description: 'Is the room should be disabled',
        type: Boolean,
        example: true,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    tslib_1.__metadata("design:type", Boolean)
], DataAddRequestPayload.prototype, "isDisabled", void 0);
tslib_1.__decorate([
    (0, class_transformer_1.Transform)(({ value }) => value === null || value === void 0 ? void 0 : value.trim()),
    (0, class_validator_1.IsNotEmpty)({
        message: 'Type can not be empty',
    }),
    tslib_1.__metadata("design:type", String)
], DataAddRequestPayload.prototype, "type", void 0);
exports.DataAddRequestPayload = DataAddRequestPayload;


/***/ }),

/***/ "./apps/backend/src/app/payload/request/master-data-add.request.payload.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.MasterDataAddRequestPayload = void 0;
const tslib_1 = __webpack_require__("tslib");
const pagination_model_1 = __webpack_require__("./apps/backend/src/app/controllers/pagination.model.ts");
const class_validator_1 = __webpack_require__("class-validator");
const class_transformer_1 = __webpack_require__("class-transformer");
class MasterDataAddRequestPayload extends pagination_model_1.PaginationParams {
}
tslib_1.__decorate([
    (0, class_transformer_1.Transform)(({ value }) => value === null || value === void 0 ? void 0 : value.trim()),
    (0, class_validator_1.IsNotEmpty)({
        message: 'Name can not be empty',
    }),
    tslib_1.__metadata("design:type", String)
], MasterDataAddRequestPayload.prototype, "name", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsOptional)(),
    tslib_1.__metadata("design:type", String)
], MasterDataAddRequestPayload.prototype, "description", void 0);
exports.MasterDataAddRequestPayload = MasterDataAddRequestPayload;


/***/ }),

/***/ "./apps/backend/src/app/payload/response/refresh-token.request.payload.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.RefreshTokenPayload = void 0;
const tslib_1 = __webpack_require__("tslib");
const swagger_1 = __webpack_require__("@nestjs/swagger");
class RefreshTokenPayload {
}
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({
        name: "refresh_token",
        example: "example-refresh-token",
        type: String,
        required: true,
        description: "Refresh token which is given by logging into the system",
        title: "Refresh token"
    }),
    tslib_1.__metadata("design:type", String)
], RefreshTokenPayload.prototype, "refreshToken", void 0);
exports.RefreshTokenPayload = RefreshTokenPayload;


/***/ }),

/***/ "./apps/backend/src/app/pipes/parse-token.pipe.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ParseTokenPipe = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const services_1 = __webpack_require__("./apps/backend/src/app/services/index.ts");
let ParseTokenPipe = class ParseTokenPipe {
    constructor(keycloakService, accountService) {
        this.keycloakService = keycloakService;
        this.accountService = accountService;
    }
    transform(value, metadata) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const keycloakUser = yield this.keycloakService.getUserInfo(value);
            const accountId = yield this.accountService.getAccountIdByKeycloakId(keycloakUser.sub);
            return Object.assign(Object.assign({}, keycloakUser), { account_id: accountId });
        });
    }
};
ParseTokenPipe = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof services_1.KeycloakService !== "undefined" && services_1.KeycloakService) === "function" ? _a : Object, typeof (_b = typeof services_1.AccountsService !== "undefined" && services_1.AccountsService) === "function" ? _b : Object])
], ParseTokenPipe);
exports.ParseTokenPipe = ParseTokenPipe;


/***/ }),

/***/ "./apps/backend/src/app/pipes/validation/add-room.validation.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AddRoomValidation = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const class_validator_1 = __webpack_require__("class-validator");
const class_transformer_1 = __webpack_require__("class-transformer");
let AddRoomValidation = class AddRoomValidation {
    transform(value, { metatype }) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            if (!metatype || !this.validateMetaType(metatype)) {
                return value;
            }
            const object = (0, class_transformer_1.plainToClass)(metatype, value);
            const errors = yield (0, class_validator_1.validate)(object);
            if (errors.length > 0) {
                throw new common_1.BadRequestException(Object.values(errors[0].constraints)[0]);
            }
            return value;
        });
    }
    // eslint-disable-next-line @typescript-eslint/ban-types
    validateMetaType(metatype) {
        // eslint-disable-next-line @typescript-eslint/ban-types
        const types = [String, Boolean, Number, Array, Object];
        return !types.includes(metatype);
    }
};
AddRoomValidation = tslib_1.__decorate([
    (0, common_1.Injectable)()
], AddRoomValidation);
exports.AddRoomValidation = AddRoomValidation;


/***/ }),

/***/ "./apps/backend/src/app/pipes/validation/devices.validation.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.DevicesValidation = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const class_validator_1 = __webpack_require__("class-validator");
const class_transformer_1 = __webpack_require__("class-transformer");
let DevicesValidation = class DevicesValidation {
    transform(value, { metatype }) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            if (!metatype || !this.validateMetaType(metatype)) {
                return value;
            }
            const object = (0, class_transformer_1.plainToClass)(metatype, value);
            const errors = yield (0, class_validator_1.validate)(object);
            if (errors.length > 0) {
                throw new common_1.BadRequestException(Object.values(errors[0].constraints)[0]);
            }
            return value;
        });
    }
    // eslint-disable-next-line @typescript-eslint/ban-types
    validateMetaType(metatype) {
        // eslint-disable-next-line @typescript-eslint/ban-types
        const types = [String, Boolean, Number, Array, Object];
        return !types.includes(metatype);
    }
};
DevicesValidation = tslib_1.__decorate([
    (0, common_1.Injectable)()
], DevicesValidation);
exports.DevicesValidation = DevicesValidation;


/***/ }),

/***/ "./apps/backend/src/app/pipes/validation/rooms.validation.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.RoomsValidation = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const class_validator_1 = __webpack_require__("class-validator");
const class_transformer_1 = __webpack_require__("class-transformer");
let RoomsValidation = class RoomsValidation {
    transform(value, { metatype }) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            if (!metatype || !this.validateMetaType(metatype)) {
                return value;
            }
            const object = (0, class_transformer_1.plainToClass)(metatype, value);
            const errors = yield (0, class_validator_1.validate)(object);
            if (errors.length > 0) {
                throw new common_1.BadRequestException(Object.values(errors[0].constraints)[0]);
            }
            return value;
        });
    }
    // eslint-disable-next-line @typescript-eslint/ban-types
    validateMetaType(metatype) {
        // eslint-disable-next-line @typescript-eslint/ban-types
        const types = [String, Boolean, Number, Array, Object];
        return !types.includes(metatype);
    }
};
RoomsValidation = tslib_1.__decorate([
    (0, common_1.Injectable)()
], RoomsValidation);
exports.RoomsValidation = RoomsValidation;


/***/ }),

/***/ "./apps/backend/src/app/pipes/validation/users.validation.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UsersValidation = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const class_validator_1 = __webpack_require__("class-validator");
const class_transformer_1 = __webpack_require__("class-transformer");
let UsersValidation = class UsersValidation {
    transform(value, { metatype }) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            if (!metatype || !this.validateMetaType(metatype)) {
                return value;
            }
            const object = (0, class_transformer_1.plainToClass)(metatype, value);
            const errors = yield (0, class_validator_1.validate)(object);
            if (errors.length > 0) {
                throw new common_1.BadRequestException(Object.values(errors[0].constraints)[0]);
            }
            return value;
        });
    }
    // eslint-disable-next-line @typescript-eslint/ban-types
    validateMetaType(metatype) {
        // eslint-disable-next-line @typescript-eslint/ban-types
        const types = [String, Boolean, Number, Array, Object];
        return !types.includes(metatype);
    }
};
UsersValidation = tslib_1.__decorate([
    (0, common_1.Injectable)()
], UsersValidation);
exports.UsersValidation = UsersValidation;


/***/ }),

/***/ "./apps/backend/src/app/repositories/account-hist.repository.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AccountHistRepository = void 0;
const tslib_1 = __webpack_require__("tslib");
const typeorm_1 = __webpack_require__("typeorm");
const typeorm_ex_decorator_1 = __webpack_require__("./apps/backend/src/app/decorators/typeorm-ex.decorator.ts");
const models_1 = __webpack_require__("./apps/backend/src/app/models/index.ts");
let AccountHistRepository = class AccountHistRepository extends typeorm_1.Repository {
    createNew(payload) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            console.log("AAAAAAAAAA: ", payload);
            const accountId = payload.id;
            delete payload.id;
            return this.save(Object.assign({ accountId: accountId }, payload));
        });
    }
};
AccountHistRepository = tslib_1.__decorate([
    (0, typeorm_ex_decorator_1.CustomRepository)(models_1.AccountHist)
], AccountHistRepository);
exports.AccountHistRepository = AccountHistRepository;


/***/ }),

/***/ "./apps/backend/src/app/repositories/account.repository.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AccountRepository = void 0;
const tslib_1 = __webpack_require__("tslib");
const typeorm_1 = __webpack_require__("typeorm");
const models_1 = __webpack_require__("./apps/backend/src/app/models/index.ts");
const typeorm_ex_decorator_1 = __webpack_require__("./apps/backend/src/app/decorators/typeorm-ex.decorator.ts");
const nestjs_typeorm_paginate_1 = __webpack_require__("nestjs-typeorm-paginate");
const role_entity_1 = __webpack_require__("./apps/backend/src/app/models/role.entity.ts");
let AccountRepository = class AccountRepository extends typeorm_1.Repository {
    existsById(id) {
        return this.createQueryBuilder('accounts')
            .select('COUNT(1)', 'count')
            .where('accounts.id = :id', { id: id })
            .getRawOne()
            .then((data) => (data === null || data === void 0 ? void 0 : data.count) > 0);
    }
    getRoleOfAccount(id) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return this.createQueryBuilder('account')
                .select('role.name')
                .innerJoin(role_entity_1.Roles, 'role', 'role.id = account.role_id')
                .where('account.disabled_at IS NULL')
                .andWhere('account.deleted_at IS NULL')
                .andWhere('account.id = :accountId', { accountId: id })
                .getRawOne();
        });
    }
    checkIfAccountIsDeletedById(id) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return this.createQueryBuilder('accounts')
                .select('accounts.deleted_at')
                .where('accounts.id = :id', { id: id })
                .getRawOne()
                .then((data) => (data ? data['deleted_at'] : true));
        });
    }
    checkIfAccountIsDisabledById(id) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return this.createQueryBuilder('accounts')
                .select('accounts.disabled_at')
                .where('accounts.id = :id', { id: id })
                .getRawOne()
                .then((data) => (data ? data['disabled_at'] : true));
        });
    }
    findKeycloakIdByGoogleId(googleId) {
        return this.createQueryBuilder('accounts')
            .select('accounts.keycloak_id', 'keycloakId')
            .where('accounts.google_id = :googleId', { googleId: googleId })
            .getRawOne()
            .then((data) => data === null || data === void 0 ? void 0 : data.keycloakId);
    }
    isExistedByUsername(username) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return this.createQueryBuilder('accounts')
                .select('COUNT(accounts.username)')
                .where('accounts.username = :username', { username })
                .getRawOne()
                .then((data) => data['count'] > 0);
        });
    }
    checkIfUserAlreadyHasAvatar(id) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const data = yield this.createQueryBuilder('accounts')
                .select('COUNT(accounts.avatar)')
                .where('accounts.id = :id', { id: id })
                .getRawOne();
            return data.length > 0;
        });
    }
    findByKeycloakId(keycloakId) {
        return this.createQueryBuilder('accounts')
            .select([
            'accounts.id',
            'accounts.keycloak_id',
            'accounts.google_id',
            'accounts.username',
            'accounts.email',
            'accounts.fullname',
            'accounts.phone',
            'accounts.avatar',
        ])
            .addSelect('r.name', 'role')
            .innerJoin(role_entity_1.Roles, 'r', 'r.id = accounts.role_id')
            .where('accounts.keycloak_id = :keycloakId', { keycloakId: keycloakId })
            .andWhere('accounts.disabled_at IS NULL')
            .andWhere('accounts.deleted_at IS NULL')
            .getOneOrFail();
    }
    findByGoogleId(googleId) {
        return this.createQueryBuilder('accounts')
            .where('accounts.googleId = :googleId', { googleId })
            .andWhere('accounts.disabled_at IS NULL')
            .andWhere('accounts.deleted_at IS NULL')
            .getOneOrFail();
    }
    searchAccount(payload) {
        const query = this.createQueryBuilder('account')
            .select('account.id', 'id')
            .addSelect('account.username', 'username')
            .addSelect('account.description', 'description')
            .addSelect('account.fullname', 'fullname')
            .addSelect('account.createdAt', 'createdAt')
            .addSelect('account.updatedAt', 'updatedAt')
            .addSelect('account.email', 'email')
            .addSelect('role.name', 'role')
            .addSelect('a.username', 'createdBy')
            .addSelect('aa.username', 'updatedBy')
            .leftJoin(models_1.Accounts, 'a', 'a.id = account.created_by')
            .leftJoin(models_1.Accounts, 'aa', 'aa.id = account.updated_by')
            .innerJoin(role_entity_1.Roles, 'role', 'role.id = account.role_id')
            .where('LOWER(account.fullname) ILIKE LOWER(:search)', {
            search: `%${payload.search.trim()}%`,
        })
            .andWhere('account.deleted_at IS NULL')
            .andWhere('account.disabled_at IS NULL')
            .orderBy(payload.sort, payload.dir);
        if (payload.role && payload.role !== '') {
            query.andWhere('role.name = :role', {
                role: payload.role,
            });
        }
        return (0, nestjs_typeorm_paginate_1.paginateRaw)(query, {
            limit: payload.limit,
            page: payload.page,
        });
    }
    getAccountsByRoleId(roleId) {
        return this.createQueryBuilder(`account`)
            .select('account.id', 'id')
            .addSelect('account.username', 'username')
            .addSelect('account.fullname', 'fullname')
            .addSelect('account.role_id', 'roleId')
            .addSelect('r.name', 'roleName')
            .innerJoin(role_entity_1.Roles, 'r', 'r.id = account.role_id')
            .where(`account.deleted_at IS NULL`)
            .andWhere(`account.disabled_at IS NULL`)
            .andWhere('account.role_id = :role', { role: roleId })
            .getRawMany();
    }
    getSize() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const result = yield this.createQueryBuilder(`accounts`)
                .select(`COUNT(id)`, 'size')
                .andWhere('accounts.disabled_at IS NULL')
                .andWhere('accounts.deleted_at IS NULL')
                .getRawOne();
            return result.size;
        });
    }
    // search(
    //   payload: RepositoryPaginationPayload
    // ): Promise<Pagination<Accounts, IPaginationMeta>> {
    //   const query = this.createQueryBuilder(`accounts`)
    //     .where(`accounts.name LIKE :name`, { name: `%${payload.search}%` })
    //     .orWhere(`accounts.description LIKE :description`, {
    //       description: `%${payload.search}%`,
    //     })
    //     .andWhere('accounts.disabled_at IS NULL')
    //     .andWhere('accounts.deleted_at IS NULL')
    //     .orWhere(`accounts.username = :username`, {
    //       username: `%${payload.search}%`,
    //     })
    //     .orWhere(`accounts.description = :description`, {
    //       description: `%${payload.search}%`,
    //     });
    //   return paginateRaw<Accounts>(query, {
    //     page: payload.page,
    //     limit: payload.limit,
    //   });
    // }
    findIdByKeycloakId(keycloakId) {
        return this.createQueryBuilder('accounts')
            .select('accounts.id', 'id')
            .where('accounts.keycloak_id = :keycloakId', { keycloakId: keycloakId })
            .getRawOne()
            .then((data) => (data ? data['id'] : undefined));
    }
    findKeycloakIdByAccountId(id) {
        return this.createQueryBuilder('accounts')
            .select('accounts.keycloak_id', 'keycloak_id')
            .where('accounts.id = :id', { id: id })
            .getRawOne()
            .then((data) => (data ? data['keycloak_id'] : undefined));
    }
    findAvatarURLById(id) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return this.createQueryBuilder('accounts')
                .select('accounts.avatar', 'avatar')
                .where('accounts.id = :id', { id: id })
                .getRawOne()
                .then((data) => (data ? data['avatar'] : undefined));
        });
    }
    addAvatarURLById(avatarUrl, id) {
        return this.createQueryBuilder('accounts')
            .update()
            .set({
            avatar: avatarUrl,
        })
            .where('accounts.id = :id', { id: id })
            .useTransaction(true)
            .execute();
    }
    createNewAccount(payload, userId) {
        if (payload.isDisabled) {
            return this.save({
                username: payload.username,
                fullname: payload.fullname,
                email: payload.email,
                phone: payload.phone,
                roleId: payload.roleId,
                description: payload.description,
                createdBy: userId,
                createdAt: new Date(),
                disabledBy: userId,
                disabledAt: new Date(),
            }, {
                transaction: true,
            });
        }
        else {
            return this.save({
                username: payload.username,
                fullname: payload.fullname,
                email: payload.email,
                phone: payload.phone,
                roleId: payload.roleId,
                description: payload.description,
                createdBy: userId,
                createdAt: new Date(),
            }, {
                transaction: true,
            });
        }
    }
    updatePartially(body, account, accountId) {
        return this.save(Object.assign(Object.assign({}, account), { fullname: body.fullname, email: body.email, phone: body.phone, description: body.description, updatedBy: accountId, roleId: body.roleId }), {
            transaction: true,
        });
    }
    updateGoogleIdByEmail(userGoogleId, email) {
        return this.createQueryBuilder('accounts')
            .update({
            googleId: userGoogleId,
        })
            .where('accounts.email = :email', { email: email })
            .useTransaction(true)
            .execute();
    }
    disableById(accountId, id) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const isDisabled = yield this.createQueryBuilder('account')
                .update({
                disabledBy: accountId,
                disabledAt: new Date(),
            })
                .where('account.id = :id', { id: id })
                .useTransaction(true)
                .execute();
            if (isDisabled.affected > 0) {
                return this.findOneOrFail({
                    where: {
                        id: id,
                    },
                });
            }
        });
    }
    findDisabledAccounts(search) {
        return this.createQueryBuilder('account')
            .select('account.id', 'id')
            .addSelect('account.username', 'username')
            .addSelect('account.fullname', 'fullname')
            .addSelect('account.description', 'description')
            .addSelect('account.role_id', 'roleId')
            .addSelect('account.email', 'email')
            .addSelect('account.phone', 'phone')
            .addSelect('account.disabledAt', 'disabledAt')
            .addSelect('a.username', 'disabledBy')
            .leftJoin(models_1.Accounts, 'a', 'a.id = account.disabled_by')
            .andWhere('account.disabled_at IS NOT NULL')
            .andWhere('account.deleted_at IS NULL')
            .andWhere('account.username ILIKE :name', { name: `%${search.trim()}%` })
            .getRawMany();
    }
    restoreDisabledAccountById(accountId, id) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const isRestored = yield this.createQueryBuilder('accounts')
                .update({
                disabledAt: null,
                disabledBy: null,
                updatedBy: accountId,
                updatedAt: new Date(),
            })
                .where('accounts.id = :id', { id: id })
                .useTransaction(true)
                .execute();
            if (isRestored.affected > 0) {
                return this.findOneOrFail({
                    where: {
                        id: id,
                    },
                });
            }
        });
    }
    deleteById(accountId, id) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const isDeleted = yield this.createQueryBuilder('accounts')
                .update({
                deletedAt: new Date(),
                deletedBy: accountId,
                disabledAt: null,
                disabledBy: null,
            })
                .where('accounts.id = :id', { id: id })
                .useTransaction(true)
                .execute();
            if (isDeleted.affected > 0) {
                return this.findOneOrFail({
                    where: {
                        id: id,
                    },
                });
            }
        });
    }
    findDeletedAccounts(search) {
        return (this.createQueryBuilder('account')
            .select('account.id', 'id')
            .addSelect('account.username', 'username')
            .addSelect('account.fullname', 'fullname')
            .addSelect('account.description', 'description')
            .addSelect('account.role_id', 'roleId')
            .addSelect('account.email', 'email')
            .addSelect('account.phone', 'phone')
            .addSelect('account.deletedAt', 'deletedAt')
            .addSelect('a.username', 'deletedBy')
            .leftJoin(models_1.Accounts, 'a', 'a.id = account.deleted_by')
            .andWhere('account.deleted_at IS NOT NULL')
            .andWhere('account.username ILIKE :name', { name: `%${search.trim()}%` })
            // .andWhere('account.deleted_at IS NULL')
            .getRawMany());
    }
    restoreDeletedAccountById(accountId, id) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const isRestored = yield this.createQueryBuilder('accounts')
                .update({
                deletedAt: null,
                deletedBy: null,
                updatedAt: new Date(),
                updatedBy: accountId,
            })
                .where('accounts.id = :id', { id: id })
                .execute();
            if (isRestored.affected > 0) {
                return this.findOneOrFail({
                    where: {
                        id: id,
                    },
                });
            }
        });
    }
    findById(id) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return this.createQueryBuilder('account')
                .select('account.id', 'id')
                .addSelect('account.username', 'username')
                .addSelect('account.description', 'description')
                .addSelect('account.fullname', 'fullname')
                .addSelect('account.createdAt', 'createdAt')
                .addSelect('account.updatedAt', 'updatedAt')
                .addSelect('account.role_id', 'roleId')
                .addSelect('account.email', 'email')
                .addSelect('account.phone', 'phone')
                .addSelect('role.name', 'role')
                .addSelect('a.username', 'createdBy')
                .addSelect('aa.username', 'updatedBy')
                .leftJoin(models_1.Accounts, 'a', 'a.id = account.created_by')
                .leftJoin(models_1.Accounts, 'aa', 'aa.id = account.updated_by')
                .innerJoin(role_entity_1.Roles, 'role', 'role.id = account.role_id')
                .where('account.disabled_at IS NULL')
                .andWhere('account.deleted_at IS NULL')
                .andWhere('account.id = :accountId', { accountId: id })
                .getRawOne();
        });
    }
    findRoleByKeycloakId(keycloakId) {
        return this.createQueryBuilder('accounts')
            .select('r.name', 'role')
            .innerJoin(role_entity_1.Roles, 'r', 'r.id = accounts.role_id')
            .where('accounts.keycloak_id = :keycloakId', { keycloakId: keycloakId })
            .getRawOne()
            .then((data) => data === null || data === void 0 ? void 0 : data.role);
    }
    findProfileInformationById(keycloakId) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return this.createQueryBuilder('a')
                .select([
                'a.id',
                'a.username',
                'a.email',
                'a.description',
                'a.phone',
                'a.created_at',
                'a.updated_at',
                'a.fullname',
                'a.avatar',
            ])
                .addSelect('r.name', 'role')
                .innerJoin(role_entity_1.Roles, 'r', 'a.role_id = r.id')
                .where('a.keycloak_id = :keycloakId', { keycloakId })
                .andWhere('a.disabled_at IS NULL')
                .andWhere('a.deleted_at IS NULL')
                .getOneOrFail();
        });
    }
    findUsernameById(id) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return this.createQueryBuilder('accounts')
                .select('accounts.username', 'username')
                .where('accounts.id = :id', { id })
                .getRawOne()
                .then((data) => data['username']);
        });
    }
    findUsername() {
        return this.createQueryBuilder('accounts')
            .select('accounts.username', 'username')
            .andWhere('accounts.disabled_at IS NULL')
            .andWhere('accounts.deleted_at IS NULL')
            .getRawMany()
            .then((data) => data.map((acc) => acc.username));
    }
};
AccountRepository = tslib_1.__decorate([
    (0, typeorm_ex_decorator_1.CustomRepository)(models_1.Accounts)
], AccountRepository);
exports.AccountRepository = AccountRepository;


/***/ }),

/***/ "./apps/backend/src/app/repositories/booking-reason-hist.repository.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.BookingReasonHistRepository = void 0;
const tslib_1 = __webpack_require__("tslib");
const typeorm_ex_decorator_1 = __webpack_require__("./apps/backend/src/app/decorators/typeorm-ex.decorator.ts");
const typeorm_1 = __webpack_require__("typeorm");
const booking_reason_hist_entity_1 = __webpack_require__("./apps/backend/src/app/models/booking-reason-hist.entity.ts");
let BookingReasonHistRepository = class BookingReasonHistRepository extends typeorm_1.Repository {
    createNew(payload) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const bookingReasonId = payload.id;
            delete payload.id;
            return this.save(Object.assign({ bookingReasonId: bookingReasonId }, payload), {
                transaction: true,
            });
        });
    }
    deleteAllHist(id) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield this.createQueryBuilder('booking_reason_hist')
                .delete()
                .where('booking_reason_hist.booking_reason_id = :id', { id: id })
                .useTransaction(true)
                .execute();
        });
    }
};
BookingReasonHistRepository = tslib_1.__decorate([
    (0, typeorm_ex_decorator_1.CustomRepository)(booking_reason_hist_entity_1.BookingReasonHist)
], BookingReasonHistRepository);
exports.BookingReasonHistRepository = BookingReasonHistRepository;


/***/ }),

/***/ "./apps/backend/src/app/repositories/booking-reason.repository.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.BookingReasonRepository = void 0;
const tslib_1 = __webpack_require__("tslib");
const typeorm_ex_decorator_1 = __webpack_require__("./apps/backend/src/app/decorators/typeorm-ex.decorator.ts");
const typeorm_1 = __webpack_require__("typeorm");
const nestjs_typeorm_paginate_1 = __webpack_require__("nestjs-typeorm-paginate");
const booking_reason_entity_1 = __webpack_require__("./apps/backend/src/app/models/booking-reason.entity.ts");
const models_1 = __webpack_require__("./apps/backend/src/app/models/index.ts");
const common_1 = __webpack_require__("@nestjs/common");
let BookingReasonRepository = class BookingReasonRepository extends typeorm_1.Repository {
    existsById(id) {
        return this.createQueryBuilder('rt')
            .select('COUNT(1)', 'count')
            .where('rt.id = :id', { id: id })
            .getRawOne()
            .then((data) => (data === null || data === void 0 ? void 0 : data.count) > 0);
    }
    findByPagination(payload) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const query = this.createQueryBuilder('br')
                .select('br.id', 'id')
                .addSelect('br.name', 'name')
                .where('br.deleted_at IS NULL')
                .andWhere('LOWER(br.name) ILIKE :search', {
                search: `%${payload.search}%`,
            })
                .orderBy(payload.sort, payload.dir);
            return (0, nestjs_typeorm_paginate_1.paginateRaw)(query, {
                limit: payload.limit,
                page: payload.page,
            });
        });
    }
    findBookingReasonName() {
        return this.createQueryBuilder('dt')
            .select('dt.id', 'id')
            .addSelect('dt.name', 'name')
            .andWhere('dt.deleted_at IS NULL')
            .getRawMany();
    }
    findById(id) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return this.createQueryBuilder('br')
                .select('br.id', 'id')
                .addSelect('br.name', 'name')
                .addSelect('br.description', 'description')
                .addSelect('br.created_at', 'createdAt')
                .addSelect('a.username', 'createdBy')
                .addSelect('br.updated_at', 'updatedAt')
                .addSelect('aa.username', 'updatedBy')
                .addSelect('br.deleted_at', 'deletedAt')
                .addSelect('aaa.username', 'deletedBy')
                .leftJoin(models_1.Accounts, 'a', 'a.id = br.created_by')
                .leftJoin(models_1.Accounts, 'aa', 'aa.id = br.updated_by')
                .leftJoin(models_1.Accounts, 'aaa', 'aaa.id = br.deleted_by')
                .where('br.id = :id', { id: id })
                .andWhere('br.deleted_at IS NULL')
                .getRawOne();
        });
    }
    createNew(accountId, payload) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.save({
                    name: payload.name.trim(),
                    description: payload.description,
                    createdAt: new Date(),
                    createdBy: accountId,
                }, {
                    transaction: true,
                });
            }
            catch (e) {
                throw new common_1.BadRequestException(e.message);
            }
        });
    }
    updateById(accountId, payload, id) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield this.save({
                id: id,
                name: payload.name,
                description: payload.description,
                updatedAt: new Date(),
                updatedBy: accountId,
            }, {
                transaction: true,
            });
        });
    }
    // async get(id: string): Promise<BookingReason> {
    //   return this.createQueryBuilder('booking-reason')
    //     .select('booking-reason.id', 'id')
    //     .addSelect('booking-reason.name', 'name')
    //     .addSelect('booking-reason.description', 'description')
    //     .addSelect('booking-reason.created_by', 'createdBy')
    //     .addSelect('booking-reason.created_at', 'createdAt')
    //     .addSelect('booking-reason.updated_by', 'updatedBy')
    //     .addSelect('booking-reason.updated_at', 'updatedAt')
    //     .addSelect('booking-reason.deleted_by', 'deletedBy')
    //     .addSelect('booking-reason.deleted_at', 'deletedAt')
    //     .where('booking-reason.id = :id', { id: id })
    //     .getRawOne<BookingReason>();
    // }
    deleteById(accountId, id) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const isDeleted = yield this.createQueryBuilder('booking_reason')
                .update({
                deletedBy: accountId,
                deletedAt: new Date(),
            })
                .where('booking_reason.id = :id', { id: id })
                .useTransaction(true)
                .execute();
            if (isDeleted.affected > 0) {
                return this.findOneOrFail({
                    where: {
                        id: id,
                    },
                });
            }
        });
    }
    findDeletedByPagination(search) {
        return this.createQueryBuilder('br')
            .select('br.id', 'id')
            .addSelect('br.name', 'name')
            .addSelect('br.deleted_at', 'deletedAt')
            .addSelect('a.username', 'deletedBy')
            .innerJoin(models_1.Accounts, 'a', 'a.id = br.deleted_by')
            .where('br.name ILIKE :search', { search: `%${search.trim()}%` })
            .andWhere('br.deleted_at IS NOT NULL')
            .orderBy('br.deleted_at', 'DESC')
            .getRawMany();
    }
    restoreDeletedById(accountId, id) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const isRestored = yield this.createQueryBuilder('booking_reason')
                .update({
                deletedBy: null,
                deletedAt: null,
                updatedBy: accountId,
                updatedAt: new Date(),
            })
                .where('booking_reason.id = :id', { id: id })
                .useTransaction(true)
                .execute();
            if (isRestored.affected > 0) {
                return this.findOneOrFail({
                    where: {
                        id: id,
                    },
                });
                ;
            }
        });
    }
    permanentlyDeleteById(id) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return this.createQueryBuilder('booking_reason')
                .delete()
                .where('booking_reason.id = :id', { id: id })
                .useTransaction(true)
                .execute();
        });
    }
};
BookingReasonRepository = tslib_1.__decorate([
    (0, typeorm_ex_decorator_1.CustomRepository)(booking_reason_entity_1.BookingReason)
], BookingReasonRepository);
exports.BookingReasonRepository = BookingReasonRepository;


/***/ }),

/***/ "./apps/backend/src/app/repositories/booking-request-hist.repository.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.BookingRequestHistRepository = void 0;
const tslib_1 = __webpack_require__("tslib");
const typeorm_ex_decorator_1 = __webpack_require__("./apps/backend/src/app/decorators/typeorm-ex.decorator.ts");
const typeorm_1 = __webpack_require__("typeorm");
const models_1 = __webpack_require__("./apps/backend/src/app/models/index.ts");
let BookingRequestHistRepository = class BookingRequestHistRepository extends typeorm_1.Repository {
    createNew(payload, queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const bookingRequestId = payload.id;
            delete payload.id;
            return yield queryRunner.manager.save(models_1.BookingRequestHist, Object.assign({ bookingRequestId: bookingRequestId }, payload));
        });
    }
};
BookingRequestHistRepository = tslib_1.__decorate([
    (0, typeorm_ex_decorator_1.CustomRepository)(models_1.BookingRequestHist)
], BookingRequestHistRepository);
exports.BookingRequestHistRepository = BookingRequestHistRepository;


/***/ }),

/***/ "./apps/backend/src/app/repositories/booking-request.repository.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.BookingRoomRepository = void 0;
const tslib_1 = __webpack_require__("tslib");
const typeorm_1 = __webpack_require__("typeorm");
const models_1 = __webpack_require__("./apps/backend/src/app/models/index.ts");
const typeorm_ex_decorator_1 = __webpack_require__("./apps/backend/src/app/decorators/typeorm-ex.decorator.ts");
const nestjs_typeorm_paginate_1 = __webpack_require__("nestjs-typeorm-paginate");
const slot_entity_1 = __webpack_require__("./apps/backend/src/app/models/slot.entity.ts");
const booking_reason_entity_1 = __webpack_require__("./apps/backend/src/app/models/booking-reason.entity.ts");
const common_1 = __webpack_require__("@nestjs/common");
let BookingRoomRepository = class BookingRoomRepository extends typeorm_1.Repository {
    findByBookingStatus(status, next5Mins) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return this.createQueryBuilder('booking_request')
                .where('booking_request.status = :status', { status: status })
                .andWhere('booking_request.requested_at < :time', { time: next5Mins })
                .getMany();
        });
    }
    findByPaginationPayload(payload) {
        const query = this.createQueryBuilder('booking_request')
            .select('booking_request.checkin_Date', 'checkinDate')
            .addSelect('booking_request.room_id', 'roomId')
            .addSelect('r.name', 'roomName')
            .addSelect('r.description', 'roomDescription')
            .addSelect('booking_request.booking_reason_id', 'reasonType')
            .addSelect('booking_request.status', 'status')
            .addSelect('booking_request.requested_at', 'bookedAt')
            .addSelect('a.username', 'requestedBy')
            .addSelect('booking_request.checkin_date', 'checkinDate')
            .addSelect('booking_request.id', 'id')
            .innerJoin(models_1.Rooms, 'r', 'r.id = booking_request.room_id')
            .innerJoin(models_1.Accounts, 'a', 'a.id = booking_request.requested_by')
            .where('r.name ILIKE :roomName', {
            roomName: `%${payload.search}%`,
        })
            .andWhere('booking_request.status LIKE :status', {
            status: `%${payload.status}%`,
        })
            .orderBy(payload.sort, payload.dir);
        if (payload.checkInAt && payload.checkInAt !== '') {
            query.andWhere('booking_request.checkedin_at >= :checkInAt', {
                checkInAt: payload.checkInAt,
            });
        }
        if (payload.checkOutAt && payload.checkOutAt !== '') {
            query.andWhere('booking_request.checkout_at >= :checkOutAt', {
                checkOutAt: payload.checkOutAt,
            });
        }
        if (payload.checkinDate && payload.checkinDate !== '') {
            query.andWhere('booking_request.checkin_date >= :checkinDate', {
                checkinDate: payload.checkinDate,
            });
        }
        if (payload.reasonType && payload.reasonType !== '') {
            query.andWhere('booking_request.booking_reason_id = :reason', {
                reason: payload.reasonType,
            });
        }
        return (0, nestjs_typeorm_paginate_1.paginateRaw)(query, {
            page: payload.page,
            limit: payload.limit,
        });
    }
    getBookingByRoomInWeek(payload) {
        const curr = new Date(payload.date); // get current date
        const firstDay = curr.getDate() - curr.getDay(); // First day is the day of the month - the day of the week
        const lastDay = firstDay + 6; // last day is the first day + 6
        const sunday = new Date(curr.setDate(firstDay));
        const satuday = new Date(curr.setDate(lastDay));
        console.log('SUNNNNN: ', sunday);
        console.log('SATTTTT: ', satuday);
        const query = this.createQueryBuilder('booking_request')
            .select('booking_request.id', 'id')
            .addSelect('booking_request.checkin_Date', 'checkinDate')
            .addSelect('booking_request.room_id', 'roomId')
            .addSelect('booking_request.status', 'status')
            .addSelect('booking_request.checkin_slot', 'checkinSlot')
            .addSelect('booking_request.checkout_slot', 'checkoutSlot')
            .addSelect('slot_in.slot_num', 'slotIn')
            .addSelect('slot_out.slot_num', 'slotOut')
            .innerJoin(slot_entity_1.Slot, 'slot_in', 'slot_in.id = booking_request.checkin_slot')
            .innerJoin(slot_entity_1.Slot, 'slot_out', 'slot_out.id = booking_request.checkout_slot')
            .andWhere('booking_request.room_id = :roomId', { roomId: payload.roomId })
            .andWhere("(booking_request.status = 'PENDING' OR booking_request.status = 'BOOKED')");
        // .andWhere("booking_request.status LIKE 'PENDING'");
        if (payload.date && payload.date !== '') {
            query.andWhere('booking_request.checkin_date >= :sunday', {
                sunday: sunday,
            });
            query.andWhere('booking_request.checkin_date <= :satuday', {
                satuday: satuday,
            });
        }
        return query.getRawMany();
    }
    getBookingPendingByRoomInDay(roomId, requestId, date) {
        const query = this.createQueryBuilder('booking_request')
            .select('booking_request.id', 'id')
            .addSelect('slot_in.slot_num', 'slotIn')
            .addSelect('slot_out.slot_num', 'slotOut')
            .addSelect('slot_in.name', 'slotInName')
            .addSelect('slot_out.name', 'slotOutName')
            .addSelect('a.username', 'requestedBy')
            .addSelect('r.name', 'reason')
            .addSelect('booking_request.status', 'status')
            .innerJoin(slot_entity_1.Slot, 'slot_in', 'slot_in.id = booking_request.checkin_slot')
            .innerJoin(models_1.Accounts, 'a', 'a.id = booking_request.requested_by')
            .innerJoin(booking_reason_entity_1.BookingReason, 'r', 'r.id = booking_request.booking_reason_id')
            .innerJoin(slot_entity_1.Slot, 'slot_out', 'slot_out.id = booking_request.checkout_slot')
            .where('booking_request.checkinDate = :checkinDate', {
            checkinDate: date,
        })
            .andWhere('booking_request.room_id = :roomId', {
            roomId: roomId,
        })
            .andWhere('booking_request.id != :id', {
            id: requestId,
        })
            .andWhere("(booking_request.status = 'PENDING')");
        return query.getRawMany();
    }
    getBookingPendingAndBookedByDay(date) {
        const query = this.createQueryBuilder('booking_request')
            .select('booking_request.id', 'id')
            .addSelect('slot_in.slot_num', 'slotIn')
            .addSelect('slot_out.slot_num', 'slotOut')
            .addSelect('booking_request.status', 'status')
            .innerJoin(slot_entity_1.Slot, 'slot_in', 'slot_in.id = booking_request.checkin_slot')
            .innerJoin(slot_entity_1.Slot, 'slot_out', 'slot_out.id = booking_request.checkout_slot')
            .where('booking_request.checkinDate = :checkinDate', {
            checkinDate: date,
        })
            .andWhere("(booking_request.status = 'PENDING' OR booking_request.status = 'BOOKED')");
        return query.getRawMany();
    }
    getTotalRowCount() {
        return;
    }
    findByCurrentBookingListAndAccountId(accountId) {
        return this.createQueryBuilder('booking_request')
            .select('booking_request.checkin_date', 'checkinDate')
            .addSelect('booking_request.requested_at', 'bookedAt')
            .addSelect('booking_request.status', 'status')
            .addSelect('r.name', 'roomName')
            .addSelect('booking_request.id', 'id')
            .addSelect('booking_request.requested_at', 'requestedAt')
            .addSelect('booking_request.checkedin_at', 'checkinAt')
            .innerJoin(models_1.Rooms, 'r', 'r.id = booking_request.room_id')
            .where('booking_request.requested_by = :accountId', {
            accountId: accountId,
        })
            .andWhere(`booking_request.status IN ('BOOKING', 'BOOKED', 'CHECKED_IN')`)
            .getRawMany();
    }
    findByIdAndAccountId(accountId, id) {
        return this.createQueryBuilder('booking_request')
            .select('booking_request.id', 'id')
            .addSelect('booking_request.status', 'status')
            .addSelect('booking_request.checkin_Date', 'checkinDate')
            .addSelect('booking_request.booking_reason_id', 'reasonType')
            .addSelect('booking_request.description', 'description')
            .addSelect('booking_request.requested_at', 'requestedAt')
            .addSelect('booking_request.requested_by', 'requestedBy')
            .addSelect('booking_request.updated_at', 'updatedAt')
            .addSelect('booking_request.requested_at', 'bookedAt')
            .addSelect('r.type', 'roomType')
            .addSelect('r.id', 'roomId')
            .addSelect('r.name', 'roomName')
            .innerJoin(models_1.Rooms, 'r', 'r.id = booking_request.room_id')
            .innerJoin(models_1.Accounts, 'a', 'a.id = booking_request.requested_by')
            .where('booking_request.requested_by = :accountId', {
            accountId: accountId,
        })
            .andWhere('booking_request.id = :id', { id: id })
            .getRawOne();
    }
    getRequestBookingByRoomId(roomId) {
        return this.createQueryBuilder(`booking_request`)
            .select('booking_request.id', 'id')
            .addSelect('r.name', 'roomName')
            .addSelect('a.username', 'requestedBy')
            .addSelect('booking_request.checkin_Date', 'checkinDate')
            .innerJoin(models_1.Rooms, 'r', 'r.id = booking_request.room_id')
            .innerJoin(models_1.Accounts, 'a', 'a.id = booking_request.requested_by')
            .where(`booking_request.status = :status`, { status: 'BOOKING' })
            .andWhere('booking_request.room_id = :room_id', { room_id: roomId })
            .orderBy('booking_request.checkin_date', 'ASC')
            .getRawMany();
    }
    getRequestBookingByAccountId(accountId) {
        return this.createQueryBuilder(`booking_request`)
            .select('booking_request.id', 'id')
            .addSelect('r.name', 'roomName')
            .addSelect('a.username', 'requestedBy')
            .addSelect('booking_request.checkin_Date', 'checkinDate')
            .innerJoin(models_1.Rooms, 'r', 'r.id = booking_request.room_id')
            .innerJoin(models_1.Accounts, 'a', 'a.id = booking_request.requested_by')
            .where(`booking_request.status = :status`, { status: 'BOOKING' })
            .andWhere('booking_request.requested_by = :account_id', {
            account_id: accountId,
        })
            .orderBy('booking_request.checkin_date', 'ASC')
            .getRawMany();
    }
    existsById(id) {
        return this.createQueryBuilder('booking_request')
            .select('COUNT(1)', 'count')
            .where('booking_request.id = :id', { id: id })
            .getRawOne()
            .then((data) => (data === null || data === void 0 ? void 0 : data.count) > 0);
    }
    isAcceptById(id) {
        return this.createQueryBuilder('booking_request')
            .select('COUNT(1)', 'count')
            .where('booking_request.id = :id', { id: id })
            .andWhere("booking_request.status = 'BOOKED'")
            .getRawOne()
            .then((data) => (data === null || data === void 0 ? void 0 : data.count) > 0);
    }
    isCancelledById(id) {
        return this.createQueryBuilder('booking_request')
            .select('COUNT(1)', 'count')
            .where('booking_request.id = :id', { id: id })
            .andWhere("booking_request.status = 'CANCELLED'")
            .getRawOne()
            .then((data) => (data === null || data === void 0 ? void 0 : data.count) > 0);
    }
    getCountRequestBookingPending() {
        return this.createQueryBuilder('booking_request')
            .select('COUNT(1)', 'count')
            .where("booking_request.status = 'PENDING'")
            .getRawOne();
    }
    findById(id) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return this.createQueryBuilder('br')
                .select('br.id', 'id')
                .addSelect('r.id', 'roomId')
                .addSelect('r.name', 'roomName')
                .addSelect('r.description', 'roomDescription')
                .addSelect('br.checkin_Date', 'checkinDate')
                .addSelect('br.status', 'status')
                .addSelect('br.booking_reason_id', 'reasonType')
                .addSelect('br.description', 'description')
                .addSelect('br.checkedin_at', 'checkinAt')
                .addSelect('bkr.name', 'reason')
                .addSelect('br.requested_at', 'requestedAt')
                .addSelect('br.requested_by', 'requestedById')
                .addSelect('a.username', 'requestedBy')
                .addSelect('br.updated_at', 'updatedAt')
                .addSelect('aa.username', 'updatedBy')
                .addSelect('br.cancelled_at', 'cancelledAt')
                .addSelect('aaa.username', 'cancelledBy')
                .addSelect('aaaa.username', 'acceptedBy')
                .addSelect('br.accepted_at', 'acceptedAt')
                .addSelect('s.name', 'checkinSlot')
                .addSelect('ss.name', 'checkoutSlot')
                .addSelect('br.checkin_slot', 'checkinSlotId')
                .addSelect('br.checkout_slot', 'checkoutSlotId')
                .innerJoin(models_1.Rooms, 'r', 'r.id = br.room_id')
                .innerJoin(models_1.Accounts, 'a', 'a.id = br.requested_by')
                .leftJoin(models_1.Accounts, 'aa', 'aa.id = br.updated_by')
                .leftJoin(models_1.Accounts, 'aaa', 'aaa.id = br.cancelled_by')
                .leftJoin(models_1.Accounts, 'aaaa', 'aaaa.id = br.accepted_by')
                .leftJoin(slot_entity_1.Slot, 's', 's.id = br.checkin_slot')
                .leftJoin(slot_entity_1.Slot, 'ss', 'ss.id = br.checkout_slot')
                .innerJoin(booking_reason_entity_1.BookingReason, 'bkr', 'bkr.id = br.booking_reason_id')
                .where('br.id = :id', { id: id })
                .getRawOne();
        });
    }
    createNewRequest(payload, userId, status, queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield queryRunner.manager.save(models_1.BookingRequest, {
                roomId: payload.roomId,
                requestedBy: userId,
                requestedAt: new Date(),
                status: status,
                bookingReasonId: payload.bookingReasonId,
                description: payload.description,
                checkinSlot: payload.checkinSlot,
                checkoutSlot: payload.checkoutSlot,
                checkinDate: payload.checkinDate,
            });
        });
    }
    cancelRoomBookingById(accountId, id, role, queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const oldData = yield this.findOneOrFail({
                where: {
                    id: id,
                },
            });
            if (oldData.requestedBy === accountId ||
                role === 'Librarian' ||
                role === 'System Admin') {
                return yield queryRunner.manager.save(models_1.BookingRequest, Object.assign(Object.assign({}, oldData), { status: 'CANCELLED', updatedBy: accountId, updatedAt: new Date(), cancelledBy: accountId, cancelledAt: new Date() }), {
                    transaction: true,
                });
            }
            else {
                throw new common_1.BadRequestException("You are not allowed to cancel someone else's request");
            }
        });
    }
    // createNewBooking(payload: BookingRequestAddRequestPayload, userId: string) {
    //   if (!payload.checkoutDate || payload.checkoutDate === payload.checkinDate) {
    //     return this.save(
    //       {
    //         roomId: payload.roomId,
    //         requestedBy: userId,
    //         requestedAt: new Date(),
    //         checkinDate: payload.checkinDate,
    //         checkoutDate: payload.checkoutDate,
    //         checkinSlot: payload.checkinSlot,
    //         checkoutSlot: payload.checkoutSlot,
    //         status: 'BOOKED',
    //         description: payload.description,
    //         bookingReasonId: payload.bookingReasonId,
    //       },
    //       {
    //         transaction: true,
    //       }
    //     );
    //   }
    // }
    acceptById(accountId, roomId, queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const oldData = yield this.findOneOrFail({
                where: {
                    id: roomId,
                },
            });
            return yield queryRunner.manager.save(models_1.BookingRequest, Object.assign(Object.assign({}, oldData), { status: 'BOOKED', updatedBy: accountId, updatedAt: new Date(), acceptedBy: accountId, acceptedAt: new Date() }), {
                transaction: true,
            });
        });
    }
    rejectById(accountId, roomId, queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const oldData = yield this.findOneOrFail({
                where: {
                    id: roomId,
                },
            });
            return yield queryRunner.manager.save(models_1.BookingRequest, Object.assign(Object.assign({}, oldData), { status: 'CANCELLED', updatedBy: accountId, updatedAt: new Date(), cancelledBy: accountId, cancelledAt: new Date() }), {
                transaction: true,
            });
        });
    }
};
BookingRoomRepository = tslib_1.__decorate([
    (0, typeorm_ex_decorator_1.CustomRepository)(models_1.BookingRequest)
], BookingRoomRepository);
exports.BookingRoomRepository = BookingRoomRepository;


/***/ }),

/***/ "./apps/backend/src/app/repositories/device-hist.repository.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.DeviceHistRepository = void 0;
const tslib_1 = __webpack_require__("tslib");
const typeorm_1 = __webpack_require__("typeorm");
const models_1 = __webpack_require__("./apps/backend/src/app/models/index.ts");
const typeorm_ex_decorator_1 = __webpack_require__("./apps/backend/src/app/decorators/typeorm-ex.decorator.ts");
let DeviceHistRepository = class DeviceHistRepository extends typeorm_1.Repository {
    createNew(payload) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const deviceId = payload.id;
            delete payload.id;
            return this.save(Object.assign({ deviceId: deviceId, type: payload.type }, payload));
        });
    }
};
DeviceHistRepository = tslib_1.__decorate([
    (0, typeorm_ex_decorator_1.CustomRepository)(models_1.DeviceHist)
], DeviceHistRepository);
exports.DeviceHistRepository = DeviceHistRepository;


/***/ }),

/***/ "./apps/backend/src/app/repositories/device-type-hist.repository.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.DeviceTypeHistRepository = void 0;
const tslib_1 = __webpack_require__("tslib");
const typeorm_ex_decorator_1 = __webpack_require__("./apps/backend/src/app/decorators/typeorm-ex.decorator.ts");
const typeorm_1 = __webpack_require__("typeorm");
const models_1 = __webpack_require__("./apps/backend/src/app/models/index.ts");
let DeviceTypeHistRepository = class DeviceTypeHistRepository extends typeorm_1.Repository {
    createNew(payload) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const deviceTypeId = payload.id;
            delete payload.id;
            const data = yield this.save(Object.assign({ deviceTypeId: deviceTypeId }, payload));
            console.log("AAAAAAAAAAAA: ", data);
            return data;
        });
    }
    deleteAllHist(id) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield this.createQueryBuilder('device_type_hist')
                .delete()
                .where('device_type_hist.device_type_id = :id', { id: id })
                .useTransaction(true)
                .execute();
        });
    }
};
DeviceTypeHistRepository = tslib_1.__decorate([
    (0, typeorm_ex_decorator_1.CustomRepository)(models_1.DeviceTypeHist)
], DeviceTypeHistRepository);
exports.DeviceTypeHistRepository = DeviceTypeHistRepository;


/***/ }),

/***/ "./apps/backend/src/app/repositories/device-type.repository.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.DeviceTypeRepository = void 0;
const tslib_1 = __webpack_require__("tslib");
const typeorm_1 = __webpack_require__("typeorm");
const typeorm_ex_decorator_1 = __webpack_require__("./apps/backend/src/app/decorators/typeorm-ex.decorator.ts");
const device_type_entity_1 = __webpack_require__("./apps/backend/src/app/models/device-type.entity.ts");
const nestjs_typeorm_paginate_1 = __webpack_require__("nestjs-typeorm-paginate");
const models_1 = __webpack_require__("./apps/backend/src/app/models/index.ts");
let DeviceTypeRepository = class DeviceTypeRepository extends typeorm_1.Repository {
    existsById(id) {
        return this.createQueryBuilder('rt')
            .select('COUNT(1)', 'count')
            .where('rt.id = :id', { id: id })
            .getRawOne()
            .then((data) => (data === null || data === void 0 ? void 0 : data.count) > 0);
    }
    findByPagination(pagination) {
        const query = this.createQueryBuilder('dt')
            .select('dt.id', 'id')
            .addSelect('dt.name', 'name')
            .where('dt.deleted_at IS NULL')
            .andWhere('LOWER(dt.name) LIKE LOWER(:search)', {
            search: `%${pagination.search.trim()}%`,
        })
            .orderBy(pagination.sort, pagination.dir);
        return (0, nestjs_typeorm_paginate_1.paginateRaw)(query, {
            page: pagination.page,
            limit: pagination.limit,
        });
    }
    findDeviceTypeName() {
        return this.createQueryBuilder('dt')
            .select('dt.id', 'id')
            .addSelect('dt.name', 'name')
            .andWhere('dt.deleted_at IS NULL')
            .getRawMany();
    }
    findById(id) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return this.createQueryBuilder('dt')
                .select('dt.id', 'id')
                .addSelect('dt.name', 'name')
                .addSelect('dt.description', 'description')
                .addSelect('a.username', 'createdBy')
                .addSelect('dt.created_at', 'createdAt')
                .addSelect('aa.username', 'updatedBy')
                .addSelect('dt.updated_at', 'updatedAt')
                .innerJoin(models_1.Accounts, 'a', 'a.id = dt.created_by')
                .leftJoin(models_1.Accounts, 'aa', 'aa.id = dt.updated_by')
                .where('dt.id = :id', { id: id })
                .andWhere('dt.deleted_at IS NULL')
                .getRawOne();
        });
    }
    addNew(accountId, payload) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return this.save({
                name: payload.name.trim(),
                description: payload.description,
                createdBy: accountId,
                createdAt: new Date(),
            }, {
                transaction: true,
            });
        });
    }
    updateById(accountId, deviceTypeId, payload) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const oldData = yield this.findOneOrFail({
                where: {
                    id: deviceTypeId,
                }
            });
            return this.save(Object.assign(Object.assign({}, oldData), { id: deviceTypeId, name: payload.name.trim(), description: payload.description, updatedBy: accountId, updatedAt: new Date() }), {
                transaction: true,
            });
        });
    }
    deleteById(accountId, id) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const isDeleted = yield this.createQueryBuilder('device_type')
                .update({
                deletedAt: new Date(),
                deletedBy: accountId,
            })
                .where('device_type.id = :id', { id: id })
                .useTransaction(true)
                .execute();
            if (isDeleted.affected > 0) {
                return this.findOneOrFail({
                    where: {
                        id: id,
                    },
                });
            }
        });
    }
    findDeletedByPagination(search) {
        return this.createQueryBuilder('device_type')
            .select('device_type.id', 'id')
            .addSelect('device_type.name', 'name')
            .addSelect('device_type.deleted_at', 'deletedAt')
            .addSelect('a.username', 'deletedBy')
            .innerJoin(models_1.Accounts, 'a', 'a.id = device_type.deleted_by')
            .where('device_type.name ILIKE :search', { search: `%${search.trim()}%` })
            .andWhere('device_type.deleted_at IS NOT NULL')
            .orderBy('device_type.deleted_at', 'DESC')
            .getRawMany();
    }
    restoreDeletedById(accountId, id) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const isRestored = yield this.createQueryBuilder('device_type')
                .update({
                updatedAt: new Date(),
                updatedBy: accountId,
                deletedAt: null,
                deletedBy: null,
            })
                .where('device_type.id = :id', { id: id })
                .useTransaction(true)
                .execute();
            if (isRestored.affected > 0) {
                return this.findOneOrFail({
                    where: {
                        id: id,
                    },
                });
            }
        });
    }
    permanentlyDeleteById(id) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return this.createQueryBuilder('device_type')
                .delete()
                .where('device_type.id = :id', { id: id })
                .useTransaction(true)
                .execute();
        });
    }
};
DeviceTypeRepository = tslib_1.__decorate([
    (0, typeorm_ex_decorator_1.CustomRepository)(device_type_entity_1.DeviceType)
], DeviceTypeRepository);
exports.DeviceTypeRepository = DeviceTypeRepository;


/***/ }),

/***/ "./apps/backend/src/app/repositories/devices.repository.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.DevicesRepository = void 0;
const tslib_1 = __webpack_require__("tslib");
const typeorm_1 = __webpack_require__("typeorm");
const models_1 = __webpack_require__("./apps/backend/src/app/models/index.ts");
const typeorm_ex_decorator_1 = __webpack_require__("./apps/backend/src/app/decorators/typeorm-ex.decorator.ts");
const nestjs_typeorm_paginate_1 = __webpack_require__("nestjs-typeorm-paginate");
const device_type_entity_1 = __webpack_require__("./apps/backend/src/app/models/device-type.entity.ts");
let DevicesRepository = class DevicesRepository extends typeorm_1.Repository {
    existsById(id) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return this.createQueryBuilder('devices')
                .select('COUNT(1)', 'count')
                .where('devices.id = :id', { id: id })
                .getRawOne()
                .then((data) => (data === null || data === void 0 ? void 0 : data.count) > 0);
        });
    }
    getSize() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const result = yield this.createQueryBuilder(`devices`)
                .select(`COUNT(id) as size`)
                .where(`devices.disabled_at IS NULL`)
                .andWhere(`devices.deleted_at IS NULL`)
                .getRawOne();
            return result.size;
        });
    }
    isExistedByName(name) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return this.createQueryBuilder('devices')
                .select('COUNT(devices.name)')
                .where('devices.name = :name', { name })
                .getRawOne()
                .then((data) => data['count'] > 0);
        });
    }
    searchDevices(payload) {
        const query = this.createQueryBuilder('d')
            .select('d.id', 'id')
            .addSelect('d.name', 'name')
            .addSelect('d.description', 'description')
            .addSelect('d.createdAt', 'createdAt')
            .addSelect('d.updatedAt', 'updatedAt')
            .addSelect('dt.name', 'type')
            .innerJoin(device_type_entity_1.DeviceType, 'dt', 'dt.id = d.type')
            .where('LOWER(d.name) ILIKE LOWER(:search)', {
            search: `%${payload.search.trim()}%`,
        })
            .andWhere(`d.deleted_at IS NULL`)
            .andWhere(`d.disabled_at IS NULL`)
            .orderBy(payload.sort, payload.dir);
        if (payload.deviceType && payload.deviceType !== '') {
            query.andWhere('dt.name = :deviceTypeName', {
                deviceTypeName: payload.deviceType,
            });
        }
        return (0, nestjs_typeorm_paginate_1.paginateRaw)(query, {
            limit: payload.limit,
            page: payload.page,
        });
    }
    findDeviceName() {
        return this.createQueryBuilder('device')
            .select('device.id', 'id')
            .addSelect('device.name', 'name')
            .andWhere('device.deleted_at IS NULL')
            .getRawMany();
    }
    getDevicesByDeviceType(deviceTypeId) {
        return this.createQueryBuilder(`device`)
            .select('device.id', 'id')
            .addSelect('device.name', 'name')
            .addSelect('device.type', 'type')
            .addSelect('dt.name', 'deviceTypeName')
            .innerJoin(device_type_entity_1.DeviceType, 'dt', 'dt.id = device.type')
            .where(`device.deleted_at IS NULL`)
            .andWhere(`device.disabled_at IS NULL`)
            .andWhere('device.type = :type', { type: deviceTypeId })
            .getRawMany();
    }
    findById(id) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return this.createQueryBuilder('devices')
                .select('devices.id', 'id')
                .addSelect('devices.name', 'name')
                .addSelect('devices.description', 'description')
                .addSelect('devices.created_at', 'createdAt')
                .addSelect('devices.updated_at', 'updatedAt')
                .addSelect('devices.disabled_at', 'disableAt')
                .addSelect('devices.deleted_at', 'deletedAt')
                .addSelect('devices.disabled_by', 'disabledBy')
                .addSelect('devices.deleted_by', 'deletedBy')
                .addSelect('devices.type', 'deviceTypeId')
                .addSelect('dt.name', 'deviceTypeName')
                .addSelect('a.username', 'createdBy')
                .addSelect('aa.username', 'updatedBy')
                .innerJoin(models_1.Accounts, 'a', 'devices.created_by = a.id')
                .leftJoin(models_1.Accounts, 'aa', 'devices.updated_by = aa.id')
                .innerJoin(device_type_entity_1.DeviceType, 'dt', 'dt.id = devices.type')
                .where('devices.disabled_at IS NULL')
                .andWhere('devices.deleted_at IS NULL')
                .andWhere('devices.id = :deviceId', { deviceId: id })
                .getRawOne();
        });
    }
    createNewDevice(payload, userId) {
        return this.save({
            name: payload.name.trim(),
            description: payload.description,
            type: payload.type,
            createdBy: userId,
            createdAt: new Date(),
        }, {
            transaction: true,
        });
    }
    updateById(accountId, deviceId, payload) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const oldData = yield this.findOneOrFail({
                where: {
                    id: deviceId,
                },
            });
            return this.save(Object.assign(Object.assign({}, oldData), { id: deviceId, name: payload.name.trim(), description: payload.description, type: payload.type, updatedBy: accountId, updatedAt: new Date() }), {
                transaction: true,
            });
        });
    }
    checkIfDeviceIsDeletedById(id) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return this.createQueryBuilder('devices')
                .select('devices.deleted_at')
                .where('devices.id = :id', { id: id })
                .getRawOne()
                .then((data) => (data ? data['deleted_at'] : true));
        });
    }
    checkIfDeviceIsDisabledById(id) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return this.createQueryBuilder('devices')
                .select('devices.disabled_at')
                .where('devices.id = :id', { id: id })
                .getRawOne()
                .then((data) => (data ? data['disabled_at'] : true));
        });
    }
    disableById(accountId, id) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const isDisabled = yield this.createQueryBuilder('rooms')
                .update({
                disabledBy: accountId,
                disabledAt: new Date(),
            })
                .where('devices.id = :id', { id: id })
                .useTransaction(true)
                .execute();
            if (isDisabled.affected > 0) {
                return this.findOneOrFail({
                    where: {
                        id: id,
                    },
                });
            }
        });
    }
    getDisabledDevices(search) {
        return this.createQueryBuilder('devices')
            .select('devices.id', 'id')
            .addSelect('devices.name', 'name')
            .addSelect('devices.disabled_at', 'disabledAt')
            .addSelect('a.username', 'disabledBy')
            .addSelect('dt.name', 'roomTypeName')
            .innerJoin(models_1.Accounts, 'a', 'devices.disabled_by = a.id')
            .innerJoin(device_type_entity_1.DeviceType, 'dt', 'devices.type = dt.id')
            .where(`devices.deleted_at IS NULL`)
            .andWhere(`devices.disabled_at IS NOT NULL`)
            .andWhere('devices.name ILIKE :search', { search: `%${search.trim()}%` })
            .getRawMany();
    }
    restoreDisabledDeviceById(accountId, id) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const isRestored = yield this.createQueryBuilder('devices')
                .update({
                disabledAt: null,
                disabledBy: null,
                updatedAt: new Date(),
                updatedBy: accountId,
            })
                .where('devices.id = :id', { id: id })
                .useTransaction(true)
                .execute();
            if (isRestored.affected > 0) {
                return this.findOneOrFail({
                    where: {
                        id: id,
                    },
                });
            }
        });
    }
    deleteById(accountId, id) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const isDeleted = yield this.createQueryBuilder('devices')
                .update({
                deletedAt: new Date(),
                deletedBy: accountId,
                disabledAt: null,
                disabledBy: null,
            })
                .where('devices.id = :id', { id: id })
                .useTransaction(true)
                .execute();
            if (isDeleted.affected > 0) {
                return this.findOneOrFail({
                    where: {
                        id: id,
                    },
                });
            }
        });
    }
    getDeletedDevices(search) {
        return this.createQueryBuilder(`devices`)
            .select('devices.id', 'id')
            .addSelect('devices.name', 'name')
            .addSelect('devices.deleted_at', 'deletedAt')
            .addSelect('a.username', 'deletedBy')
            .addSelect('dt.name', 'deviceTypeName')
            .innerJoin(models_1.Accounts, 'a', 'devices.deleted_by = a.id')
            .innerJoin(device_type_entity_1.DeviceType, 'dt', 'dt.id = devices.type')
            .where(`devices.deleted_at IS NOT NULL`)
            .andWhere(`devices.disabled_at IS NULL`)
            .andWhere('devices.name ILIKE :name', { name: `%${search.trim()}%` })
            .getRawMany();
    }
    restoreDeletedDeviceById(id) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const isRestored = yield this.createQueryBuilder('devices')
                .update({
                deletedBy: null,
                deletedAt: null,
            })
                .where('devices.id = :id', { id: id })
                .useTransaction(true)
                .execute();
            if (isRestored.affected > 0) {
                return this.findOneOrFail({
                    where: {
                        id: id,
                    },
                });
            }
        });
    }
    findDeviceListByBookingRoomRequest(name, type, sort) {
        return this.createQueryBuilder('devices')
            .select(['devices.id', 'devices.name'])
            .where('devices.disabled_at IS NULL')
            .andWhere('devices.deleted_at IS NULL')
            .andWhere('devices.name LIKE :name', { name: `%${name}%` })
            .orderBy('devices.name', sort)
            .getMany();
    }
};
DevicesRepository = tslib_1.__decorate([
    (0, typeorm_ex_decorator_1.CustomRepository)(models_1.Devices)
], DevicesRepository);
exports.DevicesRepository = DevicesRepository;


/***/ }),

/***/ "./apps/backend/src/app/repositories/index.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__("tslib");
tslib_1.__exportStar(__webpack_require__("./apps/backend/src/app/repositories/account.repository.ts"), exports);
tslib_1.__exportStar(__webpack_require__("./apps/backend/src/app/repositories/booking-request.repository.ts"), exports);
tslib_1.__exportStar(__webpack_require__("./apps/backend/src/app/repositories/devices.repository.ts"), exports);
tslib_1.__exportStar(__webpack_require__("./apps/backend/src/app/repositories/device-hist.repository.ts"), exports);
tslib_1.__exportStar(__webpack_require__("./apps/backend/src/app/repositories/room-wishlist.repository.ts"), exports);
tslib_1.__exportStar(__webpack_require__("./apps/backend/src/app/repositories/rooms.repository.ts"), exports);
tslib_1.__exportStar(__webpack_require__("./apps/backend/src/app/repositories/users-otp.repository.ts"), exports);
tslib_1.__exportStar(__webpack_require__("./apps/backend/src/app/repositories/users-warning-flag.ts"), exports);
tslib_1.__exportStar(__webpack_require__("./apps/backend/src/app/repositories/users-warning-flag-history.ts"), exports);


/***/ }),

/***/ "./apps/backend/src/app/repositories/role-hist.repository.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.RoleHistRepository = void 0;
const tslib_1 = __webpack_require__("tslib");
const typeorm_1 = __webpack_require__("typeorm");
const typeorm_ex_decorator_1 = __webpack_require__("./apps/backend/src/app/decorators/typeorm-ex.decorator.ts");
const role_hist_entity_1 = __webpack_require__("./apps/backend/src/app/models/role-hist.entity.ts");
let RoleHistRepository = class RoleHistRepository extends typeorm_1.Repository {
    createNew(payload) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const roleId = payload.id;
            delete payload.id;
            return this.save(Object.assign({ roleId: roleId }, payload));
        });
    }
    deleteAllHist(id) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield this.createQueryBuilder('role_hist')
                .delete()
                .where('role_hist.role_id = :id', { id: id })
                .useTransaction(true)
                .execute();
        });
    }
};
RoleHistRepository = tslib_1.__decorate([
    (0, typeorm_ex_decorator_1.CustomRepository)(role_hist_entity_1.RoleHist)
], RoleHistRepository);
exports.RoleHistRepository = RoleHistRepository;


/***/ }),

/***/ "./apps/backend/src/app/repositories/roles.repository.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.RolesRepository = void 0;
const tslib_1 = __webpack_require__("tslib");
const typeorm_ex_decorator_1 = __webpack_require__("./apps/backend/src/app/decorators/typeorm-ex.decorator.ts");
const role_entity_1 = __webpack_require__("./apps/backend/src/app/models/role.entity.ts");
const typeorm_1 = __webpack_require__("typeorm");
const models_1 = __webpack_require__("./apps/backend/src/app/models/index.ts");
const nestjs_typeorm_paginate_1 = __webpack_require__("nestjs-typeorm-paginate");
let RolesRepository = class RolesRepository extends typeorm_1.Repository {
    existsById(id) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return this.createQueryBuilder('r')
                .select('COUNT(1)', 'count')
                .where('r.id = :id', { id: id })
                .getRawOne()
                .then((data) => (data === null || data === void 0 ? void 0 : data.count) > 0);
        });
    }
    isExistedByName(name) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return this.createQueryBuilder('rooms')
                .select('COUNT(rooms.name)')
                .where('rooms.name = :name', { name })
                .getRawOne()
                .then((data) => data['count'] > 0);
        });
    }
    findByPagination(pagination) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const query = this.createQueryBuilder('r')
                .select('r.id', 'id')
                .addSelect('r.name', 'name')
                .addSelect('r.description', 'description')
                .where('r.deleted_at IS NULL')
                .andWhere('r.name ILIKE :search', {
                search: `%${pagination.search.trim()}%`,
            })
                .orderBy(pagination.sort, pagination.dir);
            return (0, nestjs_typeorm_paginate_1.paginateRaw)(query, {
                limit: pagination.limit,
                page: pagination.page,
            });
        });
    }
    findRoleName() {
        return this.createQueryBuilder('roles')
            .select('roles.id', 'id')
            .addSelect('roles.name', 'name')
            .andWhere("roles.deleted_at IS NULL")
            .getRawMany();
    }
    findById(id) {
        return this.createQueryBuilder('r')
            .select('r.id', 'id')
            .addSelect('r.name', 'name')
            .addSelect('r.description', 'description')
            .addSelect('r.created_at', 'createdAt')
            .addSelect('r.updated_at', 'updatedAt')
            .addSelect('a.username', 'createdBy')
            .addSelect('aa.username', 'updatedBy')
            .innerJoin(models_1.Accounts, 'a', 'a.id = r.created_by')
            .leftJoin(models_1.Accounts, 'aa', 'aa.id = r.updated_by')
            .where('r.id = :id', { id: id })
            .andWhere('r.deleted_at IS NULL')
            .getRawOne();
    }
    // async get(id: string): Promise<Roles> {
    //   return this.createQueryBuilder('roles')
    //     .select('roles.id', 'id')
    //     .addSelect('roles.name', 'name')
    //     .addSelect('roles.description', 'description')
    //     .addSelect('roles.created_by', 'createdBy')
    //     .addSelect('roles.created_at', 'createdAt')
    //     .addSelect('roles.updated_by', 'updatedBy')
    //     .addSelect('roles.updated_at', 'updatedAt')
    //     .addSelect('roles.deleted_by', 'deletedBy')
    //     .addSelect('roles.deleted_at', 'deletedAt')
    //     .where('roles.id = :id', { id: id })
    //     .getRawOne<Roles>();
    // }
    addNew(accountId, payload) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return this.save({
                name: payload.name.trim(),
                description: payload.description,
                createdBy: accountId,
                createdAt: new Date(),
            }, {
                transaction: true,
            });
        });
    }
    updateById(id, accountId, payload) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const oldData = yield this.findOneOrFail({
                where: {
                    id: id,
                }
            });
            return this.save(Object.assign(Object.assign({}, oldData), { id: id, name: payload.name.trim(), description: payload.description, updatedBy: accountId, updatedAt: new Date() }), {
                transaction: true,
            });
        });
    }
    deleteById(accountId, id) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const isDeleted = yield this.createQueryBuilder('role')
                .update({
                deletedAt: new Date(),
                deletedBy: accountId,
                updatedAt: new Date(),
                updatedBy: accountId,
            })
                .where('role.id = :id', { id: id })
                .useTransaction(true)
                .execute();
            if (isDeleted.affected > 0) {
                return this.findOneOrFail({
                    where: {
                        id: id,
                    },
                });
            }
        });
    }
    getDeletedRoles(search) {
        return this.createQueryBuilder('role')
            .select('role.id', 'id')
            .addSelect('role.name', 'name')
            .addSelect('role.deleted_at', 'deletedAt')
            .addSelect('a.username', 'deletedBy')
            .innerJoin(models_1.Accounts, 'a', 'a.id = role.deleted_by')
            .where('role.name ILIKE :search', { search: `%${search.trim()}%` })
            .andWhere('role.deleted_at IS NOT NULL')
            .orderBy('role.deleted_at', 'DESC')
            .getRawMany();
    }
    restoreDeletedById(accountId, id) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const isRestored = yield this.createQueryBuilder('role')
                .update({
                updatedAt: new Date(),
                updatedBy: accountId,
                deletedAt: null,
                deletedBy: null,
            })
                .where('role.id = :id', { id: id })
                .useTransaction(true)
                .execute();
            if (isRestored.affected > 0) {
                return this.findOneOrFail({
                    where: {
                        id: id,
                    },
                });
            }
        });
    }
    permanentlyDeleteById(id) {
        return this.createQueryBuilder('role')
            .delete()
            .where('role.id = :id', { id: id })
            .useTransaction(true)
            .execute();
    }
};
RolesRepository = tslib_1.__decorate([
    (0, typeorm_ex_decorator_1.CustomRepository)(role_entity_1.Roles)
], RolesRepository);
exports.RolesRepository = RolesRepository;


/***/ }),

/***/ "./apps/backend/src/app/repositories/room-hist.repository.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.RoomHistRepository = void 0;
const tslib_1 = __webpack_require__("tslib");
const typeorm_ex_decorator_1 = __webpack_require__("./apps/backend/src/app/decorators/typeorm-ex.decorator.ts");
const typeorm_1 = __webpack_require__("typeorm");
const models_1 = __webpack_require__("./apps/backend/src/app/models/index.ts");
let RoomHistRepository = class RoomHistRepository extends typeorm_1.Repository {
    createNew(payload) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const roomId = payload.id;
            delete payload.id;
            return this.save(Object.assign({ roomId: roomId }, payload));
        });
    }
};
RoomHistRepository = tslib_1.__decorate([
    (0, typeorm_ex_decorator_1.CustomRepository)(models_1.RoomHist)
], RoomHistRepository);
exports.RoomHistRepository = RoomHistRepository;


/***/ }),

/***/ "./apps/backend/src/app/repositories/room-type-hist.repository.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.RoomTypeHistRepository = void 0;
const tslib_1 = __webpack_require__("tslib");
const typeorm_ex_decorator_1 = __webpack_require__("./apps/backend/src/app/decorators/typeorm-ex.decorator.ts");
const typeorm_1 = __webpack_require__("typeorm");
const models_1 = __webpack_require__("./apps/backend/src/app/models/index.ts");
let RoomTypeHistRepository = class RoomTypeHistRepository extends typeorm_1.Repository {
    createNew(payload) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const roomTypeId = payload.id;
            delete payload.id;
            return this.save(Object.assign({ roomTypeId: roomTypeId }, payload));
        });
    }
    deleteAllHist(id) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield this.createQueryBuilder('room_type_hist')
                .delete()
                .where('room_type_hist.room_type_id = :id', { id: id })
                .useTransaction(true)
                .execute();
        });
    }
};
RoomTypeHistRepository = tslib_1.__decorate([
    (0, typeorm_ex_decorator_1.CustomRepository)(models_1.RoomTypeHist)
], RoomTypeHistRepository);
exports.RoomTypeHistRepository = RoomTypeHistRepository;


/***/ }),

/***/ "./apps/backend/src/app/repositories/room-type.repository.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.RoomTypeRepository = void 0;
const tslib_1 = __webpack_require__("tslib");
const typeorm_ex_decorator_1 = __webpack_require__("./apps/backend/src/app/decorators/typeorm-ex.decorator.ts");
const typeorm_1 = __webpack_require__("typeorm");
const room_type_entity_1 = __webpack_require__("./apps/backend/src/app/models/room-type.entity.ts");
const models_1 = __webpack_require__("./apps/backend/src/app/models/index.ts");
const nestjs_typeorm_paginate_1 = __webpack_require__("nestjs-typeorm-paginate");
const common_1 = __webpack_require__("@nestjs/common");
const device_type_service_1 = __webpack_require__("./apps/backend/src/app/services/device-type.service.ts");
let RoomTypeRepository = class RoomTypeRepository extends typeorm_1.Repository {
    constructor() {
        super(...arguments);
        this.logger = new common_1.Logger(device_type_service_1.DeviceTypeService.name);
    }
    existsById(id) {
        return this.createQueryBuilder('rt')
            .select('COUNT(1)', 'count')
            .where('rt.id = :id', { id: id })
            .getRawOne()
            .then((data) => (data === null || data === void 0 ? void 0 : data.count) > 0);
    }
    findRoomTypesByPagination(pagination) {
        const query = this.createQueryBuilder('rt')
            .select('rt.id', 'id')
            .addSelect('rt.name', 'name')
            .where('rt.deleted_at IS NULL')
            .andWhere('LOWER(rt.name) ILIKE :search', {
            search: `%${pagination.search.trim()}%`,
        })
            .orderBy(pagination.sort, pagination.dir);
        return (0, nestjs_typeorm_paginate_1.paginateRaw)(query, {
            page: pagination.page,
            limit: pagination.limit,
        });
    }
    findRoomTypeName() {
        return this.createQueryBuilder('rt')
            .select('rt.id', 'id')
            .addSelect('rt.name', 'name')
            .andWhere('rt.deleted_at IS NULL')
            .getRawMany();
    }
    findById(id) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return this.createQueryBuilder('rt')
                .select('rt.id', 'id')
                .addSelect('rt.name', 'name')
                .addSelect('rt.description', 'description')
                .addSelect('a.username', 'createdBy')
                .addSelect('rt.created_at', 'createdAt')
                .addSelect('aa.username', 'updatedBy')
                .addSelect('rt.updated_at', 'updatedAt')
                .innerJoin(models_1.Accounts, 'a', 'a.id = rt.created_by')
                .leftJoin(models_1.Accounts, 'aa', 'aa.id = rt.updated_by')
                .where('rt.id = :id', { id: id })
                .andWhere('rt.deleted_at IS NULL')
                .getRawOne();
        });
    }
    // async get(id: string): Promise<RoomType> {
    //   return this.createQueryBuilder('rt')
    //     .select('rt.id', 'id')
    //     .addSelect('rt.name', 'name')
    //     .addSelect('rt.description', 'description')
    //     .addSelect('rt.created_by', 'createdBy')
    //     .addSelect('rt.created_at', 'createdAt')
    //     .addSelect('rt.updated_by', 'updatedBy')
    //     .addSelect('rt.updated_at', 'updatedAt')
    //     .addSelect('rt.deleted_by', 'deletedBy')
    //     .addSelect('rt.deleted_at', 'deletedAt')
    //     .where('rt.id = :id', { id: id })
    //     .getRawOne<RoomType>();
    // }
    addNew(accountId, payload) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            try {
                const roomType = yield this.save({
                    name: payload.name.trim(),
                    description: payload.description,
                    createdBy: accountId,
                    createdAt: new Date(),
                });
                return roomType;
            }
            catch (e) {
                this.logger.error(e);
                throw new common_1.BadRequestException(e.message);
            }
        });
    }
    updateById(accountId, roomTypeId, payload) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const oldData = yield this.findOneOrFail({
                where: {
                    id: roomTypeId,
                }
            });
            return this.save(Object.assign(Object.assign({}, oldData), { id: roomTypeId, name: payload.name.trim(), description: payload.description, updatedBy: accountId, updatedAt: new Date() }), {
                transaction: true,
            });
        });
    }
    deleteById(accountId, id) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const isDeleted = yield this.createQueryBuilder('room_type')
                .update({
                deletedAt: new Date(),
                deletedBy: accountId,
            })
                .where('room_type.id = :id', { id: id })
                .useTransaction(true)
                .execute();
            if (isDeleted.affected > 0) {
                return this.findOneOrFail({
                    where: {
                        id: id,
                    },
                });
            }
        });
    }
    findDeletedByPagination(search) {
        return this.createQueryBuilder('rt')
            .select('rt.id', 'id')
            .addSelect('rt.name', 'name')
            .addSelect('rt.deleted_at', 'deletedAt')
            .addSelect('a.username', 'deletedBy')
            .innerJoin(models_1.Accounts, 'a', 'a.id = rt.deleted_by')
            .where('rt.name ILIKE :search', { search: `%${search.trim()}%` })
            .andWhere('rt.deleted_at IS NOT NULL')
            .orderBy('rt.deleted_at', 'DESC')
            .getRawMany();
    }
    restoreDeletedById(accountId, id) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const isRestored = yield this.createQueryBuilder('room_type')
                .update({
                updatedAt: new Date(),
                updatedBy: accountId,
                deletedAt: null,
                deletedBy: null,
            })
                .where('room_type.id = :id', { id: id })
                .useTransaction(true)
                .execute();
            if (isRestored.affected > 0) {
                return this.findOneOrFail({
                    where: {
                        id: id,
                    },
                });
            }
        });
    }
    permanentlyDeleteById(id) {
        return this.createQueryBuilder('room_type')
            .delete()
            .where('room_type.id = :id', { id: id })
            .useTransaction(true)
            .execute();
    }
};
RoomTypeRepository = tslib_1.__decorate([
    (0, typeorm_ex_decorator_1.CustomRepository)(room_type_entity_1.RoomType)
], RoomTypeRepository);
exports.RoomTypeRepository = RoomTypeRepository;


/***/ }),

/***/ "./apps/backend/src/app/repositories/room-wishlist.repository.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.RoomWishlistRepository = void 0;
const tslib_1 = __webpack_require__("tslib");
const typeorm_1 = __webpack_require__("typeorm");
const models_1 = __webpack_require__("./apps/backend/src/app/models/index.ts");
const typeorm_ex_decorator_1 = __webpack_require__("./apps/backend/src/app/decorators/typeorm-ex.decorator.ts");
let RoomWishlistRepository = class RoomWishlistRepository extends typeorm_1.Repository {
    findAllByKeycloakUserId(roomName, slotFrom, slotTo, keycloakId) {
        return this.createQueryBuilder("room_wishlist")
            .select("room_wishlist.id as id, r.id as roomId, r.name as roomName, room_wishlist.slot_num as slot")
            .innerJoin("rooms", "r", "r.id = room_wishlist.room_id")
            .innerJoin("accounts", "a", "room_wishlist.created_by = a.id")
            .where("a.keycloak_id = :keycloakId", { keycloakId: keycloakId })
            .andWhere("r.name LIKE :roomName", { roomName: `%${roomName !== null && roomName !== void 0 ? roomName : ""}%` })
            .groupBy("room_wishlist.id")
            .addGroupBy("r.id")
            .addGroupBy("room_wishlist.slot_num")
            .having("room_wishlist.slot_num >= :slotFrom", { slotFrom: slotFrom })
            .andHaving("room_wishlist.slot_num <= :slotTo", { slotTo: slotTo })
            .getRawMany();
    }
    addToWishList(keycloakUserId, wishlist) {
        return this.createQueryBuilder("room_wishlist")
            .insert()
            .into(models_1.RoomWishlist, ["room_id", "created_at"])
            .useTransaction(true)
            .execute();
    }
    checkIfWishlistAlreadyExist(payload) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return this.createQueryBuilder("room_wishlist")
                .select("COUNT(1)", "check")
                .where("room_wishlist.room_id = :roomId", { roomId: payload.roomId })
                .andWhere("room_wishlist.slot_num = :slot", { slot: payload.slot })
                .getRawOne().then((data) => data.check > 0);
        });
    }
    removeFromWishlist(accountId, roomId, slot) {
        return this.createQueryBuilder("room_wishlist")
            .delete()
            .where("room_wishlist.created_by = :createdBy", { createdBy: accountId })
            .andWhere("room_wishlist.room_id = :roomId", { roomId: roomId })
            .andWhere("room_wishlist.slot_num = :slot", { slot: slot })
            .useTransaction(true)
            .execute();
    }
}; /*
SELECT rw.id, r.id as roomid, r.name as roomName, rw.slot_num as slot FROM room_wishlist rw INNER JOIN accounts a
ON rw.created_by = a.id INNER JOIN rooms r ON r.id = rw.room_id
WHERE r.name LIKE '%%' AND a.keycloak_id = '8c592883-e40d-45dc-a4da-ebb4ec9778c9'
*/
RoomWishlistRepository = tslib_1.__decorate([
    (0, typeorm_ex_decorator_1.CustomRepository)(models_1.RoomWishlist)
], RoomWishlistRepository);
exports.RoomWishlistRepository = RoomWishlistRepository;


/***/ }),

/***/ "./apps/backend/src/app/repositories/rooms.repository.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.RoomsRepository = void 0;
const tslib_1 = __webpack_require__("tslib");
const typeorm_1 = __webpack_require__("typeorm");
const models_1 = __webpack_require__("./apps/backend/src/app/models/index.ts");
const typeorm_ex_decorator_1 = __webpack_require__("./apps/backend/src/app/decorators/typeorm-ex.decorator.ts");
const models_2 = __webpack_require__("./apps/backend/src/app/models/index.ts");
const nestjs_typeorm_paginate_1 = __webpack_require__("nestjs-typeorm-paginate");
const room_type_entity_1 = __webpack_require__("./apps/backend/src/app/models/room-type.entity.ts");
let RoomsRepository = class RoomsRepository extends typeorm_1.Repository {
    getSize() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const result = yield this.createQueryBuilder(`rooms`)
                .select(`COUNT(id) as size`)
                .where(`rooms.deleted_at IS NULL`)
                .andWhere(`rooms.disabled_at IS NULL`)
                .getRawOne();
            return result.size;
        });
    }
    existsById(id) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return this.createQueryBuilder('rooms')
                .select('COUNT(rooms.name)')
                .where('rooms.id = :id', { id })
                .getRawOne()
                .then((data) => data['count'] > 0);
        });
    }
    checkIfRoomIsDeletedById(id) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return this.createQueryBuilder('rooms')
                .select('rooms.deleted_at')
                .where('rooms.id = :id', { id: id })
                .getRawOne()
                .then((data) => (data ? data['deleted_at'] : true));
        });
    }
    checkIfRoomIsDisabledById(id) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return this.createQueryBuilder('rooms')
                .select('rooms.disabled_at')
                .where('rooms.id = :id', { id: id })
                .getRawOne()
                .then((data) => (data ? data['disabled_at'] : true));
        });
    }
    isExistedByName(name) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return this.createQueryBuilder('rooms')
                .select('COUNT(rooms.name)')
                .where('rooms.name = :name', { name })
                .getRawOne()
                .then((data) => data['count'] > 0);
        });
    }
    searchRoom(payload) {
        const query = this.createQueryBuilder('r')
            .leftJoin(models_2.Accounts, 'a', 'r.created_by = a.id')
            .leftJoin(models_2.Accounts, 'aa', 'r.updated_by = aa.id')
            .select('r.id', 'id')
            .addSelect('r.name', 'name')
            .addSelect('r.description', 'description')
            .addSelect('rt.name', 'type')
            .addSelect('r.createdAt', 'createdAt')
            .addSelect('r.updatedAt', 'updatedAt')
            .addSelect('a.username', 'createdBy')
            .addSelect('aa.username', 'updatedBy')
            .innerJoin(room_type_entity_1.RoomType, 'rt', 'rt.id = r.type')
            .where('LOWER(r.name) LIKE LOWER(:search)', {
            search: `%${payload.search.trim()}%`,
        })
            .andWhere(`r.deleted_at IS NULL`)
            .andWhere(`r.disabled_at IS NULL`)
            .orderBy(payload.sort, payload.dir);
        if (payload.roomType && payload.roomType !== '') {
            query.andWhere('rt.name = :roomTypeName', {
                roomTypeName: payload.roomType,
            });
        }
        return (0, nestjs_typeorm_paginate_1.paginateRaw)(query, {
            limit: payload.limit,
            page: payload.page,
        });
    }
    findRoomNames() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return this.createQueryBuilder('rooms')
                .select('rooms.name', 'name')
                .addSelect('rooms.id', 'id')
                .where('rooms.disabled_at IS NULL')
                .andWhere('rooms.deleted_at IS NULL')
                .getRawMany();
        });
    }
    findById(id) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return this.createQueryBuilder('rooms')
                .select('rooms.id', 'id')
                .addSelect('rooms.name', 'name')
                .addSelect('rt.id', 'roomTypeId')
                .addSelect('rt.name', 'roomTypeName')
                .addSelect('rooms.created_at', 'createdAt')
                .addSelect('a.username', 'createdBy')
                .addSelect('rooms.updated_at', 'updatedAt')
                .addSelect('aa.username', 'updatedBy')
                .addSelect('rooms.description', 'description')
                .leftJoin(models_2.Accounts, 'a', 'rooms.created_by = a.id')
                .leftJoin(models_2.Accounts, 'aa', 'rooms.updated_by = aa.id')
                .innerJoin(room_type_entity_1.RoomType, 'rt', 'rt.id = rooms.type')
                .where('rooms.disabled_at IS NULL')
                .andWhere('rooms.deleted_at IS NULL')
                .andWhere('rooms.id = :roomId', { roomId: id })
                .getRawOne();
        });
    }
    createNewRoom(payload, userId) {
        if (payload.isDisabled) {
            return this.save({
                name: payload.name.trim(),
                description: payload.description,
                type: payload.type,
                createdBy: userId,
                createdAt: new Date(),
                disabledBy: userId,
                disabledAt: new Date(),
            }, {
                transaction: true,
            });
        }
        else {
            return this.save({
                name: payload.name.trim(),
                description: payload.description,
                type: payload.type,
                createdBy: userId,
                createdAt: new Date(),
            }, {
                transaction: true,
            });
        }
    }
    updateById(accountId, roomId, payload) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const oldData = yield this.findOneOrFail({
                where: {
                    id: roomId,
                },
            });
            return this.save(Object.assign(Object.assign({}, oldData), { id: roomId, name: payload.name.trim(), description: payload.description, type: payload.type, updatedBy: accountId, updatedAt: new Date() }), {
                transaction: true,
            });
        });
    }
    findDisabledRooms(search) {
        return this.createQueryBuilder('rooms')
            .select('rooms.id', 'id')
            .addSelect('rooms.name', 'name')
            .addSelect('rooms.disabled_at', 'disabledAt')
            .addSelect('a.username', 'disabledBy')
            .addSelect('rt.name', 'roomTypeName')
            .innerJoin(models_2.Accounts, 'a', 'rooms.disabled_by = a.id')
            .innerJoin(room_type_entity_1.RoomType, 'rt', 'rooms.type = rt.id')
            .where(`rooms.deleted_at IS NULL`)
            .andWhere(`rooms.disabled_at IS NOT NULL`)
            .andWhere('rooms.name ILIKE :search', { search: `%${search.trim()}%` })
            .getRawMany();
    }
    getRoomsByRoomType(roomTypeId) {
        return this.createQueryBuilder(`rooms`)
            .select('rooms.id', 'id')
            .addSelect('rooms.name', 'name')
            .addSelect('rooms.type', 'type')
            .addSelect('rt.name', 'roomTypeName')
            .innerJoin(room_type_entity_1.RoomType, 'rt', 'rt.id = rooms.type')
            .where(`rooms.deleted_at IS NULL`)
            .andWhere(`rooms.disabled_at IS NULL`)
            .andWhere('rooms.type = :type', { type: roomTypeId })
            .getRawMany();
    }
    disableById(accountId, id) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const isDisabled = yield this.createQueryBuilder('rooms')
                .update({
                disabledBy: accountId,
                disabledAt: new Date(),
            })
                .where('rooms.id = :id', { id: id })
                .useTransaction(true)
                .execute();
            if (isDisabled.affected > 0) {
                return this.findOneOrFail({
                    where: {
                        id: id,
                    },
                });
            }
        });
    }
    restoreDisabledRoomById(accountId, id) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const isRestored = yield this.createQueryBuilder('rooms')
                .update({
                disabledAt: null,
                disabledBy: null,
                updatedBy: accountId,
                updatedAt: new Date(),
            })
                .where('rooms.id = :id', { id: id })
                .useTransaction(true)
                .execute();
            if (isRestored.affected > 0) {
                return this.findOneOrFail({
                    where: {
                        id: id,
                    },
                });
            }
        });
    }
    deleteById(accountId, id) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const isDeleted = yield this.createQueryBuilder('rooms')
                .update({
                deletedAt: new Date(),
                deletedBy: accountId,
                disabledAt: null,
                disabledBy: null,
            })
                .where('rooms.id = :id', { id: id })
                .useTransaction(true)
                .execute();
            if (isDeleted.affected > 0) {
                return this.findOneOrFail({
                    where: {
                        id: id,
                    },
                });
            }
        });
    }
    findDeletedRooms(search) {
        return this.createQueryBuilder(`rooms`)
            .select('rooms.id', 'id')
            .addSelect('rooms.name', 'name')
            .addSelect('rooms.deleted_at', 'deletedAt')
            .addSelect('a.username', 'deletedBy')
            .addSelect('rt.name', 'roomTypeName')
            .innerJoin(models_2.Accounts, 'a', 'rooms.deleted_by = a.id')
            .innerJoin(room_type_entity_1.RoomType, 'rt', 'rt.id = rooms.type')
            .where(`rooms.deleted_at IS NOT NULL`)
            .andWhere(`rooms.disabled_at IS NULL`)
            .andWhere('rooms.name ILIKE :name', { name: `%${search.trim()}%` })
            .getRawMany();
    }
    restoreDeletedRoomById(accountId, id) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const isRestored = yield this.createQueryBuilder('rooms')
                .update({
                deletedAt: null,
                deletedBy: null,
                updatedAt: new Date(),
                updatedBy: accountId,
            })
                .where('rooms.id = :id', { id: id })
                .execute();
            if (isRestored.affected > 0) {
                return this.findOneOrFail({
                    where: {
                        id: id,
                    },
                });
            }
        });
    }
    getAllRoomsForElasticIndex() {
        return this.createQueryBuilder('rooms')
            .select([
            'rooms.id',
            'rooms.name',
            'rooms.description',
            'rooms.isDeleted',
            'rooms.isDisabled',
        ])
            .getMany();
    }
    filterByNameAndType(payload) {
        const query = this.createQueryBuilder('rooms')
            .select('rooms.id', 'id')
            .addSelect('rooms.name', 'name')
            .addSelect('rooms.type', 'type')
            .where('rooms.disabled_at IS NULL')
            .andWhere('rooms.deleted_at IS NULL')
            .andWhere('rooms.name ILIKE :name', { name: `%${payload.roomName.name}%` })
            .orderBy('rooms.name', payload.roomName.sort)
            .addOrderBy('rooms.type', payload.roomType.sort);
        if (payload.roomType.name.length > 0) {
            query.andWhere('rooms.type = :type', { type: payload.roomType.name });
        }
        return query.getRawMany();
    }
};
RoomsRepository = tslib_1.__decorate([
    (0, typeorm_ex_decorator_1.CustomRepository)(models_1.Rooms)
], RoomsRepository);
exports.RoomsRepository = RoomsRepository;


/***/ }),

/***/ "./apps/backend/src/app/repositories/slot.repository.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SlotRepository = void 0;
const tslib_1 = __webpack_require__("tslib");
const typeorm_ex_decorator_1 = __webpack_require__("./apps/backend/src/app/decorators/typeorm-ex.decorator.ts");
const slot_entity_1 = __webpack_require__("./apps/backend/src/app/models/slot.entity.ts");
const typeorm_1 = __webpack_require__("typeorm");
const nestjs_typeorm_paginate_1 = __webpack_require__("nestjs-typeorm-paginate");
const models_1 = __webpack_require__("./apps/backend/src/app/models/index.ts");
let SlotRepository = class SlotRepository extends typeorm_1.Repository {
    findByPagination(params) {
        const query = this.createQueryBuilder('s')
            .select('s.id', 'id')
            .addSelect('s.time_start', 'timeStart')
            .addSelect('s.time_end', 'timeEnd')
            .addSelect('s.name', 'name')
            .where('s.deleted_at IS NULL')
            .andWhere('LOWER(s.name) LIKE LOWER(:search)', {
            search: `%${params.search}%`,
        })
            .orderBy(params.sort, params.dir);
        return (0, nestjs_typeorm_paginate_1.paginateRaw)(query, {
            page: params.page,
            limit: params.limit,
        });
    }
    getNumOfSlot(id) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return this.createQueryBuilder('slot')
                .select('slot.slot_num', "slotNum")
                .where('slot.id = :slotId', { slotId: id })
                .getRawOne();
        });
    }
    findSlotNames() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return this.createQueryBuilder('slots')
                .select('slots.name', 'name')
                .addSelect('slots.id', 'id')
                .addSelect('slots.slot_num', 'slotNum')
                .addSelect('slots.time_start', 'timeStart')
                .addSelect('slots.time_end', 'timeEnd')
                .where('slots.deleted_by IS NULL')
                .andWhere('slots.deleted_at IS NULL')
                .orderBy('slot_num', 'ASC')
                .getRawMany();
        });
    }
    findById(id) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return this.createQueryBuilder('s')
                .select('s.id', 'id')
                .addSelect('s.name', 'name')
                .addSelect('s.time_start', 'timeStart')
                .addSelect('s.time_end', 'timeEnd')
                .addSelect('a.username', 'createdBy')
                .addSelect('s.created_at', 'createdAt')
                .addSelect('aa.username', 'updatedBy')
                .addSelect('s.updated_at', 'updatedAt')
                .addSelect('s.description', 'description')
                .innerJoin(models_1.Accounts, 'a', 'a.id = s.created_by')
                .leftJoin(models_1.Accounts, 'aa', 'aa.id = s.updated_by')
                .where('s.deleted_at IS NULL')
                .andWhere('s.id = :id', { id: id })
                .getRawOne();
        });
    }
    findAll() {
        return this.find({
            where: {
                deletedAt: null,
                deletedBy: null
            }
        });
    }
};
SlotRepository = tslib_1.__decorate([
    (0, typeorm_ex_decorator_1.CustomRepository)(slot_entity_1.Slot)
], SlotRepository);
exports.SlotRepository = SlotRepository;


/***/ }),

/***/ "./apps/backend/src/app/repositories/users-otp.repository.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UsersOTPRepository = void 0;
const tslib_1 = __webpack_require__("tslib");
const typeorm_1 = __webpack_require__("typeorm");
const models_1 = __webpack_require__("./apps/backend/src/app/models/index.ts");
const typeorm_ex_decorator_1 = __webpack_require__("./apps/backend/src/app/decorators/typeorm-ex.decorator.ts");
let UsersOTPRepository = class UsersOTPRepository extends typeorm_1.Repository {
};
UsersOTPRepository = tslib_1.__decorate([
    (0, typeorm_ex_decorator_1.CustomRepository)(models_1.UsersOTP)
], UsersOTPRepository);
exports.UsersOTPRepository = UsersOTPRepository;


/***/ }),

/***/ "./apps/backend/src/app/repositories/users-warning-flag-history.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UsersWarningFlagHistoryRepository = void 0;
const tslib_1 = __webpack_require__("tslib");
const typeorm_1 = __webpack_require__("typeorm");
const models_1 = __webpack_require__("./apps/backend/src/app/models/index.ts");
const typeorm_ex_decorator_1 = __webpack_require__("./apps/backend/src/app/decorators/typeorm-ex.decorator.ts");
let UsersWarningFlagHistoryRepository = class UsersWarningFlagHistoryRepository extends typeorm_1.Repository {
};
UsersWarningFlagHistoryRepository = tslib_1.__decorate([
    (0, typeorm_ex_decorator_1.CustomRepository)(models_1.UsersWarningFlagHistory)
], UsersWarningFlagHistoryRepository);
exports.UsersWarningFlagHistoryRepository = UsersWarningFlagHistoryRepository;


/***/ }),

/***/ "./apps/backend/src/app/repositories/users-warning-flag.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UsersWarningFlagRepository = void 0;
const tslib_1 = __webpack_require__("tslib");
const typeorm_1 = __webpack_require__("typeorm");
const models_1 = __webpack_require__("./apps/backend/src/app/models/index.ts");
const typeorm_ex_decorator_1 = __webpack_require__("./apps/backend/src/app/decorators/typeorm-ex.decorator.ts");
let UsersWarningFlagRepository = class UsersWarningFlagRepository extends typeorm_1.Repository {
};
UsersWarningFlagRepository = tslib_1.__decorate([
    (0, typeorm_ex_decorator_1.CustomRepository)(models_1.UsersWarningFlag)
], UsersWarningFlagRepository);
exports.UsersWarningFlagRepository = UsersWarningFlagRepository;


/***/ }),

/***/ "./apps/backend/src/app/services/account-hist.service.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AccountHistService = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const account_hist_repository_1 = __webpack_require__("./apps/backend/src/app/repositories/account-hist.repository.ts");
let AccountHistService = class AccountHistService {
    constructor(repository) {
        this.repository = repository;
    }
    createNew(account) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return this.repository.createNew(account);
        });
    }
};
AccountHistService = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof account_hist_repository_1.AccountHistRepository !== "undefined" && account_hist_repository_1.AccountHistRepository) === "function" ? _a : Object])
], AccountHistService);
exports.AccountHistService = AccountHistService;


/***/ }),

/***/ "./apps/backend/src/app/services/accounts.service.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var AccountsService_1, _a, _b, _c, _d;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AccountsService = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const repositories_1 = __webpack_require__("./apps/backend/src/app/repositories/index.ts");
const keycloak_service_1 = __webpack_require__("./apps/backend/src/app/services/keycloak.service.ts");
const cloudinary_service_1 = __webpack_require__("./apps/backend/src/app/services/cloudinary.service.ts");
const crypto_1 = __webpack_require__("crypto");
const account_hist_service_1 = __webpack_require__("./apps/backend/src/app/services/account-hist.service.ts");
let AccountsService = AccountsService_1 = class AccountsService {
    constructor(cloudinaryService, keycloakService, repository, histService) {
        this.cloudinaryService = cloudinaryService;
        this.keycloakService = keycloakService;
        this.repository = repository;
        this.histService = histService;
        this.logger = new common_1.Logger(AccountsService_1.name);
    }
    getAll(request) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.repository.searchAccount(request);
            }
            catch (e) {
                this.logger.error(e);
                throw new common_1.BadRequestException('One or more parameters is invalid');
            }
        });
    }
    getRoleOfAccount(id) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            try {
                const role = yield this.repository.getRoleOfAccount(id);
                return role;
            }
            catch (e) {
                this.logger.error(e);
                throw new common_1.BadRequestException('One or more parameters is invalid');
            }
        });
    }
    getById(id) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            try {
                const account = yield this.repository.findById(id);
                return account;
            }
            catch (e) {
                this.logger.error(e);
                throw new common_1.BadRequestException('Account does not exist');
            }
        });
    }
    getUserIdByKeycloakId(keycloakId) {
        return this.repository.findIdByKeycloakId(keycloakId);
    }
    findByKeycloakId(keycloakId) {
        try {
            return this.repository.findByKeycloakId(keycloakId);
        }
        catch (e) {
            this.logger.error(e.message);
            throw new common_1.BadRequestException(e.message);
        }
    }
    getAccountsByRoleId(roleId) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.repository.getAccountsByRoleId(roleId);
            }
            catch (e) {
                this.logger.error(e);
                throw new common_1.BadRequestException('An error occurred while getting accounts by type ' + roleId);
            }
        });
    }
    add(payload, userId) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const isExisted = yield this.repository.isExistedByUsername(payload.username);
            if (isExisted) {
                throw new common_1.BadRequestException('Username is duplicated!');
            }
            try {
                const accountAdded = yield this.repository.createNewAccount(payload, userId);
                yield this.histService.createNew(accountAdded);
                return accountAdded;
            }
            catch (e) {
                this.logger.error(e.message);
                if (e.message.includes('constraint') &&
                    e.message.includes('devices_device_type_id_fk')) {
                    throw new common_1.BadRequestException('There is no device type with the provided id');
                }
                throw new common_1.BadRequestException('Error while creating a new device');
            }
        });
    }
    addAll(models) {
        return Promise.resolve([]);
    }
    updateById(accountId, id, body) {
        var _a;
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            let account;
            try {
                account = yield this.repository.findOneOrFail({
                    where: {
                        id: id,
                    },
                });
            }
            catch (e) {
                this.logger.error(e.message);
                throw new common_1.BadRequestException("Account doesn't exist with the provided id");
            }
            const data = yield this.repository.findById(id);
            if (data === undefined) {
                throw new common_1.BadRequestException('This account is already deleted or disabled');
            }
            try {
                const accountUpdated = yield this.repository.updatePartially(body, account, accountId);
                yield this.histService.createNew(accountUpdated);
                return accountUpdated;
            }
            catch (e) {
                this.logger.error(e);
                throw new common_1.BadRequestException((_a = e.message) !== null && _a !== void 0 ? _a : 'Error occurred while updating this account');
            }
        });
    }
    disableById(accountId, id) {
        var _a;
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const isExisted = yield this.repository.existsById(id);
            if (!isExisted) {
                throw new common_1.BadRequestException('Account does not found with the provided id');
            }
            const isDisabled = yield this.repository.checkIfAccountIsDisabledById(id);
            if (isDisabled) {
                throw new common_1.BadRequestException('This account is already disabled');
            }
            const isDeleted = yield this.repository.checkIfAccountIsDeletedById(id);
            if (isDeleted) {
                throw new common_1.BadRequestException('This account is already deleted, can not disable');
            }
            try {
                const account = yield this.repository.disableById(accountId, id);
                yield this.histService.createNew(account);
                return account;
            }
            catch (e) {
                throw new common_1.BadRequestException((_a = e.message) !== null && _a !== void 0 ? _a : 'Error occurred while disable this account');
            }
        });
    }
    getDisabledAccounts(search) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.repository.findDisabledAccounts(search);
            }
            catch (e) {
                this.logger.error(e.message);
                throw new common_1.BadRequestException('Error while getting disabled accounts');
            }
        });
    }
    handleRestoreDisabledAccountById(accountId, id) {
        var _a;
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            try {
                const isExisted = yield this.repository.existsById(id);
                if (!isExisted) {
                    throw new common_1.BadRequestException('Account does not found with the provided id');
                }
                const isDeleted = yield this.repository.checkIfAccountIsDeletedById(id);
                if (isDeleted) {
                    throw new common_1.BadRequestException('This account is already deleted');
                }
                const isDisabled = yield this.repository.checkIfAccountIsDisabledById(id);
                if (!isDisabled) {
                    throw new common_1.BadRequestException('This account ID is now active. Cannot restore it');
                }
                const account = yield this.repository.restoreDisabledAccountById(accountId, id);
                yield this.histService.createNew(account);
                return account;
            }
            catch (e) {
                this.logger.error(e);
                throw new common_1.BadRequestException((_a = e.message) !== null && _a !== void 0 ? _a : 'Error occurred while restore the disabled status of this account');
            }
        });
    }
    deleteById(accountId, id) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            try {
                const isExisted = yield this.repository.existsById(id);
                if (!isExisted) {
                    throw new common_1.BadRequestException('Account does not found with the provided id');
                }
                const isDeleted = yield this.repository.checkIfAccountIsDeletedById(id);
                if (isDeleted) {
                    throw new common_1.BadRequestException('This account is already deleted');
                }
                const account = yield this.repository.deleteById(accountId, id);
                yield this.histService.createNew(account);
                return account;
            }
            catch (e) {
                this.logger.error(e.message);
                throw new common_1.BadRequestException(e.message);
            }
        });
    }
    getDeletedAccounts(search) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.repository.findDeletedAccounts(search);
            }
            catch (e) {
                this.logger.error(e.message);
                throw new common_1.BadRequestException('Error while getting deleted accounts');
            }
        });
    }
    handleRestoreDeletedAccountById(accountId, id) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            try {
                const isExisted = yield this.repository.existsById(id);
                if (!isExisted) {
                    throw new common_1.BadRequestException('Account does not found with the provided id');
                }
                const isDisabled = yield this.repository.checkIfAccountIsDisabledById(id);
                if (isDisabled) {
                    throw new common_1.BadRequestException('This account is already disabled');
                }
                const isDeleted = yield this.repository.checkIfAccountIsDeletedById(id);
                if (!isDeleted) {
                    throw new common_1.BadRequestException('This account ID is now active. Cannot restore it');
                }
                const account = yield this.repository.restoreDeletedAccountById(accountId, id);
                yield this.histService.createNew(account);
                return account;
            }
            catch (e) {
                this.logger.error(e.message);
                throw new common_1.BadRequestException(e.message);
            }
        });
    }
    syncUsersFromKeycloak() {
        return Promise.resolve();
    }
    uploadAvatarByAccountId(image, id) {
        var _a;
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            try {
                console.log(image);
                const user = yield this.repository.findById(id);
                if (!user.deletedAt || !user.disabledAt) {
                    throw new common_1.BadRequestException('This account has been disabled');
                }
                const imageId = (0, crypto_1.randomUUID)();
                yield this.cloudinaryService.uploadImageAndGetURL(image.buffer, imageId);
                const url = yield this.cloudinaryService.getImageURLByFileName(imageId);
                yield this.repository.addAvatarURLById(url, id);
            }
            catch (e) {
                this.logger.error(e.message);
                throw new common_1.BadRequestException((_a = e.message) !== null && _a !== void 0 ? _a : 'Error while uploading avatar');
            }
        });
    }
    getAccountByKeycloakId(id) {
        return this.repository
            .findOneOrFail({
            where: {
                keycloakId: id,
            },
        })
            .catch((e) => {
            this.logger.error(e.message);
            throw new common_1.BadRequestException('Error while retrieving account');
        });
    }
    getAccountRoleByKeycloakId(keycloakId) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.repository.findRoleByKeycloakId(keycloakId);
            }
            catch (e) {
                this.logger.error(e.message);
                throw new common_1.BadRequestException(e.message);
            }
        });
    }
    changePassword(keycloakUser, payload) {
        var _a;
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            try {
                if (payload.password === payload.newPassword) {
                    throw new common_1.BadRequestException('Old password must not be the same with new password.');
                }
                yield this.keycloakService.signInToKeycloak(payload.username, payload.password);
                yield this.keycloakService.changePasswordByKeycloakId(keycloakUser.sub, payload.newPassword);
            }
            catch (e) {
                this.logger.error(e.message);
                throw new common_1.BadRequestException((_a = e.message) !== null && _a !== void 0 ? _a : 'Error while changing account password');
            }
        });
    }
    // async getUsernameByAccountId(id: string): Promise<string> {
    //   try {
    //     return await this.repository.findUsernameById(id);
    //   } catch (e) {
    //     this.logger.error(e);
    //     throw new BadRequestException(e.message);
    //   }
    // }
    updateMyProfile(keycloakUser, body) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield this.repository.findByKeycloakId(keycloakUser.sub);
                if (!user) {
                    throw new common_1.BadRequestException('Account does not exist with the provided id');
                }
                return yield this.repository.save(Object.assign(Object.assign({}, user), body));
            }
            catch (e) {
                this.logger.error(e.message);
                throw new common_1.BadRequestException('Error while update your profile.');
            }
        });
    }
    changePasswordByKeycloakId(id, password) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            try {
                const keycloakId = yield this.repository.findKeycloakIdByAccountId(id);
                yield this.keycloakService.changePasswordByKeycloakId(keycloakId, password);
            }
            catch (e) {
                this.logger.error(e.message);
                throw new common_1.BadRequestException('Error while changing password by keycloak id');
            }
        });
    }
    getAvatarURLByAccountId(accountId) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield this.repository.findAvatarURLById(accountId);
        });
    }
    getCurrentProfileInformation(keycloakId) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.repository.findProfileInformationById(keycloakId);
            }
            catch (e) {
                this.logger.error(e.message);
                throw new common_1.BadRequestException(e.message);
            }
        });
    }
    getUsernameList() {
        return this.repository.findUsername();
    }
    getKeycloakIdByGoogleId(googleId) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.repository.findKeycloakIdByGoogleId(googleId);
            }
            catch (e) {
                this.logger.error(e.message);
                throw new common_1.BadRequestException(e.message);
            }
        });
    }
    getAccountByGoogleId(googleId) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.repository.findByGoogleId(googleId);
            }
            catch (e) {
                this.logger.error(e.emssage);
                throw new common_1.BadRequestException(e.message);
            }
        });
    }
    checkIfAccountAlreadyHasAvatarImage(accountId) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            try {
                const isExisted = this.repository.existsById(accountId);
                if (!isExisted) {
                    throw new common_1.BadRequestException('Account does not exists with the provided id');
                }
                return yield this.repository.checkIfUserAlreadyHasAvatar(accountId);
            }
            catch (e) {
                this.logger.error(e.message);
                throw new common_1.BadRequestException(e.message);
            }
        });
    }
    addGoogleAvatarURLByAccountId(googleImageURL, accountId) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield this.repository.addAvatarURLById(googleImageURL, accountId);
                if (result.affected < 1) {
                    throw new common_1.BadRequestException('Error while updating account google image');
                }
            }
            catch (e) {
                this.logger.error(e.message);
                throw new common_1.BadRequestException(e.message);
            }
        });
    }
    updateGoogleIdByAccountEmail(googleId, email) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield this.repository.updateGoogleIdByEmail(googleId, email);
                if (result.affected < 1) {
                    throw new common_1.HttpException('Invalid account. Please contract to administrator for more information', common_1.HttpStatus.UNAUTHORIZED);
                }
            }
            catch (e) {
                this.logger.error(e.message);
                throw new common_1.BadRequestException(e.message);
            }
        });
    }
    getAccountIdByKeycloakId(keycloakId) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return this.repository.findIdByKeycloakId(keycloakId);
        });
    }
};
AccountsService = AccountsService_1 = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof cloudinary_service_1.CloudinaryService !== "undefined" && cloudinary_service_1.CloudinaryService) === "function" ? _a : Object, typeof (_b = typeof keycloak_service_1.KeycloakService !== "undefined" && keycloak_service_1.KeycloakService) === "function" ? _b : Object, typeof (_c = typeof repositories_1.AccountRepository !== "undefined" && repositories_1.AccountRepository) === "function" ? _c : Object, typeof (_d = typeof account_hist_service_1.AccountHistService !== "undefined" && account_hist_service_1.AccountHistService) === "function" ? _d : Object])
], AccountsService);
exports.AccountsService = AccountsService;


/***/ }),

/***/ "./apps/backend/src/app/services/app.service.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AppService = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
let AppService = class AppService {
    getData() {
        return { message: 'pong!' };
    }
};
AppService = tslib_1.__decorate([
    (0, common_1.Injectable)()
], AppService);
exports.AppService = AppService;


/***/ }),

/***/ "./apps/backend/src/app/services/authentication.service.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var AuthenticationService_1, _a, _b, _c;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AuthenticationService = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const accounts_service_1 = __webpack_require__("./apps/backend/src/app/services/accounts.service.ts");
const keycloak_service_1 = __webpack_require__("./apps/backend/src/app/services/keycloak.service.ts");
const google_auth_library_1 = __webpack_require__("google-auth-library");
const exception_constant_1 = __webpack_require__("./apps/backend/src/app/constants/exception.constant.ts");
const config_1 = __webpack_require__("@nestjs/config");
let AuthenticationService = AuthenticationService_1 = class AuthenticationService {
    constructor(accountService, configService, keycloakService) {
        this.accountService = accountService;
        this.configService = configService;
        this.keycloakService = keycloakService;
        this.logger = new common_1.Logger(AuthenticationService_1.name);
        this.oAuthClientId = this.configService.get('firebase.oauth.clientId');
        this.oAuthAudience = this.configService.get('firebase.oauth.audience');
    }
    handleGoogleSignin(idToken) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const client = new google_auth_library_1.OAuth2Client(this.oAuthClientId);
            try {
                const decodedToken = yield client.verifyIdToken({
                    idToken: idToken,
                    audience: this.oAuthAudience,
                });
                const userGoogleId = decodedToken.getUserId();
                let keycloakToken = yield this.accountService.getKeycloakIdByGoogleId(userGoogleId);
                if (keycloakToken === undefined) {
                    yield this.accountService.updateGoogleIdByAccountEmail(userGoogleId, decodedToken.getPayload().email);
                    keycloakToken = yield this.accountService.getKeycloakIdByGoogleId(userGoogleId);
                }
                let keycloakUser;
                let user;
                if (keycloakToken !== undefined) {
                    keycloakUser =
                        yield this.keycloakService.getAuthenticationTokenByMasterAccount(keycloakToken);
                    user = yield this.accountService.getAccountByGoogleId(userGoogleId);
                    const doesUserHaveAvatar = yield this.accountService.checkIfAccountAlreadyHasAvatarImage(user.id);
                    if (!doesUserHaveAvatar) {
                        yield this.accountService.addGoogleAvatarURLByAccountId(decodedToken.getPayload().picture, user.id);
                    }
                }
                else {
                    throw new common_1.HttpException('Invalid account. Please contract to administrator for more information', common_1.HttpStatus.UNAUTHORIZED);
                }
                return {
                    accessToken: keycloakUser.access_token,
                    refreshToken: keycloakUser.refresh_token,
                    id: user.id,
                    keycloakId: user.keycloakId,
                    username: user.username,
                    email: user.email,
                    phone: user.phone,
                    googleId: user.googleId,
                    role: user.roleId,
                    fullname: user.fullname,
                    avatar: user.avatar,
                };
            }
            catch (e) {
                this.logger.error(e);
                this.handleGoogleSignInException(e);
            }
        });
    }
    handleGoogleSignInException(e) {
        if (`${e} `.includes('Token used too late')) {
            throw new common_1.HttpException(exception_constant_1.default.googleAccessTokenException.expired, common_1.HttpStatus.BAD_REQUEST);
        }
        else if (`${e} `.includes('Invalid token signature')) {
            throw new common_1.HttpException(exception_constant_1.default.googleAccessTokenException.invalidToken, common_1.HttpStatus.BAD_REQUEST);
        }
        else {
            throw new common_1.HttpException(exception_constant_1.default.googleAccessTokenException.invalidToken, common_1.HttpStatus.BAD_REQUEST);
        }
    }
    handleUsernamePasswordLogin(credentials) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const keycloakToken = yield this.keycloakService.signInToKeycloak(credentials.username, credentials.password);
            console.log(1);
            const keycloakUser = yield this.keycloakService.getUserInfo(keycloakToken.access_token);
            console.log(2);
            const user = yield this.accountService.findByKeycloakId(keycloakUser.sub);
            console.log(3);
            return {
                accessToken: keycloakToken.access_token,
                refreshToken: keycloakToken.refresh_token,
                id: user.id,
                keycloakId: keycloakUser.sub,
                username: user.username,
                email: user.email,
                phone: user.phone,
                googleId: user.googleId,
                role: user.roleId,
                fullname: user.fullname,
                avatar: user.avatar,
            };
        });
    }
};
AuthenticationService = AuthenticationService_1 = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof accounts_service_1.AccountsService !== "undefined" && accounts_service_1.AccountsService) === "function" ? _a : Object, typeof (_b = typeof config_1.ConfigService !== "undefined" && config_1.ConfigService) === "function" ? _b : Object, typeof (_c = typeof keycloak_service_1.KeycloakService !== "undefined" && keycloak_service_1.KeycloakService) === "function" ? _c : Object])
], AuthenticationService);
exports.AuthenticationService = AuthenticationService;


/***/ }),

/***/ "./apps/backend/src/app/services/base.service.ts":
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.BaseService = void 0;
class BaseService {
}
exports.BaseService = BaseService;


/***/ }),

/***/ "./apps/backend/src/app/services/booking-reason-hist.service.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.BookingReasonHistService = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const booking_reason_hist_repository_1 = __webpack_require__("./apps/backend/src/app/repositories/booking-reason-hist.repository.ts");
let BookingReasonHistService = class BookingReasonHistService {
    constructor(repository) {
        this.repository = repository;
    }
    createNew(bookingReason) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return this.repository.createNew(bookingReason);
        });
    }
    deleteAllHist(id) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return this.repository.deleteAllHist(id);
        });
    }
};
BookingReasonHistService = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof booking_reason_hist_repository_1.BookingReasonHistRepository !== "undefined" && booking_reason_hist_repository_1.BookingReasonHistRepository) === "function" ? _a : Object])
], BookingReasonHistService);
exports.BookingReasonHistService = BookingReasonHistService;


/***/ }),

/***/ "./apps/backend/src/app/services/booking-reason.service.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var BookingReasonService_1, _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.BookingReasonService = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const booking_reason_repository_1 = __webpack_require__("./apps/backend/src/app/repositories/booking-reason.repository.ts");
const booking_reason_hist_service_1 = __webpack_require__("./apps/backend/src/app/services/booking-reason-hist.service.ts");
let BookingReasonService = BookingReasonService_1 = class BookingReasonService {
    constructor(repository, histService) {
        this.repository = repository;
        this.histService = histService;
        this.logger = new common_1.Logger(BookingReasonService_1.name);
    }
    getBookingReasonTypesWithPagination(pagination) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.repository.findByPagination(pagination);
            }
            catch (e) {
                this.logger.error(e.message);
                throw new common_1.BadRequestException(e.message);
            }
        });
    }
    getBookingReasonNames() {
        try {
            return this.repository.findBookingReasonName();
        }
        catch (e) {
            this.logger.error(e.message);
            throw new common_1.BadRequestException(e.message);
        }
    }
    getBookingReasonById(id) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.repository.findById(id);
            }
            catch (e) {
                this.logger.error(e.message);
                throw new common_1.BadRequestException(e.message);
            }
        });
    }
    createNewBookingReason(accountId, payload) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            try {
                const bookingReason = yield this.repository.createNew(accountId, {
                    name: payload.name,
                    description: payload.description,
                });
                yield this.histService.createNew(bookingReason);
                return bookingReason;
            }
            catch (e) {
                this.logger.error(e.message);
                throw new common_1.BadRequestException(e.message);
            }
        });
    }
    updateBookingReasonById(accountId, updatePayload, id) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            try {
                const isExisted = yield this.repository.existsById(id);
                if (!isExisted) {
                    throw new common_1.BadRequestException('Room type does not found with the provided id');
                }
                const bookingReason = yield this.repository.updateById(accountId, updatePayload, id);
                yield this.histService.createNew(bookingReason);
                return bookingReason;
            }
            catch (e) {
                this.logger.error(e.message);
                throw new common_1.BadRequestException(e.message);
            }
        });
    }
    deleteBookingReasonById(accountId, id) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield this.repository.findById(id);
                if (data === undefined) {
                    throw new common_1.BadRequestException('This reason already deleted!');
                }
                const reason = yield this.repository.deleteById(accountId, id);
                yield this.histService.createNew(reason);
                return reason;
            }
            catch (e) {
                this.logger.error(e);
                throw new common_1.BadRequestException(e.message);
            }
        });
    }
    getDeletedReasons(search) {
        try {
            return this.repository.findDeletedByPagination(search);
        }
        catch (e) {
            this.logger.error(e.message);
            throw new common_1.BadRequestException(e.message);
        }
    }
    restoreDeletedReasonById(accountId, id) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            try {
                const isExisted = this.repository.existsById(id);
                if (!isExisted) {
                    throw new common_1.BadRequestException('Reason does not exist with the provided id');
                }
                const data = yield this.repository.findById(id);
                if (data !== undefined) {
                    throw new common_1.BadRequestException('This reason ID is now active. Cannot restore');
                }
                const reason = yield this.repository.restoreDeletedById(accountId, id);
                yield this.histService.createNew(reason);
                return reason;
            }
            catch (e) {
                this.logger.error(e.message);
                throw new common_1.BadRequestException(e.message);
            }
        });
    }
    permanentlyDeleteReasonById(id) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield this.repository.findById(id);
                if (data !== undefined) {
                    throw new common_1.BadRequestException('Please delete this type after permanently delete');
                }
                else {
                    yield this.histService.deleteAllHist(id);
                    return this.repository.permanentlyDeleteById(id);
                }
            }
            catch (e) {
                this.logger.error(e.message);
                throw new common_1.BadRequestException(e.message);
            }
        });
    }
};
BookingReasonService = BookingReasonService_1 = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof booking_reason_repository_1.BookingReasonRepository !== "undefined" && booking_reason_repository_1.BookingReasonRepository) === "function" ? _a : Object, typeof (_b = typeof booking_reason_hist_service_1.BookingReasonHistService !== "undefined" && booking_reason_hist_service_1.BookingReasonHistService) === "function" ? _b : Object])
], BookingReasonService);
exports.BookingReasonService = BookingReasonService;


/***/ }),

/***/ "./apps/backend/src/app/services/booking-room-hist.service.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.BookingRequestHistService = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const booking_request_hist_repository_1 = __webpack_require__("./apps/backend/src/app/repositories/booking-request-hist.repository.ts");
let BookingRequestHistService = class BookingRequestHistService {
    constructor(repository) {
        this.repository = repository;
    }
    createNew(request, queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return this.repository.createNew(request, queryRunner);
        });
    }
};
BookingRequestHistService = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof booking_request_hist_repository_1.BookingRequestHistRepository !== "undefined" && booking_request_hist_repository_1.BookingRequestHistRepository) === "function" ? _a : Object])
], BookingRequestHistService);
exports.BookingRequestHistService = BookingRequestHistService;


/***/ }),

/***/ "./apps/backend/src/app/services/booking-room.service.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var BookingRoomService_1, _a, _b, _c, _d, _e, _f, _g, _h, _j;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.BookingRoomService = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const rooms_service_1 = __webpack_require__("./apps/backend/src/app/services/rooms.service.ts");
const repositories_1 = __webpack_require__("./apps/backend/src/app/repositories/index.ts");
const room_wishlist_service_1 = __webpack_require__("./apps/backend/src/app/services/room-wishlist.service.ts");
const devices_service_1 = __webpack_require__("./apps/backend/src/app/services/devices.service.ts");
const accounts_service_1 = __webpack_require__("./apps/backend/src/app/services/accounts.service.ts");
const room_type_service_1 = __webpack_require__("./apps/backend/src/app/services/room-type.service.ts");
const booking_room_hist_service_1 = __webpack_require__("./apps/backend/src/app/services/booking-room-hist.service.ts");
const slot_service_1 = __webpack_require__("./apps/backend/src/app/services/slot.service.ts");
const dayjs = __webpack_require__("dayjs");
const typeorm_1 = __webpack_require__("typeorm");
let BookingRoomService = BookingRoomService_1 = class BookingRoomService {
    constructor(dataSource, roomService, roomTypeService, deviceService, roomWishlistService, repository, accountService, slotService, histService) {
        this.dataSource = dataSource;
        this.roomService = roomService;
        this.roomTypeService = roomTypeService;
        this.deviceService = deviceService;
        this.roomWishlistService = roomWishlistService;
        this.repository = repository;
        this.accountService = accountService;
        this.slotService = slotService;
        this.histService = histService;
        this.logger = new common_1.Logger(BookingRoomService_1.name);
    }
    getBookingRooms(payload) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            try {
                const rooms = yield this.roomService.getAllWithoutPagination();
                const result = [];
                let counter = 1;
                for (let i = 0; i < rooms.length; i++) {
                    for (let j = 1; j <= 6; j++) {
                        result.push({
                            stt: counter++,
                            roomId: rooms[i].id,
                            roomName: rooms[i].name,
                            slot: j,
                        });
                    }
                }
                console.log(payload.search);
                console.log(result.filter((bookingRoom) => bookingRoom.roomName.includes(payload.search)));
                return result.filter((bookingRoom) => bookingRoom.roomName.includes(payload.search));
            }
            catch (e) {
                this.logger.error(e.message);
                throw new common_1.BadRequestException('Error while getting booking rooms');
            }
        });
    }
    getRequestBookingByRoomId(roomId) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.repository.getRequestBookingByRoomId(roomId);
            }
            catch (e) {
                this.logger.error(e);
                throw new common_1.BadRequestException('An error occurred while getting request by room id ' + roomId);
            }
        });
    }
    getRequestBookingByAccountId(accountId) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.repository.getRequestBookingByAccountId(accountId);
            }
            catch (e) {
                this.logger.error(e);
                throw new common_1.BadRequestException('An error occurred while getting request by account id ' + accountId);
            }
        });
    }
    getWishlistBookingRooms(roomName, slotFrom, slotTo, keycloakUser) {
        try {
            return this.roomWishlistService.findAllWishlistBookingRoomsByKeycloakUserId(roomName, slotFrom, slotTo, keycloakUser.sub);
        }
        catch (e) {
            this.logger.error(e);
            throw new common_1.BadRequestException('An error occurred while adding this room');
        }
    }
    addToBookingRoomWishlist(user, wishlist) {
        var _a;
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.roomWishlistService.addToWishlist(user.sub, wishlist);
            }
            catch (e) {
                this.logger.error(e.message);
                throw new common_1.BadRequestException((_a = e.message) !== null && _a !== void 0 ? _a : 'Error while adding to booking room wish list');
            }
        });
    }
    removeFromBookingRoomWishlist(user, payload) {
        var _a;
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.roomWishlistService.removeFromWishlist(user.account_id, payload);
            }
            catch (e) {
                this.logger.error(e.message);
                throw new common_1.BadRequestException((_a = e.message) !== null && _a !== void 0 ? _a : 'Error while removing from booking room wishlist');
            }
        });
    }
    getBookingRoomDevices(name, type, sort) {
        return this.deviceService.getBookingRoomDeviceList(name, type, sort);
    }
    getUsernameList() {
        return this.accountService.getUsernameList();
    }
    getRoomNames() {
        return this.roomService.getRoomNames();
    }
    getChoosingBookingRooms(filter) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            try {
                const payload = filter
                    ? JSON.parse(filter)
                    : {
                        roomName: {
                            name: '',
                            sort: 'ASC',
                        },
                        roomType: {
                            name: 'e6f085ec',
                            sort: 'ASC',
                        },
                    };
                if (payload.roomType.name.length > 0) {
                    const isExisted = yield this.roomTypeService.existsById(payload.roomType.name);
                    if (!isExisted) {
                        throw new common_1.BadRequestException('Room type does not exist with provided id');
                    }
                }
                return this.roomService.getRoomsFilterByNameAndType(payload);
            }
            catch (e) {
                this.logger.error(e.message);
                throw new common_1.BadRequestException(e.message);
            }
        });
    }
    getAllBookingRoomsPagination(payload) {
        try {
            return this.repository.findByPaginationPayload(payload);
        }
        catch (e) {
            this.logger.error(e.message);
            throw new common_1.BadRequestException(e.message);
        }
    }
    getBookingByRoomInWeek(payload) {
        try {
            return this.repository.getBookingByRoomInWeek(payload);
        }
        catch (e) {
            this.logger.error(e.message);
            throw new common_1.BadRequestException(e.message);
        }
    }
    getBookingByRoomInDay(roomId, requestId, date) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            try {
                return this.repository.getBookingPendingByRoomInDay(roomId, requestId, date);
            }
            catch (e) {
                this.logger.error(e.message);
                throw new common_1.BadRequestException(e.message);
            }
        });
    }
    getBookingWithSameSlot(payload) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            try {
                const slotIn = yield this.slotService.getNumOfSlot(payload.checkinSlotId);
                const slotOut = yield this.slotService.getNumOfSlot(payload.checkoutSlotId);
                const listRequestPending = yield this.getBookingByRoomInDay(payload.roomId, payload.requestId, payload.date);
                if (listRequestPending.length > 0) {
                    const listResult = listRequestPending.filter((request) => {
                        for (let j = request.slotIn; j <= request.slotOut; j++) {
                            if (j >= slotIn.slotNum && j <= slotOut.slotNum) {
                                return request;
                            }
                        }
                    });
                    return listResult;
                }
                return null;
            }
            catch (e) {
                this.logger.error(e.message);
                throw new common_1.BadRequestException(e.message);
            }
        });
    }
    getCurrentRoomBookingList(accountId) {
        try {
            return this.repository.findByCurrentBookingListAndAccountId(accountId);
        }
        catch (e) {
            this.logger.error(e.message);
            throw new common_1.BadRequestException(e.message);
        }
    }
    getCurrentRoomBookingDetail(accountId, id) {
        try {
            return this.repository.findByIdAndAccountId(accountId, id);
        }
        catch (e) {
            this.logger.error(e.message);
            throw new common_1.BadRequestException(e.message);
        }
    }
    getBookingRoomById(id) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.repository.findById(id);
            }
            catch (e) {
                this.logger.error(e.message);
                throw new common_1.BadRequestException(e.message);
            }
        });
    }
    getCountRequestBookingPending() {
        try {
            return this.repository.getCountRequestBookingPending();
        }
        catch (e) {
            this.logger.error(e.message);
            throw new common_1.BadRequestException(e.message);
        }
    }
    addNewRequest(payload, userId) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const queryRunner = this.dataSource.createQueryRunner();
            yield queryRunner.connect();
            yield queryRunner.startTransaction();
            try {
                const role = yield this.accountService.getRoleOfAccount(userId);
                const slotIn = yield this.slotService.getNumOfSlot(payload.checkinSlot);
                const slotOut = yield this.slotService.getNumOfSlot(payload.checkoutSlot);
                const listRequestPeningAndBookedInDay = yield this.repository.getBookingPendingAndBookedByDay(payload.checkinDate);
                let status = 'PENDING';
                let haveRequestBooked = false;
                if (role.role_name === 'Librarian' || role.role_name === 'System Admin') {
                    status = 'BOOKED';
                }
                if (listRequestPeningAndBookedInDay.length > 0) {
                    listRequestPeningAndBookedInDay.map((request) => tslib_1.__awaiter(this, void 0, void 0, function* () {
                        for (let j = request.slotIn; j <= request.slotOut; j++) {
                            if (j >= slotIn.slotNum && j <= slotOut.slotNum) {
                                if (request.status === 'PENDING') {
                                    // j is slot of request pending
                                    if (role.role_name === 'Librarian' ||
                                        role.role_name === 'System Admin') {
                                        this.repository.rejectById(userId, request.id, queryRunner);
                                        break;
                                    }
                                }
                                else if (request.status === 'BOOKED') {
                                    haveRequestBooked = true;
                                    break;
                                }
                            }
                        }
                    }));
                }
                if (haveRequestBooked) {
                    throw new common_1.BadRequestException('Already have request booked in this slot, try another slot');
                }
                const request = yield this.repository.createNewRequest(payload, userId, status, queryRunner);
                // await this.histService.createNew(request, queryRunner);
                yield queryRunner.commitTransaction();
                return request;
            }
            catch (e) {
                console.log("EEEEEEEEEEEEEEEE");
                this.logger.error(e.message);
                yield queryRunner.rollbackTransaction();
                throw new common_1.BadRequestException(e.message);
            }
        });
    }
    acceptById(accountId, id) {
        var _a;
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const queryRunner = this.dataSource.createQueryRunner();
            yield queryRunner.connect();
            yield queryRunner.startTransaction();
            try {
                const request = yield this.repository.findOneOrFail({
                    where: {
                        id: id,
                    },
                });
                if (!request) {
                    throw new common_1.BadRequestException('Request does not found with the provided id');
                }
                const isAccepted = yield this.repository.isAcceptById(id);
                if (isAccepted) {
                    throw new common_1.BadRequestException('Request already accepted!');
                }
                const isCancelled = yield this.repository.isCancelledById(id);
                if (isCancelled) {
                    throw new common_1.BadRequestException('Request already cancelled!');
                }
                const listRequestSameSlot = yield this.getBookingWithSameSlot({
                    roomId: request.roomId,
                    date: dayjs(request.checkinDate).format('YYYY-MM-DD'),
                    requestId: request.id,
                    checkinSlotId: request.checkinSlot,
                    checkoutSlotId: request.checkoutSlot,
                });
                listRequestSameSlot.map((request) => {
                    return this.repository.rejectById(accountId, request.id, queryRunner);
                });
                const requestAccepted = yield this.repository.acceptById(accountId, id, queryRunner);
                console.log(requestAccepted);
                // await this.histService.createNew(requestAccepted);
                yield queryRunner.commitTransaction();
                return requestAccepted;
            }
            catch (e) {
                this.logger.error(e);
                yield queryRunner.rollbackTransaction();
                throw new common_1.BadRequestException((_a = e.message) !== null && _a !== void 0 ? _a : 'Error occurred while accept request');
            }
        });
    }
    rejectById(accountId, id) {
        var _a;
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const queryRunner = this.dataSource.createQueryRunner();
            yield queryRunner.connect();
            yield queryRunner.startTransaction();
            try {
                const isExisted = yield this.repository.existsById(id);
                if (!isExisted) {
                    throw new common_1.BadRequestException('Request does not found with the provided id');
                }
                const isAccepted = yield this.repository.isAcceptById(id);
                if (isAccepted) {
                    throw new common_1.BadRequestException('Request already accepted!');
                }
                const isCancelled = yield this.repository.isCancelledById(id);
                if (isCancelled) {
                    throw new common_1.BadRequestException('Request already cancelled!');
                }
                const requestAccepted = yield this.repository.rejectById(accountId, id, queryRunner);
                console.log(requestAccepted);
                yield queryRunner.commitTransaction();
                // await this.histService.createNew(requestAccepted);
                return requestAccepted;
            }
            catch (e) {
                this.logger.error(e);
                yield queryRunner.rollbackTransaction();
                throw new common_1.BadRequestException((_a = e.message) !== null && _a !== void 0 ? _a : 'Error occurred while reject request');
            }
        });
    }
    cancelRoomBookingById(accountId, id) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const queryRunner = this.dataSource.createQueryRunner();
            yield queryRunner.connect();
            yield queryRunner.startTransaction();
            try {
                const isExisted = yield this.repository.existsById(id);
                if (!isExisted) {
                    throw new common_1.BadRequestException('Request does not found with the provided id');
                }
                const isAccepted = yield this.repository.isAcceptById(id);
                if (isAccepted) {
                    throw new common_1.BadRequestException('Request already accepted!');
                }
                const isCancelled = yield this.repository.isCancelledById(id);
                if (isCancelled) {
                    throw new common_1.BadRequestException('Request already cancelled!');
                }
                const role = yield this.accountService.getRoleOfAccount(accountId);
                const request = yield this.repository.cancelRoomBookingById(accountId, id, role.role_name, queryRunner);
                yield queryRunner.commitTransaction();
                return request;
            }
            catch (e) {
                this.logger.error(e.message);
                yield queryRunner.rollbackTransaction();
                throw new common_1.BadRequestException(e.message);
            }
        });
    }
};
BookingRoomService = BookingRoomService_1 = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof typeorm_1.DataSource !== "undefined" && typeorm_1.DataSource) === "function" ? _a : Object, typeof (_b = typeof rooms_service_1.RoomsService !== "undefined" && rooms_service_1.RoomsService) === "function" ? _b : Object, typeof (_c = typeof room_type_service_1.RoomTypeService !== "undefined" && room_type_service_1.RoomTypeService) === "function" ? _c : Object, typeof (_d = typeof devices_service_1.DevicesService !== "undefined" && devices_service_1.DevicesService) === "function" ? _d : Object, typeof (_e = typeof room_wishlist_service_1.RoomWishlistService !== "undefined" && room_wishlist_service_1.RoomWishlistService) === "function" ? _e : Object, typeof (_f = typeof repositories_1.BookingRoomRepository !== "undefined" && repositories_1.BookingRoomRepository) === "function" ? _f : Object, typeof (_g = typeof accounts_service_1.AccountsService !== "undefined" && accounts_service_1.AccountsService) === "function" ? _g : Object, typeof (_h = typeof slot_service_1.SlotService !== "undefined" && slot_service_1.SlotService) === "function" ? _h : Object, typeof (_j = typeof booking_room_hist_service_1.BookingRequestHistService !== "undefined" && booking_room_hist_service_1.BookingRequestHistService) === "function" ? _j : Object])
], BookingRoomService);
exports.BookingRoomService = BookingRoomService;


/***/ }),

/***/ "./apps/backend/src/app/services/cloudinary.service.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CloudinaryService = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const Cloudinary = __webpack_require__("cloudinary");
const config_1 = __webpack_require__("@nestjs/config");
const constants_1 = __webpack_require__("./libs/constants/src/index.ts");
const streamifier = __webpack_require__("streamifier");
const cloudinary = Cloudinary.v2;
const cloudinaryUploader = cloudinary.uploader;
let CloudinaryService = class CloudinaryService {
    constructor(configService) {
        this.configService = configService;
    }
    onModuleInit() {
        cloudinary.config({
            api_key: this.configService.get(constants_1.Environment.cloudinary.apiKey),
            api_secret: this.configService.get(constants_1.Environment.cloudinary.apiSecret),
            cloud_name: this.configService.get(constants_1.Environment.cloudinary.name),
            secure: this.configService.get(constants_1.Environment.cloudinary.secure)
        });
    }
    uploadImageAndGetURL(imagePayload, id) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const uploadResult = yield cloudinaryUploader.upload_stream({
                access_mode: "public",
                use_filename: true,
                unique_filename: false,
                filename_override: id,
                folder: "accountsAvatar",
                async: true,
                overwrite: true
            }, (err, result) => {
                return result.url;
            });
            yield streamifier.createReadStream(imagePayload).pipe(uploadResult);
            return id;
        });
    }
    getImageURLByFileName(id) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const data = cloudinary.url(id);
            const url = data.substring(0, data.lastIndexOf("/") + 1);
            const fileName = data.substring(data.lastIndexOf("/") + 1, data.length);
            return url + "accountsAvatar/" + fileName;
        });
    }
};
CloudinaryService = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof config_1.ConfigService !== "undefined" && config_1.ConfigService) === "function" ? _a : Object])
], CloudinaryService);
exports.CloudinaryService = CloudinaryService;


/***/ }),

/***/ "./apps/backend/src/app/services/device-type-hist.service.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.DeviceTypeHistService = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const device_type_hist_repository_1 = __webpack_require__("./apps/backend/src/app/repositories/device-type-hist.repository.ts");
let DeviceTypeHistService = class DeviceTypeHistService {
    constructor(repository) {
        this.repository = repository;
    }
    createNew(deviceType) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return this.repository.createNew(deviceType);
        });
    }
    deleteAllHist(id) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return this.repository.deleteAllHist(id);
        });
    }
};
DeviceTypeHistService = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof device_type_hist_repository_1.DeviceTypeHistRepository !== "undefined" && device_type_hist_repository_1.DeviceTypeHistRepository) === "function" ? _a : Object])
], DeviceTypeHistService);
exports.DeviceTypeHistService = DeviceTypeHistService;


/***/ }),

/***/ "./apps/backend/src/app/services/device-type.service.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var DeviceTypeService_1, _a, _b, _c;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.DeviceTypeService = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const device_type_repository_1 = __webpack_require__("./apps/backend/src/app/repositories/device-type.repository.ts");
const device_type_hist_service_1 = __webpack_require__("./apps/backend/src/app/services/device-type-hist.service.ts");
const devices_service_1 = __webpack_require__("./apps/backend/src/app/services/devices.service.ts");
let DeviceTypeService = DeviceTypeService_1 = class DeviceTypeService {
    constructor(repository, deviceService, histService) {
        this.repository = repository;
        this.deviceService = deviceService;
        this.histService = histService;
        this.logger = new common_1.Logger(DeviceTypeService_1.name);
    }
    getAllDeviceTypes(param) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.repository.findByPagination(param);
            }
            catch (e) {
                this.logger.error(e);
                throw new common_1.BadRequestException(e.message);
            }
        });
    }
    getDeviceTypeNames() {
        try {
            return this.repository.findDeviceTypeName();
        }
        catch (e) {
            this.logger.error(e.message);
            throw new common_1.BadRequestException(e.message);
        }
    }
    getDeviceTypeById(id) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            try {
                const isExisted = yield this.repository.existsById(id);
                if (!isExisted) {
                    throw new common_1.BadRequestException('Device type does not found with the provided id');
                }
                const data = yield this.repository.findById(id);
                if (data === undefined) {
                    throw new common_1.BadRequestException('This device type is already deleted');
                }
                return data;
            }
            catch (e) {
                this.logger.error(e);
                throw new common_1.BadRequestException(e.message);
            }
        });
    }
    addNewDeviceType(accountId, payload) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            try {
                const deviceType = yield this.repository.addNew(accountId, payload);
                yield this.histService.createNew(deviceType);
                return deviceType;
            }
            catch (e) {
                this.logger.error(e);
                throw new common_1.BadRequestException(e.message);
            }
        });
    }
    updateDeviceTypeById(accountId, id, payload) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            try {
                const isExisted = yield this.repository.existsById(id);
                if (!isExisted) {
                    throw new common_1.BadRequestException('Device type does not found with the provided id');
                }
                const data = yield this.repository.findById(id);
                if (data === undefined) {
                    throw new common_1.BadRequestException('This device type is already deleted');
                }
                const deviceType = yield this.repository.updateById(accountId, id, payload);
                yield this.histService.createNew(deviceType);
                return deviceType;
            }
            catch (e) {
                this.logger.error(e);
                throw new common_1.BadRequestException(e.message);
            }
        });
    }
    deleteDeviceTypeById(accountId, id) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            try {
                const isExisted = yield this.repository.existsById(id);
                if (!isExisted) {
                    throw new common_1.BadRequestException('Device type does not found with the provided id');
                }
                const data = yield this.repository.findById(id);
                if (data === undefined) {
                    throw new common_1.BadRequestException('This type is already deleted');
                }
                const listDeviceOfThisType = yield this.deviceService.getDevicesByDeviceType(id);
                if (listDeviceOfThisType !== undefined &&
                    listDeviceOfThisType.length > 0) {
                    throw new common_1.BadRequestException('There are still device of this type, please change the type of those devices before deleting type');
                }
                else {
                    const deviceType = yield this.repository.deleteById(accountId, id);
                    yield this.histService.createNew(deviceType);
                    return deviceType;
                }
            }
            catch (e) {
                this.logger.error(e);
                throw new common_1.BadRequestException(e.message);
            }
        });
    }
    getDeletedDeviceTypes(search) {
        try {
            return this.repository.findDeletedByPagination(search);
        }
        catch (e) {
            this.logger.error(e.message);
            throw new common_1.BadRequestException(e.message);
        }
    }
    restoreDeletedDeviceTypeById(accountId, id) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            try {
                const isExisted = yield this.repository.existsById(id);
                if (!isExisted) {
                    throw new common_1.BadRequestException('Device type does not found with the provided id');
                }
                const data = yield this.repository.findById(id);
                if (data !== undefined) {
                    throw new common_1.BadRequestException('This device type ID is now active. Cannot restore it');
                }
                const deviceType = yield this.repository.restoreDeletedById(accountId, id);
                yield this.histService.createNew(deviceType);
                return deviceType;
            }
            catch (e) {
                this.logger.error(e.message);
                throw new common_1.BadRequestException(e.message);
            }
        });
    }
    permanentlyDeleteDeviceTypeById(id) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            try {
                const isExisted = yield this.repository.existsById(id);
                if (!isExisted) {
                    throw new common_1.BadRequestException('Device type does not found with the provided id');
                }
                const data = yield this.repository.findById(id);
                if (data !== undefined) {
                    throw new common_1.BadRequestException('Please delete this type after permanently delete');
                }
                else {
                    yield this.histService.deleteAllHist(id);
                    return this.repository.permanentlyDeleteById(id);
                }
            }
            catch (e) {
                this.logger.error(e.message);
                throw new common_1.BadRequestException(e.message);
            }
        });
    }
};
DeviceTypeService = DeviceTypeService_1 = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof device_type_repository_1.DeviceTypeRepository !== "undefined" && device_type_repository_1.DeviceTypeRepository) === "function" ? _a : Object, typeof (_b = typeof devices_service_1.DevicesService !== "undefined" && devices_service_1.DevicesService) === "function" ? _b : Object, typeof (_c = typeof device_type_hist_service_1.DeviceTypeHistService !== "undefined" && device_type_hist_service_1.DeviceTypeHistService) === "function" ? _c : Object])
], DeviceTypeService);
exports.DeviceTypeService = DeviceTypeService;


/***/ }),

/***/ "./apps/backend/src/app/services/devices-hist.service.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.DeviceHistService = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const repositories_1 = __webpack_require__("./apps/backend/src/app/repositories/index.ts");
let DeviceHistService = class DeviceHistService {
    constructor(repository) {
        this.repository = repository;
    }
    createNew(device) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return this.repository.createNew(device);
        });
    }
};
DeviceHistService = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof repositories_1.DeviceHistRepository !== "undefined" && repositories_1.DeviceHistRepository) === "function" ? _a : Object])
], DeviceHistService);
exports.DeviceHistService = DeviceHistService;


/***/ }),

/***/ "./apps/backend/src/app/services/devices.service.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var DevicesService_1, _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.DevicesService = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const devices_repository_1 = __webpack_require__("./apps/backend/src/app/repositories/devices.repository.ts");
const devices_hist_service_1 = __webpack_require__("./apps/backend/src/app/services/devices-hist.service.ts");
let DevicesService = DevicesService_1 = class DevicesService {
    constructor(repository, histService) {
        this.repository = repository;
        this.histService = histService;
        this.logger = new common_1.Logger(DevicesService_1.name);
    }
    getAll(request) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield this.repository.searchDevices(request);
                return result;
            }
            catch (e) {
                this.logger.error(e);
                throw new common_1.BadRequestException('One or more parameters is invalid');
            }
        });
    }
    getDevicesByDeviceType(deviceTypeId) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.repository.getDevicesByDeviceType(deviceTypeId);
            }
            catch (e) {
                this.logger.error(e);
                throw new common_1.BadRequestException('An error occurred while getting rooms by type ' + deviceTypeId);
            }
        });
    }
    getDeviceNames() {
        try {
            return this.repository.findDeviceName();
        }
        catch (e) {
            this.logger.error(e.message);
            throw new common_1.BadRequestException(e.message);
        }
    }
    findById(id) {
        var _a;
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            try {
                const isExisted = yield this.repository.existsById(id);
                if (!isExisted) {
                    throw new common_1.BadRequestException('Device does not found with the provided id');
                }
                const result = yield this.repository.findById(id);
                if (!result) {
                    throw new common_1.BadRequestException('This device is already deleted or disabled');
                }
                return result;
            }
            catch (e) {
                this.logger.error(e);
                throw new common_1.BadRequestException((_a = e.message) !== null && _a !== void 0 ? _a : 'An error occurred while retrieving this Device');
            }
        });
    }
    add(payload, userId) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const isExisted = yield this.repository.isExistedByName(payload.name);
            if (isExisted) {
                throw new common_1.BadRequestException('Device name is duplicated!');
            }
            try {
                const deviceAdded = yield this.repository.createNewDevice(payload, userId);
                yield this.histService.createNew(deviceAdded);
                return deviceAdded;
            }
            catch (e) {
                this.logger.error(e.message);
                if (e.message.includes('constraint') &&
                    e.message.includes('devices_device_type_id_fk')) {
                    throw new common_1.BadRequestException('There is no device type with the provided id');
                }
                throw new common_1.BadRequestException('Error while creating a new device');
            }
        });
    }
    // addAll(models: any[]): Promise<any[]> {
    //   return Promise.resolve([]);
    // }
    updateById(accountId, id, body) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const isExisted = yield this.repository.existsById(id);
            if (!isExisted) {
                throw new common_1.BadRequestException('Device does not found with the provided id');
            }
            const data = yield this.repository.findById(id);
            if (data === undefined) {
                throw new common_1.BadRequestException('This device is already deleted or disabled');
            }
            try {
                const deviceUpdated = yield this.repository.updateById(accountId, id, body);
                yield this.histService.createNew(deviceUpdated);
                return deviceUpdated;
            }
            catch (e) {
                this.logger.error(e);
                if (e.message.includes('constraint') &&
                    e.message.includes('devices_device_type_id_fk')) {
                    throw new common_1.BadRequestException('There is no device type with the provided id');
                }
                throw new common_1.BadRequestException(e.message);
            }
        });
    }
    disableById(accountId, id) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            try {
                const isExisted = yield this.repository.existsById(id);
                if (!isExisted) {
                    throw new common_1.BadRequestException('Device does not found with the provided id');
                }
                const isDisabled = yield this.repository.checkIfDeviceIsDisabledById(id);
                if (isDisabled) {
                    throw new common_1.BadRequestException('This device is already disabled');
                }
                const isDeleted = yield this.repository.checkIfDeviceIsDeletedById(id);
                if (isDeleted) {
                    throw new common_1.BadRequestException('This device is already deleted, can not disable');
                }
                const device = yield this.repository.disableById(accountId, id);
                yield this.histService.createNew(device);
                return device;
            }
            catch (e) {
                this.logger.error(e.message);
                throw new common_1.BadRequestException(e.message);
            }
        });
    }
    getDisabledDevices(search) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.repository.getDisabledDevices(search);
            }
            catch (e) {
                this.logger.error(e.message);
                throw new common_1.BadRequestException('Error while disabling this device');
            }
        });
    }
    handleRestoreDisabledDeviceById(accountId, id) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            try {
                const isExisted = yield this.repository.existsById(id);
                if (!isExisted) {
                    throw new common_1.BadRequestException('Device does not found with the provided id');
                }
                const isDeleted = yield this.repository.checkIfDeviceIsDeletedById(id);
                if (isDeleted) {
                    throw new common_1.BadRequestException('This device is already deleted');
                }
                const isDisabled = yield this.repository.checkIfDeviceIsDisabledById(id);
                if (!isDisabled) {
                    throw new common_1.BadRequestException('This device ID is now active. Cannot restore it');
                }
                const device = yield this.repository.restoreDisabledDeviceById(accountId, id);
                yield this.histService.createNew(device);
                return device;
            }
            catch (e) {
                this.logger.error(e.message);
                throw new common_1.BadRequestException(e.message);
            }
        });
    }
    deleteById(accountId, id) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            try {
                const isExisted = yield this.repository.existsById(id);
                if (!isExisted) {
                    throw new common_1.BadRequestException('Device does not found with the provided id');
                }
                const isDeleted = yield this.repository.checkIfDeviceIsDeletedById(id);
                if (isDeleted) {
                    throw new common_1.BadRequestException('This device is already deleted');
                }
                const device = yield this.repository.deleteById(accountId, id);
                yield this.histService.createNew(device);
                return device;
            }
            catch (e) {
                this.logger.error(e.message);
                throw new common_1.BadRequestException(e.message);
            }
        });
    }
    getDeletedDevices(search) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.repository.getDeletedDevices(search);
            }
            catch (e) {
                this.logger.error(e.message);
                throw new common_1.BadRequestException('Error while get deleted devices');
            }
        });
    }
    handleRestoreDeletedDeviceById(id) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            try {
                const isExisted = yield this.repository.existsById(id);
                if (!isExisted) {
                    throw new common_1.BadRequestException('Device does not found with the provided id');
                }
                const isDisabled = yield this.repository.checkIfDeviceIsDisabledById(id);
                if (isDisabled) {
                    throw new common_1.BadRequestException('This device is already disabled');
                }
                const isDeleted = yield this.repository.checkIfDeviceIsDeletedById(id);
                if (!isDeleted) {
                    throw new common_1.BadRequestException('This device ID is now active. Cannot restore it');
                }
                const device = yield this.repository.restoreDeletedDeviceById(id);
                yield this.histService.createNew(device);
                return device;
            }
            catch (e) {
                this.logger.error(e.message);
                throw new common_1.BadRequestException(e.message);
            }
        });
    }
    getBookingRoomDeviceList(name, type, sort) {
        if (!sort)
            sort = 'ASC';
        if (sort !== 'ASC' && sort !== 'DESC') {
            sort = 'ASC';
        }
        return this.repository.findDeviceListByBookingRoomRequest(name, type, sort);
    }
};
DevicesService = DevicesService_1 = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof devices_repository_1.DevicesRepository !== "undefined" && devices_repository_1.DevicesRepository) === "function" ? _a : Object, typeof (_b = typeof devices_hist_service_1.DeviceHistService !== "undefined" && devices_hist_service_1.DeviceHistService) === "function" ? _b : Object])
], DevicesService);
exports.DevicesService = DevicesService;


/***/ }),

/***/ "./apps/backend/src/app/services/index.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__("tslib");
tslib_1.__exportStar(__webpack_require__("./apps/backend/src/app/services/accounts.service.ts"), exports);
tslib_1.__exportStar(__webpack_require__("./apps/backend/src/app/services/authentication.service.ts"), exports);
tslib_1.__exportStar(__webpack_require__("./apps/backend/src/app/services/app.service.ts"), exports);
tslib_1.__exportStar(__webpack_require__("./apps/backend/src/app/services/base.service.ts"), exports);
tslib_1.__exportStar(__webpack_require__("./apps/backend/src/app/services/booking-room.service.ts"), exports);
tslib_1.__exportStar(__webpack_require__("./apps/backend/src/app/services/cloudinary.service.ts"), exports);
tslib_1.__exportStar(__webpack_require__("./apps/backend/src/app/services/devices-hist.service.ts"), exports);
tslib_1.__exportStar(__webpack_require__("./apps/backend/src/app/services/devices.service.ts"), exports);
tslib_1.__exportStar(__webpack_require__("./apps/backend/src/app/services/keycloak.service.ts"), exports);
tslib_1.__exportStar(__webpack_require__("./apps/backend/src/app/services/room-wishlist.service.ts"), exports);
tslib_1.__exportStar(__webpack_require__("./apps/backend/src/app/services/rooms.service.ts"), exports);
tslib_1.__exportStar(__webpack_require__("./apps/backend/src/app/services/users-warning-flag.service.ts"), exports);
tslib_1.__exportStar(__webpack_require__("./apps/backend/src/app/services/users-otp.service.ts"), exports);
tslib_1.__exportStar(__webpack_require__("./apps/backend/src/app/services/users-warning-flag-hist.service.ts"), exports);


/***/ }),

/***/ "./apps/backend/src/app/services/keycloak.service.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var KeycloakService_1, _a, _b, _c;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.KeycloakService = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const axios_1 = __webpack_require__("@nestjs/axios");
const rxjs_1 = __webpack_require__("rxjs");
const config_1 = __webpack_require__("@nestjs/config");
const core_1 = __webpack_require__("@nestjs/core");
const constants_1 = __webpack_require__("./libs/constants/src/index.ts");
let KeycloakService = KeycloakService_1 = class KeycloakService {
    constructor(configService, httpService, httpRequest) {
        this.configService = configService;
        this.httpService = httpService;
        this.httpRequest = httpRequest;
        this.logger = new common_1.Logger(KeycloakService_1.name);
        this.keycloakHost = this.configService.get(constants_1.Environment.keycloak.host);
        this.keycloakPort = this.configService.get(constants_1.Environment.keycloak.port);
        this.keycloakRealm = this.configService.get(constants_1.Environment.keycloak.client.realm);
        this.grantTypePassword = this.configService.get(constants_1.Environment.keycloak.grant_type.password);
        this.clientId = this.configService.get(constants_1.Environment.keycloak.client.id);
        this.masterUsername = this.configService.get(constants_1.Environment.keycloak.master_username);
        this.masterPassword = this.configService.get(constants_1.Environment.keycloak.master_password);
        this.grantTypeRefreshToken = this.configService.get(constants_1.Environment.keycloak.grant_type.refresh_token);
        this.grantTypeTokenExchange = this.configService.get(constants_1.Environment.keycloak.grant_type.token_exchange);
        this.clientSecret = this.configService.get(constants_1.Environment.keycloak.client.secret);
    }
    getAuthenticationTokenByMasterAccount(keycloakId) {
        var _a;
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const { access_token } = yield this.signInToKeycloak(this.masterUsername, this.masterPassword);
            const url = `http://${this.keycloakHost}:${this.keycloakPort}/auth/realms/${this.keycloakRealm}/protocol/openid-connect/token`;
            const payload = new URLSearchParams({
                grant_type: this.grantTypeTokenExchange,
                client_id: this.clientId,
                client_secret: this.clientSecret,
                audience: this.clientId,
                requested_subject: keycloakId,
                subject_token: access_token,
                requested_token_type: this.grantTypeRefreshToken,
            });
            const config = {
                headers: {
                    'Content-Type': constants_1.APPLICATION_X_WWW_FORM_URLENCODED,
                },
            };
            try {
                const response = yield (0, rxjs_1.lastValueFrom)(this.httpService.post(url, payload, config));
                return response.data;
            }
            catch (e) {
                this.logger.error(e.message);
                throw new common_1.HttpException((_a = e.response) === null || _a === void 0 ? void 0 : _a.data['error_description'], common_1.HttpStatus.UNAUTHORIZED);
            }
        });
    }
    countUsers(token) {
        const COUNT_USERS_URI = 'http://localhost:8080/auth/admin/realms/authentication/users/count';
        try {
            return this.httpService
                .get(COUNT_USERS_URI, {
                headers: {
                    Authorization: token,
                },
            })
                .pipe((0, rxjs_1.map)((e) => e.data));
        }
        catch (e) {
            this.logger.error(e.message);
            throw new common_1.BadRequestException(e.message);
        }
    }
    getAllUsers(token) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const USERS_URI = 'http://localhost:9090/auth/admin/realms/authentication/users';
            try {
                return yield (0, rxjs_1.lastValueFrom)(this.httpService
                    .get(USERS_URI, {
                    headers: {
                        Authorization: token,
                    },
                })
                    .pipe((0, rxjs_1.map)((e) => e.data)));
            }
            catch (e) {
                this.logger.error(e.message);
                throw new common_1.BadRequestException(e.message);
            }
        });
    }
    signInToKeycloak(username, password) {
        var _a;
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const url = `http://${this.keycloakHost}:${this.keycloakPort}/auth/realms/${this.keycloakRealm}/protocol/openid-connect/token`;
            const signInPayload = new URLSearchParams({
                client_id: this.configService.get(constants_1.Environment.keycloak.client.id),
                client_secret: this.configService.get(constants_1.Environment.keycloak.client.secret),
                grant_type: this.configService.get(constants_1.Environment.keycloak.grant_type.password),
                username: username,
                password: password,
            });
            try {
                const response = yield (0, rxjs_1.lastValueFrom)(this.httpService.post(url, signInPayload, {
                    headers: {
                        'Content-Type': constants_1.APPLICATION_X_WWW_FORM_URLENCODED,
                    },
                }));
                return response.data;
            }
            catch (e) {
                this.logger.error(e.response.data);
                throw new common_1.HttpException((_a = e.response) === null || _a === void 0 ? void 0 : _a.data['error_description'], common_1.HttpStatus.UNAUTHORIZED);
            }
        });
    }
    getUserByUsername(username, accessToken) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const token = accessToken !== null && accessToken !== void 0 ? accessToken : this.httpRequest.headers['authorization'];
            const url = `http://${this.keycloakHost}:${this.keycloakPort}/auth/admin/realms/${this.keycloakRealm}/users?username=${username}`;
            try {
                const response = yield (0, rxjs_1.lastValueFrom)(this.httpService.get(url, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }));
                return response.data[0];
            }
            catch (e) {
                this.logger.error(e.message);
                throw new common_1.UnauthorizedException('Invalid credentials');
            }
        });
    }
    getUserById(authToken, id) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const URL = `http://${this.keycloakHost}:${this.keycloakPort}/auth/admin/realms/${this.keycloakRealm}/users/${id}`;
            try {
                const resp = yield (0, rxjs_1.lastValueFrom)(this.httpService.get(URL, {
                    headers: {
                        Authorization: authToken,
                    },
                }));
                return resp.data;
            }
            catch (e) {
                this.logger.error(e.message);
                throw new common_1.ForbiddenException(e.message);
            }
        });
    }
    createKeycloakUser(header, user) {
        try {
            return Promise.resolve();
        }
        catch (e) {
            this.logger.error(e.message);
            throw new common_1.BadRequestException(e.message);
        }
    }
    resetKeycloakUserById(req, id, rawPasswword) {
        try {
            return Promise.resolve();
        }
        catch (e) {
            this.logger.error(e.message);
            throw new common_1.BadRequestException(e.message);
        }
    }
    signOutKeycloakUser(header, id) {
        try {
            return Promise.resolve();
        }
        catch (e) {
            this.logger.error(e.message);
            throw new common_1.BadRequestException(e.message);
        }
    }
    refreshAccessToken(payload) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const URL = `http://${this.keycloakHost}:${this.keycloakPort}/auth/realms/${this.keycloakRealm}/protocol/openid-connect/token`;
            console.log(payload.refreshToken);
            const refreshTokenPayload = new URLSearchParams({
                client_id: this.configService.get(constants_1.Environment.keycloak.client.id),
                client_secret: this.configService.get(constants_1.Environment.keycloak.client.secret),
                grant_type: this.configService.get(constants_1.Environment.keycloak.grant_type.native_refresh_token),
                refresh_token: payload.refreshToken,
            });
            try {
                const response = yield (0, rxjs_1.lastValueFrom)(this.httpService
                    .post(URL, refreshTokenPayload, {
                    headers: {
                        'Content-Type': constants_1.APPLICATION_X_WWW_FORM_URLENCODED,
                    },
                })
                    .pipe((0, rxjs_1.map)((e) => e.data)));
                return {
                    accessToken: response['access_token'],
                    refreshToken: response['refresh_token'],
                };
            }
            catch (e) {
                this.logger.error(e.response.data);
                throw new common_1.BadRequestException(e.response.data);
            }
        });
    }
    getUserInfo(accessToken) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            if (!accessToken.includes('Bearer')) {
                accessToken = `Bearer ${accessToken}`;
            }
            try {
                const URL = `http://${this.keycloakHost}:${this.keycloakPort}/auth/realms/${this.keycloakRealm}/protocol/openid-connect/userinfo`;
                const response = yield (0, rxjs_1.lastValueFrom)(this.httpService.get(URL, {
                    headers: {
                        Authorization: accessToken,
                    },
                }));
                return response.data;
            }
            catch (e) {
                this.logger.error(e.response.data);
                throw new common_1.UnauthorizedException('Invalid user credentials');
            }
        });
    }
    changePasswordByKeycloakId(keycloakId, password) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            try {
                const { access_token } = yield this.signInToKeycloak(this.masterUsername, this.masterPassword);
                const URL = `http://${this.keycloakHost}:${this.keycloakPort}/auth/admin/realms/${this.keycloakRealm}/users/${keycloakId}/reset-password`;
                return yield (0, rxjs_1.lastValueFrom)(this.httpService
                    .put(URL, {
                    value: password,
                }, {
                    headers: {
                        Authorization: `Bearer ${access_token}`,
                    },
                })
                    .pipe((0, rxjs_1.map)((e) => e.data)));
            }
            catch (e) {
                this.logger.error(e.message);
                throw new common_1.BadRequestException(e.message);
            }
        });
    }
};
KeycloakService = KeycloakService_1 = tslib_1.__decorate([
    (0, common_1.Injectable)({
        scope: common_1.Scope.REQUEST,
    }),
    tslib_1.__param(2, (0, common_1.Inject)(core_1.REQUEST)),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof config_1.ConfigService !== "undefined" && config_1.ConfigService) === "function" ? _a : Object, typeof (_b = typeof axios_1.HttpService !== "undefined" && axios_1.HttpService) === "function" ? _b : Object, typeof (_c = typeof Request !== "undefined" && Request) === "function" ? _c : Object])
], KeycloakService);
exports.KeycloakService = KeycloakService;


/***/ }),

/***/ "./apps/backend/src/app/services/role-hist.service.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.RoleHistService = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const role_hist_repository_1 = __webpack_require__("./apps/backend/src/app/repositories/role-hist.repository.ts");
let RoleHistService = class RoleHistService {
    constructor(repository) {
        this.repository = repository;
    }
    createNew(role) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return this.repository.createNew(role);
        });
    }
    deleteAllHist(id) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return this.repository.deleteAllHist(id);
        });
    }
};
RoleHistService = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof role_hist_repository_1.RoleHistRepository !== "undefined" && role_hist_repository_1.RoleHistRepository) === "function" ? _a : Object])
], RoleHistService);
exports.RoleHistService = RoleHistService;


/***/ }),

/***/ "./apps/backend/src/app/services/role.service.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var RoleService_1, _a, _b, _c;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.RoleService = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const roles_repository_1 = __webpack_require__("./apps/backend/src/app/repositories/roles.repository.ts");
const role_hist_service_1 = __webpack_require__("./apps/backend/src/app/services/role-hist.service.ts");
const accounts_service_1 = __webpack_require__("./apps/backend/src/app/services/accounts.service.ts");
let RoleService = RoleService_1 = class RoleService {
    constructor(repository, accountService, histService) {
        this.repository = repository;
        this.accountService = accountService;
        this.histService = histService;
        this.logger = new common_1.Logger(RoleService_1.name);
    }
    getRolesByPagination(payload) {
        try {
            return this.repository.findByPagination(payload);
        }
        catch (e) {
            this.logger.error(e);
            throw new common_1.BadRequestException(e.message);
        }
    }
    getRoleNames() {
        try {
            return this.repository.findRoleName();
        }
        catch (e) {
            this.logger.error(e.message);
            throw new common_1.BadRequestException(e.message);
        }
    }
    getRoleById(id) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            try {
                const isExisted = yield this.repository.existsById(id);
                if (!isExisted) {
                    throw new common_1.BadRequestException('Role does not found with the provided id');
                }
                const data = yield this.repository.findById(id);
                if (data === undefined) {
                    throw new common_1.BadRequestException('This role is already deleted');
                }
                return data;
            }
            catch (e) {
                this.logger.error(e.message);
                throw new common_1.BadRequestException(e.message);
            }
        });
    }
    addRole(body, accountId) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const isExisted = yield this.repository.isExistedByName(body.name);
            if (isExisted) {
                throw new common_1.BadRequestException('Role name is duplicated!');
            }
            else {
                const role = yield this.repository.addNew(accountId, body);
                yield this.histService.createNew(role);
                return role;
            }
        });
    }
    updateRoleById(accountId, payload, id) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            try {
                const isExisted = yield this.repository.existsById(id);
                if (!isExisted) {
                    throw new common_1.BadRequestException('Role does not found with the provided id');
                }
                const data = yield this.repository.findById(id);
                if (data === undefined) {
                    throw new common_1.BadRequestException('This role is already deleted or disabled');
                }
                const role = yield this.repository.updateById(id, accountId, payload);
                yield this.histService.createNew(role);
                return role;
            }
            catch (e) {
                this.logger.error(e.message);
                throw new common_1.BadRequestException(e.message);
            }
        });
    }
    deleteRoleById(accountId, id) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield this.repository.findById(id);
                const lisyAccountOfThisRole = yield this.accountService.getAccountsByRoleId(id);
                if (data === undefined) {
                    throw new common_1.BadRequestException('This role is already deleted');
                }
                else if (lisyAccountOfThisRole !== undefined &&
                    lisyAccountOfThisRole.length > 0) {
                    throw new common_1.BadRequestException('There are still account of this type, please change the type of those accounts before deleting role');
                }
                else {
                    const role = yield this.repository.deleteById(accountId, id);
                    yield this.histService.createNew(role);
                    return role;
                }
            }
            catch (e) {
                this.logger.error(e.message);
                throw new common_1.BadRequestException(e.message);
            }
        });
    }
    getDeletedRoles(search) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.repository.getDeletedRoles(search);
            }
            catch (e) {
                this.logger.error(e.message);
                throw new common_1.BadRequestException('Error while delete this role');
            }
        });
    }
    handleRestoreDeletedRoleById(accountId, id) {
        var _a;
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            try {
                const isExisted = yield this.repository.existsById(id);
                if (!isExisted) {
                    throw new common_1.BadRequestException('Role does not exist with the provided id');
                }
                const data = yield this.repository.findById(id);
                if (data !== undefined) {
                    throw new common_1.BadRequestException('This Role ID is now active. Cannot restore it');
                }
                const role = yield this.repository.restoreDeletedById(accountId, id);
                yield this.histService.createNew(role);
                return role;
            }
            catch (e) {
                this.logger.error(e);
                throw new common_1.BadRequestException((_a = e.message) !== null && _a !== void 0 ? _a : 'Error occurred while restore the delete status of this role');
            }
        });
    }
    permanentDeleteRoleById(id) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield this.repository.findById(id);
                if (data !== undefined) {
                    throw new common_1.BadRequestException('Please delete this role after permanently delete');
                }
                else {
                    yield this.histService.deleteAllHist(id);
                    return this.repository.permanentlyDeleteById(id);
                }
            }
            catch (e) {
                this.logger.error(e.message);
                throw new common_1.BadRequestException(e.message);
            }
        });
    }
};
RoleService = RoleService_1 = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof roles_repository_1.RolesRepository !== "undefined" && roles_repository_1.RolesRepository) === "function" ? _a : Object, typeof (_b = typeof accounts_service_1.AccountsService !== "undefined" && accounts_service_1.AccountsService) === "function" ? _b : Object, typeof (_c = typeof role_hist_service_1.RoleHistService !== "undefined" && role_hist_service_1.RoleHistService) === "function" ? _c : Object])
], RoleService);
exports.RoleService = RoleService;


/***/ }),

/***/ "./apps/backend/src/app/services/room-hist.service.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.RoomHistService = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const room_hist_repository_1 = __webpack_require__("./apps/backend/src/app/repositories/room-hist.repository.ts");
let RoomHistService = class RoomHistService {
    constructor(repository) {
        this.repository = repository;
    }
    createNew(room) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return this.repository.createNew(room);
        });
    }
};
RoomHistService = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof room_hist_repository_1.RoomHistRepository !== "undefined" && room_hist_repository_1.RoomHistRepository) === "function" ? _a : Object])
], RoomHistService);
exports.RoomHistService = RoomHistService;


/***/ }),

/***/ "./apps/backend/src/app/services/room-type-hist.service.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.RoomTypeHistService = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const room_type_hist_repository_1 = __webpack_require__("./apps/backend/src/app/repositories/room-type-hist.repository.ts");
let RoomTypeHistService = class RoomTypeHistService {
    constructor(repository) {
        this.repository = repository;
    }
    createNew(roomType) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return this.repository.createNew(roomType);
        });
    }
    deleteAllHist(id) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return this.repository.deleteAllHist(id);
        });
    }
};
RoomTypeHistService = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof room_type_hist_repository_1.RoomTypeHistRepository !== "undefined" && room_type_hist_repository_1.RoomTypeHistRepository) === "function" ? _a : Object])
], RoomTypeHistService);
exports.RoomTypeHistService = RoomTypeHistService;


/***/ }),

/***/ "./apps/backend/src/app/services/room-type.service.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var RoomTypeService_1, _a, _b, _c;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.RoomTypeService = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const room_type_repository_1 = __webpack_require__("./apps/backend/src/app/repositories/room-type.repository.ts");
const room_type_hist_service_1 = __webpack_require__("./apps/backend/src/app/services/room-type-hist.service.ts");
const rooms_service_1 = __webpack_require__("./apps/backend/src/app/services/rooms.service.ts");
let RoomTypeService = RoomTypeService_1 = class RoomTypeService {
    constructor(repository, roomService, histService) {
        this.repository = repository;
        this.roomService = roomService;
        this.histService = histService;
        this.logger = new common_1.Logger(RoomTypeService_1.name);
    }
    existsById(id) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield this.repository.existsById(id);
        });
    }
    getRoomTypesWithPagination(pagination) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.repository.findRoomTypesByPagination(pagination);
            }
            catch (e) {
                this.logger.error(e.message);
                throw new common_1.BadRequestException(e.message);
            }
        });
    }
    getRoomTypeNames() {
        try {
            return this.repository.findRoomTypeName();
        }
        catch (e) {
            this.logger.error(e.message);
            throw new common_1.BadRequestException(e.message);
        }
    }
    getRoomTypeById(id) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            try {
                const isExisted = yield this.repository.existsById(id);
                if (!isExisted) {
                    throw new common_1.BadRequestException('Room type does not found with the provided id');
                }
                const data = yield this.repository.findById(id);
                if (data === undefined) {
                    throw new common_1.BadRequestException('This room is already deleted');
                }
                return data;
            }
            catch (e) {
                this.logger.error(e.message);
                throw new common_1.BadRequestException(e.message);
            }
        });
    }
    addRoomType(accountId, addRoomType) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            try {
                const roomType = yield this.repository.addNew(accountId, addRoomType);
                yield this.histService.createNew(roomType);
                return roomType;
            }
            catch (e) {
                this.logger.error(e);
                throw new common_1.BadRequestException(e.message);
            }
        });
    }
    updateRoomTypeById(accountId, updatePayload, id) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            try {
                const isExisted = yield this.repository.existsById(id);
                if (!isExisted) {
                    throw new common_1.BadRequestException('Room type does not found with the provided id');
                }
                const data = yield this.repository.findById(id);
                if (data === undefined) {
                    throw new common_1.BadRequestException('This room is already deleted');
                }
                const roomType = yield this.repository.updateById(accountId, id, updatePayload);
                yield this.histService.createNew(roomType);
                return roomType;
            }
            catch (e) {
                this.logger.error(e.message);
                throw new common_1.BadRequestException(e.message);
            }
        });
    }
    deleteRoomTypeById(accountId, id) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            try {
                const isExisted = yield this.repository.existsById(id);
                if (!isExisted) {
                    throw new common_1.BadRequestException('Room type does not found with the provided id');
                }
                const data = yield this.repository.findById(id);
                const listRoomOfThisType = yield this.roomService.getRoomsByRoomType(id);
                if (data === undefined) {
                    throw new common_1.BadRequestException('This room type is already deleted or disabled');
                }
                else if (listRoomOfThisType !== undefined &&
                    listRoomOfThisType.length > 0) {
                    throw new common_1.BadRequestException('There are still rooms of this type, please change the type of those rooms before deleting type');
                }
                else {
                    const roomType = yield this.repository.deleteById(accountId, id);
                    yield this.histService.createNew(roomType);
                    return roomType;
                }
            }
            catch (e) {
                this.logger.error(e.message);
                throw new common_1.BadRequestException(e.message);
            }
        });
    }
    getDeletedRoomTypes(search) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            try {
                const roomType = yield this.repository.findDeletedByPagination(search);
                return roomType;
            }
            catch (e) {
                this.logger.error(e.message);
                throw new common_1.BadRequestException(e.message);
            }
        });
    }
    restoreDeletedRoomTypeById(accountId, id) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            try {
                const isExisted = yield this.repository.existsById(id);
                if (!isExisted) {
                    throw new common_1.BadRequestException('Room type does not found with the provided id');
                }
                const data = yield this.repository.findById(id);
                if (data !== undefined) {
                    throw new common_1.BadRequestException('This room type ID is now active. Cannot restore it');
                }
                const roomType = yield this.repository.restoreDeletedById(accountId, id);
                yield this.histService.createNew(roomType);
                return roomType;
            }
            catch (e) {
                this.logger.error(e.message);
                throw new common_1.BadRequestException(e.message);
            }
        });
    }
    permanentDeleteRoomTypeById(id) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            try {
                const isExisted = yield this.repository.existsById(id);
                if (!isExisted) {
                    throw new common_1.BadRequestException('Room type does not found with the provided id');
                }
                const data = yield this.repository.findById(id);
                if (data !== undefined) {
                    throw new common_1.BadRequestException('Please delete this room type after permanently delete');
                }
                else {
                    yield this.histService.deleteAllHist(id);
                    return this.repository.permanentlyDeleteById(id);
                }
            }
            catch (e) {
                this.logger.error(e.message);
                throw new common_1.BadRequestException(e.message);
            }
        });
    }
};
RoomTypeService = RoomTypeService_1 = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof room_type_repository_1.RoomTypeRepository !== "undefined" && room_type_repository_1.RoomTypeRepository) === "function" ? _a : Object, typeof (_b = typeof rooms_service_1.RoomsService !== "undefined" && rooms_service_1.RoomsService) === "function" ? _b : Object, typeof (_c = typeof room_type_hist_service_1.RoomTypeHistService !== "undefined" && room_type_hist_service_1.RoomTypeHistService) === "function" ? _c : Object])
], RoomTypeService);
exports.RoomTypeService = RoomTypeService;


/***/ }),

/***/ "./apps/backend/src/app/services/room-wishlist.service.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var RoomWishlistService_1, _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.RoomWishlistService = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const repositories_1 = __webpack_require__("./apps/backend/src/app/repositories/index.ts");
const accounts_service_1 = __webpack_require__("./apps/backend/src/app/services/accounts.service.ts");
let RoomWishlistService = RoomWishlistService_1 = class RoomWishlistService {
    constructor(repository, accountService) {
        this.repository = repository;
        this.accountService = accountService;
        this.logger = new common_1.Logger(RoomWishlistService_1.name);
    }
    findAllWishlistBookingRoomsByKeycloakUserId(roomName, slotFrom, slotTo, keycloakUserId) {
        return this.repository.findAllByKeycloakUserId(roomName, slotFrom, slotTo, keycloakUserId);
    }
    addToWishlist(keycloakUserId, wishlist) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const isWishlistExisted = yield this.repository.checkIfWishlistAlreadyExist(wishlist);
            if (isWishlistExisted) {
                throw new common_1.BadRequestException("This room wishlist is already existed!");
            }
            const accountId = yield this.accountService.getUserIdByKeycloakId(keycloakUserId);
            const entity = {
                createdBy: accountId,
                roomId: wishlist.roomId,
                slotNum: wishlist.slot
            };
            return this.repository.save(entity, {
                transaction: true
            });
        });
    }
    removeFromWishlist(accountId, payload) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            try {
                const isWishlistExisted = yield this.repository.checkIfWishlistAlreadyExist(payload);
                if (!isWishlistExisted) {
                    throw new common_1.BadRequestException("This room wishlist does not exist!");
                }
                return this.repository.removeFromWishlist(accountId, payload.roomId, payload.slot);
            }
            catch (e) {
                this.logger.error(e.message);
                throw new common_1.BadRequestException(e.message);
            }
        });
    }
};
RoomWishlistService = RoomWishlistService_1 = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof repositories_1.RoomWishlistRepository !== "undefined" && repositories_1.RoomWishlistRepository) === "function" ? _a : Object, typeof (_b = typeof accounts_service_1.AccountsService !== "undefined" && accounts_service_1.AccountsService) === "function" ? _b : Object])
], RoomWishlistService);
exports.RoomWishlistService = RoomWishlistService;


/***/ }),

/***/ "./apps/backend/src/app/services/rooms.service.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var RoomsService_1, _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.RoomsService = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const repositories_1 = __webpack_require__("./apps/backend/src/app/repositories/index.ts");
const room_hist_service_1 = __webpack_require__("./apps/backend/src/app/services/room-hist.service.ts");
let RoomsService = RoomsService_1 = class RoomsService {
    constructor(repository, histService) {
        this.repository = repository;
        this.histService = histService;
        this.logger = new common_1.Logger(RoomsService_1.name);
    }
    getAll(request) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.repository.searchRoom(request);
            }
            catch (e) {
                this.logger.error(e);
                throw new common_1.BadRequestException('One or more parameters is invalid');
            }
        });
    }
    getRoomNames() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.repository.findRoomNames();
            }
            catch (e) {
                this.logger.error(e.message);
                throw new common_1.BadRequestException(e.message);
            }
        });
    }
    getRoomsByRoomType(roomTypeId) {
        var _a;
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.repository.getRoomsByRoomType(roomTypeId);
            }
            catch (e) {
                this.logger.error(e);
                throw new common_1.BadRequestException((_a = e.message) !== null && _a !== void 0 ? _a : 'An error occurred while getting rooms by type ' + roomTypeId);
            }
        });
    }
    findById(id) {
        var _a;
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            try {
                const isExisted = yield this.repository.existsById(id);
                if (!isExisted) {
                    throw new common_1.BadRequestException('Room does not found with the provided id');
                }
                const result = yield this.repository.findById(id);
                if (!result) {
                    throw new common_1.BadRequestException('This room is already deleted or disabled');
                }
                return result;
            }
            catch (e) {
                this.logger.error(e);
                throw new common_1.BadRequestException((_a = e.message) !== null && _a !== void 0 ? _a : 'An error occurred while retrieving this room');
            }
        });
    }
    add(user, room) {
        var _a;
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            try {
                const isExisted = yield this.repository.isExistedByName(room.name);
                if (isExisted) {
                    throw new common_1.BadRequestException('Room name is duplicated!');
                }
                const roomAdded = yield this.repository.createNewRoom(room, user.account_id);
                yield this.histService.createNew(roomAdded);
                return roomAdded;
            }
            catch (e) {
                this.logger.error(e.message);
                if (e.message.includes('constraint') &&
                    e.message.includes('rooms_room_type_id_fk')) {
                    throw new common_1.BadRequestException('There is no room type with the provided id');
                }
                throw new common_1.BadRequestException((_a = e.message) !== null && _a !== void 0 ? _a : 'Error occurred while adding this room');
            }
        });
    }
    updateById(accountId, id, body) {
        var _a;
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const isExisted = yield this.repository.existsById(id);
            if (!isExisted) {
                throw new common_1.BadRequestException('Room does not found with the provided id');
            }
            const data = yield this.repository.findById(id);
            if (data === undefined) {
                throw new common_1.BadRequestException('This room is already deleted or disabled');
            }
            try {
                const roomUpdated = yield this.repository.updateById(accountId, id, body);
                yield this.histService.createNew(roomUpdated);
                return roomUpdated;
            }
            catch (e) {
                this.logger.error(e);
                if (e.message.includes('constraint') &&
                    e.message.includes('rooms_room_type_id_fk')) {
                    throw new common_1.BadRequestException('There is no room type with the provided id');
                }
                throw new common_1.BadRequestException((_a = e.message) !== null && _a !== void 0 ? _a : 'Error occurred while updating this room');
            }
        });
    }
    disableById(accountId, id) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const isExisted = yield this.repository.existsById(id);
            if (!isExisted) {
                throw new common_1.BadRequestException('Room does not found with the provided id');
            }
            const isDisabled = yield this.repository.checkIfRoomIsDisabledById(id);
            if (isDisabled) {
                throw new common_1.BadRequestException('This room is already disabled');
            }
            const isDeleted = yield this.repository.checkIfRoomIsDeletedById(id);
            if (isDeleted) {
                throw new common_1.BadRequestException('This room is already deleted, can not disable');
            }
            const room = yield this.repository.disableById(accountId, id);
            yield this.histService.createNew(room);
            return room;
        });
    }
    getDisabledRooms(search) {
        var _a;
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.repository.findDisabledRooms(search);
            }
            catch (e) {
                this.logger.error(e);
                throw new common_1.BadRequestException((_a = e.message) !== null && _a !== void 0 ? _a : 'An error occurred while getting disabled rooms');
            }
        });
    }
    handleRestoreDisabledRoomById(accountId, id) {
        var _a;
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            try {
                const isExisted = yield this.repository.existsById(id);
                if (!isExisted) {
                    throw new common_1.BadRequestException('Room does not found with the provided id');
                }
                const isDeleted = yield this.repository.checkIfRoomIsDeletedById(id);
                if (isDeleted) {
                    throw new common_1.BadRequestException('This room is already deleted');
                }
                const isDisabled = yield this.repository.checkIfRoomIsDisabledById(id);
                if (!isDisabled) {
                    throw new common_1.BadRequestException('This room ID is now active. Cannot restore it');
                }
                const room = yield this.repository.restoreDisabledRoomById(accountId, id);
                yield this.histService.createNew(room);
                return room;
            }
            catch (e) {
                this.logger.error(e);
                throw new common_1.BadRequestException((_a = e.message) !== null && _a !== void 0 ? _a : 'Error occurred while restore the disabled status of this room');
            }
        });
    }
    deleteById(accountId, id) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            try {
                const isExisted = yield this.repository.existsById(id);
                if (!isExisted) {
                    throw new common_1.BadRequestException('Room does not found with the provided id');
                }
                const isDeleted = yield this.repository.checkIfRoomIsDeletedById(id);
                if (isDeleted) {
                    throw new common_1.BadRequestException('This room is already deleted');
                }
                const device = yield this.repository.deleteById(accountId, id);
                yield this.histService.createNew(device);
                return device;
            }
            catch (e) {
                this.logger.error(e.message);
                throw new common_1.BadRequestException(e.message);
            }
        });
    }
    getDeletedRooms(search) {
        var _a;
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.repository.findDeletedRooms(search);
            }
            catch (e) {
                this.logger.error(e);
                throw new common_1.BadRequestException((_a = e.message) !== null && _a !== void 0 ? _a : 'An error occurred while getting deleted rooms');
            }
        });
    }
    handleRestoreDeletedRoomById(accountId, id) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            try {
                const isExisted = yield this.repository.existsById(id);
                if (!isExisted) {
                    throw new common_1.BadRequestException('Room does not found with the provided id');
                }
                const isDisabled = yield this.repository.checkIfRoomIsDisabledById(id);
                if (isDisabled) {
                    throw new common_1.BadRequestException('This room is already disabled');
                }
                const isDeleted = yield this.repository.checkIfRoomIsDeletedById(id);
                if (!isDeleted) {
                    throw new common_1.BadRequestException('This room ID is now active. Cannot restore it');
                }
                const room = yield this.repository.restoreDeletedRoomById(accountId, id);
                yield this.histService.createNew(room);
                return room;
            }
            catch (e) {
                this.logger.error(e.message);
                throw new common_1.BadRequestException(e.message);
            }
        });
    }
    getAllWithoutPagination() {
        var _a;
        try {
            return this.repository
                .createQueryBuilder('rooms')
                .where('rooms.disabled_at IS NULL')
                .andWhere('rooms.deleted_at IS NULL')
                .getMany();
        }
        catch (e) {
            this.logger.error(e);
            throw new common_1.BadRequestException((_a = e.message) !== null && _a !== void 0 ? _a : 'An error occurred while adding this room');
        }
    }
    getRoomsFilterByNameAndType(payload) {
        return this.repository.filterByNameAndType(payload);
    }
};
RoomsService = RoomsService_1 = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof repositories_1.RoomsRepository !== "undefined" && repositories_1.RoomsRepository) === "function" ? _a : Object, typeof (_b = typeof room_hist_service_1.RoomHistService !== "undefined" && room_hist_service_1.RoomHistService) === "function" ? _b : Object])
], RoomsService);
exports.RoomsService = RoomsService;


/***/ }),

/***/ "./apps/backend/src/app/services/slot.service.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var SlotService_1, _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SlotService = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const slot_repository_1 = __webpack_require__("./apps/backend/src/app/repositories/slot.repository.ts");
let SlotService = SlotService_1 = class SlotService {
    constructor(repository) {
        this.repository = repository;
        this.logger = new common_1.Logger(SlotService_1.name);
    }
    getAllByPagination(params) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            try {
                if (!params) {
                    console.log('ass');
                    return this.repository.findAll();
                }
                return yield this.repository.findByPagination(params);
            }
            catch (e) {
                this.logger.error(e.message);
                throw new common_1.BadRequestException(e.message);
            }
        });
    }
    getSlotNames() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.repository.findSlotNames();
            }
            catch (e) {
                this.logger.error(e.message);
                throw new common_1.BadRequestException(e.message);
            }
        });
    }
    getNumOfSlot(id) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            try {
                const slot = yield this.repository.getNumOfSlot(id);
                return slot;
            }
            catch (e) {
                this.logger.error(e);
                throw new common_1.BadRequestException('One or more parameters is invalid');
            }
        });
    }
    getById(id) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.repository.findById(id);
            }
            catch (e) {
                this.logger.error(e.message);
                throw new common_1.BadRequestException(e.message);
            }
        });
    }
    getAll() {
        return this.repository.findAll();
    }
};
SlotService = SlotService_1 = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof slot_repository_1.SlotRepository !== "undefined" && slot_repository_1.SlotRepository) === "function" ? _a : Object])
], SlotService);
exports.SlotService = SlotService;


/***/ }),

/***/ "./apps/backend/src/app/services/task.service.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var TasksService_1, _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.TasksService = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const repositories_1 = __webpack_require__("./apps/backend/src/app/repositories/index.ts");
const booking_room_status_enum_1 = __webpack_require__("./apps/backend/src/app/enum/booking-room-status.enum.ts");
let TasksService = TasksService_1 = class TasksService {
    constructor(repository) {
        this.repository = repository;
        this.logger = new common_1.Logger(TasksService_1.name);
    }
    //@Cron(CronExpression.EVERY_10_SECONDS)
    handleCheckRoomBookingStillInProgress() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const currentTime = new Date().getTime() + 25200000;
            const next5Mins = new Date(currentTime + (1000 * 60 * 5));
            const result = yield this.repository.findByBookingStatus(booking_room_status_enum_1.BookingRoomStatus.Booking, next5Mins);
            console.log(result);
        });
    }
};
TasksService = TasksService_1 = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof repositories_1.BookingRoomRepository !== "undefined" && repositories_1.BookingRoomRepository) === "function" ? _a : Object])
], TasksService);
exports.TasksService = TasksService;


/***/ }),

/***/ "./apps/backend/src/app/services/users-otp.service.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UsersOTPService = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const users_otp_repository_1 = __webpack_require__("./apps/backend/src/app/repositories/users-otp.repository.ts");
let UsersOTPService = class UsersOTPService {
    constructor(repository) {
        this.repository = repository;
    }
    add(model) {
        return Promise.resolve(undefined);
    }
    addAll(models) {
        return Promise.resolve([]);
    }
    deleteById(id) {
        return Promise.resolve(undefined);
    }
    getAll() {
        return Promise.resolve([]);
    }
    getAllByPagination() {
        return Promise.resolve([]);
    }
    getById(id) {
        return Promise.resolve(undefined);
    }
    updateById(model, id) {
        return Promise.resolve(undefined);
    }
};
UsersOTPService = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof users_otp_repository_1.UsersOTPRepository !== "undefined" && users_otp_repository_1.UsersOTPRepository) === "function" ? _a : Object])
], UsersOTPService);
exports.UsersOTPService = UsersOTPService;


/***/ }),

/***/ "./apps/backend/src/app/services/users-warning-flag-hist.service.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UsersWarningFlagHistoryService = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const users_warning_flag_history_1 = __webpack_require__("./apps/backend/src/app/repositories/users-warning-flag-history.ts");
let UsersWarningFlagHistoryService = class UsersWarningFlagHistoryService {
    constructor(repository) {
        this.repository = repository;
    }
    add(model) {
        return Promise.resolve(undefined);
    }
    addAll(models) {
        return Promise.resolve([]);
    }
    deleteById(id) {
        return Promise.resolve(undefined);
    }
    getAll() {
        return Promise.resolve([]);
    }
    getAllByPagination() {
        return Promise.resolve([]);
    }
    getById(id) {
        return Promise.resolve(undefined);
    }
    updateById(model, id) {
        return Promise.resolve(undefined);
    }
};
UsersWarningFlagHistoryService = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof users_warning_flag_history_1.UsersWarningFlagHistoryRepository !== "undefined" && users_warning_flag_history_1.UsersWarningFlagHistoryRepository) === "function" ? _a : Object])
], UsersWarningFlagHistoryService);
exports.UsersWarningFlagHistoryService = UsersWarningFlagHistoryService;


/***/ }),

/***/ "./apps/backend/src/app/services/users-warning-flag.service.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UsersWarningFlagService = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const users_warning_flag_1 = __webpack_require__("./apps/backend/src/app/repositories/users-warning-flag.ts");
let UsersWarningFlagService = class UsersWarningFlagService {
    constructor(repository) {
        this.repository = repository;
    }
    add(model) {
        return Promise.resolve(undefined);
    }
    addAll(models) {
        return Promise.resolve([]);
    }
    deleteById(id) {
        return Promise.resolve(undefined);
    }
    getAll() {
        return Promise.resolve([]);
    }
    getAllByPagination() {
        return Promise.resolve([]);
    }
    getById(id) {
        return Promise.resolve(undefined);
    }
    updateById(model, id) {
        return Promise.resolve(undefined);
    }
};
UsersWarningFlagService = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof users_warning_flag_1.UsersWarningFlagRepository !== "undefined" && users_warning_flag_1.UsersWarningFlagRepository) === "function" ? _a : Object])
], UsersWarningFlagService);
exports.UsersWarningFlagService = UsersWarningFlagService;


/***/ }),

/***/ "./apps/backend/src/app/validators/contains-many.validator.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ContainsMany = void 0;
const common_1 = __webpack_require__("@nestjs/common");
const ContainsMany = (domains, options) => 
// eslint-disable-next-line @typescript-eslint/ban-types
(target, propertyKey) => {
    let value;
    const getter = () => value;
    const setter = function (newVal) {
        if (domains.includes(newVal)) {
            value = newVal;
        }
        else {
            if (!options) {
                throw new common_1.BadRequestException(`Must be one of ${domains.join()}`);
            }
            throw new common_1.BadRequestException(options.message);
        }
    };
    Object.defineProperty(target, propertyKey, {
        get: getter,
        set: setter
    });
};
exports.ContainsMany = ContainsMany;


/***/ }),

/***/ "./apps/backend/src/app/validators/utils/access-token-extractor.util.ts":
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.getAccessTokenViaCookie = void 0;
const getAccessTokenViaCookie = (request) => {
    var _a, _b, _c;
    return (_c = (_b = (_a = request.headers["cookie"]) === null || _a === void 0 ? void 0 : _a.split(";").map(k => k.trim()).find(k => k.startsWith("accessToken="))) === null || _b === void 0 ? void 0 : _b.split("=")[1]) !== null && _c !== void 0 ? _c : "";
};
exports.getAccessTokenViaCookie = getAccessTokenViaCookie;


/***/ }),

/***/ "./libs/constants/src/index.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__("tslib");
tslib_1.__exportStar(__webpack_require__("./libs/constants/src/lib/color.constants.ts"), exports);
tslib_1.__exportStar(__webpack_require__("./libs/constants/src/lib/environment.constant.ts"), exports);
tslib_1.__exportStar(__webpack_require__("./libs/constants/src/lib/headers.constant.ts"), exports);
tslib_1.__exportStar(__webpack_require__("./libs/constants/src/lib/mediatype.constant.ts"), exports);


/***/ }),

/***/ "./libs/constants/src/lib/color.constants.ts":
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.BLUE = exports.TEAL = exports.LIME = exports.GREEN = exports.PINK = exports.RED = exports.YELLOW = exports.LIGHT_GRAY = exports.GRAY = exports.WHITE = exports.BLACK = exports.FPT_ORANGE_COLOR = exports.FORM_GRAY_COLOR = exports.INPUT_GRAY_COLOR = void 0;
exports.INPUT_GRAY_COLOR = "rgb(206, 212, 218)";
exports.FORM_GRAY_COLOR = "rgb(248, 249, 250)";
exports.FPT_ORANGE_COLOR = "#f06e28";
exports.BLACK = "#000";
exports.WHITE = "#fff";
exports.GRAY = "#808080";
exports.LIGHT_GRAY = "#f2f2f2";
exports.YELLOW = "#f59f00";
exports.RED = "rgb(250,82,82)";
exports.PINK = "rgb(230, 73, 128)";
exports.GREEN = "rgb(64,192,87)";
exports.LIME = "rgb(130, 201, 30)";
exports.TEAL = "rgb(18, 184, 134)";
exports.BLUE = "#228be6";


/***/ }),

/***/ "./libs/constants/src/lib/environment.constant.ts":
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Environment = void 0;
exports.Environment = {
    http: {
        host: 'http.host',
        port: 'http.port',
    },
    https: {
        host: 'https.host',
        port: 'https.port',
    },
    db: {
        mysql: {
            url: 'db.mysql.url',
            port: 'db.mysql.port',
            database: 'db.mysql.database',
            username: 'db.mysql.username',
            password: 'db.mysql.password',
            synchronize: 'db.mysql.synchronize',
        },
        postgres: {
            url: 'db.postgres.url',
            port: 'db.postgres.port',
            database: 'db.postgres.database',
            username: 'db.postgres.username',
            password: 'db.postgres.password',
            synchronize: 'db.postgres.synchronize'
        },
        keycloak: {
            url: 'db.keycloak.url',
            port: 'db.keycloak.port',
            database: 'db.keycloak.database',
            username: 'db.keycloak.username',
            password: 'db.keycloak.password',
            synchronize: 'db.keycloak.synchronize',
        },
    },
    keycloak: {
        host: 'keycloak.host',
        port: 'keycloak.port',
        client: {
            realm: 'keycloak.client.realm',
            id: 'keycloak.client.id',
            secret: 'keycloak.client.secret',
        },
        grant_type: {
            password: "keycloak.grant_type.password",
            token_exchange: "keycloak.grant_type.token_exchange",
            refresh_token: "keycloak.grant_type.refresh_token",
            native_refresh_token: "keycloak.grant_type.native_refresh_token"
        },
        master_username: 'keycloak.master_username',
        master_password: 'keycloak.master_password'
    },
    redis: {
        host: 'redis.host',
        port: 'redis.port',
        username: 'redis.username',
        password: 'redis.password',
    },
    elasticsearch: {
        host: "elasticsearch.host",
        port: "elasticsearch.port",
        username: "elasticsearch.username",
        password: "elasticsearch.password"
    },
    firebase: {
        apiKey: "firebase.apiKey",
        authDomain: "firebase.authDomain",
        projectId: "firebase.projectId",
        storageBucket: "firebase.storageBucket",
        messagingSenderId: "firebase.messagingSenderId",
        appId: "firebase.appId",
        measurementId: "firebase.measurementId"
    },
    cloudinary: {
        name: "cloudinary.name",
        apiKey: "cloudinary.apiKey",
        apiSecret: "cloudinary.apiSecret",
        secure: "cloudinary.secure"
    }
};


/***/ }),

/***/ "./libs/constants/src/lib/headers.constant.ts":
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AUTHORIZATION_LOWERCASE = exports.AUTHORIZATION = exports.CONTENT_TYPE = void 0;
exports.CONTENT_TYPE = "Content-Type";
exports.AUTHORIZATION = "Authorization";
exports.AUTHORIZATION_LOWERCASE = "authorization";


/***/ }),

/***/ "./libs/constants/src/lib/mediatype.constant.ts":
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.TEXT_PLAIN = exports.APPLICATION_JSON = exports.APPLICATION_X_WWW_FORM_URLENCODED = void 0;
exports.APPLICATION_X_WWW_FORM_URLENCODED = "application/x-www-form-urlencoded";
exports.APPLICATION_JSON = "application/json";
exports.TEXT_PLAIN = "text/plain";


/***/ }),

/***/ "@nestjs/axios":
/***/ ((module) => {

module.exports = require("@nestjs/axios");

/***/ }),

/***/ "@nestjs/common":
/***/ ((module) => {

module.exports = require("@nestjs/common");

/***/ }),

/***/ "@nestjs/config":
/***/ ((module) => {

module.exports = require("@nestjs/config");

/***/ }),

/***/ "@nestjs/core":
/***/ ((module) => {

module.exports = require("@nestjs/core");

/***/ }),

/***/ "@nestjs/platform-fastify":
/***/ ((module) => {

module.exports = require("@nestjs/platform-fastify");

/***/ }),

/***/ "@nestjs/schedule":
/***/ ((module) => {

module.exports = require("@nestjs/schedule");

/***/ }),

/***/ "@nestjs/swagger":
/***/ ((module) => {

module.exports = require("@nestjs/swagger");

/***/ }),

/***/ "@nestjs/typeorm":
/***/ ((module) => {

module.exports = require("@nestjs/typeorm");

/***/ }),

/***/ "cache-manager-redis-store":
/***/ ((module) => {

module.exports = require("cache-manager-redis-store");

/***/ }),

/***/ "class-transformer":
/***/ ((module) => {

module.exports = require("class-transformer");

/***/ }),

/***/ "class-validator":
/***/ ((module) => {

module.exports = require("class-validator");

/***/ }),

/***/ "cloudinary":
/***/ ((module) => {

module.exports = require("cloudinary");

/***/ }),

/***/ "dayjs":
/***/ ((module) => {

module.exports = require("dayjs");

/***/ }),

/***/ "fastify":
/***/ ((module) => {

module.exports = require("fastify");

/***/ }),

/***/ "fastify-compress":
/***/ ((module) => {

module.exports = require("fastify-compress");

/***/ }),

/***/ "fastify-helmet":
/***/ ((module) => {

module.exports = require("fastify-helmet");

/***/ }),

/***/ "fastify-multer":
/***/ ((module) => {

module.exports = require("fastify-multer");

/***/ }),

/***/ "firebase-admin":
/***/ ((module) => {

module.exports = require("firebase-admin");

/***/ }),

/***/ "fs":
/***/ ((module) => {

module.exports = require("fs");

/***/ }),

/***/ "google-auth-library":
/***/ ((module) => {

module.exports = require("google-auth-library");

/***/ }),

/***/ "joi":
/***/ ((module) => {

module.exports = require("joi");

/***/ }),

/***/ "js-yaml":
/***/ ((module) => {

module.exports = require("js-yaml");

/***/ }),

/***/ "multer":
/***/ ((module) => {

module.exports = require("multer");

/***/ }),

/***/ "nestjs-typeorm-paginate":
/***/ ((module) => {

module.exports = require("nestjs-typeorm-paginate");

/***/ }),

/***/ "rxjs":
/***/ ((module) => {

module.exports = require("rxjs");

/***/ }),

/***/ "streamifier":
/***/ ((module) => {

module.exports = require("streamifier");

/***/ }),

/***/ "tslib":
/***/ ((module) => {

module.exports = require("tslib");

/***/ }),

/***/ "typeorm":
/***/ ((module) => {

module.exports = require("typeorm");

/***/ }),

/***/ "crypto":
/***/ ((module) => {

module.exports = require("crypto");

/***/ }),

/***/ "net":
/***/ ((module) => {

module.exports = require("net");

/***/ }),

/***/ "path":
/***/ ((module) => {

module.exports = require("path");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
var exports = __webpack_exports__;

Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const core_1 = __webpack_require__("@nestjs/core");
const swagger_1 = __webpack_require__("@nestjs/swagger");
const swagger_config_1 = __webpack_require__("./apps/backend/src/app/constants/config/swagger.config.ts");
const app_module_1 = __webpack_require__("./apps/backend/src/app/modules/app.module.ts");
const firebase_config_1 = __webpack_require__("./apps/backend/src/app/config/firebase.config.ts");
const net = __webpack_require__("net");
const fastify_helmet_1 = __webpack_require__("fastify-helmet");
const platform_fastify_1 = __webpack_require__("@nestjs/platform-fastify");
const fastify_compress_1 = __webpack_require__("fastify-compress");
const fastify_multer_1 = __webpack_require__("fastify-multer");
function bootstrap() {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        const port = process.env.BACKEND_PORT || 5000;
        const host = process.env.BACKEND_HOST || `0.0.0.0`;
        const contextPath = process.env.BACKEND_CONTEXT_PATH || '/api';
        const firebaseProjectId = (0, firebase_config_1.initializeFirebaseApp)();
        const app = yield core_1.NestFactory.create(app_module_1.AppModule.forRoot(), new platform_fastify_1.FastifyAdapter({
            logger: true,
        }), { bufferLogs: true });
        app.useGlobalPipes(new common_1.ValidationPipe({
            transform: true,
        }));
        app.setGlobalPrefix(contextPath);
        app.enableCors();
        yield app.register(fastify_multer_1.contentParser);
        yield app.register(fastify_compress_1.default);
        yield app.register(fastify_helmet_1.fastifyHelmet, {
            global: true,
            contentSecurityPolicy: {
                directives: {
                    defaultSrc: [`'self'`],
                    styleSrc: [
                        `'self'`,
                        `'unsafe-inline'`,
                        'cdn.jsdelivr.net',
                        'fonts.googleapis.com',
                    ],
                    fontSrc: [`'self'`, 'fonts.gstatic.com'],
                    imgSrc: [`'self'`, 'data:', 'cdn.jsdelivr.net'],
                    scriptSrc: [`'self'`, `https: 'unsafe-inline'`, `cdn.jsdelivr.net`],
                },
            },
        });
        // app.useStaticAssets({ root: join(__dirname, '../../fastify-file-upload') });
        const document = swagger_1.SwaggerModule.createDocument(app, (0, swagger_config_1.getSwaggerConfig)());
        swagger_1.SwaggerModule.setup(swagger_config_1.SWAGGER_CONFIG.contextPath, app, document);
        yield app.listen(port, host);
        const client = net.connect({ port: 80, host: 'google.com' }, () => {
            common_1.Logger.debug(`💻 [IP] External Address: ${client.localAddress}`);
            common_1.Logger.debug(`⚙️ [IP] Loopback Address: localhost (127.0.0.1)`);
            common_1.Logger.debug(`[Firebase] Initialized with project id: ${firebaseProjectId}`);
            common_1.Logger.debug(`[API] Running on: http://${client.localAddress}:${port}${contextPath}`);
        });
    });
}
void bootstrap();

})();

var __webpack_export_target__ = exports;
for(var i in __webpack_exports__) __webpack_export_target__[i] = __webpack_exports__[i];
if(__webpack_exports__.__esModule) Object.defineProperty(__webpack_export_target__, "__esModule", { value: true });
/******/ })()
;
//# sourceMappingURL=main.js.map