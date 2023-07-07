import {useState} from 'react'
import { useQuery } from "react-query";
export default function OpenHours () {
  const [hours, setHours] = useState({
    status:"open",
    open:"",
    close:"",
  })

 const userQuery = useQuery(
    ['status'],
    () => fetch(`https://www.alphavantage.co/query?function=MARKET_STATUS&apikey=5QO2BAEYGTAZ5C78`)
    .then((res) => res.json())
  );

  if (userQuery.isLoading) {
    return <div>Loading data.....</div>;
  }

  if (userQuery.isError) {
    return <div>{userQuery.error.message}</div>;
  }

    const jsonData = JSON.stringify(userQuery.data,null,2)
   // const {Symbol}=data
   console.log(jsonData)
   const data = JSON.parse(jsonData);
     const { Symbol, AssetType, Name, Description, ForwardPE } = data;
   console.log(typeof Symbol)
  
  

    return (
    
  <main>
    
    <div>
      <p>The Stock market is {hours.status}</p>
    </div>
    
  </main>
  )
}