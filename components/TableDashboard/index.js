import React from "react";

const TableDashboard = ({ columns, data, showHead }) => {
  return (
    // <div>
    //   <table className="w-full bg-transparent mb-8">
    //     {showHead && (
    //       <thead>
    //         <tr className="bg-transparent text-left">
    //           {columns.map((column) => (
    //             <th key={column.key} className="py-2">
    //               {column.title}
    //             </th>
    //           ))}
    //         </tr>
    //       </thead>
    //     )}
    //     <tbody>
    //       {data.map((item) => (
    //         <tr key={item.key} className="bg-transparent">
    //           {columns.map((column) => (
    //             <td key={column.key} className="py-2">
    //               {item[column.dataIndex]}
    //             </td>
    //           ))}
    //         </tr>
    //       ))}
    //     </tbody>
    //   </table>
    // </div>
    <div className="overflow-x-auto">
      <table className="w-full bg-transparent mb-8">
        {showHead && (
          <thead>
            <tr className="bg-transparent text-left">
              {columns.map((column, index) => (
                <th key={index} className="py-2">
                  {column.title}
                </th>
              ))}
            </tr>
          </thead>
        )}
        <tbody>
          {data.map((item, rowIndex) => (
            <tr key={rowIndex} className="bg-transparent">
              {columns.map((column, colIndex) => (
                <td key={colIndex} className="py-2 md:w-1/4">
                  {item[column.dataIndex]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TableDashboard;
