import Sidebar from "../components/Sidebar/Sidebar";
import "./MainLayout.scss";
import { ContentView, MenuLayout } from "./ConfigLayout";
import { useState } from "react";
import type { KEY_SCREENS } from "./enums";
import api from "../api/axiosClient";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../app/store";
import { clearAccessToken } from "../features/auth/authSlice";

export default function MainLayout() {
  const dispatch = useDispatch<AppDispatch>();
  const [keyScreen, setKeyScreen] = useState(MenuLayout[0].key);

  const handleLogout = async () => {
    await api.post("/auth/logout"); // Gửi req để xóa cookie ở server
    dispatch(clearAccessToken()); // Clear accessToken ở Redux
    localStorage.removeItem("loggedIn"); // Cờ khi logout
    localStorage.removeItem("phone");
  };

  return (
    <div className="layout">
      <Sidebar
        menuItems={MenuLayout}
        selectedKey={keyScreen}
        onSelect={(key: string) => setKeyScreen(key as KEY_SCREENS)}
        onLogout={() => handleLogout()}
      />
      <main className="content">
        {ContentView.find((item) => item.key === keyScreen)?.screen ?? <></>}
      </main>
    </div>
  );
}
