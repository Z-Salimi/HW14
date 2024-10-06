import React from "react";
import { AlarmList, IAlarmList } from "./AlarmList";



export const AllAlarms:React.FC<IAlarmList>= ({list}) => {
  return (
    <section className="w-[50vw] h-[35vh] px-2 py-5 flex flex-col gap-3 rounded-xl bg-purple-200">
      <h2 className="text-2xl font-bold text-center mb-2 text-purple-950">
        Alarm Lists
      </h2>
      <AlarmList list={list} />
    </section>
  );
};
