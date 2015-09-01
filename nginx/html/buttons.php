<?php

require "config.php";

if (!isset($_GET['by'])) $_GET['by'] = "";

?><!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en" lang="en">
<head>
  <title>Button Viewer</title>
  <meta http-equiv="Content-type" content="text/html; charset=UTF-8;" />

  <link rel="stylesheet" type="text/css" href="css/buttons.css" />
  <!--[if IE 6]><link rel="stylesheet" type="text/css" href="css/buttons.ie6.css" /><![endif]-->
</head>
<body onload="window.parent.document.getElementById('button_viewer').style.visibility='visible';"><?php

$_COMBO = array();
$_PARAM = array();
$_BUTTON = array();

$lines = file("./{$_PAGE['working']}");
foreach ($lines as $line) {
  if (preg_match("/^((button(\d+))+)\.([^=]+)=(.*)$/", $line, $m)) {
    switch ($m[4]) {
      case "name":
      case "group":
      case "default":
        $_BUTTON[(int)$m[3]][$m[4]] = str_replace("~", "\n", $m[5]);
        break;
      default:
        if (!isset($_COMBO[$m[1]])) {
          $_COMBO[$m[1]] = array($m[4] => $m[5]);
        } else $_COMBO[$m[1]][$m[4]] = $m[5];
        if (!isset($_PARAM[$m[4]])) {
          $_PARAM[$m[4]] = array($m[1] => $m[5]);
        } else $_PARAM[$m[4]][$m[1]] = $m[5];
    }
  }
}

switch ($_GET['by']) {
  case "param":
    uksort($_PARAM, "strnatcmp");
    foreach ($_PARAM as $param => $combo) { ?> 
      <h2><?php echo $param; ?></h2><?php
      foreach ($combo as $keys => $value) {
        $key = array_filter(explode("button", $keys)); ?> 
        <table cellspacing="1" border="0" class="comboButtons">
          <tr><?php
            foreach ($key as $k) { ?> 
              <td class="pressed" title="Button <?php echo $k; ?>"><div><?php
                echo nl2br(($_BUTTON[$k]['name']) ? $_BUTTON[$k]['name'] : "Button\n{$k}");
              ?></div></td><?php
            } ?> 
            <td class="value"><big>&rArr;</big> <?php echo $value; ?></td>
          </tr>
        </table><?php
      }
    }
    if (!count($_PARAM)) { ?> 
      <h2>No buttons defined</h2><?php
    }
    break;

  default:
    uksort($_COMBO, "strnatcmp");
    foreach($_COMBO as $keys => $combo) {
      $key = array_filter(explode("button", $keys)); ?> 
      <h2>Buttons: <?php echo implode(", ", $key); ?></h2>
      <table cellspacing="2" border="0" class="comboButtons"><?php
        if (min($key) <= 8) { ?> 
          <tr><?php
            for ($x = 1; $x <= 8; $x++) { ?> 
              <td<?php if (in_array($x, $key)) echo ' class="pressed"'; ?> title="Button <?php echo $x; ?>"><div><?php
                echo nl2br(($_BUTTON[$x]['name']) ? $_BUTTON[$x]['name'] : "Button\n{$x}");
              ?></div></td><?php 
              if ($x == 10) echo "\n    </tr><tr>";
            } ?> 
          </tr><?php
          if (max($key) > 8) { ?> 
            <tr class="buffer"><td colspan="10"></td></tr><?php
          }
        } ?> 
      </table>
      <table cellspacing="1" border="0" class="paramButtons"><?php
        foreach ($combo as $param => $value) { ?> 
          <tr>
            <th><?php echo $param; ?></th>
            <td><?php echo $value; ?></td>
          </tr><?php
        } ?> 
      </table><?php
    }
    if (!count($_COMBO)) { ?> 
      <h2>No buttons defined</h2><?php
    }
}

?></body>
</html>
