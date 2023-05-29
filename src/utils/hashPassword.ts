import bcrypt from "bcrypt";

export const hashPassword = (password) => {
  const salt: string = bcrypt.genSaltSync(10);
  return new Promise(async (resolve, reject) => {
    try {
      let hash: string | null = await bcrypt.hashSync(password, salt);
      resolve(hash);
    } catch (error) {
      reject(error);
    }
  });
};
