var reg = require('.~/lib/registry.js')
var fs = require('fs')
var path = require('path')

exports.problem = function () {
  if (!shop.cwd())
    return ''

  // If it hasn't already been done, add a new version of @linclark/pkg.
  var pkg = require(shop.datadir + '/registry/@linclark/pkg/body.json')
  if (pkg['dist-tags'].latest === '1.0.2') {
    // publish an update
    shop.cpr(path.resolve(__dirname, '..', 'lib', 'registry-assets-update'),
             path.resolve(shop.datadir, 'registry'))
  }

  reg.run('outdated')

  return function () { }.toString().split('\n').slice(1,-1).join('\n')
}

exports.verify = function (args, cb) {
  if (!shop.cwd())
    return cb(false)

  var arg = args.join('').toLowerCase()
  if (arg === '@linclark/pkg') {
    console.log(function () {}.toString().split('\n').slice(1,-1).join('\n'))
    reg.kill()
    return cb(true)
  }

  if (!arg || arg === 'pkg') {
    console.log('Run `how-to-npm verify PKG` but replace `PKG` with the name\n' +
                'of the package that is outdated')
  } else if (arg !== '@linclark/pkg') {
    console.log('Nope, it\'s not %s.  Try again!', arg)
  }

  return cb(false)

}