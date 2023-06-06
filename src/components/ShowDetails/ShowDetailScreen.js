import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import "./ShowDetailsScreen.css";

const ShowDetailsScreen = () => {
  const { id } = useParams();
  const [show, setShow] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);

  useEffect(() => {
    const fetchShowDetails = async () => {
      try {
        const response = await axios.get(`https://api.tvmaze.com/shows/${id}`);
        setShow(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchShowDetails();
  }, [id]);

  const handleBookTicket = () => {
    setIsFormOpen(true);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const name = event.target.elements.name.value;
    const email = event.target.elements.email.value;
    const date = event.target.elements.date.value;
    const quantity = event.target.elements.quantity.value;

    localStorage.setItem("name", name);
    localStorage.setItem("email", email);
    localStorage.setItem("date", date);
    localStorage.setItem("quantity", quantity);

    setIsFormOpen(false);
  };

  if (!show) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container">
      <h1>{show.name}</h1>
      <div
        className="show-summary"
        dangerouslySetInnerHTML={{ __html: show.summary }}
      ></div>
      {isFormOpen ? (
        <div className="ticket-form">
          <h2>Book Ticket</h2>
          <form onSubmit={handleSubmit}>
            <label htmlFor="movieName">Movie Name:</label>
            <input type="text" id="movieName" value={show.name} disabled />

            <label htmlFor="name">Name:</label>
            <input type="text" id="name" />

            <label htmlFor="email">Email:</label>
            <input type="email" id="email" />

            <label htmlFor="date">Date:</label>
            <input type="date" id="date" />

            <label htmlFor="quantity">Quantity:</label>
            <input type="number" id="quantity" />

            <button type="submit">Submit</button>
          </form>
        </div>
      ) : (
        <button className="book-ticket-button" onClick={handleBookTicket}>
          Book Ticket
        </button>
      )}
      <Link to="/">Back to Home</Link>
    </div>
  );
};

export default ShowDetailsScreen;
