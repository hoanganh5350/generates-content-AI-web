import "./Login.scss";
import React, { useState } from "react";
import { Button } from "antd/lib";
import { NAME_FORM } from "./type";
import Icon from "../../components/Icon/Icon";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../../app/store";
import { login, switchModeLogin } from "../../features/auth/authSlice";
import { MODE_LOGIN } from "../../features/auth/type";
import Input from "../../components/Input/Input";

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
  const [valueForm, setValueForm] = useState<ValueForm>({});

  const onChange = ( name: string , e: string) => {
    setValueForm({ ...valueForm, [name]: e });
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
    dispatch(switchModeLogin(MODE_LOGIN.REGISTER));
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
          placeholder="Email or User name"
          prefix={<Icon iconName="person" />}
          onChange={(e) => onChange(NAME_FORM.USER_NAME, e)}
        />

        <Input
          name={NAME_FORM.PASSWORD}
          className={"inputLogin"}
          placeholder="Password"
          prefix={<Icon iconName="lock" />}
          type={"password"}
          onChange={(e) => onChange(NAME_FORM.PASSWORD, e)}
        />
        <div
          className={"forgetPassword"}
          onClick={() => dispatch(switchModeLogin(MODE_LOGIN.FORGET_PASSWORD))}
        >
          Forget Password?
        </div>
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
