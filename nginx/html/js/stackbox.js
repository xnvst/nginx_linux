/* ********************************************************************
 * Prepare a stackbox layout
 *
 */
addListener('load', function() {
  var stackbox = document.getElementById('stackbox');
  var stackmenu = document.getElementById('stackmenu');
  var stackboxprefix = document.getElementById('stackboxprefix');
  if (stackbox) {
    var sbwidth = stackbox.offsetWidth / 2;
    var sbforms = stackbox.getElementsByTagName('form');
    for (var x = 0, f, m = 0; f = sbforms[x++];) {
      var li = document.createElement('li');
          li.assoc = f;
          li.className = (x == 1) ? "selected" : "";
          li.onclick = function() {
            if (this.assoc.className == "top") return true;
            for (var y = 0, pn = this.parentNode.getElementsByTagName('li'), sf; sf = pn[y++];) sf.className = "";
            this.className = "selected";
            for (var y = 0, pn = this.assoc.parentNode.getElementsByTagName('form'), sf; sf = pn[y++];) sf.className = "unload";
            this.assoc.className = "unload top";
          };
		  
		  if((x<10) && (stackboxprefix.innerHTML.indexOf('Code')>-1))
          li.appendChild(document.createTextNode(stackboxprefix.innerHTML.replace(' ', "")+' 0' + x));
		  else
		   li.appendChild(document.createTextNode(stackboxprefix.innerHTML.replace(' ', "")+' ' + x));
        stackmenu.appendChild(li);
    }
  }
});
