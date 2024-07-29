import { Knex } from "knex";
import { constantVariables } from "../config/variables";

const knexConfig: { [key: string]: Knex.Config } = {
  development: {
    client: "mysql2",
    connection: {
      host: constantVariables.db_host,
      user: constantVariables.db_user,
      password: constantVariables.db_password,
      database: undefined,
    },
    migrations: {
      tableName: "knex_migrations",
    },
  },
};

export default knexConfig;
