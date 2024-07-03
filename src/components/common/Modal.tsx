interface IModalProps {
  modalId: string;
  title: string;
  description: string;
  action: string;
  actionCallback: () => Promise<void>;
  cancel?: string;
  cancelCallback?: () => Promise<void>;
  isMutating?: boolean;
}

const Modal = (props: IModalProps) => {
  const {
    modalId,
    title,
    description,
    action,
    actionCallback,
    cancel,
    cancelCallback,
    isMutating = false,
  } = props;
  // const checkboxRef = useRef<HTMLInputElement>(null);

  const wrapperCloseModal = async (fn: (() => Promise<void>) | undefined) => {
    if (fn) {
      await fn();
    }
    window[modalId].close();
  };
  const handleCancel = async () => {
    await wrapperCloseModal(cancelCallback);
  };
  const handleAction = async () => {
    await wrapperCloseModal(actionCallback);
  };

  return (
    <>
      {/* <input type="checkbox" id={modalId} className="modal-toggle" ref={checkboxRef} /> */}
      <dialog className="modal" id={modalId}>
        <form method="dialog" className={`modal-box ${isMutating ? "opacity-50" : "opacity-100"}`}>
          <h3 className="font-bold text-lg">{title}</h3>
          <p className="py-4">{description}</p>
          <div className="modal-action">
            {cancel && (
              <button
                type="button"
                className={`btn btn-secondary ${isMutating && "label-disabled"}`}
                onClick={handleCancel}
              >
                {cancel}
              </button>
            )}
            <button
              type="button"
              className={`btn btn-primary ${isMutating && "label-disabled"}`}
              onClick={handleAction}
            >
              {action}
            </button>
          </div>
        </form>
      </dialog>
    </>
  );
};

export default Modal;
