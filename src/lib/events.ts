import fs from 'fs/promises'
import path from 'path'
import { AppError } from './errorHandling'
import type { BankAccountEvent } from '../types'

/**
 * Load events for the given `accountId`.
 *
 * TODO: Implement this function. This is part of the test.
 *
 * The implementation should return a promise that resolves to an array
 * of objects, sourced from the relevant directory inside of the "events"
 * directory at the root of this project.
 *
 * @see saveEvents
 */
export async function loadEvents(
  accountId: string
): Promise<BankAccountEvent[]> {
  return []
}

/**
 * Saves new events.
 */
export async function saveEvents(events: BankAccountEvent[]) {
  await Promise.all(
    events.map(async (event) => {
      const filepath = path.join(
        __dirname,
        '../../events',
        event.accountId,
        `${event.position}.json`
      )
      console.log('Writing new event to', filepath)
      await fs.writeFile(filepath, JSON.stringify(event, null, 2), {
        // Fail if the file already exists
        flag: 'wx',
      })
    })
  )
}
