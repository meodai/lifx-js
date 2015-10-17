var chroma = require('chroma-js');
var $ = require('jquery');
var userMedia = require('getusermedia-js');
var ct = require('color-thief');
var socket = io();

$(document).on('change', '#color', function(){
    socket.emit('color change', $(this).val());
});


