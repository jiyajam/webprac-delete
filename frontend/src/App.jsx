import { BrowserRouter, Routes, Route } from 'react-router-dom'

// pages & components
import Home from './pages/HomePage'
import CoursePage from './pages/CoursePage'
import AddCoursePage from './pages/AddCoursePage'
import Navbar from './components/Navbar'
import NotFoundPage from './pages/NotFoundPage'
import EditCoursePage from './pages/EditCoursePage'
import Signup from './pages/Signup'
import Login from './pages/Login'

const App = () => {
  return (
    <div className='App'>
      <BrowserRouter>
        <Navbar />
        <div className='content'>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/courses/:id' element={<CoursePage />} />
            <Route path='/courses/add-course' element={<AddCoursePage />} />
            <Route path='/edit-course/:id' element={<EditCoursePage />} />
            <Route path='/signup' element={<Signup />} />
            <Route path='/login' element={<Login />} />
            <Route path='*' element={<NotFoundPage />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  )
}

export default App
