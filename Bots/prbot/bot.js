const path = require('path');
const fs = require('fs')
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config({path: path.join(__dirname, '..', '.env')})
}

const SLACK_BOT_TOKEN = process.env.SLACK_BOT_TOKEN
const SlackClient = require('./slack-client')

class Bot {
  constructor() {
    this.slackClient = new SlackClient(SLACK_BOT_TOKEN)
  }
  run() {
    this._scheduleCronJob(
      this._postSlackMessageForUnlabeledPrs(this.slackClient.unlabeledPrs()),
      {
        every: 'day',
        at: '11:00'
      }
    )
  }
  _postSlackMessageForUnlabeledPrs(prs) {
    this.slackClient.postMessage('Morning - here are the unlabeled PRs...')
    prs.forEach(pr => {
      this.slackClient.postMessage(`@${pr.slackUsername}: ${pr.link}`)
    })
  }
  _scheduleCronJob(job, options = {}) {
    // schedule job
  }
}

new Bot().run()