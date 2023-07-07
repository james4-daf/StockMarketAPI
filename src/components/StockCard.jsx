export default function StockCard(props) {
const {inputText,setInputText, setTicker} = props;

  function onChangeHandler(e) {
    setInputText(e.target.value)
  }

  function onSubmitHandler(e) {
    e.preventDefault()
  setTicker(inputText)
  }
  console.log(inputText)
  return (
    <form onSubmit={onSubmitHandler}>
      
    <input onChange={onChangeHandler}/>
      <button type='submit'>Submit</button>
      </form>
  )
}