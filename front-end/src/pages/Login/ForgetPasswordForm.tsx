/* eslint-disable react-hooks/exhaustive-deps */
import "./Login.scss";
import React, { useCallback, useState } from "react";
import Icon from "../../components/Icon/Icon";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../app/store";
import { isLoading } from "../../features/auth/authSlice";
import { post } from "../../api/http";
import { STEP_FORGET_PASSWORD } from "./type";
import VerifyOTP from "./VerifyOTP";
import ChangedPasswordForm from "./ChangedPasswordForm";
import Input from "../../components/Input/Input";
import { showNotification } from "../helper";

const ForgetPasswordForm: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { error, loading } = useSelector((state: RootState) => state.auth);
  const [stepForgetPassword, setStepForgetPassword] =
    useState<STEP_FORGET_PASSWORD>(STEP_FORGET_PASSWORD.ENTER_PHONE);
  const [inputPhone, setInputPhone] = useState("");
  const [dataUser, setDataUser] = useState<Record<string, string>>();
  const handleRequestOTP = async () => {
    dispatch(isLoading(true));
    try {
      const res = await post<{
        success: boolean;
        status?: string;
        error?: string;
        code?: string;
        dataUser?: Record<string, string>;
      }>("/auth/create-code", {
        phoneNumber: inputPhone,
        isHasSigned: true,
      });
      if (res.success && res.dataUser) {
        setDataUser(res.dataUser);
        setStepForgetPassword(STEP_FORGET_PASSWORD.OTP_SEND);
      }
    } catch (err) {
      console.log(err);
      showNotification(
        "error",
        "Phone number does not exist or is not registered!"
      );
    } finally {
      dispatch(isLoading(false));
    }
  };

  const renderStepForgetPassword = useCallback(() => {
    switch (stepForgetPassword) {
      case STEP_FORGET_PASSWORD.OTP_SEND: {
        return (
          <VerifyOTP
            phone={inputPhone}
            isVerified={() =>
              setStepForgetPassword(STEP_FORGET_PASSWORD.CHANGE_PASSWORD)
            }
            userName={dataUser?.userName ?? ""}
          />
        );
      }
      case STEP_FORGET_PASSWORD.CHANGE_PASSWORD: {
        return (
          <ChangedPasswordForm
            idUser={dataUser?.id ?? ""}
            userName={dataUser?.userName ?? ""}
          />
        );
      }
      default: {
        return (
          <div className="Form">
            <div className="contentFormForgetPassword">
              <div className="headerForgetPassword">
                Enter registered phone number.
              </div>
              <div className="contentForgetPassword">
                We will send you a verification code before you can reset your
                account password.
              </div>
            </div>
            <div className="InputAndError">
              <Input
                className={"inputPhoneForgetpassword"}
                placeholder="Enter your phone"
                type={"phone"}
                onChange={(e) => setInputPhone(e ?? "")}
                disabled={loading}
              />
              {error && <p style={{ color: "red" }}>{error}</p>}
            </div>
            <button
              className="ButtonForm"
              onClick={handleRequestOTP}
              disabled={loading}
            >
              {loading ? "Sending..." : "Send Verification Code"}
            </button>
          </div>
        );
      }
    }
  }, [error, inputPhone, loading, stepForgetPassword, dataUser]);

  //MAIN RENDER
  return (
    <div className="LoginForm">
      <Icon className="userLoginAvt" iconName={"userLogin"} size={106} />
      {renderStepForgetPassword()}
    </div>
  );
};

export default ForgetPasswordForm;
