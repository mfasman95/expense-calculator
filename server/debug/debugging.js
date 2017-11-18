const chalk = require('chalk');

let debugOn = process.env.DEBUG_ON || true;
if (['test', 'production'].includes(process.env.NODE_ENV)) {
  debugOn = false;
}

const { log } = console;

const debug = formattedMessage => {
  if (debugOn) {
    log(formattedMessage);
  }
}

module.exports = {
  generic: message => debug(chalk.cyan(message)),
  socketIn: message => debug(chalk.green(`Socket In: ${message}`)),
  socketOut: message => debug(chalk.blue(`Socket Out: ${message}`)),
  warning: message => debug(chalk.bold.undeline.yellow(`WARNING: ${message}`)),
  error: message => debug(chalk.bold.undeline.red(`ERROR: ${message}`)),
  testingDebug: (..._messages) => {
    log(chalk.bold.red('@@@@@'));
    for (var i in _messages) {
      log(chalk.bold.red(_messages[i]));
      log(chalk.bold.red('~~~~~~~~~~~~~~~'));
    }
  },
}
