import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const AddCoursePage = () => {
  const [title, setTitle] = useState('')
  const [duration, setDuration] = useState('1 Month')
  const [fee, setFee] = useState('')
  const [instructorName, setInstructorName] = useState('')
  const [contactEmail, setContactEmail] = useState('')
  const [contactPhone, setContactPhone] = useState('')

  const navigate = useNavigate()

  const addCourse = async (newCourse) => {
    try {
      const res = await fetch('/api/courses', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newCourse),
      })

      if (!res.ok) {
        throw new Error('Failed to add course')
      }
    } catch (error) {
      console.error(error)
      return false
    }
    return true
  }

  const submitForm = (e) => {
    e.preventDefault()

    const newCourse = {
      title,
      duration,
      fee: Number(fee),
      instructor: {
        name: instructorName,
        contactEmail,
        contactPhone,
      },
    }

    addCourse(newCourse)
    console.log(newCourse)

    return navigate('/')
  }

  return (
    <div className='create'>
      <h2>Add a New Course</h2>

      <form onSubmit={submitForm}>
        <label>Course Title:</label>
        <input
          type='text'
          required
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <label>Duration:</label>
        <select value={duration} onChange={(e) => setDuration(e.target.value)}>
          <option value='1 Month'>1 Month</option>
          <option value='2 Months'>2 Months</option>
          <option value='3 Months'>3 Months</option>
          <option value='6 Months'>6 Months</option>
          <option value='1 Year'>1 Year</option>
        </select>

        <label>Course Fee (EUR):</label>
        <input
          type='number'
          required
          value={fee}
          onChange={(e) => setFee(e.target.value)}
        />

        <label>Instructor Name:</label>
        <input
          type='text'
          required
          value={instructorName}
          onChange={(e) => setInstructorName(e.target.value)}
        />

        <label>Contact Email:</label>
        <input
          type='email'
          required
          value={contactEmail}
          onChange={(e) => setContactEmail(e.target.value)}
        />

        <label>Contact Phone:</label>
        <input
          type='text'
          required
          value={contactPhone}
          onChange={(e) => setContactPhone(e.target.value)}
        />

        <button>Add Course</button>
      </form>
    </div>
  )
}

export default AddCoursePage
