/* ********************************************************************
 * slider component, generalised initialisation
 *
 */
  
/*Test*/
function buildSliders(){
 buildSlider('50@i');
}

 

 function buildSliders(){
    //build sliders GUI
   var ajforms0 = document.getElementsByTagName('form');
   for (var values = [], ajfrm, x = 0; ajfrm = ajforms0[x++];) {
	      if (ajfrm.className.indexOf("unload") > -1) {
	        for (var ajelem, y = 0; ajelem = ajfrm.elements[y++];) {
			  //alert(ajelem.className+"--"+ ajelem.type);
	          if(ajelem.className.indexOf('sliderback')>-1)
	          {
	             buildSlider(ajelem.id);
	          }
	        }
	      }
	    }
		
	buildBaseApertures( );
}


function buildSlider(elementId_orig){
   //var elementId_orig = '50@i';
  
  var elementId = elementId_orig.replace(/@/g, 'at');   
       elementId = elementId.replace(/\./g, 'dot');  
	   
  var iVal = parseInt($('#'+elementId+'_lbl').text()); //parseInt(document.getElementById(elementId_orig).innerHTML);
  var minVal= parseInt($('#'+elementId+'_min').text());
  var maxVal= parseInt($("#"+elementId+"_max").text());
  
  var shiftVal = 0.0;
  if($('#'+elementId+'_shift').text())
  shiftVal = parseFloat($('#'+elementId+'_shift').text());
  
  var nominatorVal = 1.0;
  if($("#"+elementId+"_nominator").text())
  nominatorVal= parseFloat($("#"+elementId+"_nominator").text());
  
   var denominatorVal= 1.0;
   if( $("#"+elementId+"_denominator").text())
   denominatorVal= parseFloat($("#"+elementId+"_denominator").text());
  
  
  if($("#"+elementId+"_slider"))
  {
 
    $("#"+elementId+"_slider").slider({
       min:minVal, 
	   max:maxVal,
	   value:iVal,
	   change:function(event, ui)
	   {
	    // alert(event+"__"+ui.value);
	     $("#"+elementId+"_lbl").text(ui.value);
	     
	   },
	   stop:function(event, ui)
	   {
	    // alert("send value="+ ui.value);
		 
		 var tmpVal= parseFloat(ui.value);
		     tmpVal= tmpVal* denominatorVal/nominatorVal+ shiftVal;
		  
		 document.getElementById(elementId_orig).value = tmpVal;//stored for unloading
		 sendValue(elementId_orig);
	   }  
     });
   }
 //  $("#"+elementId+"_slider").slider("option", "value", 25);
} 

 
/*********************************AFD image function***********************/

 function updateAFDandARCImages(){
    //build sliders GUI
   var ajforms0 = document.getElementsByTagName('form');
   for (var values = [], ajfrm, x = 0; ajfrm = ajforms0[x++];) {
	      if (ajfrm.className.indexOf("unload") > -1) {
	        for (var ajelem, y = 0; ajelem = ajfrm.elements[y++];) {
			  //alert(ajelem.className+"--"+ ajelem.type);
			 // if(typeof(ajelem.className)=='undefined') continue;
			 // else alert(ajelem.className+"--"+ ajelem.type+"  is undefined");
			  
	          if(ajelem.className!='' && ajelem.className.indexOf('afdcontrol')>-1)
	          {
			     // alert(ajelem.id+":"+ ajelem.value);
			      updateAFDImage(ajelem.id, ajelem.value);
	          }
			  else
			   if(ajelem.className!='' && ajelem.className.indexOf('arccontrol')>-1)
	          {
			     // alert(ajelem.id+":"+ ajelem.value);
			      updateARCImage(ajelem.id, ajelem.value);
	          }
	        }
	      }
	    }
}

/*********************************AFperture functions***********************/
var debugAperture=false;

function updatePageElement(myelementId, value){
   
   var elementId= getApertureInfo(myelementId);
   
   if(debugAperture)
     alert(myelementId+ " :to update "+elementId+" to "+ value);
   
   if(elementId && document.getElementById(elementId))
   {
      if(debugAperture)
     alert("aable to update "+elementId+" to "+ value);
    
 	 document.getElementById(elementId).value=value;
	 sendValue(elementId); 
  }
  // else
  //alert("unable to update "+elementId+" to "+ value);
}



