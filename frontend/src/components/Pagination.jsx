import React, { useState } from "react";
import ReactPaginate from "react-paginate";

const Pagination = ({ pageCount, onPageChange }) => {
    
  const handlePageClick = (data) => {
    const selectedPage = data.selected + 1;
    onPageChange(selectedPage);
  };

  return (
    <ReactPaginate
      pageCount={pageCount}
      pageRangeDisplayed={3}
      marginPagesDisplayed={2}
      onPageChange={handlePageClick}
      containerClassName={"pagination"}
      activeClassName={"active"}
    />
  );
};

export default Pagination;
