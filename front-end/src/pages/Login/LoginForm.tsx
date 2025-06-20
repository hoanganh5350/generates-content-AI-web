import "./Login.scss";
import React, { useRef, useState } from "react";
import { Input, Button, type InputRef } from "antd/lib";
import { NAME_FORM } from "./constant";
import Icon from "../../components/Icon/Icon";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../app/store";
import { login, switchModeRegister } from "../../features/auth/authSlice";

type ValueForm = {
  [NAME_FORM.USER_NAME]?: string;
  [NAME_FORM.EMAIL]?: string;
  [NAME_FORM.PASSWORD]?: string;
};

const detectLoginField = (
  value: string
): NAME_FORM.EMAIL | NAME_FORM.USER_NAME => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(value) ? NAME_FORM.EMAIL : NAME_FORM.USER_NAME;
};

const LoginForm: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { error } = useSelector((state: RootState) => state.auth);
  const [seePassword, setSeePassword] = useState<boolean>(false);
  const [valueForm, setValueForm] = useState<ValueForm>({});
  const refInputPassword = useRef<InputRef>(null);

  console.log(error);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValueForm({ ...valueForm, [e.target.name]: e.target.value });
  };

  const handleLogin = () => {
    if (!valueForm[NAME_FORM.USER_NAME] || !valueForm[NAME_FORM.PASSWORD])
      return;
    const fieldLogin = detectLoginField(valueForm[NAME_FORM.USER_NAME] ?? "");
    dispatch(
      login({
        [fieldLogin]: valueForm[NAME_FORM.USER_NAME],
        password: valueForm[NAME_FORM.PASSWORD],
      })
    );
  };

  const handelSwitchToRegister = () => {
    dispatch(switchModeRegister(true));
  };

  //MAIN RENDER
  return (
    <div className="LoginForm">
      <Icon className="userLoginAvt" iconName={"userLogin"} size={106} />
      <div className="titleLogin">Welcome to Skipli AI</div>
      <div className={"containerForm"}>
        <Input
          name={NAME_FORM.USER_NAME}
          className={"inputLogin"}
          size="large"
          placeholder="Email or User name"
          prefix={<Icon iconName="person" />}
          onChange={onChange}
        />

        <Input
          name={NAME_FORM.PASSWORD}
          ref={refInputPassword}
          className={"inputLogin"}
          size="large"
          placeholder="Password"
          prefix={<Icon iconName="lock" />}
          suffix={
            <div
              className={"iconEye"}
              onClick={() => {
                setSeePassword(!seePassword);
                setTimeout(() => {
                  const passwordLength = valueForm[NAME_FORM.PASSWORD]
                    ? valueForm[NAME_FORM.PASSWORD]?.length
                    : 0;
                  if (!refInputPassword.current) return;
                  refInputPassword.current.setSelectionRange(
                    passwordLength,
                    passwordLength
                  );
                }, 10);
              }}
            >
              {seePassword ? (
                <Icon iconName="eye" />
              ) : (
                <Icon iconName="eyeSlash" />
              )}
            </div>
          }
          type={seePassword ? "text" : "password"}
          onChange={onChange}
        />
        <div className={"forgetPassword"}>Forget Password?</div>
        <Button
          className={"buttonLogin"}
          color="primary"
          variant="solid"
          onClick={() => handleLogin()}
        >
          Login
        </Button>
        <div className={"switchRegister"}>
          <p>Don't have an account?</p>&nbsp;
          <p
            className={"textRegister"}
            onClick={() => handelSwitchToRegister()}
          >
            Register
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
