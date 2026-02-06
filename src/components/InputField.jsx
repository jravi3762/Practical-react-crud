import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";

const InputField = ({
  label,
  type = "text",
  name,
  placeholder,
  register,
  rules,
  error,
  className = "",
}) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="form_group">
      {label && <label htmlFor={name}>{label}</label>}

      <input
        id={name}
        type={type === "password" && showPassword ? "text" : type}
        placeholder={placeholder}
        {...register(name, rules)}
        className={`form_control ${className}`}
      />

      {type === "password" && (
        <span className="toggle_password" onClick={() => setShowPassword(!showPassword)}>
          {showPassword ?  <Eye /> : <EyeOff />}
        </span>
      )}

      {error && <span className="error_msg">{error}</span>}
    </div>
  );
};

export default InputField;
