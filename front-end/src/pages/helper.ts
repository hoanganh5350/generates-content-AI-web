import { NAME_FORM } from "./Login/type";
import { toast } from "react-toastify";

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
        msgErr: `${
          field.charAt(0).toUpperCase() + field.slice(1)
        } already exists`,
      });
    }
    if (!valueFiled) {
      arrayMsgErr.push({
        field: field as NAME_FORM,
        msgErr: `${
          field.charAt(0).toUpperCase() + field.slice(1)
        } cannot be blank`,
      });
    }

    if (field === NAME_FORM.PASSWORD && valueFiled &&  valueFiled.length < 6) {
      arrayMsgErr.push({
        field: field as NAME_FORM,
        msgErr: `${
          field.charAt(0).toUpperCase() + field.slice(1)
        } must be at least 6 characters.`,
      });
    }
  });
  if (arrayMsgErr.length > 0) return { success: false, errMsg: arrayMsgErr };
  return { success: true };
};

export type NotificationType = "success" | "info" | "warn" | "error";

export const showNotification = (type: NotificationType, message: string) => {
  toast[type](message);
};
