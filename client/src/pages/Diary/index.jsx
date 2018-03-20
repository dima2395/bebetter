import React from "react";
import { connect } from "react-redux";
import { getNotes, deleteNote } from "reducers/notes";
import { Segment, Grid, Icon, Button } from "semantic-ui-react";
import DailyNotes from "./DailyNotes";
import NoteFormContainer from "forms/NoteForm";
import DeleteNoteModal from "modals/DeleteNoteModal";
import NoteModal from "modals/NoteModal";
import { openModal } from "reducers/modals";

class Diary extends React.Component {
  openDeleteNoteModal = id => {
    this.props.openModal("note_delete", {
      header: "Delete note",
      content: "Are you sure you want to delete this note?",
      deleteAction: this.props.deleteNote.bind(null, id)
    });
  };

  openNoteModal = note => {
    let content = <NoteFormContainer />;
    let header = "Add note";

    if (note) {
      content = <NoteFormContainer note={note} />;
      header = "Edit note";
    }

    this.props.openModal("note_create_update", {
      content,
      header
    });
  };

  handleRefresh = () => {
    this.props.getNotes();
  };

  componentDidMount() {
    this.props.getNotes();
  }

  render() {
    const { loading, deleteLoading } = this.props;
    return (
      <div className="diary-page">
        <Grid>
          <Grid.Column width={12}>
            <Segment loading={loading} className="diary-wrapper">
              <h1>Diary</h1>
              <Button
                color="green"
                onClick={this.openNoteModal.bind(this, null)}
              >
                <Icon name="plus" />
                Add Note
              </Button>
              <Button color="blue" onClick={this.handleRefresh}>
                <Icon name="refresh" />
                Sync
              </Button>
              <div className="diary">
                <DailyNotes
                  notes={this.props.notes}
                  openDeleteNoteModal={this.openDeleteNoteModal}
                  openNoteModal={this.openNoteModal}
                />
              </div>
            </Segment>
          </Grid.Column>
        </Grid>

        <DeleteNoteModal loading={deleteLoading} />
        <NoteModal />
      </div>
    );
  }
}

function mapStateToProps(state) {
  const notes = state.get("notes");
  return {
    notes: notes.get("notes"),
    loading: notes.get("loading"),
    deleteLoading: notes.getIn(["deleteModal", "loading"])
  };
}

const mapDispatchToProps = {
  getNotes,
  deleteNote,
  openModal
};

export default connect(mapStateToProps, mapDispatchToProps)(Diary);
