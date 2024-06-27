import type HomeController from '#controllers/home_controller'
import type { InferPageProps } from '@adonisjs/inertia/types'
import { Head, useForm } from '@inertiajs/react'

export default function Home(props: InferPageProps<HomeController, 'render'>) {
  const { musics, rating } = props
  const { data, setData, post } = useForm({ file: undefined })
  console.log('rating', rating)

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
      <div>
        filter by rating:
        <form>
          <select name="rating" defaultValue={'select rating'}>
            {rating === undefined && (
              <>
                <option>select rating</option>
                <option value="no">0</option>
                <option value="yes"> {'> 1'} </option>
              </>
            )}
            {rating === 'select rating' && (
              <>
                <option>select rating</option>
                <option value="no">0</option>
                <option value="yes"> {'> 1'} </option>
              </>
            )}
            {rating === 'no' && (
              <>
                <option value="no">0</option>
                <option value="yes"> {'> 1'} </option>
              </>
            )}
            {rating === 'yes' && (
              <>
                <option value="yes"> {'> 1'} </option>
                <option value="no">0</option>
              </>
            )}
          </select>
          <button type="submit">filter</button>
        </form>{' '}
      </div>
      {musics.map(({ id, title, artist, album, count, rating: r, len }) => (
        <div key={id} className="card">
          <div>title: {title}</div>
          <div>artist: {artist}</div>
          <div>album: {album}</div>
          <div>count: {count}</div>
          <div>rating: {r}</div>
          <div>len: {len}</div>
          <div className="border"></div>
        </div>
      ))}

      <button>Load more</button>
    </>
  )
}
