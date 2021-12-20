import "../../style/sass/styles.scss";

const Modal = ({ show }) => {
  const showModal = show ? "show-modal" : "hide-modal";
  return (
    <div className="modal-container">
      <span onClick={() => {}}></span>
      <div className={`modal ${showModal}`}></div>
    </div>
  );
};

export default Modal;
