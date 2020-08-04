// This file needs for TypeORM CLI like running/reverting migrations
const type: any = 'postgres'

const typeormConfig = {
  type,
  host: process.env.PG_HOST,
  port: 5432,
  username: process.env.PG_USER,
  password: process.env.PG_PASSWORD,
  database: process.env.NODE_ENV === 'test' ? 'test_payform' : process.env.PG_DATABASE,
  entities: ['dist/**/*.entity.js'],
  migrations: ['dist/migrations/*.js'],
  synchronize: false,
  logging: false,
  uuidExtension: 'uuid-ossp',
  cli: {
    migrationsDir: 'migrations',
  },
}
// export default breaks migrations https://github.com/typeorm/typeorm/issues/5003
export = typeormConfig
