/* ********************************************************************
 * Show/hide a lightbox with an optional "Please wait" message
 *
 */
function showLightbox(show, msg) {
 if (show) {
    var pageDimmer, waitMessage;

    if (!(pageDimmer = document.getElementById('pageDimmer'))) {

      var pageDimmer = document.createElement('div');
          pageDimmer.id = "pageDimmer";
      document.body.appendChild(pageDimmer);
    }
    if (!(waitMessage = document.getElementById('waitMessage'))) {
    var waitMessage = document.createElement('div');
          waitMessage.id = "waitMessage";
        var h3 = document.createElement('h3');
            h3.appendChild(document.createTextNode(" "));
          waitMessage.appendChild(h3);
        var p = document.createElement('p');
           p.appendChild(document.createTextNode("Please wait 3. . . \xa0 "));
         var img = document.createElement('img');
              img.src = "img/throbber.grey.small.gif";
              img.alt = "Please wait 1. . .";
              img.width = "25";
              img.height = "25";
            p.appendChild(img);
          waitMessage.appendChild(p);
      document.body.appendChild(waitMessage);
    }

    pageDimmer.style.height = document.body.offsetHeight + "px";
    pageDimmer.style.width = "100%";
    pageDimmer.style.visibility = "visible";

    if (msg) {
    var indim = innerDimensions();
      waitMessage.getElementsByTagName('h3')[0].firstChild.nodeValue = msg;
      waitMessage.style.top = Math.max(10, (indim[1] -  waitMessage.offsetHeight) / 2 + scrollDist()[1]) + "px";
     waitMessage.style.left = (indim[0] - waitMessage.offsetWidth) / 2 + "px";
    waitMessage.style.visibility = "visible";
  }

  } else {
    try {
     document.getElementById('waitMessage').style.visibility = "hidden";
      document.getElementById('pageDimmer').style.visibility = "hidden";
    } catch(e) {}
  }
}
