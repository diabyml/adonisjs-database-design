import Music from '#models/music'
import type { HttpContext } from '@adonisjs/core/http'
// import db from '@adonisjs/lucid/services/db'

// async function getCount() {
//   const res = await db.rawQuery('SELECT COUNT(*) FROM music').exec()
//   return res.rows[0].count
// }

export default class HomeController {
  async render({ inertia, request }: HttpContext) {
    const { rating, page } = request.qs()

    console.log('page:', page)

    // console.log('rating:', rating)

    const ratingVal = rating === 'no' ? 0 : 1

    console.log('rating:', rating)

    // const musicsInstance = await Music.query()
    // .orderBy('title', 'asc')
    // .if(rating, (query) => query.where('rating', `${rating === 'no' ? '=' : '>'}`, ratingVal))
    // .where('rating', '=', 0)
    // .andWhere('count', '>', 0)
    // .andWhere('title', 'LIKE', '%y%')
    // .limit(20)
    // .offset(1)
    // const musics = musicsInstance.map((m) => m.serialize())

    const paginator = await Music.query()
      .orderBy('title', 'asc')
      .if(rating, (query) => query.where('rating', `${rating === 'no' ? '=' : '>'}`, ratingVal))
      .paginate(Number(page) || 1, 10)

    const musics = paginator.toJSON().data.map((m) => m.serialize())

    // console.log(paginator.toJSON().meta)
    // console.log(paginator.getUrlsForRange(1, paginator.lastPage))
    const pageUrls = paginator.getUrlsForRange(1, paginator.lastPage)

    return inertia.render('home', { musics, rating: rating as string, pageUrls })
  }
}
