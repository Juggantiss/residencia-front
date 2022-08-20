import { MessageOutlined, CheckOutlined } from "@ant-design/icons";

const Modal = ({ close, children }) => {
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
            <button className="btn btn-outline btn-info gap-2">
              <MessageOutlined />
              Mensaje
            </button>
            <button className="btn btn-circle btn-outline btn-success">
              <CheckOutlined />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
