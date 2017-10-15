const axios = require('axios')

module.exports = class SlackClient {
  constructor(slackAPIToken) {
    this._axios = this._configureAxios(slackAPIToken)
  }
  unlabeledPrs() {
    // return array of pr objects {slackUsername: 'josh', prLink: 'https://...'}
  }
  postMessage(message) {
    // post message using this._axios.
  }
  async _getChannels() {
    try {
      const response = await this._axios.get('channels.list')
      return response.data.channels
    } catch(e) {
      console.log(e)
    }
  }
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