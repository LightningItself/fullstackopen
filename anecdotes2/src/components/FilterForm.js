import { useState } from "react";
import { useDispatch } from "react-redux";
import { setFilter } from "../reducers/filterReducer";

const FilterForm = () => {
  const dispatch = useDispatch();
  const [filterText, setFilterText] = useState("");
  const changeHandler = (filter) => {
    setFilterText(filter);
    dispatch(setFilter(filter));
  };

  return (
    <div>
      <h3>Filter Anecdotes</h3>
      <input
        value={filterText}
        onChange={(e) => changeHandler(e.target.value)}
      />
    </div>
  );
};
export default FilterForm;
