var reg = require('../lib/registry.js')

var shop = require('../')
var fs = require('fs')
var path = require('path')

exports.problem = function () {
  var cwd = shop.cwd()
  if (!cwd)
    return ''

  var pkg = require(cwd + '/package.json')
  var id = pkg.name + '@' + pkg.version

  return function () { }.toString().split('\n').slice(1,-1).join('\n').replace(/%ID%/g, id)
}

exports.verify = function (args, cb) {
  var datadir = shop.datadir
  var cwd = shop.cwd()
  if (!cwd)
    return cb(false)

  var exec = require('child_process').exec
  var npm = require('which').sync('npm')
  exec(npm + ' i', function (er, stdout, stderr) {
    if (er) {
      process.stdout.write(stdout)
      process.stderr.write(stderr)

      console.log('\nUh oh!\n' +
                  'It looks like something went wrong')
      return cb(false)
    }

    stderr = (stderr + '').trim()
    if (stderr.match(/npm WARN package\.json/)) {
      console.log('\nNot quite!\n' +
                  'There\'s still a problem to fix.\n\n'+
                  stderr + '\n')
      return cb(false)
    }

    console.log('Looking sharp!\n' +
                'A package without a readme and some metadata is like a\n'+
                'bunch of JavaScript without instructions or git repo links.')
    return cb(true)
  })
}