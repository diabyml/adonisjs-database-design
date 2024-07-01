import Student from '#models/student'
import { createStudentValidator } from '#validators/student'
import type { HttpContext } from '@adonisjs/core/http'

export default class StudentController {
  async render({ inertia }: HttpContext) {
    return inertia.render('student')
  }

  async store({ response, request }: HttpContext) {
    const data = await request.validateUsing(createStudentValidator)
    await Student.create(data)
    return response.redirect().toPath('/')
  }
}
