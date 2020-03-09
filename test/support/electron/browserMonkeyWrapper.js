var Mount = require('browser-monkey/lib/mount')
var React = require('react')
var ReactDOM = require('react-dom')
var createTestDiv = require('browser-monkey/lib/createTestDiv')
var createMonkey = require('browser-monkey/create')

module.exports = function (app, props) {
  return new Mount(app, {
    stopApp: function () {
    },
    startApp: function () {
      var div = createTestDiv()
      ReactDOM.render(React.createElement(this.app, props), div)

      return createMonkey(document.body)
    }
  }).start()
}
