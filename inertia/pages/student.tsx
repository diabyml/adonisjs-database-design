import { useForm } from '@inertiajs/react'
import Navbar from '~/components/nav'
import { Button } from '~/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '~/components/ui/card'
import { Input } from '~/components/ui/input'

export default function Student() {
  const { data, setData, post, processing, errors } = useForm({
    email: '',
    name: '',
  })

  function submit(e: any) {
    e.preventDefault()
    post('/student')
  }

  return (
    <>
      <Navbar />
      <div className="container mx-auto py-4">
        <form onSubmit={submit}>
          <Card className="max-w-md mx-auto">
            <CardHeader>
              <CardTitle>New Student</CardTitle>
              {/* <CardDescription>Card Description</CardDescription> */}
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Input
                  type="email"
                  placeholder="Email"
                  value={data.email}
                  onChange={(e) => setData('email', e.target.value)}
                />
                {errors.email && <div>{errors.email}</div>}
                <Input
                  type="text"
                  placeholder="Name"
                  value={data.name}
                  onChange={(e) => setData('name', e.target.value)}
                />
                {errors.name && <div>{errors.name}</div>}
              </div>
              <div className="mt-4">
                <Button type="submit" disabled={processing} className="w-full">
                  Save
                </Button>
              </div>
            </CardContent>
            <CardFooter>
              <p>{JSON.stringify(errors)}</p>
            </CardFooter>
          </Card>
        </form>
      </div>
    </>
  )
}
