import { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import { axiosInstance, QUESTIONS_URLS } from "../../../SERVICES/ENDPOINTS";
import type { AxiosError } from "axios";
import { toast } from "react-toastify";
import type { QuestionTypes } from "../../../SERVICES/INTERFACES";

 interface FormDataProps  {
  id?: string | null;
   mode: "add" | "edit" | "view";
 }

const QuestionForm = forwardRef(( { id, mode }:FormDataProps, ref) => {

  const [questionDetails, setQuestionDetails] = useState<QuestionTypes>()
  
  const handleSubmit = () => {
    if (mode === "add") {
      console.log("add logic")
    } else if (mode === "edit") {
      console.log('edit logic')
    } 
  }

  useImperativeHandle(ref, () => ({
    saveForm: handleSubmit,
  }));

  const getQuestionById = async (id: string) => {
    try {
          const response = await axiosInstance.get(QUESTIONS_URLS.GET_BY_ID(id));
          console.log(response?.data);
          setQuestionDetails(response?.data);
          
    }catch (err) {
          const error = err as AxiosError<{ message: string }>;
          toast.error(error?.response?.data?.message || "Something went wrong!");
    }
  }
  


  useEffect(() => {
    if (id)
      getQuestionById(id);  
    
  }, []);

  return (
    <div>
      Question Form <br />
      {questionDetails?.title}
    </div>
  )
})

export default QuestionForm;