/* TODO - add your code to create a functional React component that displays all of the available books in the library's catalog. Fetch the book data from the provided API. Users should be able to click on an individual book to navigate to the SingleBook component and view its details. */
import { Link } from "react-router-dom";
import { useGetBooksQuery } from "../app/bookApi";
import { useEffect, useState } from "react";

export default function Books() {
  const [books, getBooks] = useState([]);
  const { data, isSuccess, refetch } = useGetBooksQuery();
  const [filterText, setFilterText] = useState("");
  const [filterAvail, setFilterAvail] = useState("");

  useEffect(() => {
    if (isSuccess) {
      getBooks(data.books);
    }
  }, [isSuccess]);

  const handleFilter = (e) => {
    setFilterText(e.target.value);
  };

  const filteredBooks = books.filter((book) =>
    book.title.toLowerCase().includes(filterText.toLowerCase())
  );
  const handleAvail = (e) => {
    setFilterAvail(e.target.value);
    refetch();
  };
  const filterAvailBooks = filteredBooks.filter((book) => {
    if (filterAvail === "true") {
      return book.available === true;
    } else if (filterAvail === "false") {
      return book.available === false;
    }
    return true;
  });

  return (
    <>
      <div className="break"></div>
      <div className="input-group mb-3">
        <div className="input-group-prepend">
          <span className="input-group-text" id="inputGroup-sizing-default">
            Filter by Title
          </span>
        </div>
        <input
          type="text"
          id="filterId"
          className="form-control"
          aria-label="Default"
          aria-describedby="inputGroup-sizing-default"
          value={filterText}
          onChange={handleFilter}
        />
      </div>
      <div className="input-group mb-3">
        <div className="input-group-prepend">
          <label className="input-group-text" htmlFor="inputGroupSelect01">
            Is Available to Reserve?
          </label>
        </div>
        <select
          className="custom-select"
          id="inputGroupSelect01"
          value={filterAvail}
          onChange={handleAvail}
        >
          <option value="">Choose...</option>
          <option value="true">Yes</option>
          <option value="false">No</option>
        </select>
      </div>
      <div key={books.id} className="allBooks">
        {isSuccess &&
          filterAvailBooks.map((book) => {
            return (
              <div key={book.id} className="bookCard">
                <Link to={`/books/${book.id}`}>
                  <img
                    className="bookImg"
                    src={book.coverimage}
                    alt={book.title}
                  ></img>
                </Link>

                <p>{book.title}</p>
              </div>
            );
          })}
      </div>
    </>
  );
}
