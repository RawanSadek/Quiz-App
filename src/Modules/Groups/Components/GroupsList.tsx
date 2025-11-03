import { useEffect, useRef, useState } from "react";
import { MdOutlineAddCircle } from "react-icons/md";
import DeleteConfirmation from "../../Shared/Components/DeleteConfirmation/DeleteConfirmation";
import FormPopUp from "../../Shared/Components/FormPopUp/FormPopUp";
import { axiosInstance, GROUPS_URLS } from "../../../SERVICES/ENDPOINTS";
import { toast } from "react-toastify";
import type { AxiosError } from "axios";
import GroupsForm from "./GroupsForm";
import { RiDeleteBin6Line } from "react-icons/ri";
import { FaEye, FaRegEdit } from "react-icons/fa";
import type { GroupTypes } from "../../../SERVICES/INTERFACES";
import dataLoading from "../../../assets/Images/loadingData.gif";

export default function GroupsList() {
  const [groups, setGroups] = useState([]);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [targetId, setTargetId] = useState<string | null>(null);
  const [formMode, setFormMode] = useState<"add" | "edit" | "view">("add");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formTitle, setFormTitle] = useState("");
  const [loading, setLoading] = useState(false);
  const formRef = useRef<{ submitForm: () => void }>(null);

  const getGroups = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance(GROUPS_URLS.GET_ALL);
      setGroups(response?.data);
    } catch (err) {
      const error = err as AxiosError<{ message: string }>;
      toast.error(error.response?.data?.message || "Something went wrong");
    }
    setLoading(false);
  };

  const handleConfirmDelete = async () => {
    if (targetId == null) return;
    try {
      const response = await axiosInstance.delete(
        GROUPS_URLS.DELETE_GROUP(targetId)
      );
      toast.success(response?.data?.message || "Group Deleted Successfully");
      getGroups();
    } catch (err) {
      const error = err as AxiosError<{ message: string }>;
      toast.error(error?.response?.data?.message || "Something went wrong!");
    } finally {
      setIsDeleteModalOpen(false);
      setTargetId(null);
    }
  };

  const handleOpenGroupsForm = (
    title: string,
    mode: "add" | "edit" | "view"
  ) => {
    setFormMode(mode);
    setFormTitle(title);
    setIsModalOpen(true);
  };

  const handleCloseClick = () => {
    setIsModalOpen(false);
    setTargetId(null);
  };

  const handleSaveClick = async () => {
    const success = await formRef.current?.submitForm();
    if (success) {
      handleCloseClick();
      getGroups();
    }
  };

  useEffect(() => {
    getGroups();
  }, []);

  return (
    <>
      <div className="border-2 border-[#dedede] py-3 px-5 rounded-lg h-[570px] overflow-hidden">
        {/* Header */}
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold">Groups List</h2>
          <div
            onClick={() => handleOpenGroupsForm("Set up a new group", "add")}
            className="relative inline-flex px-4 py-1 justify-center items-center cursor-pointer text-md rounded-full border border-gray-400 me-4 hover:bg-gray-100"
          >
            <MdOutlineAddCircle className="text-[26px] cursor-pointer me-1" />
            <p className="font-semibold">Add Group</p>
          </div>
        </div>

        {loading && (
          <div className="flex justify-center items-center py-20">
          <img src={dataLoading} alt="loading" className="w-[15%]  !mx-auto" />
          </div>
        )}

        {!loading && groups.length === 0 && (
          <p className="text-center pt-20 text-gray-400">No groups found</p>
        )}

        {/* Groups Data */}
        {!loading && groups.length !== 0 && (
          <div className="my-5 max-h-[90%] overflow-auto p-3">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
              {groups.map((group: GroupTypes) => (
                <div key={group._id} className="border-2 border-gray-300 p-3 rounded-lg">
                  <div className="flex justify-between items-center">
                    <div>
                      <h2 className="font-semibold text-lg">
                        Group: {group.name}
                      </h2>
                      <small className="text-gray-600">
                        No. of Students: {group.students.length}
                      </small>
                    </div>

                    {/* Actions */}
                    <div className=" flex justify-between items-center text-lg gap-3">
                      <div
                        onClick={() => {
                          setTargetId(group?._id ?? null);
                          handleOpenGroupsForm("View Group Details", "view");
                        }}
                        className="relative group"
                      >
                        <FaEye className="cursor-pointer text-xl" />
                        <div
                          className="absolute bottom-full mb-1 left-0 -translate-x-1/2
                                      hidden group-hover:block bg-black text-white text-sm
                                      px-3 py-1 rounded-md shadow-lg "
                        >
                          View
                        </div>
                      </div>

                      <div
                        onClick={() => {
                          setTargetId(group?._id ?? null);
                          handleOpenGroupsForm("Update Group", "edit");
                        }}
                        className="relative group"
                      >
                        <FaRegEdit className="cursor-pointer text-xl" />
                        <div
                          className="absolute bottom-full mb-1 left-0 -translate-x-1/2
                                      hidden group-hover:block bg-black text-white text-sm
                                      px-3 py-1 rounded-md shadow-lg "
                        >
                          Edit
                        </div>
                      </div>

                      <div
                        onClick={() => {
                          setTargetId(group?._id ?? null);
                          setIsDeleteModalOpen(true);
                        }}
                        className="relative group"
                      >
                        <RiDeleteBin6Line className="cursor-pointer text-xl" />
                        <div
                          className="absolute bottom-full mb-1 left-0 -translate-x-1/2
                                      hidden group-hover:block bg-black text-white text-sm
                                      px-3 py-1 rounded-md shadow-lg "
                        >
                          Delete
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Delete Confirmation  */}
      <DeleteConfirmation
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onDelete={handleConfirmDelete}
        entity="group"
      />

      {/* Form PopUp */}
      <FormPopUp
        isOpen={isModalOpen}
        onClose={handleCloseClick}
        onSave={handleSaveClick}
        title={formTitle}
        mode={formMode}
        content={
          <GroupsForm id={targetId ?? null} mode={formMode} ref={formRef} />
        }
      />
    </>
  );
}
