require('dotenv').config()

const path = require('path')

const Koa = require('koa')
const serve = require('koa-static')

const wakatime = require('./lib/routes/wakatime')
const badge = require('./lib/routes/badge')

const app = new Koa()

app.use(serve(path.join(__dirname, 'assets', 'fonts')))

app.use(wakatime.routes())
app.use(wakatime.allowedMethods())

app.use(badge.routes())
app.use(badge.allowedMethods())

app.listen(3000)
