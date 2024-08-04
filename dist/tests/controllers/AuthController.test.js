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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const app_1 = __importDefault(require("../../src/app"));
const prisma_1 = __importDefault(require("../../src/config/prisma"));
const cookie_1 = __importDefault(require("cookie"));
const hashPassword_1 = require("../../src/utils/hashPassword");
const TEST_USER = process.env.TEST_USER;
const TEST_EMAIL = process.env.TEST_EMAIL;
const TEST_PASSWORD = process.env.TEST_PASSWORD;
describe("Auth Controller", () => {
    const createUser = () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield prisma_1.default.user.create({
            data: {
                email: TEST_EMAIL,
                password: (yield (0, hashPassword_1.hashPassword)(TEST_PASSWORD)),
                role: "USER",
                username: TEST_USER,
            },
        });
        return result;
    });
    const deleteUser = () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const result = yield prisma_1.default.$queryRaw `DELETE FROM user WHERE username = ${TEST_USER}`;
            return result;
        }
        catch (err) {
            console.log("ERR", err.message);
            return null;
        }
    });
    beforeEach(() => __awaiter(void 0, void 0, void 0, function* () {
        // await deleteUserByUsername("admin");
        yield deleteUser();
    }));
    describe("POST /api/v1/auth/register", () => {
        it("should be rejected if password length not in requirement", () => __awaiter(void 0, void 0, void 0, function* () {
            const data = {
                username: TEST_USER,
                email: TEST_EMAIL,
                password: "Ad@123",
            };
            const res = yield (0, supertest_1.default)(app_1.default).post("/api/v1/auth/register").send(data);
            expect(res.statusCode).toEqual(500);
            expect(res.body.status).toEqual(500);
            expect(res.body.errors[0].msg).toBe("Password must be between 8 and 64 characters");
        }));
        it("should be rejected if password not valid in validate", () => __awaiter(void 0, void 0, void 0, function* () {
            const data = {
                username: TEST_USER,
                email: TEST_EMAIL,
                password: "admin@12345678",
            };
            const res = yield (0, supertest_1.default)(app_1.default).post("/api/v1/auth/register").send(data);
            expect(res.statusCode).toEqual(500);
            expect(res.body.status).toEqual(500);
            expect(res.body.errors[0].msg).toBe("Password must consist of at least one lowercase, one uppercase, one special character, and one number");
        }));
        it("should be rejected if username is exist", () => __awaiter(void 0, void 0, void 0, function* () {
            yield createUser();
            const res = yield (0, supertest_1.default)(app_1.default).post("/api/v1/auth/register").send({
                username: TEST_USER,
                email: TEST_EMAIL,
                password: TEST_PASSWORD,
            });
            expect(res.statusCode).toEqual(400);
            expect(res.body.status).toEqual(400);
            expect(res.body.message).toBe("Failed to register user");
        }));
        // // it("should be rejected if registration fails", async () => {
        // //   const data = {
        // //     username: "admin",
        // //     password: "Admin@12345678",
        // //   };
        // //   const res = await request(app).post("/api/v1/register").send(data);
        // //   expect(res.statusCode).toEqual(500);
        // //   expect(res.body.status).toEqual(500);
        // //   expect(res.body.message).toBe("Failed to register new user!");
        // // });
        it("should be able to register", () => __awaiter(void 0, void 0, void 0, function* () {
            const res = yield (0, supertest_1.default)(app_1.default).post("/api/v1/auth/register").send({
                username: TEST_USER,
                password: TEST_PASSWORD,
                email: TEST_EMAIL,
            });
            expect(res.statusCode).toEqual(201);
            expect(res.body.status).toEqual(201);
            expect(res.body.message).toBe("Successfully registered user");
        }));
    });
    describe("POST /api/v1/auth/login", () => {
        it("should be rejected if username not string", () => __awaiter(void 0, void 0, void 0, function* () {
            const data = {
                username: 123213,
                password: "Ad@123",
            };
            const res = yield (0, supertest_1.default)(app_1.default).post("/api/v1/auth/login").send(data);
            expect(res.statusCode).toEqual(500);
            expect(res.body.status).toEqual(500);
            expect(res.body.errors[0].msg).toBe("The username and password must be strings");
        }));
        it("should be rejected if password not string", () => __awaiter(void 0, void 0, void 0, function* () {
            const data = {
                username: "admin",
                password: 12321,
            };
            const res = yield (0, supertest_1.default)(app_1.default).post("/api/v1/auth/login").send(data);
            expect(res.statusCode).toEqual(500);
            expect(res.body.status).toEqual(500);
            expect(res.body.errors[0].msg).toBe("The username and password must be strings");
        }));
        it("should be rejected if login fails or username/password wrong", () => __awaiter(void 0, void 0, void 0, function* () {
            const res = yield (0, supertest_1.default)(app_1.default)
                .post("/api/v1/auth/login")
                .send({ username: "adam", password: "Adsalf@24324" });
            expect(res.statusCode).toEqual(401);
            expect(res.body.status).toEqual(401);
            expect(res.body.message).toBe("Invalid username or password");
        }));
        it("should be able to login", () => __awaiter(void 0, void 0, void 0, function* () {
            yield createUser();
            const res = yield (0, supertest_1.default)(app_1.default)
                .post("/api/v1/auth/login")
                .send({ username: TEST_USER, password: TEST_PASSWORD });
            expect(res.statusCode).toEqual(200);
            expect(res.body.message).toBe("Successfully logged in");
            expect(res.body.status).toEqual(200);
            expect(res.body.data.token).toBeDefined();
            expect(res.body.data.user).toBeDefined();
        }));
        it("should be exist cookie token", () => __awaiter(void 0, void 0, void 0, function* () {
            yield createUser();
            const res = yield (0, supertest_1.default)(app_1.default)
                .post("/api/v1/auth/login")
                .send({ username: TEST_USER, password: TEST_PASSWORD });
            expect(cookie_1.default.parse(res.headers["set-cookie"][0]).token).toBeDefined();
            expect(res.statusCode).toEqual(200);
            expect(res.body.message).toBe("Successfully logged in");
            expect(res.body.status).toEqual(200);
            expect(res.body.data.user.id).toBeDefined();
            expect(res.body.data.user.username).toBeDefined();
            expect(res.body.data.token).toBeDefined();
        }));
    });
    describe("DELETE /api/v1/logout", () => {
        it("should be rejected if token invalid", () => __awaiter(void 0, void 0, void 0, function* () {
            const res = yield (0, supertest_1.default)(app_1.default)
                .delete("/api/v1/auth/logout")
                .set("Authorization", `Bearer 3242432343`);
            expect(res.body.status).toEqual(401);
            expect(res.body.message).toBeDefined();
        }));
        it("should be able to logout", () => __awaiter(void 0, void 0, void 0, function* () {
            yield createUser();
            const login = yield (0, supertest_1.default)(app_1.default)
                .post("/api/v1/auth/login")
                .send({ username: TEST_USER, password: TEST_PASSWORD });
            const res = yield (0, supertest_1.default)(app_1.default)
                .delete("/api/v1/auth/logout")
                .set("Cookie", `token=${login.body.data.token}`)
                .set("Authorization", `Bearer ${login.body.data.token}`);
            expect(res.statusCode).toEqual(200);
            expect(res.body.message).toBe("Successfully logged out");
            expect(cookie_1.default.parse(res.headers["set-cookie"][0]).token).toBe("");
        }));
    });
});
