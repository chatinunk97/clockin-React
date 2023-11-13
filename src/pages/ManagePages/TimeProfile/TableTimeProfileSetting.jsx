import { useState } from "react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import ManageTable from "../../../components/ManageTable";
import SmallButton from "../../../components/SmallButton";
import EditTimeProfileSettingForm from "../TimeProfile/EditTimeProfileSettingForm";

export default function TableTimeProfileSetting({
  allTimeProfiles,
  loading,
  timeProfileById,
  setTimeProfileById,
  deleteTimeProfile,
}) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <ManageTable
      columns={[
        { field: "start", flex: 1 },
        { field: "end", flex: 1 },
        { field: "typeTime", flex: 1 },
        {
          field: "actionButtons",
          headerName: "",
          cellRenderer: (params) => (
            <div className="flex gap-2 justify-center items-center h-full">
              <div className="p-2">
                <SmallButton
                  onClick={() => {
                    setTimeProfileById(params.data);
                    setIsOpen(true);
                  }}
                />
              </div>
              <div className="p-2">
                <SmallButton
                  onClick={() => {
                    deleteTimeProfile(params.data.id);
                  }}
                  bg="bg-red-600"
                  hover="hover:bg-red-400"
                  buttonName="Delete"
                />
              </div>
            </div>
          ),
        },
      ]}
      allData={allTimeProfiles}
      loading={loading}
      editForm={
        <EditTimeProfileSettingForm
          timeProfileById={timeProfileById}
          onClose={() => setIsOpen(false)}
        />
      }
      isOpen={isOpen}
      setIsOpen={setIsOpen}
    />
  );
}
