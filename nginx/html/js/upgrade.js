String.prototype.trim = function() { return this.replace(/^\s+|\s+$/g,""); }

var upgradeTimeout = 0;
var upgradeInterval = 0;
var origloghash = 0;
var checkResponse = {};
var pageName = "";
var deviceName = "";

/* ********************************************************************
 * Add a cross-browser event listener
 *
 */
function addListener(evnt, func) {
  if (window.addEventListener) {
    window.addEventListener(evnt, func, false); 
  } else if (window.attachEvent) window.attachEvent('on' + evnt, func);
}


/* ********************************************************************
 * Initialisation for the Manage Configurations page
 *
 */
addListener('load', function() {
							 
  var upgrade = document.getElementById('upgrade');
  var upsteps = upgrade.getElementsByTagName('li');
  var upresults = upsteps[4].getElementsByTagName('div');
  var fileinput = document.getElementsByName('fileinput')[0];
  var fileupload = document.getElementById('fileupload');
  var checkresponse = document.getElementById('checkresponse');
  var commitupgrade = document.getElementById('commitupgrade');


  /* ******************************************************************
   * Upload a file to the server for checking - STEP 2
   *
   */
  fileinput.onchange = function() {
    upsteps[1].className = (this.value.trim()) ? "" : "hidden";
    for (var x = 2; x <= 4; x++) upsteps[x].className = "hidden";
    fileupload.disabled = "";
    document.getElementById('checkresponse').firstChild.nodeValue = "\u2013";
  }

  fileupload.onclick = function() {
    var self = this;
    //alert("...2...fileupload() JL fileinput.value=" + fileinput.value);
    if (!fileinput.value.trim()) return false;
    upsteps[2].className = "";
    for (var x = 3; x <= 4; x++) upsteps[x].className = "hidden";

    this.disabled = "disabled";
    fileinput.form.submit();
    upgradeTimeout = 0;
    dimPage("Uploading");
    //showLightbox(true, "Uploading . . . ");

    setTimeout(function() {
      var inp = document.createElement('input');
          inp.type = "file";
          inp.name = "fileinput";
          inp.size = fileinput.size;
          inp.onchange = fileinput.onchange;
      fileinput.parentNode.replaceChild(inp, fileinput);
      fileinput = inp;
    }, 10);     
    return true;
  };


  /* ********************************************************************
   * This function receives the result of the checkimg step - STEP 3
   *
   */
  checkResponse = function(retval, filename, version) {
	  	/* alert("...3 ...checkResponse()... JLEE .retval=" + retval+";   filename=" + filename + ";    version=" + version); */

    document.getElementById('pagedim').style.visibility = "hidden";
    document.getElementById('saveload').style.visibility = "hidden";
    //showLightbox(false, "");    //JL

    commitupgrade.filename = "";

    if (!retval) {
      checkresponse.style.color = "#000000";

      while (checkresponse.firstChild) checkresponse.removeChild(checkresponse.firstChild);

      checkresponse.appendChild(document.createTextNode(filename + " is a valid " + deviceName + " upgrade file."));
      checkresponse.appendChild(document.createElement('br'));
      checkresponse.appendChild(document.createTextNode("This file will upgrade the " + deviceName + " to version: "));
      var strong = document.createElement('strong');
          strong.appendChild(document.createTextNode(version));
      checkresponse.appendChild(strong);

      commitupgrade.filename = filename;

      upsteps[3].className = "";
      upsteps[4].className = "hidden";

    } else if (filename.indexOf("Fail:") == 0) {
      alert(filename);

    } else {
      checkresponse.style.color = "#ff0000";
      checkresponse.firstChild.nodeValue = filename + " does not appear to be a valid " + deviceName + " upgrade file";
    }
  }


  /* ******************************************************************
   * Commit this upgrade - STEP 4
   *
   */
  commitupgrade.onclick = function() {
    var self = this;

    upsteps[4].className = "";
    upresults[0].className = "";
    for (var x = 1; x <= 3; x++) upresults[x].className = "hidden";

    this.disabled = "disabled";
     dimPage("Upgrading");
    //   showLightbox(true, "Upgrading . . . ");


    var now = new Date();
    var orig = getHTTPObject();
    orig.open("GET", pageName + "?action=loghash&date=" + now.getTime(), true);
    orig.onreadystatechange = function() {
      if (orig.readyState == 4) {
        if (orig.responseXML) {
          var origloghash = orig.responseXML.getElementsByTagName('hash')[0].firstChild.nodeValue.trim();

          var now = new Date();
          var execute = getHTTPObject();
          execute.open("GET", pageName + "?action=execute&filename=" + encodeURIComponent(self.filename) + "&date=" + now.getTime(), true);
          execute.send(null);

          upgradeInterval = setInterval(function() {
            var now = new Date();
            var hash = getHTTPObject();
            hash.open("GET", pageName + "?action=loghash&date=" + now.getTime(), true);
            hash.onreadystatechange = function() {
              if (hash.readyState == 4) {
                if (hash.responseXML) {
                  var loghash = hash.responseXML.getElementsByTagName('hash')[0].firstChild.nodeValue.trim();
                  if (loghash != origloghash) {
                    var date = hash.responseXML.getElementsByTagName('date')[0].firstChild.nodeValue.trim();
                    var result = hash.responseXML.getElementsByTagName('result')[0].firstChild.nodeValue.trim();

                    document.getElementById('pagedim').style.visibility = "hidden";
                    document.getElementById('saveload').style.visibility = "hidden";
                    //showLightbox(false, "");   //JL

                    upresults[0].className = "hidden";
                    switch (result) {
                      case "Successful": upresults[1].className = ""; break;
                      default: upresults[2].className = "";
                    }
                    clearInterval(upgradeInterval);

                  //} else if ((upgradeTimeout += 2000) >= 90000) {
                   } else if ((upgradeTimeout += 2000) >= 120000) {
                   document.getElementById('pagedim').style.visibility = "hidden";
                    document.getElementById('saveload').style.visibility = "hidden";
                    //showLightbox(false, "");   //JL

                    upresults[0].className = "hidden";
                    upresults[3].className = "";
                    commitupgrade.disabled = "";
                    clearInterval(upgradeInterval);
                  }
                } else {
                  document.getElementById('pagedim').style.visibility = "hidden";
                  document.getElementById('saveload').style.visibility = "hidden";
                  //  showLightbox(false, "");   //JL

                  clearInterval(upgradeInterval);
                  alert(hash.responseText);
                }
              }
            };
            hash.send(null);
          }, 2000);

        } else {
          document.getElementById('pagedim').style.visibility = "hidden";
          document.getElementById('saveload').style.visibility = "hidden";
          //showLightbox(false, "");   //JL

		  alert(orig.responseText);
        }
      }
    };
    orig.send(null);

  };
});




