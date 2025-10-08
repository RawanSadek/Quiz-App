import { FiX } from "react-icons/fi";
import deleteImg from "./../../../../assets/Images/deleteImg.png";

interface DeleteConfirmationProps {
  isOpen: boolean;
  onClose: () => void;
  onDelete: () => void;
  entity: string;
  name?: string;
}

const DeleteConfirmation = ({
  isOpen,
  onClose,
  onDelete,
  entity,
}: DeleteConfirmationProps) => {
  if (!isOpen) return null;
  const msg = `Are you sure you want to delete this ${entity}?`;
  const stablemsg = `This action cannot be undone`;

  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center sm:p-6">
        <div
          className="absolute inset-0 bg-black/50 backdrop-blur-[2px]"
          onClick={onClose}
          aria-hidden="true"
        />

        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="delete-title"
          className="relative min-w-[40%] rounded-2xl bg-white shadow-2xl ring-black/5 transition-all"
        >
          <div className=" flex justify-between items-center shadow-[0_8px_10px_-4px_rgba(0,0,0,0.5)] p-4">
            <h2 className="capitalize text-xl font-semibold">
              delete {entity}
            </h2>
            <button
              type="button"
              onClick={onClose}
              className="text-2xl rounded-full hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-300 p-2 cursor-pointer"
              aria-label="Close"
            >
              <FiX />
            </button>
          </div>

          <div className="p-5">
            <img
              src={deleteImg}
              alt="delete image"
              className="mx-auto w-[20%] min-w-[20%] object-contain hidden sm:block my-8"
            />

            <h3
              id="delete-title"
              className="text-center text-lg font-semibold text-gray-900 mx-2 mt-8"
            >
              {msg}
            </h3>

            <p className="!mt-1.5 text-center text-sm ">{stablemsg}</p>

            <div className="!mt-6 !mb-3 !mx-4 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end text-sm">
              <button
                onClick={onClose}
                type="button"
                className="inline-flex items-center justify-center rounded-full border border-gray-300 !px-5 !py-2.5 text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-300 cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={onDelete}
                type="button"
                className="inline-flex items-center justify-center rounded-full bg-red-600 !px-5 !py-2.5 text-white shadow hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 cursor-pointer"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DeleteConfirmation;
