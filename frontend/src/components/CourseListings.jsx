import { Link } from 'react-router-dom'

const CourseListings = ({ courses }) => {
  return (
    <div className='course-list'>
      {courses.map((course) => (
        <div className='course-preview' key={course.id}>
          <Link to={`/courses/${course.id}`}>
            <h2>{course.title}</h2>
          </Link>
          <p>Duration: {course.duration}</p>
          <p>Instructor: {course.instructor.name}</p>
        </div>
      ))}
    </div>
  )
}

export default CourseListings
