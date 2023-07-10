function FetchTickerOverview(ticker) {
  return fetch(`https://www.alphavantage.co/query?function=OVERVIEW&symbol=${ticker}&apikey=5QO2BAEYGTAZ5C78`)
    .then((res) => res.json())
}
export default function StockOverview(props) {
  const ticker = props

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
   //console.log(typeof jsonData)
   const data = JSON.parse(jsonData);
     const { Symbol, AssetType, Name, Description, ForwardPE } = data;
   //console.log(typeof Symbol)


     
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
