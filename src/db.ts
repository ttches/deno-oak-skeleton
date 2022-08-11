import { Pool } from "postgres";

const POOL_CONNECTIONS = 20;

let dbPool: Pool;

// (() => {
//   try {
//     dbPool = new Pool(
//       {
//         database: "postgres",
//         hostname: "127.0.0.1",
//         password: "postgres",
//         port: 5438,
//         user: "postgres",
//       },
//       POOL_CONNECTIONS
//     );
//   } catch {
//     console.log("Couldn't connect to database");
//   }
// })();

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
    if (processError) {
      processError(err);
    }
    const { code, message, status = 400 } = err.fields;
    throw { code, message, status };
  } finally {
    await client.release();
  }
  return res;
};

const errorCodes = {
  DuplicateKey: "23505",
};

export { errorCodes, query };
