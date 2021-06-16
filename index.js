require('dotenv').config()

const fs = require('fs')

const Koa = require('koa')
const Router = require('@koa/router')

const axios = require('axios')
const D3 = require('d3-node')

const app = new Koa()
const router = new Router()

const waka = 'https://wakatime.com/api/v1'
const key = process.env.WAKATIME_KEY

const css = fs.readFileSync('./styles.css')

const card = {
  width: 500,
  height: 200,
  padding: 25
}

const bar = {
  width: 450,
  height: 8
}

const createSVG = (d3, width, height) => {
  return d3.createSVG()
    .attr('xmlns', 'http://www.w3.org/2000/svg')
    .attr('viewBox', `0 0 ${width} ${height}`)
    .attr('width', width)
    .attr('height', height)
}

const createHeader = (svg, text, x, y) => {
  svg.append('text')
    .attr('class', 'header')
    .attr('x', x)
    .attr('y', y)
    .text(text)
}

const createStats = (svg, stats) => {
  svg
    .append('mask')
    .attr('id', 'stats')
    .append('rect')
    .attr('x', card.padding)
    .attr('y', 58)
    .attr('width', bar.width)
    .attr('height', bar.height)
    .attr('rx', 5)
    .attr('fill', 'white')

  stats.reduce((accumulator, stat, index) => {
    const fill = '#' + ((1 << 24) * Math.random() | 0).toString(16)
    const width = Math.round(450 / 100 * stat.percent)

    svg
      .append('rect')
      .attr('mask', 'url(#stats)')
      .attr('class', stat.name)
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
      .attr('class', stat.name)
      .attr('cx', 5)
      .attr('cy', 5)
      .attr('r', 5)
      .attr('fill', fill)

    child
      .append('text')
      .attr('class', 'item')
      .attr('x', 20)
      .attr('y', 8.75)
      .text(`${stat.name} ${stat.text} (${stat.percent}%)`)

    return Math.round((450 / 100 * stat.percent) + accumulator)
  }, card.padding)

  return svg
}

router.get('/wakatime/:username/stats/editors/:range', async (ctx) => {
  const d3 = new D3({ styles: css.toString() })

  const range = ctx.params.range
  const username = ctx.params.username
  const stats = await axios.get(`${waka}/users/${username}/stats/${range}?api_key=${key}`)

  const svg = createSVG(d3, card.width, card.height)
  createHeader(svg, 'Editors', 25, 43)
  createStats(svg, stats.data.data.editors)

  ctx.type = 'image/svg+xml; charset=utf-8'
  ctx.body = Buffer.from(d3.svgString())
})

router.get('/wakatime/:username/stats/languages/:range', async (ctx) => {
  const d3 = new D3({ styles: css.toString() })

  const range = ctx.params.range
  const username = ctx.params.username
  const stats = await axios.get(`${waka}/users/${username}/stats/${range}?api_key=${key}`)

  const svg = createSVG(d3, card.width, card.height)
  createHeader(svg, 'Languages', 25, 43)
  createStats(svg, stats.data.data.languages)

  ctx.type = 'image/svg+xml; charset=utf-8'
  ctx.body = Buffer.from(d3.svgString())
})

router.get('/wakatime/:username/stats/oss/:range', async (ctx) => {
  const d3 = new D3({ styles: css.toString() })

  const range = ctx.params.range
  const username = ctx.params.username
  const stats = await axios.get(`${waka}/users/${username}/stats/${range}?api_key=${key}`)

  const svg = createSVG(d3, card.width, card.height)
  createHeader(svg, 'Operating Systems', 25, 43)
  createStats(svg, stats.data.data.operating_systems)

  ctx.type = 'image/svg+xml; charset=utf-8'
  ctx.body = Buffer.from(d3.svgString())
})

app.use(router.routes())
app.use(router.allowedMethods())

app.listen(3000)
