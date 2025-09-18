const { DetoxCircusEnvironment } = require('detox/runners/jest');

class CustomDetoxEnvironment extends DetoxCircusEnvironment {
  async handleTestEvent(event, state) {
    const { name } = event;

    if (['test_start', 'test_fn_start'].includes(name)) {
      this.global.testFailed = false;
    }

    if (name === 'test_fn_failure') {
      this.global.testFailed = true;
    }

    await super.handleTestEvent(event, state);
  }
}

module.exports = CustomDetoxEnvironment;
