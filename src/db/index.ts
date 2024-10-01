import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'
import * as schema from './schema'
import { env } from '../env'

export const client = postgres(env.DATABASE_URL) // criando a conexão com o banco de dados
export const db = drizzle(client, { schema, logger: true }) // criando a instância do drizzle