import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Browse from './pages/Browse'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Layout from './components/Layout'


function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<Home />} />
          <Route path='browse' element={<Browse />} />
        </Route>
      </Routes>
    </>
  );
}

export default App
