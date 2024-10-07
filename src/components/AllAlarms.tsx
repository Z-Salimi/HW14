import React from "react";
import { AlarmList, IAlarmList } from "./AlarmList";

export const AllAlarms: React.FC<IAlarmList> = ({ list, setList }) => {
  const [sort, setSort] = React.useState<"time" | "title">("time");

  const sortTitle = () => {
    setSort("title");
  };

  const sortTime = () => {
    setSort("time");
  };

  return (
    <section className="w-[50vw] h-[35vh] px-2 py-5 flex flex-col items-center gap-3 rounded-xl bg-purple-200">
      <h2 className="text-2xl font-bold text-center mb-2 text-purple-950">
        Alarm Lists
      </h2>
      <div className="flex items-center justify-around py-1 gap-5 w-[93%] rounded-lg bg-pink-800">
        <button
          type="button"
          onClick={sortTitle}
          className="rounded-md bg-purple-400 px-2 py-1 text-sm font-medium text-gray-900  hover:bg-purple-200 sm:w-auto"
        >
          Sort by Title
        </button>
        <button
          type="button"
          onClick={sortTime}
          className="rounded-md bg-pink-200 px-2 py-1 text-sm font-medium text-gray-900  hover:bg-pink-100 sm:w-auto"
        >
          Sort by Time
        </button>
      </div>
      <AlarmList list={list} setList={setList} sort ={sort}/>
    </section>
  );
};
