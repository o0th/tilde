require('dotenv').config()

const Koa = require('koa')

const wakatime = require('./lib/routes/wakatime')
const badge = require('./lib/routes/badge')

const app = new Koa()

app.use((ctx, next) => {
  process.stdout.write(`${ctx.origin} ${ctx.url}\n`)
  return next()
})

app.use(wakatime.routes())
app.use(wakatime.allowedMethods())

app.use(badge.routes())
app.use(badge.allowedMethods())

app.listen(3000)
