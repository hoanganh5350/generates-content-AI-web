/* eslint-disable react-hooks/exhaustive-deps */
import "./Input.scss";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { Eye, EyeSlash } from "react-bootstrap-icons";
import { Input as InputAnt, type InputRef } from "antd";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { useDebounce } from "../../hook/useDebounce";

interface InputProps {
  className?: string;
  name?: string;
  placeholder: string;
  value?: string;
  onChange: (value: string) => void;
  disabled?: boolean;
  type?: string;
  error?: string;
  isFocus?: (focus: boolean) => void;
  prefix?: ReactNode;
  suffix?: ReactNode;
}

const Input = (props: InputProps) => {
  const {
    className,
    name,
    placeholder,
    value,
    onChange,
    disabled,
    type,
    error,
    isFocus,
    prefix,
    suffix,
  } = props;
  const [seePassword, setSeePassword] = useState<boolean>(false);
  const refInputPassword = useRef<InputRef>(null);
  const [valueChange, setValueChange] = useState(value ?? "");
  const debouncedInput = useDebounce(valueChange, 500); // debounce sau 500ms
  const isFocusFirstTime = useRef<boolean>(false);

  useEffect(() => {
    onChange(debouncedInput);
  }, [debouncedInput]);

  const inputPhone = () => (
    <PhoneInput
      className={`phoneInputComponent ${className} ${error && "inputError"}`}
      placeholder={placeholder}
      value={valueChange}
      onChange={(e) => setValueChange(e ?? "")}
      disabled={disabled}
      onFocus={() => {
        if (!isFocusFirstTime.current) {
          isFocusFirstTime.current = true;
        }
        isFocus?.(true);
      }}
      onBlur={() => {
        if (!isFocusFirstTime.current) return;
        isFocus?.(false);
      }}
    />
  );

  const inputPassword = () => (
    <InputAnt
      name={name}
      ref={refInputPassword}
      className={`inputComponent ${className} ${error && "inputError"}`}
      size="large"
      placeholder={placeholder}
      prefix={prefix}
      suffix={
        <div
          className={"iconEye"}
          onClick={() => {
            setSeePassword(!seePassword);
            setTimeout(() => {
              const passwordLength = valueChange ? valueChange?.length : 0;
              if (!refInputPassword.current) return;
              refInputPassword.current.setSelectionRange(
                passwordLength,
                passwordLength
              );
            }, 10);
          }}
        >
          {seePassword ? <Eye /> : <EyeSlash />}
        </div>
      }
      type={seePassword ? "text" : "password"}
      onChange={(e) => setValueChange(e.target.value)}
      onFocus={() => {
        if (!isFocusFirstTime.current) {
          isFocusFirstTime.current = true;
        }
        isFocus?.(true);
      }}
      onBlur={() => {
        if (!isFocusFirstTime.current) return;
        isFocus?.(false);
      }}
    />
  );

  const mainRenderInput = () => {
    switch (type) {
      case "phone": {
        return inputPhone();
      }
      case "password": {
        return inputPassword();
      }
      default: {
        return (
          <InputAnt
            name={name}
            className={`inputComponent ${className} ${error && "inputError"}`}
            placeholder={placeholder}
            prefix={prefix}
            suffix={suffix}
            type={type}
            onChange={(e) => setValueChange(e.target.value)}
            onFocus={() => {
              if (!isFocusFirstTime.current) {
                isFocusFirstTime.current = true;
              }
              isFocus?.(true);
            }}
            onBlur={() => {
              if (!isFocusFirstTime.current) return;
              isFocus?.(false);
            }}
          />
        );
      }
    }
  };

  return (
    <div className={"containerInputCustom"}>
      {mainRenderInput()}
      {error && <div className={"errorText"}>{`* ${error}`}</div>}
    </div>
  );
};

export default Input;
