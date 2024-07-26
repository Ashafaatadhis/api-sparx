import jwt from "jsonwebtoken";

const sign = (user: { id: number; username: string }) => {
  return jwt.sign(
    { sub: user.id, username: user.username },
    process.env.JWT_SECRET as string,
    { expiresIn: "3h" }
  );
};

const verify = (token: string) => {
  return jwt.verify(token, process.env.JWT_SECRET as string);
};

export { sign, verify };
