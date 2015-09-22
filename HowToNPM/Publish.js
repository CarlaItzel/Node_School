var reg = require('.~lib/registry.js')
var fs = require('fs')
var path = require('path')

exports.problem = function () {
  if (!shop.cwd())
    return ''

  reg.run('publish')

  return function () {}.toString().split('\n').slice(1,-1).join('\n')
}

exports.verify = function (args, cb) {
  if (!shop.cwd())
    return cb(false)

  var pkg = require(process.cwd() + '/package.json')
  var name = pkg.name
  var exec = require('child_process').exec
  var npm = require('which').sync('npm')
  exec(npm + ' --color=always view ' + name, function (er, stdout, stderr) {
    if (er) {
      process.stderr.write(stderr)
      console.log('Uh oh!\n'+
                  'It looks like you didn\'t successfully publish the ' +
                  name + '\n' +
                  'package.  Try again!\n')
    }

    console.log(function () {}.toString().split('\n').slice(1,-1).join('\n').replace(/%NAME%/g, name))
    reg.kill()

    return cb(true)
  })
}