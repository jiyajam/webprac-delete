const express = require('express')
const {
  getAllCourses,
  getCourseById,
  createCourse,
  updateCourse,
  deleteCourse,
} = require('../controllers/courseControllers')

const router = express.Router()

router.get('/', getAllCourses)
router.post('/', createCourse)
router.get('/:courseId', getCourseById)
router.put('/:courseId', updateCourse)
router.delete('/:courseId', deleteCourse)

module.exports = router
