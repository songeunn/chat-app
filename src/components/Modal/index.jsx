import React from "react";
import styled from "styled-components";

const Modal = ({ showModal, closeModal, children }) => {
  return (
    <>
      {showModal ? (
        <Background onClick={closeModal}>
          <ModalContainer onClick={(e) => e.stopPropagation()}>
            <CloseIcon onClick={closeModal} />
            {children}
          </ModalContainer>
        </Background>
      ) : null}
    </>
  );
};

const Background = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 0;
`;

const ModalContainer = styled.div`
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);

  width: 300px;
  height: 200px;
  background-color: black;
  border: 1px solid var(--point-color);
  color: var(--point-color);

  input {
    width: 100%;
  }
`;

const CloseIcon = styled.button`
  position: absolute;
  top: 15px;
  right: 10px;
  width: 15px;
  height: 15px;
  background: url("/images/close.png") center center no-repeat;
  background-size: contain;
  cursor: pointer;
`;

export default Modal;
