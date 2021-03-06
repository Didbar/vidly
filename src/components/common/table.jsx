import React from "react";
import TableHeader from "./tableHeader";
import TableBody from "./tableBody";

const Table = ({ itemsCount, data, sortColumn, onSort, columns }) => {
  return (
    <table className="table table-hover">
      <caption style={{ captionSide: "top" }}>
        Showing {itemsCount} Movies in The Database
      </caption>
      <TableHeader columns={columns} sortColumn={sortColumn} onSort={onSort} />
      <TableBody data={data} columns={columns} />
    </table>
  );
};

export default Table;
