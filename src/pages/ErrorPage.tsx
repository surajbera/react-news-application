export default function ErrorPage() {
  return (
    <div className='error-page'>
      <div className='container'>
        <div className='error-page-wrapper'>
          <h1>404 Not Found 😢</h1>
          <p className='text'>The page you're looking for doesn't exist or may have been moved.</p>
          <p className='text'>
            If you entered the web address, check it is entered correctly. It's possible that the
            page you are looking for has been moved or no longer exists.
          </p>
          <button onClick={() => (window.location.href = "/")}>Home Page</button>
        </div>
      </div>
    </div>
  );
}
