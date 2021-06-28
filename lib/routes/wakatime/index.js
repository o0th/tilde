const fs = require('fs')
const path = require('path')

const Router = require('@koa/router')
const D3 = require('d3-node')

const axios = require('axios')

const router = new Router()
const waka = 'https://wakatime.com/api/v1'
const key = process.env.WAKATIME_KEY

const languages = require('../../../assets/json/languages.json')
const editors = require('../../../assets/json/editors.json')
const oss = require('../../../assets/json/oss.json')

const css = fs.readFileSync(path.join(__dirname, '../../../assets/css/wakatime.css'))

const createSVG = (d3, width) => {
  return d3.createSVG()
    .attr('xmlns', 'http://www.w3.org/2000/svg')
    .attr('viewBox', `0 0 ${width}`)
    .attr('width', width)
}

const createHeader = (svg, text, x, y) => {
  svg.append('text')
    .attr('class', 'header fade')
    .attr('x', x)
    .attr('y', y)
    .text(text)
}

const createStats = (svg, stats, width, height, padding, columns, colors = {}) => {
  svg.append('mask')
    .attr('id', 'stats')
    .append('rect')
    .attr('x', padding)
    .attr('y', 58)
    .attr('width', width)
    .attr('height', height)
    .attr('rx', 5)
    .attr('fill', 'white')

  // svg.attr('height', Math.ceil(stats.length / columns) * 18 + 100)

  stats.reduce((accumulator, stat, index) => {
    const fill = colors[stat.name]?.color || colors.Other?.color || '#' + ((1 << 24) * Math.random() | 0).toString(16)
    svg.append('rect')
      .attr('mask', 'url(#stats)')
      .attr('class', `${stat.name} fade f${index}`)
      .attr('x', accumulator)
      .attr('y', 58)
      .attr('width', Math.round(width / 100 * stat.percent))
      .attr('height', height)
      .attr('fill', fill)

    let x = 0
    let y = 0

    if (columns === 1) {
      x = 0
      y = (index + 1) * 18
    }

    if (columns === 2) {
      x = (index % 2)
        ? Math.round(width / columns)
        : 0
      y = (index === 0 || index === 1)
        ? 18
        : (Math.floor(index / columns) + 1) * 18
    }

    if (columns === 3) {
      x = (index % 3)
        ? Math.round(width / columns) * (index % 3)
        : 0
      y = (index === 0 || index === 1 || index === 2)
        ? 18
        : Math.floor((index / columns) + 1) * 18
    }

    const child = svg.append('g')
      .attr('transform', `translate(${x},${y})`)
      .append('svg')
      .attr('x', padding)
      .attr('y', 64)

    child.append('circle')
      .attr('class', `${stat.name} fade f${index}`)
      .attr('cx', 5)
      .attr('cy', 5)
      .attr('r', 5)
      .attr('fill', fill)

    child.append('text')
      .attr('class', `fade f${index} item`)
      .attr('x', 20)
      .attr('y', 8.75)
      .text(`${stat.name} `)
      .append('tspan')
      .attr('class', 'normal')
      .text(`${stat.text} (${stat.percent}%)`)

    return Math.round((width / 100 * stat.percent) + accumulator)
  }, padding)

  return svg
}

router.get('/wakatime/:username/stats/editors/:range/:size/:columns', async (ctx) => {
  const d3 = new D3({ styles: css.toString() })

  const range = ctx.params.range
  const username = ctx.params.username
  const size = Number(ctx.params.size)
  const columns = Number(ctx.params.columns)

  const stats = await axios.get(`${waka}/users/${username}/stats/${range}?api_key=${key}`)

  const svg = createSVG(d3, size, 200)
  createHeader(svg, 'Editors', 25, 43)
  createStats(svg, stats.data.data.editors, size - 50, 8, 25, columns, editors)

  ctx.type = 'image/svg+xml; charset=utf-8'
  ctx.body = Buffer.from(d3.svgString())
})

router.get('/wakatime/:username/stats/languages/:range/:size/:columns', async (ctx) => {
  const d3 = new D3({ styles: css.toString() })

  const range = ctx.params.range
  const username = ctx.params.username
  const size = Number(ctx.params.size)
  const columns = Number(ctx.params.columns)

  const stats = await axios.get(`${waka}/users/${username}/stats/${range}?api_key=${key}`)

  const svg = createSVG(d3, size, 200)
  createHeader(svg, 'Languages', 25, 43)
  createStats(svg, stats.data.data.languages, size - 50, 8, 25, columns, languages)

  ctx.type = 'image/svg+xml; charset=utf-8'
  ctx.body = Buffer.from(d3.svgString())
})

router.get('/wakatime/:username/stats/oss/:range/:size/:columns', async (ctx) => {
  const d3 = new D3({ styles: css.toString() })

  const range = ctx.params.range
  const username = ctx.params.username
  const size = Number(ctx.params.size)
  const columns = Number(ctx.params.columns)

  const stats = await axios.get(`${waka}/users/${username}/stats/${range}?api_key=${key}`)

  const svg = createSVG(d3, size, 200)
  createHeader(svg, 'Operating Systems', 25, 43)
  createStats(svg, stats.data.data.operating_systems, size - 50, 8, 25, columns, oss)

  ctx.type = 'image/svg+xml; charset=utf-8'
  ctx.body = Buffer.from(d3.svgString())
})

module.exports = router
