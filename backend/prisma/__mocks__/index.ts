import { PrismaClient } from '@prisma/client';
import { execSync } from 'child_process';
import { join } from 'path';
import { URL } from 'url';
import { v4 as uuid } from 'uuid';
import fs from 'fs/promises';
import path from 'path';

const generateDatabaseURL = (schema: string) => {
  if (!process.env.DATABASE_URL) throw new Error('no database url provided');
  const url = new URL(process.env.DATABASE_URL);
  url.searchParams.append('schema', schema);
  return url.toString();
};

const schemaId = `test-${uuid()}`;
const prismaBinary = join(
  __dirname,
  '..',
  '..',
  'node_modules',
  '.bin',
  'prisma'
);

const url = generateDatabaseURL(schemaId);
process.env.DATABASE_URL = url;
export const prisma = new PrismaClient({
  datasources: { db: { url } },
});

jest.setTimeout(30000);

beforeEach(async () => {
  execSync(`${prismaBinary} db push`, {
    env: {
      ...process.env,
      DATABASE_URL: generateDatabaseURL(schemaId),
    },
  });

  const seed = JSON.parse(
    await fs.readFile(path.join(__dirname, 'seed.json'), 'utf-8')
  );

  for (let tbl in seed) {
    // @ts-ignore
    await prisma[tbl].createMany({ data: seed[tbl] });
  }
});

afterEach(async () => {
  await prisma.$executeRawUnsafe(
    `DROP SCHEMA IF EXISTS "${schemaId}" CASCADE;`
  );
  await prisma.$disconnect();
});
