<?php /* **************************************************************
* Evertz DaVinci series standalone upgrade script
*
* This script is set up to be included in an already existing web
* interface template.  It includes ONLY the HTML required to display
* the upgrade interface and does NOT output a complete webpage on its
* own.  See the upgrade.template.php file for a bare minimum sample
* implementation
*
* Requirements:
*   HTTP server running PHP 4.3.0+
*
* File setup:
*   - upgrade.head.php     - included before any HTML output is sent
*   - upgrade.body.php     - included where the upgrade HTML should appear
*
*   - css/lib.lightbox.css - <link>'d as a stylesheet
*   - css/upgrade.css      - <link>'d as a stylesheet
*   - css/upgrade.ie.css   - Conditionally <link>'d as a stylesheet for IE
*
*   - js/lib.lightbox.js   - <script>'d as an external javascript
*   - js/lib.ajax.js       - <script>'d as an external javascript
*   - js/lib.position.js   - <script>'d as an external javascript
*   - js/upgrade.js        - <script>'d as an external javascript
*
*   - img/stdwin.bkg.jpg
*   - img/stdwin.header.png
*   - img/throbber.grey.small.gif
*
*
* Custom settings:
*   - "Set Upgrade script info" in this file (upgrade.head.php)
*
*/



$_UPGRADE = array(
  "device"     => $_PAGE['product'],      // Name of this device
  "pagename"   => "upgrade.php",          // Name of the upgrade page on this device
  "upgradelog" => "/tmp/upgrade-result",  // Path to firmware upgrade log file, created by this script
  "loghash"    => "",                     // Stores the hash retrieved from upgradelog
  "verfile"    => "/etc/evertz/version",  // Path to the script which returns the current firmware version
  "version"    => "",                     // Stores the version retrieved using "verfile"
  "tempdir"    => "/tmp/img/",            // Working directory to upload firmware files
  "checkimg"   => "checkimg",             // Shell script binary which verifies upgrade file
  "upgrade"    => "upgrade"               // Shell script binary which performs the upgrade
);







if(is_file("{$_UPGRADE['verfile']}")) //or die("Fail: Could not open version file:".$_UPGRADE['verfile']);
  $_UPGRADE['version'] = file_get_contents("{$_UPGRADE['verfile']}");
else
{
   $_UPGRADE['version'] = "Missing file '".$_UPGRADE['verfile']."'";
    ;
}

if( touch($_UPGRADE['upgradelog'])) // or die("Fail: Could not access result log");
  $_UPGRADE['loghash'] = md5_file($_UPGRADE['upgradelog']);
else
{
  $_UPGRADE['loghash'] = "Could not access result log".$_UPGRADE['upgradelog'];
  
}
 

if (isset($_GET['action'])) {
  switch ($_GET['action']) {

    // ***** Return the current firmware version **********************
    case "version":
      header("Content-type: text/plain");
      echo  $_UPGRADE['version'];
      break;


    // ***** Show the result log **************************************
    case "resultlog":
      header("Content-type: text/plain");
      readfile($_UPGRADE['upgradelog']);
      break;


    // ***** Return the upgrade log hash ******************************
    case "loghash":
      $log = fopen($_UPGRADE['upgradelog'], "r");
      $date = @fgets($log);
      $result = @fgets($log);
      fclose($log);

      header("Content-type: text/xml");
      echo "<?xml version=\"1.0\" encoding=\"UTF-8\" ?>\n";
      echo "<log>\n";
      echo "  <version>{$_UPGRADE['version']} </version>";
      echo "  <hash>{$_UPGRADE['loghash']} </hash>";
      echo "  <date>$date </date>";
      echo "  <result>$result </result>";
      echo "</log>\n";
      break;


    // ***** Upload an upgrade .img file and check it *****************
    case "load":
      $scrform = "<script type='text/javascript'>window.parent.checkResponse(%s, '%s', '%s')</script>";

      // Clear out the working directory if it exists
      if (is_dir($_UPGRADE['tempdir'])) {
        if ($dh = opendir($_UPGRADE['tempdir'])) {
          while (($file = readdir($dh)) !== false)
            if ($file != "." && $file != "..")
              @unlink($_UPGRADE['tempdir'].$file);
          closedir($dh);
        }

      // Create working directory if it doesn't exist
      } else mkdir($_UPGRADE['tempdir']);

      // Move the incoming file to the working directory
      isset($_FILES['fileinput']) or die(sprintf($scrform, 1, "Fail: File failed to upload", ""));
      rename($_FILES['fileinput']['tmp_name'], $_UPGRADE['tempdir'].$_FILES['fileinput']['name']) or die(sprintf($scrform, 1, "Fail: Could not move uploaded file", ""));


      $safename = escapeshellcmd($_FILES['fileinput']['name']);
      $version = exec("{$_UPGRADE['checkimg']} \"{$_UPGRADE['tempdir']}$safename\"", $x, $retval);


      // Run the upgradeResponse javascript on the parent page
      die(sprintf($scrform, $retval, addslashes($_FILES['fileinput']['name']), $version));
      break;


    // ***** Execute the shell command which initiates an upgrade *****
    case "execute":

      // Assume failure
      $result = "Failed";

      // Set a 90 second time limit
      set_time_limit(90);

      // Keep running if the remote client disconnects, because it may
      ignore_user_abort(true);

      // Start the output buffer
      ob_start();

      if (@$_GET['filename']) {
        $safename = escapeshellcmd($_GET['filename']);

        // Send the upgrade command to the shell
        echo "\nCommand: {$_UPGRADE['upgrade']} \"{$_UPGRADE['tempdir']}$safename\"\n";
        exec("{$_UPGRADE['upgrade']} \"{$_UPGRADE['tempdir']}$safename\"", $output, $retval);

        if ($retval) {

          // Upgrade failed.  Send the execution output to the results file
          echo "\nExecution log:\n".implode("\n", $output);

        } else $result = "Successful";
      } else echo "Fail: no filename given";

      $contents = ob_get_contents();
      ob_end_clean();


      // Write the output to the upgrade-results file
      if ($ot = fopen($_UPGRADE['upgradelog'], "w")) {
        fwrite($ot, date("r")."\n$result\n".$contents);
        fclose($ot);
      }

      // Delete the temporary file
      @unlink($_UPGRADE['tempdir'].$_GET['filename']);
      break;

  }

  exit();
}

?>
