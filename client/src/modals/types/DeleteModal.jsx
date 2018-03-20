import React from "react";
import { Modal, Button } from "semantic-ui-react";

class DeleteNoteModal extends React.Component {
  render() {
    const {
      closeModal,
      deleteAction,
      loading,
      header,
      content,
      open
    } = this.props;
    return (
      <Modal size="tiny" open={open} onClose={closeModal}>
        <Modal.Header>{header}</Modal.Header>
        <Modal.Content>
          <p>{content}</p>
        </Modal.Content>
        <Modal.Actions>
          <Button onClick={closeModal}>Cancel</Button>
          <Button negative onClick={deleteAction} loading={loading}>
            Delete
          </Button>
        </Modal.Actions>
      </Modal>
    );
  }
}

export default DeleteNoteModal;
