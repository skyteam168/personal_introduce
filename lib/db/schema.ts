import {
  pgTable,
  text,
  timestamp,
  integer,
  primaryKey,
  uuid,
  jsonb,
  uniqueIndex,
} from "drizzle-orm/pg-core";
import type { AdapterAccountType } from "next-auth/adapters";

// ─── Auth.js tables ───────────────────────────────────────────────
export const users = pgTable("user", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  name: text("name"),
  email: text("email").notNull().unique(),
  emailVerified: timestamp("emailVerified", { mode: "date" }),
  image: text("image"),
});

export const accounts = pgTable(
  "account",
  {
    userId: text("userId")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    type: text("type").$type<AdapterAccountType>().notNull(),
    provider: text("provider").notNull(),
    providerAccountId: text("providerAccountId").notNull(),
    refresh_token: text("refresh_token"),
    access_token: text("access_token"),
    expires_at: integer("expires_at"),
    token_type: text("token_type"),
    scope: text("scope"),
    id_token: text("id_token"),
    session_state: text("session_state"),
  },
  (account) => [
    primaryKey({ columns: [account.provider, account.providerAccountId] }),
  ]
);

export const sessions = pgTable("session", {
  sessionToken: text("sessionToken").primaryKey(),
  userId: text("userId")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  expires: timestamp("expires", { mode: "date" }).notNull(),
});

export const verificationTokens = pgTable(
  "verificationToken",
  {
    identifier: text("identifier").notNull(),
    token: text("token").notNull(),
    expires: timestamp("expires", { mode: "date" }).notNull(),
  },
  (vt) => [primaryKey({ columns: [vt.identifier, vt.token] })]
);

// ─── Blog tables ──────────────────────────────────────────────────
export const categories = pgTable("category", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: text("name").notNull(),
  slug: text("slug").notNull().unique(),
  description: text("description"),
  createdAt: timestamp("createdAt", { mode: "date" }).defaultNow().notNull(),
});

export const posts = pgTable("post", {
  id: uuid("id").defaultRandom().primaryKey(),
  title: text("title").notNull(),
  slug: text("slug").notNull().unique(),
  excerpt: text("excerpt"),
  content: jsonb("content").notNull(),
  coverImage: text("coverImage"),
  categoryId: uuid("categoryId").references(() => categories.id, {
    onDelete: "set null",
  }),
  authorId: text("authorId")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  status: text("status").$type<"draft" | "published">().notNull().default("draft"),
  publishedAt: timestamp("publishedAt", { mode: "date" }),
  likeCount: integer("likeCount").notNull().default(0),
  commentCount: integer("commentCount").notNull().default(0),
  shareCount: integer("shareCount").notNull().default(0),
  createdAt: timestamp("createdAt", { mode: "date" }).defaultNow().notNull(),
  updatedAt: timestamp("updatedAt", { mode: "date" }).defaultNow().notNull(),
});

export const comments = pgTable("comment", {
  id: uuid("id").defaultRandom().primaryKey(),
  postId: uuid("postId")
    .notNull()
    .references(() => posts.id, { onDelete: "cascade" }),
  userId: text("userId")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  content: text("content").notNull(),
  createdAt: timestamp("createdAt", { mode: "date" }).defaultNow().notNull(),
});

export const likes = pgTable(
  "like",
  {
    postId: uuid("postId")
      .notNull()
      .references(() => posts.id, { onDelete: "cascade" }),
    userId: text("userId")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    createdAt: timestamp("createdAt", { mode: "date" }).defaultNow().notNull(),
  },
  (table) => [
    primaryKey({ columns: [table.postId, table.userId] }),
    uniqueIndex("like_post_user_idx").on(table.postId, table.userId),
  ]
);

export type User = typeof users.$inferSelect;
export type Category = typeof categories.$inferSelect;
export type Post = typeof posts.$inferSelect;
export type Comment = typeof comments.$inferSelect;
