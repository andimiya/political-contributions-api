module.exports = {
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "postgres",
  database: "auditlogs_api_db_local",
  migrations: [
    `${__dirname}/src/migration/*.ts`,
  ],
  cli: {
    migrationsDir: `src/migration`
  },
  synchronize: false,
  logging: true,
}
