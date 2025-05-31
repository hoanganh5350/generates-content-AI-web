import Sidebar from "../components/Sidebar/Sidebar";
import "./MainLayout.scss";
import { ContentView, MenuLayout } from "./ConfigLayout";
import { useState } from "react";
import type { KEY_SCREENS } from "./enums";

interface MainLayoutProps {
  onLogout?: () => void;
}

export default function MainLayout(props: MainLayoutProps) {
  const { onLogout } = props;
  const [keyScreen, setKeyScreen] = useState(MenuLayout[0].key);

  return (
    <div className="layout">
      <Sidebar
        menuItems={MenuLayout}
        selectedKey={keyScreen}
        onSelect={(key: string) => setKeyScreen(key as KEY_SCREENS)}
        onLogout={() => onLogout && onLogout()}
      />
      <main className="content">
        {ContentView.find((item) => item.key === keyScreen)?.screen ?? <></>}
      </main>
    </div>
  );
}
