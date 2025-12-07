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
  res.send('getCourseById')
}

// PUT /courses/:courseId
const updateCourse = async (req, res) => {
  res.send('updateCourse')
}

// DELETE /courses/:courseId
const deleteCourse = async (req, res) => {
  res.send('deleteCourse')
}

module.exports = {
  getAllCourses,
  getCourseById,
  createCourse,
  updateCourse,
  deleteCourse,
}
