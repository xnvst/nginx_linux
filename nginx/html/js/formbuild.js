/* ********************************************************************
 * Form input pages, generalised initialisation
 *
 */
 
 var error_not_received = true;
 var config_get_running = false; 
 
 var changedValues = new Array();
 var numchangedValues = 0;

/*
function restore_web_data(fr, a, b, c, fixn) {
	var x = (fr-c)*b/a;
	x = Math.round( x * fixn ) / fixn;
	//alert('restore fr= '+ fr + ' a= '+ a + '; b=' + b + '; c=' + c + '; fixn=' + fixn + '; restore x=' + x);
	return x;
} 
*/
 
addListener('load', function() {
  timeLog("Formbuilding starts", false);

  for (var opts = document.getElementsByTagName('option'), opt, x = 0; opt = opts[x++];)
    if (!opt.value) opt.value = opt.text; 

  timeLog("Option values added", false);

  var tables = document.getElementsByTagName('table');
  for (var cont, x = 0; cont = tables[x++];)
    if (cont.className == "container" && cont.rows[0]!= undefined)
      cont.rows[0].cells[0].className += " first";

  timeLog("'first' classname applied to tables", false);
  
   //build slider before loading the values
    buildSliders();
    updateAFDandARCImages();
	
	//alert("test start...");
	//testTest();
	//if(false)	//disable this for now, this snmpgets all the values on the page
	if(enableRealTime)
	{
		// grab the contents of all form elements and send to the server-side script
	    var ajforms = document.getElementsByTagName('form');
	    for (var values = [], ajfrm, x = 0; ajfrm = ajforms[x++];) {
	      if (ajfrm.className.indexOf("unload") > -1) {
	        for (var ajelem, y = 0; ajelem = ajfrm.elements[y++];) {
	          if(ajelem.type != "checkbox")
	          {
	          	var value = (ajelem.type != "radio" || ajelem.checked) ? ajelem.value : "0";
	          	values.push(encodeURIComponent(ajelem.id));
	          }
	        }
	      }
	    }
	    
	    var values_length = values.length;
	    var values_index = 0;
	    var values_send_max = 25;	//specify max number of IDs to send to the HD8812UDX at a time
	    //alert('Number of elements in values[] array is '+values_length);
	    
	    error_not_received = true;
	    
	    //only send values_send_max IDs at a time not to overflow the system
	    while(values_index < values_length)
	    {
	    	for(var valuesSend = [], i = 0; (i < values_send_max) && (values_index<values_length); i++)
	    	{
	    		valuesSend.push(values[values_index]);
	    		values_index++;
	    	}
	    	
	    	//alert('Number of elements in valuesSend[] array is '+valuesSend.length);
		    var snmpget_ajax = getHTTPObject();
		    var now = new Date();
		    snmpget_ajax.open("GET", "cgi-bin/cfgweb?Get&" + valuesSend.join(",") + ";time&" + now.getTime(), false);
			snmpget_ajax.onreadystatechange = function(ajax_index) 
			{
				if ((this.readyState == 4||this.readyState == "4") && (this.status == "200"||this.status == 200)) 
				{
                           //   alert(this.responseText);
				    var response = this.responseText;
						
					if( response.indexOf( "Fail" ) != -1 ||response.indexOf( "ERROR" ) != -1){
					   
					   if(error_not_received) {
							alert( "Error occurred while getting Real time values:\n" + response.replace("&",":") );
							error_not_received = false;
						}
						else  
					    alert(  response.replace("&",":") );
				    } else {
						//alert(snmpget_ajax.responseText);    //important debug info
					var response_lines0=  response.split(";")[0];
					updateHTMLElements(response_lines0);
					 
				  }
				}
			};
			snmpget_ajax.send(null);
			snmpget_ajax.close;
		}
	}
  
  changedValues = new Array();
  numchangedValues = 0;
  timeLog("Loaded config data applied to form elements", false);
  //alert('Loaded config data applied to form elements');   //JL
  showLightbox(false, "");
});

 function testTest(){
                    var response_lines ;
                   // var response_lines0="Get&53@i=2,54@i=1,49@s=yehehehe";
              
                    var response_lines0="Get&285.0@i=2020,115.0@i=19,116.0@i=1918";
					updateHTMLElements(response_lines0);
 }

