import React from "react";
import { connect } from "react-redux";
import { getRoutines, deleteRoutine } from "reducers/routines";
import { Segment, Grid, Button, Icon } from "semantic-ui-react";
import RoutineForm from "forms/RoutineForm";
import RoutineModal from "modals/RoutineModal";
import RoutineProgressModal from "modals/RoutineProgressModal";
import RoutineDeleteModal from "modals/DeleteRoutineModal";
import Routines from "./Routines";
import Progress from "./Progress";
import { openModal } from "reducers/modals";

class DailyRoutine extends React.Component {
  openRoutineModal = routine => {
    // if create form
    let content = <RoutineForm />;
    let header = "Добавить привычку";

    // if edit form
    if (routine) {
      content = <RoutineForm routine={routine} />;
      header = "Редактировать привычку";
    }

    this.props.openModal("routine_create_update", {
      content,
      header
    });
  };

  openProgressModal = routine => {
    this.props.openModal("routine_progress_create_update", {
      content: <Progress routine={routine} />,
      header: `Прогресс: "${routine.get("text")}"`
    });
  };

  openDeleteRoutineModal = id => {
    this.props.openModal("routine_delete", {
      header: "Удаление привычки",
      content: "Вы уверены, что хотите удалить эту привычку?",
      deleteAction: this.props.deleteRoutine.bind(null, id)
    });
  };

  componentDidMount() {
    this.props.getRoutines();
  }

  render() {
    const { loading } = this.props;
    return (
      <div className="daily-routine-page">
        <Grid>
          <Grid.Column width={16}>
            <Segment loading={loading}>
              <h1>Привычки</h1>
              <div className="controls">
                <Button
                  color="green"
                  size="small"
                  onClick={this.openRoutineModal.bind(this, null)}
                >
                  <Icon name="plus" />
                  Добавить привычку
                </Button>
              </div>
              <Routines
                routines={this.props.routines}
                openRoutineModal={this.openRoutineModal}
                openProgressModal={this.openProgressModal}
                openDeleteRoutineModal={this.openDeleteRoutineModal}
              />
            </Segment>
          </Grid.Column>
        </Grid>
        <RoutineModal />
        <RoutineProgressModal className="routine-progress-modal" />
        <RoutineDeleteModal />
      </div>
    );
  }
}

function mapStateToProps(state) {
  const routines = state.get("routines");
  return {
    routines: routines.get("routines"),
    loading: routines.get("loading")
  };
}

const mapDispatchToProps = {
  getRoutines,
  deleteRoutine,
  openModal
};

export default connect(mapStateToProps, mapDispatchToProps)(DailyRoutine);
