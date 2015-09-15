//var CLOG = /<key>LBChangelog<\/key>.*?<string>(.*?)<\/string>/gm;
var CLOG =  /<key>LBChangelog<\/key>\s+<string>(\s+)</gm;

var metas = document.getElementsByTagName('meta');
var i;
if (navigator.userAgent.match(/iPhone/i)) {
  for (i=0; i<metas.length; i++) {
    if (metas[i].name == "viewport") {
      metas[i].content = "width=device-width, minimum-scale=1.0, maximum-scale=1.0";
    }
  }
  document.addEventListener("gesturestart", gestureStart, false);
}
function gestureStart() {
  for (i=0; i<metas.length; i++) {
    if (metas[i].name == "viewport") {
      metas[i].content = "width=device-width, minimum-scale=0.25, maximum-scale=1.6";
    }
  }
}

var clicky_site_ids = clicky_site_ids || [];
clicky_site_ids.push(100756122);
(function() {
  var s = document.createElement('script');
  s.type = 'text/javascript';
  s.async = true;
  s.src = '//static.getclicky.com/js';
  ( document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0] ).appendChild( s );
})();

$(document).ready(function() {
  $('.slides').slideme({
	   arrows: false
	  ,autoslide: true
	  ,autoslideHoverStop: false
	  ,css3: true
	  ,interval: 1500
	  ,loop: true
	  ,speed: 250
	  ,transition:'fade'
    ,labels: {next: '→', prev: '←'}
  });
  
  var $cl = $('#changelog').first();
  if ($cl) {
    var url = "https://raw.githubusercontent.com/prenagha/launchbar/master/" + $cl.data("name") + ".lbaction/Contents/Info.plist";
    $.get(url, function(data) {
      var a = data.indexOf("<key>CFBundleVersion</key>");
      var b = data.indexOf("<string>", a);
      var c = data.indexOf("</string>", b);
      var ver = data.slice(b+8, c);
    
      var k = data.indexOf("<key>LBChangelog</key>");
      var u = data.indexOf("<string>", k);
      var e = data.indexOf("</string>", u);
      var c = data.slice(u+8, e).trim().replace(/[ \t]+/gm," ");
      $cl.html("Latest Version " + ver + "\nChanges\n" + c);
    });
  }
});
