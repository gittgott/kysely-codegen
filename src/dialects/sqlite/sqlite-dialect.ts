import { SqliteDialect as KyselySqliteDialect } from 'kysely';
import type { CreateKyselyDialectOptions } from '../../core';
import { Dialect } from '../../core';
import { SqliteAdapter } from './sqlite-adapter';
import { SqliteIntrospector } from './sqlite-introspector';

export class SqliteDialect extends Dialect {
  readonly adapter = new SqliteAdapter();
  readonly introspector = new SqliteIntrospector();

  async createKyselyDialect(options: CreateKyselyDialectOptions) {
    const { default: Database } = await import('better-sqlite3');

    return new KyselySqliteDialect({
      database: new Database(options.connectionString),
    });
  }
}
