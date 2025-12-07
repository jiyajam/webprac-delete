const express = require('express')

const {
  getAllCourses,
  getCourseById,
  createCourse,
  updateCourse,
  deleteCourse,
} = require('../controllers/courseControllers')
const requireAuth = require('../middleware/requireAuth')

const router = express.Router()
router.get('/', getAllCourses)
router.post('/', createCourse)

//require auth
router.use(requireAuth)

router.get('/:courseId', getCourseById)
router.put('/:courseId', updateCourse)
router.delete('/:courseId', deleteCourse)

module.exports = router
