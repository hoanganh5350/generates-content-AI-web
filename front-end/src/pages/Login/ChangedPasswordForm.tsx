import "./Login.scss";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../app/store";
import { isLoading, switchModeLogin } from "../../features/auth/authSlice";
import { post } from "../../api/http";
import Input from "../../components/Input/Input";
import { Lock } from "react-bootstrap-icons";
import { MODE_LOGIN } from "../../features/auth/type";
import { showNotification } from "../helper";

interface ChangedPasswordFormType {
  idUser: string;
  userName?: string;
  onSubmiting?: () => Promise<void>;
  isChangedPassword?: () => void;
}

interface ValuesFormChangedPassword {
  password: string;
  rePassword: string;
}

const ChangedPasswordForm = (props: ChangedPasswordFormType) => {
  const dispatch = useDispatch<AppDispatch>();
  const { idUser, userName } = props;
  const { loading } = useSelector((state: RootState) => state.auth);
  const [values, setValues] = useState<ValuesFormChangedPassword>({
    password: "",
    rePassword: "",
  });
  const [error, setError] = useState<string>("");

  const handelSubmitChangedPassword = async () => {
    if (!values.password || !values.rePassword) {
      setError(
        "Fill in the new password field and the re-enter password field."
      );
      return;
    }
    if (values.password !== values.rePassword) {
      setError("Password does not match.");
      return;
    }

    if (values.password.length < 6 || values.rePassword.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }
    dispatch(isLoading(true));
    try {
      const res = await post<{ success: boolean }>("/auth/changed-password", {
        userId: idUser,
        newPassword: values.password,
      });
      if (res.success) {
        showNotification(
          "success",
          "Password changed successfully, please sign in!"
        );
        dispatch(switchModeLogin(MODE_LOGIN.LOGIN));
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
          Enter a new password for your account.
        </div>
      </div>
      <div className="InputAndError">
        {error && <div className={"errorText"}>{`* ${error}`}</div>}
        <Input
          name={"New password"}
          className={"inputLogin"}
          placeholder={"Enter new password"}
          prefix={<Lock size={20} />}
          type={"password"}
          onChange={(e) => {
            setValues({ ...values, password: e });
          }}
          error={Boolean(error)}
        />
        <Input
          name={"rePassword"}
          className={"inputLogin"}
          placeholder={"Re-enter password"}
          prefix={<Lock size={20} />}
          type={"password"}
          onChange={(e) => {
            setValues({ ...values, rePassword: e });
          }}
          error={Boolean(error)}
        />
      </div>
      <button
        className="ButtonSubmit"
        onClick={() => handelSubmitChangedPassword()}
        disabled={loading}
      >
        {loading ? "Submiting..." : "Submit"}
      </button>
    </div>
  );
};

export default ChangedPasswordForm;
