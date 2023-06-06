import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./HomeScreen.css";

const HomeScreen = () => {
  const [shows, setShows] = useState([]);

  useEffect(() => {
    const fetchShows = async () => {
      try {
        const response = await axios.get(
          "https://api.tvmaze.com/search/shows?q=all"
        );
        setShows(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchShows();
  }, []);

  return (
    <div className="container">
      <h1>TV Shows</h1>
      <div className="show-list">
        {shows.map((show) => (
          <div className="show-card" key={show.show.id}>
            {show.show.image && (
              <img
                className="show-image"
                src={show.show.image.medium}
                alt={show.show.name}
              />
            )}
            <h2 className="show-title">{show.show.name}</h2>
            <div
              className="show-summary"
              dangerouslySetInnerHTML={{ __html: show.show.summary }}
            ></div>
            <Link to={`/show/${show.show.id}`}>
              <button className="show-details-button">Show Details</button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomeScreen;
