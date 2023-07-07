import './App.css'
import { useQuery } from "react-query";
import SearchBar from './components/SearchBar';
import OpenHours from './components/OpenHours';
import {useState} from 'react'



function FetchTickerOverview(ticker) {
  return fetch(`https://www.alphavantage.co/query?function=OVERVIEW&symbol=${ticker}&apikey=5QO2BAEYGTAZ5C78`)
    .then((res) => res.json())
}


 function StockOverview({ ticker }) {
  const userQuery = useQuery(
    [ticker],
    () => FetchTickerOverview(ticker)
  );

  if (userQuery.isLoading) {
    return <div>Loading data.....</div>;
  }

  if (userQuery.isError) {
    return <div>{userQuery.error.message}</div>;
  }


  const jsonData = JSON.stringify(userQuery.data,null,2)
   // const {Symbol}=data
   console.log(typeof jsonData)
   const data = JSON.parse(jsonData);
     const { Symbol, AssetType, Name, Description, ForwardPE } = data;
   console.log(typeof Symbol)


     
   return  jsonData ?(
  <div>
    <p>Symbol: {Symbol}</p>
      <p>Asset Type: {AssetType}</p>
      <p>Name: {Name}</p>
      <p>Description: {Description}</p>

      <p>ForwardPE: {ForwardPE}</p>
  </div>
    
  ):null

}

export default function App() {

  const [inputText, setInputText] = useState('')
    const [ticker, setTicker] = useState(false)
  return (
    
  <main>
    <OpenHours />
    <SearchBar inputText={inputText} setInputText={setInputText} setTicker={setTicker}/>
    {ticker &&
    <StockOverview ticker={ticker} />
    }
    
  </main>
  )
  
}