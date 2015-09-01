var skipUnload = false;
/*
function to_rt_data(fw, pa, pb, pc) {
	var fr = Math.round((fw * pa / pb) + pc);
	return fr;
} 
*/

/* ********************************************************************
 * On page unload, gather applicable form values and send to the server
 *
 */
addListener('unload', function() {

  if (!skipUnload && document.forms[0]) {
    var indim = innerDimensions();
    showLightbox(true, "Saving . . .");
    
    // grab the contents of all form elements and send to the server-side script
    var ajforms = document.getElementsByTagName('form');
    for (var values = [], ajfrm, x = 0; ajfrm = ajforms[x++];) {
    if (ajfrm.className.indexOf("unload") > -1) {
        for (var ajelem, y = 0; ajelem = ajfrm.elements[y++];) {
  	  if(ajelem.type != "checkbox")

         {
          	var value = (ajelem.type != "radio" || ajelem.checked) ? ajelem.value : "0";
          	if(enablePanelProfile)
          	{
	          	var elementsWithSameName = ajfrm[ajelem.name];
	          	var value_to_push;
	          	
	          	if(elementsWithSameName[1].checked)	//second occurrence of the same name should be the checkbox
	          	{
	          		value_to_push = encodeURIComponent(ajelem.id) + "=" + encodeURIComponent(value) + ";1";
	          	}
			else
			{
				value_to_push = encodeURIComponent(ajelem.id) + "=" + encodeURIComponent(value) + ";0";
			}
	          	values.push(value_to_push);
          	}
			else  if(ajelem.type != "button")
          	{
         		values.push(encodeURIComponent(ajelem.id) + "=" + encodeURIComponent(value));
          	}
          }
		  
        }
      }
    }

    // Send the AJAX request
    var http = getHTTPObject();
    http.open("POST", "storage.php", false);
    http.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    if (http.sendTo) {
      http.onreadystatechange = function() {
        if (http.readyState == 4) {
          saveloadDialogue(false);

          window.location.href = http.sendTo;
          http.sendTo = "";
        }
      };
    }
    http.send(values.join("&"));
	
    showLightbox(false, "");
  } else skipUnload = false;

  return true;
});

function sendValue(elementID) {

    var ajelem = document.getElementById(elementID);
	  
	 if(ajelem.className!='' && ajelem.className.indexOf('afdcontrol')>-1)
	 {
			    
			      updateAFDImage(ajelem.id, ajelem.value);
	 }
     else   if(ajelem.className!='' && ajelem.className.indexOf('arccontrol')>-1)
	 {
			     // alert(ajelem.id+":"+ ajelem.value);
			      updateARCImage(ajelem.id, ajelem.value);
	 }
			  
	//alert('SND VALUE');
	if(enableDynamicApply && !config_get_running)
	{
	    var elementValue = document.getElementById(elementID).value;
	    //alert("This was triggerred by element: ID="+elementID+", value="+elementValue);//x.value);
	    
		var snmpset_ajax = getHTTPObject();
	    var now = new Date();
	    snmpset_ajax.open("GET", "cgi-bin/cfgweb?Set&" + elementID +"=" + elementValue + ";Time&" + now.getTime(), true);
		snmpset_ajax.onreadystatechange = function() 
		{
			if ((this.readyState == 4||this.readyState == "4") && (this.status == "200"||this.status == 200)) 
			{
				if( this.responseText.indexOf( "Fail" ) != -1 || this.responseText.indexOf( "ERROR" ) != -1 ){
					alert( "Error occurred while setting Real time values:\n" + snmpset_ajax.responseText );
			    }
			}
		};
		snmpset_ajax.send(null);
		
		adjustBorderColorIfNeeded(elementID);
	}
	else if(enableRealTime)
	{
		var elementValue = document.getElementById(elementID).value;
		var combinedIdValue = elementID + '=' + elementValue;
		var save_value_index = numchangedValues;
		
		for(var i = 0; i < numchangedValues; i++)
		{
			var changedID = changedValues[i].split("=");
			//alert('i='+i+'\nelementID='+elementID+'\nchangedID[0]='+changedID[0]);
			if(elementID == changedID[0])
				save_value_index = i; //replace old value with new value if same ID found
		}
		changedValues[save_value_index] = elementID + '=' + elementValue;
		
		if(save_value_index == numchangedValues)
			numchangedValues++;
			
		adjustBorderColorIfNeeded(elementID);
	}
    return true;
}

