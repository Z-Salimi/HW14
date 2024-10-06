import React from "react";

interface Iinput {
  label: string;
  type: React.HTMLInputTypeAttribute | undefined;
  error?: string;
  onChangeH?: (_: string) => unknown;
  validator?: (_: string) => boolean;
  defaultValue?: string;
}

export const Inputs: React.FC<Iinput> = ({
  label,
  type,
  onChangeH,
  error,
  validator,
  defaultValue = "",
}) => {
  const [value, setValue] = React.useState<string>(defaultValue);
  const [inputError, setInputError] = React.useState<string>("");

  const onChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    const newValue = event.target.value;
    setValue(newValue);

    if (validator && !validator(newValue)) {
      setInputError(error || "Invalid value");
    } else {
      setInputError("");
    }

    if (onChangeH) onChangeH(newValue);
  };

  return (
    <section className="flex flex-col mb-5 items-center justify-center w-full">
      <div className=" flex flex-col items-center justify-center w-full md:flex-row ">
      <label className="text-[16px] font-semibold text-cyan-700 w-full  md:w-[38%]">{label}</label>
      <input
        type={type}
        placeholder={"Enter " + label}
        onChange={onChange}
        className= {` w-full px-2 py-1 bg-slate-100 border-[2px] border-slate-600 rounded-lg md:w-1/2 ${inputError && "border-red-500"}`}
        value={value}
      />
      </div>
      {inputError && <p className="text-red-500 text-xs mt-1 font-medium">{inputError}</p>}
    </section>
  );
};
