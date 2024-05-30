import { useNewsContext } from "../hooks/useNewsContext";
import FilterHeading from "./FilterHeading";
import { FaArrowUp, FaArrowDown } from "react-icons/fa";
import FilterShimmer from "./FilterShimmer";

// styles
import "../assets/styles/Filters.scss";

export default function Filters() {
  const {
    filters,
    updateCategoryFilter,
    updateAuthorFilter,
    updateSortField,
    updateSortOrder,
    sorting,
    loading,
  } = useNewsContext();

  const isFiltersLoading =
    loading || (filters.categories.length === 0 && filters.authors.length === 0);

  return (
    <aside className='sidebar'>
      <section>
        <FilterHeading text='Category' />
        <ul className='label-container'>
          {isFiltersLoading && <FilterShimmer />}
          {filters.categories.map((category) => (
            <li key={category.text}>
              <label>
                <input
                  type='checkbox'
                  checked={category.checked}
                  onChange={() => updateCategoryFilter(category.text)}
                />
                <span>{category.text}</span>
              </label>
            </li>
          ))}
        </ul>
      </section>
      <section>
        <FilterHeading text='Author' />
        <ul className='label-container'>
          {isFiltersLoading && <FilterShimmer />}
          {filters.authors.map((author) => (
            <li key={author.text}>
              <label>
                <input
                  type='checkbox'
                  checked={author.checked}
                  onChange={() => updateAuthorFilter(author.text)}
                />
                <span>{author.text}</span>
              </label>
            </li>
          ))}
        </ul>
      </section>
      <section className='sort-by-wrap'>
        <FilterHeading text='Sort By' />
        <div className='label-container'>
          <div className='sort-by-text-wrap'>
            <label>
              <input
                type='radio'
                name='sortBy'
                value='date'
                onChange={() => updateSortField("date")}
                checked={sorting.sortBy === "date"}
              />
              <span>Date</span>
            </label>
          </div>
          <div className='sort-by-text-wrap'>
            <label>
              <input
                type='radio'
                name='sortBy'
                value='title'
                onChange={() => updateSortField("title")}
                checked={sorting.sortBy === "title"}
              />
              <span>Title</span>
            </label>
          </div>
          <button
            className='sort-order-btn'
            onClick={() => updateSortOrder(sorting.sortOrder === "asc" ? "desc" : "asc")}
          >
            {sorting.sortOrder === "asc" ? <FaArrowUp /> : <FaArrowDown />}
          </button>
        </div>
      </section>
    </aside>
  );
}
