import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { Container, Box } from "@mui/material";

interface ModalProps {
  children: React.ReactNode;
  isModalOpen: boolean;
  setisModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const Modal: React.FC<ModalProps> = ({
  children,
  setisModalOpen,
  isModalOpen,
}) => {
  const modalRoot = document.getElementById("modal-root");
  const [screenWidth, setScreenWidth] = useState<number>(window.innerWidth);
  const closeModal = () => {
    setisModalOpen(false);
  };

  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const modalWrap: React.CSSProperties = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    backgroundColor: "white",
    zIndex: 3,
    width: screenWidth <= 1000 ? "85vw" : "600px",
    height: "400px",
    padding: "20px",
    overflowY: "auto",
  };

  const fixedBackgroundModal: React.CSSProperties = {
    position: "fixed",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "rgba(0, 0, 0, 0.65)",
    zIndex: 2,
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeModal();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  if (!isModalOpen || !modalRoot) {
    return null; // Return null if modal is not open or modalRoot is not found
  }

  return createPortal(
    <div style={fixedBackgroundModal}>
      <Container style={modalWrap}>
        <Box style={{ display: "flex", flexDirection: "row-reverse", justifyContent: "space-between" }}>
          <Box style={{ width: "5%" }}>
            <button
              style={{
                textAlign: "right",
                fontSize: "20px",
                cursor: "pointer",
                width: "25px",
                display: "flex",
                justifyContent: "center",
                color: "red",
              }}
              onClick={closeModal}
            >
              X
            </button>
          </Box>
          <Box style={{ width: "95%" }}>
            {/* The design comes from the parent Modal */}
            {children}
          </Box>
        </Box>
      </Container>
    </div>,
    modalRoot
  );
};

export default Modal;
