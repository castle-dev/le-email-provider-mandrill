var q = require('q');
var powerdrill = require('powerdrill');

var EmailProvider = function (apiKey) {
  if (!apiKey) { throw new Error('API key required'); }
  var _api = powerdrill(apiKey);

  this.sendHtml = function (from, to, subject, html) {
    var deferred = q.defer();
    var message = _api()
    .subject(subject)
    .to(to)
    .from(from)
    .html(html)
    .send(function (err, resp) {
      if (err) { deferred.reject(err); }
      else if (resp[0].status === 'rejected') {
        deferred.reject(new Error('Email rejected'));
      } else { deferred.resolve(); }
    });
    return deferred.promise;
  }
}

module.exports = EmailProvider;
