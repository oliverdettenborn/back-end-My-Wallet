module.exports = {
  "type": "postgres",
  "url": process.env.DATABASE_URL,
  "logging": false,
  "migrationsTableName": "custom_migration_table",
  "entities": [
    process.env.NODE_ENV === "production" ? "dist/models/**/*.js" : "src/models/**/*.ts"
  ],
  "migrations": [
    process.env.NODE_ENV === "production" ? "dist/database/migration/**/*.js" : "src/database/migration/**/*.ts"
  ],
  "cli": {
    "entitiesDir": process.env.NODE_ENV === "production" ? "dist/models" : "src/models",
    "migrationsDir": process.env.NODE_ENV === "production" ? "dist/database/migration" : "src/database/migration"
  }
}