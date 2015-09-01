<?php

require "config.php";

require "upgrade.head.php";

$_PAGE['css'][] = "upgrade.css";
$_PAGE['js'][] = "upgrade.js";
$_PAGE['title'] = "Upgrade {$_PAGE['product']} Firmware";

require "header.php";
require "upgrade.body.php";

?> 

<?php include "footer.php"; ?>

 <?php if(!is_file("{$_UPGRADE['verfile']}") ) { 
  echo "<p style=\"position:relative; top:100px;left:350px; color:#ff0000;\">Version file '". $_UPGRADE['verfile']. "' is missing!<br> Upgrade cannot continue.</p>";
} 
?>

<script type="text/javascript">
			showLightbox(false, ""); 
 </script>
  
</body>
</html>
