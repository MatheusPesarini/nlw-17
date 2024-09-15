// Arquivo criado para popular o banco de dados com dados no primeiro inicio do projeto
import { db, client } from '.'
import { goals, goalCompletions } from './schema'
import dayjs from 'dayjs'

async function seed() {
  await db.delete(goalCompletions) // Deleta primeiro que goals pois depende de goals
  await db.delete(goals)

  const result = await db
    .insert(goals)
    .values([
      { title: 'Learn TypeScript', desiredWeeklyFrequency: 3 },
      { title: 'Learn React', desiredWeeklyFrequency: 5 },
      { title: 'Learn Node.js', desiredWeeklyFrequency: 4 },
    ])
    .returning()

  const startOfWeek = dayjs().startOf('week') // dayjs é uma lib para manipulação de datas, nesse caso estamos pegando a semana em que estamos

  await db.insert(goalCompletions).values([
    { goalId: result[0].id, createdAt: startOfWeek.toDate() },
    { goalId: result[1].id, createdAt: startOfWeek.add(1, 'day').toDate() },
  ])
}

seed().finally(() => {
  client.end()
})
