import request from "supertest";
import app from "@/app";
describe("COBA TEST", () => {
  describe("POST", () => {
    it("SHOULD BE TRUE", async () => {
      const res = await request(app).post("/api/v1/auth/login");
      console.log(res.body);
      expect(1 + 1).toBe(2);
    });
  });
});
