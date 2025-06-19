import React from "react";
import { useSelector } from "react-redux";
import type { RootState } from "../../app/store";
import "./Login.scss";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";

const Login: React.FC = () => {
  const { isRegister } = useSelector((state: RootState) => state.auth);

  return (
    <div className="LoginView">
      {!isRegister ? <LoginForm /> : <RegisterForm />}
    </div>
  );
};

export default Login;
