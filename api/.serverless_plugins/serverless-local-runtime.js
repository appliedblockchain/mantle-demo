/**
* @file
* This plugin overrides the provider.runtime when running locally.
*
* When using an AWS Layer as runtime, one has to set `provider.runtime = provided`
* but `sls invoke local` will stop working then. See: https://github.com/serverless/serverless/issues/5542
* This will revert to using the locally installed runtime (like `invoke local` does)
* until serverless supports AWS Layers as runtime for local use.
*
* As a bonus, this will also fix `sls offline` without having to configure `providedRuntime`
* separately.
*/

class ServerlessLocalRuntimePlugin {
  constructor(serverless) {

    const { 'serverless-local-runtime': config = {} } = serverless.service.custom || {}
    const { 'local-runtime': localRuntime = '' } = config

    if (!localRuntime) {
      throw new Error(
        'No runtime configured.\n'
        + 'Please add:\n'
        + '`\n'
        + 'custom:\n'
        + '  serverless-local-runtime:\n'
        + '    local-runtime: nodejs\n'
        + '`\n'
        + 'to your serverless.yml.'
      )
    }

    // When `sls invoke local` is called, substitute the runtime.
    this.hooks = {
      'before:invoke:local:invoke': () => {
        serverless.service.provider.runtime = localRuntime
      }
    }

    // When `sls offline` is called, substitute the runtime.
    if (
      serverless.service.plugins.includes('serverless-offline')
      && serverless.processedInput.commands[0] === 'offline'
    ) {
      serverless.service.provider.runtime = localRuntime
    }
  }
}

module.exports = ServerlessLocalRuntimePlugin
