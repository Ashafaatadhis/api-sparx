import request from "supertest";
import app from "@/app";
import prisma from "@/config/prisma";
import cookie from "cookie";
import { hashPassword } from "@/utils/hashPassword";

const TEST_USER = process.env.TEST_USER;
const TEST_EMAIL = process.env.TEST_EMAIL;
const TEST_PASSWORD = process.env.TEST_PASSWORD;

export const deleteUser = async () => {
  try {
    const result =
      await prisma.$queryRaw`DELETE FROM User WHERE username = ${TEST_USER}`;

    return result;
  } catch (err: any) {
    console.log("ERR", err.message);
    return null;
  }
};

describe("Auth Controller", () => {
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

  beforeEach(async () => {
    // await deleteUserByUsername("admin");
    await deleteUser();
  });

  describe("POST /api/v1/auth/register", () => {
    it("should be rejected if password length not in requirement", async () => {
      const data = {
        username: TEST_USER,
        email: TEST_EMAIL,
        password: "Ad@123",
      };
      const res = await request(app).post("/api/v1/auth/register").send(data);

      expect(res.statusCode).toEqual(500);
      expect(res.body.status).toEqual(500);
      expect(res.body.errors[0].msg).toBe(
        "Password must be between 8 and 64 characters"
      );
    });
    it("should be rejected if password not valid in validate", async () => {
      const data = {
        username: TEST_USER,
        email: TEST_EMAIL,
        password: "admin@12345678",
      };
      const res = await request(app).post("/api/v1/auth/register").send(data);

      expect(res.statusCode).toEqual(500);
      expect(res.body.status).toEqual(500);
      expect(res.body.errors[0].msg).toBe(
        "Password must consist of at least one lowercase, one uppercase, one special character, and one number"
      );
    });
    it("should be rejected if username is exist", async () => {
      await createUser();

      const res = await request(app).post("/api/v1/auth/register").send({
        username: TEST_USER,
        email: TEST_EMAIL,
        password: TEST_PASSWORD,
      });

      expect(res.statusCode).toEqual(400);
      expect(res.body.status).toEqual(400);
      expect(res.body.message).toBe("Failed to register user");
    });
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
    it("should be able to register", async () => {
      const res = await request(app).post("/api/v1/auth/register").send({
        username: TEST_USER,
        password: TEST_PASSWORD,
        email: TEST_EMAIL,
      });

      expect(res.statusCode).toEqual(201);
      expect(res.body.status).toEqual(201);
      expect(res.body.message).toBe("Successfully registered user");
    });
  });

  describe("POST /api/v1/auth/login", () => {
    it("should be rejected if username not string", async () => {
      const data = {
        username: 123213,
        password: "Ad@123",
      };
      const res = await request(app).post("/api/v1/auth/login").send(data);

      expect(res.statusCode).toEqual(500);
      expect(res.body.status).toEqual(500);
      expect(res.body.errors[0].msg).toBe(
        "The username and password must be strings"
      );
    });
    it("should be rejected if password not string", async () => {
      const data = {
        username: "admin",
        password: 12321,
      };
      const res = await request(app).post("/api/v1/auth/login").send(data);

      expect(res.statusCode).toEqual(500);
      expect(res.body.status).toEqual(500);
      expect(res.body.errors[0].msg).toBe(
        "The username and password must be strings"
      );
    });
    it("should be rejected if login fails or username/password wrong", async () => {
      const res = await request(app)
        .post("/api/v1/auth/login")
        .send({ username: "adam", password: "Adsalf@24324" });

      expect(res.statusCode).toEqual(401);
      expect(res.body.status).toEqual(401);
      expect(res.body.message).toBe("Invalid username or password");
    });
    it("should be able to login", async () => {
      await createUser();

      const res = await request(app)
        .post("/api/v1/auth/login")
        .send({ username: TEST_USER, password: TEST_PASSWORD });

      expect(res.statusCode).toEqual(200);
      expect(res.body.message).toBe("Successfully logged in");
      expect(res.body.status).toEqual(200);
      expect(res.body.data.token).toBeDefined();
      expect(res.body.data.user).toBeDefined();
    });
    it("should be exist cookie token", async () => {
      await createUser();
      const res = await request(app)
        .post("/api/v1/auth/login")
        .send({ username: TEST_USER, password: TEST_PASSWORD });

      expect(cookie.parse(res.headers["set-cookie"][0]).token).toBeDefined();
      expect(res.statusCode).toEqual(200);
      expect(res.body.message).toBe("Successfully logged in");
      expect(res.body.status).toEqual(200);
      expect(res.body.data.user.id).toBeDefined();
      expect(res.body.data.user.username).toBeDefined();
      expect(res.body.data.token).toBeDefined();
    });
  });

  describe("DELETE /api/v1/logout", () => {
    it("should be rejected if token invalid", async () => {
      const res = await request(app)
        .delete("/api/v1/auth/logout")
        .set("Authorization", `Bearer 3242432343`);

      expect(res.body.status).toEqual(401);
      expect(res.body.message).toBeDefined();
    });
    it("should be able to logout", async () => {
      await createUser();
      const login = await request(app)
        .post("/api/v1/auth/login")
        .send({ username: TEST_USER, password: TEST_PASSWORD });

      const res = await request(app)
        .delete("/api/v1/auth/logout")
        .set("Cookie", `token=${login.body.data.token}`)
        .set("Authorization", `Bearer ${login.body.data.token}`);
      expect(res.statusCode).toEqual(200);
      expect(res.body.message).toBe("Successfully logged out");
      expect(cookie.parse(res.headers["set-cookie"][0]).token).toBe("");
    });
  });
});
