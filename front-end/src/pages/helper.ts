import type { NAME_FORM } from "./Login/constant";

export const validateValuesFromRegister = (values: {
  [key in NAME_FORM]?: string;
}): { success: boolean; errMsg?: string } => {
  console.log(values);
  return { success: true };
};
