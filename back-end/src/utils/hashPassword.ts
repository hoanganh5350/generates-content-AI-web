import bcrypt from "bcrypt";

const saltRounds = 12;

// 🔐 Mã hóa mật khẩu trước khi lưu DB
export const hashPassword = async (plainPassword: string): Promise<string> => {
  return await bcrypt.hash(plainPassword, saltRounds);
};

// ✅ Kiểm tra khi đăng nhập
export const checkPassword = async (
  plainPassword: string,
  hashedPassword: string
): Promise<boolean> => {
  return await bcrypt.compare(plainPassword, hashedPassword);
};
