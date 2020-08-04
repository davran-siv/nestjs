import { ConfigService } from '@nestjs/config'

// This file needs for NestJS
const type: any = 'postgres'

const typeormConfigAsync = (config: ConfigService) => ({
  type,
  host: config.get('PG_HOST'),
  port: 5432,
  username: config.get('PG_USER'),
  password: config.get('PG_PASSWORD'),
  database: config.get('NODE_ENV') === 'test' ? 'test_payform' : config.get('PG_DATABASE'),
  entities: ['dist/**/*.entity.js'],
  migrations: ['dist/migrations/*.js'],
  synchronize: false,
  logging: false,
  uuidExtension: 'uuid-ossp',
  cli: {
    migrationsDir: 'migrations',
  },
})
export default typeormConfigAsync
