/** Dotenv: load .env file and environment variables */
require('dotenv').config()

/** System dependencies */
const fs = require('fs')

/** Project dependencies */
const Koa = require('koa')
const Router = require('@koa/router')
const D3 = require('d3-node')
const axios = require('axios')

/** Global constructors */
const app = new Koa()
const router = new Router()

/** Global variables */
const waka = 'https://wakatime.com/api/v1'
const key = process.env.WAKATIME_KEY

/** Global files */
const css = fs.readFileSync('./styles.css')

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

const createStats = (svg, stats, width, height, padding) => {
  svg
    .append('mask')
    .attr('id', 'stats')
    .append('rect')
    .attr('x', padding)
    .attr('y', 58)
    .attr('width', width)
    .attr('height', height)
    .attr('rx', 5)
    .attr('fill', 'white')

  stats.reduce((accumulator, stat, index) => {
    const fill = '#' + ((1 << 24) * Math.random() | 0).toString(16)
    svg
      .append('rect')
      .attr('mask', 'url(#stats)')
      .attr('class', stat.name)
      .attr('x', accumulator)
      .attr('y', 58)
      .attr('width', Math.round(width / 100 * stat.percent))
      .attr('height', height)
      .attr('fill', fill)

    const x = ((index + 1) % 2) ? 0 : 225
    const y = ((index + 1) % 2) ? (index + 1) * 12 : index * 12

    const child = svg
      .append('g')
      .append('svg')
      .attr('x', padding)
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

    return Math.round((width / 100 * stat.percent) + accumulator)
  }, padding)

  return svg
}

router.get('/wakatime/:username/stats/editors/:range/:size', async (ctx) => {
  const d3 = new D3({ styles: css.toString() })

  const range = ctx.params.range
  const username = ctx.params.username
  const size = ctx.params.size

  const stats = await axios.get(`${waka}/users/${username}/stats/${range}?api_key=${key}`)

  const svg = createSVG(d3, Math.round(854 / size), 200)
  createHeader(svg, 'Editors', 25, 43)
  createStats(svg, stats.data.data.editors, Math.round(854 / size - 50), 8, 25)

  ctx.type = 'image/svg+xml; charset=utf-8'
  ctx.body = Buffer.from(d3.svgString())
})

router.get('/wakatime/:username/stats/languages/:range/:size', async (ctx) => {
  const d3 = new D3({ styles: css.toString() })

  const range = ctx.params.range
  const username = ctx.params.username
  const size = ctx.params.size

  const stats = await axios.get(`${waka}/users/${username}/stats/${range}?api_key=${key}`)

  const svg = createSVG(d3, Math.round(854 / size), 200)
  createHeader(svg, 'Languages', 25, 43)
  createStats(svg, stats.data.data.languages, Math.round(854 / size - 50), 8, 25)

  ctx.type = 'image/svg+xml; charset=utf-8'
  ctx.body = Buffer.from(d3.svgString())
})

router.get('/wakatime/:username/stats/oss/:range/:size', async (ctx) => {
  const d3 = new D3({ styles: css.toString() })

  const range = ctx.params.range
  const username = ctx.params.username
  const size = ctx.params.size

  const stats = await axios.get(`${waka}/users/${username}/stats/${range}?api_key=${key}`)

  const svg = createSVG(d3, 854, 200)
  createHeader(svg, 'Operating Systems', 25, 43)
  createStats(svg, stats.data.data.operating_systems, Math.round(854 / size - 50), 8, 25)

  ctx.type = 'image/svg+xml; charset=utf-8'
  ctx.body = Buffer.from(d3.svgString())
})

app.use(router.routes())
app.use(router.allowedMethods())

app.listen(3000)
