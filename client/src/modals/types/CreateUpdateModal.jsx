import React from "react";
import { Modal } from "semantic-ui-react";

class CreateUpdateModal extends React.Component {
  render() {
    const {
      closeModal,
      header,
      content,
      open,
      scrolling,
      ...restProps
    } = this.props;
    return (
      <Modal open={open} onClose={closeModal} {...restProps}>
        <Modal.Header>{header}</Modal.Header>
        <Modal.Content scrolling={scrolling}>{content}</Modal.Content>
      </Modal>
    );
  }
}

export default CreateUpdateModal;