function buildApertureIFrame(frameId, viewTitle,  myHMax, myVMax, hstartID, hstartVal, hstopID, hstopVal, vstartID, vstartVal, vstopID, vstopVal ){

  var el = document.getElementById(frameId);

   if(el.contentWindow)
   {
     el.contentWindow.buildApertureView(viewTitle, myHMax, myVMax, hstartID, hstartVal, hstopID, hstopVal, vstartID, vstartVal, vstopID, vstopVal);
   }
}

var apertureGlobalMap = new Object();

function addApertureEntry( key, value)
{
  //to avoid jquery annoyng characters
  var elementId = key.replace(/@/g, 'at');   
      elementId = elementId.replace(/\./g, 'dot');  
	
	apertureGlobalMap[elementId] =value;
}

function getApertureInfo( key)
{
  //to avoid jquery annoyng characters
  var elementId = key.replace(/@/g, 'at');   
       elementId = elementId.replace(/\./g, 'dot');  
	
	return apertureGlobalMap[elementId];
}

function buildBaseApertures( ){

             var  elements =[], L, a, tem;

            if(document.getElementsByClassName){
				a= document.getElementsByClassName('apertureinfo');
				L= a.length;
				while(L) elements.push(a[--L]);
			}
			else{
				a= document.getElementsByTagName("span");
				L= a.length;
				while(L){
					tem= a[--L];
					if(tem.className.indexOf("apertureinfo")!=-1) elements.push(tem);
				}
			}
	
 			 
          if(elements == null || elements.length==0) return;
		  
            for (i = 0; i < elements.length; i++)
            {
               
				if(debugAperture)
				 alert(elements.length+":xxx:"+ elements[i].innerHTML);
				
				var myInfo= elements[i].innerHTML;
				
					//<span id="aperture_iframe_115.0@s" class="apertureinfo" style="display:none;">caption=Output Aperture View,frameid=aperture_iframe_115.0@i,
					//hmax=285.0@i,vmax=287.0@i,hstart=115.0@i,hstop=116.0@i,vstart=117.0@i,vstop=118.0@i</span>
					//expect string example:
					//caption=Output Aperture View,frameid=aperture_iframe_115.0@i,hmax=285.0@i,vmax=287.0@i,hstart=115.0@i,hstop=116.0@i,vstart=117.0@i,vstop=118.0@i
						
					var myInfoArr= myInfo.split(",");
					var myInfoHash = new Object();
					
					for (j=0; j<  myInfoArr.length; j++)
                     {
                       var tmpStr= myInfoArr[j];
					   var tmpArr = tmpStr.split("=");
					if(debugAperture)  alert("key="+ tmpArr[0]+ "  val="+tmpArr[1])
					   myInfoHash[tmpArr[0].trim()] = tmpArr[1];
                     }
		
		
            		addApertureEntry( myInfoHash['hstart']+'frameid', myInfoHash['frameid']);
					addApertureEntry( myInfoHash['hstop']+'frameid', myInfoHash['frameid']);
					addApertureEntry( myInfoHash['vstart']+'frameid', myInfoHash['frameid']);
					addApertureEntry( myInfoHash['vstop']+'frameid', myInfoHash['frameid']);
					
					addApertureEntry( myInfoHash['frameid']+'hstart', myInfoHash['hstart']);
					addApertureEntry( myInfoHash['frameid']+'hstop', myInfoHash['hstop']);
				    addApertureEntry( myInfoHash['frameid']+'vstart', myInfoHash['vstart']);
					addApertureEntry( myInfoHash['frameid']+'vstop', myInfoHash['vstop']);
					
					
					
					addApertureEntry( myInfoHash['frameid']+'hmax', myInfoHash['hmax']);
					addApertureEntry( myInfoHash['frameid']+'vmax', myInfoHash['vmax']);
	
	            //   alert("mammmm="+  myInfoHash['hmax']);
				//	alert("mammmm id="+  elements[i].id);
						
	                addMaxElementIntoMapping(elements[i].id,  myInfoHash['hmax'], myInfoHash['frameid'], 'hmax');
					addMaxElementIntoMapping(elements[i].id,  myInfoHash['vmax'], myInfoHash['frameid'], 'vmax');
					
	                addApertureEntry( myInfoHash['hmax']+'name',  'hmax');
	                addApertureEntry( myInfoHash['vmax']+'name',  'vmax');
					
	                addApertureEntry(myInfoHash['hstart']+'name', 'hstart');
					addApertureEntry( myInfoHash['hstop']+'name', 'hstop');
				    addApertureEntry( myInfoHash['vstart']+'name', 'vstart');
					addApertureEntry( myInfoHash['vstop']+'name', 'vstop');
					
					buildBaseApertureIFrame(myInfoHash['frameid'], myInfoHash['caption']);
					
		           debugApertureBuild(myInfoHash['frameid'], myInfoHash, i);
            }
}

