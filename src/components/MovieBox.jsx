import React from "react";
import { useState } from "react";
import { Modal, show, Button } from "react-bootstrap";
const API_IMG = "https://image.tmdb.org/t/p/w500//";
export const MovieBox = ({
  title,
  poster_path,
  vote_average,
  release_date,
  overview,
}) => {
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  return (
    <div className="card text-center bg-seceondary mb-3">
      <div className="card-body">
        <img src={API_IMG + poster_path} alt="" className="card-img-top" />
        <div className="card-body">
          <button type="button" className="btn btn-dark" onClick={handleShow}>
            View Mobile
          </button>
          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title></Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <img
                src={API_IMG + poster_path}
                alt=""
                className="card-img-top"
              />
              <h3>{title}</h3>
              <h4>ImDB: {vote_average}</h4>
              <h5>Ralease Date: {release_date}</h5>
              <p>{overview}</p>
            </Modal.Body>
            <Modal.Footer>
              <Button className="btn btn-secondary" onClick={handleClose}>
                Close
              </Button>
            </Modal.Footer>
          </Modal>
        </div>
      </div>
    </div>
  );
};
