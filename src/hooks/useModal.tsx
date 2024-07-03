import React, { ReactNode, useState } from "react";

interface IModalComponent {
  title: string;
  children: ReactNode;
  closeButtonTitle?: string;
}

const useModal = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const ModalComponent = (props: IModalComponent) => {
    const { children, title, closeButtonTitle } = props;
    return (
      <>
        {isModalOpen && (
          <>
            <div className="modal modal-open z-50">
              <div className="modal-box w-11/12 max-w-5xl">
                <h2 className="text-xl font-semibold mb-4">{title}</h2>
                {children}
                {closeButtonTitle && (
                  <div className="modal-action">
                    <button className="btn" type="button" onClick={closeModal}>
                      {closeButtonTitle}
                    </button>
                  </div>
                )}
              </div>
            </div>
          </>
        )}
      </>
    );
  };

  return { ModalComponent, closeModal, openModal, isModalOpen };
};

export default useModal;
