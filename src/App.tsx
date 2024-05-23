import "./assets/styles/index.scss";
import Filters from "./components/Filters";
import NewsList from "./components/NewsList";

function App() {
  return (
    <>
      <div className='root-wrapper'>
        <div className='container'>
          <div className='news-content'>
            <div className='left-wrap'>
              <Filters />
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

export default App;
