// Helper
function $$(id) {
  return document.getElementById(id)
}

// Code under development
function load(filename) {
  var script = get(filename)
  eval.call(window, script)
}

function URL(str) {
  var self = { 
    string: str,
    basename: function() {
      var tokens = str.split('/');
      return (tokens[ tokens.length-1 ])
    }
  }
  return self;
}

function blocking_ajax_request(url, method, data) {
  var req = new XMLHttpRequest()
  req.open(method, url.string, false)
  req.send(data)
  return req.responseText
}

function put(url, data) {
  blocking_ajax_request(url, 'put', data)
}

function get(url) {
  return blocking_ajax_request(url, "get");
}
function del(url) {
  return blocking_ajax_request(url, "delete");
}
function post(url, data) {
  return blocking_ajax_request(url, "post", data);
}

// TODO: make these work with primitive types as well!
Array.prototype.includes = function(item) {
  return this.some( function(i) { return i === item; } );
};

// TODO: there is some strange behaviour when this is defined - maybe because it is onvoked tacitly by something on something I do not know...
// Object.prototype.is_any_of = function(list) {
//   return list.includes( this );
// };


Array.prototype.first = function() {
  return this[0];
};


Array.prototype.equals = function(other) {
  if (this.length != other.length)
    return false
    
  for(i = 0; i < this.length; i++) {
    if (this[i] != other[i])
      return false
  }
  return true
}

function l(data) {
  console.log(data);
  return data;
}

RegExp.escape = function(text) {
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
}

var eval_template = function(str) { 
  return str.replace(/#\{(.*)\}/, function(template, code) { return eval(code); });
};

//Templating Helpers
String.prototype.times = function(count) {
  var result = "";
  for (var i = 0; i < count; i++) {
    result += this;
  }
  return result;
};
String.prototype.x = String.prototype.times; //sugar

NodeList.prototype.forEach = Array.prototype.forEach;

function render_templates() {
  document.getElementsByTagName("eval").forEach( function(node) { node.innerHTML = eval(node.innerHTML) } );
}

function parse_document_fragment( html ) {
  var d = document.createDocumentFragment();
  
  $( html ).each( function(index, data) { d.appendChild(data); } );
  return d;
}


// Sugar functions to construct DOM elements more nicely

function DocumentFragment() {  // is this save??
  return document.createDocumentFragment();
}

var DocumentFragment = function ( list ) {
  var d = document.createDocumentFragment();
  list.forEach( function (i) {
    d.appendChild( i );
  })
  return d;
}

/*
Object.defineProperty(Object.prototype, 'class', {value: function() {
  return Object.prototype.toString.call(this).match(/\ (.*)]/)[1]
}})

Object.defineProperty(Object.prototype, 'is_a', {value: function( type_name ) {
  return this.class() === type_name;
}})
*/

HTMLElement.prototype.append = function(element) { this.appendChild( element ) }


HTMLElement.prototype.prepend = function( element ) {
  this.insertBefore( element, this.firstChild );
}


Object.prototype.forEach = function( fun ) {
  for (var i in this) {
    if ( this.hasOwnProperty( i ) ){
      fun( i, this[i] );
    }
  }
}

Object.prototype.map = function( fun ) {
  var result = [];
  this.forEach( function (key, val ) { result.push( fun(val, key) )} );
  return result;
}

String.prototype.rjust = function( length ) {
  return " ".times(length - this.length ) + this; 
}

String.prototype.ljust = function( length ) {
  return this + " ".times(length - this.length ); 
}


function TextNode( content ) {
  return document.createTextNode( content );
}


function Node( tagname, attributes, content ) {
  var tag = document.createElementNS("http://www.w3.org/1999/xhtml", tagname );
  if (attributes) {
    attributes.forEach( function(attr, val){
      tag.setAttribute(attr, val);
    })
  }
  
  if (content) {
    content.forEach( function(node) {
      if (node.is_a( "String" )) {
        tag.append( TextNode(node) );
      } else {
        tag.append( node );
      }
    })
  }

  return tag;
}
