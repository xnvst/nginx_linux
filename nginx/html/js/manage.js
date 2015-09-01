var cfgmd5 = "", commitDir = "", storedConfigs = [];



/* ********************************************************************
 * Initialisation for the Manage Configurations page
 *
 */
addListener('load', function() {
  document.getElementsByName('savesubmit')[0].form.onsubmit = function() {
    var s = document.getElementsByName('save')[0];
    actionFile(s.value = s.value.replace(/[^a-z0-9_+.~ -]/gi, ""), 'save');
    return false;
  }

  document.getElementsByName('save')[0].onfocus = function() {
    if (this.value == "filename") this.value = "";
  }
  document.getElementsByName('save')[0].onblur = function() {
    if (this.value == "") this.value = "filename";
  }

  document.getElementsByName('loadfile')[0].onchange = loadFileChange;

  refreshList();
  setInterval(refreshList, 5000);
});



/* ********************************************************************
 * When a file is loaded, replace the file input with a fresh element
 *
 */
function loadFileChange() {
  if (configModified != "Yes" || confirm('This action will overwrite the current working configuration.  Proceed?'))
    this.form.submit();


  var inp = document.createElement('input');
      inp.type = "file";
      inp.name = "loadfile";
      inp.size = "30";
      inp.onchange = loadFileChange;

  this.parentNode.replaceChild(inp, this);
}



/* ********************************************************************
 * Update the Saved Configurations list by making a server request
 *
 */
function refreshList() {

  /* ***** Create an HTML delete icon for a given filename ********* */
  function deleteIcon(file) {
    var img = document.createElement('img');
        img.src = "img/icon.delete.png";
        img.alt = "Delete";
        img.title = "Delete this configuration file from the HD8812UDX";
        img.onclick = (function(file) { return function() {
          if (confirm('Delete this configuration file from the HD8812UDX?\n     ' + file)) actionFile(file, "delete");
        }})(file);
    return img
  }


  /* ***** Create an HTML load icon for a given filename ********* */
  function loadIcon(file) {
    var img = document.createElement('img');
        img.src = "img/pointer.load.left.png";
        img.alt = "Load";
        img.title = "Load this configuration file to the Local PC";
        img.onclick = (function(file) { return function() {
          if (file != configFileMatch) {
            var msg = (configModified == "Yes") ? "\n\nUnsaved changes in the configuration you are currently editing will be lost." : "";
            if (confirm('Load this configuration file onto the Local PC?\n     ' + file + msg)) actionFile(file, "edit");
          } else alert("This file is already the working configuration");
        }})(file);
    return img;
  }


  var ajax = getHTTPObject();
  ajax.open("GET", "manage.php?action=list", true);
  ajax.onreadystatechange = function() {
    if (ajax.readyState == 4) {

      var md5 = ajax.responseXML.getElementsByTagName('md5')[0].firstChild.nodeValue;

      if (md5 != cfgmd5) {
        var tbod = document.getElementById('config_list').getElementsByTagName('tbody')[0];
        while (tbod.firstChild) tbod.removeChild(tbod.firstChild);

        storedConfigs = [];
        var cfgs = ajax.responseXML.getElementsByTagName('config');
        for (var x = 0, c; c = cfgs[x++];) {
          storedConfigs.push({
            path: c.getElementsByTagName('filename')[0].firstChild.nodeValue,
            file: c.getElementsByTagName('filename')[0].firstChild.nodeValue.replace(/^.*?\//, ''),
            mod: new Date(parseInt(c.getElementsByTagName('modified')[0].firstChild.nodeValue) * 1000),
            md5: c.getElementsByTagName('md5')[0].firstChild.nodeValue
          });
        }

        storedConfigs.sort(function(a, b) {
          var c = a.file.toLowerCase(), d = b.file.toLowerCase();
          if (c == d) return a.path.length - b.path.length;
          return (c > d) ? 1 : -1;
        });

        var tempConfigs = storedConfigs.slice();

        for (var x = 0, c; c = tempConfigs[x++];) {
          var tr = document.createElement('tr');
            var th = document.createElement('th');
              var a = document.createElement('a');
                  a.href = commitDir + c.path;
                  a.title = "Download";
                  a.target = "_blank";
                  a.appendChild(document.createTextNode(c.file));
                th.appendChild(a);
              tr.appendChild(th);

            var td = document.createElement('td');
              if (c.path.indexOf("/") == -1) {
                  td.className = "occupied";
                  td.appendChild(loadIcon(c.path));
                  td.appendChild(deleteIcon(c.path));
              }
              tr.appendChild(td);

 /*           var td = document.createElement('td');
              if (c.path.indexOf("/") == -1) {
                for (var y = x, d; d = tempConfigs[y++];) {
                  if (d.path == "live/" + c.path) {
                      td.className = "occupied";
                      td.appendChild(loadIcon(d.path));
                      td.appendChild(deleteIcon(d.path));
                    tempConfigs.splice(y - 1, 1);
                    break;
                  }
                }
              } else if (c.path.indexOf("live/") == 0) {
                  td.className = "occupied";
                  td.appendChild(loadIcon(c.path));
                  td.appendChild(deleteIcon(c.path));
              }
              tr.appendChild(td);
*/
            tbod.appendChild(tr);
        }
        cfgmd5 = md5;
      }
    }
  }
  ajax.send(null);
}



/* ********************************************************************
 * Perform an action on a filename by making a server request
 *
 */
function actionFile(file, action) {
  file = file.replace(/\.cp$/i, "") + ".cp";

  if (action == "save") {
    for (var x = 0, c; c = storedConfigs[x++];) {
      if (c.file == file) {
        if (c.path.indexOf('system/') > -1) {
          alert('Cannot overwrite system configurations');
          return false;
        } else if (c.path.indexOf('live/') > -1) {
          if (!confirm("Overwriting this file will delete the associated Live configuration.  Continue?")) return false;
        } else if (!confirm("A file with this name already exists.  Overwrite?")) return false;
        break;
      }
    }
  }

  var ajax = getHTTPObject();
  ajax.open("GET", "manage.php?action=" + action + "&filename=" + encodeURIComponent(file), true);
  ajax.onreadystatechange = function() {
    if (ajax.readyState == 4) {
      refreshList();
      if (ajax.responseText.indexOf("Success") != 0) {
        getModified();
        setTimeout(function() { alert(ajax.responseText); }, 50);
      }
    }
  }
  ajax.send(null);
  return false;
}
