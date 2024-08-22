/* TODO - add your code to create a functional React component that renders account details for a logged in user. Fetch the account data from the provided API. You may consider conditionally rendering a message for other users that prompts them to log in or create an account.  */
import { useGetAccountQuery } from "./AccountSlice";
import Reservations from "./Reservations";


export default function Account() {
  // const [users, setUsers] = useState([]);
  const { data, error, isLoading } = useGetAccountQuery();
  

  // console.log(data);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!data) {
    return <div>No account found.</div>;
  }
  
  // setUsers(data);
  return (
    <div>
      <div className="break"></div>
      <div className="info">
      <h2>User Info</h2>
      <p>First Name: {data.firstname}</p>
      <p>Last Name: {data.lastname}</p>
      <p>Email: {data.email}</p></div>
      <h4>Checked out Books:</h4>
      <div><Reservations /></div>
      {/* {isSuccess &&
        users?.map((user) => {
          return <h4 key={user.id}>{user.firstname}</h4>;
        })} */}
    </div>
  );
}
