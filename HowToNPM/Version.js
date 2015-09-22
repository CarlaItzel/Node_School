var reg = require('../lib/registry.js')

var shop = require('../')
var fs = require('fs')
var path = require('path')
var semver = require('semver')

exports.problem = function () {
  if (!shop.cwd())
    return ''

  var pkg = require(shop.cwd() + '/package.json')
  var ver = semver.clean(pkg.version)
  if (!ver) {
    return 'Looks like your package.json has an invalid version!\n' +
      'Use `npm help semver` to learn more about version numbers\n' +
      'Your current version number is: ' + pkg.version
  }

  var oldVer
  var verfile = shop.datadir + '/version'
  try {
    oldVer = fs.readFileSync(verfile, 'utf8')
  } catch (er) {
    oldVer = ver
    fs.writeFileSync(verfile, oldVer, 'utf8')
  }

  return function () { }.toString().split('\n').slice(1,-1).join('\n')
}
exports.verify = function (args, cb) {
  if (!shop.cwd())
    return cb(false)

  var verfile = shop.datadir + '/version'
  var oldVer = fs.readFileSync(verfile, 'utf8')
  var pkg = require(shop.cwd() + '/package.json')
  var ver = semver.clean(pkg.version)
  if (!ver) {
    console.log('Looks like your package.json has an invalid version!\n' +
      'Use `npm help semver` to learn more about version numbers\n' +
      'Your current version number is: ' + pkg.version)
    return cb(false)
  }

  if (ver === oldVer) {
    console.log('Uh oh!\n' +
                'The version is still ' + oldVer + '\n' +
                'Check `npm help version` for a handy util to do this.')
    return cb(false)
  }

  console.log('Great job!\n' +
              'Run `how-to-npm` for the next exciting challenge!')

  return cb(true)
}