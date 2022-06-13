import { BankAccountEvent, BankAccountOpenEvent } from '../types'

const isBankAccountOpenEvent = (
  event: BankAccountEvent
): event is BankAccountOpenEvent => event.type === 'AccountOpened'

export const accountOpenedEvent = (events: BankAccountEvent[]) => {
  return events.filter(isBankAccountOpenEvent)[0]
}
