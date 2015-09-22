var reg = require('../lib/registry.js')

var shop = require('../')
var fs = require('fs')
var path = require('path')

exports.problem = function () {
  if (!shop.cwd())
    return ''

  reg.run('update')

  return function () { }.toString().split('\n').slice(1,-1).join('\n')
}

exports.verify = function (args, cb) {
  if (!shop.cwd())
    return cb(false)

  var pkg = require(shop.cwd() + '/node_modules/@linclark/pkg/package.json')
  if (pkg.version !== '1.0.3') {
    console.log('Oops!  You are still using the outdated version!')
    return cb(false)
  }

  reg.kill()
  console.log('Awesome!  You\'re up to date!\n' +
              'Run `how-to-npm` to move on to the next exercise')
  return cb(true)
}