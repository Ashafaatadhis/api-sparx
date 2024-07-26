import { User } from "@prisma/client";

export const responseUser = (data: User) => {
  return {
    id: data.id,
    email: data.email,
    role: data.role,
    username: data.username,
    createdAt: data.createdAt,
    updatedAt: data.updatedAt,
    deletedAt: data.deletedAt,
  };
};
