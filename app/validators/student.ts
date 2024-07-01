import vine from '@vinejs/vine'

export const createStudentValidator = vine.compile(
  vine.object({
    email: vine.string().email().normalizeEmail(),
    //   .unique(async (db, val) => {
    //     const res = await db.from('students').where('email', val).exec()
    //     return res?.length > 0
    //   }),
    name: vine.string().maxLength(128),
  })
)
