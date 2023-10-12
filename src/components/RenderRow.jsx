import React from "react";

const renderRow = (label, ...numbers) => {
  return (
    <div className="row">
      <th className="col-4 text-box " scope="row">
        {label}
      </th>
      {numbers.map((number, index) => (
        <td key={index} className="col number-box">
          {number}
        </td>
      ))}
    </div>
  );
};

export default renderRow;