/* ********************************************************************
 * Dim the page by covering it with a semi-transparent element
 *  - requires that the pageDim element is present
 *
 */
function dimPage(text) {
  var pagedim, saveload;

  if (!(saveload = document.getElementById('saveload'))) {
    var saveload = document.createElement('div');
        saveload.id = "saveload";
      var span = document.createElement('span');
          span.appendChild(document.createTextNode(text));
        saveload.appendChild(span);
        saveload.appendChild(document.createTextNode(" . . .  \xa0 "));
      var img = document.createElement('img');
          img.src = "img/throbber.gif";
          img.alt = "Please wait 2. . .";
          img.width = "49";
          img.height = "50";
        saveload.appendChild(img);
    document.body.appendChild(saveload);
  }
  if (!(pagedim = document.getElementById('pagedim'))) {
    var pagedim = document.createElement('div');
        pagedim.id = "pagedim";
    document.body.appendChild(pagedim);
  }

  var indim = innerDimensions();

  pagedim.style.height = indim[1] + "px";
  pagedim.style.width = indim[0] + "px";
  pagedim.style.visibility = "visible";

  saveload.getElementsByTagName('span')[0].firstChild.nodeValue = text;
  saveload.style.top = scrollTop() + 150 + "px";
  saveload.style.left = (indim[0] - saveload.offsetWidth) / 2 + "px";
  saveload.style.visibility = "visible";
}
 
/* ********************************************************************
 * Return the document scroll value for all browsers
 *
 */
function scrollTop() {
  var html = document.getElementsByTagName('html')[0];
  if (html.scrollTop && document.body.scrollTop) {
    return html.scrollTop;
  } else if (html.scrollTop || document.body.scrollTop)
    return html.scrollTop + document.body.scrollTop;
  return 0;
}
