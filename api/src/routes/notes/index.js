const koaRouter = require('koa-joi-router')
const Joi = koaRouter.Joi
const router = koaRouter()
const { web3, contracts: { Notes } } = require('src/utils/web3')

const routes = [
  {
    method: 'get',
    path: '/notes',
    output: {
      200: {
        body: Joi.object()
      }
    },
    handler: async ctx => {
      try {
        console.log('NOTES**************', Notes.options.from)
        const count = await Notes.methods.getNoteCount().call()
        console.log('COUNT', count)
        const notes = []
        // const note = await Notes.methods.getNote(0).call()
        // console.log('NOTE*', note)
        for (let i = 0; i < count; i++) {
          const note = Notes.methods.getNote(i).call()
          console.log('NOTE', note)
          notes.push(note)
        }
        console.log('****', notes)
        const result = await Promise.all(notes)
        console.log('RESULT*', result)
        ctx.ok(result)
      } catch (error) {
        console.log('ERROR', error)
        ctx.badRequest({ error: `${error}` })
      }
    }
  }
]

router.route(routes)

module.exports = router
