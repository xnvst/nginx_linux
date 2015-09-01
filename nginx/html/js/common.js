String.prototype.trim = function() { return this.replace(/^\s+|\s+$/g,""); }
String.prototype.removeWord = function(word) {
  for (var foo = this.trim().split(" "), bar = [], baz, x = 0; baz = foo[x++];)
    if (baz.length && baz != word) bar.push(baz);
  return bar.join(" ");
}
var configData = {}, configProfileData = {}, configModified = "Pristine", configFileMatch = "";
var valueColorMapTable ={'Missing':'#51241F', 'missing':'#51241F'};// , 'Present': 'green'  };

var isIE = /*@cc_on!@*/false;

var timeLogTime = (new Date()).getTime();
var timeLogData = "";

function timeLog(msg, print) {
  var now = (new Date()).getTime();

  var reflows = (typeof opera == "object") ? " (" + opera.reflowCount + ")" : "";

  timeLogData += msg + ": " + (now - timeLogTime) + "ms" + reflows + "\n";

  timeLogTime = now;

  if (print) alert(timeLogData);
}

timeLog("Script starts", false);


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
 * Perform these actions onload for all pages
 *
 */
addListener('load', getModified);



/* ********************************************************************
 * Check the server to see if our working configuration differs from a
 * default configuration
 *
 */
function getModified() {
  var getm = getHTTPObject();
  getm.open("GET", "index.php?modified", true);
  getm.onreadystatechange = function() {
    if (getm.readyState == 4) {
      var mod = getm.responseText;

      if (mod != "Yes" && mod != "No" && mod != "Default") {
        alert(mod);
        return false;
      } else configModified = mod;

      var dmod = document.getElementById('modified');

      if (configModified == "Yes" &&  dmod!=null) {
        dmod.title = "Working configuration contains unsaved changes";
        dmod.style.display = "block";
      } else  if(dmod){
        
		dmod.title = "";
        dmod.style.display = "none";
      }
		

      if (window.location.pathname.indexOf('manage.php') > -1) {
        document.getElementsByName('clear')[0].disabled = (configModified != "Default") ? "" : "disabled";
        document.getElementById('manage_clear').className = (configModified != "Default") ? "" : "disabled";
      }

      try {
        var title = document.getElementsByTagName('title')[0];
        if (title.firstChild.nodeValue.indexOf("* ") === 0) {
          if (configModified != "Yes") title.firstChild.nodeValue = title.firstChild.nodeValue.substr(2);
        } else if (configModified == "Yes") title.firstChild.nodeValue = "* " + title.firstChild.nodeValue;
      } catch(e) {
        if (document.title.indexOf("* ") === 0) {
          if (configModified != "Yes") document.title = document.title.substr(2);
        } else if (configModified == "Yes") document.title = "* " + document.title;
      }
    }
  };
  getm.send(null);
}



/* ********************************************************************
 * Disable text selection within an element
 *
 */
function selectDisable(elem) {
  elem.onselectstart = function() { return false; };
  elem.unselectable = "on";
  elem.style.MozUserSelect = "none";
  elem.style.cursor = "default";
  if (window.opera) elem.onmousedown = function() { return false; };
}


/* *******************************************************************
 * Enable/Disable Real Time Controls
 * 
 */
 var enableDynamicApply;
 
 //alert(document.cookie);
 var cookie = document.cookie.split(";");
 var DynamicRTcookieNotfound = true;
 
for (var x = 0, c; x < cookie.length; x++) {
  c = cookie[x].split("=");
  if (c[0].trim() == "DynamicRT" && c.length == 2) {
  	DynamicRTcookieNotfound = false;
  	if(c[1] == "enable")
	 	enableDynamicApply = true;
	else if(c[1] == "disable")
	 	enableDynamicApply = false;
  }
}
  
 if(DynamicRTcookieNotfound){
 	enableDynamicApply = false;
 }

RTflashing();

function toggleRtControls() {
	if(enableDynamicApply)
	{
		//document.getElementById("RTbutton").style.backgroundColor = "#969B94";
		//document.getElementById("RTbuttonOnMenu").style.backgroundColor = "#969B94";
		document.getElementById("RTbutton").style.backgroundColor ="";
		document.getElementById("RTbuttonOnMenu").style.backgroundColor ="";
		enableDynamicApply = false;
		document.cookie = 'DynamicRT=disable;';
	
		document.getElementById("Applybutton").disabled = "";
		 document.getElementById("Applybutton").src= "img/apply_on.png";
	
		document.getElementById("Refreshbutton").disabled = "";
		document.getElementById("Refreshbutton").src= "img/refresh_on.png";
		document.getElementById("ApplybuttonOnMenu").disabled = "";
		document.getElementById("RefreshbuttonOnMenu").disabled = "";
	}
	else
	{
		 document.getElementById("RTbutton").style.backgroundColor = "#969B94";
		 document.getElementById("RTbuttonOnMenu").style.backgroundColor = "#969B94";
		enableDynamicApply = true;
		document.cookie = 'DynamicRT=enable;';
	
		document.getElementById("Applybutton").disabled = "disabled";
		document.getElementById("Applybutton").src= "img/apply_off.png";
		 
		document.getElementById("Refreshbutton").disabled = "disabled";
        document.getElementById("Refreshbutton").src= "img/refresh_off.png";
		
		document.getElementById("ApplybuttonOnMenu").disabled = "disabled";
		document.getElementById("RefreshbuttonOnMenu").disabled  = "disabled";
	}
}

