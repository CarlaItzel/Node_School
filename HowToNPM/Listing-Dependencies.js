var reg = require('../lib/registry.js')
var shop = require('../')
var fs = require('fs')
var path = require('path')

exports.problem = function () {
  if (!shop.cwd())
    return ''

  reg.run("install-a-module")
  return function () {}.toString().split('\n').slice(1,-1).join('\n')
}

exports.verify = function (args, cb) {
  // verify we're in the right folder
  var cwd = shop.cwd()
  if (!cwd)
    return false

  var deps = require(cwd + '/package.json').dependencies
  try {
    var pkg = require(cwd + '/node_modules/@linclark/pkg/package.json')
  } catch (er) {}
  var semver = require('semver')
  var ok
  if (!pkg || !deps || !deps["@linclark/pkg"] || !semver.satisfies(pkg.version, deps["@linclark/pkg"]))
    ok = false
  else
    ok = true

  var claim = args.join('').toUpperCase().trim()

  if (claim !== 'OK' && claim !== 'NOTOK') {
    console.log('Please run:\n' +
                '`how-to-npm verify OK` if everything is ok,\n'+
                'or:\n' +
                '`how-to-npm verify NOT OK` otherwise.')
    return cb(false)
  }



  if (claim === 'OK' && !ok) {
    console.log('Sorry, no.  Everything is not ok!\n' +
                'Try running `npm ls` and viewing the error.')
    return cb(false)
  } else if (claim === 'NOTOK' && ok) {
    console.log('Hmm...\n' +
                'Well, there may indeed be a lot wrong with the world,\n' +
                'but your package.json and node_modules folder are fine.')
    return cb(false)
  } else if (ok) {
    console.log('Looks like you fixed the problem.  Fantastic!\n'+
                'Note that `npm ls` is a lot calmer now.')
    reg.kill()
    return cb(true)
  } else {
    console.log(function () {}.toString().split('\n').slice(1,-1).join('\n')
    )
    return
  }

  throw new Error('should not ever get here')
}