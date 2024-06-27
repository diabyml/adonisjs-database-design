import Music from '#models/music'
import type { HttpContext } from '@adonisjs/core/http'
// import db from '@adonisjs/lucid/services/db'

// async function getCount() {
//   const res = await db.rawQuery('SELECT COUNT(*) FROM music').exec()
//   return res.rows[0].count
// }

export default class HomeController {
  async render({ inertia, request }: HttpContext) {
    const { rating } = request.qs()

    // console.log('rating:', rating)

    const ratingVal = rating === 'no' ? 0 : 1

    console.log('rating:', rating)

    const musicsInstance = await Music.query()
      // .orderBy('title', 'asc')
      .if(rating, (query) => query.where('rating', `${rating === 'no' ? '=' : '>'}`, ratingVal))
      // .where('rating', '=', 0)
      // .andWhere('count', '>', 0)
      // .andWhere('title', 'LIKE', '%y%')
      .limit(20)
    // .offset(1)
    const musics = musicsInstance.map((m) => m.serialize())
    return inertia.render('home', { musics, rating: rating as string })
  }
}
