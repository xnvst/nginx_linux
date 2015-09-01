<?php

require_once "config.php";

if (!isset($_PAGE['js'])) $_PAGE['js'] = array();
if (!isset($_PAGE['css'])) $_PAGE['css'] = array();
if (!isset($_PAGE['configlimit'])) $_PAGE['configlimit'] = "XXX";


if (!isset($_COOKIE['passportuser'])) {
  setcookie("passportuser", md5(microtime()), 0, "/{$_PAGE['dir']}");

  if ($_SERVER['PHP_SELF'] != "/{$_PAGE['dir']}index.php") {
    header("Location: /{$_PAGE['dir']}?login", 302);
    exit();
  }
} else {

  unset($_GET['login']);
  setcookie("passportuser", $_COOKIE['passportuser'], 0, "/{$_PAGE['dir']}");
}


if (!isset($_COOKIE['DynamicRT'])) {
  setcookie("DynamicRT", "disable");
} else {
  setcookie("DynamicRT", $_COOKIE['DynamicRT']);
}

if (!isset($_COOKIE['RealTime'])) {
  setcookie("RealTime", "yes");
} else {
  setcookie("RealTime", $_COOKIE['RealTime']);
}

if (!isset($_COOKIE['PanelProfile'])) {
  setcookie("PanelProfile", "no");
} else {
  setcookie("PanelProfile", $_COOKIE['PanelProfile']);
}

/* ********************************************************************
 * Intelligently scrub the working directory of files which are over
 * 7200 seconds (two hours) old.
 *
 */
clearstatcache();
$cfg = array();
$tsz = 0;

$wrk = @opendir($dir = "./{$_PAGE['workingdir']}") or die("Fail: Could not open working directory");

while (($file = readdir($wrk)) !== false) {
  if (preg_match("/config-([0-9a-f]{32})\.cp$/i", $file, $match) && is_file($full = $dir.$file)) {
    $tsz += ($size = filesize($full));
    $cfg[] = array(
      "file" => $full,
      "lastmod" => filemtime($full),
      "size" => $size,
      "hash" => "{$dir}origin-{$match[1]}.cp"
    );
  }
}
closedir($wrk);

usort($cfg, create_function('$a, $b', 'if ($a["lastmod"] == $b["lastmod"]) return 0; return $a["lastmod"] - $b["lastmod"];'));

$mtm = max(time(), $cfg[count($cfg) - 1]['lastmod']);

for ($x = 0; $x < count($cfg); $x++) {
  if ($cfg[$x]['hash'] != @$_COOKIE['passportuser']) {
    if ($tsz > $_PAGE['workingspace'] || $cfg[$x]['lastmod'] < $mtm - 7200) {
      unlink($cfg[$x]['file']);
      unlink($cfg[$x]['hash']);
      $tsz -= $cfg[$x]['size'];
    } else if ($cfg[$x]['lastmod'] > time()) {
      touch($cfg[$x]['file']);
      touch($cfg[$x]['hash']);
    }
  }
}




