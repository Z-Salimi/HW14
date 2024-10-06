import React from "react";
import { FormTypes } from "./Form";

export interface IAlarmList {
  list: FormTypes[];
}
export const AlarmList: React.FC<IAlarmList> = ({ list }) => {
  return (
    <div className="flex flex-col gap-y-3 overflow-y-auto w-full px-5 ">
      {list.map((list, index) => (
        <section className="rounded-lg bg-purple-800 flex flex-col py-3 px-8 md:flex-row">
          <div key={index} className="flex flex-col justify-center items-center w-full md:items-start">
            <h3 className="text-[17px] font-medium text-white">{list.AlarmTitle}</h3>
            <p className="text-[10px] text-white">{list.AlarmDescription}</p>
            <h3 className="text-lg font-semibold text-white">{list.AlarmTime}</h3>
          </div>
          <div className="flex flex-col gap-y-3 justify-center items-center gap-x-3 md:flex-row">
            <button className="bg-yellow-50 border-[3px] border-yellow-600 text-sm px-3 py-1 rounded-md font-medium">
              Edit
            </button>
            <button className="bg-red-100 border-[3px] border-red-700 text-sm px-3 py-1 rounded-md font-medium">
              Delete
            </button>
          </div>
        </section>
      ))}
    </div>
  );
};
