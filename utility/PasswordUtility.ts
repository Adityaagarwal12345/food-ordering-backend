import bcrypt from "bcrypt";

export const GenerateSalt = async (): Promise<string> => {
  return await bcrypt.genSalt(10);
};

export const GeneratePassword = async (
  password: string,
  salt: string
): Promise<string> => {
  return await bcrypt.hash(password, salt);
};
