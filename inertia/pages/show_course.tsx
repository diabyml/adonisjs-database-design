import CourseController from '#controllers/course_controller'
import { InferPageProps } from '@adonisjs/inertia/types'
import Navbar from '~/components/nav'
import { Plus } from 'lucide-react'
import { Button } from '~/components/ui/button'
import { router } from '@inertiajs/react'

function ShowCourse(props: InferPageProps<CourseController, 'show'>) {
  const { course, students, members } = props
  // console.log('members', members)
  return (
    <>
      <Navbar />
      {/* {JSON.stringify(members)} */}
      <main className="container mx-auto pt-4">
        <div className="">
          <h1 className="text2xl font-bold">{course.title}</h1>
          <div className="space-y-2">
            <h2>Members:</h2>
            {members.map((member) => (
              <div key={member.id} className="flex items-center justify-between">
                <p>{member.name}</p>
                <Button
                  variant={'destructive'}
                  onClick={() => {
                    router.post(
                      `/course/${course.id}/delete-member`,
                      {
                        studentId: member.id,
                        courseId: course.id,
                      },
                      {
                        onSuccess: () => {
                          router.reload()
                        },
                      }
                    )
                  }}
                >
                  Delete
                </Button>
              </div>
            ))}
          </div>
          <div>
            {/* <Button>
              <Plus className="mr-2 h-4 w-4" /> Student
            </Button> */}
          </div>
        </div>
        <div className="pt-4">
          {students.map((student) => (
            <div
              key={student.id}
              className="flex items-center justify-between border-b border-gray-200 py-3"
            >
              <div>{student.name}</div>
              <div>
                <Button
                  onClick={() => {
                    router.post(
                      `/course/${course.id}`,
                      {
                        studentId: student.id,
                        courseId: course.id,
                      },
                      {
                        onSuccess: () => {
                          router.reload()
                        },
                      }
                    )
                  }}
                >
                  <Plus className="mr-2 h-4 w-4" /> Add
                </Button>
              </div>
            </div>
          ))}
        </div>
      </main>
    </>
  )
}

export default ShowCourse
