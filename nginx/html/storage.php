<?php

require "config.php";


isset($_COOKIE['passportuser']) or die("Fail: No user");


$pristine = @file("./{$_PAGE['defaultcp']}") or die("Fail: Could not read default configuration");

$_DEFAULT = array();
$_DEFAULT_PROFILE = array();
foreach ($pristine as $datum) {
  $datum = explode("=", $datum);
  if (count($datum) == 2) 
  { 
	$profileval = explode(";", $datum[1]);
	if (count($profileval) == 2)
	{
		$_DEFAULT[$datum[0]] = trim($profileval[0]);
		$_DEFAULT_PROFILE[$datum[0]] = trim($profileval[1]);
	}
	else if(count($profileval) == 1)
	{
		$_DEFAULT[$datum[0]] = trim($datum[1]);
		$_DEFAULT_PROFILE[$datum[0]] = 0;
	}
  }
}


$_CONFIG = array();
$_CONFIG_PROFILE = array();

$working = @file("./{$_PAGE['working']}") or die("Fail: Could not read working configuration");

foreach ($working as $datum) {
  if (count($datum = explode("=", $datum)) == 2) {
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
}

foreach ($_DEFAULT as $key => $value)
  if (!isset($_CONFIG[$key])) $_CONFIG[$key] = $value;

foreach ($_DEFAULT_PROFILE as $key => $value)
  if (!isset($_CONFIG_PROFILE[$key])) $_CONFIG_PROFILE[$key] = $value;


if ($_SERVER['REQUEST_METHOD'] == "POST") {
  foreach ($_POST as $key => $value) {
    $foo = str_replace("_", ".", $key);

    // Special cases for certain values
    switch ($foo) {
      case "pcrcp.password":
        if ($value = trim($value)) {
          $value = md5("abc123".$value);
        } else continue 2;
        break;
    }
    $profileval = explode(";", $value);
    $_CONFIG[$foo] = trim($profileval[0]);
    if (count($profileval) == 2)
    	$_CONFIG_PROFILE[$foo] = trim($profileval[1]);
  }

  ksort($_CONFIG);
  ksort($_CONFIG_PROFILE);


  // ***** Write the updated data back to the file
  $output = @fopen("./{$_PAGE['working']}.tmp", "w") or die("Fail: Could not write to working configuration");
  $data = array();
  foreach ($_CONFIG as $key => $value) {
    if (strpos($key, "button") !== 0 || $value != "[No Change]") {
    	if($_COOKIE['PanelProfile']==="yes")
      		$data[] = "$key=$value;$_CONFIG_PROFILE[$key]";
      	else
      		$data[] = "$key=$value";
    }
  }
  fwrite($output, implode("\n", $data));

  fclose($output);
  if (rename("./{$_PAGE['working']}.tmp", "./{$_PAGE['working']}"))
    unlink("./{$_PAGE['working']}.tmp");
    
}

?>
