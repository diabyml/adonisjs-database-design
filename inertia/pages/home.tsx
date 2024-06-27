import type HomeController from '#controllers/home_controller'
import type { InferPageProps } from '@adonisjs/inertia/types'
import { Head, useForm } from '@inertiajs/react'

export default function Home(props: InferPageProps<HomeController, 'render'>) {
  const { musics } = props
  const { data, setData, post } = useForm({ file: undefined })

  function submit(e: any) {
    e.preventDefault()
    post('/upload')
  }

  return (
    <>
      <Head title="Homepage" />
      <div>
        <form onSubmit={submit} method="post" encType="multipart/form-data">
          <div>
            <label htmlFor="file">Choose file to upload</label>
            <input
              // value={data.file}
              type="file"
              id="file"
              name="file"
              accept=".csv"
              onChange={(e) => {
                const files = e.target.files as any
                console.log(files)
                setData('file', files[0])
              }}
            />
          </div>
          <div>
            <button>Submit</button>
          </div>
        </form>
      </div>
      {musics.map(({ id, title, artist, album, count, rating, len }) => (
        <div key={id} className="card">
          <div>title: {title}</div>
          <div>artist: {artist}</div>
          <div>album: {album}</div>
          <div>count: {count}</div>
          <div>rating: {rating}</div>
          <div>len: {len}</div>
          <div className="border"></div>
        </div>
      ))}

      <button>Load more</button>
    </>
  )
}
