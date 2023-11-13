import { useState } from "react";
import Modal from "../../../components/Modal";
import TableEmployee from "./TableEmployee";
import AddmployeeForm from "../Edit/AddEmployeeForm";
import { useEffect } from "react";
import useUser from "../../../hooks/use-user";
import * as XLSX from "xlsx";

export default function ManageEmployees() {
  const { getalluser, allUser, loading } = useUser();
  const [isOpen, setIsOpen] = useState(false);

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
      // Check if the file type is Excel
      if (!file.name.endsWith(".xlsx")) {
        alert("Please select a valid Excel file (XLSX format).");
        // Reset the file input
        event.target.value = null;
        return;
      }

      const reader = new FileReader();

      reader.onload = (e) => {
        const data = e.target.result;
        const workbook = XLSX.read(data, { type: "binary" });

        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];

        // Convert the sheet to JSON
        const jsonData = XLSX.utils.sheet_to_json(sheet);

        // Remove the __rowNum__ property
        const resultWithoutRowNum = jsonData.map(
          ({ __rowNum__, ...rest }) => rest
        );

        // Check if the keys are 'firstName' and 'age'
        const isValidKeys = resultWithoutRowNum.every(
          (item) =>
            Object.keys(item).length === 2 &&
            "firstName" in item &&
            "age" in item
        );

        if (!isValidKeys) {
          alert('The Excel file must have only "firstName" and "age" columns.');
          // Reset the file input
          event.target.value = null;
          return;
        }

        console.log(resultWithoutRowNum);
      };

      reader.readAsBinaryString(file);
    }
  };

  const handleBatchImportClick = () => {
    setIsOpen(true);
  };

  return (
    <div className="flex flex-col justify-start md:mt-20 p-2 max-w-[800px] max-h-[896px] md:w-full md:max-w-full">
      <div className="flex justify-center items-center gap-4 w-full">
        <div className="flex justify-center items-center p-6"></div>
      </div>
      <div className="w-full p-5">
        <TableEmployee allUser={allUser} loading={loading} />
        <Modal title="Add User" open={isOpen} onClose={() => setIsOpen(false)}>
          {/* Your batch import form can be added here */}
          <div>
            <h1>Batch Import</h1>
            <input type="file" onChange={handleFileUpload} />
            {/* Add other batch import form components here */}
          </div>
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
