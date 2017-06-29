/**
 * Created by qitmac000068 on 2017/6/29.
 */
var sub = require('./sub');
var app = document.createElement("div");
app.innerHTML = "<h1>hahahahaha</h1>";
app.appendChild(sub());
document.body.appendChild(app);