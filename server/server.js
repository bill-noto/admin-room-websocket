var app = require('express')();
var http = require('http');
var server = http.createServer(app);
var io = require('socket.io')(server);
var mysql = require('mysql');

var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'wsblogpost'
})

connection.connect();

io.on('connection', (socket)=> {
    console.log('Client connected: ' + socket.id);

    socket.on('addNewArticle', data => {
        connection.query('INSERT INTO articles SET ?', data, (error)=>{
            connection.query('SELECT * FROM articles', (error, results)=>{
                console.log(results);
                io.emit('articlesUpdated', results);
            });
        })
    })
})

server.listen(3000, ()=>{
    console.log('Server on port 3000');
})

