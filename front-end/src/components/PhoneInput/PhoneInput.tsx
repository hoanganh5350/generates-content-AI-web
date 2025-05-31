import "./PhoneInput.scss";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";

interface InputMobileProps {
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
}

const InputMobile = (props: InputMobileProps) => {
  const { placeholder, value, onChange, disabled } = props;

  return (
    <PhoneInput
      className="PhoneInputCustom"
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange(e ?? "")}
      disabled={disabled}
    />
  );
};

export default InputMobile;
