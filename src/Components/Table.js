import React from "react";

const TableHeader = ({
  AdditionalRowClasses,
  AdditionalHeaderClasses,
  Headers,
}) => {
  return (
    <thead>
      <tr
        className={`${AdditionalRowClasses} text-lg bg-slate-900 text-slate-100`}
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
          ? "bg-violet-900/50 border-t-[1px] border-slate-400 first:border-none"
          : "border-t-[1px] border-slate-400"
      }
    >
      <td className="text-center p-2">
        <input
          className="accent-violet-900 mx-auto text-2xl p-4 w-9 h-9 l"
          type="checkbox"
          required
          disabled={disabled}
          id={keys}
          checked={value.present}
          // value={student.present}
          onChange={(e) => handleFormChange(e)}
        />
      </td>
      <td className=" text-center text-lg font-medium px-4 py-2">
        {value.student?.name || value?.name}
      </td>
    </tr>
  );
};

export { RowWithCheckbox, TableHeader };