function selectAllProfiling() {
	for (var frm, x = 0; frm = document.forms[x++];) {
	    for (var elem, y = 0; elem = frm.elements[y++];) {
	      if(elem.type == "checkbox") {
	        	elem.checked = "checked";
	        	//alert('name = '+elem.name+'\ntype = '+elem.type+'\nchecked = '+ elem.checked+'\nconfig value = '+configProfileData[elem.name]);
	      }
	    }
    }
    return true;
}

function deselectAllProfiling() {
	for (var frm, x = 0; frm = document.forms[x++];) {
	    for (var elem, y = 0; elem = frm.elements[y++];) {
	      if(elem.type == "checkbox") {
	        	elem.checked = "";
	        	//alert('name = '+elem.name+'\ntype = '+elem.type+'\nchecked = '+ elem.checked+'\nconfig value = '+configProfileData[elem.name]);
	      }
	    }
    }
    return true;
}

function refreshRT() {
	
	// grab the contents of all form elements and send to the server-side script
    var ajforms = document.getElementsByTagName('form');
    for (var values = [], ajfrm, x = 0; ajfrm = ajforms[x++];) {
      if (ajfrm.className.indexOf("unload") > -1) {
        for (var ajelem, y = 0; ajelem = ajfrm.elements[y++];) {
          if(ajelem.type != "checkbox")
          {
          	var value = (ajelem.type != "radio" || ajelem.checked) ? ajelem.value : "0";
          	values.push(encodeURIComponent(ajelem.id));
          }
        }
      }
    }
    
    var values_length = values.length;
    var values_index = 0;
    var values_send_max = 25;	//specify max number of IDs to send to the HD8812UDX at a time
    //alert('Number of elements in values[] array is '+values_length);
    
    error_not_received = true;
    
    //only send values_send_max IDs at a time not to overflow the system
    while(values_index < values_length)
    {
    	for(var valuesSend = [], i = 0; (i < values_send_max) && (values_index<values_length); i++)
    	{
    		valuesSend.push(values[values_index]);
    		values_index++;
    	}
    	
    	//alert('Number of elements in valuesSend[] array is '+valuesSend.length);
	    var snmpget_ajax = getHTTPObject();
	    var now = new Date();
	    snmpget_ajax.open("GET", "cgi-bin/cfgweb?Get&" + valuesSend.join(",") + ";time&" + now.getTime(), false);
		snmpget_ajax.onreadystatechange = function(ajax_index) 
		{
			if ((this.readyState == 4||this.readyState == "4") && (this.status == "200"||this.status == 200)) 
			{
			  	  var response = snmpget_ajax.responseText;
				  if(  response.indexOf( "Fail" ) != -1 || response.indexOf( "ERROR" ) != -1){
					  if(error_not_received) {
						alert( "Error occurred while getting Real time values:\n" +  response.replace("&",":") );
						error_not_received = false;
					 }
					 else  
					    alert(   response.replace("&",":") );
			    } else {
					 
					var response_lines =null;
					var rsl0=  response.split(";")[0];
					updateHTMLElements(rsl0);
				 
			   	}
			}
		};
		snmpget_ajax.send(null);
		snmpget_ajax.close;
	}
    return true;
}

function updateHTMLElements(response_lines0){

                var response_lines1= response_lines0.split("&");
					
                if(response_lines1.length>=2)
				{
					   response_lines = response_lines1[1].split(",");
					 
				   	 
					 //if(response_lines==null)
					 //alert("Full response is :"+ snmpget_ajax.responseText);
					 
				   	//get all lines of data, except last one which is blank
				   	for(var i = 0; i<response_lines.length; i++)
				    {
				   		var data_fields = response_lines[i].split("=");
				   		//alert(data_fields[0] + ' = ' + data_fields[1]+"---"+ response_lines.length);
					 
						var myElem= document.getElementById(data_fields[0] );

				        updateHTMLElement(myElem, data_fields);
					}
				}
}

