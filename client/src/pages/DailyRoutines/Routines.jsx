import React from "react";
import { Button, Icon, Popup, Card, Grid } from "semantic-ui-react";
import moment from "moment";

export default class extends React.Component {
  render() {
    const statusToColor = {
      processing: "yellow",
      completed: "green"
    };
    const statusToRussian = {
      completed: "Приобретена",
      processing: "В процессе приобретения"
    };
    const routinesList = this.props.routines.map((routine, index) => {
      const createdAt = routine.get("createdAt");
      const status = routine.get("status");
      const id = routine.get("id");
      const date = moment(createdAt).fromNow();
      const statusColor = statusToColor[status];
      return (
        <div className="routine col-lg-4 col-md-6 col-sm-12">
          <Card fluid key={id}>
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
                  content={statusToRussian[status]}
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


              <Button
                basic
                color="green"
                onClick={() => this.props.openRoutineModal(routine)}
              >
                Изменить
                </Button>
              <Button
                basic
                color="blue"
                onClick={() => this.props.openProgressModal(routine)}
              >
                Прогресс
                </Button>
              <Button
                basic
                color="red"
                onClick={() => this.props.openDeleteRoutineModal(id)}
              >
                Удалить
                </Button>


            </Card.Content>
          </Card>
        </div>
      );
    });
    return (
      <div className="row routines">
        {routinesList}
      </div>
    );
  }
}
