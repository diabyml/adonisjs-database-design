import { useForm } from '@inertiajs/react'
import Navbar from '~/components/nav'
import { Button } from '~/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '~/components/ui/card'
import { Input } from '~/components/ui/input'

export default function Course() {
  const { data, setData, post, processing, errors } = useForm({
    title: '',
  })

  function submit(e: any) {
    e.preventDefault()
    post('/course')
  }

  return (
    <>
      <Navbar />
      <div className="container mx-auto py-4">
        <form onSubmit={submit}>
          <Card className="max-w-md mx-auto">
            <CardHeader>
              <CardTitle>New Course</CardTitle>
              {/* <CardDescription>Card Description</CardDescription> */}
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Input
                  type="text"
                  placeholder="Title"
                  value={data.title}
                  onChange={(e) => setData('title', e.target.value)}
                />
                {errors.title && <div>{errors.title}</div>}
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
