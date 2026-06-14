import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'


const element = <h1>Hello, React!</h1>
const imageList = [
  reactLogo,
  viteLogo,
  reactLogo,
  viteLogo,
  heroImg,
  reactLogo
]

function App() {
  // const [count, setCount] = useState(0)

  return (
    <>
    <section className="gallery">
      {imageList.map((img, index) => (
        <div key={index} className="card">
          <img src={img} alt={`Image ${index + 1}`} />
        </div>
      ))}
    </section>
    </>
  )
}

export default App
