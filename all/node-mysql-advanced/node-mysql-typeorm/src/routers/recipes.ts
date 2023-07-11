import { Router, Request, Response } from 'express'
import { NOT_FOUND } from '../constants'
import { createOrder, findOrders, deleteOrder, updateOrder } from '../controllers/recipes'

const router: Router = Router()

router.post('/', async (req: Request, res: Response) => {
  try {
    console.log(req.body ,'hhhhhhhhhhhhh')
    const newOrder = await createOrder(req.body)
    res.send(newOrder)
  } catch (error) {
    console.error(error)
    res.sendStatus(500)
  }
})

// router.post('/group-orders', async (req: Request, res: Response) => {
//     try {
//       const { status, lastNameArr } = req.body
//       const responseData = await joinAndGroupbyOrders(status, lastNameArr)
//       responseData.length ? res.send(responseData) : res.sendStatus(404)
//     } catch (error) {
//       console.error(error)
//       res.sendStatus(500)
//     }
//   })

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
      const responseData:any = await updateOrder(+req.params.id, req.body)
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
