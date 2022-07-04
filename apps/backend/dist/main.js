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

/***/ "./apps/backend/src/app/controllers/accounts.controller.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var AccountsController_1, _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AccountsController = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const services_1 = __webpack_require__("./apps/backend/src/app/services/index.ts");
const swagger_1 = __webpack_require__("@nestjs/swagger");
const users_validation_1 = __webpack_require__("./apps/backend/src/app/pipes/validation/users.validation.ts");
const users_payload_1 = __webpack_require__("./apps/backend/src/app/payload/request/users.payload.ts");
const keycloak_user_decorator_1 = __webpack_require__("./apps/backend/src/app/decorators/keycloak-user.decorator.ts");
const path_logger_interceptor_1 = __webpack_require__("./apps/backend/src/app/interceptors/path-logger.interceptor.ts");
const role_decorator_1 = __webpack_require__("./apps/backend/src/app/decorators/role.decorator.ts");
const roles_enum_1 = __webpack_require__("./apps/backend/src/app/enum/roles.enum.ts");
const models_1 = __webpack_require__("./apps/backend/src/app/models/index.ts");
const keycloak_user_1 = __webpack_require__("./apps/backend/src/app/dto/keycloak.user.ts");
const fastify_file_interceptor_1 = __webpack_require__("./apps/backend/src/app/interceptors/fastify-file.interceptor.ts");
const change_password_request_payload_1 = __webpack_require__("./apps/backend/src/app/payload/request/change-password.request.payload.ts");
class UploadProfileRequest {
}
class CreateUserRequest {
}
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({
        name: 'username',
        description: 'Username of the account is used for logging into the system',
        required: true,
        type: String,
        title: 'username',
        example: 'account01',
        minLength: 3,
        maxLength: 100,
    }),
    tslib_1.__metadata("design:type", String)
], CreateUserRequest.prototype, "username", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({
        name: 'fullname',
        description: 'Fullname of the account',
        minLength: 2,
        maxLength: 200,
        required: true,
        title: 'fullname',
        type: String,
        example: 'Adios',
    }),
    tslib_1.__metadata("design:type", String)
], CreateUserRequest.prototype, "fullname", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({
        name: 'phone',
        description: 'Phone number of the account',
        minLength: 10,
        maxLength: 10,
        required: true,
        type: String,
        title: 'phone',
        example: '0123456789',
    }),
    tslib_1.__metadata("design:type", String)
], CreateUserRequest.prototype, "phone", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({
        name: 'email',
        description: 'E-mail address of the account',
        minLength: 10,
        maxLength: 10,
        required: true,
        type: String,
        title: 'phone',
        example: 'account01@fpt.edu.vn',
    }),
    tslib_1.__metadata("design:type", String)
], CreateUserRequest.prototype, "email", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({
        name: 'phone',
        description: 'Phone number of the account',
        minLength: 10,
        maxLength: 10,
        required: true,
        type: String,
        title: 'phone',
        example: '0123456789',
    }),
    tslib_1.__metadata("design:type", String)
], CreateUserRequest.prototype, "description", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({
        name: 'role',
        description: 'Role of the account',
        required: true,
        type: String,
        title: 'role',
        example: roles_enum_1.Role.APP_STAFF,
        enum: roles_enum_1.Role,
        enumName: 'role',
    }),
    tslib_1.__metadata("design:type", String)
], CreateUserRequest.prototype, "role", void 0);
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
], CreateUserRequest.prototype, "avatar", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({
        name: 'is_disabled',
        description: 'Disable status of the account',
        required: true,
        type: Boolean,
        title: 'is_disabled',
        example: false,
    }),
    tslib_1.__metadata("design:type", Boolean)
], CreateUserRequest.prototype, "is_disabled", void 0);
class AccountCreationResponse {
}
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({
        name: 'id',
    }),
    tslib_1.__metadata("design:type", String)
], AccountCreationResponse.prototype, "id", void 0);
let AccountsController = AccountsController_1 = class AccountsController {
    constructor(service) {
        this.service = service;
    }
    getAll(payload) {
        return this.service.getAllByPagination(payload);
    }
    syncUsersFromKeycloak() {
        return this.service.syncUsersFromKeycloak();
    }
    createNewUser(user, room) {
        return this.service.add(room);
    }
    getAccountById(payload) {
        return this.service.getById(payload.id);
    }
    getCurrentProfileInformation(user) {
        return this.service.getCurrentProfileInformation(user.sub);
    }
    getAccountByKeycloakId(payload) {
        return this.service.getAccountByKeycloakId(payload.id);
    }
    getDisabledAccounts() {
        return this.service.getDisabledAccounts();
    }
    getDeletedAccounts() {
        return this.service.getDeletedAccounts();
    }
    restoreDeletedUserById(payload) {
        return this.service.handleRestoreAccountById(payload.id);
    }
    restoreDisabledAccountById(payload) {
        return this.service.handleRestoreDisabledAccountById(payload.id);
    }
    updateAccountById(user, id, body) {
        return this.service.updateById(body, id);
    }
    updateMyProfile(user, payload) {
        return this.service.updateMyProfile(user, payload);
    }
    disableAccountById(user, payload) {
        return this.service.disableById(payload.id);
    }
    deleteAccountById(user, payload) {
        return this.service.deleteById(payload.id);
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
    (0, common_1.Post)(),
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
    tslib_1.__param(0, (0, common_1.Body)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof users_payload_1.UsersRequestPayload !== "undefined" && users_payload_1.UsersRequestPayload) === "function" ? _a : Object]),
    tslib_1.__metadata("design:returntype", void 0)
], AccountsController.prototype, "getAll", null);
tslib_1.__decorate([
    (0, swagger_1.ApiOperation)({
        description: 'Sync users from Keycloak to current DB',
    }),
    (0, common_1.Get)('syncKeycloak'),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", void 0)
], AccountsController.prototype, "syncUsersFromKeycloak", null);
tslib_1.__decorate([
    (0, swagger_1.ApiOperation)({
        summary: 'Create a new account',
        description: 'Create a new account with the provided payload',
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
        description: 'Successfully created a new user',
        type: models_1.Accounts,
        schema: {
            allOf: [
                {
                    $ref: (0, swagger_1.getSchemaPath)(models_1.Accounts),
                },
                {
                    properties: {
                        results: {
                            type: 'object',
                            items: { $ref: (0, swagger_1.getSchemaPath)(models_1.Accounts) },
                        },
                    },
                },
            ],
        },
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
        description: 'Invalid role',
    }),
    (0, common_1.Post)('add'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, role_decorator_1.Roles)(roles_enum_1.Role.APP_LIBRARIAN, roles_enum_1.Role.APP_MANAGER, roles_enum_1.Role.APP_ADMIN),
    tslib_1.__param(0, (0, keycloak_user_decorator_1.User)()),
    tslib_1.__param(1, (0, common_1.Body)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_b = typeof keycloak_user_1.KeycloakUserInstance !== "undefined" && keycloak_user_1.KeycloakUserInstance) === "function" ? _b : Object, CreateUserRequest]),
    tslib_1.__metadata("design:returntype", typeof (_c = typeof Promise !== "undefined" && Promise) === "function" ? _c : Object)
], AccountsController.prototype, "createNewUser", null);
tslib_1.__decorate([
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
        description: 'Access token is invalid',
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.FORBIDDEN,
        description: 'Not enough privileges',
    }),
    (0, common_1.Get)('find/:id'),
    (0, role_decorator_1.Roles)(roles_enum_1.Role.APP_LIBRARIAN, roles_enum_1.Role.APP_MANAGER, roles_enum_1.Role.APP_ADMIN),
    tslib_1.__param(0, (0, common_1.Param)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", void 0)
], AccountsController.prototype, "getAccountById", null);
tslib_1.__decorate([
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
    (0, common_1.Get)('my-profile'),
    (0, role_decorator_1.Roles)(roles_enum_1.Role.APP_LIBRARIAN, roles_enum_1.Role.APP_MANAGER, roles_enum_1.Role.APP_ADMIN, roles_enum_1.Role.APP_STAFF),
    tslib_1.__param(0, (0, keycloak_user_decorator_1.User)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_d = typeof keycloak_user_1.KeycloakUserInstance !== "undefined" && keycloak_user_1.KeycloakUserInstance) === "function" ? _d : Object]),
    tslib_1.__metadata("design:returntype", typeof (_e = typeof Promise !== "undefined" && Promise) === "function" ? _e : Object)
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
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", void 0)
], AccountsController.prototype, "getDisabledAccounts", null);
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
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
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
    tslib_1.__param(0, (0, common_1.Param)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", void 0)
], AccountsController.prototype, "restoreDeletedUserById", null);
tslib_1.__decorate([
    (0, common_1.Put)('restore-disabled/:id'),
    (0, role_decorator_1.Roles)(roles_enum_1.Role.APP_LIBRARIAN, roles_enum_1.Role.APP_MANAGER, roles_enum_1.Role.APP_ADMIN),
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
], AccountsController.prototype, "restoreDisabledAccountById", null);
tslib_1.__decorate([
    (0, common_1.Put)('update/id/:id'),
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
    tslib_1.__metadata("design:paramtypes", [typeof (_f = typeof keycloak_user_1.KeycloakUserInstance !== "undefined" && keycloak_user_1.KeycloakUserInstance) === "function" ? _f : Object, String, Object]),
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
    tslib_1.__metadata("design:paramtypes", [typeof (_g = typeof keycloak_user_1.KeycloakUserInstance !== "undefined" && keycloak_user_1.KeycloakUserInstance) === "function" ? _g : Object, UploadProfileRequest]),
    tslib_1.__metadata("design:returntype", void 0)
], AccountsController.prototype, "updateMyProfile", null);
tslib_1.__decorate([
    (0, common_1.Put)('disable/:id'),
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
    tslib_1.__metadata("design:paramtypes", [typeof (_h = typeof keycloak_user_1.KeycloakUserInstance !== "undefined" && keycloak_user_1.KeycloakUserInstance) === "function" ? _h : Object, Object]),
    tslib_1.__metadata("design:returntype", void 0)
], AccountsController.prototype, "disableAccountById", null);
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
    tslib_1.__metadata("design:paramtypes", [typeof (_j = typeof keycloak_user_1.KeycloakUserInstance !== "undefined" && keycloak_user_1.KeycloakUserInstance) === "function" ? _j : Object, Object]),
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
    tslib_1.__metadata("design:paramtypes", [typeof (_k = typeof keycloak_user_1.KeycloakUserInstance !== "undefined" && keycloak_user_1.KeycloakUserInstance) === "function" ? _k : Object, typeof (_m = typeof Express !== "undefined" && (_l = Express.Multer) !== void 0 && _l.File) === "function" ? _m : Object, Object]),
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
    tslib_1.__metadata("design:paramtypes", [typeof (_o = typeof keycloak_user_1.KeycloakUserInstance !== "undefined" && keycloak_user_1.KeycloakUserInstance) === "function" ? _o : Object, typeof (_q = typeof Express !== "undefined" && (_p = Express.Multer) !== void 0 && _p.File) === "function" ? _q : Object]),
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
    tslib_1.__metadata("design:paramtypes", [typeof (_r = typeof keycloak_user_1.KeycloakUserInstance !== "undefined" && keycloak_user_1.KeycloakUserInstance) === "function" ? _r : Object, typeof (_s = typeof change_password_request_payload_1.ChangeProfilePasswordRequest !== "undefined" && change_password_request_payload_1.ChangeProfilePasswordRequest) === "function" ? _s : Object]),
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
    tslib_1.__metadata("design:paramtypes", [typeof (_t = typeof keycloak_user_1.KeycloakUserInstance !== "undefined" && keycloak_user_1.KeycloakUserInstance) === "function" ? _t : Object]),
    tslib_1.__metadata("design:returntype", void 0)
], AccountsController.prototype, "getMyAvatarURL", null);
AccountsController = AccountsController_1 = tslib_1.__decorate([
    (0, common_1.Controller)('v1/accounts'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiTags)('Accounts'),
    (0, common_1.UseInterceptors)(new path_logger_interceptor_1.PathLoggerInterceptor(AccountsController_1.name)),
    tslib_1.__metadata("design:paramtypes", [typeof (_u = typeof services_1.AccountsService !== "undefined" && services_1.AccountsService) === "function" ? _u : Object])
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


var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.BookingReasonController = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const booking_reason_service_1 = __webpack_require__("./apps/backend/src/app/services/booking-reason.service.ts");
let BookingReasonController = class BookingReasonController {
    constructor(service) {
        this.service = service;
    }
    getAllBookingReasons(dir, page, limit, search, sort) {
        return this.service.getAllByPagination({
            page,
            dir,
            search,
            sort,
            limit,
        });
    }
    getBookingReasonById(id) {
        return this.service.getBookingReasonById(id);
    }
};
tslib_1.__decorate([
    (0, common_1.Get)(),
    tslib_1.__param(0, (0, common_1.Query)('dir', new common_1.DefaultValuePipe('ASC'))),
    tslib_1.__param(1, (0, common_1.Query)('page', new common_1.DefaultValuePipe(1), common_1.ParseIntPipe)),
    tslib_1.__param(2, (0, common_1.Query)('limit', new common_1.DefaultValuePipe(5), common_1.ParseIntPipe)),
    tslib_1.__param(3, (0, common_1.Query)('search', new common_1.DefaultValuePipe(''))),
    tslib_1.__param(4, (0, common_1.Query)('sort', new common_1.DefaultValuePipe('name'))),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, Number, Number, String, String]),
    tslib_1.__metadata("design:returntype", void 0)
], BookingReasonController.prototype, "getAllBookingReasons", null);
tslib_1.__decorate([
    (0, common_1.Get)(':id'),
    tslib_1.__param(0, (0, common_1.Param)('id')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String]),
    tslib_1.__metadata("design:returntype", typeof (_a = typeof Promise !== "undefined" && Promise) === "function" ? _a : Object)
], BookingReasonController.prototype, "getBookingReasonById", null);
BookingReasonController = tslib_1.__decorate([
    (0, common_1.Controller)('/v1/booking-reasons'),
    tslib_1.__metadata("design:paramtypes", [typeof (_b = typeof booking_reason_service_1.BookingReasonService !== "undefined" && booking_reason_service_1.BookingReasonService) === "function" ? _b : Object])
], BookingReasonController);
exports.BookingReasonController = BookingReasonController;


/***/ }),

