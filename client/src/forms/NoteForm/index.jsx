import React from "react";
import { connect } from "react-redux";
import { createNote, updateNote } from "reducers/notes";
import Form from "./Form";

class FormContainer extends React.Component {
  submit = values => {
    const { note } = this.props;
    const data = values.toJS();

    if (note) {
      this.props.updateNote(note.get("id"), data);
    } else {
      this.props.createNote(data);
    }
  };

  render() {
    const { success, note } = this.props;
    return (
      <Form onSubmit={this.submit} initialValues={note} {...{ success }} />
    );
  }
}

function mapStateToProps(state) {
  const notes = state.get("notes");
  return {
    success: notes.getIn(["form", "success"])
  };
}

const mapDispatchToProps = {
  createNote,
  updateNote
};

export default connect(mapStateToProps, mapDispatchToProps)(FormContainer);
