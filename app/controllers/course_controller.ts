import Course from '#models/course'
import Member from '#models/member'
import Student from '#models/student'
import { createCourseValidator } from '#validators/course'
import type { HttpContext } from '@adonisjs/core/http'
import db from '@adonisjs/lucid/services/db'

export default class CourseController {
  async render({ inertia }: HttpContext) {
    return inertia.render('course')
  }

  async store({ response, request }: HttpContext) {
    const data = await request.validateUsing(createCourseValidator)
    await Course.create(data)
    return response.redirect().toPath('/')
  }

  async show({ params, inertia }: HttpContext) {
    const id = params.id
    const course = await Course.find(id)

    const response = await db
      .rawQuery(
        ` SELECT students.id,students.name,students.email,course_students.role FROM course_students 
                  JOIN courses ON courses.id = course_students.course_id
                  JOIN students ON course_students.student_id = students.id
                  WHERE courses.id = :courseId`,
        { courseId: course?.id }
      )
      .exec()
    const members: { id: string; name: string; email: string; role: number }[] = response.rows
    console.log('members', members)

    const students = await Student.query()
      .orderBy('name', 'asc')
      .whereNotIn(
        'id',
        members.map((m) => m.id)
      )

    return inertia.render('show_course', {
      course: { id: course?.id, title: course?.title },
      students: students.map((s) => ({ id: s.id, name: s.name, email: s.email })),
      members,
    })
  }

  async addMember({ request, response }: HttpContext) {
    const { courseId, studentId } = request.only(['courseId', 'studentId'])
    // console.log('add member: ', courseId, studentId)
    await Member.create({ courseId, studentId, role: 0 })
    return response.redirect().toPath(`/course/${courseId}`)
  }

  async deleteMember({ request, response }: HttpContext) {
    const { courseId, studentId } = request.only(['courseId', 'studentId'])
    // console.log('ids:', courseId, studentId)
    const member = await Member.findBy({ courseId, studentId })
    if (member) {
      await member.delete()
    }
    return response.redirect().toPath(`/course/${courseId}`)
  }
}
