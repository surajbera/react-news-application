import { useState } from "react";
import { IoFilterSharp } from "react-icons/io5";
import { MdOutlineCancel } from "react-icons/md";
import Filters from "../components/Filters";
import NewsList from "../components/NewsList";

export default function HomePage() {
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  function handleFilterToggle() {
    setIsFilterOpen((prev) => !prev);
  }

  return (
    <>
      <div className='root-wrapper'>
        <div className='container'>
          <header className='header'>
            <button className='header-filter-icon' onClick={handleFilterToggle}>
              {isFilterOpen ? <MdOutlineCancel /> : <IoFilterSharp />}
            </button>
          </header>
          <div className='news-content'>
            <div className={`left-wrap ${isFilterOpen ? "filter-block-visible" : ""}`}>
              {<Filters />}
            </div>
            <div className='right-wrap'>
              <NewsList />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
