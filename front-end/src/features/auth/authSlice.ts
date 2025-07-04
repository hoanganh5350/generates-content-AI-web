import {
  createSlice,
  createAsyncThunk,
  type PayloadAction,
} from "@reduxjs/toolkit";
import { post } from "../../api/http";
import { MODE_LOGIN } from "./type";
import { showNotification } from "../../pages/helper";

interface AuthState {
  accessToken: string | null;
  modeLogin: MODE_LOGIN;
  phone: string | null;
  otpSent: boolean;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  accessToken: null,
  modeLogin: MODE_LOGIN.LOGIN,
  phone: localStorage.getItem("phone") || null,
  otpSent: false,
  loading: false,
  error: null,
};

export const requestOTP = createAsyncThunk(
  "auth/requestOTP",
  async (phone: string) => {
    const response = await post<{
      success: boolean;
      status?: string;
      error?: string;
      code?: string;
    }>("/auth/create-code", {
      phoneNumber: phone,
    });
    if (!response.success || response.error) throw new Error(response.error);
    return phone;
  }
);

export const verifyOTP = createAsyncThunk(
  "auth/verifyOTP",
  async ({ phone, otp }: { phone: string; otp: string }) => {
    const response = await post<{
      success: boolean;
      message?: string;
      error?: string;
    }>("/auth/validate-code", {
      phoneNumber: phone,
      accessCode: otp,
    });
    if (!response || !response.success || response.error)
      throw new Error(
        response.error ?? response.message ?? "Phone verifY failed !"
      );
    localStorage.setItem("phone", phone);
    return phone;
  }
);

export const register = createAsyncThunk(
  "auth/register",
  async (bodyRegister: {
    userName: string;
    email: string;
    phone: string;
    password: string;
  }) => {
    const response = await post<{
      success: string;
      message?: string;
    }>("/auth/register", bodyRegister);
    if (!response.success) throw new Error(response.message ?? "Loi sever");
    return response.success;
  }
);

export const login = createAsyncThunk(
  "auth/login",
  async (bodyLogin: {
    userName?: string;
    email?: string;
    phone?: string;
    password: string;
  }) => {
    const response = await post<{
      accessToken: string;
      phone?: string;
      message?: string;
    }>("/auth/login", bodyLogin);
    if (!response.accessToken) throw new Error("Invalid account or password");
    localStorage.setItem("loggedIn", "true");
    if (response?.phone) localStorage.setItem("phone", response?.phone);
    return response.accessToken;
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    registerAction: (state) => {
      state.modeLogin = MODE_LOGIN.REGISTER;
    },
    setAccessToken(state, action: PayloadAction<string>) {
      state.accessToken = action.payload;
    },
    clearAccessToken(state) {
      state.accessToken = null;
    },
    switchModeLogin(state, action: PayloadAction<MODE_LOGIN>) {
      state.modeLogin = action.payload;
    },
    isLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // Xử lý case register
      .addCase(register.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(register.fulfilled, (state) => {
        state.loading = false;
        state.modeLogin = MODE_LOGIN.LOGIN;
        state.otpSent = false;
        showNotification("success", "Registration successful, please login!");
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false;
        state.modeLogin = MODE_LOGIN.REGISTER;
        state.otpSent = false;
        state.error = action.error.message || "Register failed!";
        showNotification("error", action.error.message || "Register failed!");
      })
      // Xử lý case login
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action: PayloadAction<string>) => {
        state.accessToken = action.payload;
        state.loading = false;
        showNotification("success", "Log in successfully!");
      })
      .addCase(login.rejected, (state) => {
        state.loading = false;
        state.error = "Invalid account or password";
        showNotification("error", "Invalid account or password");
      })
      // Xử lý case khi nhập sđt để lấy otp
      .addCase(requestOTP.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(requestOTP.fulfilled, (state) => {
        state.loading = false;
        state.otpSent = true;
      })
      .addCase(requestOTP.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "OTP sending failed";
      })
      // Xử lysc case xác minh otp với sdt
      .addCase(verifyOTP.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(verifyOTP.fulfilled, (state, action) => {
        state.loading = false;
        state.phone = action.payload;
        state.otpSent = false;
        state.modeLogin = MODE_LOGIN.LOGIN;
      })
      .addCase(verifyOTP.rejected, (state, action) => {
        state.loading = false;
        state.otpSent = false;
        state.error = action.error.message || "OTP verification failed";
      });
  },
});

export const {
  registerAction,
  setAccessToken,
  clearAccessToken,
  switchModeLogin,
  isLoading,
} = authSlice.actions;
export default authSlice.reducer;
