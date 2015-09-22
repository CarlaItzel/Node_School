var reg = require('.~/lib/registry.js')
var fs = require('fs')
var path = require('path')

exports.problem = function () {
  if (!shop.cwd())
    return ''

  return function () { }.toString().split('\n').slice(1,-1).join('\n')
}

exports.verify = function (args, cb) {
  var cwd = shop.cwd()
  if (!cwd)
    return cb(false)

  var pkg = require(cwd + '/package.json')
  var deps = Object.keys(pkg.dependencies || {})
  var nm
  try {
    var nm = fs.readdirSync(path.resolve(cwd, 'node_modules'))
    nm = nm.filter(function (n) {
      return !/^\./.test(n)
    })
  } catch (er) {
    nm = []
  }

  if (nm.length) {
    console.log('Looks like there are some deps still hanging around')
    return cb(false)
  }

  if (deps.length) {
    console.log('You removed the files, but not the entries in package.json')
    return cb(false)
  }

  console.log(function () {}.toString().split('\n').slice(1,-1).join('\n'))
  return cb(true)
}