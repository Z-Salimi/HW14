import React, { useState, useEffect } from "react";
import { FormTypes } from "./Form";
import { Modal } from "./Modal";
import { AlarmModal } from "./AlarmModal";

export interface IAlarmList {
  list: FormTypes[];
  setList: React.Dispatch<React.SetStateAction<FormTypes[]>>;
  sort?: "time" | "title";
}

export const AlarmList: React.FC<IAlarmList> = ({ list, setList, sort }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [alarm, setAlarm] = useState(false);
  const [currentValues, setCurrentValues] = useState<FormTypes>({
    AlarmTitle: "",
    AlarmDescription: "",
    AlarmTime: "",
  });
  const [sortedList, setSortedList] = useState<FormTypes[]>([]);
  const [currentAlarmTime, setCurrentAlarmTime] = useState<string>("");
  const audio = new Audio("/src/assets/Apple Ringtone 3.mp3");

  const removeItems = (index: number) => {
    const updatedList = list.filter((_, id) => id !== index);
    setList(updatedList);
  };

  const editItems = (index: number) => {
    setCurrentValues(list[index]);
    setIsOpen(true);
  };

  const closeModal = () => {
    audio.pause();
    setIsOpen(false);
    setAlarm(false);
    setCurrentAlarmTime("");
  };

  const convertToFullDate = (time: any) => {
    const today = new Date().toISOString().split("T")[0];
    return `${today}T${time}:00`;
  };

  useEffect(() => {
    const sorted = [...list].sort((a, b) => {
      const dateA = new Date(convertToFullDate(a.AlarmTime)).getTime();
      const dateB = new Date(convertToFullDate(b.AlarmTime)).getTime();

      if (isNaN(dateA) || isNaN(dateB)) {
        console.error("Invalid date format", a.AlarmTime, b.AlarmTime);
        return 0;
      }

      if (sort === "time") {
        return dateA - dateB;
      } else {
        return a.AlarmTitle.localeCompare(b.AlarmTitle);
      }
    });
    setSortedList(sorted);
  }, [list, sort]);

  useEffect(() => {
    const triggeredAlarms = new Set();

    const checkAlarms = () => {
      const now = new Date().getTime();

      list.forEach((alarm) => {
        const alarmTime = new Date(
          convertToFullDate(alarm.AlarmTime)
        ).getTime();

        if (alarmTime <= now && !triggeredAlarms.has(alarm.AlarmTime)) {
          setCurrentValues(alarm);
          setCurrentAlarmTime(alarm.AlarmTime);
          setAlarm(true);
          triggeredAlarms.add(alarm.AlarmTime);
          audio.play();
          setTimeout(() => {
            audio.pause();
          }, 5000);
        }
      });
    };

    const interval = setInterval(checkAlarms, 1000);
    return () => clearInterval(interval);
  }, [list]);


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
              onClick={() => editItems(index)}
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
      {isOpen && (
        <Modal
          data={sortedList}
          setData={setSortedList}
          close={closeModal}
          initialValues={currentValues}
        />
      )}
      {alarm && (
        <AlarmModal
          data={list}
          setData={setList}
          close={closeModal}
          alarmTime={currentAlarmTime}
        />
      )}
    </div>
  );
};
