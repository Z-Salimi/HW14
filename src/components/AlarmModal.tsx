import React, { useState, useEffect } from "react";
import { FormTypes } from "./Form";

interface IAlarmModal {
  close: () => void;
  data: FormTypes[];
  setData: React.Dispatch<React.SetStateAction<FormTypes[]>>;
  alarmTime: string;
}

export const AlarmModal: React.FC<IAlarmModal> = ({
  data,
  setData,
  close,
  alarmTime,
}) => {
  const [showModal, setShowModal] = useState(false);
  const audio = new Audio("/src/assets/Apple Ringtone 3.mp3");

  const handleExtension = () => {
    try {
      // Extract the hours and minutes from the alarm time
      const [hours, minutes] = alarmTime.split(":").map(Number);

      // Get today's date and set the hours and minutes
      const alarmDate = new Date();
      alarmDate.setHours(hours, minutes, 0, 0);

      console.log("Original alarm date and time:", alarmDate);

      alarmDate.setMinutes(alarmDate.getMinutes() + 5);

      console.log("Updated alarm date and time:", alarmDate);

      const hour = String(alarmDate.getHours()).padStart(2, "0");
      const minute = String(alarmDate.getMinutes()).padStart(2, "0");

      // Create a formatted string in the 'HH:MM' format
      const newAlarmTime = `${hour}:${minute}`;

      console.log("New Alarm time (local):", newAlarmTime);

      // Update the alarm list with the new time
      setData((prevData) =>
        prevData.map((item) =>
          item.AlarmTime === alarmTime
            ? { ...item, AlarmTime: newAlarmTime }
            : item
        )
      );

      setShowModal(false);
      close();
    } catch (error) {
      console.error("Error extending alarm:", error);
    }
  };

  const handleTurnOff = () => {
    audio.pause();
    setShowModal(false);
    close();
  };

  const handleDelete = () => {
    setData((prevData) =>
      prevData.filter((item) => item.AlarmTime !== alarmTime)
    );
    setShowModal(false);
    close();
  };

  useEffect(() => {
    const alarmDate = new Date(alarmTime);
    const now = new Date();

    if (alarmDate <= now) {
      setShowModal(true);
      
      audio.play();
    }
  }, [alarmTime]);
  console.log(showModal);

  return (
    <div
      className="relative z-10"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      <div
        className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
        aria-hidden="true"
      ></div>

      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
            <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
              <div className="sm:flex sm:items-start">
                <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-yellow-200 sm:mx-0 sm:h-10 sm:w-10">
                  <svg
                    className="h-6 w-6 text-orange-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    aria-hidden="true"
                    data-slot="icon"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z"
                    />
                  </svg>
                </div>
                <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                  <h3
                    className="text-xl font-semibold leading-6 text-gray-900"
                    id="modal-title"
                  >
                    Alarm
                  </h3>
                  <div className="mt-2">
                    <h2>{alarmTime}</h2>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
              <button
                type="button"
                onClick={handleExtension}
                className="inline-flex w-full justify-center rounded-md bg-green-700 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-500 sm:ml-3 sm:w-auto"
              >
                Extension
              </button>
              <button
                type="button"
                onClick={handleTurnOff}
                className="mt-3 inline-flex w-full justify-center ml-3 rounded-md bg-blue-200 px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
              >
                Turn Off
              </button>
              <button
                type="button"
                onClick={handleDelete}
                className="mt-3 inline-flex w-full justify-center rounded-md bg-red-400 px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
