import { NAME_FORM } from "./Login/constant";

export const isEmail = (value: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(value);
};

export interface MsgErr {
  field: NAME_FORM;
  msgErr: string;
}

export const validateValuesFromRegister = (
  values: {
    [key in NAME_FORM]?: string;
  },
  fieldsExit?: NAME_FORM[]
): { success: boolean; errMsg?: MsgErr[] } => {
  const arrayMsgErr: MsgErr[] = [];
  Object.keys(values).forEach((field: string) => {
    const valueFiled = values?.[field as NAME_FORM];
    if (field === NAME_FORM.EMAIL && valueFiled && !isEmail(valueFiled)) {
      arrayMsgErr.push({
        field: field as NAME_FORM,
        msgErr: `Email is not in correct format.`,
      });
    }
    if (fieldsExit && fieldsExit.includes(field as NAME_FORM) && valueFiled) {
      arrayMsgErr.push({
        field: field as NAME_FORM,
        msgErr: `${field.charAt(0).toUpperCase() + field.slice(1)} already exists`,
      });
    }
    if (!valueFiled) {
      arrayMsgErr.push({
        field: field as NAME_FORM,
        msgErr: `${field.charAt(0).toUpperCase() + field.slice(1)} cannot be blank`,
      });
    }
  });
  console.log(values);
  if (arrayMsgErr.length > 0) return { success: false, errMsg: arrayMsgErr };
  return { success: true };
};
