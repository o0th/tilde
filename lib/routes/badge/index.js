const path = require('path')
const fs = require('fs')

const Router = require('@koa/router')
const D3 = require('d3-node')

const router = new Router()

const css = fs.readFileSync(path.join(__dirname, '../../../assets/badge.css'))

router.get('/badge/normal/:txt1/:txt2', async (ctx) => {
  const txt1 = ctx.params.txt1
  const txt2 = ctx.params.txt2

  const len1 = txt1.length * 9
  const len2 = txt2.length * 8
  const tot = len1 + len2

  const d3 = new D3({ styles: css.toString() })

  const svg = d3.createSVG()
    .attr('xmlns', 'http://www.w3.org/2000/svg')
    .attr('viewBox', `0 0 ${tot} 20`)
    .attr('width', tot)
    .attr('height', 20)

  svg.append('rect')
    .attr('class', '')
    .attr('x', 0)
    .attr('y', 0)
    .attr('width', len1)
    .attr('height', 20)
    .attr('fill', '#333')

  svg.append('rect')
    .attr('class', '')
    .attr('x', len1)
    .attr('y', 0)
    .attr('width', len2)
    .attr('height', 20)
    .attr('fill', '#555')

  svg.append('text')
    .attr('class', 'txt1')
    .attr('x', 0)
    .attr('y', 14)
    .text(txt1)

  ctx.type = 'image/svg+xml; charset=utf-8'
  ctx.body = Buffer.from(d3.svgString())
})

module.exports = router
