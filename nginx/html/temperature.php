<?php

$uptime = @file('/proc/uptime');
$uptime = explode(" ", $uptime[0]);
echo "$uptime[0]\n";

exec('/tcl/bin/tclsh8.4 /home/px/tm/tmp_v5', $output, $ret);

foreach ($output as $key => $value) {
  echo "$value\n";
}

echo exec('/tcl/bin/tclsh8.4 /home/px/tm/tmp06');

?>
