import { useNewsContext } from "../hooks/useNewsContext";

export default function Filters() {
  const {
    filters,
    updateCategoryFilter,
    updateAuthorFilter,
    updateSortField,
    updateSortOrder,
    sorting,
  } = useNewsContext();
  return (
    <aside>
      <section>
        <div className='filter-heading'>Category</div>
        <ul>
          {filters.categories.map((category) => (
            <li key={category.text}>
              <label>
                <input
                  type='checkbox'
                  checked={category.checked}
                  onChange={() => updateCategoryFilter(category.text)}
                />
                {category.text}
              </label>
            </li>
          ))}
        </ul>
      </section>
      <section>
        <div className='filter-heading'>Author</div>
        <ul>
          {filters.authors.map((author) => (
            <li key={author.text}>
              <label>
                <input
                  type='checkbox'
                  checked={author.checked}
                  onChange={() => updateAuthorFilter(author.text)}
                />
                {author.text}
              </label>
            </li>
          ))}
        </ul>
      </section>
      <section>
        <div className='filter-heading'>Sort By</div>
        <label>
          <input
            type='radio'
            name='sortBy'
            value='date'
            onChange={() => updateSortField("date")}
            checked={sorting.sortBy === "date"}
          />
          Date
        </label>
        <label>
          <input
            type='radio'
            name='sortBy'
            value='title'
            onChange={() => updateSortField("title")}
            checked={sorting.sortBy === "title"}
          />
          Title
        </label>
        <button onClick={() => updateSortOrder(sorting.sortOrder === "asc" ? "desc" : "asc")}>
          {sorting.sortOrder === "asc" ? "↓" : "↑"}
        </button>
      </section>
    </aside>
  );
}
