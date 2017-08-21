// this is what you would do if you liked things to be easy:
// var stringifyJSON = JSON.stringify;

// but you don't so you're going to write it from scratch:

var stringifyJSON = function(obj) {
  // your code goes here
  // base case is primitives
  // recursive: arrays and objects
  if (obj === undefined || typeof obj === 'function') {
    return;
  } else if (typeof obj !== 'object' && typeof obj !== 'function') {
    if (typeof obj === 'string') {
      return '"' + obj + '"';
    }
    return obj.toString();
  } else {
    if (obj === null) {
      return 'null';
    } else if (Array.isArray(obj)) {
      if (obj.length === 0) {
        return '[]';
      }
      var stringifiedArray = '[';
      for (var i = 0; i < obj.length; i++) {
        stringifiedArray += i === 0 ? stringifyJSON(obj[i]) : ',' + stringifyJSON(obj[i]);
      }
      stringifiedArray += ']';
      return stringifiedArray;
    } else if (typeof obj === 'object') {
      var stringifiedObject = '{';
      if (Object.keys(obj).length === 0) {
        return stringifiedObject + '}';
      } else {
        Object.keys(obj).forEach(function(key, position, collection) {
          //stringifiedObject += i === 0 ? '' : ',';
          if (obj[key] !== undefined && typeof obj[key] !== 'function') {
            stringifiedObject += stringifyJSON(key) + ':' + stringifyJSON(obj[key]);
            if (position < collection.length - 1) {
              stringifiedObject += ',';
            }
          }    
        });
      }
      return stringifiedObject + '}';
    }
    
  }
};
