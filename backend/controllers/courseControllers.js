const Course = require('../models/courseModel')
const mongoose = require('mongoose')

// GET /courses
const getAllCourses = async (req, res) => {
  try {
    const courses = await Course.find({}).sort({ createdAt: -1 })
    res.status(200).json(courses)
  } catch (error) {
    console.error('Error fetching courses:', error)
    res.status(500).json({ message: 'Failed to retrieve courses' })
  }
}

// POST /courses
const createCourse = async (req, res) => {
  try {
    const user_id = req.user._id
    const newCourse = new Course({
      ...req.body,
      user_id,
    })
    await newCourse.save()
    res.status(201).json(newCourse)
  } catch (error) {
    console.error('Error creating course:', error)
    res.status(500).json({ error: 'Server Error' })
  }
}

// GET /courses/:courseId
const getCourseById = async (req, res) => {
  const { courseId } = req.params
  if (!mongoose.Types.ObjectId.isValid(courseId)) {
    return res.status(404).json({ error: 'No such course' })
  }

  try {
    const course = await Course.findById(courseId)
    if (!course) {
      console.log('Course not found')
      return res.status(404).json({ message: 'Course not found' })
    }
    res.status(200).json(course)
  } catch (error) {
    console.error('Error fetching course:', error)
    res.status(500).json({ error: 'Server Error' })
  }
}

// PUT /courses/:courseId
const updateCourse = async (req, res) => {
  const { courseId } = req.params
  if (!mongoose.Types.ObjectId.isValid(courseId)) {
    return res.status(404).json({ error: 'No such course' })
  }

  try {
    // const user_id = req.user._id;
    const course = await Course.findOneAndUpdate(
      { _id: courseId },
      { ...req.body },
      { new: true }
    )
    if (!course) {
      return res.status(404).json({ message: 'Course not found' })
    }
    res.status(200).json(course)
  } catch (error) {
    console.error('Error updating course:', error)
    res.status(500).json({ error: 'Server Error' })
  }
}
// DELETE /courses/:courseId
const deleteCourse = async (req, res) => {
  const { courseId } = req.params
  if (!mongoose.Types.ObjectId.isValid(courseId)) {
    return res.status(404).json({ error: 'No such course' })
  }

  try {
    // const user_id = req.user._id;
    const course = await Course.findOneAndDelete({ _id: courseId })
    if (!course) {
      return res.status(404).json({ message: 'Course not found' })
    }
    res.status(204).send() // 204 No Content
  } catch (error) {
    console.error('Error deleting course:', error)
    res.status(500).json({ error: 'Server Error' })
  }
}
module.exports = {
  getAllCourses,
  getCourseById,
  createCourse,
  updateCourse,
  deleteCourse,
}