/* *************************************************************************************************
***** Begin Page HTML ******************************************************************************
************************************************************************************************* */
?><!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en" lang="en">
<head>
   <?php if($support_real_time =="true"){ ?>   
  <title><?php if ($_PAGE['modified'] == "Yes") echo "* "; ?>Evertz <?php echo $_PAGE['product']; ?> - <?php echo $_PAGE['title']; ?></title>
   <?php } else { ?>   
    <title> Evertz <?php echo $_PAGE['product']; ?> - <?php echo $_PAGE['title']; ?></title>
  <?php }  ?>   
	 
  <meta name="author" content="Evertz Microsystems Ltd. - Copyright &copy; <?php echo date("Y"); ?>" />
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8;" />
  <meta http-equiv="X-UA-Compatible" content="IE=7" />

  <link rel="stylesheet" type="text/css" href="css/web.css" /> 
  <link rel="stylesheet" type="text/css" href="css/lib.lightbox.css" /> 
  <link rel="stylesheet" type="text/css" href="css/passport.css" /> 
  <link rel="stylesheet" type="text/css" href="css/smoothness/jquery-ui-1.8.21.custom.css" /> 
  <link rel="stylesheet" type="text/css" href="css/features-with-jquery.css" /> 
  
  <!--[if lte IE 7]><link rel="stylesheet" type="text/css" href="css/passport.ie.css" /><![endif]--> 
  <!--[if IE 6]><link rel="stylesheet" type="text/css" href="css/passport.ie6.css" /><![endif]--><?php
  foreach ($_PAGE['css'] as $css) { ?> 
    <link rel="stylesheet" type="text/css" href="css/<?php echo $css; ?>" /><?php
    if (file_exists($iecss = "css/".str_replace(".css", ".ie.css", $css))) { ?> 
      <!--[if IE]><link rel="stylesheet" type="text/css" href="<?php echo $iecss; ?>" /><![endif]--><?php
    }
  } ?> 
  <link rel="top" href="/<?php echo $_PAGE['dir']; ?>" />

  <script type="text/javascript" src="js/lib.lightbox.js"></script>
  <script type="text/javascript" src="js/lib.ajax.js"></script>
  <script type="text/javascript" src="js/lib.position.js"></script>
  <script type="text/javascript" src="js/common.js"></script>
  <script type="text/javascript" src="js/jquery-1.7.2.min.js"></script>
  <script type="text/javascript" src="js/jquery-ui-1.8.21.custom.min.js"></script>
  <script type="text/javascript" src="js/slider-build-with-jquery.js"></script>
  <script type="text/javascript" src="js/afd-arc-constants.js"></script>
  <script type="text/javascript" src="js/features-with-jquery.js"></script>
  <script type="text/javascript" src="js/portamento.js"></script>	
  <?php
   
  foreach ($_PAGE['js'] as $js) { ?> 
    <script type="text/javascript" src="js/<?php echo $js; ?>"></script><?php
  } ?> 
  <script type="text/javascript" src="js/data.js.php?limit=<?php echo rawurlencode($_PAGE['configlimit']); ?>"></script>
   
</head>
<body id="<?php echo str_replace(".", "-", $_SERVER['HTTP_HOST']); ?>">
  <div id="outer">
    <div id="top">
      <div id="title">
        <h1><img src="img/web.evertz-logo.png" alt="Evertz Microsystems Ltd." /> <br/><div style="white-space: nowrap;"> &nbsp;&nbsp;<?php echo $_PAGE['product']; ?>&nbsp;-&nbsp;System Configuration</div></h1>
		
		 
		<div id="refreshRT">
         <input type="image" id="Refreshbutton" value="&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Refresh"  src="img/refresh_on.png"  onclick="refreshRT()"     >Refresh</input>
        </div>
		<div id="applyRT">
        	<input type="image" id="Applybutton" value="&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Apply" src="img/apply_on.png"  onclick="applyRT()"   > Apply </input>
        </div>
        <div id="dynamicRT">
        	<input type="image" id="RTbutton" value="&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Dynamic Apply" src="img/dynamic_on.png" onclick="toggleRtControls();"  >Dynamic Apply</input>
        </div>

      </div>
	  
	  <?php if($support_real_time =="true"){ ?>   
      <img src="img/icon.warning.png" id="modified" title="" alt=""<?php if ($_PAGE['modified'] != "Yes") echo ' style="display:none;"'; ?> />
	  <?php } ?> 
	  
      <div id="outputlink"><?php
         
		if($show_upgrade_control=="true"){
          if ($_SERVER['PHP_SELF'] != "/{$_PAGE['dir']}upgrade.php") { ?> 
            &nbsp; &nbsp; <a href="upgrade.php" title="Firmware Upgrade Area"><img src="img/cog_go.png" title="" alt="" /> Upgrade Firmware</a><?php
          }
		}
		if($show_config_control=="true"){
		
          if ($_SERVER['PHP_SELF'] != "/{$_PAGE['dir']}manage.php") { ?> 
             &nbsp; &nbsp; <a href="manage.php" id="ConfigManage" title="Configuration Management Area"><img src="img/config.png" title="" alt="" /> Configuration Management</a><?php
          } 
		}?> 
      </div>
       
    </div>
    <div id="content">
      <!-- ***** Content Area Begins ***** -->
