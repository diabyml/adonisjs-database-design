/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

const HomeController = () => import('#controllers/home_controller')
const UploadController = () => import('#controllers/upload_controller')
import router from '@adonisjs/core/services/router'

router.get('/', [HomeController, 'render'])

router.post('/upload', [UploadController, 'execute'])
