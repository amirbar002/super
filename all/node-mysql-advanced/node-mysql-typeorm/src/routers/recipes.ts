import { Router, Request, Response } from 'express'
import { NOT_FOUND } from '../constants'
import { createOrder, findOrders, deleteOrder, updateOrder, joinAndGroupbyOrders } from '../controllers/recipes'

const router: Router = Router()

// curl --location --request POST 'http://localhost:8080/orders' \
// --header 'Content-Type: application/json' \
// --data-raw '{
//     "price": 34,
//     "currency": "USD",
//     "order_date": "2022-12-09",
//     "status": "succeeded",
//     "comments": "Great company",
//     "is_paid": false,
//     "customer": 1
// }'
router.post('/', async (req: Request, res: Response) => {
  try {
    const { products, ...orderProperties } = req.body
    const newOrder = await createOrder(orderProperties, products)
    res.send(newOrder)
  } catch (error) {
    console.error(error)
    res.sendStatus(500)
  }
})

router.post('/group-orders', async (req: Request, res: Response) => {
    try {
      const { status, lastNameArr } = req.body
      const responseData = await joinAndGroupbyOrders(status, lastNameArr)
      responseData.length ? res.send(responseData) : res.sendStatus(404)
    } catch (error) {
      console.error(error)
      res.sendStatus(500)
    }
  })

router.get('/:id', async (req: Request, res: Response) => {
  try {
    const withRelations = req.query.withRelations === 'true'
    const [order] = await findOrders(+req.params.id, withRelations)
    order ? res.send(order) : res.sendStatus(404)
  } catch (error) {
    console.error(error)
    res.sendStatus(500)
  }
})

router.get('/', async (req: Request, res: Response) => {
  try {
    const orders = await findOrders(null, true)
    orders.length ? res.send(orders) : res.sendStatus(404)
  } catch (error) {
    res.sendStatus(500)
  }
})


router.patch('/:id', async (req: Request, res: Response) => {
    try {
      const responseData = await updateOrder(+req.params.id, req.body)
      responseData === NOT_FOUND
        ? res.sendStatus(404)
        : res.send(responseData)
    } catch (error) {
      console.error(error)
      res.sendStatus(500)
    }
  })

router.delete('/:id', async (req: Request, res: Response) => {
  try {
    const isDeleted = await deleteOrder(+req.params.id)
    isDeleted
      ? res.send(`order ${req.params.id} is deleted`)
      : res.send('Nothing is deleted')
  } catch (error) {
    console.error(error)
    res.sendStatus(500)
  }
})

export default router
