import CourseListings from '../components/CourseListings'

const Home = () => {
  const [courses, setCourses] = useState(null)
  const [isPending, setIsPending] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await fetch('/api/courses')
        if (!res.ok) {
          throw new Error('could not fetch the data for that resource')
        }
        const data = await res.json()
        setIsPending(false)
        setCourses(data)
        setError(null)
      } catch (err) {
        setIsPending(false)
        setError(err.message)
      }
    }
    // setTimeout(() => {fetchCourses();}, 1000); // Delay of 1 second
    fetchCourses()
  }, [])

  return (
    <div className='home'>
      {error && <div>{error}</div>}
      {isPending && <div>Loading...</div>}
      {jobs && <CourseListings courses={courses} />}
    </div>
  )
}

export default Home
