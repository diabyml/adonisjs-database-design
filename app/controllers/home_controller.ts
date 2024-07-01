import Course from '#models/course'
import Student from '#models/student'
import type { HttpContext } from '@adonisjs/core/http'

export default class HomeController {
  async render({ inertia }: HttpContext) {
    const students = await Student.query().orderBy('createdAt', 'asc')
    const courses = await Course.query().orderBy('createdAt', 'asc')
    return inertia.render('home', {
      students: students.map((s) => ({ id: s.id, name: s.name, email: s.email })),
      courses: courses.map((c) => ({ id: c.id, title: c.title })),
    })
  }
}
