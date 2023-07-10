import { useState, useEffect } from 'react';
import { useQuery } from "react-query";

function fetchStatus() {
  return fetch(`https://www.alphavantage.co/query?function=MARKET_STATUS&apikey=5QO2BAEYGTAZ5C78`)
    .then((res) => res.json());
}

export default function OpenHours() {
  const [hours, setHours] = useState({
    status: "",
    open: "",
    close: "",
  });

  const userQuery = useQuery(['status'], fetchStatus);

  useEffect(() => {
    if (userQuery.data) {
      setHours((prevHours) => ({
        ...prevHours,
        status: userQuery.data.markets[0].current_status,
      }));
    }
  }, [userQuery.data]);

  if (userQuery.isLoading) {
    return <div>Loading data.....</div>;
  }

  if (userQuery.isError) {
    return <div>{userQuery.error.message}</div>;
  }

  return (
    <main>
      <div>
        <p>The Stock market is {hours.status}</p>
      </div>
    </main>
  );
}
