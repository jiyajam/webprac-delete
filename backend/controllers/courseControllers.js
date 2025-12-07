const Course = require('../models/courseModel')
const mongoose = require('mongoose')

// GET /courses
const getAllCourses = async (req, res) => {
  try {
    const courses = await Course.find({}).sort({ createdAt: -1 })
    res.status(200).json(courses)
  } catch (error) {
    res.status(500).json({ message: 'Failed to retrieve courses' })
  }
}

// POST /courses
const createCourse = async (req, res) => {
  try {
    const newCourse = await Course.create({ ...req.body })
    res.status(201).json(newCourse)
  } catch (error) {
    res
      .status(400)
      .json({ message: 'Failed to create Course', error: error.message })
  }
}

// GET /courses/:courseId
const getCourseById = async (req, res) => {
  const { courseId } = req.params

  if (!mongoose.Types.ObjectId.isValid(courseId)) {
    return res.status(400).json({ message: 'Invalid course ID' })
  }

  try {
    const course = await Course.findById(courseId)
    if (course) {
      res.status(200).json(course)
    } else {
      res.status(404).json({ message: 'Course not found' })
    }
  } catch (error) {
    res.status(500).json({ message: 'Failed to retrieve course' })
  }
}

// PUT /courses/:courseId
const updateCourse = async (req, res) => {
  res.send('updateCourse')
}

// DELETE /courses/:courseId
const deleteCourse = async (req, res) => {
  const { courseId } = req.params

  if (!mongoose.Types.ObjectId.isValid(courseId)) {
    return res.status(400).json({ message: 'Invalid course ID' })
  }

  try {
    const deletedCourse = await Course.findOneAndDelete({ _id: courseId })
    if (deletedCourse) {
      res.status(204).send() // 204 No Content
    } else {
      res.status(404).json({ message: 'Course not found' })
    }
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete course' })
  }
}
module.exports = {
  getAllCourses,
  getCourseById,
  createCourse,
  updateCourse,
  deleteCourse,
}
