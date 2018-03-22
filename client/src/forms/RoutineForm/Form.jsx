import React from "react";
import { Button, Form, Message } from "semantic-ui-react";
import { InputField, SelectField } from "../inputs";
import { validate as validation } from "validate.js";
import { Field, reduxForm } from "redux-form/immutable";
import Immutable from "immutable";
const form = props => {
  const { handleSubmit, success, submitting } = props;
  const routinesStatuses = [
    {
      key: "completed",
      value: "completed",
      text: "Completed",
      icon: {
        name: "circle",
        color: "green"
      }
    },
    {
      key: "processing",
      value: "processing",
      text: "Processing",
      icon: {
        name: "circle",
        color: "yellow"
      }
    }
  ];
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
        name="text"
        label="Text"
        placeholder="Enter text ..."
      />
      <Field
        component={SelectField}
        name="status"
        label="Status"
        placeholder="Status"
        options={routinesStatuses}
      />
      <Button color="green" type="submit">
        Save
      </Button>
    </Form>
  );
};

const constraints = {
  text: {
    presence: {
      allowEmpty: false
    },
    length: {
      maximum: 100
    }
  }
};

const validate = values => {
  console.log(values);
  return validation(values.toJS(), constraints) || {};
};

export default reduxForm({
  form: "routine",
  initialValues: Immutable.fromJS({
    status: "processing"
  }),
  validate
})(form);
