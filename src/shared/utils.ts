import {
  BankAccountEvent,
  BankAccountMoneyEvent,
  BankAccountOpenEvent,
  IBankAccountTransaction,
} from '../types'

const isBankAccountOpenEvent = (
  event: BankAccountEvent
): event is BankAccountOpenEvent => event.type === 'AccountOpened'

const isBankAccountMoneyCreditedEvent = (
  event: BankAccountEvent
): event is BankAccountMoneyEvent => event.type === 'MoneyCredited'

const isBankAccountMoneyDebitedEvent = (
  event: BankAccountEvent
): event is BankAccountMoneyEvent => event.type === 'MoneyDebited'

export const accountOpenedEvent = (events: BankAccountEvent[]) => {
  return events.filter(isBankAccountOpenEvent)[0]
}

export const moneyCreditedEvents = (events: BankAccountEvent[]) =>
  events.filter(isBankAccountMoneyCreditedEvent)

export const moneyDebitedEvents = (events: BankAccountEvent[]) =>
  events.filter(isBankAccountMoneyDebitedEvent)

export const formattedMoneyEvents = (moneyEvents: BankAccountMoneyEvent[]) =>
  moneyEvents
    .sort((firstEvent, secondEvent) => {
      const firstEventDate: number = Date.parse(firstEvent.time)
      const secondEventDate: number = Date.parse(secondEvent.time)
      return secondEventDate - firstEventDate
    })
    .map((sortedEvent) => {
      return <IBankAccountTransaction>{
        type: sortedEvent.type === 'MoneyCredited' ? 'credit' : 'debit',
        value: sortedEvent.value,
        timestamp: Date.parse(sortedEvent.time),
      }
    })