var switch_flashing_color = true;

function RTflashing() {
	if(enableDynamicApply)
	{
		if(switch_flashing_color) 
		{
			if(document.getElementById("RTbutton"))	//make sure object is not null
			{
              document.getElementById("RTbutton").style.backgroundColor="#800517";     			
			  document.getElementById("RTbutton").style.backgroundColor="#51241F";
			   document.getElementById("RTbuttonOnMenu").style.backgroundColor="#51241F";   
			  // document.getElementById("RTbuttonOnMenu").style.color="#FFFFFF";   
			}
			switch_flashing_color = false;
		}
		else
		{
			if(document.getElementById("RTbutton"))	//make sure object is not null
		    {
				document.getElementById("RTbutton").style.backgroundColor="";
				document.getElementById("RTbuttonOnMenu").style.backgroundColor="";
			}
			switch_flashing_color = true;
		}
	}
	setTimeout( "RTflashing()", 500 ); //switch colors when timeout reached
	return true;
}


/* *******************************************************************
 * Enable/Disable Panel Profiling Controls
 * 
 */
 var enablePanelProfile;
 
 //alert(document.cookie);
 var cookiePanel = document.cookie.split(";");
 var PanelcookieNotfound = true;
 
for (var x = 0, c; x < cookiePanel.length; x++) {
  c = cookiePanel[x].split("=");
  if (c[0].trim() == "PanelProfile" && c.length == 2) {
  	PanelcookieNotfound = false;
  	if(c[1] == "yes")
	 	enablePanelProfile = true;
	else if(c[1] == "no")
	 	enablePanelProfile = false;
  }
}
  
 if(PanelcookieNotfound){
 	enablePanelProfile = false;
 }

function updatePanelEnable(panelEnableValue) {
	//alert('panelEnableValue = '+panelEnableValue);
	if(panelEnableValue=="yes")
	{
		enablePanelProfile = true;
		document.cookie = 'PanelProfile=yes;';
	}
	else if(panelEnableValue=="no")
	{
		enablePanelProfile = false;
		document.cookie = 'PanelProfile=no;';
	}
	//alert(document.cookie);
}


var enableRealTime =true;
 //alert(document.cookie);
 var cookieRT = document.cookie.split(";");
 var RTcookieNotfound = true;
 
 
 
function updateRealTimeEnable(realTimeEnableValue) {
	//alert('realTimeEnableValue = '+realTimeEnableValue);
	if(realTimeEnableValue=="yes")
	{
		enableRealTime = true;
		document.cookie = 'RealTime=yes;';
		document.getElementById("Refreshbutton").style.display = "";
		document.getElementById("Applybutton").style.display = "";
		document.getElementById("RTbutton").style.display = "";
	}
	else if(realTimeEnableValue=="no")
	{
		enableRealTime = false;
		document.cookie = 'RealTime=no;';
		document.getElementById("Refreshbutton").style.display = "none";
		document.getElementById("Applybutton").style.display = "none";
		document.getElementById("RTbutton").style.display = "none";
	}
	//alert(document.cookie);
}



/*
this method is to highligh field according for special values
*/
function adjustBorderColorIfNeeded(elementID)
{  
   var myEle = document.getElementById(elementID);
   var  elementValue = myEle.value;
 	
       if( myEle.tagName === "INPUT" && typeof(valueColorMapTable[elementValue]) !='undefined' )
		{  
		    myEle.style.borderColor = valueColorMapTable[elementValue];//parentNode.style.backgroundColor ="#FF0000";
            myEle.style.borderWidth = "thick";
		}		 
		else if ( myEle.tagName === "SELECT" && typeof( valueColorMapTable[myEle.options[ myEle.selectedIndex].text]) !='undefined')
		 {  
		 //   alert(elementID+"--"+valueColorMapTable[myEle.options[ myEle.selectedIndex].text] +"--"+ myEle.tagName+"--"+ myEle.options[ myEle.selectedIndex].text);
	
		    myEle.style.borderColor = valueColorMapTable[myEle.options[ myEle.selectedIndex].text];
			//parentNode.style.backgroundColor ="#FF0000";
            myEle.style.borderWidth = "thick";
		 }
		 else 
		  {  
		    myEle.style.borderColor = "#000000";
            myEle.style.borderWidth = "1px";
		 }
}


