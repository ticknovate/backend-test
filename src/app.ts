import express from 'express'
import { expressErrorHandler } from './lib/errorHandling'
import { loadEvents, saveEvents } from './lib/events'
import {
  accountOpenedEvent,
  formattedMoneyEvents,
  moneyCreditedEvents,
  moneyDebitedEvents,
} from './shared/utils'
import { IBankAccount } from './types'

export const app = express()

app.use(express.json())

app.get('/', (req, res) => {
  res.contentType('text/html')
  res.send(`
    <style>
      html { font-family: sans-serif; }
      body { padding: 4rem; line-height: 1.5; }
    </style>

    <h1>Ticknovate test</h1>

    <p>Hello! Add your two routes to this app to complete the test.</p>
    
    <p>The boilerplate of the <a href="/accounts/12060626">first one</a> has been done for you, but you'll
    have to complete the implementation, and add the second route for
    changing an account owner's name. See the README for more information.</p>
    
    <p>Good luck!</p>
  `)
})

// TODO: Complete the implementation of this route!
app.get('/accounts/:id', async (req, res, next) => {
  try {
    // This `loadEvents` function currently just returns an empty array.
    // Take a look at the function and complete the implementation.
    const events = await loadEvents(req.params.id)

    const accountOpenedItem = accountOpenedEvent(events)
    const creditTransactions = moneyCreditedEvents(events)
    const debitTransactions = moneyDebitedEvents(events)

    const creditAmount = creditTransactions
      .map((trans) => trans.value)
      .reduce((val1, val2) => val1 + val2)

    const debitAmount = debitTransactions
      .map((trans) => trans.value)
      .reduce((val1, val2) => val1 + val2)

    const transactionEvents = formattedMoneyEvents(
      creditTransactions.concat(debitTransactions)
    )

    const account: IBankAccount = {
      status: 'open',
      accountId: req.params.id,
      ownerName: accountOpenedItem.ownerName,
      balance: creditAmount - debitAmount,
      isOverdrawn: creditAmount - debitAmount < 0,
      openedAt: Date.parse(accountOpenedItem.time),
      transactions: transactionEvents,
    }

    res.json(account)
  } catch (err) {
    next(err)
  }
})

app.post('/accounts/:id', async (req, res, next) => {
  const { name } = req.body

  try {
    const events = await loadEvents(req.params.id)
    console.log(events)
    const accountOpenedItem = accountOpenedEvent(events)
    console.log(accountOpenedItem)
    accountOpenedItem.ownerName = name

    const updatedEvents = [accountOpenedItem]
    await saveEvents(updatedEvents, true)
    res.send(name)
  } catch (err) {
    next(err)
  }
})
app.use(expressErrorHandler)
