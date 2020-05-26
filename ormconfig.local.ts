module.exports = {
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "postgres",
  database: "auditlogs_api_db_local",
  entities: [
    `${__dirname}/src/entities/*.ts`,
  ],
  migrations: [
    `${__dirname}/src/migration/*.ts`,
  ],
  synchronize: false,
  logging: true,
}
