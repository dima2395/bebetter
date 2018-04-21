import React from "react";
import moment from "libs/moment";
import { Icon, Card } from "semantic-ui-react";

class DailyNotes extends React.Component {
  modifyNotes(notes) {
    let dateToIndex = {}; // maps note date to modified_notes's index
    let modifiedNotes = [];

    notes.forEach(note => {
      var date = note.get("createdAt").split("T")[0];
      if (dateToIndex[date]) {
        const index = dateToIndex[date];
        modifiedNotes[index].push(note);
      } else {
        // convert index to string because 0 is falsy, but "0" is not falsy
        dateToIndex[date] = modifiedNotes.length + "";
        const index = dateToIndex[date];
        modifiedNotes[index] = [note];
      }
    });
    return modifiedNotes;
  }

  renderNotes(notes) {
    return notes.map(note => {
      const title = note.get("title");
      const text = note.get("text");
      const id = note.get("id");
      const createdAt = note.get("createdAt");
      return (
        <div className="note" key={id}>
          <span className="time">{moment(createdAt).format("H:mm")}</span>
          <Card fluid raised>
            <Card.Content>
              <Card.Header as="h2">
                {title}
                <span className="actions">
                  <Icon
                    name="pencil"
                    color="yellow"
                    onClick={() => this.props.openNoteModal(note)}
                  />
                  <Icon
                    name="delete"
                    color="red"
                    onClick={() => this.props.openDeleteNoteModal(id)}
                  />
                </span>
              </Card.Header>
              <Card.Description className="text">
                <p>{text}</p>
              </Card.Description>
            </Card.Content>
          </Card>
        </div>
      );
    });
  }

  render() {
    const modifiedNotes = this.modifyNotes(this.props.notes);
    return modifiedNotes.map((notes, i) => {
      var date = moment(notes[0].get("createdAt")).format("DD MMMM");
      return (
        <div className="day" key={date}>
          <span className="date">{date}</span>
          <div className="notes">{this.renderNotes(notes)}</div>
        </div>
      );
    });
  }
}

export default DailyNotes;
