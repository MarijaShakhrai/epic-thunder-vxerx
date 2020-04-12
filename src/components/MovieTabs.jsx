import React from "react";
var classNames = require("classnames");

const MovieTabs = props => {
  const { sort_by, updateSortBy } = props;
  const handleClick = value => () => {
    updateSortBy(value);
  };
  const getClassLink = value => {
    //return `nav-link ${sort_by === value ? "active" : ""}`;
    return classNames("nav-link", { active: sort_by === value });
  };

  const tabs = [
    { name: "Popularity desc", key: "popularity.desc" },
    { name: "Revenue desc", key: "revenue.desc" },
    { name: "Vote average desc", key: "vote_average.desc" }
  ];

  return (
    <ul className="tabs nav nav-pills">
      {tabs.map(tab => {
        return (
          <li className="nav-item">
            <div
              className={getClassLink(tab.key)}
              onClick={handleClick(tab.key)}
            >
              {tab.name}
            </div>
          </li>
        );
      })}
      {/*  <li className="nav-item">
        <div
          className={getClassLink("popularity.desc")}
          onClick={handleClick("popularity.desc")}
        >
          Popularity desc
        </div>
      </li>
      <li className="nav-item">
        <div
          className={getClassLink("revenue.desc")}
          onClick={handleClick("revenue.desc")}
        >
          Revenue desc
        </div>
      </li>
      <li className="nav-item">
        <div
          className={getClassLink("vote_average.desc")}
          onClick={handleClick("vote_average.desc")}
        >
          Vote average desc
        </div>
      </li>
    */}
    </ul>
  );
};

export default MovieTabs;
