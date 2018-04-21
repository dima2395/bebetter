import React from "react";
import { Popup } from "semantic-ui-react";

class ProgressStats extends React.Component {
  state = {
    stats: this.props.stats || null
  };

  render() {
    const stats = this.props.stats;
    return (
      <div className="progress-stats">
        <Popup
          trigger={
            <div
              className="progress done"
              style={{
                backgroundColor: "#21ba45",
                width: `${stats.done / stats.all * 100}%`
              }}
            />
          }
          content={`Выполнено(${precisionRound(
            stats.done / stats.all * 100,
            2
          )}%)`}
          inverted
          position="bottom center"
        />

        <Popup
          trigger={
            <div
              className="progress not-indicated"
              style={{
                backgroundColor: "#fbbd08",
                width: `${stats.not_indicated / stats.all * 100}%`
              }}
            />
          }
          content={`Не указано(${precisionRound(
            stats.not_indicated / stats.all * 100,
            2
          )}%)`}
          inverted
          position="bottom center"
        />

        <Popup
          trigger={
            <div
              className="progress failed"
              style={{
                backgroundColor: "#db2828",
                width: `${stats.failed / stats.all * 100}%`
              }}
            />
          }
          content={`Не выполнено(${precisionRound(
            stats.failed / stats.all * 100,
            2
          )}%)`}
          inverted
          position="bottom center"
        />
      </div>
    );
  }
}

function precisionRound(num, precision) {
  var factor = Math.pow(10, precision);
  return Math.round(num * factor) / factor;
}

export default ProgressStats;
