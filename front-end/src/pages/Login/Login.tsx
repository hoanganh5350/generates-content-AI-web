import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "../../app/store";
import { requestOTP, verifyOTP } from "../../features/auth/authSlice";
import InputMobile from "../../components/PhoneInput/PhoneInput";
import "./Login.scss";
import Icon from "../../components/Icon/Icon";

const Login: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { phone, loading, error, otpSent } = useSelector(
    (state: RootState) => state.auth
  );
  const [inputPhone, setInputPhone] = useState("");
  const [otp, setOtp] = useState("");

  const handleSendOTP = () => {
    dispatch(requestOTP(inputPhone));
  };

  const handleVerifyOTP = () => {
    dispatch(verifyOTP({ phone: inputPhone, otp }));
  };

  if (phone) {
    return null;
  }

  const renderTypingPhone = () => (
    <div className="Form">
      <div className="ContentForm">
        Enter a mobile phone number that you have access to. <br /> This number
        will be use to login to SkipliAI.
      </div>
      <div className="InputAndError">
        <InputMobile
          placeholder="Enter your phone"
          value={inputPhone}
          onChange={(e) => setInputPhone(e ?? "")}
          disabled={loading || otpSent}
        />
        {error && <p style={{ color: "red" }}>{error}</p>}
      </div>
      <button className="ButtonForm" onClick={handleSendOTP} disabled={loading}>
        {loading ? "Sending..." : "Send Verification Code"}
      </button>
    </div>
  );

  const renderVerifyOtp = () => (
    <div className="Form">
      <div className="ContentForm">
        SkipliAI has sent an OTP code to: {inputPhone}
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
        onClick={handleVerifyOTP}
        disabled={loading}
      >
        {loading ? "Submiting..." : "Submit"}
      </button>
    </div>
  );

  return (
    <div className="LoginView">
      <div className="LoginForm">
        <Icon className="userLoginAvt" iconName={"userLogin"} size={106} />
        <div className="titleLogin">Welcome to Skipli AI</div>
        {!otpSent ? renderTypingPhone() : renderVerifyOtp()}
      </div>
    </div>
  );
};

export default Login;
