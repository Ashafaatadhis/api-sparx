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
const hashPassword_1 = require("../../src/utils/hashPassword");
const TEST_USER = process.env.TEST_USER;
const TEST_EMAIL = process.env.TEST_EMAIL;
const TEST_PASSWORD = process.env.TEST_PASSWORD;
const TEST_USER_ADMIN = process.env.TEST_USER_ADMIN;
const TEST_EMAIL_ADMIN = process.env.TEST_EMAIL_ADMIN;
const TEST_PASSWORD_ADMIN = process.env.TEST_PASSWORD_ADMIN;
describe("Genres Controller", () => {
    const registerAndLoginUser = () => __awaiter(void 0, void 0, void 0, function* () {
        yield createUser();
        const res = yield (0, supertest_1.default)(app_1.default)
            .post("/api/v1/auth/login")
            .send({ username: TEST_USER, password: TEST_PASSWORD });
        return res;
    });
    const registerAndLoginAdmin = () => __awaiter(void 0, void 0, void 0, function* () {
        yield createAdmin();
        const res = yield (0, supertest_1.default)(app_1.default)
            .post("/api/v1/auth/login")
            .send({ username: TEST_USER_ADMIN, password: TEST_PASSWORD_ADMIN });
        return res;
    });
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
    const createAdmin = () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield prisma_1.default.user.create({
            data: {
                email: TEST_EMAIL_ADMIN,
                password: (yield (0, hashPassword_1.hashPassword)(TEST_PASSWORD_ADMIN)),
                role: "ADMIN",
                username: TEST_USER_ADMIN,
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
    const deleteGenre = () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const result = yield prisma_1.default.$queryRaw `DELETE FROM genre WHERE genreName = 'testgenre'`;
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
        yield deleteGenre();
    }));
    describe("POST /api/v1/genres", () => {
        it("should be rejected if user not authenticated", () => __awaiter(void 0, void 0, void 0, function* () {
            const res = yield (0, supertest_1.default)(app_1.default).post("/api/v1/genres");
            expect(res.statusCode).toEqual(401);
            expect(res.body.status).toEqual(401);
            expect(res.body.message).toBeDefined();
        }));
        it("should be rejected if user role not admin", () => __awaiter(void 0, void 0, void 0, function* () {
            const login = yield registerAndLoginUser();
            const res = yield (0, supertest_1.default)(app_1.default)
                .post("/api/v1/genres")
                .send()
                .set("Cookie", `token=${login.body.data.token}`)
                .set("Authorization", `Bearer ${login.body.data.token}`);
            expect(res.statusCode).toEqual(401);
            expect(res.body.status).toEqual(401);
            expect(res.body.message).toBe("Unauthorized access");
        }));
        it("should be rejected if genreName not exist", () => __awaiter(void 0, void 0, void 0, function* () {
            const login = yield registerAndLoginAdmin();
            const res = yield (0, supertest_1.default)(app_1.default)
                .post("/api/v1/genres")
                .send()
                .set("Cookie", `token=${login.body.data.token}`)
                .set("Authorization", `Bearer ${login.body.data.token}`)
                .send({ genreName: "" });
            expect(res.statusCode).toEqual(500);
            expect(res.body.status).toEqual(500);
            expect(res.body.errors[0].msg).toBe("genreName is required");
        }));
        it("should be able to create genre", () => __awaiter(void 0, void 0, void 0, function* () {
            const login = yield registerAndLoginAdmin();
            const res = yield (0, supertest_1.default)(app_1.default)
                .post("/api/v1/genres")
                .send()
                .set("Cookie", `token=${login.body.data.token}`)
                .set("Authorization", `Bearer ${login.body.data.token}`)
                .send({ genreName: "testgenre" });
            expect(res.statusCode).toEqual(201);
            expect(res.body.status).toEqual(201);
            expect(res.body.message).toBe("Successfully Add New Genre");
        }));
    });
    describe("PUT /api/v1/genres", () => {
        it("should be rejected if user not authenticated", () => __awaiter(void 0, void 0, void 0, function* () {
            const res = yield (0, supertest_1.default)(app_1.default).put("/api/v1/genres/1");
            expect(res.statusCode).toEqual(401);
            expect(res.body.status).toEqual(401);
            expect(res.body.message).toBeDefined();
        }));
        it("should be rejected if user role not admin", () => __awaiter(void 0, void 0, void 0, function* () {
            const login = yield registerAndLoginUser();
            const res = yield (0, supertest_1.default)(app_1.default)
                .put(`/api/v1/genres/1`)
                .send()
                .set("Cookie", `token=${login.body.data.token}`)
                .set("Authorization", `Bearer ${login.body.data.token}`);
            expect(res.statusCode).toEqual(401);
            expect(res.body.status).toEqual(401);
            expect(res.body.message).toBe("Unauthorized access");
        }));
        it("should be rejected if genreName not exist", () => __awaiter(void 0, void 0, void 0, function* () {
            const login = yield registerAndLoginAdmin();
            const genre = yield (0, supertest_1.default)(app_1.default)
                .post("/api/v1/genres")
                .send()
                .set("Cookie", `token=${login.body.data.token}`)
                .set("Authorization", `Bearer ${login.body.data.token}`)
                .send({ genreName: "testgenre" });
            const res = yield (0, supertest_1.default)(app_1.default)
                .put(`/api/v1/genres/${genre.body.data.id}`)
                .send()
                .set("Cookie", `token=${login.body.data.token}`)
                .set("Authorization", `Bearer ${login.body.data.token}`)
                .send({ genreName: "" });
            expect(res.statusCode).toEqual(500);
            expect(res.body.status).toEqual(500);
            expect(res.body.errors[0].msg).toBe("genreName is required");
        }));
        it("should be able to edit genre", () => __awaiter(void 0, void 0, void 0, function* () {
            const login = yield registerAndLoginAdmin();
            const genre = yield (0, supertest_1.default)(app_1.default)
                .post("/api/v1/genres")
                .send()
                .set("Cookie", `token=${login.body.data.token}`)
                .set("Authorization", `Bearer ${login.body.data.token}`)
                .send({ genreName: "testgenre" });
            const res = yield (0, supertest_1.default)(app_1.default)
                .put(`/api/v1/genres/${genre.body.data.id}`)
                .send()
                .set("Cookie", `token=${login.body.data.token}`)
                .set("Authorization", `Bearer ${login.body.data.token}`)
                .send({ genreName: "testgenre" });
            expect(res.statusCode).toEqual(200);
            expect(res.body.status).toEqual(200);
            expect(res.body.message).toBe("Successfully Edit This Genre");
        }));
    });
    describe("DELETE /api/v1/genres", () => {
        it("should be rejected if user not authenticated", () => __awaiter(void 0, void 0, void 0, function* () {
            const res = yield (0, supertest_1.default)(app_1.default).delete("/api/v1/genres/12321");
            expect(res.statusCode).toEqual(401);
            expect(res.body.status).toEqual(401);
            expect(res.body.message).toBeDefined();
        }));
        it("should be rejected if user role not admin", () => __awaiter(void 0, void 0, void 0, function* () {
            const login = yield registerAndLoginUser();
            const res = yield (0, supertest_1.default)(app_1.default)
                .delete(`/api/v1/genres/132432`)
                .set("Cookie", `token=${login.body.data.token}`)
                .set("Authorization", `Bearer ${login.body.data.token}`);
            expect(res.statusCode).toEqual(401);
            expect(res.body.status).toEqual(401);
            expect(res.body.message).toBe("Unauthorized access");
        }));
        it("should be rejected if genre not found", () => __awaiter(void 0, void 0, void 0, function* () {
            const login = yield registerAndLoginAdmin();
            const res = yield (0, supertest_1.default)(app_1.default)
                .delete(`/api/v1/genres/892179`)
                .set("Cookie", `token=${login.body.data.token}`)
                .set("Authorization", `Bearer ${login.body.data.token}`);
            expect(res.statusCode).toEqual(500);
            expect(res.body.status).toEqual(500);
            expect(res.body.message).toBe("Failed to Delete This Genre");
        }));
        it("should be able to delete genre", () => __awaiter(void 0, void 0, void 0, function* () {
            const login = yield registerAndLoginAdmin();
            const genre = yield (0, supertest_1.default)(app_1.default)
                .post("/api/v1/genres")
                .send()
                .set("Cookie", `token=${login.body.data.token}`)
                .set("Authorization", `Bearer ${login.body.data.token}`)
                .send({ genreName: "testgenre" });
            const res = yield (0, supertest_1.default)(app_1.default)
                .delete(`/api/v1/genres/${genre.body.data.id}`)
                .set("Cookie", `token=${login.body.data.token}`)
                .set("Authorization", `Bearer ${login.body.data.token}`);
            expect(res.statusCode).toEqual(200);
            expect(res.body.status).toEqual(200);
            expect(res.body.message).toBe("Successfully Delete This Genre");
        }));
    });
    describe("GET /api/v1/genres", () => {
        it("should be return all genres", () => __awaiter(void 0, void 0, void 0, function* () {
            const res = yield (0, supertest_1.default)(app_1.default).get("/api/v1/genres");
            expect(res.statusCode).toEqual(200);
            expect(res.body.status).toEqual(200);
            expect(res.body.message).toEqual("Succesfully Get All Genres");
            expect(Array.isArray(res.body.data)).toBe(true);
        }));
    });
    describe("GET /api/v1/genres/:id", () => {
        it("should be return NULL genres", () => __awaiter(void 0, void 0, void 0, function* () {
            const res = yield (0, supertest_1.default)(app_1.default).get(`/api/v1/genres/12312`);
            expect(res.statusCode).toEqual(200);
            expect(res.body.status).toEqual(200);
            expect(res.body.message).toEqual("Succesfully Get Genre");
            expect(res.body.data).toBeNull();
        }));
        it("should be return detail genres", () => __awaiter(void 0, void 0, void 0, function* () {
            const login = yield registerAndLoginAdmin();
            const genre = yield (0, supertest_1.default)(app_1.default)
                .post("/api/v1/genres")
                .send()
                .set("Cookie", `token=${login.body.data.token}`)
                .set("Authorization", `Bearer ${login.body.data.token}`)
                .send({ genreName: "testgenre" });
            const res = yield (0, supertest_1.default)(app_1.default).get(`/api/v1/genres/${genre.body.data.id}`);
            expect(res.statusCode).toEqual(200);
            expect(res.body.status).toEqual(200);
            expect(res.body.message).toEqual("Succesfully Get Genre");
            expect(res.body.data).toBeDefined();
        }));
    });
});
