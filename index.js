const core = require('@actions/core')
const newman = require('newman')

// call newman.run to pass `options` object and wait for callback
newman.run({
    collection: require('./postman_collection.json'),
    reporters: 'cli'
}, function (err) {
	if (err) { throw err; }
    console.log('collection run complete!');
});