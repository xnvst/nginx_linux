/* ********************************************************************
 * Initialisation for the Default System Routing page
 *
 */
addListener('load', function() {
  timeLog("System routing function starts", false);


  /* ***** Imagemap areas ****************************************** */
  var bsect = [
    document.getElementsByTagName('area'),
    document.getElementById('diagram').getElementsByTagName('img')
  ];
  for (var y = 0; y < bsect.length; y++) {
    for (var area, x = 0; area = bsect[y][x++];) {
      if (area.nodeName == "AREA" || area.className == "piece") {
        area.onclick = function() {
          var assoc = document.getElementById(this.alt);
          showLightbox(true, "");

          setTimeout(function() {
            var indim = innerDimensions();

            assoc.style.top = Math.max(10, (indim[1] - assoc.offsetHeight) / 2 + scrollDist()[1]) + "px";
            assoc.style.left = (indim[0] - assoc.offsetWidth) / 2 + "px";

            assoc.style.visibility = "visible";
          }, 0);
          return false;
        };
      }
    }
  }


  timeLog("image map area functions applied", false);


  /* ***** Popup forms ********************************************* */
  for (var t = 0, forms = []; t < document.forms.length; t++)
    if (document.forms[t].className.indexOf("popup") > -1) forms.push(document.forms[t]);

  for (var frm, x = 0; frm = forms[x++];) {

    /* ***** Done button ***************************************** */
    frm.getElementsByTagName('span')[0].onclick = popupCloser;

    /* ***** For forms with hidden tables ************************ */
    frm.tbr = [];
    for (var t = 0, tbrList = frm.getElementsByTagName('div'); t < tbrList.length; t++)
      if (tbrList[t].className == "tablebrowser") frm.tbr.push(tbrList[t]);

    for (var i = frm.tbr.length, tbrd; i && (tbrd = frm.tbr[--i]);) {
      var tbrdButtonsList = tbrd.parentNode.getElementsByTagName('ul')[0].getElementsByTagName('li');
      tbrd.buttons = [];
      for (var t = 0; t < tbrdButtonsList.length; t++) tbrd.buttons.push(tbrdButtonsList[t]);

      for (var chn, y = 0; chn = tbrd.buttons[y++];) {
        if (y == 1) chn.className = "selected";
        chn.num = y - 1;
        chn.assoc = tbrd;
        chn.onclick = function() {
          this.assoc.buttons[this.assoc.showing].className = "";
          this.assoc.panels[this.assoc.showing].style.display = "none";

          this.assoc.showing = this.num;
          this.className = "selected";
          this.assoc.panels[this.assoc.showing].style.display = (isIE) ? "block" : "table";
        };
      }

      tbrd.showing = 0;
      tbrd.panels = [];
      for (var tabesList = tbrd.childNodes, t = 0, z = 0; t < tabesList.length; t++)
        if (tabesList[t].nodeName == "TABLE") tbrd.panels.push(tabesList[t]);

      tbrd.panels[0].style.display = (isIE) ? "block" : "table";
    }
  }

  document.getElementById('mainFormContainer').style.display = "block";

  timeLog("Main form loop complete", false);
});


function popupCloser() {
  showLightbox(false, "");
  this.parentNode.style.visibility = "hidden";
  return false;
}
