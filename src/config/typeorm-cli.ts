import { getOrmConfig } from './typeorm';

export default [
  {
    name: 'migrations:generate',
    ...getOrmConfig(),
    entities: [`${__dirname}/../**/*.entity.{ts,js}`],
    migrationsDir: 'src/migrations',
  },
  {
    name: 'migrations:create-run-revert',
    ...getOrmConfig(),
    migrations: [`${__dirname}/../migrations/*.{ts,js}`],
  },
];
