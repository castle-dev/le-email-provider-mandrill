var q = require('q');
var powerdrill = require('powerdrill');
/**
 * A bridge between le-email-service and Mandrill
 * @class EmailProvider
 * @param {string} apiKey the mandrill api key
 * @returns {service}
 */
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
  /**
   * Sends an email with html content
   * @function sendHtml
   * @memberof EmailProvider
   * @instance
   * @param {string} from the email address of the sender
   * @param {string} to the email address of the recipient
   * @param {string} subject the subject line of the email
   * @param {string} html the html content
   * @param {string} replyTo (optional) the reply-to email address
   * @returns {promise}
   */
  this.sendHtml = function (from, to, subject, html, replyTo) {
    return q.resolve();
  };
  /**
   * Sends a template email
   * @function sendTemplate
   * @memberof EmailProvider
   * @instance
   * @param {string} from the email address of the sender
   * @param {string} to the email address of the recipient
   * @param {string} id the unique identifier of the template
   * @param {string} data the key/value pairs to inject
   * @param {string} replyTo (optional) the reply-to email address
   * @param {string} subject (optional) the subject
   * @returns {promise}
   */
  this.sendTemplate = function (from, to, id, data, replyTo, subject) {
    return q.resolve();
  };
}

module.exports = EmailProvider;