/***/ "./apps/backend/src/app/controllers/booking-room.controller.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var BookingRoomController_1, _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m;
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
let BookingRoomController = BookingRoomController_1 = class BookingRoomController {
    constructor(service) {
        this.service = service;
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
    getRequestBookingByRoomId(roomId = '') {
        return this.service.getRequestBookingByRoomId(roomId);
    }
    cancelRoomBookingById(user, payload) {
        return this.service.cancelRoomBookingById(user.account_id, payload.id);
    }
    getUsernameList() {
        return this.service.getUsernameList();
    }
    getRoomsName() {
        return this.service.getRoomsName();
    }
<<<<<<< HEAD
    getAllBookingRoomsPagination(search, sort, limit, page, reasonType, checkInAt, checkOutAt, dir) {
=======
    getAllBookingRoomsPagination(search, sort, limit, page, reasonType, checkInAt, checkOutAt, status, dir) {
>>>>>>> origin/develop
        return this.service.getAllBookingRoomsPagination({
            checkOutAt: checkOutAt,
            checkInAt: checkInAt,
            search: search,
            dir: dir,
            page: page,
            sort: sort,
            limit: limit,
            reasonType: reasonType,
<<<<<<< HEAD
=======
            status: status,
>>>>>>> origin/develop
        });
    }
    getBookingRooms(search, sorting, slot) {
        return this.service.getBookingRooms({
            sorting: sorting,
            search: search,
            slot: slot,
        });
    }
    getBookingRoomById(id) {
        return this.service.getBookingRoomById(id);
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
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof keycloak_user_1.KeycloakUserInstance !== "undefined" && keycloak_user_1.KeycloakUserInstance) === "function" ? _a : Object]),
    tslib_1.__metadata("design:returntype", void 0)
], BookingRoomController.prototype, "getCurrentRoomBookingListOfCurrentUser", null);
tslib_1.__decorate([
    (0, common_1.Get)('current-booking/:id'),
    (0, role_decorator_1.Roles)(roles_enum_1.Role.APP_LIBRARIAN, roles_enum_1.Role.APP_MANAGER, roles_enum_1.Role.APP_ADMIN, roles_enum_1.Role.APP_STAFF),
    tslib_1.__param(0, (0, keycloak_user_decorator_1.User)()),
    tslib_1.__param(1, (0, common_1.Param)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_b = typeof keycloak_user_1.KeycloakUserInstance !== "undefined" && keycloak_user_1.KeycloakUserInstance) === "function" ? _b : Object, Object]),
    tslib_1.__metadata("design:returntype", void 0)
], BookingRoomController.prototype, "getCurrentRoomBookingDetail", null);
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
    tslib_1.__metadata("design:returntype", typeof (_c = typeof Promise !== "undefined" && Promise) === "function" ? _c : Object)
], BookingRoomController.prototype, "getRequestBookingByRoomId", null);
tslib_1.__decorate([
<<<<<<< HEAD
    (0, common_1.Put)('current-booking/cancel/:id'),
=======
    (0, common_1.Put)('cancel/:id'),
>>>>>>> origin/develop
    (0, role_decorator_1.Roles)(roles_enum_1.Role.APP_LIBRARIAN, roles_enum_1.Role.APP_MANAGER, roles_enum_1.Role.APP_ADMIN, roles_enum_1.Role.APP_STAFF),
    tslib_1.__param(0, (0, keycloak_user_decorator_1.User)()),
    tslib_1.__param(1, (0, common_1.Param)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_d = typeof keycloak_user_1.KeycloakUserInstance !== "undefined" && keycloak_user_1.KeycloakUserInstance) === "function" ? _d : Object, Object]),
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
    (0, common_1.Get)('search'),
    (0, role_decorator_1.Roles)(roles_enum_1.Role.APP_LIBRARIAN, roles_enum_1.Role.APP_MANAGER, roles_enum_1.Role.APP_ADMIN),
    tslib_1.__param(0, (0, common_1.Query)('search', new common_1.DefaultValuePipe(''))),
    tslib_1.__param(1, (0, common_1.Query)('sort', new common_1.DefaultValuePipe('booked_at'))),
    tslib_1.__param(2, (0, common_1.Query)('limit', new common_1.DefaultValuePipe(5), common_1.ParseIntPipe)),
    tslib_1.__param(3, (0, common_1.Query)('page', new common_1.DefaultValuePipe(1), common_1.ParseIntPipe)),
    tslib_1.__param(4, (0, common_1.Query)('reasonType', new common_1.DefaultValuePipe(''))),
    tslib_1.__param(5, (0, common_1.Query)('checkInAt', new common_1.DefaultValuePipe(''))),
    tslib_1.__param(6, (0, common_1.Query)('checkOutAt', new common_1.DefaultValuePipe(''))),
<<<<<<< HEAD
    tslib_1.__param(7, (0, common_1.Query)('dir', new common_1.DefaultValuePipe('ASC'))),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, String, Number, Number, String, String, String, String]),
=======
    tslib_1.__param(7, (0, common_1.Query)('status', new common_1.DefaultValuePipe(''))),
    tslib_1.__param(8, (0, common_1.Query)('dir', new common_1.DefaultValuePipe('ASC'))),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, String, Number, Number, String, String, String, String, String]),
>>>>>>> origin/develop
    tslib_1.__metadata("design:returntype", void 0)
], BookingRoomController.prototype, "getAllBookingRoomsPagination", null);
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
    tslib_1.__metadata("design:returntype", typeof (_e = typeof Promise !== "undefined" && Promise) === "function" ? _e : Object)
], BookingRoomController.prototype, "getBookingRooms", null);
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
    (0, role_decorator_1.Roles)(roles_enum_1.Role.APP_LIBRARIAN, roles_enum_1.Role.APP_ADMIN, roles_enum_1.Role.APP_MANAGER, roles_enum_1.Role.APP_STAFF),
    (0, common_1.Get)('devices'),
    tslib_1.__param(0, (0, common_1.Query)('name')),
    tslib_1.__param(1, (0, common_1.Query)('type')),
    tslib_1.__param(2, (0, common_1.Query)('sort')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, String, String]),
    tslib_1.__metadata("design:returntype", void 0)
], BookingRoomController.prototype, "getBookingRoomDevices", null);
tslib_1.__decorate([
    (0, role_decorator_1.Roles)(roles_enum_1.Role.APP_LIBRARIAN, roles_enum_1.Role.APP_MANAGER, roles_enum_1.Role.APP_ADMIN),
    (0, common_1.Get)('wishlist'),
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
    tslib_1.__metadata("design:paramtypes", [typeof (_f = typeof keycloak_user_1.KeycloakUserInstance !== "undefined" && keycloak_user_1.KeycloakUserInstance) === "function" ? _f : Object, String, Number, Number]),
    tslib_1.__metadata("design:returntype", typeof (_g = typeof Promise !== "undefined" && Promise) === "function" ? _g : Object)
], BookingRoomController.prototype, "getWishlistBookingRooms", null);
tslib_1.__decorate([
    (0, role_decorator_1.Roles)(roles_enum_1.Role.APP_LIBRARIAN, roles_enum_1.Role.APP_MANAGER, roles_enum_1.Role.APP_ADMIN, roles_enum_1.Role.APP_STAFF),
    (0, common_1.Post)('add-to-wishlist'),
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
    tslib_1.__metadata("design:paramtypes", [typeof (_h = typeof keycloak_user_1.KeycloakUserInstance !== "undefined" && keycloak_user_1.KeycloakUserInstance) === "function" ? _h : Object, typeof (_j = typeof wishlist_booking_room_request_dto_1.WishlistBookingRoomRequestDTO !== "undefined" && wishlist_booking_room_request_dto_1.WishlistBookingRoomRequestDTO) === "function" ? _j : Object]),
    tslib_1.__metadata("design:returntype", typeof (_k = typeof Promise !== "undefined" && Promise) === "function" ? _k : Object)
], BookingRoomController.prototype, "addToBookingRoomWishlist", null);
tslib_1.__decorate([
    (0, common_1.Delete)('remove-from-wishlist'),
    (0, role_decorator_1.Roles)(roles_enum_1.Role.APP_LIBRARIAN, roles_enum_1.Role.APP_MANAGER, roles_enum_1.Role.APP_ADMIN, roles_enum_1.Role.APP_STAFF),
    tslib_1.__param(0, (0, keycloak_user_decorator_1.User)()),
    tslib_1.__param(1, (0, common_1.Query)('roomId')),
    tslib_1.__param(2, (0, common_1.Query)('slot')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_l = typeof keycloak_user_1.KeycloakUserInstance !== "undefined" && keycloak_user_1.KeycloakUserInstance) === "function" ? _l : Object, String, Number]),
    tslib_1.__metadata("design:returntype", void 0)
], BookingRoomController.prototype, "removeFromBookingRoomWishlist", null);
BookingRoomController = BookingRoomController_1 = tslib_1.__decorate([
    (0, common_1.Controller)('/v1/booking-room'),
    (0, swagger_1.ApiTags)('Booking Room'),
    (0, common_1.UseInterceptors)(new path_logger_interceptor_1.PathLoggerInterceptor(BookingRoomController_1.name)),
    (0, swagger_1.ApiBearerAuth)(),
    tslib_1.__metadata("design:paramtypes", [typeof (_m = typeof services_1.BookingRoomService !== "undefined" && services_1.BookingRoomService) === "function" ? _m : Object])
], BookingRoomController);
exports.BookingRoomController = BookingRoomController;


/***/ }),

/***/ "./apps/backend/src/app/controllers/device-type.controller.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b, _c, _d, _e, _f, _g;
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
let DeviceTypeController = class DeviceTypeController {
    constructor(service) {
        this.service = service;
    }
    getAllDeviceTypes(limit, dir, page, sort, search) {
        return this.service.getAllDeviceTypes({
            limit,
            dir,
            page,
            sort,
            search,
        });
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
    permanentlyDeleteDeviceTypeById(id) {
        return this.service.permanentlyDeleteDeviceTypeById(id);
    }
    getDeletedDeviceTypes(search) {
        return this.service.getDeletedDeviceTypes(search);
    }
    restoreDeletedRoomTypeById(id, keycloakUser) {
        return this.service.restoreDeletedRoomTypeById(keycloakUser.account_id, id);
    }
};
tslib_1.__decorate([
    (0, common_1.Get)(),
    tslib_1.__param(0, (0, common_1.Query)('limit', new common_1.DefaultValuePipe(10), common_1.ParseIntPipe)),
    tslib_1.__param(1, (0, common_1.Query)('dir', new common_1.DefaultValuePipe('ASC'))),
    tslib_1.__param(2, (0, common_1.Query)('page', new common_1.DefaultValuePipe(1), common_1.ParseIntPipe)),
    tslib_1.__param(3, (0, common_1.Query)('sort', new common_1.DefaultValuePipe('name'))),
    tslib_1.__param(4, (0, common_1.Query)('search', new common_1.DefaultValuePipe(''))),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, String, Number, String, String]),
    tslib_1.__metadata("design:returntype", typeof (_a = typeof Promise !== "undefined" && Promise) === "function" ? _a : Object)
], DeviceTypeController.prototype, "getAllDeviceTypes", null);
tslib_1.__decorate([
    (0, common_1.Get)(':id'),
    tslib_1.__param(0, (0, common_1.Param)('id')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String]),
    tslib_1.__metadata("design:returntype", typeof (_b = typeof Promise !== "undefined" && Promise) === "function" ? _b : Object)
], DeviceTypeController.prototype, "getDeviceTypeById", null);
tslib_1.__decorate([
    (0, common_1.Post)(),
    tslib_1.__param(0, (0, keycloak_user_decorator_1.User)()),
    tslib_1.__param(1, (0, common_1.Body)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_c = typeof keycloak_user_1.KeycloakUserInstance !== "undefined" && keycloak_user_1.KeycloakUserInstance) === "function" ? _c : Object, Object]),
    tslib_1.__metadata("design:returntype", void 0)
], DeviceTypeController.prototype, "addNewDeviceType", null);
tslib_1.__decorate([
    (0, common_1.Put)(':id'),
    tslib_1.__param(0, (0, common_1.Param)('id')),
    tslib_1.__param(1, (0, common_1.Body)()),
    tslib_1.__param(2, (0, keycloak_user_decorator_1.User)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, Object, typeof (_d = typeof keycloak_user_1.KeycloakUserInstance !== "undefined" && keycloak_user_1.KeycloakUserInstance) === "function" ? _d : Object]),
    tslib_1.__metadata("design:returntype", void 0)
], DeviceTypeController.prototype, "updateDeviceTypeById", null);
tslib_1.__decorate([
    (0, common_1.Delete)(':id'),
    tslib_1.__param(0, (0, common_1.Param)('id')),
    tslib_1.__param(1, (0, keycloak_user_decorator_1.User)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, typeof (_e = typeof keycloak_user_1.KeycloakUserInstance !== "undefined" && keycloak_user_1.KeycloakUserInstance) === "function" ? _e : Object]),
    tslib_1.__metadata("design:returntype", void 0)
], DeviceTypeController.prototype, "deleteDeviceTypeById", null);
tslib_1.__decorate([
    (0, common_1.Delete)('permanent/:id'),
    tslib_1.__param(0, (0, common_1.Param)('id')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String]),
    tslib_1.__metadata("design:returntype", void 0)
], DeviceTypeController.prototype, "permanentlyDeleteDeviceTypeById", null);
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
    tslib_1.__metadata("design:paramtypes", [String, typeof (_f = typeof keycloak_user_1.KeycloakUserInstance !== "undefined" && keycloak_user_1.KeycloakUserInstance) === "function" ? _f : Object]),
    tslib_1.__metadata("design:returntype", void 0)
], DeviceTypeController.prototype, "restoreDeletedRoomTypeById", null);
DeviceTypeController = tslib_1.__decorate([
    (0, common_1.Controller)('/v1/device-type'),
    tslib_1.__metadata("design:paramtypes", [typeof (_g = typeof device_type_service_1.DeviceTypeService !== "undefined" && device_type_service_1.DeviceTypeService) === "function" ? _g : Object])
], DeviceTypeController);
exports.DeviceTypeController = DeviceTypeController;


/***/ }),

/***/ "./apps/backend/src/app/controllers/devices.controller.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var DevicesController_1, _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.DevicesController = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const services_1 = __webpack_require__("./apps/backend/src/app/services/index.ts");
const swagger_1 = __webpack_require__("@nestjs/swagger");
const models_1 = __webpack_require__("./libs/models/src/index.ts");
const devices_payload_1 = __webpack_require__("./apps/backend/src/app/payload/request/devices.payload.ts");
const devices_validation_1 = __webpack_require__("./apps/backend/src/app/pipes/validation/devices.validation.ts");
const path_logger_interceptor_1 = __webpack_require__("./apps/backend/src/app/interceptors/path-logger.interceptor.ts");
const role_decorator_1 = __webpack_require__("./apps/backend/src/app/decorators/role.decorator.ts");
const roles_enum_1 = __webpack_require__("./apps/backend/src/app/enum/roles.enum.ts");
const keycloak_user_1 = __webpack_require__("./apps/backend/src/app/dto/keycloak.user.ts");
const keycloak_user_decorator_1 = __webpack_require__("./apps/backend/src/app/decorators/keycloak-user.decorator.ts");
let DevicesController = DevicesController_1 = class DevicesController {
    constructor(service) {
        this.service = service;
    }
    createNewDevice(user, room) {
        return this.service.add(room);
    }
    getDeviceById(id) {
        return this.service.findById(id);
    }
    getDevices(request) {
        return this.service.getAll(request);
    }
    getDisableDevices() {
        return this.service.getDisabledDevices();
    }
    getDeletedDevices() {
        return this.service.getDeletedDevices();
    }
    restoreDeletedDeviceById(payload) {
        return this.service.handleRestoreDeviceById(payload.id);
    }
    restoreDisabledDeviceById(payload) {
        return this.service.handleRestoreDisabledDeviceById(payload.id);
    }
    updateDeviceById(user, id, body) {
        return this.service.updateById(body, id);
    }
    disableDeviceById(user, payload) {
        return this.service.disableById(payload.id);
    }
    deleteDeviceById(user, payload) {
        return this.service.deleteById(user.account_id, payload.id);
    }
};
tslib_1.__decorate([
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
    (0, common_1.Post)('add'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, role_decorator_1.Roles)(roles_enum_1.Role.APP_LIBRARIAN, roles_enum_1.Role.APP_MANAGER, roles_enum_1.Role.APP_ADMIN),
    tslib_1.__param(0, (0, keycloak_user_decorator_1.User)()),
    tslib_1.__param(1, (0, common_1.Body)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof keycloak_user_1.KeycloakUserInstance !== "undefined" && keycloak_user_1.KeycloakUserInstance) === "function" ? _a : Object, typeof (_b = typeof models_1.AddDeviceRequest !== "undefined" && models_1.AddDeviceRequest) === "function" ? _b : Object]),
    tslib_1.__metadata("design:returntype", void 0)
], DevicesController.prototype, "createNewDevice", null);
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
    tslib_1.__metadata("design:paramtypes", [String]),
    tslib_1.__metadata("design:returntype", void 0)
], DevicesController.prototype, "getDeviceById", null);
tslib_1.__decorate([
    (0, common_1.Post)(),
    (0, common_1.UsePipes)(new devices_validation_1.DevicesValidation()),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, role_decorator_1.Roles)(roles_enum_1.Role.APP_LIBRARIAN, roles_enum_1.Role.APP_MANAGER, roles_enum_1.Role.APP_ADMIN),
    (0, swagger_1.ApiOperation)({
        summary: 'Retrieving a list of devices',
        description: 'Retrieving a list of devices with provided pagination payload',
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
        description: 'Successfully retrieving a list of devices',
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.BAD_REQUEST,
        description: 'Error while retrieving a list of devices',
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.UNAUTHORIZED,
        description: 'Invalid access token',
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.FORBIDDEN,
        description: 'Insufficient privileges',
    }),
    tslib_1.__param(0, (0, common_1.Body)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_c = typeof devices_payload_1.DevicesRequestPayload !== "undefined" && devices_payload_1.DevicesRequestPayload) === "function" ? _c : Object]),
    tslib_1.__metadata("design:returntype", void 0)
], DevicesController.prototype, "getDevices", null);
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
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", typeof (_d = typeof Promise !== "undefined" && Promise) === "function" ? _d : Object)
], DevicesController.prototype, "getDisableDevices", null);
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
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", typeof (_e = typeof Promise !== "undefined" && Promise) === "function" ? _e : Object)
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
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", void 0)
], DevicesController.prototype, "restoreDisabledDeviceById", null);
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
    tslib_1.__metadata("design:paramtypes", [typeof (_f = typeof keycloak_user_1.KeycloakUserInstance !== "undefined" && keycloak_user_1.KeycloakUserInstance) === "function" ? _f : Object, String, typeof (_g = typeof models_1.UpdateDeviceRequest !== "undefined" && models_1.UpdateDeviceRequest) === "function" ? _g : Object]),
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
    tslib_1.__param(1, (0, common_1.Param)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_h = typeof keycloak_user_1.KeycloakUserInstance !== "undefined" && keycloak_user_1.KeycloakUserInstance) === "function" ? _h : Object, Object]),
    tslib_1.__metadata("design:returntype", void 0)
], DevicesController.prototype, "disableDeviceById", null);
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
    tslib_1.__metadata("design:paramtypes", [typeof (_j = typeof keycloak_user_1.KeycloakUserInstance !== "undefined" && keycloak_user_1.KeycloakUserInstance) === "function" ? _j : Object, Object]),
    tslib_1.__metadata("design:returntype", void 0)
], DevicesController.prototype, "deleteDeviceById", null);
DevicesController = DevicesController_1 = tslib_1.__decorate([
    (0, common_1.Controller)('/v1/devices'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiTags)('Devices'),
    (0, common_1.UseInterceptors)(new path_logger_interceptor_1.PathLoggerInterceptor(DevicesController_1.name)),
    tslib_1.__metadata("design:paramtypes", [typeof (_k = typeof services_1.DevicesService !== "undefined" && services_1.DevicesService) === "function" ? _k : Object])
], DevicesController);
exports.DevicesController = DevicesController;