function addMaxElementIntoMapping(infoId, maxId, frameId, maxType)
{
   var curEntry = getApertureInfo(maxId+'frameid');
   
    //alert("curEntry="+ curEntry);
   if((!curEntry)  || curEntry== undefined  || typeof( curEntry )=='undefined')
   {
     //create input txt field with maxId
	 //class aperturemax
	 //$('#myformelement').append('<input type="hidden" name="myfieldname" value="myvalue" />');
	 
	   var ajforms = document.getElementsByTagName('form');
	   //ajforms[0].append('<input type="hidden"  id="name="myfieldname" value="myvalue" />');
	 
	   var myVal= 1919;
	 
	   if(maxType=='vmax') myVal= 1010;
	 
	 var input = document.createElement("input");
      input.setAttribute("type", "hidden");
	  input.setAttribute("id", maxId);
      input.setAttribute("name", 'max'+infoId);
      input.setAttribute("value", myVal);
	  input.setAttribute("class",'aperturemax');
      ajforms[0].appendChild(input);

	  /*  $('<input>').attr({
         type: 'hidden',
         id: maxId,
	     class: 'aperturemax',
	     value: myVal,
         name: 'max'+infoId,
        }).appendTo(ajforms[0]); //('form');
		*/
	    //$('<input/>').attr({ type: 'text', id: 'test', name: 'test' })
	    // ajforms[0].append("<input type='hidden' name='max"+maxId+" id='"+ maxId+"' class='aperturemax' value='1919' />");
	     curEntry = frameId;
   }
   else
   {
      curEntry += ","+frameId;
	 
   }
   
   //alert("add curEntry="+ curEntry);
    addApertureEntry(maxId+"frameid", curEntry);
}

function debugApertureBuild(frameId, myInfoHash, i)
{
                  if(!debugAperture) return; 
                  //test 
				   
				  alert(myInfoHash['frameid']+ " maximum id="+ getApertureInfo(myInfoHash['frameid']+'hmax') );

				   setApertureIFrameMaximum(myInfoHash['frameid'], 'hmax', 1919 );
				   setApertureIFrameMaximum(myInfoHash['frameid'], 'vmax', 1179 );
                   passValueToApertureIFrameByName(myInfoHash['frameid'], getApertureInfo('115.'+i+'@iname') , 560);
				   passValueToApertureIFrameByName(myInfoHash['frameid'], getApertureInfo('116.'+i+'@iname') , 1560);
}

function buildBaseApertureIFrame(frameId, viewTitle,  hstartID,   hstopID,  vstartID,  vstopID  ){

    var el = document.getElementById(frameId);
  
    if(debugAperture)
     alert(frameId +" has contane:"+ el.contentWindow);
  
    if(el.contentWindow)
    {
      el.contentWindow.buildApertureView(frameId, viewTitle,   hstartID,  hstopID,   vstartID,   vstopID );
    }
}

function setApertureIFrameMaximum(frameId, maxType, maxVal ){

  var el = document.getElementById(frameId);

   if(el.contentWindow)
   {
     el.contentWindow.setMaximumValue(maxType, maxVal );
   }
}



function passValueToApertureIFrameByID(frameId, elementId, value){

   var iframe = document.getElementById(frameId);
   if(iframe && iframe.contentWindow)
   {
      if(elementId.indexOf("max")>-1 )
         iframe.contentWindow.setMaximumValue ( elementId, value); //document.getElementsByName('frame1')[0].contentWindow
      else
      iframe.contentWindow.setSliderValueByName( elementId, value);
   }   
 else  //if(debugAperture)
    alert("there is no frame:"+frameId);
}

function passValueToApertureIFrameByName(frameId, eleName, value){

  var el = document.getElementById(frameId);

   if(el.contentWindow)
   { 
    if(debugAperture)
     alert("eleName="+ eleName);
	 
	  if(elementId.indexOf("max")>-1 )
         el.contentWindow.setMaximumValue ( eleName, value);
		else
       el.contentWindow.setSliderValueByName( eleName, value);
    
	//el.contentWindow.setSliderValueByName( eleName, value);  //setSliderValueByName(elementName , myVal) 
   }
}
