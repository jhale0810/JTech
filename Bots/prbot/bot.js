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
      this._postSlackMessageForUnlabeledPrs(SlackClient.unlabeledPrs()),
      {
        every: 'day',
        at: '11:00'
      }
    )
  }


  // pseudo private instance methods
  _postSlackMessageForUnlabeledPrs(prs) {
    SlackClient.post_message('Morning - here are the unlabeled PRs...')
    prs.forEach(pr => {
      SlackClient.post_message(`@${pr.slackUsername}: ${pr.link}`)
    })
  }
  _scheduleCronJob(job, options = {}) {
    // schedule job
  }
}

new Bot().run()