/* eslint-disable react-hooks/exhaustive-deps */
import { Routes, Route } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import Login from "./pages/Login/Login";
import { useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "./app/store";
import {
  clearAccessToken,
  setAccessToken,
} from "./features/auth/authSlice";
import { useEffect } from "react";
import api from "./api/axiosClient";

function App() {
  const dispatch = useDispatch<AppDispatch>();
  const { accessToken } = useSelector((state: RootState) => state.auth);
  const init = async () => {
    if (localStorage.getItem('loggedIn') !== 'true') return;
    try {
      const res = await api.post("/auth/refresh-token");
      if (res.data?.accessToken) {
        dispatch(setAccessToken(res.data.accessToken));
      }
    } catch {
      console.log("No refresh token, please login.");
      dispatch(clearAccessToken());
    }
  };
  // Gọi refresh-token khi khởi động app (lần đầu load trang)
  useEffect(() => {
    init();
  }, []);

  useEffect(() => {
    if (!accessToken) return;
    const timer = setInterval(() => {
      init();
    }, 60000);
    return () => clearInterval(timer);
  }, [accessToken]);

  if (!accessToken) return <Login />;

  return (
    <Routes>
      <Route
        path="/"
        element={<MainLayout />}
      ></Route>
    </Routes>
  );
}

export default App;
