var reg = require('../lib/registry.js')
var shop = require('../')
var fs = require('fs')
var path = require('path')

exports.problem = function () {
  if (!shop.cwd())
    return ''

  reg.run('login')

  return function () { }.toString().split('\n').slice(1,-1).join('\n')
}

exports.verify = function (args, cb) {
  if (!shop.cwd())
    return cb(false)

  // test who we are with whoami
  var exec = require('child_process').exec
  var npm = require('which').sync('npm')
  exec(npm + ' whoami', function (er, stdout, stderr) {
    if (er) {
      process.stdout.write(stdout)
      process.stderr.write(stderr)

      console.log('\nUh oh!\n' +
                  'It looks like something went wrong')
      return cb(false)
    }

    stdout = (stdout + '').trim()
    if (stdout.match(/Not authed.  Run 'npm adduser'/)) {
      console.log('Hm... I don\'t see a login here\n'+
                  'Did you run `npm adduser` to create the account?')
      return cb(false)
    }

    console.log('Congratulations, %s!', stdout)
    console.log('You are the proud owner of an imaginary new npm account!\n'+
                'Use it wisely.  Never in anger.  Always for the Good.\n'+
                '\n' +
                'With this sweet power comes much responsibility, which is\n'+
                'sufficiently different from Spiderman\'s thing that Marvel\n'+
                'hopefully won\'t sue us.\n\nExcelsior!')

    reg.kill()
    return cb(true)
  })
}