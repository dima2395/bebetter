import React from "react";
import { updateRoutineProgress } from "reducers/routines";
import { connect } from "react-redux";
import Immutable from "immutable";
import { Icon, Popup, Segment } from "semantic-ui-react";
import ProgressStats from "./ProgressStats";
import moment from "libs/moment";

class Progress extends React.Component {
  state = {
    routine_id: this.props.routine.get("id") || null
  };

  handleChangeStatus(day, toggleValue) {
    const routine_id = this.state.routine_id;
    this.props.updateRoutineProgress(routine_id, {
      day,
      done: toggleValue
    });
  }

  renderProgress() {
    const start = moment(this.props.routine.get("createdAt"), "YYYY-MM-DD");
    const end = moment(Date.now()).format("YYYY-MM-DD");
    const days = Array.from(moment.range(start, end).reverseBy("day"));
    const statuses = {
      done: {
        icon: "check",
        color: "green",
        popup: "Выполнено",
        key: "done",
        toggleValue: false
      },
      failed: {
        icon: "delete",
        color: "red",
        popup: "Не выполнено",
        key: "failed",
        toggleValue: true
      },
      not_indicated: {
        icon: "minus",
        color: "yellow",
        popup: "Не указано",
        key: "not_indicated",
        toggleValue: true
      }
    };

    let mapDateToStatus = Immutable.OrderedMap();
    days.forEach(day => {
      const key = day.format("YYYY-MM-DD");
      const value = statuses["not_indicated"];
      mapDateToStatus = mapDateToStatus.set(key, value);
    });

    this.props.routine.get("progress").forEach(daily_progress => {
      if (daily_progress.get("done") === true) {
        mapDateToStatus = mapDateToStatus.set(
          daily_progress.get("day"),
          statuses["done"]
        );
      } else {
        mapDateToStatus = mapDateToStatus.set(
          daily_progress.get("day"),
          statuses["failed"]
        );
      }
    });

    const stats = {
      done: 0,
      failed: 0,
      not_indicated: 0,
      all: mapDateToStatus.size
    };

    let progress = Immutable.List([]);

    mapDateToStatus.forEach((status, day) => {
      stats[status.key]++;
      progress = progress.push(
        <div className="day-wrapper" key={`${status.key}-${day}`}>
          <span
            className="day"
            onClick={this.handleChangeStatus.bind(
              this,
              day,
              status.toggleValue
            )}
          >
            <b>{moment(day).format("DD MMM")}</b>:
            <Popup
              trigger={
                <Icon
                  size="huge"
                  key={`${status.popup}-${day}`}
                  name={status.icon}
                  color={status.color}
                />
              }
              content={status.popup}
              inverted
              position="right center"
            />
          </span>
        </div>
      );
    });

    return (
      <Segment textAlign="center">
        <b>Статистика:</b>
        <ProgressStats stats={stats} />
        {progress}
      </Segment>
    );
  }

  render() {
    return <div>{this.renderProgress()}</div>;
  }
}

function mapStateToProps(state, props) {
  const routine = props.routine;
  const routines = state.get("routines").get("routines");
  const indexToReplace = routines.findIndex(r => {
    return routine.get("id") === parseInt(r.get("id"), 10);
  });
  return {
    routine: routines.get(indexToReplace)
  };
}

const mapDispatchToProps = {
  updateRoutineProgress
};

export default connect(mapStateToProps, mapDispatchToProps)(Progress);
