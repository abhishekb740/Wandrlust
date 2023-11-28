import './App.css'

function App() {
  const submitHandler =async(e) =>{
    const response = await fetch('http://localhost:5000',{
      method:'POST',
      headers:{
        'Content-Type':'application/json'
      },
      body:JSON.stringify({
        name:'Abhishek',
        age:20
      })
    })
    console.log(await response.status);
    console.log(await response.json());
  }
  return (
    <>
      <button onClick={submitHandler}>Submit</button>
    </>
  )
}

export default App