function updateHTMLElement(myElem, data_fields)
{
                         if(!myElem || myElem=="") return;
                        var myclass= myElem.className;
                         if(!myclass || myclass==undefined) myclass="";
                                               
						 if(myElem.nodeName == "SELECT")
						 {
						     ChangeSelectByValue(myElem, data_fields[1] , true);
						  //handle trap status image display
 
						    if(myclass != "" && myclass.indexOf('trapstatus')>-1)
						    {
						      if(myElem.value=="true")
							   document.getElementById(data_fields[0] +"_img").src="img/RedCheckbox.gif";
							  else 
							   document.getElementById(data_fields[0] + "_img").src="img/GreenCheckbox.gif";
						    }
						    else if( myclass != "" && myclass.indexOf('afdcontrol')>-1)
						    {
						       updateAFDImage(data_fields[0], data_fields[1]);
						    }
						    else if( myclass != "" && myclass.indexOf('arccontrol')>-1)
						    {
						        updateARCImage(data_fields[0], data_fields[1]);    	
						    }
                             //                     else
                             //                   alert("select last"+ data_fields[0]);
						 }
						 else if(myclass!="" && myclass.indexOf('sliderback')>-1)
						 { 
						     myElem.value= data_fields[1];
							 updateSlider(data_fields[0] , data_fields[1]);
							 
						 }
						 else if(myclass!="" && myclass.indexOf('aperturemax')>-1)
						 { 
						     myElem.value= data_fields[1];
							 
							 var frameIds=  getApertureInfo(data_fields[0]+'frameid');
							 var name = getApertureInfo(data_fields[0]+'name');
							 
						     var frameIdArr= frameIds.split(",");
							 
							 for(var idx=0; idx< frameIdArr.length; idx++)
							   setApertureIFrameMaximum(frameIdArr[idx], name, data_fields[1] )
							
						 }
						 
						 else if(myclass!="" && myclass.indexOf('aperturectl')>-1)
						 { 
						     myElem.value= data_fields[1];
							 
							 var frameId=  getApertureInfo(data_fields[0]+'frameid');
							 var name = getApertureInfo(data_fields[0]+'name');
							 
							  passValueToApertureIFrameByID(frameId, name, data_fields[1]); 
						 }
						
						 else  if(myElem.type!= "button" && myElem.nodeName != "BUTTON")//skip buttons
				   		   myElem.value = data_fields[1];
}

function ChangeSelectByValue(ddl, selIdx, change) {

    // var ddl = document.getElementById(ddlID);
     for (var i = 0; i < ddl.options.length; i++) {
         if (i == selIdx) {
             if (ddl.selectedIndex != i) {
                 ddl.selectedIndex = i;
              //   if (change)
               //      ddl.onchange();
             }
             break;
         }
     }
 }


function updateAFDImage(elementId, id){

   var newElementId = elementId.replace(/@/g, 'at');
       newElementId = newElementId.replace(/\./g, "dot");	
	    
  var idxNum= parseInt(id.trim())-1;
  var imageName= "img/web.evertz-logo.png";

     if(idxNum>1 && idxNum <32)
	  imageName = "img/afd/"+idxNum+".png";
	  
	 var image = $('#'+newElementId+'_img');
	 image.fadeOut('fast', function () {
        image.html('<img  src="'+imageName+'"/>'); 
        image.fadeIn('fast');
    });

	 var imageTxt =  $('#'+newElementId+'_cap');
	 imageTxt.fadeOut('fast', function () {
        imageTxt.html( AFD_DESCRIPTION_1[idxNum+ 2] + "<br>" + AFD_DESCRIPTION_2[idxNum+ 2]);
        imageTxt.fadeIn('slow');
    });
	
}
		
function updateARCImage(elementId, idx){
  
			
   var newElementId = elementId.replace(/@/g, 'at');
       newElementId = newElementId.replace(/\./g, "dot");	
	    
  var imageName= "img/web.evertz-logo.png";
  var imageNameDst= "img/web.evertz-logo.png";
  var idxNum= parseInt(idx.trim());
    
	 imageName = "img/arc/"+ARC_FROM[idxNum]+".png";
	 imageNameDst = "img/arc/"+ARC_TO[idxNum]+".png";
	  
	 
	 var image = $('#'+newElementId+'_imgsrc');
	   image.fadeOut('fast', function () {
        image.html('<img  src="'+imageName+'"/>');
        image.fadeIn('fast');
    });

	 var imagedst = $('#'+newElementId+'_imgdst');
         imagedst.fadeOut('slot', function () {
         imagedst.html('<img  src="'+imageNameDst+'"/>');
         imagedst.fadeIn('slow');
    });
	
 
	
	 var imageTxt = $('#'+newElementId+'_cap');
	 imageTxt.fadeOut('fast', function () {
        imageTxt.html(ARC_DESCRIPTION[idxNum]); 
        imageTxt.fadeIn('slow');
    });
}
		
