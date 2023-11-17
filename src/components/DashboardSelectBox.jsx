import useDashboard from "../hooks/use-dashboard";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";

export default function DashboardSelectBox() {
  const { setSelectDate, selectDate } = useDashboard();
  console.log(selectDate, "date");
  const handleFilterDate = (e) => {
    const dateFormat = dayjs(e.$d).format("YYYY-MM");
    setSelectDate(dateFormat);
  };
  return (
    <div>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
          label="Select Date"
          views={["year", "month"]}
          onChange={handleFilterDate}
          className=" w-44 max-w-xl bg-white shadow"
        />
      </LocalizationProvider>
    </div>
  );
}
