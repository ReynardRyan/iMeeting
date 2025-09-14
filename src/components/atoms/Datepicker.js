import React, { useRef } from "react";
import { InputGroup, Form } from "react-bootstrap";
import { CiCalendar } from "react-icons/ci";
import colors from "../../styles/colors";

const CustomDatepicker = ({ label, name, value, onChange, error, min }) => {
  const inputRef = useRef(null);

  const handleIconClick = () => {
    if (inputRef.current) {
      inputRef.current.showPicker?.();
      inputRef.current.focus();
    }
  };

  return (
    <Form.Group>
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

      <InputGroup>
        <InputGroup.Text
          onClick={handleIconClick}
          style={{
            backgroundColor: colors.background,
            borderRight: "none",
            cursor: "pointer",
          }}
        >
          <CiCalendar color={colors.primary} />
        </InputGroup.Text>

        <Form.Control
          id={name}
          name={name}
          type="date"
          value={value || ""}
          onChange={onChange}
          min={min}
          ref={inputRef}
          className={`form-control ${
            error ? "is-invalid" : ""
          } no-calendar-icon`}
          style={{
            borderLeft: "none",
            backgroundColor: colors.background,
          }}
        />

        {error && (
          <Form.Control.Feedback type="invalid">{error}</Form.Control.Feedback>
        )}
      </InputGroup>
    </Form.Group>
  );
};

export default CustomDatepicker;
