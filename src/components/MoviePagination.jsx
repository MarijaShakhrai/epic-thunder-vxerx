import React from "react";
const MoviePagination = props => {
  const { page, totalPage, nextPage, prevPage, toPage } = props;
  const handleClick = value => () => {
    toPage(value);
  };
  return (
    <div>
      <div>
        <button className="btn btn-default" onClick={handleClick(1)}>
          First
        </button>
        <button className="btn btn-default" onClick={prevPage}>
          Previous
        </button>

        <button className="btn"> {page}</button>

        <button className="btn btn-default" onClick={nextPage}>
          Next
        </button>
        <button className="btn btn-default" onClick={handleClick(totalPage)}>
          Last
        </button>
      </div>
      Total page: {totalPage}
    </div>
  );
};

export default MoviePagination;
