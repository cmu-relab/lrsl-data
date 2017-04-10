var oGNSM =  new GlobalNavSubMenu();
var nGNSMTimer;
function showLinkMenu(sLinkID, queryStr, isFirstLink)
{
if(!isNaN(nGNSMTimer))
{
stopGNSMTimer();
}
oGNSM.createGNSMenu(sLinkID, queryStr, isFirstLink);
}
function startGNSMTimer()
{
nGNSMTimer = setTimeout("oGNSM.hideGNSMenu()", 600);
}
function stopGNSMTimer()
{
clearTimeout(nGNSMTimer);
}
function GlobalNavSubMenu()
{
this.oDiv = createGNSMDiv("mainLayer", "hideNode");
this.sLinkID = "";
this.bAppended = false;
this.oMenu;
this.oLinkList;
this.nTopPos;
this.nLeftPos;
this.createGNSMenu = createGNSMenu;
this.destroyGNSMenu = destroyGNSMenu;
this.createCustomIDMenu = createCustomIDMenu;
this.createGNSMDiv = createGNSMDiv;
this.createGNSMCell = createGNSMCell;
this.showGNSMenu = showGNSMenu;
this.hideGNSMenu = hideGNSMenu;
this.getGnsmUrl = getGnsmUrl;
}
function createGNSMenu(sLinkID, queryStr, isFirstLink)
{
var oLink, oTable;
oLink = $("#"+sLinkID);
if(this.sLinkID == sLinkID)
{
this.showGNSMenu(oLink);
}
else
{
this.destroyGNSMenu();
if(!this.bAppended)
{
$('#header').append(this.oDiv);
this.bAppended = true;
}
this.sLinkID = sLinkID
switch(this.sLinkID)
{
case "customID":
this.oMenu = new Array("Switch LexisNexis ID",
"Custom ID Manager");
var swUrl="/research/cid/switchid?"+queryStr;
var mgrUrl="/research/CIDSAccess?"+queryStr;
this.oLinkList = new Array(swUrl, mgrUrl);
oTable = this.createCustomIDMenu(isFirstLink);
break;
}
if(oTable)
{
$(this.oDiv).append(oTable);
this.showGNSMenu(oLink);
}
}
}
function destroyGNSMenu()
{
if(this.oDiv.hasChildren)
{
$(this.oDiv).remove(this.oDiv.firstChild);
}
}
function createCustomIDMenu(isFirstLink)
{
var oTable, oCell, sClass, isLink;
oTable = $('<ul id="menu"></ul>');
for(var x=0; x<this.oMenu.length; x++)
{
isLink = true
if(x==0 && !isFirstLink)
{
sClass = "smallsansInact";
isLink = false;
}
sClass = "smallsans"
isLink = true
if(x==0 && !isFirstLink)
{
sClass = "smallsansInact";
isLink = false;
}
oCell = createGNSMCell("Cell" + x, sClass, this.oMenu[x], isLink);
$(oTable).append(oCell);
}
return oTable;
}
function createGNSMDiv(sDivID, sClass)
{
var oDiv = $("<div id=\""+sDivID+ "\" class=\""+ sClass+"\" </div>");
$(oDiv).bind('mouseover',stopGNSMTimer);
$(oDiv).bind('mouseout',startGNSMTimer);
return oDiv;
}
function createGNSMCell(sCellID, sClass, sText, isLink)
{
var oCell = $("<li id=\""+sCellID +"\" class=\""+sClass +"\">" +sText +"</li>");
var test=   $("#isMultipleCid");
if(isLink){
if(sCellID=="Cell0"){
if(test.val()=="true"){
$(oCell).bind('click',function (event){
var oCaller = event.target;
var sURL = oGNSM.getGnsmUrl(oCaller);
window.location.href = sURL;
return; });
}
else{
var switchLink = $(oCell).removeClass("smallsans").addClass("null").css("cursor","auto");
switchLink.hover(function(){$(switchLink).css("color","#004B91");});
}
}
else{
$(oCell).bind('click',function (event){
var oCaller = event.target;
var sURL = oGNSM.getGnsmUrl(oCaller);
window.location.href = sURL;
return; });
}
}
return oCell
}
function hideGNSMenu()
{
$(this.oDiv).hide();
}
function showGNSMenu(oLink)
{
this.nTopPos = $('#'+this.sLinkID).position().top +15;
this.nLeftPos = $('#'+this.sLinkID).position().left - 20;
$(this.oDiv).css({"left":this.nLeftPos});
$(this.oDiv).css({"top":this.nTopPos});
$(this.oDiv).show();
}
function getGnsmUrl(oCurTag)
{
while(oCurTag.nodeName != "LI")
{
oCurTag = oCurTag.parentNode;
}
var callerID = oCurTag.id;
var x = parseInt(callerID.charAt(callerID.length-1));
return this.oLinkList[x];
}
