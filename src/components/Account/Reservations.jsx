import { useGetReservationsQuery } from "./ReservationsSlice";
import { useDeleteBookMutation } from "./DeleteSlice";
import { useNavigate } from "react-router-dom";

export default function Reservations() {
  const { data, error, isLoading } = useGetReservationsQuery();
  const [deleteMutation, { errorD, loadingD }] = useDeleteBookMutation();
  const navigate = useNavigate();
//   console.log(data);
  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (data.reservation.length == []) {
    return <div>No books found.</div>;
  }
  if (errorD) {
    return console.log(errorD);
  }

  const deleteRes = async (id) => {
    try {
      if (loadingD) {
        console.log("Loading return of book");
      }
      await deleteMutation(id);
      alert("Book returned successfully");
      navigate("/account");
      window.location.reload();
    } catch (error) {
      console.error("Failed to Return Book", error);
      alert("Failed to Return Book");
    }
  };
  //   const res = data.reservation
  return (
    <div>
      {data?.reservation?.map((res) => {
        return (
          <ul key={res.id}>
            <li>
              <p>{res.title}</p>
              <img className="bookImg" src={res.coverimage} />
              <p>{res.author}</p>
              <button
                type="button"
                onClick={() => deleteRes(res.id)}
                className="btn btn-danger"
              >
                Return Book
              </button>
            </li>
          </ul>
        );
      })}
      ;
    </div>
  );
}
