import { Sql } from 'postgres';

export type Notification = {
  id: number;
  usersId: string;
};

export async function up(sql: Sql) {
  await sql`
    CREATE TABLE
      notifications (
        id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
        expiry_timestamp TIMESTAMP NOT NULL DEFAULT NOW (),
        user_id INTEGER NOT NULL REFERENCES users (id) ON DELETE CASCADE
      );
  `;
}

export async function down(sql: Sql) {
  await sql` DROP TABLE notifications
  `;
}
