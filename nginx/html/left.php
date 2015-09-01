 
  <div class="" style="top: 0px;  list-style: none;" id="sidebar">
  <li class="label"><img style="display:none;"  src="img/restore.jpeg" alt="+"/>Configuration Pages</li>
  
  <?php
  $page_count =  3 ;
  
  if($has_home_page=="true")
   {
     ?>
      <li class="footlink">
	  <?php
                  if ($_SERVER['PHP_SELF'] != "/{$_PAGE['dir']}index.php") {
                    ?><a href="index.php">Home </a>
					<?php
                  } else { ?><span ><?php echo "<strong>".Home."</strong>" ?> </span><?php }
	   ?>
	  </li>
	  <?php
  }
  
  for ($x = 1; $x <  $page_count; $x++) {
    $y = sprintf("%02s", $x); ?> 
    <li class="footlink"><?php
      echo preg_replace("/^0(\d)/", "<span>0</span>$1", $y).". ";
	  if(($has_home_page == "false" )&& $x==1 && ( $_SERVER['PHP_SELF']==  "/{$_PAGE['dir']}index.php" ||  strstr($_SERVER['PHP_SELF'],".php")=== false))
	  { echo "<strong>".htmlspecialchars($_PAGE['pages'][$x])."</strong>";}
	  else if ($_SERVER['PHP_SELF'] != "/{$_PAGE['dir']}page{$y}.php") {
        echo "<a href=\"page{$y}.php\">".htmlspecialchars($_PAGE['pages'][$x])."</a>";
      } else echo "<strong>".htmlspecialchars($_PAGE['pages'][$x])."</strong>";
    ?></li><?php
  } ?> 
</div>

 
