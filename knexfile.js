module.exports = {
  development: {
    client: "sqlite3",
    connection: {
      filename: "./database/db.db3"
    },
    useNullAsDefault: true,
    debug: true
  },
  migrations: {
    directory: "./database/migrations"
  }
};