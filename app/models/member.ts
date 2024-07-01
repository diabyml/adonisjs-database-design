import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column, hasMany } from '@adonisjs/lucid/orm'
import Student from './student.js'
import type { BelongsTo, HasMany } from '@adonisjs/lucid/types/relations'
import Course from './course.js'

export default class Member extends BaseModel {
  static table = 'course_students'

  @column({ isPrimary: true })
  declare id: number

  @column()
  declare role: number

  @column()
  declare studentId: number

  @column()
  declare courseId: number

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
