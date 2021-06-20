const path = require('path')
const fs = require('fs')

const Router = require('@koa/router')
const D3 = require('d3-node')

const router = new Router()

const css = fs.readFileSync(path.join(__dirname, '../../../assets/badge.css'))

router.get('/badge/:size/:rx/:color1/:background1/:txt1/:color2/:background2/:txt2', async (ctx) => {
  const size = Number(ctx.params.size)
  const rx = Number(ctx.params.rx)
  const txt1 = ctx.params.txt1
  const txt2 = ctx.params.txt2
  const color1 = ctx.params.color1
  const color2 = ctx.params.color2
  const background1 = ctx.params.background1
  const background2 = ctx.params.background2

  const padding = 12.5
  const height = (size) ? 28 : 20

  const len1 = txt1.length * 8.3
  const len2 = txt2.length * 8.7
  const tot = len1 + len2 + (padding * 4)

  const d3n = new D3({ styles: css.toString() })

  const svg = d3n.createSVG()
    .attr('xmlns', 'http://www.w3.org/2000/svg')
    .attr('viewBox', `0 0 ${tot} ${height}`)
    .attr('width', tot)
    .attr('height', height)

  svg.append('mask')
    .attr('id', 'badge')
    .append('rect')
    .attr('x', 0)
    .attr('y', 0)
    .attr('width', tot)
    .attr('height', height)
    .attr('rx', rx)
    .attr('fill', 'white')

  svg.append('rect')
    .attr('mask', 'url(#badge)')
    .attr('x', 0)
    .attr('y', 0)
    .attr('width', len1 + (padding * 2))
    .attr('height', height)
    .attr('fill', `#${background1}`)

  svg.append('text')
    .attr('id', 'txt1')
    .attr('class', `txt1 ${(size) ? 'big' : ''}`)
    .attr('x', padding - 2)
    .attr('y', (size) ? 17.5 : 13.5)
    .attr('fill', `#${color1}`)
    .text(txt1.toUpperCase())

  svg.append('rect')
    .attr('mask', 'url(#badge)')
    .attr('x', len1 + (padding * 2))
    .attr('y', 0)
    .attr('width', len2 + 20)
    .attr('height', height)
    .attr('fill', `#${background2}`)

  svg.append('text')
    .attr('id', 'txt2')
    .attr('class', `txt2 ${(size) ? 'big' : ''}`)
    .attr('x', len1 + (padding * 3) - 1)
    .attr('y', (size) ? 17.5 : 13.5)
    .attr('fill', `#${color2}`)
    .text(txt2.toUpperCase())

  ctx.type = 'image/svg+xml; charset=utf-8'
  ctx.body = Buffer.from(d3n.svgString())
})

module.exports = router
