const SLACK_BOT_TOKEN = process.env.SLACK_BOT_TOKEN
const SlackClient = require('./slack-client')

class Bot {
  constructor() {
    this.slackClient = new SlackClient(SLACK_BOT_TOKEN)
  }
  async getSlackChannels() {
    return await this.slackClient.getChannelsAsync()
  }
}

const bot = new Bot();
bot.getSlackChannels();