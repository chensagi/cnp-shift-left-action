const core = require('@actions/core');
const github = require('@actions/github');
const https = require('https')
  
try {
  // `who-to-greet` input defined in action metadata file
  const cnpEndpointUrl = core.getInput('cnp-endpoint-url');
  const cnpAPIKey = github.getInput('cnp-endpoint-url');

  const data = JSON.stringify({
    todo: 'Buy the milk'
  })

  const options = {
    hostname: cnpEndpointUrl,
    port: 443,
    path: '/todos',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': data.length
    }
  }

  const req = https.request(options, res => {
    console.log(`statusCode: ${res.statusCode}`)
  
    res.on('data', d => {
      process.stdout.write(d)
    })
  })
  
  req.on('error', error => {
    console.error(error)
  })
  
  req.write(data)
  req.end()

  console.log(`Hello ${nameToGreet}!`);
  const time = (new Date()).toTimeString();
  core.setOutput("time", time);
  // Get the JSON webhook payload for the event that triggered the workflow
  const payload = JSON.stringify(github.context.payload, undefined, 2)
  console.log(`The event payload: ${payload}`);
} catch (error) {
  core.setFailed(error.message);
}