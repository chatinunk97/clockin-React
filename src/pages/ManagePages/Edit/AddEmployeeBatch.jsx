import { useState } from "react";
import * as XLSX from "xlsx";
import AddEmployeeBatchCard from "./AddEmployeeBatchCard";
import SubmitButton from "../../../components/SubmitButton";
import useUser from "../../../hooks/use-user";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import Swal from "sweetalert2";

export default function AddEmployeeBatch() {
  const { addemployee } = useUser();
  const [excelValues, setExcelValues] = useState(null);
  const [valueMap, setValueMap] = useState(null);
  const [isAdding, setIsAdding] = useState(false);
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

        setExcelValues(resultWithoutRowNum);
        setValueMap(resultWithoutRowNum);
      };

      reader.readAsBinaryString(file);
    }
  };
  const handleSubmitClick = async () => {
    setIsAdding(true);
    if (excelValues) {
      for (const record of excelValues) {
        const formData = new FormData();
        formData.append("data", JSON.stringify(record));
        const result = await addemployee(formData);
        record.result = result === true ? "OK" : "NG";
        record.error = result;
        record.loading = false;
        setExcelValues((prev) => {
          return [...prev, record];
        });
      }
    }
    
    setIsAdding(false);
  };

  return (
    <div className="flex flex-col gap-5">
      <div className="bg-red-500 p-5">
        <p>Batch Import</p>
        <input type="file" onChange={handleFileUpload} />
      </div>
      <hr></hr>
      <div className="bg-blue-500 p-5 flex flex-col gap-3">
        Map some shit here
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
          <AiOutlineLoading3Quarters className="animate-spin text-3xl" />
        ) : (
          <p>Begin Batch Import</p>
        )}
      </SubmitButton>
    </div>
  );
}
