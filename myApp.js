const express = require('express');
const helmet = require('helmet')
const app = express();

//mounted the helmet.hidePoweredBy() middleware to hide the "X-Powered-By: Express" header.
app.use(helmet.hidePoweredBy({setTo: 'PHP 4.2.0'}));

// mounted the helmet.frameguard() middleware to restrict the Risk of Clickjacking.
app.use(helmet.frameguard({action: 'deny'}));

// mounted helmet.xssFilter() to prevent basic XSS attacks.
app.use(helmet.xssFilter({}));

// mounted helmet.noSniff() to Avoid Inferring the Response MIME Type.
app.use(helmet.noSniff({}));

// mounted helmet.ieNoOpen() to Prevent IE from Opening Untrusted HTML.
app.use(helmet.ieNoOpen({}));

// mounted helmet.hsts() to Ask Browsers to Access Your Site via HTTPS. Note: Configuring HTTPS on a custom website requires the acquisition of a domain, and a SSL/TLS Certificate.
let ninetyDaysInSeconds = 90*24*60*60;
app.use(helmet.hsts({maxAge: ninetyDaysInSeconds, force: true}));

// mounted helmet.dnsPrefetchControl() to Disable DNS Prefetching.
app.use(helmet.dnsPrefetchControl({}));

// mounted helmet.noCache() to Disable Client-Side Caching.
app.use(helmet.noCache());


















































module.exports = app;
const api = require('./server.js');
app.use(express.static('public'));
app.disable('strict-transport-security');
app.use('/_api', api);
app.get("/", function (request, response) {
  response.sendFile(__dirname + '/views/index.html');
});
let port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Your app is listening on port ${port}`);
});
