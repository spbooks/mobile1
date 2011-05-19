<?php
  $lat = $_POST[ 'lat' ];
  $lng = $_POST[ 'lng' ];
  
  //$lat = "48.85955";
  //$lng = "2.34653";
  
  
  $url = "https://api.foursquare.com/v2/venues/search?ll=$lat,$lng&client_id=JTHNTGXROWPZVZ1MNNWJ411PIPDAOO3I4VTKC4TNXNDVALJ3&client_secret=WMX25UJBHEZMGDXKVZR2TTC3CKA2W3E4JC4HMVVZ3W321A4Q";
  
  $ch = curl_init($url);
  curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
  curl_setopt($ch, CURLOPT_BINARYTRANSFER, true);
  curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, FALSE);
  curl_setopt($ch, CURLOPT_HTTPHEADER, array('Host: api.foursquare.com'));
  $output = curl_exec($ch);
  curl_close($ch);
  
  echo $output;
?>