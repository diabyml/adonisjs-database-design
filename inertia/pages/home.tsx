import type HomeController from '#controllers/home_controller'
import { InferPageProps } from '@adonisjs/inertia/types'
import { Head, Link } from '@inertiajs/react'
import Navbar from '~/components/nav'

export default function Home(props: InferPageProps<HomeController, 'render'>) {
  const { students, courses } = props
  return (
    <>
      <Head title="Homepage" />
      <Navbar />
      <main className="pt-4">
        <div className="container mx-auto">
          <div className="space-y-4">
            <div>
              <h1 className="font-bold">Students</h1>
              <div className="pt-2">
                {students.map((s) => (
                  <div key={s.id} className="flex items-center space-x-2 text-sm">
                    <p>{s.name}</p> <p className="text-gray-400">{s.email}</p>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h1 className="font-bold">Courses</h1>
              <div className="pt-2">
                {courses.map((c) => (
                  <div key={c.id} className="flex items-center space-x-2 text-sm">
                    <Link href={`course/${c.id}`} className="hover:underline">
                      <p>{c.title}</p>
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}
