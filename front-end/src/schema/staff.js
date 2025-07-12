import * as yup from "yup";
export const ScheduleSchema = yup.object().shape({
  date: yup.string().required("Date is required"),
  start_time: yup.string().required("Start time is required"),
  end_time: yup.string().required("End time is required"),
});
