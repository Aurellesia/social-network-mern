const Modal = ({ show, children, handleClose, title }) => {
  return (
    <div className={`modal-container ${show} `}>
      <div className={`modal `}>
        <div className="cancel-modal">
          <span className="text-16-bold title-modal">{title}</span>
          <span className="cancel-icon" onClick={handleClose}>
            &times;
          </span>
          <hr />
        </div>
        <div className="modal-content">{children}</div>
      </div>
    </div>
  );
};

export default Modal;
