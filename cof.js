/*
// module inspection by programmer
Object.prototype.toString = function() {
  return this.constructor.name + ":\n";

}*/

/*
class.neat = function() {
      return "class " + class.class() + "\n" + props.methods.map( function( method, name ) { return "   " + name.ljust(12) + " : " + method.parsedArgs() }).join("\n");
    }
    class.class = function() {return props['name'];};
    class.new = function() { };
    eval(props['name']  + " = instance;")
    this.definitions.push( instance );
  },
  definitions: [],*/


ClassObject = {};
Object.prototype.new = function(type, name, features) {
   features.__proto__ = type;
   eval(name + " = features;");
}

// ClassObject = {};
// Object.prototype.new = function(type, name, features) {
//    // this also names stuff.. interesting!
//    eval( "function " + name + "() {}")
//    var constructor = eval(name);
//    
//    constructor.prototype = type;
//    var instance = new constructor();
//    l("gooooo")
//    l(instance);
//    features.forEach( function( key, val ) { instance[key] = val; })
// //    features.__proto__ = type;
//    eval(name + " = instance;");
// }


Object.prototype.classObject = function() {
  return this.__proto__;
}

Object.prototype.becomeA = function ( classObject ){
//   var oldProto = this.__proto__;
  this.__proto__ = classObject;
  
}

Object.prototype.isA = function( classObject ) {
  return this.__proto__ === classObject;
}