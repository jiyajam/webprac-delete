import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'

const EditCoursePage = () => {
  const [course, setCourse] = useState(null) // Initialize course state
  const [loading, setLoading] = useState(true) // Loading state
  const [error, setError] = useState(null) // Error state
  const { id } = useParams()

  // export default CoursePage
  //  title: { type: String, required: true },
  //   duration: { type: String, required: true },
  //   fee: { type: Number, required: true },
  //   instructor: {
  //     name: { type: String, required: true },
  //     contactEmail: { type: String, required: true },
  //     contactPhone: { type: String, required: true },
  //

  // Declare state variables for form fields
  const [title, setTitle] = useState('')
  const [duration, setDuration] = useState('1 Month')
  const [fee, setFee] = useState('')
  const [instructorName, setInstructorName] = useState('')
  const [contactEmail, setContactEmail] = useState('')
  const [contactPhone, setContactPhone] = useState('')

  const user = JSON.parse(localStorage.getItem('user'))
  const token = user ? user.token : null

  const navigate = useNavigate()

  const updateCourse = async (course) => {
    try {
      const res = await fetch(`/api/courses/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(course),
      })
      if (!res.ok) throw new Error('Failed to update course')
      return res.ok
    } catch (error) {
      console.error('Error updating course:', error)
      return false
    }
  }

  // Fetch course data
  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const res = await fetch(`/api/courses/${id}`)
        if (!res.ok) {
          throw new Error('Network response was not ok')
        }
        const data = await res.json()
        setCourse(data) // Set the course data

        // Initialize form fields with fetched course data
        setTitle(data.title)
        setDuration(data.duration)
        setFee(data.fee)
        setInstructorName(data.instructor.name)
        setContactEmail(data.instructor.contactEmail)
        setContactPhone(data.instructor.contactPhone)
      } catch (error) {
        console.error('Failed to fetch course:', error)
        setError(error.message)
      } finally {
        setLoading(false) // Stop loading after fetch
      }
    }

    fetchCourse()
  }, [id])

  // Handle form submission
  const submitForm = async (e) => {
    e.preventDefault()

    const updatedCourse = {
      title,
      duration,
      fee: Number(fee),
      instructor: {
        name: instructorName,
        contactEmail,
        contactPhone,
      },
    }

    const success = await updateCourse(updatedCourse)
    if (success) {
      // toast.success("Course Updated Successfully");
      navigate(`/courses/${id}`)
    } else {
      // toast.error("Failed to update the course");
    }
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

        <button>Update Course</button>
      </form>
    </div>
  )
}

export default EditCoursePage
