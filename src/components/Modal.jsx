import { GiCheckMark } from "react-icons/gi";
import { BiMessageEdit } from "react-icons/bi";
import { MdPersonRemove } from "react-icons/md";

const Modal = ({ close, accept, children }) => {
  return (
    <div className="modal modal-open modal-bottom sm:modal-middle flex justify-center fixed top-0 w-full h-full">
      <div className="modal-box">
        <button
          className="btn btn-sm btn-circle absolute right-2 top-2"
          onClick={close}
        >
          ✕
        </button>
        {children}
        <div className="divider"></div>
        <div className="modal-action">
          <div className="btn-group">
            <button className="btn btn-circle btn-outline btn-error">
              <MdPersonRemove size={18} />
            </button>
            <button className="btn btn-outline btn-info gap-2">
              <BiMessageEdit size={18} />
              Mensaje
            </button>
            <button
              className="btn btn-circle btn-outline btn-success"
              onClick={accept}
            >
              <GiCheckMark />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
