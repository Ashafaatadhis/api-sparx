import { User } from "@prisma/client";
import jwt from "jsonwebtoken";

export type IPayload = {
  sub: number;
  username: string;
  role: "ADMIN" | "USER";
  iat: number;
  exp: number;
};

const sign = (user: User) => {
  return jwt.sign(
    { sub: user.id, username: user.username, role: user.role },
    process.env.JWT_SECRET as string,
    { expiresIn: "3h" }
  );
};

const verify = (token: string) => {
  return jwt.verify(token, process.env.JWT_SECRET as string);
};

export { sign, verify };
