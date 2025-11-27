"use client";

import React from "react";
import { useFieldArray, useForm, Control, UseFormRegister, FieldErrors } from "react-hook-form";
import { sampleValidateType } from "../server-actions/initialize/action-sample-validate-schema";

export type Props = {
  control: Control<sampleValidateType>;
  register: UseFormRegister<sampleValidateType>;
  errors: FieldErrors<sampleValidateType>;
};

const ChildSample = (props: Props) => {
  return (
    <>
      <div className="mt-3 ">
        値3：
        <input
          {...props.register("value3")}
          className={`mt-1 block w-full px-3 py-2 border ${
            props.errors?.value3?.message ? "border-red-500" : "border-gray-300"
          } rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
        />
        <label className="text-red-700">{props.errors?.value3?.message}</label>
      </div>
      <div className="mt-3 ">
        値4：
        <select
          {...props.register("value4")}
          className={`mt-1 block w-full px-3 py-2 border ${
            props.errors?.value4?.message ? "border-red-500" : "border-gray-300"
          } rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
        >
          <option key="0" value="" label="選択して！" />
          {[`Good`, `Not gooooooooood!`].map((item, index) => (
            <option key={index + 1} value={index + 1} label={`${index + 1}：${item}`} />
          ))}
        </select>
        <label className="text-red-700">{props.errors?.value4?.message}</label>
      </div>
    </>
  );
};

export default ChildSample;
