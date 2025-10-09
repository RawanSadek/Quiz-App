import type React from "react";
import { BsCheckLg } from "react-icons/bs";
import { IoClose } from "react-icons/io5";
type FormPopUpProps = {
  isOpen: boolean;
  onClose: () => void;
  onSave?: () => void;
  title: string;
  mode: "add" | "edit" | "view";
  content: React.ReactNode;
};

export default function FormPopUp({
  isOpen,
  onClose,
  onSave,
  title,
  mode,
  content,
}: FormPopUpProps) {
  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center sm:p-6 overflow-hidden">
        <div
          className="absolute inset-0 bg-black/50 backdrop-blur-[2px]"
          onClick={onClose}
          aria-hidden="true"
        />

        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="title"
          className="relative min-w-[50%] rounded-2xl bg-white ring-black/5 transition-all"
        >
          <div className=" flex justify-between items-center border-b-2 border-gray-300 px-1">
            <h2 className="text-xl font-bold p-4">{title}</h2>
            <div className="flex items-center">
              {mode !== "view" && (
                <div
                  onClick={onSave}
                  className="border-s-2 border-gray-300 p-4 hover:bg-gray-100 cursor-pointer"
                >
                  <button
                    type="button"
                    className="text-2xl focus:outline-none cursor-pointer"
                    aria-label="save"
                  >
                    <BsCheckLg size={30} />
                  </button>
                </div>
              )}
              <div
                onClick={onClose}
                className="border-s-2 border-gray-300 p-4 hover:bg-gray-100 cursor-pointer rounded-e-2xl"
              >
                <button
                  type="button"
                  className="text-2xl focus:outline-none cursor-pointer"
                  aria-label="Close"
                >
                  <IoClose size={30} />
                </button>
              </div>
            </div>
          </div>

          <div className="p-5">
            {/* Form */}
            <div>{content}</div>
          </div>
        </div>
      </div>
    </>
  );
}
