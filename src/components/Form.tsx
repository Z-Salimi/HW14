import React from "react";
import { Inputs } from "./Inputs";
import { AllAlarms } from "./AllAlarms";

export interface FormTypes {
  AlarmTitle: string;
  AlarmDescription: string;
  AlarmTime: string;
}

export const Form = () => {
  const [values, setValues] = React.useState<FormTypes>({
    AlarmTitle: "",
    AlarmDescription: "",
    AlarmTime: "",
  });

  const [validation, setValidation] = React.useState(false);
  const [list, setList] = React.useState<FormTypes[]>([]);

  const validationForm = (values: FormTypes) => {
    const valid = Object.values(values).every((value) => value.trim() !== "");
    setValidation(valid);
  };

  const inputChangeHandler = (inputs: keyof FormTypes, value: string) => {
    const newValues = { ...values, [inputs]: value };
    setValues(newValues);
    validationForm(newValues);
  };

  const submit = (event: React.FormEvent) => {
    event.preventDefault();
    if (validation) {
      setList([...list, values]);
      setValues({
        AlarmTitle: "",
        AlarmDescription: "",
        AlarmTime: "",
      });
      setValidation(false);
    } else {
      console.log("Form is not valid");
    }
  };

  return (
    <section className="flex flex-col items-center gap-y-5 w-full h-screen bg-cyan-900 p-4">
      <form
        onSubmit={submit}
        className="flex flex-col items-center p-10 rounded-xl bg-cyan-100 max-w-[50vw] w-full"
      >
        <p className="text-cyan-900 font-semibold text-3xl mb-8">Reminder</p>
        <div className="flex flex-col justify-around items-center gap-x-3 rounded-xl bg-cyan-100 max-w-[50vw] w-full">
          <Inputs
            label="Alarm Title:"
            type="text"
            onChangeH={(event) => inputChangeHandler("AlarmTitle", event)}
            validator={(value) => value.length >= 3}
            error="invalid value."
          />
          <Inputs
            label="Alarm Description:"
            type="text"
            onChangeH={(event) => inputChangeHandler("AlarmDescription", event)}
            validator={(value) => value.length >= 3}
            error="invalid value."
          />
          <Inputs
            label="Alarm Time:"
            type="time"
            onChangeH={(event) => inputChangeHandler("AlarmTime", event)}
            validator={(value) => value !== ""}
            error="invalid value."
          />
        </div>

        <button
          type="submit"
          className={`py-1.5 w-[90%] mt-5 bg-blue-800 text-white font-semibold rounded-md transition-all duration-300 hover 
            ${!validation ? "disabled:bg-blue-400" : "active:bg-yellow-700"}`}
          disabled={!validation}
        >
          Submit
        </button>
      </form>
      <AllAlarms list={list} />
    </section>
  );
};
