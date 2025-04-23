import { useState } from 'react'
import StudentList from '../components/StudentsList'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div><StudentList></StudentList></div>
  )
}

export default App
