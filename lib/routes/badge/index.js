const path = require('path')
const fs = require('fs')

const Router = require('@koa/router')
const D3 = require('d3-node')

const router = new Router()

const css = fs.readFileSync(path.join(__dirname, '../../../assets/badge.css'))

router.get('/badge/:color1/:background1/:txt1/:color2/:background2/:txt2', async (ctx) => {
  const txt1 = ctx.params.txt1
  const txt2 = ctx.params.txt2
  const color1 = ctx.params.color1
  const color2 = ctx.params.color2
  const background1 = ctx.params.background1
  const background2 = ctx.params.background2

  const len1 = txt1.length * 7.2
  const len2 = txt2.length * 7.2
  const tot = len1 + len2 + 20

  const d3n = new D3({ styles: css.toString() })

  const svg = d3n.createSVG()
    .attr('xmlns', 'http://www.w3.org/2000/svg')
    .attr('viewBox', `0 0 ${tot} 20`)
    .attr('width', tot)
    .attr('height', 20)

  svg.append('rect')
    .attr('class', '')
    .attr('x', 0)
    .attr('y', 0)
    .attr('width', len1 + 10)
    .attr('height', 20)
    .attr('fill', `#${background1}`)

  svg.append('text')
    .attr('id', 'txt1')
    .attr('class', 'txt1')
    .attr('x', 5)
    .attr('y', 14)
    .attr('fill', `#${color1}`)
    .text(txt1)

  svg.append('rect')
    .attr('class', '')
    .attr('x', len1 + 10)
    .attr('y', 0)
    .attr('width', len2 + 10)
    .attr('height', 20)
    .attr('fill', `#${background2}`)

  svg.append('text')
    .attr('id', 'txt2')
    .attr('class', 'txt2')
    .attr('x', len1 + 15)
    .attr('y', 14)
    .attr('fill', `#${color2}`)
    .text(txt2)

  ctx.type = 'image/svg+xml; charset=utf-8'
  ctx.body = Buffer.from(d3n.svgString())
})

module.exports = router
