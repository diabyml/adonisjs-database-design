import Music from '#models/music'
import type { HttpContext } from '@adonisjs/core/http'
import app from '@adonisjs/core/services/app'
import fs from 'node:fs'

export default class UploadController {
  async execute({ request, response }: HttpContext) {
    const file = request.file('file')

    await file?.move(app.makePath(`storage/files`))

    // console.log(file?.fileName)

    /*
    
        READ AND PROCESSING FILE

    */
    fs.readFile('storage/files/' + file?.fileName, 'utf-8', async (err, data) => {
      if (err) {
        console.log('Error reading file: ', err)
      } else {
        const lines = data.split('\n')
        console.log('lines length:', lines.length)

        // length 0 - 295
        let musics = Array(296)
        console.log('musics length before adding:', musics.length)
        lines.forEach(async (line, idx) => {
          // console.log('line', line)
          // const attrs: String[] = ['title', 'artist', 'album', 'count', 'rating', 'len']
          // exclude empty lines
          if (line) {
            // console.log('line:', idx)
            const music = new Music()
            line.split(',').forEach((el, index) => {
              // console.log('el:', el)
              if (index === 0) music.title = el
              else if (index === 1) music.artist = el
              else if (index === 2) music.album = el
              else if (index === 3) music.count = Number(el) || 0
              else if (index === 4) music.rating = Number(el) || 0
              else if (index === 5) music.len = Number(el) || 0
            })
            // console.log('music:', music.serialize())
            musics[idx] = music.serialize()
            // console.log('index:', idx)
          }
        })

        console.log('musics length after adding:', musics.length)
        console.log('musics:', musics)
        // await Music.createMany(musics)
      }
    })

    return response.redirect('/')
  }
}
