const Static = require('node-static');
const path = require('path')
//
// Create a node-static server instance to serve the './public' folder
//
console.log(path.join(__dirname,'./nerjs.github.io'))
var file = new Static.Server(path.join(__dirname,'nerjs.github.io'));
 const send500 = res => {
 	res.statusCode = 500;
 	res.end('Server Error')
 }
require('http').createServer(function (request, response) {
	console.log(request.url)
    request.addListener('end', function () {
        //
        // Serve files!
        //
        file.serve(request, response).on('error',err => {
        	console.error(err)
        	if (err.status == 404) {
        		response.statusCode = 404;
        		response.end('Not Found')
        		// file.serve(request,response).on('error',e => {
        		// 	console.log(e);
        		// 	send500(response)
        		// })
        	} else {
        		send500(response)
        	}
        });
    }).resume();

}).listen(3000, err => {
	if (err) return console.error(err);
	console.log('Start!')
});