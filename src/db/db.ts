import Knex from "knex";
import knexConfig from "./knexfile";
import createDatabaseAndTables from "./schema";

const environment = process.env.NODE_ENV || "development";
const configOptions = knexConfig[environment];

export const db = Knex(configOptions);

(async () => {
  try {
    await createDatabaseAndTables();
  } catch (error: any) {
    console.log(error);
  }
})();
