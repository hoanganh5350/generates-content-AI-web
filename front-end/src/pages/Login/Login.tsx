import React, { useCallback } from "react";
import { useSelector } from "react-redux";
import type { RootState } from "../../app/store";
import "./Login.scss";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
import { MODE_LOGIN } from "../../features/auth/type";
import ForgetPasswordForm from "./ForgetPasswordForm";

const Login: React.FC = () => {
  const { modeLogin } = useSelector((state: RootState) => state.auth);
  const renderModeLoginForm = useCallback(() => {
    switch (modeLogin) {
      case MODE_LOGIN.REGISTER: {
        return <RegisterForm />;
      }
      case MODE_LOGIN.FORGET_PASSWORD: {
        return <ForgetPasswordForm />;
      }
      default: {
        return <LoginForm />;
      }
    }
  }, [modeLogin]);

  return <div className="LoginView">{renderModeLoginForm()}</div>;
};

export default Login;
