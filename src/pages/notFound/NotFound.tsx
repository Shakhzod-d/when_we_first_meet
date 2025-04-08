import "./NotFound.css";

function NotFound() {
  return (
    <div className="not-found-container">
      <div className="not-found-content">
        <h1 className="not-found-title">404</h1>
        <h2 className="not-found-message">
          Oops! The page you're looking for doesn't exist.
        </h2>
        <p className="not-found-description">
          We couldn't find the page you were looking for. Try checking the URL
        </p>
      </div>
    </div>
  );
}

export default NotFound;
