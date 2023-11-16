import { useState } from "react";
import * as XLSX from "xlsx";
import AddEmployeeBatchCard from "./AddEmployeeBatchCard";
import SubmitButton from "../../../components/SubmitButton";
import useUser from "../../../hooks/use-user";
import LinearProgress from "@mui/material/LinearProgress";
import Swal from "sweetalert2";
import InputFileUpload from "../../../components/Uploadbutton";

export default function AddEmployeeBatch() {
  const { addemployee } = useUser();
  const [excelValues, setExcelValues] = useState(null);
  const [valueMap, setValueMap] = useState(null);
  const [isAdding, setIsAdding] = useState(false);
  const [progress, setProgress] = useState(0);
  const handleFileUpload = (event) => {
    const file = event.target.files[0];

    if (file) {
      if (!file.name.endsWith(".xlsx")) {
        Swal.fire({
          title: "Wrong File Format",
          text: "Please select a valid Excel file (XLSX format).",
          icon: "info",
        });
        event.target.value = null;
        return;
      }

      const reader = new FileReader();

      reader.onload = (e) => {
        const data = e.target.result;
        const workbook = XLSX.read(data, { type: "binary" });

        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];

        const jsonData = XLSX.utils.sheet_to_json(sheet);
        const resultWithLoading = jsonData.map((item) => ({
          ...item,
          loading: true,
          result: null,
        }));
        const resultWithoutRowNum = resultWithLoading.map(
          ({ __rowNum__, ...rest }) => rest
        );
        console.log(resultWithoutRowNum);
        setExcelValues(resultWithoutRowNum);
        setValueMap(resultWithoutRowNum);
      };

      reader.readAsBinaryString(file);
    }
  };
  const handleSubmitClick = async () => {
    setIsAdding(true);

    if (excelValues) {
      const totalRecords = excelValues.length;

      for (let i = 0; i < totalRecords; i++) {
        const record = excelValues[i];
        const formData = new FormData();
        formData.append("data", JSON.stringify(record));
        const result = await addemployee(formData);
        record.result = result === true ? "OK" : "NG";
        record.error = result;
        record.loading = false;

        setExcelValues((prev) => {
          const updatedValues = [...prev];
          updatedValues[i] = record;
          return updatedValues;
        });

        // Update progress
        const currentProgress = ((i + 1) / totalRecords) * 100;
        setProgress(currentProgress);
      }
    }
    setProgress(0);
    setIsAdding(false);
  };

  return (
    <div className="flex flex-col items-center justify-center gap-5">
      <div className="">
        <InputFileUpload
          buttonName="Upload Batch File"
          type="file"
          onChange={handleFileUpload}
          name=""
        />
      </div>
      <hr></hr>
      <div className=" p-5 flex flex-col gap-3 h-[500px] overflow-auto outline outline-2 outline-gray-200 rounded-md w-full">
        {valueMap?.map((el) => {
          return (
            <AddEmployeeBatchCard
              data={el}
              key={el.employeeId}
              loading={el.loading}
              isAdding={isAdding}
              result={el.result}
              error={el.error}
            />
          );
        })}
      </div>
      <SubmitButton
        onClick={handleSubmitClick}
        disabled={isAdding ? true : false}
      >
        {isAdding ? (
          <div className="flex flex-col items-center justify-center relative">
            <LinearProgress
              variant="determinate"
              value={progress}
              sx={{ width: "100%" }}
            />
            <p>{`${Math.round(progress)}%`}</p>
          </div>
        ) : (
          <p>Begin Batch Import</p>
        )}
      </SubmitButton>
    </div>
  );
}
