
<script type="text/javascript">
  var pageName = "<?php echo $_UPGRADE['pagename']; ?>";
  var deviceName = "<?php echo $_UPGRADE['device']; ?>";
</script>

<p style="float:right; padding:10px; color:#000000;">
  Current Firmware version: <strong><?php echo $_UPGRADE['version']; ?></strong>
</p>

<div  style="position:absolute; left:300px;top:120px; color:#000000;">
<ol id="upgrade">
  <li>
    Select upgrade file
    <form action="<?php echo $_UPGRADE['pagename']; ?>?action=load" method="post" target="hiddentarget" enctype="multipart/form-data">
      <div><input type="file" name="fileinput" size="80" /></div>
    </form>
  </li>
  <li class="hidden">
    Load upgrade file to the <?php echo $_UPGRADE['device']; ?><br />
    <input type="submit" id="fileupload" value="Upload to <?php echo $_UPGRADE['device']; ?>" />
  </li>
  <li class="hidden">
    Verifying file
    <div id="checkresponse">&ndash;</div>
  </li>
  <li class="hidden">
    Upgrade<br />
    <input type="button" id="commitupgrade" value="Upgrade the <?php echo $_UPGRADE['device']; ?>" />
  </li>
  <li class="hidden">
    <div>
      <h4>Upgrading...</h4>
    </div>
    <div class="hidden">
      <h4>The firmware upgrade succeeded</h4>
      <p>
        The <?php echo $_UPGRADE['device']; ?> will be restarted automatically.
      </p>
    </div>
    <div class="hidden">
      <h4>The firmware upgrade failed</h4>
      <p>
        You may be able to find more information about why the process failed by viewing the
        <a href="<?php echo $_SERVER['PHP_SELF']; ?>?action=resultlog">output log</a>.
      </p>
    </div>
    <div class="hidden">
      <h4>The firmware upgrade timed out</h4>
      <p>
        The maximum execution time of 90 seconds was exceeded.
      </p>
    </div>
  </li>
</ol>
</div>
<!-- Server config: POST_MAX_SIZE = <?php echo ini_get('post_max_size'); ?>B, UPLOAD_MAX_FILESIZE = <?php echo ini_get('upload_max_filesize'); ?>B -->

<iframe id="hiddentarget" name="hiddentarget" src="#"></iframe>

