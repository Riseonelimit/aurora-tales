import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

async function createConnection() {
    // Disable prefetch as it is not supported for "Transaction" pool mode
    const client = postgres(process.env.DATABASE_URL!, { prepare: false });
    return drizzle({ client, casing: "snake_case" });
}

export const db = await createConnection();
