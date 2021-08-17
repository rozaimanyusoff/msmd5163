var http = require('http');

http.createServer(function (request, response) {
    var path = request.url.replace(/\/?(?:\?.*)?$/, '').toLowerCase();
    switch (path) {
        case '':
            response.writeHead(200, { 'Content-type': 'text/plain' });
            response.end('Homepage');
            break;
        case '/about':
            response.writeHead(200, { 'Content-type': 'text/plain' });
            response.end('About');
            break;
        default:
            response.writeHead(404, { 'Content-type': 'text/plain' });
            response.end('Not found');
            break;
    }

}).listen(3000);

console.log('Server running at http://localhost:3000/');