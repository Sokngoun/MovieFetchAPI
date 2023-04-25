import React, { useEffect, useState } from "react";
import "./App.css";
import { MovieBox } from "./components/MovieBox";
import "bootstrap/dist/css/bootstrap.css";
import {
  Navbar,
  Container,
  Nav,
  Form,
  FormControl,
  Button,
  Pagination,
} from "react-bootstrap";
const API_URL = `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.REACT_APP_API_KEY}`;
const API_SEARCH = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.REACT_APP_API_KEY}&query`;
function App() {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [examples, setExamples] = useState(["dra", "hong"]);
  const [query, setQuery] = useState("");

  useEffect(() => {
    fetch(API_URL + "&page=" + page)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setMovies(data.results);
      });
  }, [page]);

  const searchMovie = async (e) => {
    e.preventDefault();
    console.log("searching");
    try {
      const url = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.REACT_APP_API_KEY}&query=${query}`;
      const res = await fetch(url);
      const data = await res.json();
      console.log(data);
      setMovies(data.results);
    } catch (e) {
      console.log(e);
    }
  };

  const changeHandler = (e) => {
    setQuery(e.target.value);
  };

  function generateList(n) {
    const arr = Array(5);
    for (let i = 0; i < 5; i++) {
      if (n < 4) {
        arr[i] = i + 1;
      } else {
        arr[i] = i + n - 2;
      }
    }
    return arr;
  }

  const list = generateList(page);

  return (
    <>
      <Navbar bg="dark" expand="lg" variant="dark">
        <Container fluid>
          <Navbar.Brand href="/home">MovieDB App</Navbar.Brand>
          <Navbar.Brand href="/home">Trending</Navbar.Brand>
          <Navbar.Toggle aria-controls="navbavScroll"></Navbar.Toggle>
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-3"
              style={{ maxHeight: "100px" }}
              navbarScroll
            ></Nav>
            <Form className="d-flex" onSubmit={searchMovie}>
              <FormControl
                type="search"
                placeholder="Movie Search"
                className="me-2"
                aria-label="search"
                name="query"
                value={query}
                onChange={changeHandler}
              ></FormControl>
              <Button variant="secondary" type="submit">
                Search
              </Button>
            </Form>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <div>
        {movies.length > 0 ? (
          <div className="container">
            <div className="grid">
              {movies.map((movieReq) => (
                <MovieBox key={movieReq.id} {...movieReq} />
              ))}
            </div>
          </div>
        ) : (
          <h2>Sorry !! No Moview Found</h2>
        )}
      </div>

      <Pagination className="center">
        <Pagination.Prev
          onClick={() => setPage(page - 1)}
          disabled={page <= 1}
        />
        {list.map((value) => {
          return (
            <Pagination.Item
              active={value === page}
              onClick={() => setPage(value)}
            >
              {value}
            </Pagination.Item>
          );
        })}
        <Pagination.Next onClick={() => setPage(page + 1)} />
      </Pagination>
    </>
  );
}

export default App;
