import vine from '@vinejs/vine'

export const createCourseValidator = vine.compile(
  vine.object({
    title: vine.string().maxLength(128),
  })
)
