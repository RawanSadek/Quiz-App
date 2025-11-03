import { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import type {
  FormDataProps,
  GroupTypes,
  StudentTypes,
} from "../../../SERVICES/INTERFACES";
import { REQUIRED_VALIDATION } from "../../../SERVICES/VALIDATIONS";
import { useForm } from "react-hook-form";
import { axiosInstance, GROUPS_URLS, STUDENTS_URLS } from "../../../SERVICES/ENDPOINTS";
import { toast } from "react-toastify";
import type { AxiosError } from "axios";
import dataLoading from "../../../assets/Images/loadingData.gif";
import { FaChevronDown } from "react-icons/fa";

const GroupsForm = forwardRef(({ id, mode }: FormDataProps, ref) => {
  const [groupDetails, setGroupDetails] = useState<GroupTypes>();
  const [studentsList, setStudentsList] = useState<StudentTypes[]>();
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [selected, setSelected] = useState<StudentTypes[]>([]);

  const toggleDropdown = () => {
    if (mode !== "view") setIsOpen(!isOpen);
  };

  const handleSelect = (student: StudentTypes) => {
    setSelected(
      (prevSelected) =>
        prevSelected.some((s) => s._id === student._id)
          ? prevSelected.filter((s) => s._id !== student._id) // unselect if already selected
          : [...prevSelected, student] // otherwise add it
    );
  };

  const filteredStudents = studentsList?.filter((student: StudentTypes) =>
    student.email.toLowerCase().includes(searchInput.toLowerCase())
  );

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<GroupTypes>();

  const onSubmit = async (data: GroupTypes) => {
    setIsOpen(false);
    const updatedData = {
      ...data,
      students: selected.map((s) => s._id), // only IDs
    };
    try {
      if (mode == "add") {
        const response = await axiosInstance.post(
          GROUPS_URLS.CREATE_GROUP,
          updatedData
        );
        toast.success(response?.data?.message);
      } else if (mode === "edit" && id) {
        const response = await axiosInstance.put(
          GROUPS_URLS.UPDATE_GROUP(id),
          updatedData
        );
        toast.success(response?.data?.message);
      }
    } catch (err) {
      const error = err as AxiosError<{ message: string }>;
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  useImperativeHandle(ref, () => ({
    submitForm: async () => {
      let success = false;
      await handleSubmit(async (data) => {
        await onSubmit(data);
        success = true; // only if the validation passed
      })();
      return success;
    },
  }));

  const getGroupById = async (id: string) => {
    setLoading(true);
    try {
      const response = await axiosInstance.get(GROUPS_URLS.GET_BY_ID(id));
      setGroupDetails(response?.data);
    } catch (err) {
      const error = err as AxiosError<{ message: string }>;
      toast.error(error?.response?.data?.message || "Something went wrong!");
    }
    setLoading(false);
  };

  // get all students that have no group
  const getStudents = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance(STUDENTS_URLS.GET_ALL_WITHOUT_GROUP)
      setStudentsList(response?.data);
    } catch (err) {
      const error = err as AxiosError<{ message: string }>;
      toast.error(error?.response?.data?.message || "Something went wrong!");
    }
    setLoading(false);
  };

  useEffect(() => {
    getStudents();
    if (id) getGroupById(id);
  }, []);

  useEffect(() => {
    if (id && groupDetails) {
      if (groupDetails.students && groupDetails.students.length > 0) {
        setSelected(groupDetails.students);
      }
      reset({
        name: groupDetails.name,
      });
    }
  }, [id, groupDetails, reset]);

  return (
    <div>
      {/* loading */}
      {isSubmitting && (
        <div className="bg-[#d1d1d18f] w-full h-full absolute top-0 left-0 rounded-2xl cursor-not-allowed z-[999999]">
          <img
            src={dataLoading}
            alt="loading"
            className="w-[60%] md:w-[35%] mt-[8%] !mx-auto"
          />
        </div>
      )}

      {loading && (
        <div className="bg-[#d1d1d18f] w-full h-full absolute top-0 left-0 rounded-2xl cursor-not-allowed z-[999999]">
          <img
            src={dataLoading}
            alt="loading"
            className="w-[60%] md:w-[35%] mt-[8%] !mx-auto"
          />
        </div>
      )}
      <form onSubmit={handleSubmit(onSubmit)} className="my-3">
        {/* Name */}
        <div className="flex justify-start items-center gap-3 border border-gray-300 rounded-lg pe-3 mt-3">
          <label
            htmlFor="name"
            className="bg-[#FFEDDF] rounded-lg py-1 px-4 font-semibold whitespace-nowrap"
          >
            Group Name:
          </label>
          <input
            disabled={mode === "view"}
            defaultValue={id ? groupDetails?.name : ""}
            {...register("name", REQUIRED_VALIDATION("Group Name"))}
            type="text"
            id="name"
            className="w-full focus:outline-0"
          />
        </div>
        {errors.name && (
          <p className="text-red-700">{errors.name.message as string}</p>
        )}

        {/* Students */}
        <div className="flex justify-start items-stretch border border-gray-300 rounded-lg mt-2">
          {/* Label */}
          <label className="bg-[#FFEDDF] rounded-lg py-1 px-4 font-semibold whitespace-nowrap flex items-center">
            Students List:
          </label>

          {/* Dropdown container */}
          <div
            onClick={selected.length == 0 ? toggleDropdown : undefined}
            className="relative flex items-center justify-between flex-grow px-3 cursor-pointer"
          >
            {/* Selected container */}
            <div
              onClick={toggleDropdown}
              className="flex-grow text-gray-700 p-1 max-h-[100px] overflow-auto"
            >
              <div className="flex flex-col text-gray-700">
                {!loading &&
                  selected.length > 0 &&
                  selected.map((student) => (
                    <span
                      key={student._id}
                      className="bg-gray-200 w-fit rounded-full p-1 mb-2 text-[10px] md:text-[14px]"
                    >
                      {student.email}
                    </span>
                  ))}
                {!loading && selected.length == 0 && (
                  <span className="text-gray-400 italic">
                    No students selected
                  </span>
                )}
              </div>
            </div>

            {/* Icon */}
            <FaChevronDown
              onClick={toggleDropdown}
              className={`ml-2 transition-transform duration-200 ${
                isOpen ? "rotate-180" : ""
              } ${mode==='view'&&'hidden'}`}
            />

            {/* Drop down menu */}
            {isOpen && (
              <div className="absolute top-full right-0 mt-2 w-full h-[200px] bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-hidden text-[10px] md:text-[14px] z-10">
                {/* Search input */}
                <div className="p-2">
                  <input
                    type="text"
                    placeholder="Search..."
                    value={searchInput}
                    onChange={(e) => setSearchInput(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-md  focus:outline-none"
                  />
                </div>

                {/* List */}
                <ul className="max-h-[74%] overflow-y-auto">
                  {filteredStudents?.length === 0 ? (
                    <li className="px-4 py-2 text-gray-500 text-sm">
                      No students found
                    </li>
                  ) : (
                    filteredStudents?.map((student: StudentTypes) => (
                      <li
                        key={student._id}
                        onClick={() => handleSelect(student)}
                        className="flex items-center px-4 py-2 hover:bg-gray-100 cursor-pointer"
                      >
                        <input
                          type="checkbox"
                          disabled={mode === "view"}
                          checked={selected.some((s) => s._id === student._id)}
                          onChange={() => handleSelect(student)}
                          className="mr-2 w-3 h-3 lg:w-4 lg:h-4 rounded accent-black"
                        />
                        <span className="text-gray-800">{student.email}</span>
                      </li>
                    ))
                  )}
                </ul>
              </div>
            )}
          </div>
        </div>
      </form>
    </div>
  );
});
export default GroupsForm;
