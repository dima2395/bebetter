//reduxModal HOC for modals

import React from "react";
import { connect } from "react-redux";
import { closeModal } from "reducers/modals";
import Immutable from "immutable";

const INITIAL_MODAL_STATE = Immutable.fromJS({});

export default function reduxModal({ name }) {
  return WrappedComponent => {
    class ReduxModal extends React.Component {
      render() {
        const { modal, closeModal, ...restProps } = this.props;
        const open = modal.get("open") || false;
        const modalProps = modal.get("modalProps");
        return (
          <WrappedComponent
            open={open}
            closeModal={closeModal.bind(null, name)}
            {...restProps}
            {...modalProps}
          />
        );
      }

      getDisplayName(WrappedComponent) {
        return (
          WrappedComponent.displayName || WrappedComponent.name || "Component"
        );
      }
    }

    return connect(
      state => ({
        modal: state.get("modals").get(name) || INITIAL_MODAL_STATE
      }),
      {
        closeModal
      }
    )(ReduxModal);
  };
}
