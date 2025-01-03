import { integer, pgTable, serial, text } from "drizzle-orm/pg-core";

export const usersTable = pgTable("users_table", {
    id: serial().primaryKey(),
    name: text().notNull(),
    age: integer().notNull(),
    email: text().notNull().unique(),
});
