require('dotenv').config()

const Koa = require('koa')
const Router = require('@koa/router')

const axios = require('axios')
const D3 = require('d3-node')

const app = new Koa()
const router = new Router()
const d3 = new D3({ styles: '.item { font: 400 10px Sans-Serif; fill: #8b949e  } .header { font: 600 18px Sans-Serif; fill: #2a84ea }' })

const waka = 'https://wakatime.com/api/v1'
const key = process.env.WAKA_KEY

const card = {
  width: 500,
  height: 200,
  padding: 25
}

const bar = {
  width: 450,
  height: 8
}

router.get('/waka/:username/editors', async (ctx) => {
  const username = ctx.params.username
  const stats = await axios.get(`${waka}/users/${username}/stats/last_7_days?api_key=${key}`)

  const svg = d3.createSVG()
    .attr('xmlns', 'http://www.w3.org/2000/svg')
    .attr('viewBox', `0 0 ${card.width} ${card.height}`)
    .attr('width', card.width)
    .attr('height', card.height)

  svg
    .append('text')
    .attr('class', 'header')
    .attr('x', 25)
    .attr('y', 43)
    .text('Editors')

  svg
    .append('mask')
    .attr('id', 'editors')
    .append('rect')
    .attr('x', card.padding)
    .attr('y', 58)
    .attr('width', bar.width)
    .attr('height', bar.height)
    .attr('rx', 5)
    .attr('fill', 'white')

  stats.data.data.editors.reduce((accumulator, editor, index) => {
    console.log(editor)
    const fill = '#' + ((1 << 24) * Math.random() | 0).toString(16)
    const width = Math.round(450 / 100 * editor.percent)

    svg
      .append('rect')
      .attr('mask', 'url(#editors)')
      .attr('x', accumulator)
      .attr('y', 58)
      .attr('width', width)
      .attr('height', bar.width)
      .attr('fill', fill)

    const x = ((index + 1) % 2) ? 0 : 225
    const y = ((index + 1) % 2) ? (index + 1) * 12 : index * 12

    const child = svg
      .append('g')
      .append('svg')
      .attr('x', card.padding)
      .attr('y', 73)
      .attr('transform', `translate(${x},${y})`)

    child
      .append('circle')
      .attr('cx', 5)
      .attr('cy', 5)
      .attr('r', 5)
      .attr('fill', fill)

    child
      .append('text')
      .attr('class', 'item')
      .attr('x', 20)
      .attr('y', 8.75)
      .text(`${editor.name} ${editor.text} (${editor.percent}%)`)

    return Math.round((450 / 100 * editor.percent) + accumulator)
  }, card.padding)

  ctx.type = 'image/svg+xml; charset=utf-8'
  ctx.body = Buffer.from(d3.svgString())
})

app.use(router.routes())
app.use(router.allowedMethods())

app.listen(3000)
