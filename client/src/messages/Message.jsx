import React from "react";
import { Message as MessageComponent } from "semantic-ui-react";

export default class Message extends React.Component {
  render() {
    const { message, deleteMessage } = this.props;
    const header = message.get("title");
    const content = message.get("text");
    const id = message.get("id");
    const type = message.get("type");
    return (
      <MessageComponent
        {...{ header, content }}
        {...{ [type]: true }}
        onDismiss={() => deleteMessage(id)}
      />
    );
  }
}
