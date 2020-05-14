const core = require('@actions/core')
const newman = require('newman')

init()

async function init () {
  console.log(`Run init`);
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

    if (!options.apiKey) {
      core.warn('No Postman API key provided.')
    }

    if (options.collection.match(idRegex)) {
      options.collection = `${apiBase}/collections/${options.collection}${options.apiKey}`
    }

    if (options.environment.match(idRegex)) {
      options.environment = `${apiBase}/environments/${options.environment}${options.apiKey}`
    }

    if (options.globals) {
      try {
        options.globals = JSON.parse(options.globals)
      } catch (e) {}
    }
    //runNewman(options)

    console.log(`Run Newman`);
    console.log(options);
  
    newman.run(options)
    .on('start', function (err, args) { // on start of run, log to console
      console.log('running a collection...');
    })
    .on('done', (err, summary) => {
      if (err || summary.error) {
        console.error('collection run encountered an error.');
        core.setFailed('Newman run failed!' + (err || ''))
      }
      else {
        console.log('collection run completed.');
      }
    })
  //-----------------------------



  } catch (error) {
    core.setFailed(error.message)
  }
}

function runNewman (options) {
  console.log(`Run Newman`);
  console.log(options);

  newman.run(options)
  .on('start', function (err, args) { // on start of run, log to console
    console.log('running a collection...');
  })
  .on('done', (err, summary) => {
    if (err || summary.error) {
      console.error('collection run encountered an error.');
      core.setFailed('Newman run failed!' + (err || ''))
    }
    else {
      console.log('collection run completed.');
    }
  })
}