/***/ }),

/***/ "./apps/backend/src/app/controllers/equipments-history.controller.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.EquipmentsHistoryController = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const services_1 = __webpack_require__("./apps/backend/src/app/services/index.ts");
const models_1 = __webpack_require__("./apps/backend/src/app/models/index.ts");
const swagger_1 = __webpack_require__("@nestjs/swagger");
const path_logger_interceptor_1 = __webpack_require__("./apps/backend/src/app/interceptors/path-logger.interceptor.ts");
const role_decorator_1 = __webpack_require__("./apps/backend/src/app/decorators/role.decorator.ts");
const roles_enum_1 = __webpack_require__("./apps/backend/src/app/enum/roles.enum.ts");
let EquipmentsHistoryController = class EquipmentsHistoryController {
    constructor(service) {
        this.service = service;
    }
    getAll() {
        return this.service.getAllByPagination();
    }
};
tslib_1.__decorate([
    (0, swagger_1.ApiOperation)({
        description: "Get all equipments history"
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.BAD_REQUEST,
        description: 'Request payload for equipments history not validated'
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.UNAUTHORIZED,
        description: "Access token is invalidated"
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.FORBIDDEN,
        description: "Invalid role"
    }),
    (0, common_1.Get)(),
    (0, role_decorator_1.Roles)(roles_enum_1.Role.APP_LIBRARIAN, roles_enum_1.Role.APP_MANAGER, roles_enum_1.Role.APP_ADMIN),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", typeof (_a = typeof Promise !== "undefined" && Promise) === "function" ? _a : Object)
], EquipmentsHistoryController.prototype, "getAll", null);
EquipmentsHistoryController = tslib_1.__decorate([
    (0, common_1.Controller)("/v1/equipments-history"),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseInterceptors)(new path_logger_interceptor_1.PathLoggerInterceptor(models_1.DevicesHist.name)),
    tslib_1.__metadata("design:paramtypes", [typeof (_b = typeof services_1.DevicesHistService !== "undefined" && services_1.DevicesHistService) === "function" ? _b : Object])
], EquipmentsHistoryController);
exports.EquipmentsHistoryController = EquipmentsHistoryController;


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
tslib_1.__exportStar(__webpack_require__("./apps/backend/src/app/controllers/equipments-history.controller.ts"), exports);
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
<<<<<<< HEAD
=======
    (0, class_validator_1.IsOptional)(),
>>>>>>> origin/develop
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
<<<<<<< HEAD
=======
    (0, class_validator_1.IsOptional)(),
>>>>>>> origin/develop
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
<<<<<<< HEAD
=======
    (0, class_validator_1.IsOptional)(),
>>>>>>> origin/develop
    (0, contains_many_validator_1.ContainsMany)(['ASC', 'DESC'], {
        message: 'Direction must be ASC or DESC',
    }),
    tslib_1.__metadata("design:type", String)
], PaginationParams.prototype, "dir", void 0);
tslib_1.__decorate([
<<<<<<< HEAD
=======
    (0, class_validator_1.IsOptional)(),
>>>>>>> origin/develop
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


var RoleController_1, _a, _b, _c, _d;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.RoleController = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const keycloak_user_decorator_1 = __webpack_require__("./apps/backend/src/app/decorators/keycloak-user.decorator.ts");
const keycloak_user_1 = __webpack_require__("./apps/backend/src/app/dto/keycloak.user.ts");
const role_service_1 = __webpack_require__("./apps/backend/src/app/services/role.service.ts");
const swagger_1 = __webpack_require__("@nestjs/swagger");
const path_logger_interceptor_1 = __webpack_require__("./apps/backend/src/app/interceptors/path-logger.interceptor.ts");
<<<<<<< HEAD
const role_decorator_1 = __webpack_require__("./apps/backend/src/app/decorators/role.decorator.ts");
const roles_enum_1 = __webpack_require__("./apps/backend/src/app/enum/roles.enum.ts");
=======
const roles_enum_1 = __webpack_require__("./apps/backend/src/app/enum/roles.enum.ts");
const role_decorator_1 = __webpack_require__("./apps/backend/src/app/decorators/role.decorator.ts");
>>>>>>> origin/develop
let RoleController = RoleController_1 = class RoleController {
    constructor(service) {
        this.service = service;
    }
    getRolesByPagination(search, dir, page, limit) {
        return this.service.getRolesByPagination({
            dir,
            page,
            search,
            limit,
        });
    }
    getRoleById(id) {
        return this.service.getRoleById(id);
    }
    updateRoleById(body, user, id) {
        return this.service.updateRoleById(user.account_id, body, id);
    }
    addRole(body, user) {
        return this.service.addRole(body, user.account_id);
    }
    deleteRoleById(keycloakUser, id) {
        return this.service.deleteRoleById(keycloakUser.account_id, id);
    }
    getDeletedRoles(search) {
        return this.service.getDeletedRoles(search);
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
    tslib_1.__param(0, (0, common_1.Query)('search', new common_1.DefaultValuePipe(''))),
    tslib_1.__param(1, (0, common_1.Query)('dir', new common_1.DefaultValuePipe('ASC'))),
    tslib_1.__param(2, (0, common_1.Query)('page', new common_1.DefaultValuePipe(1), common_1.ParseIntPipe)),
    tslib_1.__param(3, (0, common_1.Query)('limit', new common_1.DefaultValuePipe(10), common_1.ParseIntPipe)),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, String, Number, Number]),
    tslib_1.__metadata("design:returntype", void 0)
], RoleController.prototype, "getRolesByPagination", null);
tslib_1.__decorate([
    (0, common_1.Get)(':id'),
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
    (0, role_decorator_1.Roles)(roles_enum_1.Role.APP_LIBRARIAN, roles_enum_1.Role.APP_MANAGER, roles_enum_1.Role.APP_ADMIN),
    tslib_1.__param(0, (0, common_1.Param)('id')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String]),
    tslib_1.__metadata("design:returntype", void 0)
], RoleController.prototype, "getRoleById", null);
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
    tslib_1.__metadata("design:paramtypes", [Object, typeof (_a = typeof keycloak_user_1.KeycloakUserInstance !== "undefined" && keycloak_user_1.KeycloakUserInstance) === "function" ? _a : Object, String]),
    tslib_1.__metadata("design:returntype", void 0)
], RoleController.prototype, "updateRoleById", null);
tslib_1.__decorate([
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
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, common_1.Post)(),
    (0, role_decorator_1.Roles)(roles_enum_1.Role.APP_LIBRARIAN, roles_enum_1.Role.APP_MANAGER, roles_enum_1.Role.APP_ADMIN),
    tslib_1.__param(0, (0, common_1.Body)()),
    tslib_1.__param(1, (0, keycloak_user_decorator_1.User)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object, typeof (_b = typeof keycloak_user_1.KeycloakUserInstance !== "undefined" && keycloak_user_1.KeycloakUserInstance) === "function" ? _b : Object]),
    tslib_1.__metadata("design:returntype", void 0)
], RoleController.prototype, "addRole", null);
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
    tslib_1.__metadata("design:paramtypes", [typeof (_c = typeof keycloak_user_1.KeycloakUserInstance !== "undefined" && keycloak_user_1.KeycloakUserInstance) === "function" ? _c : Object, String]),
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
RoleController = RoleController_1 = tslib_1.__decorate([
    (0, common_1.Controller)('/v1/roles'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiTags)('Role'),
    (0, common_1.UseInterceptors)(new path_logger_interceptor_1.PathLoggerInterceptor(RoleController_1.name)),
    tslib_1.__metadata("design:paramtypes", [typeof (_d = typeof role_service_1.RoleService !== "undefined" && role_service_1.RoleService) === "function" ? _d : Object])
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
const room_type_update_request_payload_1 = __webpack_require__("./apps/backend/src/app/payload/request/room-type-update.request.payload.ts");
const room_type_add_request_payload_1 = __webpack_require__("./apps/backend/src/app/payload/request/room-type-add.request.payload.ts");
const keycloak_user_decorator_1 = __webpack_require__("./apps/backend/src/app/decorators/keycloak-user.decorator.ts");
const keycloak_user_1 = __webpack_require__("./apps/backend/src/app/dto/keycloak.user.ts");
const path_logger_interceptor_1 = __webpack_require__("./apps/backend/src/app/interceptors/path-logger.interceptor.ts");
const role_decorator_1 = __webpack_require__("./apps/backend/src/app/decorators/role.decorator.ts");
const roles_enum_1 = __webpack_require__("./apps/backend/src/app/enum/roles.enum.ts");
let RoomTypeController = class RoomTypeController {
    constructor(service) {
        this.service = service;
    }
    getRoomTypes(limit, dir, page, sort, search) {
        return this.service.getRoomTypesWithPagination({
            limit,
            dir,
            sort,
            search,
            page,
        });
    }
    getRoomTypeNames() {
        return this.service.getRoomTypeNames();
    }
    getRoomTypeById(id) {
        return this.service.getRoomTypeById(id);
    }
    updateRoomTypeById(updatePayload, id, keycloakUser) {
        return this.service.updateRoomTypeById(keycloakUser.account_id, updatePayload, id);
    }
    // @Put('disable/:id')
    // @Roles(Role.APP_LIBRARIAN, Role.APP_MANAGER, Role.APP_ADMIN)
    // @ApiResponse({
    //   status: HttpStatus.OK,
    //   description: 'Successfully fetched disabled room type by id',
    // })
    // @ApiResponse({
    //   status: HttpStatus.BAD_REQUEST,
    //   description: 'Request params for roles is not validated',
    // })
    // @ApiResponse({
    //   status: HttpStatus.UNAUTHORIZED,
    //   description: 'Access token is invalidated',
    // })
    // @ApiResponse({
    //   status: HttpStatus.FORBIDDEN,
    //   description: 'Insufficient privileges',
    // })
    // @ApiOperation({
    //   summary: 'Get disabled room type by id',
    //   description: 'Get disabled room type by id',
    // })
    // disableRoomTypeById(
    //   @Param('id') id: string,
    //   @User() keycloakUser: KeycloakUserInstance
    // ) {
    //   return this.service.disableRoomTypeById(keycloakUser.account_id, id);
    // }
    getDisabledRoomTypes(search) {
        return this.service.getDisabledRoomTypes(search);
    }
    getDeletedRoomTypes(search) {
        return this.service.getDeletedRoomTypes(search);
    }
    restoreDisabledRoomTypeById(id, keycloakUser) {
        return this.service.restoreDisabledRoomTypeById(keycloakUser.account_id, id);
    }
    restoreDeletedRoomTypeById(id, keycloakUser) {
        return this.service.restoreDeletedRoomTypeById(keycloakUser.account_id, id);
    }
    deleteRoomTypeById(id, keycloakUser) {
        return this.service.deleteRoomTypeById(keycloakUser.account_id, id);
    }
    addRoomType(keycloakUser, addRoomType) {
        return this.service.addRoomType(keycloakUser.account_id, addRoomType);
    }
};
tslib_1.__decorate([
    (0, common_1.Get)(),
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
    tslib_1.__param(0, (0, common_1.Query)('limit', new common_1.DefaultValuePipe(10), common_1.ParseIntPipe)),
    tslib_1.__param(1, (0, common_1.Query)('dir', new common_1.DefaultValuePipe('ASC'))),
    tslib_1.__param(2, (0, common_1.Query)('page', new common_1.DefaultValuePipe(1), common_1.ParseIntPipe)),
    tslib_1.__param(3, (0, common_1.Query)('sort', new common_1.DefaultValuePipe('name'))),
    tslib_1.__param(4, (0, common_1.Query)('search', new common_1.DefaultValuePipe(''))),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, String, Number, String, String]),
    tslib_1.__metadata("design:returntype", void 0)
], RoomTypeController.prototype, "getRoomTypes", null);
tslib_1.__decorate([
    (0, common_1.Get)('name'),
    (0, role_decorator_1.Roles)(roles_enum_1.Role.APP_LIBRARIAN, roles_enum_1.Role.APP_MANAGER, roles_enum_1.Role.APP_ADMIN),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
        description: 'Successfully got disabled room types',
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
        summary: 'Get disabled room types',
        description: 'Get disabled room types',
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
    tslib_1.__param(0, (0, common_1.Body)()),
    tslib_1.__param(1, (0, common_1.Param)('id')),
    tslib_1.__param(2, (0, keycloak_user_decorator_1.User)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof room_type_update_request_payload_1.RoomTypeUpdateRequestPayload !== "undefined" && room_type_update_request_payload_1.RoomTypeUpdateRequestPayload) === "function" ? _a : Object, String, typeof (_b = typeof keycloak_user_1.KeycloakUserInstance !== "undefined" && keycloak_user_1.KeycloakUserInstance) === "function" ? _b : Object]),
    tslib_1.__metadata("design:returntype", void 0)
], RoomTypeController.prototype, "updateRoomTypeById", null);
tslib_1.__decorate([
    (0, common_1.Get)('disabled'),
    (0, role_decorator_1.Roles)(roles_enum_1.Role.APP_LIBRARIAN, roles_enum_1.Role.APP_MANAGER, roles_enum_1.Role.APP_ADMIN),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
        description: 'Successfully got disabled room types',
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
        summary: 'Get disabled room types',
        description: 'Get disabled room types',
    }),
    tslib_1.__param(0, (0, common_1.Query)('search')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String]),
    tslib_1.__metadata("design:returntype", void 0)
], RoomTypeController.prototype, "getDisabledRoomTypes", null);
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
    (0, common_1.Put)('restore-disabled/:id'),
    (0, role_decorator_1.Roles)(roles_enum_1.Role.APP_LIBRARIAN, roles_enum_1.Role.APP_MANAGER, roles_enum_1.Role.APP_ADMIN),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
        description: 'Successfully restored disabled room by id',
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
        summary: 'Restore disabled room type by id',
        description: 'Restore disabled room type by id',
    }),
    tslib_1.__param(0, (0, common_1.Param)('id')),
    tslib_1.__param(1, (0, keycloak_user_decorator_1.User)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, typeof (_c = typeof keycloak_user_1.KeycloakUserInstance !== "undefined" && keycloak_user_1.KeycloakUserInstance) === "function" ? _c : Object]),
    tslib_1.__metadata("design:returntype", void 0)
], RoomTypeController.prototype, "restoreDisabledRoomTypeById", null);
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
    tslib_1.__metadata("design:paramtypes", [String, typeof (_d = typeof keycloak_user_1.KeycloakUserInstance !== "undefined" && keycloak_user_1.KeycloakUserInstance) === "function" ? _d : Object]),
    tslib_1.__metadata("design:returntype", void 0)
], RoomTypeController.prototype, "restoreDeletedRoomTypeById", null);
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
    tslib_1.__metadata("design:paramtypes", [String, typeof (_e = typeof keycloak_user_1.KeycloakUserInstance !== "undefined" && keycloak_user_1.KeycloakUserInstance) === "function" ? _e : Object]),
    tslib_1.__metadata("design:returntype", void 0)
], RoomTypeController.prototype, "deleteRoomTypeById", null);
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
    tslib_1.__metadata("design:paramtypes", [typeof (_f = typeof keycloak_user_1.KeycloakUserInstance !== "undefined" && keycloak_user_1.KeycloakUserInstance) === "function" ? _f : Object, typeof (_g = typeof room_type_add_request_payload_1.RoomTypeAddRequestPayload !== "undefined" && room_type_add_request_payload_1.RoomTypeAddRequestPayload) === "function" ? _g : Object]),
    tslib_1.__metadata("design:returntype", void 0)
], RoomTypeController.prototype, "addRoomType", null);
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


