const path = require('path')
const fs = require('fs')

const Router = require('@koa/router')
const D3 = require('d3-node')
const axios = require('axios')

const router = new Router()

const css = fs.readFileSync(path.join(__dirname, '../../../assets/badge.css'))

const createBadge = (size, rx, fg1, bg1, txt1, fg2, bg2, txt2) => {
  const d3n = new D3({ styles: css.toString() })

  const padding = 12.5
  const height = (size) ? 28 : 20

  const len1 = txt1.length * 8.3
  const len2 = txt2.length * 8.7
  const tot = len1 + len2 + (padding * 4)

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
    .attr('fill', `#${bg1}`)

  svg.append('text')
    .attr('id', 'txt1')
    .attr('class', `txt1 ${(size) ? 'big' : ''}`)
    .attr('x', padding - 2)
    .attr('y', (size) ? 17.5 : 13.5)
    .attr('fill', `#${fg1}`)
    .text(txt1.toUpperCase())

  svg.append('rect')
    .attr('mask', 'url(#badge)')
    .attr('x', len1 + (padding * 2))
    .attr('y', 0)
    .attr('width', len2 + (padding * 2))
    .attr('height', height)
    .attr('fill', `#${bg2}`)

  svg.append('text')
    .attr('id', 'txt2')
    .attr('class', `txt2 ${(size) ? 'big' : ''}`)
    .attr('x', len1 + (padding * 3))
    .attr('y', (size) ? 17.5 : 13.5)
    .attr('fill', `#${fg2}`)
    .text(txt2.toUpperCase())

  return d3n
}

router.get('/badge/version/:prov/:org/:repo/:size/:rx/:fg1/:bg1/:fg2/:bg2', async (ctx) => {
  const org = ctx.params.org
  const repo = ctx.params.repo
  const prov = ctx.params.prov

  const gitlab = `https://gitlab.com/${org}/${repo}/-/raw/master/package.json`
  const github = `https://raw.githubusercontent.com/${org}/${repo}/master/package.json`

  const request = await axios.get((prov) === 'gitlab' ? gitlab : github)

  const size = Number(ctx.params.size)
  const rx = Number(ctx.params.rx)
  const txt1 = 'version'
  const txt2 = request.data.version
  const fg1 = ctx.params.fg1
  const bg1 = ctx.params.bg1
  const fg2 = ctx.params.fg2
  const bg2 = ctx.params.bg2

  const d3n = createBadge(size, rx, fg1, bg1, txt1, fg2, bg2, txt2)
  ctx.type = 'image/svg+xml; charset=utf-8'
  ctx.body = Buffer.from(d3n.svgString())
})

router.get('/badge/:size/:rx/:fg1/:bg1/:txt1/:fg2/:bg2/:txt2', async (ctx) => {
  const size = Number(ctx.params.size)
  const rx = Number(ctx.params.rx)
  const txt1 = ctx.params.txt1
  const txt2 = ctx.params.txt2
  const fg1 = ctx.params.fg1
  const bg1 = ctx.params.bg1
  const fg2 = ctx.params.fg2
  const bg2 = ctx.params.bg2

  const d3n = createBadge(size, rx, fg1, bg1, txt1, fg2, bg2, txt2)
  ctx.type = 'image/svg+xml; charset=utf-8'
  ctx.body = Buffer.from(d3n.svgString())
})

module.exports = router
