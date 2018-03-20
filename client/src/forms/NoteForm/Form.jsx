import React from "react";
import { Button, Form, Message } from "semantic-ui-react";
import { InputField, TextAreaField } from "forms/inputs";
import { validate as validation } from "validate.js";
import { Field, reduxForm } from "redux-form/immutable";

const form = props => {
  const { handleSubmit, success, submitting } = props;
  return (
    <Form
      onSubmit={handleSubmit}
      loading={submitting}
      success={success ? true : false}
    >
      <Message
        success
        header={success ? success.get("title") : ""}
        content={success ? success.get("message") : " "}
      />
      <Field
        component={InputField}
        name="title"
        label="Title"
        placeholder="Enter title ..."
      />
      <Field
        component={TextAreaField}
        name="text"
        type="textarea"
        label="Text"
        placeholder="Enter note ..."
      />
      <Button color="green" type="submit">
        Save
      </Button>
    </Form>
  );
};

const constraints = {
  title: {
    presence: {
      allowEmpty: false
    },
    length: {
      maximum: 60
    }
  },
  text: {
    presence: {
      allowEmpty: false
    }
  }
};

const validate = values => {
  return validation(values.toJS(), constraints) || {};
};

export default reduxForm({
  form: "note",
  validate
})(form);
