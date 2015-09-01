<?php

$_PAGE['js'][] = "formbuild.js";
$_PAGE['js'][] = "script.unload.js";
$_PAGE['js'][] = "stackbox.js";
$_PAGE['title'] = "System Configuration - Notify";
$_PAGE['configlimit'] = '';
include "header.php";

?>
<h2>Notify</h2>

<?php if ($_COOKIE['PanelProfile']==="yes") { ?>
<form>
<div align="center" style="margin:1em;">
  	  <a>Panel Profile:</a>
  	  <input type="button" id="SelectAll" value="Select All" onclick="selectAllProfiling();"/>
  	  <input type="button" id="DeselectAll" value="De-select All" onclick="deselectAllProfiling();"/>
</div>
</form>
<?php } ?>

<script type="text/javascript">
$(window).load(function(){
   updateStatusImages();
});

function updateStatusImages(){
$("select").each(function (index, domEle) {

adjustBorderColorIfNeeded($(domEle).attr('id'))

if ($(domEle).attr('class')) {
if ($(domEle).attr('class')!=""&& $(domEle).attr('class').indexOf('trapstatus')>-1) {
   if($(domEle).val()=="true")
        document.getElementById($(domEle).attr("id")+"_img").src="img/RedCheckbox.gif";
    else 		   document.getElementById($(domEle).attr("id")+"_img").src="img/GreenCheckbox.gif";
		   }
  }
  });
}

</script>

<br/>
<H3 class ="table_head"> <img style="display:none;" src="img/restore.jpeg" alt="+"/>Send Trap </H3>

<form id="form_1000" class="unload table_body">
<table cellspacing="1" border="0" class="container">
      <tr>
         <th nowrap> videoLoss</th>
         <td>
          <select name="notify.sendTrap.videoLoss" id="1000.0@i" onchange="sendValue(this.id);">
          <option value="0" selected="selected">Present</option>
          <option value="1">Missing</option>
          </select>
         </td>
         <?php if ($_COOKIE['PanelProfile']==="yes") { ?>
         <td>
           <input type="checkbox" name="notify.sendTrap.videoLoss" />
         </td>
         <?php } ?>
      </tr>
      <tr>
         <th nowrap> audioLoss</th>
         <td>
          <select name="notify.sendTrap.audioLoss" id="1000.1@i" onchange="sendValue(this.id);">
          <option value="0" selected="selected">Present</option>
          <option value="1">Missing</option>
          </select>
         </td>
         <?php if ($_COOKIE['PanelProfile']==="yes") { ?>
         <td>
           <input type="checkbox" name="notify.sendTrap.audioLoss" />
         </td>
         <?php } ?>
      </tr>
 </table>
</form>
<br/>
<H3 class ="table_head"> <img style="display:none;" src="img/restore.jpeg" alt="+"/>Fault Present </H3>

<form id="form_60" class="unload table_body">
<table cellspacing="1" border="0" class="container">
<tr>
   <th nowrap> videoLoss</th>
   <td>
      <select  disabled="disabled"   class="trapstatus"  style="visibility:hidden;" name="notify.faultPresent.videoLoss" id="60.0@i">
          <option value="0" selected="selected">False</option>
          <option value="1">True</option>
      </select>
      <img id="60.0@i_img" src="img/GreenCheckbox.gif"/>
   </td>
 <?php if ($_COOKIE['PanelProfile']==="yes") { ?>
   <td>
     <input type="checkbox" name="notify.faultPresent.videoLoss" />
   </td>
 <?php } ?>
</tr>
<tr>
   <th nowrap> audioLoss</th>
   <td>
      <select  disabled="disabled"   class="trapstatus"  style="visibility:hidden;" name="notify.faultPresent.audioLoss" id="60.1@i">
          <option value="0" selected="selected">False</option>
          <option value="1">True</option>
      </select>
      <img id="60.1@i_img" src="img/GreenCheckbox.gif"/>
   </td>
 <?php if ($_COOKIE['PanelProfile']==="yes") { ?>
   <td>
     <input type="checkbox" name="notify.faultPresent.audioLoss" />
   </td>
 <?php } ?>
</tr>
 </table>
</form>
<br/><br/> 
		  
<div id="footer">
  <a href="page01.php" id="backlink_id" class="backlink"> <img src="img/pointer.load.left.png" alt="&lt;&lt; Back"  /></a>


</div>
<br>
<?php include "footer.php"; ?>
</body>
</html>

