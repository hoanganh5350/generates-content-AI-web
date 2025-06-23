import "./Login.scss";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../app/store";
import { isLoading } from "../../features/auth/authSlice";
import { post } from "../../api/http";
import Input from "../../components/Input/Input";

interface VerifyOTPType {
  phone: string;
  userName?: string;
  onSubmiting?: () => Promise<void>;
  isVerified?: () => void;
}

const VerifyOTP = (props: VerifyOTPType) => {
  const dispatch = useDispatch<AppDispatch>();
  const { phone, userName, onSubmiting, isVerified } = props;
  const { error, loading } = useSelector((state: RootState) => state.auth);
  const [otp, setOtp] = useState("");

  const handleRegisterToVerifyPhone = async () => {
    dispatch(isLoading(true));
    try {
      const respon = await post<{
        success: boolean;
        message?: string;
        error?: string;
      }>("/auth/validate-code", {
        phoneNumber: phone,
        accessCode: otp,
      });
      if (respon.success) {
        await onSubmiting?.();
        isVerified?.();
      }
    } catch (err) {
      console.log(err);
    } finally {
      dispatch(isLoading(false));
    }
  };

  //MAIN RENDER
  return (
    <div className="Form">
      <div className="contentFormForgetPassword">
        {userName && (
          <div className="headerForgetPassword">Hello, {userName}</div>
        )}
        <div className="contentForgetPassword">
          SkipliAI has sent an OTP code to: {phone}
        </div>
      </div>
      <div className="InputAndError">
        <Input
          className={'inputPhoneForgetpassword'}
          type="text"
          placeholder="Enter your code here"
          value={otp}
          onChange={(e) => setOtp(e)}
          disabled={loading}
        />
        {error && <p style={{ color: "red" }}>{error}</p>}
      </div>
      <button
        className="ButtonForm"
        onClick={() => handleRegisterToVerifyPhone()}
        disabled={loading}
      >
        {loading ? "Submiting..." : "Submit"}
      </button>
    </div>
  );
};

export default VerifyOTP;
