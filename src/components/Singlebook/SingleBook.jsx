/* TODO - add your code to create a functional React component that renders details for a single book. Fetch the book data from the provided API. You may consider conditionally rendering a 'Checkout' button for logged in users. */
import { useParams, useNavigate, Link } from "react-router-dom";
import { useGetBookByIdQuery } from "../../app/bookApi";
import { useEffect } from "react";
import { useReserveMutation } from "./ReserveSlice";

export default function SingleBook() {
  const { id } = useParams();
  //   const [singleBook, setSingleBook] = useState({});
  const navigate = useNavigate();
  const { data, isLoading, isSuccess, refetch } = useGetBookByIdQuery(id);
  // console.log(data?.book);
  const [reserveBook] = useReserveMutation();

  useEffect(() => {
    refetch();
  }, [isSuccess]);
  // console.log(data?.book?.available, "Hello");
  if (isLoading) <h1>Loading</h1>;
  else <h1>Error</h1>;

  const checkoutBook = async () => {
    try {
      const available = false;
      if (data?.book?.available === true) {
        await reserveBook({ id, available }).unwrap();
        alert("Book checked out");
        navigate("/account");
        window.location.reload();
      } else {
        alert("Book already checked out");
      }
    } catch (error) {
      console.error("Failed to Checkout Book", error);
      alert("Failed to Checkout Book. Please Log-in or Register");
    }
  };

  return (
    <>
      {data ? (
        <div>
          <div className="break"></div>
          <div key={data.book.id} className="singleBookCard">
            <img
              className="bookImg"
              src={data.book.coverimage}
              alt={data.book.title}
            ></img>
            <br></br>
            <div className="info">
              <h4>{data.book.title}</h4>
              <h6>{data.book.author}</h6>
              <p>{data.book.description}</p>
              <h6>
                Available to Checkout?{data?.book?.available ? " Yes" : " No"}
              </h6>
            </div>
            <Link to="/">
              <button type="button" className="btn btn-dark">
                Back to Books
              </button>
            </Link>
            <button
              id="reserve"
              onClick={checkoutBook}
              type="button"
              className="btn btn-success"
            >
              Reserve Book
            </button>
          </div>
          <br></br>
        </div>
      ) : (
        <p>Loading</p>
      )}
    </>
  );
}
