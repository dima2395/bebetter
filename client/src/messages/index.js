import React from "react";
import { connect } from "react-redux";
import { deleteMessage } from "reducers/messages";
import Message from "./Message";
import ReactCSSTransitionGroup from "react-addons-css-transition-group";

class GlobalMessages extends React.Component {
  render() {
    const { messages, deleteMessage } = this.props;
    const messagesResult = messages.map(message => (
      <Message
        message={message}
        deleteMessage={deleteMessage}
        key={message.get("id")}
      />
    ));
    return (
      <div className="global-messages">
        <ReactCSSTransitionGroup
          transitionName="addMessage-animation"
          transitionEnterTimeout={500}
          transitionLeaveTimeout={500}
        >
          {messagesResult}
        </ReactCSSTransitionGroup>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const messages = state.get("messages");
  return {
    messages: messages.get("messages")
  };
}

const mapDispatchToProps = {
  deleteMessage
};

export default connect(mapStateToProps, mapDispatchToProps)(GlobalMessages);
