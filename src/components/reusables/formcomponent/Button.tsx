import React, { MouseEvent } from "react";

interface ButtonProps {
  variant?: "primary" | "secondary" | "with_border";
  logo?:string;
  disabled?: boolean;
  buttonLabel?: string;
  loading?: boolean;
  dataCy?: string;
  className?: string;
  buttonStyle?: React.CSSProperties;
  onClick?: () => void;
}

const Button: React.FC<ButtonProps> = ({
  variant = "primary",
  disabled = false,
  buttonLabel = "",
  loading = false,
  dataCy = "",
  className = "",
  buttonStyle = {},
  onClick,
  logo,
}) => {
  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    if (!disabled && onClick) {
      onClick();
    }
  };

  const classes = `button ${variant} ${disabled ? "disabled" : ""} ${className}`;

  return (
    <button
      style={buttonStyle}
      className={`flex items-center justify-center gap-1 ${classes}`}
      onClick={handleClick}
      disabled={disabled}
      data-cy={dataCy}
    >
      {loading && <Loader />}
      {logo && <img className="mr-1" src={logo} alt={logo} />}
      {buttonLabel}
    </button>
  );
};

// Rest of the component remains the same...

const Loader: React.FC = () => {
  // Implement your loader component or replace it with your actual Loader component
  return <div>Loading...</div>;
};

export default Button;
