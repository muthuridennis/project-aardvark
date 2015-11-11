# Introduction to Node.js
What is node?
-------------
It is an event driven non-blocking i/o *server*
that is asynchronous in nature. 

It is written using Javascript.

## How it works in a Nutshell
1. Node receives events.
2. It stashes them in an event que.
3. The events are then pushed to a thread pool
for processing.
4. Once a thread is done, it communicates it's
result back to Node.

## Concepts
- Event driven
    + Node libraries receive events and excute
    execute callbacks based on those events.
```
// jquery
$('div').on('click', function(){
    ...
});

// Node sytnax
var http = require('http');

http.createServer(function(request, response){

});
```
- Asynchronous
    - Node uses a non-procedural style of computation.
    - It allows code to be excuted in no particular
    order where the previous operation does not have
    to finish before the next one can begin. 

- Threads
    + When a code is running in a compiler. The compiler 
    creates a main process within which it will excute your
    code. This process is known as the thread.

- Non-blocking
    + In procedural language, any heavy and time consuming
    operations would be ran in a separate thread from the 
    main one.
    + Node provides us with the ability to write our code using
    an asynchronous and event driven style where callbacks are
    ran when events are received.
    + This gives us the ability to have multiple i/o operations
    within a single thread and not have them 'block'(wait for 
    the previous process to run before executing the main 
    process). 


## Common syntax used in Node
1. Running a file using node.
```
// in the folder where the js file is defined run
node <filename>
```

2. Importing packages and files into your main file.
We use the require function to export modules defined in other
files into our main file
```
// This imports a natively defined nodejs package or a 
// dependency in the node_modules folder.
require('http');

// This imports a module from a folder relative to where require 
// was called.
require('./models/Movie.js');
```

3. Starting a node project
```
// run this in the terminal within your app directory. 
npm init
```

4. Adding a module to your project using npm.
```
// run this in the terminal within your app directory. 
npm install --save <module_name>
```

# RESTFUL Routes
## What is REST?
- REST is an acronym that stands for Representational State Transfer

## Why REST?
- REST provides a standard method for resource manipulation on the 
server.

## Components of REST
- A URL that represents the resource.
- A http verb/method that maps to a controller on the server.

`GET /photo/19`


## Using REST in a Web Application 
1. Client sends a request: `GET /movie/198`
2. The server's router maps that request and the verb to a 
controller's action:
```
The request /movie/198 would be mapped to a controller called
Movie which would have an action called show to handle that request. 
```
3. The show action will communicate with the Movie Model and query
it for a movie with the id 198.

## Common patterns of restful verbs and actions
Checkout the section titled `2.2 CRUD, Verbs, and Actions` for a
clear example of a resource using RESTFUL routing [Rails routing](http://guides.rubyonrails.org/routing.html) 


## CORS
- This is an acronym for Cross Origin Resource Sharing.
- It refers to the ability of one domain to use/ask for resources 
from another domain.
    Example: 
    The html with  this image tag is being served
    from http://domain-a.com <img src="http://domain-b.com/mouse.jpg">
    It is requesting an image from a http://domain-b.com which is a
    different domain from where it's being hosted.
- This works when a html page does it, but does NOT work when using
scripts to perform the request. If a script on that page were to ask
for the same image using the XMLHttpRequest object(Using Ajax),the 
browser would throw a CORS error.
- The only way that a script can access a different resource from
another domain is if the server on that domain allows it to.
- This is done by adding that domain to the request Header known as
Access-Control-Allow-Origin
```
Access-Control-Allow-Origin: <allowed domains or * to allow any domain>
```
 










