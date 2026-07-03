import { drizzle, type PostgresJsDatabase } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./schema";

const connectionString = process.env.DATABASE_URL;

const globalForDb = globalThis as unknown as {
  postgresClient?: ReturnType<typeof postgres>;
  drizzleDb?: PostgresJsDatabase<typeof schema>;
};

function createClient() {
  return postgres(connectionString!, {
    prepare: false,
    max: 1,
    idle_timeout: 0,
    connect_timeout: 10,
    max_lifetime: 60 * 5,
    fetch_types: false,
  });
}

export function resetDbClient() {
  if (globalForDb.postgresClient) {
    void globalForDb.postgresClient.end({ timeout: 0 }).catch(() => undefined);
    globalForDb.postgresClient = undefined;
  }
  globalForDb.drizzleDb = undefined;
}

function getClient() {
  if (!connectionString) return null;
  if (!globalForDb.postgresClient) {
    globalForDb.postgresClient = createClient();
  }
  return globalForDb.postgresClient;
}

function getDrizzle() {
  const client = getClient();
  if (!client) return null;
  if (!globalForDb.drizzleDb) {
    globalForDb.drizzleDb = drizzle(client, { schema });
  }
  return globalForDb.drizzleDb;
}

export const db = getDrizzle();

export function requireDb() {
  const instance = getDrizzle();
  if (!instance) {
    throw new Error(
      "DATABASE_URL is not set. Configure Supabase/Postgres connection in .env"
    );
  }
  return instance;
}
