import { Head } from '@inertiajs/react'
import { Button } from '~/components/ui/button'
import { Input } from '~/components/ui/input'

export default function Home(props: { version: number }) {
  return (
    <>
      <Head title="Homepage" />

      <div className="container max-w-3xl mx-auto bg-gray-300">
        <div className="text-blue-500 font-bold">AdonisJS {props.version} x Inertia x React</div>

        <span>
          Learn more about AdonisJS and Inertia.js by visiting the{' '}
          <a href="https://docs.adonisjs.com/guides/inertia">AdonisJS documentation</a>.
        </span>
        <Input placeholder="Enter name" />
        <Button>Hello, world</Button>
      </div>
    </>
  )
}
