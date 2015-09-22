var reg = require('../lib/registry.js')

var shop = require('../')
var fs = require('fs')
var path = require('path')

exports.problem = function () {
  if (!shop.cwd())
    return ''

  reg.run('dist-tag')
  return function () { }.toString().split('\n').slice(1,-1).join('\n')
}
exports.verify = function (args, cb) {
  var cwd = shop.cwd()
  if (!cwd)
    return cb(false)

  var pkg = require(cwd + '/package.json')
  var name = pkg.name

  var body = require(shop.datadir + '/registry/' + name + '/body.json')
  var dt = body['dist-tags']
  var tags = Object.keys(dt)
  if (tags.length === 1) {
    console.log('Uh oh, looks like you still only have a single dist-tag.')
    console.log('Use `npm help dist-tag` to learn how to add another one.')
    return cb(false)
  }

  console.log(function () {}.toString().split('\n').slice(1,-1).join('\n'))
  reg.kill()
  return cb(true)
}