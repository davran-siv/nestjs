import { NestFactory } from '@nestjs/core'
import * as c from 'config'
import { ApplicationModule } from './app.module'
import dbMigrate = require('db-migrate')

async function bootstrap() {
  await runMigration()
  const app = await NestFactory.create(ApplicationModule)
  await app.listen(3000)
}

const runMigration = async () => {
  if (c.has('db')) {
    const dbConfig = c.get('db')
    const migration = (dbMigrate as any).getInstance(true, { config: { dev: dbConfig } })
    await migration.up()
  }
}

bootstrap()
