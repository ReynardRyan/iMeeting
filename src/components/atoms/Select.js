import { Form } from "react-bootstrap";
import colors from "../../styles/colors";

const Select = ({ label, name, options, value, onChange, error }) => {
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
      <Form.Select
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        isInvalid={!!error}
      >
        <option value="">Pilih {label}</option>
        {options.map((opt, index) => (
          <option key={index} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </Form.Select>
      {error && (
        <Form.Control.Feedback type="invalid" className="d-block">
          {error}
        </Form.Control.Feedback>
      )}
    </Form.Group>
  );
};

export default Select;