function  buttonClick(elementID, message){

   if(message!=undefined &&message!="" )
  {
     var confirmed = confirm(message);
      //alert("There is  confirmation!!!"+  confirmed);
	  if(confirmed!=true)
	   return;
  }
  
	if( !config_get_running)
	{
	    var elementValue = document.getElementById(elementID).value;
	    //alert("This was triggerred by element: ID="+elementID+", value="+elementValue);//x.value);
	    
		var snmpset_ajax = getHTTPObject();
	    var now = new Date();
	    snmpset_ajax.open("GET", "cgi-bin/cfgweb?Set&" + elementID +"=1;time&" + now.getTime(), true);
		snmpset_ajax.onreadystatechange = function() 
		{
			if ((this.readyState == 4||this.readyState == "4") && (this.status == "200"||this.status == 200)) 
			{
				if( this.responseText.indexOf( "Fail" ) != -1 || this.responseText.indexOf( "ERROR" ) != -1 ){
					alert( "Error occurred while setting Real time values:\n" + this.responseText.replace("&",":") );
			    }
			}
		};
		snmpset_ajax.send(null);
	}
	 
    return true;
}

var specialValueCases = new Array();
 

function applyRT() {

	//grab the contents of all changed elements and send to server side
	var values_length = numchangedValues;
    var values_index = 0;
    var values_send_max = 20;	//specify max number of IDs to send to the HD8812UDX at a time
    //alert('Number of elements in values[] array is '+values_length+'\n'+changedValues);
    
    error_not_received = true;
    
    //only send values_send_max IDs at a time not to overflow the system
    while(values_index < values_length)
    {
    	for(var valuesSend = [], i = 0; (i < values_send_max) && (values_index<values_length); i++)
    	{
    		valuesSend.push(changedValues[values_index]);
    		values_index++;
    	}
    	
    	//alert('Number of elements in valuesSend[] array is '+valuesSend.length);
	    var snmpget_ajax = getHTTPObject();
	    var now = new Date();
	    snmpget_ajax.open("GET", "cgi-bin/cfgweb?Set&" + valuesSend.join(",") + ";time&" + now.getTime(), false);
		snmpget_ajax.onreadystatechange = function(ajax_index) 
		{
			if ((this.readyState == 4||this.readyState == "4") && (this.status == "200"||this.status == 200)) 
			{
				if( this.responseText.indexOf( "Fail" ) != -1 || this.responseText.indexOf( "ERROR" ) != -1 ){
					if(error_not_received) {
						alert( "Error occurred while getting Real time values:\n" + this.responseText.replace("&",":" ));
						error_not_received = false;
					}
				   else
				    alert(  this.responseText.replace("&",":" ));
			    }
			}
		};
		snmpget_ajax.send(null);
		snmpget_ajax.close;
	}
	//clear changes saved
	changedValues = new Array();
  	numchangedValues = 0;
    return true;
}

function sendChangedValue(elementID, ma, mb, mc, type) {
	var ori_elementValue = document.getElementById(elementID).value ;
	
	if((type.indexOf("HEX") != -1) ) 	 
	{
		var elementValue = parseInt(ori_elementValue, 16);
		//alert('Hex ori_elementValue='+ ori_elementValue+ ';  Dec elementValue='+ elementValue);
	}
	else if((type.indexOf("LOG") != -1) ||
	        elementID.indexOf("audioMixermixerInputGain") != -1) 
	{
		var fw = parseFloat(ori_elementValue);
		//alert('sendChangedValue fw='+ fw+ ';  ori_elementValue='+ ori_elementValue);
		if(fw == -199.9){
			var elementValue = 0;
			//alert('sendChangedValue elementValue='+ elementValue);
		}
		else{
			var tmp = Math.pow(10,fw/20) * 4096.0;
			var elementValue = Math.round(tmp);
			//alert('sendChangedValue 2 elementValue='+ elementValue);
		}
	}
	else {
		var elementValue = Math.round((ori_elementValue * ma / mb) + mc);
	}
	//alert("element: ID="+elementID+", value="+elementValue);//x.value);
	if(enableDynamicApply && !config_get_running)
	{
	    //alert("This was triggerred by element: ID="+elementID+", value="+elementValue);//x.value);
		var snmpset_ajax = getHTTPObject();
	    var now = new Date();
	    snmpset_ajax.open("GET", "cgi-bin/cfgweb?Set&" + elementID +"=" + elementValue + "&time=" + now.getTime(), true);
		snmpset_ajax.onreadystatechange = function() 
		{
			if ((this.readyState == 4||this.readyState == "4") && (this.status == "200"||this.status == 200)) 
			{
				if( this.responseText.indexOf( "Fail" ) != -1 || this.responseText.indexOf( "ERROR" ) != -1  ){
					alert( "Error occurred while setting Real time values:\n" + this.responseText );
			    }
			}
		};
		snmpset_ajax.send(null);
	}
	else if(enableRealTime)
	{
		var combinedIdValue = elementID + '=' + elementValue;
		var save_value_index = numchangedValues;
		
		for(var i = 0; i < numchangedValues; i++)
		{
			var changedID = changedValues[i].split("=");
			//alert('i='+i+'\nelementID='+elementID+'\nchangedID[0]='+changedID[0]);
			if(elementID == changedID[0])
				save_value_index = i; //replace old value with new value if same ID found
		}
		changedValues[save_value_index] = elementID + '=' + elementValue;
		
		if(save_value_index == numchangedValues)
			numchangedValues++;
	}
    return true;
}
