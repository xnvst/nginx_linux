/* ********************************************************************
 * Creates a valid, cross-browser HTTP request object for use in Ajax
 * web scripts.
 *
 * Modified from Jim Ley's implementation at jibbering.com
 *   http://www.jibbering.com/2002/4/httprequest.html
 *
 */
function getHTTPObject() {
  var xmlhttp = false;
  

  if (!xmlhttp) {
    try {
       xmlhttp = new XMLHttpRequest();
    } catch (e) {
      try {
        xmlhttp = window.createRequest();
      } catch (e) { xmlhttp = false; }
    }
  }
  return xmlhttp;
}


 
