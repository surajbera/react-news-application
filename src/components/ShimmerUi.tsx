export default function ShimmerUi() {
  return (
    <div className='shimmer-ui-container'>
      {Array.from({ length: 4 }, (_, i) => (
        <div key={i} className='shimmer-ui-wrap'>
          {" "}
          {/* Added a key prop here for React list rendering */}
          <article>
            <div className='shimmer-top-wrap'>
              <figure className='shimmer-ui shimmer-img-wrap'>
                <div className=''></div>
              </figure>
              <div className='shimmer-content-wrap'>
                <div className='shimmer-ui shimmer-date-wrap'>
                  <span className='shimmer-ui shimmer-date'></span>
                </div>
                <h3 className='shimmer-ui shimmer-title'></h3>
                <h3 className='shimmer-ui shimmer-title'></h3>
              </div>
            </div>
            <p className='shimmer-ui shimmer-desc'></p>
            <p className='shimmer-ui shimmer-desc'></p>
            <p className='shimmer-ui shimmer-author'></p>
          </article>
        </div>
      ))}
    </div>
  );
}
