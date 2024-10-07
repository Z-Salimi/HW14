import React, { useState } from "react";
import { Inputs } from "./Inputs";
import { FormTypes } from "./Form";

interface IModal {
  close: () => void;
  data: FormTypes[];
  setData: React.Dispatch<React.SetStateAction<FormTypes[]>>;
  initialValues: FormTypes;
}

interface IInputTypes {
  AlarmTitle: string;
  AlarmDescription: string;
}

export const Modal: React.FC<IModal> = ({
  close,
  data,
  setData,
  initialValues,
}) => {

  const [values, setValues] = React.useState<IInputTypes>({
    AlarmTitle: initialValues.AlarmTitle,
    AlarmDescription: initialValues.AlarmDescription,
  });

  const [validation, setValidation] = React.useState(false);

  const validationForm = (values: IInputTypes) => {
    const valid = Object.values(values).every((value) => value.trim() !== "");
    setValidation(valid);
  };

  const inputChangeHandler = (inputs: keyof IInputTypes, value: string) => {
    const newValues = { ...values, [inputs]: value };
    setValues(newValues);
    validationForm(newValues);
  };

  const submit = (event: React.FormEvent) => {
    event.preventDefault();
    if (validation) {
      const updatedData = data.map((item) =>
        item.AlarmTitle === initialValues.AlarmTitle
          ? { ...item, ...values }
          : item
      );
      setData(updatedData);
      setValues({
        AlarmTitle: "",
        AlarmDescription: "",
      });
      setValidation(false);
      close();
    } else {
      console.log("Form is not valid");
    }
  };

  React.useEffect(() => {
    validationForm(values);
  }, [values]);

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
                    stroke-width="1.5"
                    stroke="currentColor"
                    aria-hidden="true"
                    data-slot="icon"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z"
                    />
                  </svg>
                </div>
                <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                  <h3
                    className="text-base font-semibold leading-6 text-gray-900"
                    id="modal-title"
                  >
                    Edit Alarm
                  </h3>
                  <form className="mt-2">
                    <Inputs
                      label="Alarm Title:"
                      type="text"
                      value={values.AlarmTitle}
                      onChangeH={(value) =>
                        inputChangeHandler("AlarmTitle", value)
                      }
                      validator={(value) => value.length >= 3}
                      error="invalid value."
                    />
                    <Inputs
                      label="Alarm Description:"
                      type="text"
                      value={values.AlarmDescription}
                      onChangeH={(value) =>
                        inputChangeHandler("AlarmDescription", value)
                      }
                      validator={(value) => value.length >= 3}
                      error="invalid value."
                    />
                  </form>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
              <button
                type="button"
                onClick={submit}
                className={`inline-flex w-full justify-center rounded-md bg-green-700 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-500 sm:ml-3 sm:w-auto
                ${
                  !validation ? "disabled:bg-green-400" : "active:bg-green-700"
                }`}
                disabled={!validation}
              >
                Save
              </button>
              <button
                type="button"
                onClick={close}
                className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
