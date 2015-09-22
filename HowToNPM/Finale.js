var reg = require('.~/lib/registry.js')

var shop = require('../')
var fs = require('fs')
var path = require('path')

exports.problem = function () {
  if (!shop.cwd())
    return ''


  return function () { }.toString().split('\n').slice(1,-1).join('\n')
}

exports.verify = function (args, cb) {
  if (!shop.cwd())
    return cb(false)

  var total = shop._adventures.length
  var completed = shop.state.completed.length
  var remain = total - completed

  // the 1 remaining would be this one, of course
  if (remain > 1) {
    console.log('It looks like you still have more work to do.')
    return cb(false)
  }

  console.log(function () {}.toString().split('\n').slice(1,-1).join('\n'))

  reg.kill()
  return cb(true)
}