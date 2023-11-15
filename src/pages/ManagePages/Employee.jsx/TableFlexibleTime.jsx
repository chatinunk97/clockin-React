import { useState } from "react";
import ManageTable from "../../../components/ManageTable";
import SmallButton from "../../../components/SmallButton";
import useTime from "../../../hooks/use-time";
import { useEffect } from "react";
import EditFlexibleTimeForm from "./EditFlexibleTimeForm";

export default function TableFlexibleTime() {
  const [isOpen, setIsOpen] = useState(false);
  const {
    allFlexibleTime,
    setAllFlexibleTime,
    flexibleTimeById,
    setFlexibleTimeById,
    getFlexibleByUserId,
    loading,
    setLoading,
  } = useTime();

  useEffect(() => {
    setLoading(true);
    getFlexibleByUserId()
      .then((res) => {
        const timeProfileData = res.data.flexible.map((flexibleItem) => ({
          id: flexibleItem.id,
          userId: flexibleItem.userId,
          date: flexibleItem.date,
          timeProfileId: flexibleItem.timeProfileId,
        }));
        setAllFlexibleTime(timeProfileData);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <ManageTable
      columns={[
        { field: "userId", flex: 1 },
        { field: "date", flex: 1 },
        { field: "timeProfileId", flex: 1 },
        {
          field: "actionButtons",
          headerName: "",
          cellRenderer: (params) => (
            <div className="flex gap-2 justify-center items-center h-full">
              <div className="p-2">
                <SmallButton
                  onClick={() => {
                    setFlexibleTimeById(params.data);
                    setIsOpen(true);
                  }}
                />
              </div>
              <div className="p-2">
                <SmallButton
                  onClick={() => {
                    console.log(params.data.id);
                    // deleteUserLeave(params.data.id);
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
      allData={allFlexibleTime}
      loading={loading}
      editForm={
        <EditFlexibleTimeForm
          flexibleTimeById={flexibleTimeById}
          onClose={() => setIsOpen(false)}
        />
      }
      isOpen={isOpen}
      setIsOpen={setIsOpen}
    />
  );
}
