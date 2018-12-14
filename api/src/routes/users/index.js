const koaRouter = require('koa-joi-router')
const Joi = koaRouter.Joi
const router = koaRouter()
const { contracts: { Users } } = require('src/utils/web3')

const routes = [
  {
    method: 'get',
    path: '/users',
    output: {
      200: {
        body: {
          count: Joi.number,
          notes: Joi.array().items(Joi.object())
        }
      }
    },
    handler: async ctx => {
      try {
        const count = await Users.methods.getUserCount().call()
        const promises = []
        for (let i = 0; i < count; i++) {
          const user = Users.methods.getUser(i).call()
          promises.push(user)
        }

        const users = await Promise.all(promises)
        ctx.ok({
          count,
          users
        })
      } catch (error) {
        ctx.throw(error)
      }
    }
  },
  {
    method: 'post',
    path: '/users',
    validate: {
      type: 'json',
      body: {
        params: Joi.array().items(
          Joi.string().required(),
          Joi.string().required()
        )
      }
    },
    handler: async ctx => {
      try {
        const { params } = ctx.request.body
        const userId = Number(await Users.methods.getUserCount().call()) + 1
        console.log('USER ID', userId)
        const username = `User ${userId}`
        console.log('PARAMS', params)
        console.log('**', ...params, username)
        await Users.methods.addUser(...params, username).send()
        ctx.ok()
      } catch (error) {
        ctx.throw(error)
      }
    }
  }
]

router.route(routes)

module.exports = router
