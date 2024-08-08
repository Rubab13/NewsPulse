import React, { useState, useEffect } from "react";

export default function Main() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [visibleCount, setVisibleCount] = useState(9);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://newsapi.org/v2/everything?q=keyword&apiKey=e29de182225349808025e45179443e5c"
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const result = await response.json();
        setData(result.articles);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleLoadMore = () => {
    setVisibleCount(prevCount => prevCount + 9);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const itemsToDisplay = data.slice(0, visibleCount);

  return (
    <div className="container">
      <div className="row d-flex justify-content-center">
        {itemsToDisplay.map((item, index) => (
          <div
            className="card mx-3 my-4 p-2"
            style={{ width: "18rem" }}
            key={index}
          >
            <div className="p-2 h-50 d-flex justify-content-center align-items-center">
              <img
                className="card-img-top rounded"
                src={item.urlToImage}
                alt="Card image cap"
              />
            </div>

            <div className="card-body h-50 my-3">
              <h5 className="card-title">{item.title.substring(0, 50)}</h5>
              <p className="card-text">{item.description.substring(0, 50) + " ..."}</p>
              <a href={item.url} className="btn btn-warning" target="_blank" rel="noopener noreferrer">
                Read this article
              </a>
            </div>
          </div>
        ))}
      </div>
      {visibleCount < data.length && (
        <div className="text-center my-4">
          <button onClick={handleLoadMore} className="btn btn-outline-dark">
            Load More
          </button>
        </div>
      )}
    </div>
  );
}
