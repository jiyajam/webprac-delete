import { useParams, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'

const CoursePage = () => {
  const navigate = useNavigate()
  const { id } = useParams()
  const [course, setCourse] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const user = JSON.parse(localStorage.getItem('user'))
  const token = user ? user.token : null

  const deleteCourse = async (id) => {
    try {
      const res = await fetch(`/api/courses/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      if (!res.ok) {
        throw new Error('Failed to delete course')
      }
    } catch (error) {
      console.error('Error deleting course:', error)
    }
  }

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        console.log('id: ', id)
        const res = await fetch(`/api/courses/${id}`)
        if (!res.ok) {
          throw new Error('Network response was not ok')
        }
        const data = await res.json()
        setCourse(data)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchCourse()
  }, [id])

  const onDeleteClick = (courseId) => {
    const confirm = window.confirm(
      'Are you sure you want to delete this listing?' + courseId
    )
    if (!confirm) return

    deleteCourse(courseId)
    navigate('/')
  }

  return (
    <div className='course-preview'>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <>
          <h2>{course.title}</h2>
          <p>Duration: {course.duration}</p>
          <p>Fee: {course.fee}</p>
          <p>Instructor: {course.instructor.name}</p>
          <p>Email: {course.instructor.contactEmail}</p>
          <p>Phone: {course.instructor.contactPhone}</p>
          <button onClick={() => onDeleteClick(course._id)}>delete</button>
          <button onClick={() => navigate(`/edit-course/${course._id}`)}>
            edit
          </button>
        </>
      )}
    </div>
  )
}
export default CoursePage

// export default CoursePage
//  title: { type: String, required: true },
//   duration: { type: String, required: true },
//   fee: { type: Number, required: true },
//   instructor: {
//     name: { type: String, required: true },
//     contactEmail: { type: String, required: true },
//     contactPhone: { type: String, required: true },
//   }
