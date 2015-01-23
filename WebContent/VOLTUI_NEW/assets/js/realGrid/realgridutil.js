/* console 객체가 없는 경우 에러 방지 */
if (window.console == undefined) {
	console = { log: function () { } };
};



var isChrome = /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor);
var isFirefox = navigator.userAgent.toLowerCase().indexOf('firefox') > -1;

/* div tag를 flash object tag로 대체 */
function setupGrid(tagid, width, height, onload, params) {
    var flashvars = {
        id: tagid,
		hideLoader: true
    };

    if (params) {
        for (var p in params) {
            flashvars[p] = params[p];
        };
    };

    if (onload) {
        flashvars.onload = typeof (onload) === "function" ? onload.name : onload;
        console && console.log(flashvars);
    };

    var pars = {
        quality: "high",
        wmode: "opaque",
        allowscriptaccess: "sameDomain",
        allowfullscreen: "false"
    };
	
    if (isFirefox)
        pars.wmode = "direct";
		
    var attrs = {
        id: tagid,
        name: tagid,
        align: "middle"
    };

    /* SWFObject v2.2 <http://code.google.com/p/swfobject/> */
    /* by tsis-Technology */
    // var swfUrl = "objects/RealGridWeb.swf";
    var swfUrl = "assets/misc/realGrid/RealGridWeb.swf";
    if (location.href.indexOf("http://localhost") == 0) {
        swfUrl = swfUrl + "?" + new Date().getTime();
    }
    // swfobject.embedSWF(swfUrl, tagid, width, height, "11.1.0", "objects/expressInstall.swf", flashvars, pars, attrs);
    swfobject.embedSWF(swfUrl, tagid, width, height, "11.1.0", "assets/misc/realGrid/expressInstall.swf", flashvars, pars, attrs);
};

function setupTree(tagid, width, height, onload, params) {
    var flashvars = {
        id: tagid
    };

    if (params) {
        for (var p in params) {
            flashvars[p] = params[p];
        };
    };

    if (onload) {
        flashvars.onload = typeof (onload) === "function" ? onload.name : onload;
        console && console.log(flashvars);
    };

    var pars = {
        quality: "high",
        wmode: "opaque",
        allowscriptaccess: "sameDomain",
        allowfullscreen: "true"
    };

    if (isFirefox)
        pars.wmode = "direct";

    var attrs = {
        id: tagid,
        name: tagid,
        align: "middle"
    };

    /* used SWFObject v2.2 <http://code.google.com/p/swfobject/> */
    /* by tsis-Technology */
    // var swfUrl = "Objects/TreeGridWeb.swf";
    var swfUrl = "assets/misc/realGrid/TreeGridWeb.swf";
    // swfobject.embedSWF(swfUrl, tagid, width, height, "11.1.0", "objects/expressInstall.swf", flashvars, pars, attrs);
    swfobject.embedSWF(swfUrl, tagid, width, height, "11.1.0", "assets/misc/realGrid/expressInstall.swf", flashvars, pars, attrs);
};

