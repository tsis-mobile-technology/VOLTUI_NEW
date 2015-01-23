var nVer = navigator.appVersion;
var nAgt = navigator.userAgent;
var browserName = navigator.appName;
var fullVersion = '' + parseFloat(navigator.appVersion);
var majorVersion = parseInt(navigator.appVersion, 10);
var nameOffset, verOffset, ix;
//Opera에서는 버전 정보가 문자열 "Opera" 또는 "Version" 뒤에 따라 온다.
if ((verOffset = nAgt.indexOf("Opera")) != -1) {
browserName = "Opera";
fullVersion = nAgt.substring(verOffset + 6);
if ((verOffset = nAgt.indexOf("Version")) != -1)
fullVersion = nAgt.substring(verOffset + 8);
}
// IE에서는 userAgent 변수 안의 문자열 "MSIE" 뒤에 버전 정보가 따라온다.
else if ((verOffset = nAgt.indexOf("MSIE")) != -1) {
browserName = "Microsoft Internet Explorer";
fullVersion = nAgt.substring(verOffset + 5);
}
//Chrome에서는 문자열 "Chrome" 뒤에 버전 정보가 따라온다.
else if ((verOffset = nAgt.indexOf("Chrome")) != -1) {
browserName = "Chrome";
fullVersion = nAgt.substring(verOffset + 7);
}
//Safari에서는 문자열 "Safari" 또는 "Version" 뒤에 버전 정보가 따라온다.
else if ((verOffset = nAgt.indexOf("Safari")) != -1) {
browserName = "Safari";
fullVersion = nAgt.substring(verOffset + 7);
if ((verOffset = nAgt.indexOf("Version")) != -1)
fullVersion = nAgt.substring(verOffset + 8);
}
//Firefox에서는 문자열 "Firefox" 뒤에 버전 정보가 따라온다.
else if ((verOffset = nAgt.indexOf("Firefox")) != -1) {
browserName = "Firefox";
fullVersion = nAgt.substring(verOffset + 8);
}
// 다른 브라우저에서는 대부분 userAgent 변수 끝에 name/version 형식으로 반환된다.
else if ((nameOffset = nAgt.lastIndexOf(' ') + 1) < (verOffset = nAgt.lastIndexOf('/'))) {
browserName = nAgt.substring(nameOffset, verOffset);
fullVersion = nAgt.substring(verOffset + 1);
if (browserName.toLowerCase() == browserName.toUpperCase()) { browserName = navigator.appName; }
} 
 
// 풀버전 정보 확인하기
if ((ix = fullVersion.indexOf(";")) != -1)
fullVersion = fullVersion.substring(0, ix);
if ((ix = fullVersion.indexOf(" ")) != -1)
fullVersion = fullVersion.substring(0, ix);
majorVersion = parseInt('' + fullVersion, 10);
if (isNaN(majorVersion)) {
fullVersion = '' + parseFloat(navigator.appVersion);
majorVersion = parseInt(navigator.appVersion, 10);
}
/*document.write(''
+ 'Browser name = ' + browserName + '<br>'
+ 'Full version = ' + fullVersion + '<br>'
+ 'Major version = ' + majorVersion + '<br>'
+ 'navigator.appName = ' + navigator.appName + '<br>'
+ 'navigator.userAgent = ' + navigator.userAgent + '<br>'
)*/