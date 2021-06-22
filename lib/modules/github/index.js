const axios = require('axios')

const { createAppAuth } = require('@octokit/auth-app')

const auth = createAppAuth({
  appId: process.env.GITHUB_APP_ID,
  privateKey: process.env.GITHUB_PEM,
  clientId: process.env.GITHUB_CLIENT_ID,
  clientSecret: process.env.GITHUB_CLIENT_SECRET
})

const endpoint = 'https://api.github.com'

const installation = async (org) => {
  const credentials = await auth({ type: 'app' })
  const response = await axios.get(`${endpoint}/app/installations`, {
    headers: { Authorization: `Bearer ${credentials.token}` }
  })

  return response.data.find((installation) => installation.account.login === org)
}

const content = async (id, org, repo) => {
  const credentials = await auth({ type: 'installation', installationId: id })
  const response = await axios.get(`${endpoint}/repos/${org}/${repo}/contents/package.json`, {
    headers: { Authorization: `Token ${credentials.token}` }
  })

  const json = JSON.parse(Buffer.from(response.data.content, 'base64').toString())
  return json.version
}

module.exports = { installation, content }
