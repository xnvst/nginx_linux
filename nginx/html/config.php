<?php /* **************************************************************
* Default locations used by the <PRODUCT_NAME> web interface
*
******************************************************************** */

$_PAGE['dir'] = "";

if (!isset($_ENV['PROD'])) $_ENV['PROD'] = "DEMOPROD";
$has_home_page ="false";
$support_real_time ="false";
$show_upgrade_control ="true";
$show_config_control ="false";

$_PAGE['outputdir']  = "output/";
$_PAGE['defaultcp']  = "{$_PAGE['outputdir']}default.cp";
$_PAGE['workingdir'] = "{$_PAGE['outputdir']}session/";
$_PAGE['commitdir']  = "{$_PAGE['outputdir']}commit/";
$_PAGE['downloaddir']  = "{$_PAGE['outputdir']}download/";
$_PAGE['verfile']    = "/etc/evertz/version";  

$_PAGE['workingspace'] = 1048576;  // Max 1MB for working configurations

 	 	$_PAGE['pages'] = array( "Home",
      "Network",
      "Notify",
 );


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


/* ******************************************************************
******** Do not cache this page ********************************** */
header("Expires: Mon, 26 Jul 1997 05:00:00 GMT");
header("Last-Modified: ".gmdate("D, d M Y H:i:s")." GMT");
header("Cache-Control: no-store, no-cache, must-revalidate");
header("Cache-Control: post-check=0, pre-check=0", false);
header("Pragma: no-cache");


ini_set('post_max_size', "20M");
ini_set('upload_max_filesize', "20M");


$_PAGE['working'] = "";
$_PAGE['modified'] = "No";
$_PAGE['filematch'] = "";
$_PAGE['version'] = "-";

$_PAGE['options'] = array_filter(explode("+", $_ENV['PROD']));
$_PAGE['product'] = $_PAGE['options'][0];

/* ********************************************************************
 * Create the working copy, as well as the comparison copy so we know
 * when the working copy has unsaved changes
 *
 */
function createWorking($source) {
  global $_PAGE;
   if(!is_dir('./output'))
  {  
    mkdir('./output', 0777)  or die("cannot open directory output");
	chmod('./output', 0777);
	fopen("./output/default.cp", 'rw') or die("cannot open file:./output/default.cp");
  }
  
  if(!is_dir('./output/download'))
  {
    mkdir('./output/download', 0777) or die("cannot open directory output/download");
	chmod('./output/download', 0777);
 }
 
  
   
  @copy($source, "./{$_PAGE['working']}") or die("Fail: Could not copy to save file Cfg");
  if ($fcomp = @fopen("./{$_PAGE['compare']}", "w")) {
    fwrite($fcomp, md5_file("./{$_PAGE['working']}"));
    fclose($fcomp);
  } else {
    unlink("./{$_PAGE['working']}");
    die("Fail: Could not write to compare file");
  }
}

if (isset($_COOKIE['passportuser'])) {

 if($show_config_control ==="true")
  {
  $_PAGE['working'] = "{$_PAGE['workingdir']}config-{$_COOKIE['passportuser']}.cp";
  $_PAGE['compare'] = "{$_PAGE['workingdir']}origin-{$_COOKIE['passportuser']}.cp";

 
  if (!file_exists("./{$_PAGE['working']}") || !file_exists("./{$_PAGE['compare']}")) {
  		createWorking("./{$_PAGE['defaultcp']}");
  }
  
  if (($md5 = md5_file("./{$_PAGE['working']}")) != @file_get_contents("./{$_PAGE['compare']}")) {
    $_PAGE['modified'] = "Yes";
  } else if ($md5 == md5_file("./{$_PAGE['defaultcp']}")) {
    $_PAGE['modified'] = "Default";
  }

 }

  if (is_file("{$_PAGE['verfile']}"))
    $_PAGE['version'] = file_get_contents("{$_PAGE['verfile']}");
}

 
   if (isset($_GET['modified'])) die($_PAGE['modified']);
?>
