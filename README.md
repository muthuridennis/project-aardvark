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
  






