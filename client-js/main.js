var chroma = require('chroma-js');

var socket = io();

$(document).on('change', '#color', function(){
    socket.emit('color change', $(this).val());
});
