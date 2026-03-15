import { useState } from 'react'
import ThemeToggle from './components/ThemeToggle';

function App() {
  const [count, setCount] = useState<number>(0);

  return (
    <>
      <h1>Bonjour cest tsif</h1>
      <button className='btn btn-outline btn-secondary' onClick={() => setCount(count + 1)}>compter {count}</button>
      <ThemeToggle />
    </>
  )
}

export default App
