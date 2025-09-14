import { Button } from "react-bootstrap";
import colors from "../../styles/colors";

const CustomButton = ({
  children,
  icon,
  variant = "primary",
  style,
  ...props
}) => {
  const getButtonStyle = () => {
    if (variant === "nude") {
      return {
        backgroundColor: "transparent",
        border: "none",
        boxShadow: "none",
        borderRadius: "8px",
        color: style?.color || colors.primary,
      };
    }

    return {
      backgroundColor: colors.primary,
      borderColor: colors.primary,
      borderRadius: "8px",
      ...style,
    };
  };

  return (
    <Button
      className="d-flex align-items-center"
      style={getButtonStyle()}
      {...props}
    >
      {icon && <span className=" d-flex align-items-center">{icon}</span>}
      {children}
    </Button>
  );
};

export default CustomButton;
