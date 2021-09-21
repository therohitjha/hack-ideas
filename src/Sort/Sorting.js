import { useState, useRef, forwardRef, useImperativeHandle } from "react";
import "./Sorting.css";

const Sorting = forwardRef(({ handleChange, disable }, ref) => {
  const sortRef = useRef();
  const [sortOption, setSortOption] = useState("");

  const handleSortChange = (e) => {
    setSortOption(e.target.value);
    handleChange({ value: e.target.value });
  };

  useImperativeHandle(ref, () => ({
    value() {
      return sortRef.current.value;
    },
  }));

  return (
    <div className="sort-container">
      <label>Sort:</label>
      <span className="select-dropdown">
        <select
          ref={sortRef}
          value={sortOption}
          onChange={handleSortChange}
          disabled={disable}
        >
          <option value="">Sort</option>
          <option value="likes">Likes</option>
          <option value="dislikes">Dislikes</option>
          <option value="createdOn">Created Date</option>
        </select>
      </span>
    </div>
  );
});

export default Sorting;
