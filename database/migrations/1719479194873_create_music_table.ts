import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'music'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')

      // timestamps
      table.timestamp('created_at')
      table.timestamp('updated_at')

      table.text('title').notNullable()
      table.text('artist').notNullable()
      table.text('album').notNullable()
      table.integer('count').unsigned().nullable()
      table.integer('rating').unsigned().nullable()
      table.integer('len').unsigned()
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
