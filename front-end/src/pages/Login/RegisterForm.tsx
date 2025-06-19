import React, { Fragment, useRef, useState } from "react";
import "./Login.scss";
import Icon from "../../components/Icon/Icon";
import { Button, Input, type InputRef } from "antd";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../app/store";
import { useFormik } from "formik";
import {
  requestOTP,
  switchModeRegister,
  verifyOTP,
} from "../../features/auth/authSlice";
import { TYPE_INPUT } from "./constant";
import {
  Eye,
  EyeSlash,
  FileText,
  Lock,
  Person,
  Telephone,
} from "react-bootstrap-icons";
import { validateValuesFromRegister } from "../helper";

enum NAME_FORM_REGISTER {
  USER_NAME = "userName",
  EMAIL = "email",
  PHONE = "phone",
  PASSWORD = "password",
}

type ValueForm = {
  [NAME_FORM_REGISTER.USER_NAME]?: string;
  [NAME_FORM_REGISTER.EMAIL]?: string;
  [NAME_FORM_REGISTER.PHONE]?: string;
  [NAME_FORM_REGISTER.PASSWORD]?: string;
};

const RegisterForm: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { loading, error, otpSent } = useSelector(
    (state: RootState) => state.auth
  );

  const elementsFormRegister = [
    {
      name: NAME_FORM_REGISTER.USER_NAME,
      typeInput: TYPE_INPUT.TEXT,
      placeholder: "Tên người dùng",
      prefix: <FileText />,
    },
    {
      name: NAME_FORM_REGISTER.EMAIL,
      typeInput: TYPE_INPUT.TEXT,
      placeholder: "Email",
      prefix: <Person />,
    },
    {
      name: NAME_FORM_REGISTER.PHONE,
      typeInput: TYPE_INPUT.TEXT,
      placeholder: "Số điện thoại",
      prefix: <Telephone />,
    },
    {
      name: NAME_FORM_REGISTER.PASSWORD,
      typeInput: TYPE_INPUT.PASSWORD,
      placeholder: "Mật khẩu",
      prefix: <Lock />,
    },
  ];
  const [otp, setOtp] = useState("");

  const onSubmitForm = (values: ValueForm) => {
    const validateValues = validateValuesFromRegister(values)
    if(!validateValues.success) return;
    dispatch(verifyOTP({ phone: values[NAME_FORM_REGISTER.PHONE] ?? "", otp }));
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

  const [seePassword, setSeePassword] = useState<boolean>(false);
  const refInputPassword = useRef<InputRef>(null);
  const { values, setFieldValue } = formik;

  const onChange = (
    nameField: NAME_FORM_REGISTER,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFieldValue(nameField, e.target.value);
  };

  const handleRegisterToVerifyPhone = () => {
    dispatch(requestOTP(values[NAME_FORM_REGISTER.PHONE]));
  };
  const handelSwitchToRegister = () => {
    dispatch(switchModeRegister(false));
  };

  const renderVerifyOtp = () => (
    <div className="Form">
      <div className="ContentForm">
        SkipliAI has sent an OTP code to: {values[NAME_FORM_REGISTER.PHONE]}
      </div>
      <div className="InputAndError">
        <input
          className="InputCode"
          type="text"
          placeholder="Enter your code here"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          disabled={loading}
        />
        {error && <p style={{ color: "red" }}>{error}</p>}
      </div>
      <button
        className="ButtonForm"
        onClick={() => onSubmitForm(values)}
        disabled={loading}
      >
        {loading ? "Submiting..." : "Submit"}
      </button>
    </div>
  );

  return (
    <div className="LoginForm">
      <Icon className="userLoginAvt" iconName={"userLogin"} size={106} />
      <div className="titleLogin">Sign up to use Skipli AI</div>
      {!otpSent ? (
        <div className={"containerForm"}>
          <div className={"containerFormFields"}>
            {elementsFormRegister.map((item, idx: number) => (
              <Fragment key={idx}>
                {item.typeInput === TYPE_INPUT.PASSWORD ? (
                  <Input
                    name={item.name}
                    ref={refInputPassword}
                    className={"inputLogin"}
                    size="large"
                    placeholder={item.placeholder}
                    prefix={item.prefix}
                    suffix={
                      <div
                        className={"iconEye"}
                        onClick={() => {
                          setSeePassword(!seePassword);
                          setTimeout(() => {
                            const passwordLength = values[
                              NAME_FORM_REGISTER.PASSWORD
                            ]
                              ? values[NAME_FORM_REGISTER.PASSWORD]?.length
                              : 0;
                            if (!refInputPassword.current) return;
                            refInputPassword.current.setSelectionRange(
                              passwordLength,
                              passwordLength
                            );
                          }, 10);
                        }}
                      >
                        {seePassword ? <Eye /> : <EyeSlash />}
                      </div>
                    }
                    type={seePassword ? "text" : "password"}
                    onChange={(e) => onChange(item.name, e)}
                  />
                ) : (
                  <Input
                    name={item.name}
                    className={"inputLogin"}
                    size="large"
                    placeholder={item.placeholder}
                    prefix={item.prefix}
                    onChange={(e) => onChange(item.name, e)}
                  />
                )}
              </Fragment>
            ))}
          </div>
          <Button
            className={"buttonLogin"}
            onClick={() => handleRegisterToVerifyPhone()}
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
        renderVerifyOtp()
      )}
    </div>
  );
};

export default RegisterForm;