var RoomsController_1, _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.RoomsController = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const services_1 = __webpack_require__("./apps/backend/src/app/services/index.ts");
const models_1 = __webpack_require__("./libs/models/src/index.ts");
const rooms_validation_1 = __webpack_require__("./apps/backend/src/app/pipes/validation/rooms.validation.ts");
const swagger_1 = __webpack_require__("@nestjs/swagger");
const path_logger_interceptor_1 = __webpack_require__("./apps/backend/src/app/interceptors/path-logger.interceptor.ts");
const role_decorator_1 = __webpack_require__("./apps/backend/src/app/decorators/role.decorator.ts");
const roles_enum_1 = __webpack_require__("./apps/backend/src/app/enum/roles.enum.ts");
const add_room_validation_1 = __webpack_require__("./apps/backend/src/app/pipes/validation/add-room.validation.ts");
const keycloak_user_decorator_1 = __webpack_require__("./apps/backend/src/app/decorators/keycloak-user.decorator.ts");
const keycloak_user_1 = __webpack_require__("./apps/backend/src/app/dto/keycloak.user.ts");
const rooms_pagination_model_1 = __webpack_require__("./apps/backend/src/app/controllers/rooms-pagination.model.ts");
let RoomsController = RoomsController_1 = class RoomsController {
    constructor(service) {
        this.service = service;
    }
    addRoom(user, room) {
        return this.service.add(user, room);
    }
    getRoomById(payload) {
        return this.service.findById(payload.id);
    }
    getRooms(payload) {
        return this.service.getAll(payload);
    }
    getDisableRooms(search = '') {
        return this.service.getDisabledRooms(search);
    }
    getDeletedRooms(search = '') {
        return this.service.getDeletedRooms(search);
    }
    getRoomsByRoomType(roomTypeId = '') {
        return this.service.getRoomsByRoomType(roomTypeId);
    }
    restoreDeletedRoomById(payload) {
        return this.service.handleRestoreDeletedRoomById(payload.id);
    }
    restoreDisabledRoomById(payload) {
        return this.service.handleRestoreDisabledRoomById(payload.id);
    }
    updateRoomById(user, payload, body) {
        return this.service.updateById(user.account_id, payload.id, body);
    }
    disableRoomById(user, id) {
        return this.service.disableById(user.account_id, id);
    }
    deleteRoomById(user, payload) {
        return this.service.deleteById(user.account_id, payload.id);
    }
};
tslib_1.__decorate([
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
    (0, common_1.Post)('add'),
    (0, common_1.UsePipes)(new add_room_validation_1.AddRoomValidation()),
    (0, role_decorator_1.Roles)(roles_enum_1.Role.APP_MANAGER, roles_enum_1.Role.APP_ADMIN),
    tslib_1.__param(0, (0, keycloak_user_decorator_1.User)()),
    tslib_1.__param(1, (0, common_1.Body)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof keycloak_user_1.KeycloakUserInstance !== "undefined" && keycloak_user_1.KeycloakUserInstance) === "function" ? _a : Object, typeof (_b = typeof models_1.AddRoomRequest !== "undefined" && models_1.AddRoomRequest) === "function" ? _b : Object]),
    tslib_1.__metadata("design:returntype", typeof (_c = typeof Promise !== "undefined" && Promise) === "function" ? _c : Object)
], RoomsController.prototype, "addRoom", null);
tslib_1.__decorate([
    (0, common_1.Get)('find/:id'),
    (0, role_decorator_1.Roles)(roles_enum_1.Role.APP_LIBRARIAN, roles_enum_1.Role.APP_MANAGER, roles_enum_1.Role.APP_ADMIN),
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
    tslib_1.__metadata("design:returntype", typeof (_d = typeof Promise !== "undefined" && Promise) === "function" ? _d : Object)
], RoomsController.prototype, "getRoomById", null);
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
    tslib_1.__metadata("design:paramtypes", [typeof (_e = typeof rooms_pagination_model_1.RoomsPaginationParams !== "undefined" && rooms_pagination_model_1.RoomsPaginationParams) === "function" ? _e : Object]),
    tslib_1.__metadata("design:returntype", void 0)
], RoomsController.prototype, "getRooms", null);
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
    tslib_1.__metadata("design:returntype", typeof (_f = typeof Promise !== "undefined" && Promise) === "function" ? _f : Object)
], RoomsController.prototype, "getDisableRooms", null);
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
    tslib_1.__metadata("design:returntype", typeof (_g = typeof Promise !== "undefined" && Promise) === "function" ? _g : Object)
], RoomsController.prototype, "getDeletedRooms", null);
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
    tslib_1.__metadata("design:returntype", typeof (_h = typeof Promise !== "undefined" && Promise) === "function" ? _h : Object)
], RoomsController.prototype, "getRoomsByRoomType", null);
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
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", void 0)
], RoomsController.prototype, "restoreDeletedRoomById", null);
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
    tslib_1.__param(0, (0, common_1.Param)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", void 0)
], RoomsController.prototype, "restoreDisabledRoomById", null);
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
    tslib_1.__metadata("design:paramtypes", [typeof (_j = typeof keycloak_user_1.KeycloakUserInstance !== "undefined" && keycloak_user_1.KeycloakUserInstance) === "function" ? _j : Object, Object, typeof (_k = typeof models_1.UpdateRoomRequest !== "undefined" && models_1.UpdateRoomRequest) === "function" ? _k : Object]),
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
    tslib_1.__metadata("design:paramtypes", [typeof (_l = typeof keycloak_user_1.KeycloakUserInstance !== "undefined" && keycloak_user_1.KeycloakUserInstance) === "function" ? _l : Object, String]),
    tslib_1.__metadata("design:returntype", void 0)
], RoomsController.prototype, "disableRoomById", null);
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
RoomsController = RoomsController_1 = tslib_1.__decorate([
    (0, common_1.Controller)('/v1/rooms'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiTags)('Rooms'),
    (0, common_1.UseInterceptors)(new path_logger_interceptor_1.PathLoggerInterceptor(RoomsController_1.name)),
    tslib_1.__metadata("design:paramtypes", [typeof (_o = typeof services_1.RoomsService !== "undefined" && services_1.RoomsService) === "function" ? _o : Object])
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
    getSlotById(id) {
        return this.service.getById(id);
    }
};
tslib_1.__decorate([
    (0, common_1.Get)(),
    (0, role_decorator_1.Roles)(roles_enum_1.Role.APP_LIBRARIAN, roles_enum_1.Role.APP_MANAGER, roles_enum_1.Role.APP_ADMIN),
<<<<<<< HEAD
=======
    tslib_1.__param(0, (0, common_1.Optional)()),
>>>>>>> origin/develop
    tslib_1.__param(0, (0, common_1.Query)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof pagination_model_1.PaginationParams !== "undefined" && pagination_model_1.PaginationParams) === "function" ? _a : Object]),
    tslib_1.__metadata("design:returntype", void 0)
], SlotController.prototype, "getAllSlotsByPagination", null);
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
        name: 'role',
        type: 'varchar',
        length: '36',
        nullable: false,
        comment: 'Role of the associated user.',
    }),
    tslib_1.__metadata("design:type", String)
], Accounts.prototype, "role", void 0);
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
        name: "time_checkin",
        nullable: false,
        type: "timestamptz"
    }),
    tslib_1.__metadata("design:type", typeof (_a = typeof Date !== "undefined" && Date) === "function" ? _a : Object)
], BookingRequest.prototype, "timeCheckIn", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({
        name: "time_checkout",
        nullable: false,
        type: "timestamptz"
    }),
    tslib_1.__metadata("design:type", typeof (_b = typeof Date !== "undefined" && Date) === "function" ? _b : Object)
], BookingRequest.prototype, "timeCheckOut", void 0);
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
    tslib_1.__metadata("design:type", typeof (_c = typeof Date !== "undefined" && Date) === "function" ? _c : Object)
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
        name: "booked_at",
        nullable: false,
        type: "timestamptz"
    }),
    tslib_1.__metadata("design:type", typeof (_d = typeof Date !== "undefined" && Date) === "function" ? _d : Object)
], BookingRequest.prototype, "bookedAt", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({
        name: "checkin_at",
        nullable: false,
        type: "timestamptz"
    }),
    tslib_1.__metadata("design:type", typeof (_e = typeof Date !== "undefined" && Date) === "function" ? _e : Object)
], BookingRequest.prototype, "checkedInAt", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({
        name: "checkout_at",
        nullable: false,
        type: "timestamptz"
    }),
    tslib_1.__metadata("design:type", typeof (_f = typeof Date !== "undefined" && Date) === "function" ? _f : Object)
], BookingRequest.prototype, "checkedOutAt", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({
        name: "updated_at",
        nullable: false,
        type: "timestamptz"
    }),
    tslib_1.__metadata("design:type", String)
], BookingRequest.prototype, "updatedAt", void 0);
BookingRequest = tslib_1.__decorate([
    (0, typeorm_1.Entity)("booking_request")
], BookingRequest);
exports.BookingRequest = BookingRequest;


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


var DevicesHist_1, _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.DevicesHist = void 0;
const tslib_1 = __webpack_require__("tslib");
const typeorm_1 = __webpack_require__("typeorm");
const base_entity_1 = __webpack_require__("./apps/backend/src/app/models/base/base.entity.ts");
let DevicesHist = DevicesHist_1 = class DevicesHist extends base_entity_1.BaseEntityWithDisabled {
};
tslib_1.__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('increment', {
        name: 'id',
        comment: 'ID for Equipment History',
        type: 'bigint',
    }),
    tslib_1.__metadata("design:type", Number)
], DevicesHist.prototype, "equipmentsHistoryId", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({
        name: 'name',
        nullable: false,
        unique: false,
        length: 36,
        type: 'varchar',
        comment: 'Old ID for Equipment',
    }),
    tslib_1.__metadata("design:type", String)
], DevicesHist.prototype, "id", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({
        name: 'name',
        nullable: false,
        unique: false,
        length: 250,
        type: 'varchar',
        comment: 'Equipments name',
    }),
    tslib_1.__metadata("design:type", String)
], DevicesHist.prototype, "name", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({
        name: 'description',
        nullable: true,
        unique: false,
        length: 500,
        type: 'varchar',
        comment: 'Equipments description',
    }),
    tslib_1.__metadata("design:type", String)
], DevicesHist.prototype, "description", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({
        name: 'effdate',
        nullable: true,
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP',
    }),
    tslib_1.__metadata("design:type", typeof (_a = typeof Date !== "undefined" && Date) === "function" ? _a : Object)
], DevicesHist.prototype, "effDate", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({
        name: 'inactive_date',
        nullable: true,
        type: 'timestamp',
    }),
    tslib_1.__metadata("design:type", typeof (_b = typeof Date !== "undefined" && Date) === "function" ? _b : Object)
], DevicesHist.prototype, "inactiveDate", void 0);
DevicesHist = DevicesHist_1 = tslib_1.__decorate([
    (0, typeorm_1.Entity)(DevicesHist_1.name.toLowerCase())
], DevicesHist);
exports.DevicesHist = DevicesHist;


/***/ }),

/***/ "./apps/backend/src/app/models/devices.entity.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var Devices_1, _a, _b;
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
        name: 'effdate',
        nullable: false,
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP',
    }),
    tslib_1.__metadata("design:type", typeof (_a = typeof Date !== "undefined" && Date) === "function" ? _a : Object)
], Devices.prototype, "effDate", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({
        name: 'inactive_date',
        nullable: true,
        type: 'timestamp',
    }),
    tslib_1.__metadata("design:type", typeof (_b = typeof Date !== "undefined" && Date) === "function" ? _b : Object)
], Devices.prototype, "inactiveDate", void 0);
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
tslib_1.__exportStar(__webpack_require__("./apps/backend/src/app/models/devices.entity.ts"), exports);
tslib_1.__exportStar(__webpack_require__("./apps/backend/src/app/models/booking-request.entity.ts"), exports);
tslib_1.__exportStar(__webpack_require__("./apps/backend/src/app/models/devices-hist.entity.ts"), exports);
tslib_1.__exportStar(__webpack_require__("./apps/backend/src/app/models/room-wishlist.entity.ts"), exports);
tslib_1.__exportStar(__webpack_require__("./apps/backend/src/app/models/users-otp.entity.ts"), exports);
tslib_1.__exportStar(__webpack_require__("./apps/backend/src/app/models/users-warning-flag.entity.ts"), exports);
tslib_1.__exportStar(__webpack_require__("./apps/backend/src/app/models/users-warning-flag.hist.entity.ts"), exports);
tslib_1.__exportStar(__webpack_require__("./apps/backend/src/app/models/rooms.entity.ts"), exports);
tslib_1.__exportStar(__webpack_require__("./apps/backend/src/app/models/room-type.entity.ts"), exports);


/***/ }),

/***/ "./apps/backend/src/app/models/role.entity.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
<<<<<<< HEAD
exports.Roless = void 0;
const tslib_1 = __webpack_require__("tslib");
const typeorm_1 = __webpack_require__("typeorm");
const base_entity_1 = __webpack_require__("./apps/backend/src/app/models/base/base.entity.ts");
let Roless = class Roless extends base_entity_1.BaseEntity {
=======
exports.Roles = void 0;
const tslib_1 = __webpack_require__("tslib");
const typeorm_1 = __webpack_require__("typeorm");
const base_entity_1 = __webpack_require__("./apps/backend/src/app/models/base/base.entity.ts");
let Roles = class Roles extends base_entity_1.BaseEntity {
>>>>>>> origin/develop
};
tslib_1.__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid', {
        name: 'id',
    }),
    tslib_1.__metadata("design:type", String)
