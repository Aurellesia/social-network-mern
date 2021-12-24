const Modal = ({ show, children, handleClose }) => {
  return (
    <div className={`modal-container ${show} `}>
      <div className={`modal `}>
        <div className="cancel-modal">
          <span onClick={handleClose}>&times;</span>
        </div>
        {children}
      </div>
    </div>
  );
};

export default Modal;
