/**
 * Created by qitmac000068 on 2017/7/5.
 */

import './main.css';
import generateText from './sub';
import $ from 'jquery';
import moment from 'moment';

let app = document.createElement("div");
app.innerHTML = "<h1>mobile</h1>";
app.appendChild(generateText());
document.body.appendChild(app);
const mPromise = Promise.resolve(55);
mPromise.then((number)=>{
    $('body').append('<p>promise is '+number+'</p>');
});
$('body').append('<p>look! now is '+moment().format()+'</p>');