import request from "supertest";
import app from "@/app";
import prisma from "@/config/prisma";
import cookie from "cookie";
import { hashPassword } from "@/utils/hashPassword";
import { deleteUser } from "./AuthController.test";

const TEST_USER = process.env.TEST_USER;
const TEST_EMAIL = process.env.TEST_EMAIL;
const TEST_PASSWORD = process.env.TEST_PASSWORD;
const TEST_USER_ADMIN = process.env.TEST_USER_ADMIN;
const TEST_EMAIL_ADMIN = process.env.TEST_EMAIL_ADMIN;
const TEST_PASSWORD_ADMIN = process.env.TEST_PASSWORD_ADMIN;

export const deleteGenre = async () => {
  try {
    const result =
      await prisma.$queryRaw`DELETE FROM Genre WHERE genreName = 'testgenre'`;

    return result;
  } catch (err: any) {
    console.log("ERR", err.message);
    return null;
  }
};

describe("Genres Controller", () => {
  const registerAndLoginUser = async () => {
    await createUser();
    const res = await request(app)
      .post("/api/v1/auth/login")
      .send({ username: TEST_USER, password: TEST_PASSWORD });
    return res;
  };
  const registerAndLoginAdmin = async () => {
    await createAdmin();
    const res = await request(app)
      .post("/api/v1/auth/login")
      .send({ username: TEST_USER_ADMIN, password: TEST_PASSWORD_ADMIN });
    return res;
  };
  const createUser = async () => {
    const result = await prisma.user.create({
      data: {
        email: TEST_EMAIL as string,
        password: (await hashPassword(TEST_PASSWORD as string)) as string,
        role: "USER",
        username: TEST_USER as string,
      },
    });
    return result;
  };
  const createAdmin = async () => {
    const result = await prisma.user.create({
      data: {
        email: TEST_EMAIL_ADMIN as string,
        password: (await hashPassword(TEST_PASSWORD_ADMIN as string)) as string,
        role: "ADMIN",
        username: TEST_USER_ADMIN as string,
      },
    });
    return result;
  };

  beforeEach(async () => {
    // await deleteUserByUsername("admin");
    await deleteUser();
    await deleteGenre();
  });

  describe("POST /api/v1/genres", () => {
    it("should be rejected if user not authenticated", async () => {
      const res = await request(app).post("/api/v1/genres");

      expect(res.statusCode).toEqual(401);
      expect(res.body.status).toEqual(401);
      expect(res.body.message).toBeDefined();
    });
    it("should be rejected if user role not admin", async () => {
      const login = await registerAndLoginUser();

      const res = await request(app)
        .post("/api/v1/genres")
        .send()
        .set("Cookie", `token=${login.body.data.token}`)
        .set("Authorization", `Bearer ${login.body.data.token}`);

      expect(res.statusCode).toEqual(401);
      expect(res.body.status).toEqual(401);

      expect(res.body.message).toBe("Unauthorized access");
    });
    it("should be rejected if genreName not exist", async () => {
      const login = await registerAndLoginAdmin();

      const res = await request(app)
        .post("/api/v1/genres")
        .send()
        .set("Cookie", `token=${login.body.data.token}`)
        .set("Authorization", `Bearer ${login.body.data.token}`)
        .send({ genreName: "" });

      expect(res.statusCode).toEqual(500);
      expect(res.body.status).toEqual(500);
      expect(res.body.errors[0].msg).toBe("genreName is required");
    });
    it("should be able to create genre", async () => {
      const login = await registerAndLoginAdmin();

      const res = await request(app)
        .post("/api/v1/genres")
        .send()
        .set("Cookie", `token=${login.body.data.token}`)
        .set("Authorization", `Bearer ${login.body.data.token}`)
        .send({ genreName: "testgenre" });

      expect(res.statusCode).toEqual(201);
      expect(res.body.status).toEqual(201);
      expect(res.body.message).toBe("Successfully Add New Genre");
    });
  });
  describe("PUT /api/v1/genres", () => {
    it("should be rejected if user not authenticated", async () => {
      const res = await request(app).put("/api/v1/genres/1");

      expect(res.statusCode).toEqual(401);
      expect(res.body.status).toEqual(401);
      expect(res.body.message).toBeDefined();
    });
    it("should be rejected if user role not admin", async () => {
      const login = await registerAndLoginUser();

      const res = await request(app)
        .put(`/api/v1/genres/1`)
        .send()
        .set("Cookie", `token=${login.body.data.token}`)
        .set("Authorization", `Bearer ${login.body.data.token}`);

      expect(res.statusCode).toEqual(401);
      expect(res.body.status).toEqual(401);

      expect(res.body.message).toBe("Unauthorized access");
    });
    it("should be rejected if genreName not exist", async () => {
      const login = await registerAndLoginAdmin();

      const genre = await request(app)
        .post("/api/v1/genres")
        .send()
        .set("Cookie", `token=${login.body.data.token}`)
        .set("Authorization", `Bearer ${login.body.data.token}`)
        .send({ genreName: "testgenre" });

      const res = await request(app)
        .put(`/api/v1/genres/${genre.body.data.id}`)
        .send()
        .set("Cookie", `token=${login.body.data.token}`)
        .set("Authorization", `Bearer ${login.body.data.token}`)
        .send({ genreName: "" });

      expect(res.statusCode).toEqual(500);
      expect(res.body.status).toEqual(500);
      expect(res.body.errors[0].msg).toBe("genreName is required");
    });
    it("should be able to edit genre", async () => {
      const login = await registerAndLoginAdmin();

      const genre = await request(app)
        .post("/api/v1/genres")
        .send()
        .set("Cookie", `token=${login.body.data.token}`)
        .set("Authorization", `Bearer ${login.body.data.token}`)
        .send({ genreName: "testgenre" });

      const res = await request(app)
        .put(`/api/v1/genres/${genre.body.data.id}`)
        .send()
        .set("Cookie", `token=${login.body.data.token}`)
        .set("Authorization", `Bearer ${login.body.data.token}`)
        .send({ genreName: "testgenre" });

      expect(res.statusCode).toEqual(200);
      expect(res.body.status).toEqual(200);
      expect(res.body.message).toBe("Successfully Edit This Genre");
    });
  });
  describe("DELETE /api/v1/genres", () => {
    it("should be rejected if user not authenticated", async () => {
      const res = await request(app).delete("/api/v1/genres/12321");

      expect(res.statusCode).toEqual(401);
      expect(res.body.status).toEqual(401);
      expect(res.body.message).toBeDefined();
    });
    it("should be rejected if user role not admin", async () => {
      const login = await registerAndLoginUser();

      const res = await request(app)
        .delete(`/api/v1/genres/132432`)

        .set("Cookie", `token=${login.body.data.token}`)
        .set("Authorization", `Bearer ${login.body.data.token}`);

      expect(res.statusCode).toEqual(401);
      expect(res.body.status).toEqual(401);

      expect(res.body.message).toBe("Unauthorized access");
    });
    it("should be rejected if genre not found", async () => {
      const login = await registerAndLoginAdmin();

      const res = await request(app)
        .delete(`/api/v1/genres/892179`)

        .set("Cookie", `token=${login.body.data.token}`)
        .set("Authorization", `Bearer ${login.body.data.token}`);

      expect(res.statusCode).toEqual(500);
      expect(res.body.status).toEqual(500);
      expect(res.body.message).toBe("Failed to Delete This Genre");
    });
    it("should be able to delete genre", async () => {
      const login = await registerAndLoginAdmin();

      const genre = await request(app)
        .post("/api/v1/genres")
        .send()
        .set("Cookie", `token=${login.body.data.token}`)
        .set("Authorization", `Bearer ${login.body.data.token}`)
        .send({ genreName: "testgenre" });

      const res = await request(app)
        .delete(`/api/v1/genres/${genre.body.data.id}`)

        .set("Cookie", `token=${login.body.data.token}`)
        .set("Authorization", `Bearer ${login.body.data.token}`);

      expect(res.statusCode).toEqual(200);
      expect(res.body.status).toEqual(200);
      expect(res.body.message).toBe("Successfully Delete This Genre");
    });
  });
  describe("GET /api/v1/genres", () => {
    it("should be return all genres", async () => {
      const res = await request(app).get("/api/v1/genres");
      expect(res.statusCode).toEqual(200);
      expect(res.body.status).toEqual(200);
      expect(res.body.message).toEqual("Succesfully Get All Genres");
      expect(Array.isArray(res.body.data)).toBe(true);
    });
  });
  describe("GET /api/v1/genres/:id", () => {
    it("should be return NULL genres", async () => {
      const res = await request(app).get(`/api/v1/genres/12312`);

      expect(res.statusCode).toEqual(200);
      expect(res.body.status).toEqual(200);
      expect(res.body.message).toEqual("Succesfully Get Genre");
      expect(res.body.data).toBeNull();
    });
    it("should be return detail genres", async () => {
      const login = await registerAndLoginAdmin();
      const genre = await request(app)
        .post("/api/v1/genres")
        .send()
        .set("Cookie", `token=${login.body.data.token}`)
        .set("Authorization", `Bearer ${login.body.data.token}`)
        .send({ genreName: "testgenre" });
      const res = await request(app).get(
        `/api/v1/genres/${genre.body.data.id}`
      );

      expect(res.statusCode).toEqual(200);
      expect(res.body.status).toEqual(200);
      expect(res.body.message).toEqual("Succesfully Get Genre");
      expect(res.body.data).toBeDefined();
    });
  });
});
