import React, { useState } from "react";
import { FormTypes } from "./Form";
import { Modal } from "./Modal";

export interface IAlarmList {
  list: FormTypes[];
  setList: React.Dispatch<React.SetStateAction<FormTypes[]>>;
  sort?: "time" | "title";
}
export const AlarmList: React.FC<IAlarmList> = ({ list, setList}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentValues, setCurrentValues] = useState<FormTypes>({
    AlarmTitle: "",
    AlarmDescription: "",
    AlarmTime: "",
  });
  const [sort, setSort] = useState<"time" | "title">("time");
  const [sortedList, setSortedList] = useState<FormTypes[]>([]);
  const [currentAlarm, setCurrentAlarm] = useState<FormTypes | null>(null);

  const removeItems = (index: number) => {
    console.log(index);
    const updatedList = list.filter((_, id) => id !== index);
    setList(updatedList);
    
  };

  const editItems = (index:number) => {
    setCurrentValues(list[index]);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    setCurrentAlarm(null);
  };

  React.useEffect(() => {
    const checkAlarms = () => {
      const now = new Date().toISOString().slice(0, 16);
      list.forEach((alarm) => {
        if (alarm.AlarmTime === now) {
          setCurrentAlarm(alarm);
          setIsOpen(true);
        }
      });
    };

    const interval = setInterval(checkAlarms, 60000); // چک کردن هر دقیقه
    return () => clearInterval(interval);
  }, [list]);


  const extendAlarm = (id: string, minutes: number) => {
    const updatedList = list.map((item) => {
      if (item.id === id) {
        const newTime = new Date(new Date(item.AlarmTime).getTime() + minutes * 60000).toISOString().slice(0, 16);
        return { ...item, AlarmTime: newTime };
      }
      return item;
    });
    setList(updatedList);
  };

  React.useEffect(() => {
    const sorted = [...list].sort((a, b) => {
      if (sort === "time") {
        return a.AlarmTime.localeCompare(b.AlarmTime);
      } else {
        return a.AlarmTitle.localeCompare(b.AlarmTitle);
      }
    });
    setSortedList(sorted);
  }, [list, sort]);

  return (
    <div className="flex flex-col gap-y-3 overflow-y-auto w-full px-5 ">
      {sortedList.map((list, index) => (
        <section
        key={index}
          className="rounded-lg bg-purple-800 flex flex-col py-3 px-8 md:flex-row"
        >
          <div className="flex flex-col justify-center items-center w-full md:items-start">
            <h3 className="text-[17px] font-medium text-white">
              {list.AlarmTitle}
            </h3>
            <p className="text-[10px] text-white">{list.AlarmDescription}</p>
            <h3 className="text-lg font-semibold text-white">
              {list.AlarmTime}
            </h3>
          </div>
          <div className="flex flex-col gap-y-3 justify-center items-center gap-x-3 md:flex-row">
            <button
              onClick={()=> editItems(index)}
              className="bg-yellow-50 border-[3px] border-yellow-600 text-sm px-3 py-1 rounded-md font-medium"
            >
              Edit
            </button>
            <button
              onClick={() => removeItems(index)}
              className="bg-red-100 border-[3px] border-red-700 text-sm px-3 py-1 rounded-md font-medium"
            >
              Delete
            </button>
          </div>
        </section>
      ))}
      {isOpen && <Modal data={list} setData={setList} close={closeModal}initialValues={currentValues} />}
    </div>
  );
};
