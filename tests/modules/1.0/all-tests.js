#!/usr/bin/env narwhal

var assert = require('assert');
var sandbox = require('sandbox').sandbox;
var fs = require('file');

[
    'absolute',
    'cyclic',
    'exactExports',
    'hasOwnProperty',
    'method',
    'missing',
    'monkeys',
    'nested',
    'relative',
    'transitive',
    'determinism'
].forEach(function (testName) {
    exports['test ' + testName] = function () {
        var prefix = fs.path(module.id).resolve(testName).join('');
        var done;

        var print = function (message) {
            assert.ok(!/^FAIL/.test(message));
            if (/^ERROR/.test(message))
                throw new Error(message);
            if (/^DONE/.test(message))
                done = true;
        };

        sandbox(
            'program',
            system,
            {
                prefix: prefix,
                loader: require.loader,
                print: print
            }
        );
        assert.ok(done, 'done');
    };
});

if (module.id == require.main)
    require('os').exit(require('test').run(exports));

