const Koa = require('koa')
const fs = require('fs')

const app = new Koa()

app.use(async ctx => {
  ctx.body = fs.readFileSync('./svgs/hello.svg')
  ctx.type = 'image/svg+xml; charset=utf-8'
})

app.listen(3000)
