import useField from '../hooks/useField'
import useSignup from '../hooks/useSignup'
import { useNavigate } from 'react-router-dom'

const Signup = () => {
  const navigate = useNavigate()
  const name = useField('text')
  const username = useField('username')
  const password = useField('password')
  const gender = useField('text')
  const dateOfBirth = useField('date')
  const address = useField('text')
  const occupation = useField('text')

  //     name: { type: String, required: true },
  //     username: { type: String, required: true, unique: true },
  //     password: { type: String, required: true },
  //     gender: { type: String, required: true },
  //     date_of_birth: { type: Date, required: true },
  //     address: { type: String, required: true },
  //     occupation: { type: String, required: true },
  //   },

  const { signup, error } = useSignup('/api/users/signup')

  const handleFormSubmit = async (e) => {
    e.preventDefault()
    await signup({
      username: username.value,
      password: password.value,
      name: name.value,
      gender: gender.value,
      date_of_birth: dateOfBirth.value,
      address: address.value,
      occupation: occupation.value,
    })
    if (!error) {
      console.log('success')
      navigate('/')
    }
  }

  return (
    <div className='create'>
      <h2>Sign Up</h2>
      <form onSubmit={handleFormSubmit}>
        <label>Name:</label>
        <input {...name} />
        <label>Username :</label>
        <input {...username} />
        <label>Password:</label>
        <input {...password} />
        <label>Gender:</label>
        <input {...gender} />
        <label>Date of Birth:</label>
        <input {...dateOfBirth} />
        <label>Address:</label>
        <input {...address} />
        <label>Occupation:</label>
        <input {...occupation} />
        <button>Sign up</button>
      </form>
    </div>
  )
}

export default Signup
