import React from "react";
import { connect } from "react-redux";
import { createRoutine, updateRoutine } from "reducers/routines";
import Form from "./Form";

class FormContainer extends React.Component {
  submit = values => {
    const { routine } = this.props;
    const data = values.toJS();

    if (routine) {
      this.props.updateRoutine(routine.get("id"), data);
    } else {
      this.props.createRoutine(data);
    }
  };

  render() {
    const { success, routine } = this.props;
    return (
      <Form onSubmit={this.submit} initialValues={routine} {...{ success }} />
    );
  }
}

function mapStateToProps(state) {
  const routines = state.get("routines");
  return {
    success: routines.getIn(["form", "success"])
  };
}

const mapDispatchToProps = {
  createRoutine,
  updateRoutine
};

export default connect(mapStateToProps, mapDispatchToProps)(FormContainer);
