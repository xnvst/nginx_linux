<?php

$_PAGE['js'][] = "formbuild.js";
$_PAGE['js'][] = "script.unload.js";
$_PAGE['js'][] = "stackbox.js";
$_PAGE['title'] = "System Configuration - Network";
$_PAGE['configlimit'] = '';
include "header.php";

?>
<h2>Network</h2>

<?php if ($_COOKIE['PanelProfile']==="yes") { ?>
<form>
<div align="center" style="margin:1em;">
  	  <a>Panel Profile:</a>
  	  <input type="button" id="SelectAll" value="Select All" onclick="selectAllProfiling();"/>
  	  <input type="button" id="DeselectAll" value="De-select All" onclick="deselectAllProfiling();"/>
</div>
</form>
<?php } ?>



<br/>
<H3 class ="table_head"> <img style="display:none;" src="img/restore.jpeg" alt="+"/>Network </H3>
<form id="form_network" method="post" action="" class="unload table_body">
<table cellspacing="1" border="0" class="container">
<tr>
<th nowrap>IP Address</th>
<td nowrap>
 <input  disabled="disabled"  name="network.ipAddress" type="text" size="4"  disabled="disabled" style="background-color:#eeeeee;"   value=" 192.168.1.10" id="51@s" onchange="sendValue(this.id);" />
<span/>
</td>
<?php if ($_COOKIE['PanelProfile']==="yes") { ?>
<td>
 <input  disabled="disabled"  type="checkbox" name="network.ipAddress"/>
</td>
<?php } ?>
</tr>
<tr>
<th nowrap>MultiCast Address</th>
<td nowrap>
 <input name="network.multiCastAddress" type="text" size="4"   value=" 192.168.1.10" id="52@s" onchange="sendValue(this.id);" />
<span/>
</td>
<?php if ($_COOKIE['PanelProfile']==="yes") { ?>
<td>
 <input type="checkbox" name="network.multiCastAddress"/>
</td>
<?php } ?>
</tr>
<tr>
<th nowrap>Udp Port</th>
<td nowrap>
 <input name="network.udpPort" type="text" size="4"   value=" 1" id="53@i" onchange="sendValue(this.id);" />
<span/>
</td>
<?php if ($_COOKIE['PanelProfile']==="yes") { ?>
<td>
 <input type="checkbox" name="network.udpPort"/>
</td>
<?php } ?>
</tr>
 </table>
</form>
<br/><br/> 
		  
<div id="footer">

  <a href="page02.php" id="forwardlink_id"><img src="img/pointer.load.right.png" alt="Next &gt;&gt;"  /> </a>

</div>
<br>
<?php include "footer.php"; ?>
</body>
</html>

