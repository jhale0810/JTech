const axios = require('axios')

module.exports = class SlackClient {
  
  constructor(slackAPIToken) {
    this._slackAPIToken = slackAPIToken
    this.axios = this._configureAxios(slackAPIToken)
  }

  async getChannelsAsync() {
    try {
      const response = await this.axios.get('channels.list')
      return response.data.channels
    } catch(e) {
      console.log(e)
    }
  }

  // pseudo private methods
  _configureAxios() {
    return axios.create({
      baseURL: 'https://slack.com/api/',
      timeout: 1000,
      headers: {
        Authorization: 'Bearer ' + this._slackAPIToken
      }
    })
  }
}