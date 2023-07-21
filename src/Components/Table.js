import React from "react";

const TableHeader = ({
  AdditionalRowClasses,
  AdditionalHeaderClasses,
  Headers,
}) => {
  return (
    <thead>
      <tr
        className={`${AdditionalRowClasses} bg-slate-900 text-lg text-slate-100`}
      >
        {Headers.map((header, i) => (
          <th key={i} className={`${AdditionalHeaderClasses} p-3`}>
            {header}
          </th>
        ))}
      </tr>
    </thead>
  );
};

const RowWithCheckbox = ({ keys, disabled, value, handleFormChange }) => {
  return (
    <tr
      key={keys}
      className={
        value.present
          ? "border-t-[1px] border-slate-400 bg-violet-900/50 first:border-none"
          : "border-t-[1px] border-slate-400"
      }
    >
      <td className="p-2 text-center">
        <input
          className="l mx-auto h-9 w-9 p-4 text-2xl accent-violet-900"
          type="checkbox"
          required
          disabled={disabled}
          id={keys}
          checked={value.present}
          // value={student.present}
          onChange={(e) => handleFormChange(e)}
        />
      </td>
      <td className=" px-4 py-2 text-center text-lg font-medium">
        {value.student?.name || value?.name}
      </td>
    </tr>
  );
};

export { RowWithCheckbox, TableHeader };
