// If life was easy, we could just do things the easy way:
// var getElementsByClassName = function (className) {
//   return document.getElementsByClassName(className);
// };

// But instead we're going to implement it from scratch:
var getElementsByClassName = function(className
) {
  // your code here
  var targetElements = [];
  var findNodes = function(node) {
    //base case: no children
    //recursive case: children
    
    var classArray = node.classList ? Array.from(node.classList) : [];
    if (!node.hasChildNodes() && classArray.includes(className)) {
      targetElements.push(node);
    } else {
      if (classArray.includes(className)) {
        targetElements.push(node);
      }
      node.childNodes.forEach(function(child) {
        findNodes(child);
      });
    }
  };
  findNodes(document.body);  
  return targetElements;
};
