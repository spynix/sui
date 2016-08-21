/*     File: utils.js
 *   Author: Jin Savage (aka spynix)
 * Comments:
 *
 *  License: 
 * 
 */


/* object style */
/*
define(["jquery"], function($) {
  var utils = {
    between: function(value, lower, upper) {
      return (Math.min(Math.max(value, lower), upper));
    },
    
    isbetween: function(value, lower, upper) {
      return ((value >= lower) && (value <= upper));
    },
    
    isnumber: function(obj) {
      return (!isNaN(obj));
    },

    type: function(obj) {
      if (obj == null)
        return (obj + "");

      return ((typeof obj === "object") || (typeof obj === "function" ? (class2type[toString.call(obj)] || "object") : typeof obj));
    },


    isfunction: function(obj) {
      return (type(obj) === "function");
    },


    iswindow: function(obj) {
      return ((obj != null) && (obj === obj.window));
    },


    isarray: function(obj) {
      return (obj.constructor.toString().indexOf("Array") >= 0);
    },


    isplainobject: function(obj) {
      if ((type(obj) !== "object") || obj.nodeType || iswindow(obj))
        return false;

      if (obj.constructor && !hasOwn.call(obj.constructor.prototype, "isPrototypeOf"))
        return false;

      return true;
    },
    
    
    extend1: function(target, source) {
      target = target || {};

      for (var property in obj) {
        if (typeof source[property] === 'object') {
          target[property] = extend(target[property], source[property]);
        } else {
          target[property] = source[property];
        }
      }

      return target;
    },

    extend2: function(obj) {
      Array.prototype.slice.call(arguments, 1).forEach(function(source) {
        if (source) {
          for (var property in source) {
            if (source[property].constructor === Object) {
              if (!obj[property] || obj[property].constructor === Object) {
                obj[property] = obj[property] || {};
                extend(obj[property], source[property]);
              } else {
                obj[property] = source[property];
              }
            } else {
              obj[property] = source[property];
            }
          }
        }
      });

      return obj;
    },


    jextend: function() {
      var options, name, src, copy, is_array, clone, target = arguments[0] | {},
          i = 1, length = arguments.length, deep = false;

      if (typeof target === "boolean") {
        deep = target;

        target = arguments[i] || {};
        i++;
      }

      if (i === length) {
        target = this;
        i--;
      }

      for (; i < length; i++) {
        if ((options = arguments[i]) != null) {
          for (name in options) {
            src = target[name];
            copy = options[name];

            if (target === copy)
              continue;

            if (deep && copy && (isplainobject(copy) || (is_array = isarray(copy)))) {
              if (is_array) {
                is_array = false;
                clone = (src && isarray(src) ? src : []);
              } else {
                clone = (src && isplainobject(src) ? src : {});
              }

              target[name] = jextend(deep, clone, copy);
            } else if (copy !== undefined) {
              target[name] = copy;
            }
          }
        }
      }

      return target;
    }
  };
  
  return utils;
});
*/


/* closure style */

define(["jquery"], function($) {
  var utils = (function() {
    function between(value, lower, upper) {
      return (Math.min(Math.max(value, lower), upper));
    }
    
    function set_class(element, addition) {
      var classes, i, l;
      
      if (!element || !addition || (typeof addition !== "string"))
        return false;
      
      classes = element.className.split(" ");
      
      for (i = 0, l = classes.length; i < l; i++)
        if (classes[i] === addition)
          return false;
      
      classes.push(addition.trim());
      
      element.className = "" + classes.join(" ").trim();
    }

    function extend1(target, source) {
      target = target || {};

      for (var prop in source) {
        if (typeof source[prop] === 'object') {
          target[prop] = extend(target[prop], source[prop]);
        } else {
          target[prop] = source[prop];
        }
      }

      return target;
    }

    function extend2(obj) {
      Array.prototype.slice.call(arguments, 1).forEach(function(source) {
        if (source) {
          for (var prop in source) {
            if (source[prop].constructor === Object) {
              if (!obj[prop] || obj[prop].constructor === Object) {
                obj[prop] = obj[prop] || {};
                extend(obj[prop], source[prop]);
              } else {
                obj[prop] = source[prop];
              }
            } else {
              obj[prop] = source[prop];
            }
          }
        }
      });

      return obj;
    }


    function type(obj) {
      if (obj == null)
        return (obj + "");

      return ((typeof obj === "object") || (typeof obj === "function" ? (class2type[toString.call(obj)] || "object") : typeof obj));
    }


    function isfunction(obj) {
      return (type(obj) === "function");
    }


    function iswindow(obj) {
      return ((obj != null) && (obj === obj.window));
    }


    function isarray(obj) {
      return (obj.constructor.toString().indexOf("Array") >= 0);
    }


    function isplaintobject(obj) {
      if ((type(obj) !== "object") || obj.nodeType || iswindow(obj))
        return false;

      if (obj.constructor && !hasOwn.call(obj.constructor.prototype, "isPrototypeOf"))
        return false;

      return true;
    }


    function jextend() {
      var options, name, src, copy, is_array, clone, target = arguments[0] | {},
          i = 1, length = arguments.length, deep = false;

      if (typeof target === "boolean") {
        deep = target;

        target = arguments[i] || {};
        i++;
      }

      if (i === length) {
        target = this;
        i--;
      }

      for (; i < length; i++) {
        if ((options = arguments[i]) != null) {
          for (name in options) {
            src = target[name];
            copy = options[name];

            if (target === copy)
              continue;

            if (deep && copy && (isplainobject(copy) || (is_array = isarray(copy)))) {
              if (is_array) {
                is_array = false;
                clone = (src && isarray(src) ? src : []);
              } else {
                clone = (src && isplainobject(src) ? src : {});
              }

              target[name] = jextend(deep, clone, copy);
            } else if (copy !== undefined) {
              target[name] = copy;
            }
          }
        }
      }

      return target;
    }
  })();
  
  return utils;
});
