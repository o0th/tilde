const Router = require('@koa/router')
const axios = require('axios')

const { createSVGWindow } = require('svgdom')
const { SVG, registerWindow } = require('@svgdotjs/svg.js')

const github = require('../../modules/github')

const router = new Router()

router.get('/badge/:size/:rx/:fg1/:bg1/:txt1/:fg2/:bg2/:txt2', async (ctx) => {
  const window = createSVGWindow()
  const document = window.document
  registerWindow(window, document)

  const padding = 10
  const height = Number(ctx.params.size) ? 28 : 20
  const txty = Number(ctx.params.size) ? 17.5 : 13.5

  const char = 8.6
  const box1 = (char * ctx.params.txt1.length) + (padding * 2)
  const box2 = (char * ctx.params.txt2.length) + (padding * 2)

  const svg = SVG(document.documentElement)
    .attr('height', height)
    .attr('width', box1 + box2)

  const rect = svg.rect(box1 + box2, height)
    .attr('rx', ctx.params.rx)
    .fill('#fff')

  const mask = svg.mask().add(rect)

  svg.rect(box1, height)
    .attr('x', 0).attr('y', 0)
    .fill(`#${ctx.params.bg1}`)
    .maskWith(mask)

  svg.rect(box2, height)
    .attr('x', box1).attr('y', 0)
    .fill(`#${ctx.params.bg2}`)
    .maskWith(mask)

  const txt = (add) => {
    add.tspan(ctx.params.txt1)
      .dx(padding)
      .fill(`#${ctx.params.fg1}`)
    add.tspan(ctx.params.txt2)
      .dx(padding * 2)
      .attr('font-weight', 'bold')
      .fill(`#${ctx.params.fg2}`)
  }

  svg.text(txt)
    .attr('y', txty)
    .font({ family: 'Mono', 'letter-spacing': '2px', size: '11px' })

  ctx.type = 'image/svg+xml; charset=utf-8'
  ctx.body = Buffer.from(svg.svg())
})

router.get('/badge/version/github/:org/:repo/:size/:rx/:fg1/:bg1/:txt1/:fg2/:bg2', async (ctx) => {
  const installation = await github.installation(ctx.params.org)
  const version = await github.content(installation.id, ctx.params.org, ctx.params.repo)

  const window = createSVGWindow()
  const document = window.document
  registerWindow(window, document)

  const padding = 10
  const height = Number(ctx.params.size) ? 28 : 20
  const txty = Number(ctx.params.size) ? 17.5 : 13.5

  const char = 8.6
  const box1 = (char * ctx.params.txt1.length) + (padding * 2)
  const box2 = (char * version.length) + (padding * 2)

  const svg = SVG(document.documentElement)
    .attr('height', height)
    .attr('width', box1 + box2)

  const rect = svg.rect(box1 + box2, height)
    .attr('rx', ctx.params.rx)
    .fill('#fff')

  const mask = svg.mask().add(rect)

  svg.rect(box1, height)
    .attr('x', 0).attr('y', 0)
    .fill(`#${ctx.params.bg1}`)
    .maskWith(mask)

  svg.rect(box2, height)
    .attr('x', box1).attr('y', 0)
    .fill(`#${ctx.params.bg2}`)
    .maskWith(mask)

  const txt = (add) => {
    add.tspan(ctx.params.txt1)
      .dx(padding)
      .fill(`#${ctx.params.fg1}`)
    add.tspan(version)
      .dx(padding * 2)
      .attr('font-weight', 'bold')
      .fill(`#${ctx.params.fg2}`)
  }

  svg.text(txt)
    .attr('y', txty)
    .font({ family: 'Mono', 'letter-spacing': '2px', size: '11px' })

  ctx.type = 'image/svg+xml; charset=utf-8'
  ctx.body = Buffer.from(svg.svg())
})

router.get('/badge/version/gitlab/:org/:repo/:size/:rx/:fg1/:bg1/:txt/:fg2/:bg2', async (ctx) => {
  const { org, repo } = ctx.params
  const request = await axios.get(`https://gitlab.com/${org}/${repo}/-/raw/master/package.json`)
  const version = request.data.version

  const window = createSVGWindow()
  const document = window.document
  registerWindow(window, document)

  const padding = 10
  const height = Number(ctx.params.size) ? 28 : 20
  const txty = Number(ctx.params.size) ? 17.5 : 13.5

  const char = 8.6
  const box1 = (char * ctx.params.txt.length) + (padding * 2)
  const box2 = (char * version.length) + (padding * 2)

  const svg = SVG(document.documentElement)
    .attr('height', height)
    .attr('width', box1 + box2)

  const rect = svg.rect(box1 + box2, height)
    .attr('rx', ctx.params.rx)
    .fill('#fff')

  const mask = svg.mask().add(rect)

  svg.rect(box1, height)
    .attr('x', 0).attr('y', 0)
    .fill(`#${ctx.params.bg1}`)
    .maskWith(mask)

  svg.rect(box2, height)
    .attr('x', box1).attr('y', 0)
    .fill(`#${ctx.params.bg2}`)
    .maskWith(mask)

  const txt = (add) => {
    add.tspan(ctx.params.txt)
      .dx(padding)
      .fill(`#${ctx.params.fg1}`)
    add.tspan(version)
      .dx(padding * 2)
      .attr('font-weight', 'bold')
      .fill(`#${ctx.params.fg2}`)
  }

  svg.text(txt)
    .attr('y', txty)
    .font({ family: 'Mono', 'letter-spacing': '2px', size: '11px' })

  ctx.type = 'image/svg+xml; charset=utf-8'
  ctx.body = Buffer.from(svg.svg())
})

module.exports = router
