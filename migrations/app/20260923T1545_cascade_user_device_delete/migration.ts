#!/usr/bin/env -S node
import type { Contract as Start } from '../../snapshots/136d1085a5c2afa17344af4559cccc31f8a2e65bd324c0572326b2ba37d429b2/contract';
import startContract from '../../snapshots/136d1085a5c2afa17344af4559cccc31f8a2e65bd324c0572326b2ba37d429b2/contract.json' with { type: 'json' };
import type { Contract as End } from '../../snapshots/3da9f48a797c3b19774b173e20e57e0b7ea298d292288c9cca2c1bd0d6e5f5b0/contract';
import endContract from '../../snapshots/3da9f48a797c3b19774b173e20e57e0b7ea298d292288c9cca2c1bd0d6e5f5b0/contract.json' with { type: 'json' };
import { Migration, MigrationCLI } from '@prisma/orm-postgres/migration';

export default class M extends Migration<Start, End> {
  override readonly startContractJson = startContract;
  override readonly endContractJson = endContract;

  override get operations() {
    return [
      this.setNotNull({
        schema: 'public',
        table: 'device',
        column: 'userId',
      }),
      this.dropConstraint({
        schema: 'public',
        table: 'device',
        constraint: 'device_userId_fkey',
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'device',
        foreignKey: {
          name: 'device_userId_fkey',
          columns: ['userId'],
          references: { schema: 'public', table: 'user', columns: ['id'] },
          onDelete: 'cascade',
        },
      }),
    ];
  }
}

MigrationCLI.run(import.meta.url, M);
