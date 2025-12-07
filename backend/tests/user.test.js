const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const User = require('../models/userModel')
//  {
//     name: { type: String, required: true },
//     username: { type: String, required: true, unique: true },
//     password: { type: String, required: true },
//     gender: { type: String, required: true },
//     date_of_birth: { type: Date, required: true },
//     address: { type: String, required: true },
//     occupation: { type: String, required: true },
//   },

const users = [
  {
    name: 'Alice Johnson',
    username: 'alicej',
    password: 'Password123!', // plain password, backend should hash
    gender: 'Female',
    date_of_birth: new Date('1995-04-12'),
    address: 'Kauniainen',
    occupation: 'Teller',
  },
]

beforeEach(async () => {
  await User.deleteMany({})
})

describe('User Routes', () => {
  describe('POST /api/users/signup', () => {
    it('should create user and return token and user object with username', async () => {
      const response = await api
        .post('/api/users/signup')
        .send(users[0])
        .expect(201)
        .expect('Content-Type', /application\/json/)

      expect(response.body).toHaveProperty('token')
      expect(response.body).toHaveProperty('username', users[0].username)
    })

    it('should return 400 when password is missing', async () => {
      await api
        .post('/api/users/signup')
        .send({
          name: 'Markus Virtanen',
          username: 'markusv',
          gender: 'Male',
          date_of_birth: new Date('1990-11-23'),
          address: 'Kaleb',
          occupation: 'Singer',
        })
        .expect(400)
    })

    it('should return 200 with token when valid login', async () => {
      await api.post('/api/users/signup').send(users[0]).expect(201)

      const response = await api
        .post('/api/users/login')
        .send({
          username: users[0].username,
          password: users[0].password,
        })
        .expect(200)

      expect(response.body).toHaveProperty('token')
    })

    it('should return 401 when logging in with invalid username', async () => {
      await api
        .post('/api/users/login')
        .send({
          username: 'wronguser',
          password: users[0].password,
        })
        .expect(400)
    })
  })
})

afterAll(async () => {
  await mongoose.connection.close()
})