<<<<<<< HEAD
], Roless.prototype, "id", void 0);
=======
], Roles.prototype, "id", void 0);
>>>>>>> origin/develop
tslib_1.__decorate([
    (0, typeorm_1.Column)({
        name: 'name',
        type: 'varchar',
    }),
    tslib_1.__metadata("design:type", String)
<<<<<<< HEAD
], Roless.prototype, "name", void 0);
=======
], Roles.prototype, "name", void 0);
>>>>>>> origin/develop
tslib_1.__decorate([
    (0, typeorm_1.Column)({
        name: 'description',
        type: 'varchar',
    }),
    tslib_1.__metadata("design:type", String)
<<<<<<< HEAD
], Roless.prototype, "description", void 0);
Roless = tslib_1.__decorate([
    (0, typeorm_1.Entity)('role')
], Roless);
exports.Roless = Roless;
=======
], Roles.prototype, "description", void 0);
Roles = tslib_1.__decorate([
    (0, typeorm_1.Entity)('role')
], Roles);
exports.Roles = Roles;
>>>>>>> origin/develop


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
let AccountsModule = class AccountsModule {
};
AccountsModule = tslib_1.__decorate([
    (0, common_1.Module)({
        imports: [
            config_module_1.default,
            axios_1.HttpModule,
            typeorm_ex_module_1.TypeOrmExModule.forCustomRepository([repositories_1.AccountRepository])
        ],
        controllers: [
            controllers_1.AccountsController
        ],
        providers: [services_1.AccountsService, services_2.KeycloakService, services_3.CloudinaryService],
        exports: [services_1.AccountsService]
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
        providers: [booking_reason_service_1.BookingReasonService, booking_reason_hist_service_1.BookingReasonHistService],
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
            typeorm_ex_module_1.TypeOrmExModule.forCustomRepository([repositories_1.BookingRoomRepository, repositories_1.AccountRepository])
        ],
        controllers: [
            controllers_1.BookingRoomController
        ],
        providers: [services_1.BookingRoomService, task_service_1.TasksService],
        exports: [
            services_1.BookingRoomService
        ]
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
let DeviceTypeModule = class DeviceTypeModule {
};
DeviceTypeModule = tslib_1.__decorate([
    (0, common_1.Module)({
        imports: [
            config_module_1.default,
            axios_1.HttpModule,
            accounts_module_1.AccountsModule,
            typeorm_ex_module_1.TypeOrmExModule.forCustomRepository([device_type_repository_1.DeviceTypeRepository]),
        ],
        controllers: [device_type_controller_1.DeviceTypeController],
        exports: [device_type_service_1.DeviceTypeService],
        providers: [device_type_service_1.DeviceTypeService, services_1.KeycloakService],
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
const controllers_2 = __webpack_require__("./apps/backend/src/app/controllers/index.ts");
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
                repositories_2.DevicesHistRepository,
            ]),
        ],
        controllers: [controllers_1.DevicesController, controllers_2.EquipmentsHistoryController],
        providers: [services_1.DevicesService, services_2.DevicesHistService, services_3.KeycloakService],
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
<<<<<<< HEAD
const room_type_entity_1 = __webpack_require__("./apps/backend/src/app/models/room-type.entity.ts");
=======
const models_2 = __webpack_require__("./apps/backend/src/app/models/index.ts");
>>>>>>> origin/develop
const device_type_entity_1 = __webpack_require__("./apps/backend/src/app/models/device-type.entity.ts");
const booking_reason_entity_1 = __webpack_require__("./apps/backend/src/app/models/booking-reason.entity.ts");
const slot_entity_1 = __webpack_require__("./apps/backend/src/app/models/slot.entity.ts");
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
            models_1.Rooms,
            models_1.BookingRequest,
            models_1.Devices,
            models_1.DevicesHist,
            models_1.RoomWishlist,
            models_1.Rooms,
            models_1.UsersOTP,
            models_1.UsersWarningFlag,
            models_1.UsersWarningFlagHistory,
<<<<<<< HEAD
            role_entity_1.Roless,
            room_type_entity_1.RoomType,
=======
            role_entity_1.Roles,
            models_2.RoomType,
>>>>>>> origin/develop
            device_type_entity_1.DeviceType,
            booking_reason_entity_1.BookingReason,
            slot_entity_1.Slot,
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
let RoomTypeModule = class RoomTypeModule {
};
RoomTypeModule = tslib_1.__decorate([
    (0, common_1.Module)({
        imports: [
            config_module_1.default,
            axios_1.HttpModule,
            accounts_module_1.AccountsModule,
            typeorm_ex_module_1.TypeOrmExModule.forCustomRepository([room_type_repository_1.RoomTypeRepository]),
        ],
        exports: [room_type_service_1.RoomTypeService],
        controllers: [room_type_controller_1.RoomTypeController],
        providers: [room_type_service_1.RoomTypeService, services_1.KeycloakService],
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
let RoomsModule = class RoomsModule {
};
RoomsModule = tslib_1.__decorate([
    (0, common_1.Module)({
        imports: [
            accounts_module_1.AccountsModule,
            typeorm_ex_module_1.TypeOrmExModule.forCustomRepository([
                repositories_1.RoomsRepository,
            ]),
            axios_1.HttpModule,
            config_module_1.default,
            keycloak_module_1.KeycloakModule
        ],
        controllers: [
            controllers_1.RoomsController
        ],
        providers: [services_1.RoomsService],
        exports: [services_1.RoomsService]
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

/***/ "./apps/backend/src/app/payload/request/devices.payload.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.DevicesRequestPayload = void 0;
const tslib_1 = __webpack_require__("tslib");
const class_validator_1 = __webpack_require__("class-validator");
const global_validator_1 = __webpack_require__("./apps/backend/src/app/pipes/validation/global.validator.ts");
class DevicesRequestPayload {
}
tslib_1.__decorate([
    (0, class_validator_1.IsString)({
        message: 'Search property must be a string'
    }),
    tslib_1.__metadata("design:type", String)
], DevicesRequestPayload.prototype, "search", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)({
        message: 'Page property must not be empty'
    }),
    (0, class_validator_1.IsNumber)(global_validator_1.validationConfig.number),
    (0, class_validator_1.Max)(2147483647, {
        message: 'Page number is invalid'
    }),
    (0, class_validator_1.Min)(1, {
        message: 'Page number must be positive integer'
    }),
    tslib_1.__metadata("design:type", Number)
], DevicesRequestPayload.prototype, "page", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)({
        message: 'Size must not be empty'
    }),
    (0, class_validator_1.Max)(2147483647, {
        message: 'Size number is invalid'
    }),
    (0, class_validator_1.Min)(1, {
        message: 'Size number must be positive integer'
    }),
    (0, class_validator_1.IsNumber)(global_validator_1.validationConfig.number),
    tslib_1.__metadata("design:type", Number)
], DevicesRequestPayload.prototype, "limit", void 0);
exports.DevicesRequestPayload = DevicesRequestPayload;
;


/***/ }),

/***/ "./apps/backend/src/app/payload/request/room-type-add.request.payload.ts":
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));


/***/ }),

/***/ "./apps/backend/src/app/payload/request/room-type-update.request.payload.ts":
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));


/***/ }),

/***/ "./apps/backend/src/app/payload/request/users.payload.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UsersRequestPayload = void 0;
const tslib_1 = __webpack_require__("tslib");
const class_validator_1 = __webpack_require__("class-validator");
const contains_many_validator_1 = __webpack_require__("./apps/backend/src/app/validators/contains-many.validator.ts");
const global_validator_1 = __webpack_require__("./apps/backend/src/app/pipes/validation/global.validator.ts");
class UsersRequestPayload {
}
tslib_1.__decorate([
    (0, class_validator_1.IsString)({
        message: 'Search property must be a string'
    }),
    tslib_1.__metadata("design:type", String)
], UsersRequestPayload.prototype, "search", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)({
        message: 'Page property must not be empty'
    }),
    (0, class_validator_1.IsNumber)(global_validator_1.validationConfig.number),
    (0, class_validator_1.Max)(2147483647, {
        message: 'Page number is invalid'
    }),
    (0, class_validator_1.Min)(1, {
        message: 'Page number must be positive integer'
    }),
    tslib_1.__metadata("design:type", Number)
], UsersRequestPayload.prototype, "page", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)({
        message: 'Size must not be empty'
    }),
    (0, class_validator_1.Max)(2147483647, {
        message: 'Size number is invalid'
    }),
    (0, class_validator_1.Min)(1, {
        message: 'Size number must be positive integer'
    }),
    (0, class_validator_1.IsNumber)(global_validator_1.validationConfig.number),
    tslib_1.__metadata("design:type", Number)
], UsersRequestPayload.prototype, "limit", void 0);
tslib_1.__decorate([
    (0, contains_many_validator_1.ContainsMany)(["ASC", "DESC"], {
        message: `Sorting option must be 'ASC' or 'DESC'`
    }),
    tslib_1.__metadata("design:type", Object)
], UsersRequestPayload.prototype, "sort", void 0);
exports.UsersRequestPayload = UsersRequestPayload;
;


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

/***/ "./apps/backend/src/app/pipes/validation/global.validator.ts":
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.validationConfig = void 0;
exports.validationConfig = {
    number: {
        allowNaN: false,
        allowInfinity: false
    },
};


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

/***/ "./apps/backend/src/app/repositories/account.repository.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AccountRepository = void 0;
const tslib_1 = __webpack_require__("tslib");
const typeorm_1 = __webpack_require__("typeorm");
const models_1 = __webpack_require__("./apps/backend/src/app/models/index.ts");
const typeorm_ex_decorator_1 = __webpack_require__("./apps/backend/src/app/decorators/typeorm-ex.decorator.ts");
const nestjs_typeorm_paginate_1 = __webpack_require__("nestjs-typeorm-paginate");
<<<<<<< HEAD
=======
const role_entity_1 = __webpack_require__("./apps/backend/src/app/models/role.entity.ts");
>>>>>>> origin/develop
let AccountRepository = class AccountRepository extends typeorm_1.Repository {
    findKeycloakIdByGoogleId(googleId) {
        return this.createQueryBuilder('accounts')
            .select('accounts.keycloak_id', 'keycloakId')
            .where('accounts.google_id = :googleId', { googleId: googleId })
            .getRawOne()
            .then((data) => data === null || data === void 0 ? void 0 : data.keycloakId);
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
    findByGoogleId(googleId) {
        return this.createQueryBuilder('accounts')
            .where('accounts.googleId = :googleId', { googleId })
            .andWhere('accounts.disabled_at IS NULL')
            .andWhere('accounts.deleted_at IS NULL')
            .getOneOrFail();
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
<<<<<<< HEAD
            'accounts.role',
            'accounts.avatar',
        ])
=======
            'accounts.avatar',
        ])
            .addSelect('r.name', 'role')
            .innerJoin(role_entity_1.Roles, 'r', 'r.id = accounts.role_id')
>>>>>>> origin/develop
            .where('accounts.keycloak_id = :keycloakId', { keycloakId: keycloakId })
            .andWhere('accounts.disabled_at IS NULL')
            .andWhere('accounts.deleted_at IS NULL')
            .getOneOrFail();
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
    search(payload) {
        const query = this.createQueryBuilder(`accounts`)
            .where(`accounts.name LIKE :name`, { name: `%${payload.search}%` })
            .orWhere(`accounts.description LIKE :description`, {
            description: `%${payload.search}%`,
        })
            .andWhere('accounts.disabled_at IS NULL')
            .andWhere('accounts.deleted_at IS NULL')
            .orWhere(`accounts.username = :username`, {
            username: `%${payload.search}%`,
        })
            .orWhere(`accounts.description = :description`, {
            description: `%${payload.search}%`,
        });
        return (0, nestjs_typeorm_paginate_1.paginateRaw)(query, {
            page: payload.page,
            limit: payload.limit,
        });
    }
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
    restoreDisabledAccountById(id) {
        return this.createQueryBuilder('accounts')
            .update({
            disabledBy: null,
            disabledAt: null,
        })
            .where('accounts.id = :id', { id: id })
            .useTransaction(true)
            .execute();
    }
    findDisabledAccounts() {
        return this.createQueryBuilder('accounts')
            .andWhere('accounts.disabled_at IS NOT NULL')
            .andWhere('accounts.deleted_at IS NULL')
            .getMany();
    }
    findDeletedAccounts() {
        return this.createQueryBuilder('accounts')
            .where('accounts.deleted_at IS NOT NULL')
            .getMany();
    }
    restoreAccountById(id) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return this.createQueryBuilder('accounts')
                .update({
                deletedAt: null,
                deletedBy: null,
            })
                .where('accounts.id = :id', { id: id })
                .useTransaction(true)
                .execute();
        });
    }
    disableAccountById(id) {
        return this.createQueryBuilder('accounts')
            .update({
            disabledAt: new Date(),
            disabledBy: '',
        })
            .where('accounts.id = :id', { id: id })
            .useTransaction(true)
            .execute();
    }
    findById(id) {
        return this.findOneOrFail({
            where: {
                id: id,
            },
        });
    }
    updatePartially(body, account) {
        return this.save(Object.assign(Object.assign({}, body), account), {
            transaction: true,
        });
    }
    findRoleByKeycloakId(keycloakId) {
        return this.createQueryBuilder('accounts')
<<<<<<< HEAD
            .select('accounts.role', 'role')
=======
            .select('r.name', 'role')
            .innerJoin(role_entity_1.Roles, 'r', 'r.id = accounts.role_id')
>>>>>>> origin/develop
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
<<<<<<< HEAD
                'a.role',
                'a.fullname',
                'a.avatar',
            ])
=======
                'a.fullname',
                'a.avatar',
            ])
                .addSelect('r.name', 'role')
                .innerJoin(role_entity_1.Roles, 'r', 'a.role_id = r.id')
>>>>>>> origin/develop
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
    existsById(id) {
        return this.createQueryBuilder('accounts')
            .select('COUNT(1)', 'count')
            .where('accounts.id = :id', { id: id })
            .getRawOne()
            .then((data) => data['count'] > 0);
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
const crypto_1 = __webpack_require__("crypto");
let BookingReasonHistRepository = class BookingReasonHistRepository extends typeorm_1.Repository {
    createNew(payload) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return this.save(Object.assign({ id: (0, crypto_1.randomUUID)(), bookingReasonId: payload.id }, payload));
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
let BookingReasonRepository = class BookingReasonRepository extends typeorm_1.Repository {
    findByPagination(payload) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const query = this.createQueryBuilder('br')
                .select('br.id', 'id')
                .addSelect('br.name', 'name')
                .where('br.deleted_at IS NULL')
                .andWhere('LOWER(br.name) LIKE :search', {
                search: `%${payload.search}%`,
            });
            return (0, nestjs_typeorm_paginate_1.paginateRaw)(query, {
                limit: payload.limit,
                page: payload.page,
            });
        });
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
                .getRawOne();
        });
    }
    restoreDeletedById(accountId, id) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return this.createQueryBuilder('br')
                .update({
                deletedBy: null,
                deletedAt: null,
            })
                .where('br.id = :id', { id: id })
                .useTransaction(true)
                .execute();
        });
    }
    deleteById(accountId, id) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return this.createQueryBuilder('br')
                .update({
                deletedBy: accountId,
                deletedAt: accountId,
            })
                .where('br.id = :id', { id: id })
                .useTransaction(true)
                .execute();
        });
    }
    createNew(accountId, payload) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return this.save({
                createdAt: new Date(),
                createdBy: accountId,
                name: payload.name,
                description: payload.description,
            }, {
                transaction: true,
            });
        });
    }
    updateById(accountId, payload) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return this.save({
                updatedAt: new Date(),
                updatedBy: accountId,
                name: payload.name,
                id: payload.id,
                description: payload.description,
            }, {
                transaction: true,
            });
        });
    }
};
BookingReasonRepository = tslib_1.__decorate([
    (0, typeorm_ex_decorator_1.CustomRepository)(booking_reason_entity_1.BookingReason)
], BookingReasonRepository);
exports.BookingReasonRepository = BookingReasonRepository;


/***/ }),

/***/ "./apps/backend/src/app/repositories/booking-room.repository.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.BookingRoomRepository = void 0;
const tslib_1 = __webpack_require__("tslib");
const typeorm_1 = __webpack_require__("typeorm");
const models_1 = __webpack_require__("./apps/backend/src/app/models/index.ts");
const typeorm_ex_decorator_1 = __webpack_require__("./apps/backend/src/app/decorators/typeorm-ex.decorator.ts");
const nestjs_typeorm_paginate_1 = __webpack_require__("nestjs-typeorm-paginate");
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
<<<<<<< HEAD
=======
        console.log("TIME CHECK OUT: ", payload.checkOutAt);
>>>>>>> origin/develop
        const query = this.createQueryBuilder('booking_request')
            .select('booking_request.time_checkin', 'checkInAt')
            .addSelect('booking_request.time_checkout', 'checkOutAt')
            .addSelect('booking_request.room_id', 'roomId')
            .addSelect('r.name', 'roomName')
            .addSelect('r.description', 'roomDescription')
            .addSelect('booking_request.reason_type', 'reasonType')
            .addSelect('booking_request.status', 'status')
            .addSelect('booking_request.booked_at', 'bookedAt')
            .addSelect('booking_request.id', 'id')
            .innerJoin(models_1.Rooms, 'r', 'r.id = booking_request.room_id')
