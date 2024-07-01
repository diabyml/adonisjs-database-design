/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

const StudentController = () => import('#controllers/student_controller')
const HomeController = () => import('#controllers/home_controller')
const CourseController = () => import('#controllers/course_controller')
import router from '@adonisjs/core/services/router'
router.get('/', [HomeController, 'render'])

router.group(() => {
  router.get('/student', [StudentController, 'render'])
  router.post('/student', [StudentController, 'store'])

  router.get('/course', [CourseController, 'render'])
  router.post('/course', [CourseController, 'store'])
  router.get('/course/:id', [CourseController, 'show'])
  router.post('/course/:id', [CourseController, 'addMember'])
  router.post('/course/:id/delete-member', [CourseController, 'deleteMember'])
})
