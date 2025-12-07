import { BrowserRouter, Routes, Route } from 'react-router-dom'

// pages & components
import Home from './pages/HomePage'
import AddCoursePage from './pages/AddCoursePage'
import Navbar from './components/Navbar'
import NotFoundPage from './pages/NotFoundPage'
import CoursePage from './pages/CoursePage'

const App = () => {
  return (
    <div className='App'>
      <BrowserRouter>
        <Navbar />
        <div className='content'>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/add-course' element={<AddCoursePage />} />
            <Route path='/courses/:id' element={<CoursePage />} />
            <Route path='*' element={<NotFoundPage />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  )
}

export default App
