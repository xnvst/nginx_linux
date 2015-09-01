   </div>
   
   <div class="vmenu" style="background-color:#5286B5; width:200px;">
  
        
		 <div class="first_li">
		<input    id="RefreshbuttonOnMenu" type="image" style="background-color: #5286B5; border:0px;  cursor:pointer;text-align:left; "  onclick="refreshRT();" value="Refresh" onmouseover="$(this).css('background', 'white');"  onmouseout="$(this).css('background', '#5286B5');" src="img/refresh_on.png" > Refresh </input> 
		</div>
		<div class="first_li">
        <input   id="ApplybuttonOnMenu"  type="image" style="background-color: #5286B5; border:0px; cursor:pointer;text-align:left; " onclick="applyRT();" value=""  onmouseover="$(this).css('background', 'white');"  onmouseout="$(this).css('background', '#5286B5');" src="img/apply_on.png" >Apply</input>  
         </div>
		<div class="first_li">
		<input class="first_li"  id="RTbuttonOnMenu" type="image"  style="background-color: #5286B5; border:0px;   cursor:pointer;text-align:left; " onclick="toggleRtControls();" onmouseover="$(this).css('background', 'white');"   value="Dynamic Apply"  onmouseout="$(this).css('background', '#969B94');" src="img/dynamic_on.png"> Dynamic Apply </input> 
		</div>
		
		<?php 
		 if($show_upgrade_control=="true"||$show_config_control=="true"){
		?>
			<div class="sep_li"></div>
		<?php
         } 
		  
		if($show_upgrade_control=="true"){
		?>
		    <div class="first_li">
            <a  href="upgrade.php" title="Firmware Upgrade Area"><img src="img/cog_go.png" title="" alt="" /> Upgrade Firmware</a>
			</div>
		<?php
		}
		
		if($show_config_control=="true"){
		?>
		   <div class="first_li">
            <a c  href="manage.php" id="ConfigManage" title="Configuration Management Area"><img src="img/config.png" title="" alt="" /> Configuration Management</a>
			</div>
		<?php
         } 
		?>	
	</div>
    <?php include "left.php"; ?>
  </div>

  <script>
			$('#sidebar').portamento({wrapper: $('#outer')});	// set #wrapper as the visual coundary of the panel
  </script>
		
  

  <script type="text/javascript">showLightbox(true, "Loading . . ."); </script>
