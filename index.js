const core = require('@actions/core')
const newman = require('newman')

try {
  const get = core.getInput
  const apiBase = 'https://api.getpostman.com'
  const idRegex = /^[0-9]{7}-\w{8}-\w{4}-\w{4}-\w{4}-\w{12}$/

  const options = {
    apiKey: '?apikey=' + get('postmanApiKey'),
    collection: get('collection'),
    environment: get('environment'),
    globals: get('globals'),
    iterationCount: Number(get('iterationCount')),
    iterationData: get('iterationData'),
    folder: get('folder').split(','),
    workingDir: get('workingDir'),
    insecureFileRead: JSON.parse(get('insecureFileRead')),
    timeout: Number(get('timeout')),
    timeoutRequest: Number(get('timeoutRequest')),
    timeoutScript: Number(get('timeoutScript')),
    delayRequest: Number(get('delayRequest')),
    ignoreRedirects: JSON.parse(get('ignoreRedirects')),
    insecure: JSON.parse(get('insecure')),
    bail: JSON.parse(get('bail')),
    suppressExitCode: JSON.parse(get('suppressExitCode')),
    reporters: get('reporters').split(','),
    reporter: JSON.parse(get('reporter') || null),
    color: get('color'),
    sslClientCert: get('sslClientCert'),
    sslClientKey: get('sslClientKey'),
    sslClientPassphrase: get('sslClientPassphrase')
  }
  // call newman.run to pass `options` object and wait for callback
  newman.run(options, function (err) {
    if (err) { throw err; }
      console.log('collection run complete!');
  });
} catch (error) {
  core.setFailed(error.message)
}
