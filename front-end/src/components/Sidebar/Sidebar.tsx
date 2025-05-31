import Icon from "../Icon/Icon";
import "./Sidebar.scss";

type MenuItems = {
  key: string;
  icon: string;
  label: string;
};

interface SidebarProps {
  menuItems: MenuItems[];
  selectedKey: string;
  onSelect: (key: string) => void;
}

const Sidebar = (props: SidebarProps) => {
  const { menuItems, selectedKey, onSelect } = props;
  const handleSelect = (key: string) => {
    onSelect(key);
  };

  return (
    <div className="sidebar">
      <div className="logo">Skipli AI</div>
      <nav className='menu'>
        {menuItems.map((el: MenuItems, idx: number) => (
          <div
            key={`${el.key}${idx}`}
            className={`link ${selectedKey === el.key && "hyperLink"}`}
            onClick={() => handleSelect(el.key)}
          >
            <Icon iconName={el.icon} size={19}/>
            <div>{el.label}</div>
          </div>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;
