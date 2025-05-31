import { useState } from "react";
import { Modal, List } from "antd";
import { DownOutlined, UpOutlined } from "@ant-design/icons";
import "./ModalSelect.scss";

interface Option {
  label: string;
  value: string;
}

interface ModalSelectProps {
  value?: string;
  options: Option[];
  placeholder?: string;
  onChange?: (value: string) => void;
}

export default function ModalSelect({
  value,
  options,
  placeholder = "Choose...",
  onChange,
}: ModalSelectProps) {
  const [open, setOpen] = useState(false);
  const selected = options.find((o) => o.value === value);

  const handleSelect = (val: string) => {
    onChange?.(val);
    setOpen(false);
  };

  return (
    <>
      <div className="ModalSelectTrigger" onClick={() => setOpen(true)}>
        <span>{selected?.label || placeholder}</span>
        {open ? (
          <UpOutlined className="IconArrow" />
        ) : (
          <DownOutlined className="IconArrow" />
        )}
      </div>

      <Modal
        open={open}
        onCancel={() => setOpen(false)}
        footer={null}
        title="What should your caption sound like?"
      >
        <List
          dataSource={options}
          renderItem={(item) => (
            <List.Item
              className="ItemModalSelect"
              onClick={() => handleSelect(item.value)}
              style={{
                cursor: "pointer",
                background: item.value === value ? "#e6f7ff" : "transparent",
              }}
            >
              {item.label}
            </List.Item>
          )}
        />
      </Modal>
    </>
  );
}
