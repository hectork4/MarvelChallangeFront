import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import ModalPortal from ".";

beforeEach(() => {
  const modalRoot = document.createElement("div");
  modalRoot.id = "modal-root";
  document.body.appendChild(modalRoot);
});

afterEach(() => {
  // eslint-disable-next-line testing-library/no-node-access
  const modalRoot = document.getElementById("modal-root");
  if (modalRoot) {
    document.body.removeChild(modalRoot);
  }
});

describe("ModalPortal", () => {
  it("renders modal with children and title", () => {
    const handleClose = jest.fn();

    render(
      <ModalPortal onClose={handleClose} title="Test Title">
        <p>Modal Content</p>
      </ModalPortal>
    );

    expect(screen.getByText("Test Title")).toBeInTheDocument();
    expect(screen.getByText("Modal Content")).toBeInTheDocument();

    const closeButton = screen.getByRole("button", { name: /❌/ });
    expect(closeButton).toBeInTheDocument();
  });

  it("calls onClose when the close button is clicked", () => {
    const handleClose = jest.fn();

    render(
      <ModalPortal onClose={handleClose}>
        <p>Modal Content</p>
      </ModalPortal>
    );

    const closeButton = screen.getByRole("button", { name: /❌/ });
    fireEvent.click(closeButton);

    expect(handleClose).toHaveBeenCalledTimes(1);
  });

  it("does not call onClose when the modal content is clicked", () => {
    const handleClose = jest.fn();

    render(
      <ModalPortal onClose={handleClose}>
        <p>Modal Content</p>
      </ModalPortal>
    );

    const modalContent = screen.getByText("Modal Content");
    fireEvent.click(modalContent);

    expect(handleClose).not.toHaveBeenCalled();
  });
});
