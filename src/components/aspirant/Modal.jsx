const Modal = ({ className, children }) => {
  return (
    <>
      <div className={className}>
        <div className="modal-box modal-middle">
          <label
            for="my-modal-3"
            className="btn btn-sm btn-circle absolute right-2 top-2"
          >
            ✕
          </label>
          {children}
        </div>
      </div>
    </>
  );
};

export default Modal;