function updateSlider(elementId , newVal){
     var newElementId= elementId.replace(/@/g, 'at');
         newElementId= newElementId.replace(/\./g, "dot");			

    var shiftVal = 0.0;
   if($('#'+newElementId+'_shift').text())
     shiftVal = parseFloat($('#'+newElementId+'_shift').text());
  
  var nominatorVal = 1.0;
  if($("#"+newElementId+"_nominator").text())
  nominatorVal= parseFloat($("#"+newElementId+"_nominator").text());
  
   var denominatorVal= 1.0;
   if( $("#"+newElementId+"_denominator").text())
   denominatorVal= parseFloat($("#"+newElementId+"_denominator").text());
  
   var newVal2= (newVal-  shiftVal) * nominatorVal/denominatorVal;
  
   $("#"+newElementId+"_slider").slider("option", "value", newVal2);
}				

function filltestPattern(elem) {
    if (elem.id == "testGenpattern.1;b") {
      var select = elem;
	  //alert("Fill test pattern");
      while (select.firstChild) select.removeChild(select.firstChild);
	  //alert("Removed old options, testPatterns.length = "+testPatterns.length);
      for (var y = 0, si = 0; y < testPatterns.length; y++) {
			//alert("testPatterns[y].value = "+testPatterns[y].value);
          var option = document.createElement('option');
              option.value = testPatterns[y].value;
              option.appendChild(document.createTextNode(testPatterns[y].name));
            select.appendChild(option);
      } 
    }
}


function updateTableRange(id, pagename)
{

     var id_root= id.substring(8);
	 var newlink= pagename+"?startidxselect="+ $("#start"+id_root).val().trim()+"&endidxselect="+  $("#end"+id_root).val().trim();
  
	 var curStart = parseInt($("#start"+id_root).val().trim());
	 var curEnd = parseInt($("#end"+id_root).val().trim());
	 
	   
	 if(curStart > curEnd)
	 { 
	   alert("<Start> index must be less than or equal to <End> index! ");
	   return;
	 }
	  
	 
    if(curStart <parseInt($("#min"+id_root).val()) )
    { alert("You selected <Start> index "+ $("#start"+id_root).val()+" less than the minimum index! ");
	   return;
	 }
	else if(curEnd> parseInt($("#max"+id_root).val()))
	{ alert("You selected <End> index "+ $("#end"+id_root).val()+" larger than the maximum index! ");
	   return;
	}
	else window.location=newlink;
}

function updateTableRangePrev(id, pagename)
{

     var id_root= id.substring(10);
	 var curStart= parseInt($("#start"+id_root).val());
	 var curEnd_org= parseInt($("#end"+id_root).val());
	 var curEnd = curStart;
	  
	  
	 curStart= curStart-51;
	 if(curStart< parseInt($("#min"+id_root).val().trim() ))
	 {  
	    curStart = parseInt($("#min"+id_root).val().trim() );
	 }
	
	  
	 if(curStart<= curEnd)
	 { 
	   var newlink= pagename+"?startidxselect="+ curStart+"&endidxselect="+ curEnd;
   
        $("#start"+id_root).val(curStart);
	    $("#end"+id_root).val(curEnd);
		window.location=newlink;
	 }
}

function updateTableRangeNext(id, pagename)
{

     var id_root= id.substring(10);
	 var curStart_org= parseInt($("#start"+id_root).val());
	 var curEnd= parseInt($("#end"+id_root).val());
	 var curStart= curEnd;
	  
	  
	 curEnd= curEnd+51;
	 if(curEnd> parseInt($("#max"+id_root).val() ))
	 {  
	    curEnd = parseInt($("#max"+id_root).val() );
	 }
	  
	 if(curStart<= curEnd)
	 { 
	   var newlink= pagename+"?startidxselect="+ curStart+"&endidxselect="+ curEnd;
   
        $("#start"+id_root).val(curStart);
	    $("#end"+id_root).val(curEnd);
		window.location=newlink;
	 }
}