<<<<<<< HEAD
            .where('r.name LIKE :roomName', {
=======
            .where('r.name ILIKE :roomName', {
>>>>>>> origin/develop
            roomName: `%${payload.search}%`,
        })
            .andWhere('booking_request.time_checkin >= :timeCheckIn', {
            timeCheckIn: payload.checkInAt,
        })
            .andWhere('booking_request.time_checkout <= :timeCheckOut', {
            timeCheckOut: payload.checkOutAt,
        })
<<<<<<< HEAD
=======
            .andWhere('booking_request.status LIKE :status', {
            status: `%${payload.status}%`,
        })
>>>>>>> origin/develop
            .orderBy(payload.sort, payload.dir);
        if (payload.reasonType && payload.reasonType !== '') {
            query.andWhere('booking_request.reason_type = :reason', {
                reason: payload.reasonType,
            });
        }
        return (0, nestjs_typeorm_paginate_1.paginateRaw)(query, {
            page: payload.page,
            limit: payload.limit,
        });
    }
    getTotalRowCount() {
        return;
    }
    findByCurrentBookingListAndAccountId(accountId) {
        return this.createQueryBuilder('booking_request')
            .select('booking_request.time_checkin', 'timeCheckIn')
            .addSelect('booking_request.time_checkout', 'timeCheckOut')
            .addSelect('booking_request.booked_at', 'bookedAt')
            .addSelect('booking_request.status', 'status')
            .addSelect('r.name', 'roomName')
            .addSelect('booking_request.id', 'id')
            .addSelect('booking_request.requested_at', 'requestedAt')
            .addSelect('booking_request.checkin_at', 'checkinAt')
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
            .addSelect('booking_request.time_checkin', 'timeCheckIn')
            .addSelect('booking_request.time_checkout', 'timeCheckOut')
            .addSelect('booking_request.reason_type', 'reasonType')
            .addSelect('booking_request.description', 'description')
            .addSelect('booking_request.requested_at', 'requestedAt')
            .addSelect('booking_request.requested_by', 'requestedBy')
            .addSelect('booking_request.updated_at', 'updatedAt')
            .addSelect('booking_request.booked_at', 'bookedAt')
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
            .addSelect('booking_request.time_checkin', 'timeCheckin')
            .addSelect('booking_request.time_checkout', 'timeCheckout')
            .innerJoin(models_1.Rooms, 'r', 'r.id = booking_request.room_id')
            .innerJoin(models_1.Accounts, 'a', 'a.id = booking_request.requested_by')
            .where(`booking_request.status = :status`, { status: "BOOKING" })
            .andWhere('booking_request.room_id = :room_id', { room_id: roomId })
            .orderBy('booking_request.time_checkin', 'ASC')
            .getRawMany();
    }
    cancelRoomBookingById(accountId, id) {
        return this.createQueryBuilder('booking_request')
            .update({
            status: 'CANCELLED',
        })
            .where('booking_request.id = :id', { id: id })
            .andWhere('booking_request.requested_by = :accountId', {
            accountId: accountId,
        })
            .useTransaction(true)
            .execute();
    }
    existsById(id) {
        return this.createQueryBuilder('booking_request')
            .select('COUNT(1)', 'count')
            .where('booking_request.id = :id', { id: id })
            .getRawOne()
            .then((data) => (data === null || data === void 0 ? void 0 : data.count) > 0);
    }
    findById(id) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return this.createQueryBuilder('br')
                .select('br.id', 'id')
                .addSelect('r.id', 'roomId')
                .addSelect('r.name', 'roomName')
                .addSelect('r.description', 'roomDescription')
                .addSelect('a.username', 'requestedBy')
                .addSelect('br.time_checkin', 'timeCheckin')
                .addSelect('br.time_checkout', 'timeCheckout')
                .addSelect('br.status', 'status')
                .addSelect('br.requested_at', 'requestedAt')
                .addSelect('br.booked_at', 'bookedAt')
                .addSelect('br.updated_at', 'updatedAt')
                .addSelect('br.reason_type', 'reasonType')
                .addSelect('br.description', 'description')
<<<<<<< HEAD
                .addSelect('br.updated_by', 'updatedBy')
                .addSelect('br.checkin_at', 'checkinAt')
                .addSelect('br.checkout_at', 'checkoutAt')
                .innerJoin(models_1.Rooms, 'r', 'r.id = br.room_id')
                .innerJoin(models_1.Accounts, 'a', 'a.id = br.requested_by')
=======
                .addSelect('br.checkin_at', 'checkinAt')
                .addSelect('br.checkout_at', 'checkoutAt')
                .addSelect('aa.username', 'updatedBy')
                .innerJoin(models_1.Rooms, 'r', 'r.id = br.room_id')
                .innerJoin(models_1.Accounts, 'a', 'a.id = br.requested_by')
                .leftJoin(models_1.Accounts, 'aa', 'aa.id = br.updated_by')
>>>>>>> origin/develop
                .where('br.id = :id', { id: id })
                .getRawOne();
        });
    }
};
BookingRoomRepository = tslib_1.__decorate([
    (0, typeorm_ex_decorator_1.CustomRepository)(models_1.BookingRequest)
], BookingRoomRepository);
exports.BookingRoomRepository = BookingRoomRepository;


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
    deleteByIdAndAccountId(accountId, id) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return this.createQueryBuilder('rt')
                .update({
                deletedAt: new Date(),
                deletedBy: accountId,
            })
                .where('rt.id = :id', { id: id })
                .useTransaction(true)
                .execute();
        });
    }
    existsById(id) {
        return this.createQueryBuilder('rt')
            .select('COUNT(1)', 'count')
            .where('rt.id = :id', { id: id })
            .getRawOne()
            .then((data) => (data === null || data === void 0 ? void 0 : data.count) > 0);
    }
    restoreDisabledById(accountId, id) {
        return this.createQueryBuilder('rt')
            .update({
            updatedAt: new Date(),
            updatedBy: accountId,
        })
            .where('rt.id = :id', { id: id })
            .useTransaction(true)
            .execute();
    }
    deleteById(accountId, id) {
        return this.createQueryBuilder('device_type')
            .update({
            deletedAt: new Date(),
            deletedBy: accountId,
        })
            .where('device_type.id = :id', { id: id })
            .useTransaction(true)
            .execute();
    }
    findDeletedByPagination(search) {
        return this.createQueryBuilder('device_type')
            .select('device_type.id', 'id')
            .addSelect('device_type.name', 'name')
            .addSelect('device_type.deleted_at', 'deletedAt')
            .addSelect('a.username', 'deletedBy')
            .innerJoin(models_1.Accounts, 'a', 'a.id = device_type.deleted_by')
            .where('device_type.name LIKE :search', { search: `%${search.trim()}%` })
            .andWhere('device_type.deleted_at IS NOT NULL')
            .orderBy('device_type.deleted_at', 'DESC')
            .getRawMany();
    }
    restoreDeletedById(accountId, id) {
        return this.createQueryBuilder('device_type')
            .update({
            updatedAt: new Date(),
            updatedBy: accountId,
            deletedAt: null,
            deletedBy: null,
        })
            .where('device_type.id = :id', { id: id })
            .useTransaction(true)
            .execute();
    }
    updateById(accountId, deviceTypeId, payload) {
        return this.createQueryBuilder('device_type')
            .update({
            name: payload.name.trim(),
            description: payload.description,
            updatedAt: new Date(),
            updatedBy: accountId,
        })
            .where('device_type.id = :id', { id: deviceTypeId })
            .useTransaction(true)
            .execute();
    }
    permanentlyDeleteById(id) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return Promise.resolve(undefined);
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
};
DeviceTypeRepository = tslib_1.__decorate([
    (0, typeorm_ex_decorator_1.CustomRepository)(device_type_entity_1.DeviceType)
], DeviceTypeRepository);
exports.DeviceTypeRepository = DeviceTypeRepository;


/***/ }),

/***/ "./apps/backend/src/app/repositories/devices-hist.repository.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.DevicesHistRepository = void 0;
const tslib_1 = __webpack_require__("tslib");
const typeorm_1 = __webpack_require__("typeorm");
const models_1 = __webpack_require__("./apps/backend/src/app/models/index.ts");
const typeorm_ex_decorator_1 = __webpack_require__("./apps/backend/src/app/decorators/typeorm-ex.decorator.ts");
let DevicesHistRepository = class DevicesHistRepository extends typeorm_1.Repository {
};
DevicesHistRepository = tslib_1.__decorate([
    (0, typeorm_ex_decorator_1.CustomRepository)(models_1.DevicesHist)
], DevicesHistRepository);
exports.DevicesHistRepository = DevicesHistRepository;


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
let DevicesRepository = class DevicesRepository extends typeorm_1.Repository {
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
    searchDevices(payload) {
        const query = this.createQueryBuilder(`devices`)
            // qb.where(`rooms.name LIKE :name`, {name: `%${payload.search}%`});
            //  qb.orWhere(`rooms.description LIKE :description`, {description: `%${payload.search}%`})
            .where(`devices.disabled_at IS NULL`)
            .andWhere(`devices.deleted_at IS NULL`)
            .orWhere(`devices.name = :name`, { name: `%${payload.search}%` })
            .orWhere(`devices.description = :description`, {
            description: `%${payload.search}%`,
        });
        return (0, nestjs_typeorm_paginate_1.paginateRaw)(query, {
            limit: payload.limit,
            page: payload.page,
        });
    }
    deleteDeviceById(accountId, id) {
        return this.createQueryBuilder('devices')
            .update({
            deletedAt: new Date(),
            deletedBy: accountId,
        })
            .where('devices.id = :id', { id: id })
            .useTransaction(true)
            .execute();
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
    disableById(id) {
        return this.createQueryBuilder('devices')
            .update({
            disabledAt: new Date(),
            disabledBy: '',
        })
            .where('devices.id = :id', { id: id })
            .useTransaction(true)
            .execute();
    }
    restoreDisabledDeviceById(id) {
        return this.createQueryBuilder('devices')
            .update({
            deletedAt: null,
            deletedBy: null,
        })
            .where('devices.id = :id', { id: id })
            .useTransaction(true)
            .execute();
    }
    restoreDeletedDeviceById(id) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return this.createQueryBuilder('devices')
                .update({
                deletedBy: null,
                deletedAt: null,
            })
                .where('devices.id = :id', { id: id })
                .useTransaction(true)
                .execute();
        });
    }
    getDeletedDevices() {
        return this.createQueryBuilder('devices')
            .andWhere(`devices.deleted_at IS NOT NULL`)
            .getMany();
    }
    getDisabledDevices() {
        return this.createQueryBuilder('devices')
            .where(`devices.disabled_at IS NOT NULL`)
            .andWhere(`devices.deleted_at IS NULL`)
            .getMany();
    }
    createNewDevice(payload) {
        return this.save(payload, {
            transaction: true,
        });
    }
    updateById(origin, body, id) {
        return this.save(Object.assign(Object.assign({}, origin), body), {
            transaction: true,
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
tslib_1.__exportStar(__webpack_require__("./apps/backend/src/app/repositories/booking-room.repository.ts"), exports);
tslib_1.__exportStar(__webpack_require__("./apps/backend/src/app/repositories/devices.repository.ts"), exports);
tslib_1.__exportStar(__webpack_require__("./apps/backend/src/app/repositories/devices-hist.repository.ts"), exports);
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
const typeorm_1 = __webpack_require__("typeorm");
class RoleHistRepository extends typeorm_1.Repository {
}
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
    findById(id) {
        return this.createQueryBuilder('r')
            .select('r.id', 'id')
            .addSelect('r.name', 'name')
            .addSelect('r.description', 'description')
            .addSelect('r.created_at', 'createdAt')
            .addSelect('r.updated_at', 'updatedAt')
            .addSelect('a.username', 'createdBy')
            .addSelect('aa.username', 'updatedAt')
            .innerJoin(models_1.Accounts, 'a', 'a.id = r.created_by')
            .innerJoin(models_1.Accounts, 'aa', 'aa.id = r.updated_by')
            .where('r.id = :id', { id: id })
            .andWhere('r.deleted_at IS NULL')
            .getRawOne();
    }
    updateById(id, accountId, payload) {
        return this.save({
            id: id,
            name: payload.name.trim(),
            description: payload.description,
            updatedBy: accountId,
            updatedAt: new Date(),
        }, {
            transaction: true,
        });
    }
    deleteById(accountId, id) {
        return this.createQueryBuilder('role')
            .update({
            deletedAt: new Date(),
            deletedBy: accountId,
        })
            .where('role.id = :id', { id: id })
            .useTransaction(true)
            .execute();
    }
    getDeletedRoles(search) {
        return this.createQueryBuilder('role')
            .select('role.id', 'id')
            .addSelect('role.name', 'name')
            .addSelect('role.deleted_at', 'deletedAt')
            .addSelect('a.username', 'deletedBy')
            .innerJoin(models_1.Accounts, 'a', 'a.id = role.deleted_by')
            .where('role.name LIKE :search', { search: `%${search.trim()}%` })
            .andWhere('role.deleted_at IS NOT NULL')
            .orderBy('role.deleted_at', 'DESC')
            .getRawMany();
    }
};
RolesRepository = tslib_1.__decorate([
<<<<<<< HEAD
    (0, typeorm_ex_decorator_1.CustomRepository)(role_entity_1.Roless)
=======
    (0, typeorm_ex_decorator_1.CustomRepository)(role_entity_1.Roles)
>>>>>>> origin/develop
], RolesRepository);
exports.RolesRepository = RolesRepository;


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
let RoomTypeRepository = class RoomTypeRepository extends typeorm_1.Repository {
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
            .andWhere('rt.disabled_at IS NULL')
            .andWhere("rt.deleted_at IS NULL")
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
                .innerJoin(models_1.Accounts, 'aa', 'aa.id = rt.updated_by')
                .where('rt.id = :id', { id: id })
                .andWhere('rt.deleted_at IS NULL')
                .getRawOne();
        });
    }
    deleteByIdAndAccountId(accountId, id) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return this.createQueryBuilder('rt')
                .update({
                deletedAt: new Date(),
                deletedBy: accountId,
            })
                .where('rt.id = :id', { id: id })
                .useTransaction(true)
                .execute();
        });
    }
    existsById(id) {
        return this.createQueryBuilder('rt')
            .select('COUNT(1)', 'count')
            .where('rt.id = :id', { id: id })
            .getRawOne()
            .then((data) => (data === null || data === void 0 ? void 0 : data.count) > 0);
    }
    restoreDisabledById(accountId, id) {
        return this.createQueryBuilder('rt')
            .update({
            updatedAt: new Date(),
            updatedBy: accountId,
        })
            .where('rt.id = :id', { id: id })
            .useTransaction(true)
            .execute();
    }
    restoreDeletedById(accountId, id) {
        return this.createQueryBuilder('room_type')
            .update({
            updatedAt: new Date(),
            updatedBy: accountId,
            deletedAt: null,
            deletedBy: null,
        })
            .where('room_type.id = :id', { id: id })
            .useTransaction(true)
            .execute();
    }
    deleteById(accountId, id) {
        return this.createQueryBuilder('room_type')
            .update({
            deletedAt: new Date(),
            deletedBy: accountId,
        })
            .where('room_type.id = :id', { id: id })
            .useTransaction(true)
            .execute();
    }
    findDisabledByPagination(search) {
        return this.createQueryBuilder('rt')
            .select('rt.id', 'id')
            .addSelect('rt.name', 'name')
            .where('rt.name LIKE :search', { search: search.trim() })
            .andWhere('rt.disabled_at IS NOT NULL')
            .getRawMany();
    }
    findDeletedByPagination(search) {
        return this.createQueryBuilder('rt')
            .select('rt.id', 'id')
            .addSelect('rt.name', 'name')
            .addSelect('rt.deleted_at', 'deletedAt')
            .addSelect('a.username', 'deletedBy')
            .innerJoin(models_1.Accounts, 'a', 'a.id = rt.deleted_by')
            .where('rt.name LIKE :search', { search: `%${search.trim()}%` })
            .andWhere('rt.deleted_at IS NOT NULL')
            .orderBy('rt.deleted_at', 'DESC')
            .getRawMany();
    }
    updateById(roomTypeId, accountId, payload) {
        return this.save({
            id: roomTypeId,
            name: payload.name.trim(),
            description: payload.description,
            updatedBy: accountId,
            updatedAt: new Date(),
        }, {
            transaction: true,
        });
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
    isExistedById(id) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return this.createQueryBuilder('rooms')
                .select('COUNT(rooms.name)')
                .where('rooms.id = :id', { id })
                .getRawOne()
                .then((data) => data['count'] > 0);
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
    searchRoom(payload) {
        const query = this.createQueryBuilder('r')
            .innerJoin(models_2.Accounts, 'a', 'r.created_by = a.id')
            .innerJoin(models_2.Accounts, 'aa', 'r.updated_by = aa.id')
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
    disableById(accountId, id) {
        return this.createQueryBuilder('rooms')
            .update({
            disabledBy: accountId,
            disabledAt: new Date(),
        })
            .where('rooms.id = :id', { id: id })
            .useTransaction(true)
            .execute();
    }
    restoreDisabledRoomById(id) {
        return this.createQueryBuilder('rooms')
            .update({
            disabledAt: null,
            disabledBy: null,
        })
            .where('rooms.id = :id', { id: id })
            .useTransaction(true)
            .execute();
    }
    deleteById(accountId, id) {
        return this.createQueryBuilder('rooms')
            .update({
            disabledAt: null,
            disabledBy: null,
            deletedBy: accountId,
            deletedAt: new Date(),
        })
            .where('rooms.id = :id', { id: id })
            .execute();
    }
    restoreDeletedRoomById(id) {
        return this.createQueryBuilder('rooms')
            .update({
            deletedAt: null,
            deletedBy: null,
        })
            .where('rooms.id = :id', { id: id })
            .execute();
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
                .innerJoin(models_2.Accounts, 'a', 'rooms.created_by = a.id')
                .innerJoin(models_2.Accounts, 'aa', 'rooms.updated_by = aa.id')
                .innerJoin(room_type_entity_1.RoomType, 'rt', 'rt.id = rooms.type')
                .where('rooms.disabled_at IS NULL')
                .andWhere('rooms.deleted_at IS NULL')
                .andWhere('rooms.id = :roomId', { roomId: id })
                .getRawOne();
        });
    }
    filterByNameAndType(payload) {
        return this.createQueryBuilder('rooms')
            .select('rooms.id', 'id')
            .addSelect('rooms.name', 'name')
            .addSelect('rooms.type', 'type')
            .where('rooms.disabled_at IS NULL')
            .andWhere('rooms.deleted_at IS NULL')
            .andWhere('rooms.type LIKE :type', { type: `%${payload.roomType.name}%` })
            .andWhere('rooms.name LIKE :name', { name: `%${payload.roomName.name}%` })
            .orderBy('rooms.name', payload.roomName.sort)
            .addOrderBy('rooms.type', payload.roomType.sort)
            .getRawMany();
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
<<<<<<< HEAD
=======
    findAll() {
        return this.find({
            where: {
                deletedAt: null,
                deletedBy: null
            }
        });
    }
>>>>>>> origin/develop
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

/***/ "./apps/backend/src/app/services/accounts.service.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var AccountsService_1, _a, _b, _c;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AccountsService = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const base_service_1 = __webpack_require__("./apps/backend/src/app/services/base.service.ts");
const repositories_1 = __webpack_require__("./apps/backend/src/app/repositories/index.ts");
const keycloak_service_1 = __webpack_require__("./apps/backend/src/app/services/keycloak.service.ts");
const cloudinary_service_1 = __webpack_require__("./apps/backend/src/app/services/cloudinary.service.ts");
const crypto_1 = __webpack_require__("crypto");
let AccountsService = AccountsService_1 = class AccountsService extends base_service_1.BaseService {
    constructor(cloudinaryService, keycloakService, repository) {
        super();
        this.cloudinaryService = cloudinaryService;
        this.keycloakService = keycloakService;
        this.repository = repository;
        this.logger = new common_1.Logger(AccountsService_1.name);
    }
    getAll() {
        return null;
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
    add(model) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            try {
                const entity = Object.assign({}, model);
                return this.repository.save(entity);
            }
            catch (e) {
                this.logger.error(e.message);
                throw new common_1.BadRequestException('Error while adding new account');
            }
        });
    }
    addAll(models) {
        return Promise.resolve([]);
    }
    deleteById(id) {
        return Promise.resolve(undefined);
    }
    getAllByPagination(request) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.repository.search({
                    search: request.search,
                    page: request.page,
                    limit: request.limit,
                    direction: request.sort,
                });
            }
            catch (e) {
                this.logger.error(e);
                throw new common_1.BadRequestException('One or more parameters are invalid');
            }
        });
    }
    updateById(body, id) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            try {
                const account = yield this.repository.findById(id);
                return yield this.repository.updatePartially(body, account);
            }
            catch (e) {
                this.logger.error(e);
                throw new common_1.BadRequestException('Account does not exist');
            }
        });
    }
    getById(id) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.repository.findById(id);
            }
            catch (e) {
                this.logger.error(e);
                throw new common_1.BadRequestException('Account does not exist');
            }
        });
    }
    disableById(id) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            try {
                yield this.repository.disableAccountById(id);
            }
            catch (e) {
                this.logger.error(e.message);
                throw new common_1.BadRequestException('Error while disabling account');
            }
        });
    }
    handleRestoreDisabledAccountById(id) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.repository.restoreDisabledAccountById(id);
            }
            catch (e) {
                this.logger.error(e.message);
                throw new common_1.BadRequestException('Error while restoring disabled account');
            }
        });
    }
    handleRestoreAccountById(id) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            try {
                yield this.repository.restoreAccountById(id);
            }
            catch (e) {
                this.logger.error(e.message);
                throw new common_1.BadRequestException('Error while getting deleted accounts');
            }
        });
    }
    getDeletedAccounts() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.repository.findDeletedAccounts();
            }
            catch (e) {
                this.logger.error(e.message);
                throw new common_1.BadRequestException('Error while getting deleted accounts');
            }
        });
    }
    getDisabledAccounts() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.repository.findDisabledAccounts();
            }
            catch (e) {
                this.logger.error(e.message);
                throw new common_1.BadRequestException('Error while getting disabled accounts');
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
    getUsernameByAccountId(id) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.repository.findUsernameById(id);
            }
            catch (e) {
                this.logger.error(e);
                throw new common_1.BadRequestException(e.message);
            }
        });
    }
    updateMyProfile(keycloakUser, payload) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield this.repository.findByKeycloakId(keycloakUser.sub);
                if (!user) {
                    throw new common_1.BadRequestException('Account does not exist with the provided id');
                }
                return yield this.repository.save(Object.assign(Object.assign({}, user), payload));
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
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof cloudinary_service_1.CloudinaryService !== "undefined" && cloudinary_service_1.CloudinaryService) === "function" ? _a : Object, typeof (_b = typeof keycloak_service_1.KeycloakService !== "undefined" && keycloak_service_1.KeycloakService) === "function" ? _b : Object, typeof (_c = typeof repositories_1.AccountRepository !== "undefined" && repositories_1.AccountRepository) === "function" ? _c : Object])
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
                    role: user.role,
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
                role: user.role,
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
    getAllByPagination(payload) {
        return this.repository.findByPagination(payload);
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
};
BookingReasonService = BookingReasonService_1 = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof booking_reason_repository_1.BookingReasonRepository !== "undefined" && booking_reason_repository_1.BookingReasonRepository) === "function" ? _a : Object, typeof (_b = typeof booking_reason_hist_service_1.BookingReasonHistService !== "undefined" && booking_reason_hist_service_1.BookingReasonHistService) === "function" ? _b : Object])
], BookingReasonService);
exports.BookingReasonService = BookingReasonService;


