module.exports = class Message {
  constructor(event, data) {
    this.event = event;
    this.data = data || {};
  }
}
