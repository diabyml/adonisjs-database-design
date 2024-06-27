import Music from '#models/music'
import type { HttpContext } from '@adonisjs/core/http'
// import db from '@adonisjs/lucid/services/db'

// async function getCount() {
//   const res = await db.rawQuery('SELECT COUNT(*) FROM music').exec()
//   return res.rows[0].count
// }

export default class HomeController {
  async render({ inertia }: HttpContext) {
    // const numberOfPages = 10
    // const count = await getCount()
    // console.log('number of pages:', Math.ceil(count / numberOfPages))
    // console.log('count', count)
    const musicsInstance = await Music.query()
      .orderBy('title', 'asc')
      .where('rating', '>', 0)
      .andWhere('count', '>', 0)
      .andWhere('title', 'LIKE', '%y%')
      .limit(10)
      .offset(1)
    const musics = musicsInstance.map((m) => m.serialize())
    return inertia.render('home', { musics })
  }
}
