<?php

chdir('..');
require "config.php";

header("Content-type: text/javascript");


/* ***** Magic Quotes Fix ****************************************** */
if (get_magic_quotes_gpc()) {
  $fsmq = create_function('&$mData, $fnSelf', 'if (is_array($mData)) foreach ($mData as $mKey=>$mValue) $fnSelf($mData[$mKey], $fnSelf); else $mData = stripslashes($mData);');
  $fsmq($_POST, $fsmq);
  $fsmq($_GET, $fsmq);
  $fsmq($_REQUEST, $fsmq);
  $fsmq($_ENV, $fsmq);
  $fsmq($_SERVER, $fsmq);
  $fsmq($_COOKIE, $fsmq);
}

set_magic_quotes_runtime(0);


if (isset($_COOKIE['passportuser'])) {

 if($show_config_control !="true") return;
 
  // ***** Load the existing data file
  $data = @file("./{$_PAGE['working']}") or die("alert('Could not load working file data!');");
  
  $_CONFIG = array();
  $_CONFIG_PROFILE = array();
  foreach ($data as $datum) {
  
    $datum = explode("=", $datum);
    if (count($datum) == 2) 
    { 
    	$profileval = explode(";", $datum[1]);
    	if (count($profileval) == 2)
    	{
    		$_CONFIG[$datum[0]] = trim($profileval[0]);
    		$_CONFIG_PROFILE[$datum[0]] = trim($profileval[1]);
    	}
    	else if(count($profileval) == 1)
    	{
    		$_CONFIG[$datum[0]] = trim($datum[1]);
    		$_CONFIG_PROFILE[$datum[0]] = 0;
    	}
    }
  } ?> 
  

  var configData = {<?php
    $output = array();
    foreach ($_CONFIG as $key => $value)
      if ($_GET['limit'] === "" || preg_match("/^{$_GET['limit']}/", $key))
        if ($key != "pcrcp.password")  // Do not display password in interface
        {
          $output[] = "\n'{$key}':\"{$value}\"";
        }

    echo implode(",", $output); ?> 
  };
  
  var configProfileData = {<?php
    $outputProfile = array();
    foreach ($_CONFIG_PROFILE as $key => $value)
      if ($_GET['limit'] === "" || preg_match("/^{$_GET['limit']}/", $key))
        if ($key != "pcrcp.password")  // Do not display password in interface
        {
          $outputProfile[] = "\n'{$key}':\"{$value}\"";
        }

    echo implode(",", $outputProfile); ?> 
  };<?php

} else echo "alert('No user!');";

?>

addListener('load', function() { 
showLightbox(false, ""); }
);
