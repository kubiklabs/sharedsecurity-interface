import React, { useState } from "react";
import Modal from "react-modal";

import "./modal.css";

const ModalOverlay = (props: any) => {
  const [isListOpen, setIsListOpen] = useState(true);
  const closeModal = () => {
    setIsListOpen(false);
  };
  return (
    <Modal
      isOpen={props.isOpen}
      onRequestClose={props.closeModal}
      //   style={props.style}
      className={"custom-modal"}
      contentLabel="Common Modal"
    >
      <span
        onClick={() => setIsListOpen(false)}
        className="material-symbols-outlined"
      >
        close
      </span>
      {props.children}
    </Modal>
  );
};

export default ModalOverlay;
