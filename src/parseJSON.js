// this is what you would do if you were one to do things the easy way:
// var parseJSON = JSON.parse;

// but you're not, so you'll write it from scratch:
var parseJSON = function(json) {
  // your code goes here
  var getNextChar = function(string, pos) {
    return string[pos + 1];
  };
  var skipWhitespace = function(string, pos, isFromStart) {
    var isSpace = true;
    var currentPos = pos;
    while (isSpace === true) {
      isSpace = /\s/.test(getNextChar(string, currentPos)) ? true : false;
      isFromStart === true ? currentPos += 1 : currentPos -= 1;
    }
    return currentPos;
  };

  var findIndexOfNextChar = function(string, pos, targetChar) {
    var currentPos = pos;
    while (string[currentPos] !== targetChar) {
      currentPos += 1;
    }
    return currentPos;
  };
  
  var parseValue = function (inputString) {
    var string = inputString === '' ? '' : inputString.split('').slice(0).join('');
    string = string.replace(/^(\s+)/, '').replace(/\s+$/, '');
    // string = string.split('').slice(skipWhitespace(string, 0, true), skipWhitespace(string, string.length - 1, false)).join('');
    if (!isNaN(Number(string))) {
      // /[-]*\d+[.]*\d*/.test(string)
      return Number(string);
    } else if (string[0] === '"') {
      return string.split('').slice(1, string.length - 1).join('');
    } else if (string === 'true') {
      return true;
    } else if (string === 'false') {
      return false;
    } else if (string === 'null') {
      return null;
    } else if (string[0] === '[') {
      return parseArray(string);
    } else if (string[0] === '{') {
      return parseObject(string);
    }
  };

  var parseArray = function(string) {
    if (string === '[]') {
      return [];
    }
    var arr = string.split('').slice(1, string.length - 1).join('').split(',');
    return arr.map(function(item) {
      return parseValue(item);
    });
  };

  var parsePair = function(string, obj) {
    var arr = string.split(':');
    var key = parseValue(arr[0]);
    var value = parseValue(arr[1]);
    obj[key] = value;
  };

  var parseObject = function(string) {
    var returnObj = {};
    if (string.length > 0 && string.includes(':')) {
      var items = string.split('').slice(1, string.length - 1).join('').split(',');
      items.forEach(function(item) {
      // parsePair(item, returnObj);
        var arr = item.split(':');
        var key = parseValue(arr[0]);
        var value = parseValue(arr[1]);
        returnObj[key] = value;
      });
    }
    return returnObj;
  };

  console.log(parseValue(json));
  return parseValue(json);

  
};
