import { Link } from '@inertiajs/react'

function Navbar() {
  return (
    <>
      <div className="container mx-auto bg-blue-400 text-white py-2 ">
        <nav className="flex items-center">
          <div>
            <Link href="/">
              <h1 className="text-md font-bold">Welcome</h1>
            </Link>
          </div>
          <div className="ml-auto space-x-3">
            <Link href="/student" className="text-sm hover:underline font-bold">
              Create Student
            </Link>
            <Link href="/course" className="text-sm hover:underline font-bold">
              Create Course
            </Link>
          </div>
        </nav>
      </div>
    </>
  )
}

export default Navbar
