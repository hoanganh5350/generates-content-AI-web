import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { post } from "../../api/http";

interface AuthState {
  phone: string | null;
  otpSent: boolean;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  phone: localStorage.getItem("phone") || null,
  otpSent: false,
  loading: false,
  error: null,
};

export const requestOTP = createAsyncThunk(
  "auth/requestOTP",
  async (phone: string) => {
    const response = await post<{ accessCode: string }>("/auth/create-code", {
      phoneNumber: phone,
    });
    if (!response.accessCode) throw new Error("Gửi OTP thất bại");
    return phone;
  }
);

export const verifyOTP = createAsyncThunk(
  "auth/verifyOTP",
  async ({ phone, otp }: { phone: string; otp: string }) => {
    //TODO: Fake API verify
    const response = await post<{ success: boolean }>("/auth/validate-code", {
      phoneNumber: phone,
      accessCode: otp,
    });
    if (!response?.success || !response) throw new Error("OTP không đúng");
    localStorage.setItem("phone", phone);
    return phone;
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      localStorage.removeItem("phone");
      state.phone = null;
      state.otpSent = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
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
        state.error = action.error.message || "Gửi OTP thất bại";
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
      })
      .addCase(verifyOTP.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Xác minh OTP thất bại";
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
