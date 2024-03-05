/* eslint-disable react-hooks/exhaustive-deps */

import React, { useState } from "react";
import Modal from "react-modal";
import LoaderContent from "./LoaderContent";
import Image from "next/image";

const LoadingModal = ({
  isOpen,
  content,
}: {
  isOpen: boolean;
  content: Array<String>;
}) => {
  // const [menuIsOpen, setMenuIsOpen] = useState(false);

  return (
    <Modal
      ariaHideApp={false}
      isOpen={isOpen}
      // onRequestClose={closeModal}
      contentLabel="Txn"
      className="custom-modal"
    >
      <div className="loading-modal-wrapper">
        <div className="loading-modal-heading">
          Txn in progress. Please do not press back button or refresh the page.
        </div>
        <div className="loading-modal-content-wrapper">
          <Image src={'/images/kubik-logo.png'} alt="Kubik" />
          <div>
            <LoaderContent action={content[0]} message={content[1]} />
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default LoadingModal;
