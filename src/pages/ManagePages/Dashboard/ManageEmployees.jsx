import * as React from "react";
import Modal from "../../../components/Modal";
import TableEmployee from "./TableEmployee";
import AddmployeeForm from "../Edit/AddEmployeeForm";
import { useEffect, useState } from "react";
import useUser from "../../../hooks/use-user";
import * as XLSX from "xlsx";

export default function ManageEmployees() {
  const { getalluser, allUser, loading } = useUser();
  const [isOpen, setIsOpen] = useState(false);
  const [excelValues, setExcelValues] = useState(null);

  useEffect(() => {
    getalluser()
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

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

  const handleBatchImportClick = () => {
    setIsOpen(true);
  };

  const handleSubmitClick = () => {
    console.log("Submitted Excel Values:", excelValues);
    // Additional logic to handle the submitted values
    // For example, you can send them to the server or perform further processing.
  };

  return (
    <div className="flex flex-col justify-start md:mt-20 p-2 max-w-[800px] max-h-[896px] md:w-full md:max-w-full">
      <div className="flex justify-center items-center gap-4 w-full">
        <div className="flex justify-center items-center p-6"></div>
      </div>
      <div className="w-full p-5">
        <TableEmployee allUser={allUser} loading={loading} />
        <Modal title="Add User" open={isOpen} onClose={() => setIsOpen(false)}>
          <div>
            <h1>Batch Import</h1>
            <input type="file" onChange={handleFileUpload} />
          </div>
          {/* Add other batch import form components here */}
          <button
            className="p-4 px-2 bg-green-500 rounded-md"
            onClick={handleSubmitClick}
          >
            Submit
          </button>
        </Modal>
      </div>
      <button
        className="p-4 px-2 bg-red-500 rounded-md"
        onClick={handleBatchImportClick}
      >
        Test batch import
      </button>
    </div>
  );
}
