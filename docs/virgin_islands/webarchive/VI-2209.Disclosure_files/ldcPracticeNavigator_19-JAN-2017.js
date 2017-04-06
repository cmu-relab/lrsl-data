var oMaximizeButton = new Image();
oMaximizeButton.src = "/ri/icon_maximize_red.gif";
oMaximizeButton.alt = "Maximize";
var oMinimizeButton = new Image();
oMinimizeButton.src = "/ri/icon_minimize_red.gif";
oMinimizeButton.alt = "Minimize";
var oExpandButton = new Image();
oExpandButton.src = "/ri/code_icon_expand_trans.gif";
oExpandButton.alt = "Show Section";
var oCollapseButton = new Image();
oCollapseButton.src = "/ri/code_icon_collapse_trans.gif";
oCollapseButton.alt = "Hide Section";
function practiceNavigator(sNodeID, sHelpURL)
{
if(sNodeID == "000")
{
openFormhelp(sHelpURL, 'formhelp', 350, 375, 1);
}
else
{
var oSrc = null;
var sClassName = "";
var oImg = document.getElementById("button"+sNodeID);
var oTable = document.getElementById("pracNav"+sNodeID);
if(oTable.className == "hideNode")
{
sClassName = "showNode";
oSrc = oCollapseButton;
if(sNodeID == "001")
{
oSrc = oMinimizeButton;
}
}
else
{
sClassName = "hideNode";
oSrc = oExpandButton;
if(sNodeID == "001")
{
oSrc = oMaximizeButton;
}
}
alterDisplay(oTable, sClassName, oImg, oSrc);
}
}
function opnPracNavigator(sNodeID)
{
oNode = document.getElementById("pracNav" + sNodeID);
oImg = document.getElementById("button" + sNodeID);
alterDisplay(oNode, "showNode", oImg, oMinimizeButton);
return true;
}
function ptTracking(urlObj)
{
ptUrl = urlObj.toString();
var xmlHttpReq;
var ajaxUrl = "/research/ptTracking";
var ln_qs;
ln_qs = ptUrl.substring((ptUrl.indexOf("?")), ptUrl.length);
ajaxUrl += ln_qs;
try {
if (window.XMLHttpRequest) { // Not IE
xmlHttpReq = new XMLHttpRequest();
} else if (window.ActiveXObject) { // IE
xmlHttpReq = getIEXMLReq();
}
}
catch (objException) {
return; // ajax failed
}
xmlHttpReq.open("GET",ajaxUrl, true);
xmlHttpReq.send(null);
}
