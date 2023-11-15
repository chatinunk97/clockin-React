import { useState } from "react";
import * as XLSX from "xlsx";
import AddEmployeeBatchCard from "./AddEmployeeBatchCard";
import SubmitButton from "../../../components/SubmitButton";
import useUser from "../../../hooks/use-user";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

export default function AddEmployeeBatch() {
  const { addemployee } = useUser();
  const [excelValues, setExcelValues] = useState(null);
  const [isAdding, setIsAdding] = useState(true);
  const handleFileUpload = (event) => {
    const file = event.target.files[0];

    if (file) {
      if (!file.name.endsWith(".xlsx")) {
        alert("Please select a valid Excel file (XLSX format).");
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

        const resultWithoutRowNum = jsonData.map(
          ({ __rowNum__, ...rest }) => rest
        );

        setExcelValues(resultWithoutRowNum);
      };

      reader.readAsBinaryString(file);
    }
  };
  const handleSubmitClick = async () => {
    console.log("Submitted Excel Values:", excelValues);

    if (excelValues) {
      const formData = new FormData();
      formData.append("data", JSON.stringify(excelValues[0]));
      addemployee(formData);
      for (const record of excelValues) {
        console.log(record);
      }
    }
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
        {excelValues?.map((el) => {
          return <AddEmployeeBatchCard data={el} />;
        })}
      </div>
      <SubmitButton
        onClick={handleSubmitClick}
        disabled={isAdding ? true : false}
      >
        <AiOutlineLoading3Quarters className="animate-spin text-3xl" />
      </SubmitButton>
    </div>
  );
}
