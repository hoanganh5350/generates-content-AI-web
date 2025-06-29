/* eslint-disable react-hooks/exhaustive-deps */
import React, { Fragment, useEffect, useRef, useState } from "react";
import "./Login.scss";
import Icon from "../../components/Icon/Icon";
import { Button } from "antd";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../app/store";
import { useFormik } from "formik";
import {
  register,
  requestOTP,
  switchModeLogin,
} from "../../features/auth/authSlice";
import { NAME_FORM, TYPE_INPUT } from "./type";
import { FileText, Lock, Person, Telephone } from "react-bootstrap-icons";
import { validateValuesFromRegister, type MsgErr } from "../helper";
import Input from "../../components/Input/Input";
import { post } from "../../api/http";
import { MODE_LOGIN } from "../../features/auth/type";
import VerifyOTP from "./VerifyOTP";

type ValueForm = {
  [NAME_FORM.USER_NAME]?: string;
  [NAME_FORM.EMAIL]?: string;
  [NAME_FORM.PHONE]?: string;
  [NAME_FORM.PASSWORD]?: string;
};

const RegisterForm: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { otpSent } = useSelector((state: RootState) => state.auth);

  const elementsFormRegister = [
    {
      name: NAME_FORM.USER_NAME,
      typeInput: TYPE_INPUT.TEXT,
      placeholder: "User Name",
      prefix: <FileText size={20} />,
      type: "text",
    },
    {
      name: NAME_FORM.EMAIL,
      typeInput: TYPE_INPUT.TEXT,
      placeholder: "Email",
      prefix: <Person size={20} />,
      type: "text",
    },
    {
      name: NAME_FORM.PHONE,
      typeInput: TYPE_INPUT.TEXT,
      placeholder: "Phone",
      prefix: <Telephone />,
      type: "phone",
    },
    {
      name: NAME_FORM.PASSWORD,
      typeInput: TYPE_INPUT.PASSWORD,
      placeholder: "Password",
      prefix: <Lock size={20} />,
      type: "password",
    },
  ];
  // const [otp, setOtp] = useState("");
  const [fieldsErrorExit, setFieldsErrorExit] = useState<NAME_FORM[]>([]);
  const [errorFields, setErrorFields] = useState<MsgErr[]>([]);
  const firstTimeChangeForm = useRef<boolean>(false);

  const onSubmitForm = (values: ValueForm) => {
    const validateValues = validateValuesFromRegister(values, fieldsErrorExit);
    if (!validateValues.success && validateValues.errMsg) {
      setErrorFields(validateValues.errMsg);
      return;
    }
    dispatch(requestOTP(values[NAME_FORM.PHONE] ?? ""));
  };

  const formik = useFormik({
    initialValues: {
      userName: "",
      email: "",
      phone: "",
      password: "",
    },
    onSubmit: onSubmitForm,
  });
  const { values, setFieldValue } = formik;

  const onChange = (nameField: NAME_FORM, e: string) => {
    if (errorFields.find((el) => el.field === nameField)) {
      setErrorFields((prev) => prev.filter((item) => item.field !== nameField));
    }
    setFieldValue(nameField, e);
  };

  const handelSwitchToRegister = () => {
    dispatch(switchModeLogin(MODE_LOGIN.LOGIN));
  };

  const fetchingData = async () => {
    try {
      const respon = await post<{ success: boolean; message?: string }>(
        "/auth/fetchFormRegister",
        values
      );
      if (respon?.message) {
        // const arrFieldsEmty = JSON.parse(respon?.message) as NAME_FORM[];
        // setErrorFields(
        //   arrFieldsEmty.map((el) => ({
        //     field: el,
        //     msgErr: `${
        //       el.charAt(0).toUpperCase() + el.slice(1)
        //     } already exists`,
        //   }))
        // );
        setFieldsErrorExit(JSON.parse(respon?.message));
      } else {
        setFieldsErrorExit([]);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (!firstTimeChangeForm.current) return;
    fetchingData();
  }, [values]);

  return (
    <div className="LoginForm">
      <Icon className="userLoginAvt" iconName={"userLogin"} size={106} />
      <div className="titleLogin">Sign up to use Skipli AI</div>
      {!otpSent ? (
        <div className={"containerForm"}>
          <div className={"containerFormFields"}>
            {elementsFormRegister.map((item, idx: number) => (
              <Fragment key={idx}>
                <Input
                  name={item.name}
                  className={"inputLogin"}
                  placeholder={item.placeholder}
                  prefix={item.prefix}
                  type={item.type}
                  onChange={(e) => {
                    if (e !== "") {
                      firstTimeChangeForm.current = true;
                    }
                    onChange(item.name, e);
                  }}
                  error={
                    errorFields.length > 0 &&
                    errorFields.find((it: MsgErr) => it.field === item.name)
                      ? errorFields.find((it: MsgErr) => it.field === item.name)
                          ?.msgErr
                      : undefined
                  }
                />
              </Fragment>
            ))}
          </div>
          <Button
            className={"buttonLogin"}
            color="default"
            variant="solid"
            onClick={() => onSubmitForm(values)}
          >
            Register
          </Button>
          <div className={"switchRegister"}>
            <p>Do have an account?</p>&nbsp;
            <p
              className={"textRegister"}
              onClick={() => handelSwitchToRegister()}
            >
              Login
            </p>
          </div>
        </div>
      ) : (
        <VerifyOTP
          phone={values.phone}
          onSubmiting={async () => {
            await dispatch(register(values));
          }}
        />
      )}
    </div>
  );
};

export default RegisterForm;
