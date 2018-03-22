import React from "react";
import { Button, Icon, Popup, Card } from "semantic-ui-react";
import moment from "moment";

export default class extends React.Component {
  render() {
    const statusToColor = {
      processing: "yellow",
      completed: "green"
    };
    const routinesList = this.props.routines.map((routine, index) => {
      const createdAt = routine.get("createdAt");
      const status = routine.get("status");
      const id = routine.get("id");
      const date = moment(createdAt).fromNow();
      const statusColor = statusToColor[status];
      return (
        <Card key={id} className="routine">
          <Card.Content>
            <Card.Header>
              {routine.get("text")}
              <Popup
                trigger={
                  <Icon
                    name="circle"
                    color={statusColor}
                    className="routine-status"
                  />
                }
                content={status}
                inverted
                position="bottom center"
              />
            </Card.Header>
            <Card.Meta>
              <Popup
                trigger={<time dateTime={createdAt}>{date}</time>}
                content={moment(createdAt).format("DD MMM YYYY HH:mm")}
                inverted
                position="bottom left"
              />
            </Card.Meta>
            <Card.Description />
          </Card.Content>
          <Card.Content extra>
            <div className="ui two buttons">
              <Button.Group fluid>
                <Button
                  basic
                  color="green"
                  onClick={() => this.props.openRoutineModal(routine)}
                >
                  Edit
                </Button>
                <Button
                  basic
                  color="blue"
                  onClick={() => this.props.openProgressModal(routine)}
                >
                  Progress
                </Button>
                <Button
                  basic
                  color="red"
                  onClick={() => this.props.openDeleteRoutineModal(id)}
                >
                  Delete
                </Button>
              </Button.Group>
            </div>
          </Card.Content>
        </Card>
      );
    });
    return (
      <div className="routines">
        <Card.Group itemsPerRow={4}>{routinesList}</Card.Group>
      </div>
    );
  }
}
