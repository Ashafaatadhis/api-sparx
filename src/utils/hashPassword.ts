import argon2 from "argon2";
export const hashPassword = async (
  password: string
): Promise<boolean | string> => {
  try {
    const hash = await argon2.hash(password);
    return hash;
  } catch (err) {
    return false;
  }
};

export const verifyPassword = async (
  hashPassword: string,
  password: string
) => {
  try {
    return await argon2.verify(hashPassword, password);
  } catch (err) {
    return false;
  }
};
