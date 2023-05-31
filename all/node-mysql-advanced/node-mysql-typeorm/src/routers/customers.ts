import { Router, Request, Response } from 'express'
import {
  createCustomer,
  deleteCustomer,
  findCustomers,
  updateCustomer,
  findCustomerOrdersProductsByPaidStatus,
} from '../controllers/customers'

const router: Router = Router()

router.post('/', async (req: Request, res: Response) => {
  try {
    const newCustomer = await createCustomer(req.body)
    res.send(newCustomer)
  } catch (error) {
    console.error(error)
    res.sendStatus(500)
  }
})


router.get('/orders-products', async (req: Request, res: Response) => {
    try {
      const [customer] = await findCustomerOrdersProductsByPaidStatus(
        +req.query.customerId,
        req.query.isPaid === 'true'
      )
      customer ? res.send(customer) : res.sendStatus(404)
    } catch (error) {
      console.error(error)
      res.sendStatus(500)
    }
  })

router.get('/:id', async (req: Request, res: Response) => {
  try {
    const withRelations = req.query.withRelations === 'true'
    const [customer] = await findCustomers(+req.params.id, withRelations)
    customer ? res.send(customer) : res.sendStatus(404)
  } catch (error) {
    console.error(error)
    res.sendStatus(500)
  }
})

router.get('/', async (req: Request, res: Response) => {
  try {
    const customer = await findCustomers(null, true)
    customer.length ? res.send(customer) : res.sendStatus(404)
  } catch (error) {
    res.sendStatus(500)
  }
})

router.patch('/:id', async (req: Request, res: Response) => {
  try {
    const isUpdated = await updateCustomer(+req.params.id, req.body)
    isUpdated
      ? res.send(`Customer ${req.params.id} is updated`)
      : res.send('Nothing is updated')
  } catch (error) {
    console.error(error)
    res.sendStatus(500)
  }
})

router.delete('/:id', async (req: Request, res: Response) => {
  try {
    const isDeleted = await deleteCustomer(+req.params.id)
    isDeleted
      ? res.send(`Customer ${req.params.id} is deleted`)
      : res.send('Nothing is deleted')
  } catch (error) {
    console.error(error)
    res.sendStatus(500)
  }
})


export default router
