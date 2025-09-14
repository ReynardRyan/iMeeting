import React from "react";
import { Form } from "react-bootstrap";

const Checkbox = ({ label, name, checked, onChange, error }) => {
  return (
    <Form.Group className="mb-2">
      <Form.Check
        type="checkbox"
        id={name}
        name={name}
        label={label}
        checked={checked}
        onChange={onChange}
        isInvalid={!!error}
      />
      {error && (
        <Form.Control.Feedback type="invalid" className="d-block">
          {error}
        </Form.Control.Feedback>
      )}
    </Form.Group>
  );
};

export default Checkbox;