/***/ }),

/***/ "./apps/backend/src/app/services/booking-room.service.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var BookingRoomService_1, _a, _b, _c, _d, _e;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.BookingRoomService = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const rooms_service_1 = __webpack_require__("./apps/backend/src/app/services/rooms.service.ts");
const repositories_1 = __webpack_require__("./apps/backend/src/app/repositories/index.ts");
const room_wishlist_service_1 = __webpack_require__("./apps/backend/src/app/services/room-wishlist.service.ts");
const devices_service_1 = __webpack_require__("./apps/backend/src/app/services/devices.service.ts");
const accounts_service_1 = __webpack_require__("./apps/backend/src/app/services/accounts.service.ts");
let BookingRoomService = BookingRoomService_1 = class BookingRoomService {
    constructor(roomService, deviceService, roomWishlistService, repository, accountService) {
        this.roomService = roomService;
        this.deviceService = deviceService;
        this.roomWishlistService = roomWishlistService;
        this.repository = repository;
        this.accountService = accountService;
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
                throw new common_1.BadRequestException('An error occurred while getting rooms by type ' + roomId);
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
    getRoomsName() {
        return this.roomService.getRoomsName();
    }
    getChoosingBookingRooms(filter) {
        try {
            const payload = filter
                ? JSON.parse(filter)
                : {
                    roomName: {
                        name: '',
                        sort: 'ASC',
                    },
                    roomType: {
                        name: '',
                        sort: 'ASC',
                    },
                };
            return this.roomService.getRoomsFilterByNameAndType(payload);
        }
        catch (e) {
            this.logger.error(e.message);
            throw new common_1.BadRequestException(e.message);
        }
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
    cancelRoomBookingById(accountId, id) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            try {
                const isExisted = yield this.repository.existsById(id);
                if (isExisted) {
                    yield this.repository.cancelRoomBookingById(accountId, id);
                }
                else {
                    throw new common_1.BadRequestException('Not found with the provided id');
                }
            }
            catch (e) {
                this.logger.error(e.message);
                throw new common_1.BadRequestException(e.message);
            }
        });
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
};
BookingRoomService = BookingRoomService_1 = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof rooms_service_1.RoomsService !== "undefined" && rooms_service_1.RoomsService) === "function" ? _a : Object, typeof (_b = typeof devices_service_1.DevicesService !== "undefined" && devices_service_1.DevicesService) === "function" ? _b : Object, typeof (_c = typeof room_wishlist_service_1.RoomWishlistService !== "undefined" && room_wishlist_service_1.RoomWishlistService) === "function" ? _c : Object, typeof (_d = typeof repositories_1.BookingRoomRepository !== "undefined" && repositories_1.BookingRoomRepository) === "function" ? _d : Object, typeof (_e = typeof accounts_service_1.AccountsService !== "undefined" && accounts_service_1.AccountsService) === "function" ? _e : Object])
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

/***/ "./apps/backend/src/app/services/device-type.service.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var DeviceTypeService_1, _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.DeviceTypeService = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const device_type_repository_1 = __webpack_require__("./apps/backend/src/app/repositories/device-type.repository.ts");
let DeviceTypeService = DeviceTypeService_1 = class DeviceTypeService {
    constructor(repository) {
        this.repository = repository;
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
    getDeviceTypeById(id) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.repository.findById(id);
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
                return yield this.repository.updateById(accountId, id, payload);
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
                return yield this.repository.deleteById(accountId, id);
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
    restoreDeletedRoomTypeById(accountId, id) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            try {
                const isExisted = this.repository.existsById(id);
                if (!isExisted) {
                    throw new common_1.BadRequestException('Room type does not exist with the provided id');
                }
                return yield this.repository.restoreDeletedById(accountId, id);
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
                return yield this.repository.permanentlyDeleteById(id);
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
                return yield this.repository.addNew(accountId, payload);
            }
            catch (e) {
                this.logger.error(e);
                throw new common_1.BadRequestException(e.message);
            }
        });
    }
};
DeviceTypeService = DeviceTypeService_1 = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof device_type_repository_1.DeviceTypeRepository !== "undefined" && device_type_repository_1.DeviceTypeRepository) === "function" ? _a : Object])
], DeviceTypeService);
exports.DeviceTypeService = DeviceTypeService;


/***/ }),

/***/ "./apps/backend/src/app/services/devices-hist.service.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.DevicesHistService = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const repositories_1 = __webpack_require__("./apps/backend/src/app/repositories/index.ts");
let DevicesHistService = class DevicesHistService {
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
DevicesHistService = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof repositories_1.DevicesHistRepository !== "undefined" && repositories_1.DevicesHistRepository) === "function" ? _a : Object])
], DevicesHistService);
exports.DevicesHistService = DevicesHistService;


/***/ }),

/***/ "./apps/backend/src/app/services/devices.service.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var DevicesService_1, _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.DevicesService = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const devices_repository_1 = __webpack_require__("./apps/backend/src/app/repositories/devices.repository.ts");
let DevicesService = DevicesService_1 = class DevicesService {
    constructor(repository) {
        this.repository = repository;
        this.logger = new common_1.Logger(DevicesService_1.name);
    }
    add(payload) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.repository.createNewDevice(payload);
            }
            catch (e) {
                this.logger.error(e.message);
                throw new common_1.BadRequestException('Error while creating a new device');
            }
        });
    }
    addAll(models) {
        return Promise.resolve([]);
    }
    deleteById(accountId, id) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            try {
                const isDeleted = yield this.repository.checkIfDeviceIsDeletedById(id);
                if (isDeleted) {
                    throw new common_1.BadRequestException('Not found with provided id');
                }
                yield this.repository.deleteDeviceById(accountId, id);
            }
            catch (e) {
                this.logger.error(e.message);
                throw new common_1.BadRequestException('Error while deleting the device with id');
            }
        });
    }
    getAll(request) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield this.repository
                .searchDevices({
                search: request.search,
                page: request.page,
                limit: request.limit,
                direction: request.sort,
            })
                .catch((e) => {
                this.logger.error(e);
                throw new common_1.BadRequestException('One or more parameters is invalid');
            });
        });
    }
    updateById(body, id) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            try {
                const device = yield this.repository.findOneOrFail({
                    where: {
                        id: id,
                    },
                });
                return yield this.repository.updateById(device, body, id);
            }
            catch (e) {
                this.logger.error(e.message);
                throw new common_1.BadRequestException('Error while updating the device');
            }
        });
    }
    findById(id) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.repository.findOneOrFail({
                    where: {
                        id: id,
                    },
                });
            }
            catch (e) {
                this.logger.error(e.message);
                throw new common_1.BadRequestException('Error while retrieving device');
            }
        });
    }
    disableById(id) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            try {
                const isDeleted = yield this.repository.checkIfDeviceIsDeletedById(id);
                if (isDeleted) {
                    throw new common_1.BadRequestException('Not found with provided id');
                }
                yield this.repository.disableById(id);
            }
            catch (e) {
                this.logger.error(e.message);
                throw new common_1.BadRequestException('Error while disabling this device');
            }
        });
    }
    handleRestoreDisabledDeviceById(id) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            try {
                const isDeleted = yield this.repository.checkIfDeviceIsDeletedById(id);
                if (isDeleted) {
                    throw new common_1.BadRequestException('Not found with provided id');
                }
                yield this.repository.restoreDisabledDeviceById(id);
            }
            catch (e) {
                this.logger.error(e.message);
                throw new common_1.BadRequestException('Error while disabling this device');
            }
        });
    }
    handleRestoreDeviceById(id) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            try {
                const isDeleted = yield this.repository.checkIfDeviceIsDeletedById(id);
                if (!isDeleted) {
                    throw new common_1.BadRequestException('Not found with provided id');
                }
                yield this.repository.restoreDeletedDeviceById(id);
            }
            catch (e) {
                this.logger.error(e.message);
                throw new common_1.BadRequestException('Error while disabling this device');
            }
        });
    }
    getDeletedDevices() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.repository.getDeletedDevices();
            }
            catch (e) {
                this.logger.error(e.message);
                throw new common_1.BadRequestException('Error while disabling this device');
            }
        });
    }
    getDisabledDevices() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.repository.getDisabledDevices();
            }
            catch (e) {
                this.logger.error(e.message);
                throw new common_1.BadRequestException('Error while disabling this device');
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
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof devices_repository_1.DevicesRepository !== "undefined" && devices_repository_1.DevicesRepository) === "function" ? _a : Object])
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


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.RoleHistService = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
let RoleHistService = class RoleHistService {
};
RoleHistService = tslib_1.__decorate([
    (0, common_1.Injectable)()
], RoleHistService);
exports.RoleHistService = RoleHistService;


/***/ }),

