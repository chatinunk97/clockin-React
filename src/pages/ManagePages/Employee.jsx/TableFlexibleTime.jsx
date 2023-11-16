import { useState } from "react";
import ManageTable from "../../../components/ManageTable";
import SmallButton from "../../../components/SmallButton";
import useTime from "../../../hooks/use-time";
import { useEffect } from "react";
import EditFlexibleTimeForm from "./EditFlexibleTimeForm";
import CustomizedButtons from "../../../components/ButtonCustomization";
import Modal from "../../../components/Modal";
import AddFlexibleTimeForm from "./AddFlexibleTimeForm";
import { useParams } from "react-router-dom";

export default function TableFlexibleTime() {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpen2, setIsOpen2] = useState(false);
  const [flexibleOptions, setFlexibleOptions] = useState([]);
  const { userId } = useParams();
  const {
    allFlexibleTime,
    setAllFlexibleTime,
    flexibleTimeById,
    setFlexibleTimeById,
    getFlexibleByUserId,
    loading,
    setLoading,
    deleteFlexible,
    getAllTimeProfile,
  } = useTime();

  useEffect(() => {
    setLoading(true);
    getFlexibleByUserId(userId)
      .then((res) => {
        const flexibleData = res.data.flexible.map((flexibleItem) => ({
          id: flexibleItem.id,
          date: flexibleItem.date,
          typeTime: flexibleItem.timeProfile.typeTime,
          start: flexibleItem.timeProfile.start,
          end: flexibleItem.timeProfile.end,
        }));
        setAllFlexibleTime(flexibleData);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);
  useEffect(() => {
    getAllTimeProfile().then((res) => {
      setFlexibleOptions(res.data.allTimeProfiles);
    });
  }, []);
  return (
    <>
      <div className="flex justify-between p-2">
        <div className="text-2xl font-bold">Flexible Time</div>
        <CustomizedButtons
          onClick={() => {
            setIsOpen2(true);
          }}
          buttonName="Add Flexible Time"
        />
      </div>

      <Modal
        title="Add Flexible Time"
        open={isOpen2}
        onClose={() => setIsOpen2(false)}
      >
        <AddFlexibleTimeForm
          userId={userId}
          flexibleOptions={flexibleOptions}
        />
      </Modal>
      <ManageTable
        columns={[
          { field: "date", flex: 1 },
          { field: "typeTime", flex: 1 },
          { field: "start", flex: 1 },
          { field: "end", flex: 1 },
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
                      deleteFlexible(params.data.id);
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
    </>
  );
}
