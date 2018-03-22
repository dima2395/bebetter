import React from "react";
import { connect } from "react-redux";
import { Grid } from "semantic-ui-react";
import { createNote, updateNote, resetNoteFormMessage } from "reducers/notes";
import Form from "./Form";
import { reset } from "redux-form";

class FormContainer extends React.Component {
  componentDidMount() {
    this.props.resetNoteFormMessage();
  }

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
  updateNote,
  resetNoteFormMessage,
  resetForm: reset
};

export default connect(mapStateToProps, mapDispatchToProps)(FormContainer);