/***/ "./apps/backend/src/app/services/role.service.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var RoleService_1, _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.RoleService = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const roles_repository_1 = __webpack_require__("./apps/backend/src/app/repositories/roles.repository.ts");
let RoleService = RoleService_1 = class RoleService {
    constructor(repository) {
        this.repository = repository;
        this.logger = new common_1.Logger(RoleService_1.name);
    }
    getRoleById(id) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            try {
                const isExisted = yield this.repository.existsById(id);
                if (!isExisted) {
                    throw new common_1.BadRequestException('Could not find role with provided id.');
                }
                return yield this.repository.findById(id);
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
                const isExisted = yield this.repository.existsById(id);
                if (!isExisted) {
                    throw new common_1.BadRequestException('Role does not found with the existed id');
                }
                const result = yield this.repository.deleteById(accountId, id);
                if (result.affected < 1) {
                    throw new common_1.BadRequestException('Could not delete role by id');
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
                throw new common_1.BadRequestException('Error while disabling this device');
            }
        });
    }
    addRole(body, accountId) {
        return this.repository.save({
            name: body.name.trim(),
            description: body.description,
            createdAt: new Date(),
            updatedAt: new Date(),
            createdBy: accountId,
            updatedBy: accountId,
        }, {
            transaction: true,
        });
    }
    updateRoleById(accountId, updatePayload, id) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            try {
                const isExisted = yield this.repository.existsById(id);
                if (!isExisted) {
                    throw new common_1.BadRequestException('Role does not found with the provided id');
                }
                return yield this.repository.updateById(id, accountId, updatePayload);
            }
            catch (e) {
                this.logger.error(e.message);
                throw new common_1.BadRequestException(e.message);
            }
        });
    }
    getRolesByPagination(payload) {
        return this.repository.findByPagination(payload);
    }
};
RoleService = RoleService_1 = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof roles_repository_1.RolesRepository !== "undefined" && roles_repository_1.RolesRepository) === "function" ? _a : Object])
], RoleService);
exports.RoleService = RoleService;


/***/ }),

/***/ "./apps/backend/src/app/services/room-type.service.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var RoomTypeService_1, _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.RoomTypeService = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const room_type_repository_1 = __webpack_require__("./apps/backend/src/app/repositories/room-type.repository.ts");
let RoomTypeService = RoomTypeService_1 = class RoomTypeService {
    constructor(repository) {
        this.repository = repository;
        this.logger = new common_1.Logger(RoomTypeService_1.name);
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
                return yield this.repository.findById(id);
            }
            catch (e) {
                this.logger.error(e.message);
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
                return yield this.repository.updateById(id, accountId, updatePayload);
            }
            catch (e) {
                this.logger.error(e.message);
                throw new common_1.BadRequestException(e.message);
            }
        });
    }
    // async disableRoomTypeById(accountId: string, id: string): Promise<any> {
    //   try {
    //     const result = await this.repository.disableById(accountId, id);
    //     if (result.affected < 1) {
    //       throw new BadRequestException(
    //         "Room doesn't exist with the provided id"
    //       );
    //     }
    //   } catch (e) {
    //     this.logger.error(e.message);
    //     throw new BadRequestException(e.message);
    //   }
    // }
    getDisabledRoomTypes(search) {
        try {
            return this.repository.findDisabledByPagination(search);
        }
        catch (e) {
            this.logger.error(e.message);
            throw new common_1.BadRequestException(e.message);
        }
    }
    getDeletedRoomTypes(search) {
        try {
            return this.repository.findDeletedByPagination(search);
        }
        catch (e) {
            this.logger.error(e.message);
            throw new common_1.BadRequestException(e.message);
        }
    }
    restoreDeletedRoomTypeById(accountId, id) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            try {
                const isExisted = this.repository.existsById(id);
                if (!isExisted) {
                    throw new common_1.BadRequestException('Room type does not exist with the provided id');
                }
                return yield this.repository.restoreDeletedById(accountId, id);
            }
            catch (e) {
                this.logger.error(e.message);
                throw new common_1.BadRequestException(e.message);
            }
        });
    }
    restoreDisabledRoomTypeById(accountId, id) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.repository.restoreDisabledById(accountId, id);
            }
            catch (e) {
                this.logger.error(e.message);
                throw new common_1.BadRequestException(e.message);
            }
        });
    }
    deleteRoomTypeById(accountId, id) {
        try {
            return this.repository.deleteById(accountId, id);
        }
        catch (e) {
            this.logger.error(e.message);
            throw new common_1.BadRequestException(e.message);
        }
    }
    addRoomType(accountId, addRoomType) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.repository.save({
                    createdBy: accountId,
                    name: addRoomType.name.trim(),
                    description: addRoomType.description,
                    createdAt: new Date(),
                    updatedBy: accountId,
                    updatedAt: new Date(),
                });
            }
            catch (e) {
                this.logger.error(e);
                throw new common_1.BadRequestException(e.message);
            }
        });
    }
};
RoomTypeService = RoomTypeService_1 = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof room_type_repository_1.RoomTypeRepository !== "undefined" && room_type_repository_1.RoomTypeRepository) === "function" ? _a : Object])
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


var RoomsService_1, _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.RoomsService = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const repositories_1 = __webpack_require__("./apps/backend/src/app/repositories/index.ts");
let RoomsService = RoomsService_1 = class RoomsService {
    constructor(repository) {
        this.repository = repository;
        this.logger = new common_1.Logger(RoomsService_1.name);
    }
    add(user, room) {
        var _a;
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            try {
                const isExisted = yield this.repository.isExistedByName(room.name);
                if (isExisted) {
                    throw new common_1.BadRequestException('This room is already existed');
                }
<<<<<<< HEAD
                const addedRoom = yield this.repository.save(Object.assign({ createdBy: user.account_id, updatedBy: user.account_id }, room), {
=======
                const addedRoom = yield this.repository.save(Object.assign({ createdBy: user.account_id, disabledBy: user.account_id, disabledAt: new Date() }, room), {
>>>>>>> origin/develop
                    transaction: true,
                });
                return addedRoom;
            }
            catch (e) {
                this.logger.error(e.message);
                throw new common_1.BadRequestException((_a = e.message) !== null && _a !== void 0 ? _a : 'An error occurred while adding this room');
            }
        });
    }
    findById(id) {
        var _a;
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            try {
                const isExisted = yield this.repository.isExistedById(id);
                if (!isExisted) {
                    throw new common_1.BadRequestException('Room does not found with the id');
                }
                const result = yield this.repository.findById(id);
                if (!result) {
                    throw new common_1.BadRequestException('Room does not found with the id');
                }
                return result;
            }
            catch (e) {
                this.logger.error(e);
                throw new common_1.BadRequestException((_a = e.message) !== null && _a !== void 0 ? _a : 'An error occurred while retrieving this room');
            }
        });
    }
    getAll(request) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield this.repository.searchRoom(request);
        });
    }
    getDeletedRooms(search) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.repository.findDeletedRooms(search);
            }
            catch (e) {
                this.logger.error(e);
                throw new common_1.BadRequestException('An error occurred while getting deleted rooms');
            }
        });
    }
    getDisabledRooms(search) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield this.repository.findDisabledRooms(search);
                return data;
            }
            catch (e) {
                this.logger.error(e);
                throw new common_1.BadRequestException('An error occurred while getting disabled rooms');
            }
        });
    }
    getRoomsByRoomType(roomTypeId) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.repository.getRoomsByRoomType(roomTypeId);
            }
            catch (e) {
                this.logger.error(e);
                throw new common_1.BadRequestException('An error occurred while getting rooms by type ' + roomTypeId);
            }
        });
    }
    getAllWithoutPagination() {
        try {
            return this.repository
                .createQueryBuilder('rooms')
                .where('rooms.disabled_at IS NULL')
                .andWhere('rooms.deleted_at IS NULL')
                .getMany();
        }
        catch (e) {
            this.logger.error(e);
            throw new common_1.BadRequestException('An error occurred while adding this room');
        }
    }
    updateById(accountId, id, body) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            let room;
            try {
                room = yield this.repository.findOneOrFail({
                    where: {
                        id: id,
                    },
                });
            }
            catch (e) {
                this.logger.error(e.message);
                throw new common_1.BadRequestException("Room doesn't exist with the provided id");
            }
            if (room.name !== body.name) {
                const isExisted = yield this.repository.isExistedByName(body.name);
                if (isExisted) {
                    throw new common_1.BadRequestException('The room name you want to use is duplicated!');
                }
            }
            try {
                yield this.repository.save(Object.assign(Object.assign({}, room), { name: body.name.trim(), description: body.description, updatedBy: accountId, type: body.type }), {
                    transaction: true,
                });
            }
            catch (e) {
                this.logger.error(e);
                throw new common_1.BadRequestException('Error occurred while updating this room');
            }
        });
    }
    disableById(accountId, id) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield this.repository.disableById(accountId, id);
                if (result.affected < 1) {
                    throw new common_1.BadRequestException("Room doesn't exist with the provided id");
                }
            }
            catch (e) {
                this.logger.error(e);
                throw new common_1.BadRequestException('Error occurred while disabling this room');
            }
        });
    }
    handleRestoreDeletedRoomById(id) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield this.repository.restoreDeletedRoomById(id);
                if (result.affected < 1) {
                    throw new common_1.BadRequestException("Room doesn't exist with the provided id");
                }
            }
            catch (e) {
                this.logger.error(e);
                throw new common_1.BadRequestException('Error occurred while restore the delete status of this room');
            }
        });
    }
    handleRestoreDisabledRoomById(id) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield this.repository.restoreDisabledRoomById(id);
                if (result.affected < 1) {
                    throw new common_1.BadRequestException("Room doesn't exist with the provided id");
                }
            }
            catch (e) {
                this.logger.error(e);
                throw new common_1.BadRequestException('Error occurred while restore the disabled status of this room');
            }
        });
    }
    deleteById(accountId, id) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield this.repository.deleteById(accountId, id);
                if (result.affected < 1) {
                    throw new common_1.BadRequestException("Room doesn't exist with the provided id");
                }
            }
            catch (e) {
                this.logger.error(e);
                throw new common_1.BadRequestException('Error occurred while deleting this room');
            }
        });
    }
    getRoomsName() {
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
    getRoomsFilterByNameAndType(payload) {
        return this.repository.filterByNameAndType(payload);
    }
};
RoomsService = RoomsService_1 = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof repositories_1.RoomsRepository !== "undefined" && repositories_1.RoomsRepository) === "function" ? _a : Object])
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
<<<<<<< HEAD
=======
                if (!params) {
                    console.log('ass');
                    return this.repository.findAll();
                }
>>>>>>> origin/develop
                return yield this.repository.findByPagination(params);
            }
            catch (e) {
                this.logger.error(e.message);
                throw new common_1.BadRequestException(e.message);
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
<<<<<<< HEAD
=======
    getAll() {
        return this.repository.findAll();
    }
>>>>>>> origin/develop
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

/***/ "./libs/models/src/index.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__("tslib");
tslib_1.__exportStar(__webpack_require__("./libs/models/src/lib/room.dto.ts"), exports);
tslib_1.__exportStar(__webpack_require__("./libs/models/src/lib/request/index.ts"), exports);
tslib_1.__exportStar(__webpack_require__("./libs/models/src/lib/firebase-setting.dto.ts"), exports);
tslib_1.__exportStar(__webpack_require__("./libs/models/src/lib/keycloak/index.ts"), exports);
tslib_1.__exportStar(__webpack_require__("./libs/models/src/lib/response/index.ts"), exports);


/***/ }),

/***/ "./libs/models/src/lib/firebase-setting.dto.ts":
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
;


/***/ }),

/***/ "./libs/models/src/lib/keycloak/index.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__("tslib");
tslib_1.__exportStar(__webpack_require__("./libs/models/src/lib/keycloak/keycloak-user.dto.ts"), exports);


/***/ }),

/***/ "./libs/models/src/lib/keycloak/keycloak-user.dto.ts":
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));


/***/ }),

/***/ "./libs/models/src/lib/request/add-equipment-request.dto.ts":
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AddDeviceRequest = void 0;
class AddDeviceRequest {
}
exports.AddDeviceRequest = AddDeviceRequest;


/***/ }),

/***/ "./libs/models/src/lib/request/add-room-request.dto.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AddRoomRequest = void 0;
const tslib_1 = __webpack_require__("tslib");
const swagger_1 = __webpack_require__("@nestjs/swagger");
const class_validator_1 = __webpack_require__("class-validator");
class AddRoomRequest {
}
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({
        name: "name",
        description: "Name of the room to be added",
        maxLength: 100,
        minLength: 1,
        type: String,
        example: "LB01"
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(1),
    (0, class_validator_1.MaxLength)(100),
    (0, class_validator_1.IsString)(),
    tslib_1.__metadata("design:type", String)
], AddRoomRequest.prototype, "name", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({
        name: "description",
        description: "Description of the room to be added",
        maxLength: 500,
        minLength: 0,
        type: String,
        example: "New library room"
    }),
    (0, class_validator_1.MinLength)(1),
    (0, class_validator_1.MaxLength)(500),
    (0, class_validator_1.IsString)(),
    tslib_1.__metadata("design:type", String)
], AddRoomRequest.prototype, "description", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({
        name: "isDisabled",
        description: "Is the room should be disabled",
        type: Boolean,
        example: true
    }),
    (0, class_validator_1.IsBoolean)(),
    tslib_1.__metadata("design:type", Boolean)
], AddRoomRequest.prototype, "isDisabled", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({
        name: "type",
        description: "Library room type",
        type: String,
        example: "Library Room"
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(1),
    (0, class_validator_1.MaxLength)(100),
    tslib_1.__metadata("design:type", String)
], AddRoomRequest.prototype, "type", void 0);
exports.AddRoomRequest = AddRoomRequest;


/***/ }),

/***/ "./libs/models/src/lib/request/index.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__("tslib");
tslib_1.__exportStar(__webpack_require__("./libs/models/src/lib/request/username-password-credentials.dto.ts"), exports);
tslib_1.__exportStar(__webpack_require__("./libs/models/src/lib/request/add-room-request.dto.ts"), exports);
tslib_1.__exportStar(__webpack_require__("./libs/models/src/lib/request/update-room-request.dto.ts"), exports);
tslib_1.__exportStar(__webpack_require__("./libs/models/src/lib/request/users.dto.ts"), exports);
tslib_1.__exportStar(__webpack_require__("./libs/models/src/lib/request/keycloak.user.dto.ts"), exports);
tslib_1.__exportStar(__webpack_require__("./libs/models/src/lib/request/update-device-request.dto.ts"), exports);
tslib_1.__exportStar(__webpack_require__("./libs/models/src/lib/request/add-equipment-request.dto.ts"), exports);


/***/ }),

/***/ "./libs/models/src/lib/request/keycloak.user.dto.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.KeycloakUserSigninRequest = void 0;
const tslib_1 = __webpack_require__("tslib");
const swagger_1 = __webpack_require__("@nestjs/swagger");
class KeycloakUserSigninRequest {
}
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({
        description: "The username of the signin request.",
        minLength: 1,
        maxLength: 100,
        example: 'admin',
        type: String,
        name: 'username',
        nullable: false,
        required: true,
    }),
    tslib_1.__metadata("design:type", String)
], KeycloakUserSigninRequest.prototype, "username", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({
        description: "The password of the signin request.",
        minLength: 1,
        maxLength: 100,
        example: '1234',
        type: String,
        name: 'password',
        nullable: false,
        required: true,
    }),
    tslib_1.__metadata("design:type", String)
], KeycloakUserSigninRequest.prototype, "password", void 0);
exports.KeycloakUserSigninRequest = KeycloakUserSigninRequest;


/***/ }),

/***/ "./libs/models/src/lib/request/update-device-request.dto.ts":
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UpdateDeviceRequest = void 0;
class UpdateDeviceRequest {
}
exports.UpdateDeviceRequest = UpdateDeviceRequest;


/***/ }),

/***/ "./libs/models/src/lib/request/update-room-request.dto.ts":
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UpdateRoomRequest = void 0;
class UpdateRoomRequest {
}
exports.UpdateRoomRequest = UpdateRoomRequest;


/***/ }),

/***/ "./libs/models/src/lib/request/username-password-credentials.dto.ts":
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));


/***/ }),

/***/ "./libs/models/src/lib/request/users.dto.ts":
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UsersDTO = void 0;
class UsersDTO {
}
exports.UsersDTO = UsersDTO;


/***/ }),

/***/ "./libs/models/src/lib/response/index.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__("tslib");
tslib_1.__exportStar(__webpack_require__("./libs/models/src/lib/response/username-password-login-response.dto.ts"), exports);


/***/ }),

/***/ "./libs/models/src/lib/response/username-password-login-response.dto.ts":
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));


/***/ }),

/***/ "./libs/models/src/lib/room.dto.ts":
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.RoomsDTO = void 0;
class RoomsDTO {
}
exports.RoomsDTO = RoomsDTO;
;


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
