import { Form, InputGroup } from "react-bootstrap";
import colors from "../../styles/colors";
import { formatCurrency } from "../../utils/currency";

const Input = ({
  label,
  name,
  type = "text",
  placeholder,
  value,
  onChange,
  required,
  error,
  readOnly = false,
}) => {
  const handleChange = (e) => {
    if (type === "currency") {
      const rawValue = e.target.value.replace(/\D/g, "");
      onChange({
        target: { name, value: rawValue },
      });
    } else {
      onChange(e);
    }
  };

  return (
    <Form.Group className="mb-3">
      {label && (
        <Form.Label
          htmlFor={name}
          style={{
            fontFamily: "Open Sans, sans-serif",
            fontWeight: 600,
            fontSize: "14px",
            lineHeight: "100%",
            color: colors.text,
          }}
        >
          {label}
        </Form.Label>
      )}

      {type === "currency" ? (
        <InputGroup>
          <InputGroup.Text
            style={{
              fontFamily: "Open Sans, sans-serif",
              fontWeight: 400,
              fontSize: "14px",
              lineHeight: "100%",
              color: colors.text,
            }}
          >
            Rp.
          </InputGroup.Text>
          <Form.Control
            id={name}
            name={name}
            type="text"
            placeholder={placeholder}
            value={value ? formatCurrency(value) : ""}
            onChange={handleChange}
            required={required}
            isInvalid={!!error}
            disabled={readOnly}
          />
          {error && (
            <Form.Control.Feedback type="invalid">
              {error}
            </Form.Control.Feedback>
          )}
        </InputGroup>
      ) : (
        <>
          <Form.Control
            id={name}
            name={name}
            type={type}
            placeholder={placeholder}
            value={value}
            onChange={handleChange}
            required={required}
            isInvalid={!!error}
            disabled={readOnly}
          />
          {error && (
            <Form.Control.Feedback type="invalid">
              {error}
            </Form.Control.Feedback>
          )}
        </>
      )}
    </Form.Group>
  );
};

export default Input;
