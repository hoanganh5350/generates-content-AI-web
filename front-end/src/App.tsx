import { Routes, Route } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import Login from "./pages/Login/Login";
import { useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "./app/store";
import { logout } from "./features/auth/authSlice";
// import api, { setAccessToken } from "./api/axiosClient"; 

function App() {
  const dispatch = useDispatch<AppDispatch>();
  const { phone } = useSelector((state: RootState) => state.auth);

  if (!phone) return <Login />;

  return (
    <Routes>
      <Route
        path="/"
        element={<MainLayout onLogout={() => dispatch(logout())} />}
      ></Route>
    </Routes>
  );
}

export default App;
