var q = require('q');
var powerdrill = require('powerdrill');

var EmailProvider = function (apiKey) {
  if (!apiKey) { throw new Error('API key required'); }
  var _api = powerdrill(apiKey);
  var handleResponse = function (err, resp, deferred) {
      if (err) { deferred.reject(err); }
      else if (resp.status === 'error') {
        deferred.reject(new Error(resp.message));
      } else if (resp[0] && resp[0].status === 'invalid') {
        deferred.reject(new Error('Invalid email'));
      } else if (resp[0] && resp[0].status === 'rejected') {
        deferred.reject(new Error('Email rejected'));
      } else if (resp[0] && resp[0].status === 'sent') {
        deferred.resolve();
      } else { deferred.reject(new Error('Uknown error')); }
  }

  this.sendHtml = function (from, to, subject, html) {
    var deferred = q.defer();
    var message = _api()
    .subject(subject)
    .to(to)
    .from(from)
    .html(html)
    .send(function (err, resp) {
      handleResponse(err, resp, deferred);
    });
    return deferred.promise;
  };

  this.sendTemplate = function (from, to, id, data) {
    var deferred = q.defer();
    var message = _api()
    .to(to)
    .from(from)
    .template(id);
    for (var key in data) {
      if (data.hasOwnProperty(key)) {
        message.templateContent(key, data[key]);
      }
    }
    message.send(function (err, resp) {
      handleResponse(err, resp, deferred);
    });
    return deferred.promise
  };

  
}

module.exports = EmailProvider;
