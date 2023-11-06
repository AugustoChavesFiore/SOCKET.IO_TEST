import { useEffect, useState } from 'react'
import io from 'socket.io-client';
import './App.css'

function App() {
  const socket = io('http://localhost:4000')
  const[message, setMessage] = useState([])
  const [text, setText] = useState('')
  
  useEffect(() => {
    socket.on('message', (data) => {
      setMessage([...message, data])
    })
    return () => {
      socket.off('message')
    }
  }, [message])
  const handleSubmit = (e) => {
    e.preventDefault()
    if(text){
    socket.emit('message', text)
    setText('')
  }
    else{
      alert('Please enter a message')
    }
  }
   return(
    <>
      <form onSubmit={handleSubmit} >
        <input type="text" value={text} onChange={(e) => setText(e.target.value)} />
        <button type="submit">Send</button>
      </form>
      <div>
        <h1>Chat</h1>
        <hr />
        {message.map((m, i) => <p key={i}>{m}</p>)}
      </div>
    </>
  )
}

export default App
