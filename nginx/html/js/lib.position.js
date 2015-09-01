/* ********************************************************************
 * A library of cross-browser position-related functions
 *
 */


/* ********************************************************************
 * Handy element positioning function from Quirksmode.org
 *
 */
function findPos(obj) {
  var curleft = curtop = 0;
  do {
    curleft += obj.offsetLeft;
    curtop += obj.offsetTop;
  } while (obj = obj.offsetParent);    
  return [curleft, curtop];
}


/* ********************************************************************
 * Return the dimensions of the viewport, also from Quirksmode.org
 *
 */
function innerDimensions() {
  if (self.innerHeight) {
    return [self.innerWidth, self.innerHeight];
  } else if (document.documentElement && document.documentElement.clientHeight) {
    return [document.documentElement.clientWidth, document.documentElement.clientHeight];
  } else if (document.body)
    return [document.body.clientWidth, document.body.clientHeight];
  return [0, 0];
}


/* ********************************************************************
 * Return the document scroll value for all browsers
 *
 */
function scrollDist() {
  var html = document.getElementsByTagName('html')[0];
  if (html.scrollTop && document.body.scrollTop) {
    return [html.scrollLeft, html.scrollTop];
  } else if (html.scrollTop || document.body.scrollTop)
    return [html.scrollLeft + document.body.scrollLeft, html.scrollTop + document.body.scrollTop];
  return [0, 0];
}
