import { Pool } from "postgres";
import { camelKeys } from "./utilities/camelCase.ts";

const POOL_CONNECTIONS = 20;

let dbPool: Pool;

(() => {
  // this try doesn't work
  try {
    dbPool = new Pool(
      {
        database: "postgres",
        hostname: "127.0.0.1",
        password: "postgres",
        port: 5438,
        user: "postgres",
      },
      POOL_CONNECTIONS
    );
  } catch {
    console.log("Couldn't connect to database");
  }
})();

const query = async (
  text: string,
  params?: { [key: string]: any },
  processError?: (error: unknown) => unknown
) => {
  const client = await dbPool.connect();
  let res: Awaited<ReturnType<typeof client.queryObject>>;
  try {
    res = await client.queryObject(text, params);
    const start = Date.now();
    const duration = Date.now() - start;

    console.log("executed query", { text, duration, rows: res.rowCount });
  } catch (err) {
    // TODO: query error:  Error: No value was provided for the query argument "image" doesn't have c so destructure below fails
    console.log("query error: ", err);
    if (processError) {
      processError(err);
    }
    const { code, message, status = 400 } = err.fields;
    throw { code, message, status };
  } finally {
    await client.release();
  }

  if (res.rows) {
    return {
      ...res,
      rows: res.rows.map((row) => camelKeys(row as { [key: string]: any })),
    };
  }

  return res;
};

const errorCodes = {
  DuplicateKey: "23505",
};

export { errorCodes, query };
