pUtils = 0;
function getUtilsObj() {
return pUtils ? pUtils : new utilsObject();
}
function utilsObject() {
if(!pBrowser) {
pBrowser = new WebBrowser();
}
this.browser = pBrowser;
if(this.browser.ie5up) {
this.inheritFrom = ie5UtilObj;
}
else if(this.browser.ie4) {
this.inheritFrom = ie4UtilObj;
}
else if(this.browser.nav4) {
this.inheritFrom = ns4UtilObj;
}
else {
this.inheritFrom = domUtilObj;
}
this.inheritFrom();
}
function domUtilObj() {
this.debug      = 0;
this.debugAlert = 0;
this.showDebug  = showDebug;
this.headArr = new Array();
this.spanArr = new Array();
this.headerAttr      = "name";           //Attribute by which to look for headers
this.convertHeaders  = false;            //Used to determine if the headers need to be converted into
this.ac              = ac;
this.acElem          = ac;       //Points to same function as this.ac
this.acHead          = acHead;
this.addHeader       = addHeader;
this.calculateOffset = calculateOffset;
this.charEntity2hex  = charEntity2hex;
this.cne             = cne;
this.convertObject   = 0;        //This is a null function pointer which is used by sub-classes
this.dec2hex         = dec2hex;
this.getArrEntry     = getArrEntry;
this.getContentElems = getContentElems;
this.getElem         = getElem;
this.getElemArr      = getElemArr;
this.getFormElem     = getFormElem;
this.getHeaders      = getHeaders;
this.getItem         = getItem;
this.getPagIdent     = function(e) {return e.id.slice(e.id.indexOf("-")+1);}
this.getTagElems     = getTagElems;
this.getWinName      = getWinName;
this.pne             = pne;
this.sameLine        = sameLine;
this.sameLineCite    = sameLineCite;
this.setValue        = setValue;
this.sc              = sc;
this.scColl          = scColl;
this.scElem          = sc;       //Points to same function as this.sc
this.sWinName        = this.getWinName();
this.calculateOffsetCite = calculateOffsetCite;
this.pBrowser = new WebBrowser();
}
function ac(sName)
{
eval("var pElem = " + this.sWinName + "document.getElementsByTagName(\"A\")");
if(ac.arguments.length == 0 ) {
return pElem;
}
return this.getItem(pElem, sName);
}
function acHead(num) {
if(!pNav.utils.headArr) {
pNav.utils.getHeaders(0);
}
if(num < pNav.utils.headArr.length) {
return pNav.utils.headArr[num];
}
alert("Index out of range on call to acHead.\nInput index: " + num + "\nArray length: " + this.headArr.length);
return null;
}
function calculateOffset(element, numLines)
{
var agt=navigator.userAgent.toLowerCase();
var browsebar = document.getElementById("browsebar");
var focusbar  = document.getElementById("focusbar");
var focusbarSS  = document.getElementById("focusbarSS");
var bbheight = 0;
var fbheight = 0;
if(this.debug) this.showDebug("Function calculateOffset reached\nelement: " + element + "\nnumLines: " + numLines);
if (element != null) {
var posy = 0;
var posh = (numLines==0)? 0:this.cne("lineheight").offsetHeight * numLines;
var posy = 0;
var par = element;
if (par.offsetParent) {
posy = par.offsetTop;
posy = par.offsetTop;
while (par = par.offsetParent) {
if(pBrowser.ie){
if(par.tagName == "DIV")
{
if((par.id == "")&&(par.className ==""))
{
continue;
}
}
}
posy += par.offsetTop;
}
}
if(posy == 0) {
var unused = element.offsetTop;
posy = element.offsetTop;
}
var margin = 20;
var paroff = this.getContentElems("bodystyle").offsetWidth;
if (element.parentNode && element.parentNode.nodeName.toUpperCase() == 'BLOCKQUOTE') {
margin = element.parentNode.offsetLeft;
paroff = element.parentNode.offsetWidth;
}
if (((element.offsetLeft-margin) + element.offsetWidth > paroff) &&
(element.offsetLeft-margin > element.offsetWidth) ) {
posy = posy+this.getContentElems("lineheight").offsetHeight;
}
if (posy > posh) {
posy -= posh;
}
if(agt.indexOf("msie") != -1) {
bbheight = browsebar.offsetHeight;
if(focusbar) {
fbheight = focusbar.clientHeight - 18;
}else if(focusbarSS) {
fbheight = focusbarSS.clientHeight - 18;
}
/* For LMO to calculate 'posy' ignore fbheight to fix the term navigation
issue in powernavigation */
var zone;
zone = document.getElementById("zone");
if(zone && zone.value=="noah") {
posy = posy - bbheight - 58;
}
else {
posy = posy - bbheight - fbheight - 58;
}
}
return posy;
}
else {
return 0;
}
}
function getArrEntry(pArr, sValue) {
for(var iSp=0;iSp<pArr.length;iSp++) {
if(pArr[iSp][0] == sValue.toUpperCase()) {
return pArr[iSp];
}
}
return null;
}
function getContentElems(sName)
{
eval("var pElem =  " + this.sWinName + "document.getElementsByName(sName);");
return pElem
}
function getFormElem(pElem) {
return pElem.form.elements[0];
}
function getElem(sElem, prefix)
{
if(getElem.arguments.length < 2 || prefix == "") {
prefix = "";
}
else if(prefix.charAt(prefix.length-1) != ".") {
prefix += ".";
}
var pElem =  eval(prefix + 'document.getElementById("' + sElem + '")' );
if(!pElem) {
pElem =  eval(prefix + 'document.getElementsByName("' + sElem + '")' );
return this.getItem(pElem, sElem);
}
return pElem;
}
function getTagElems(tag, sId)
{
eval("var elems = " + this.sWinName + "document.getElementsByTagName(tag);");
var elemColl = null;
var i = -1;
sId = (sId && sId != "") ? sId.toLowerCase() : null;
for (x=0; x < elems.length; x++) {
if ( !sId || (elems[x].id && (elems[x].id.toLowerCase() == sId)) ) {
if ( !elemColl ) {
elemColl = new Array();
}
i++;
elemColl[i] = elems[x];
}
}
return elemColl;
}
function getElemArr(sElem, prefix)
{
if(getElemArr.arguments.length < 2 || prefix == "") {
prefix = "";
}
var pElem =  eval(prefix + 'document.getElementsByName("' + sElem + '")' );
return pElem;
}
function getHeaders(bNew) {
if(this.debug) this.showDebug("Function getHeaders reached");
if(this.headArr.length && !bNew) return;
this.headArr.length = 0;
this.spanArr.length = 0;
var hc = this.sc();
for(var i=0;i<hc.length;i++) {
pE = hc.item(i);
this.addHeader(pE, "headerresult");
if(pE.tagName == "SPAN") {
var sName = pE.getAttribute(this.headerAttr);
if(sName) {
sName = sName.toUpperCase();
if(sName.charAt(0) == "S" ) {
var pArrElem = getArrEntry(this.spanArr, sName);
if(pArrElem) {
pArrElem[1]++;
}
else {
this.spanArr[this.spanArr.length] = [sName, 1];
}
}
}
}
}
}
function addHeader(pElem, sId) {
if(pElem.parentNode && pElem.parentNode.id == sId) {
this.headArr[this.headArr.length] = pElem.parentNode;
}
}
function getItem(pColl, sIdent)
{
var sIndent_lc = sIdent.toLowerCase();
var pE;
var ItemIdStr;
var ItemNameStr;
for(var x=0;x<pColl.length;x++) {
pE = pColl.item(x);
ItemIdStr   = pE.id;
ItemNameStr = pE.getAttribute("name");
if ( (ItemIdStr && ItemIdStr.toLowerCase() == sIndent_lc) ||
(ItemNameStr && ItemNameStr.toLowerCase() == sIndent_lc) ) {
return pE;
}
}
return null;
}
function getWinName() {
var loc = new String(self.location);
if ( (window.name != 'Content') && loc.search(/research\/retrieve\/frames\?/) > 0 ) {
return "Content.";
}
return "";
}
function pne(elem)
{
if(window.Content && window.Power_Navigation){
return this.getElem(elem, "Power_Navigation");
}else {
return this.getElem(elem, "");
}
}
function cne(elem)
{
return this.getElem(elem, this.sWinName);
}
function sameLine(elem,my){
if(this.debug) this.showDebug("Function sameLine reached");
var offsetValue = this.calculateOffset(elem,0);
var lineOffsetValue = this.cne("lineheight").offsetHeight;
var browsedoc= document.getElementById("docbody");
if(browsedoc){
offsetValue     = offsetValue - browsedoc.scrollTop ;
}
if ((my >= offsetValue) && (my - offsetValue <= lineOffsetValue)) {
return true;
}
return false;
}
function setValue(pElem, sVal)
{
if (pBrowser.nav7) {
pElem.value = sVal;
} else {
pElem.setAttribute("value", sVal);
}
}
function sc(sName)
{
eval("var pElem = " + this.sWinName + "document.getElementsByTagName(\"SPAN\")");
if(sc.arguments.length == 0 ) {
return pElem;
}
return this.getItem(pElem, sName);
}
function scColl(coll,num){
var pElem = this.getContentElems(coll);
if(scColl.arguments.length == 2 ) {
var nIdx = num < pElem.length ? num : 0;
return pElem.item(nIdx);
}
return pElem;
}
function dec2hex(dec){
dec = parseInt(dec);  // make sure dec is of type int
var hex = dec.toString(16);
if (hex.length == 1) {
hex = "0"+hex;
}
return hex;
}
function charEntity2hex(str) {
while ( (result = str.search(/&#([0-9][0-9]);/)) >=0 ){
str = str.substring(0,result) +  "%"+dec2hex(RegExp.$1) +
str.substring(result+5);
}
return unescape(str);
}
function showDebug(sOutput)
{
if(this.debugAlert) {
alert(sOutput);
}
else  {
status = sOutput;
var s;
for(var x=0;x<400000;x++) {
s += x;
}
}
}
function calculateOffsetCite(element, numLines) {
var agt=navigator.userAgent.toLowerCase();
var browsebar = document.getElementById("browsebar");
var focusbar  = document.getElementById("focusbar");
var focusbarSS  = document.getElementById("focusbarSS");
var bbheight = 0;
var fbheight = 0;
if (element != null) {
var posy = 0;
var posh = (numLines==0)? 0:this.cne("lineheight").offsetHeight * numLines;
var posy = 0;
var par = element;
if (par.offsetParent) {
posy = par.offsetTop;
while (par = par.offsetParent) {
posy += par.offsetTop;
}
}
if(posy == 0) {
var unused = element.offsetTop;
posy = element.offsetTop;
}
var margin = 20;
var paroff = this.getContentElems("bodystyle").offsetWidth;
if (element.parentNode && element.parentNode.nodeName.toUpperCase() == 'BLOCKQUOTE') {
margin = element.parentNode.offsetLeft;
paroff = element.parentNode.offsetWidth;
}
if (((element.offsetLeft-margin) + element.offsetWidth > paroff) &&
(element.offsetLeft-margin > element.offsetWidth) ) {
posy = posy+this.getContentElems("lineheight").offsetHeight;
}
if (posy > posh) {
posy -= posh;
}
return posy;
}
else {
return 0;
}
}
function sameLineCite(elem,my){
if(this.debug) this.showDebug("Function sameLine reached");
var offsetValue = this.calculateOffsetCite(elem,0);
var lineOffsetValue = this.cne("lineheight").offsetHeight;
var browsedoc= document.getElementById("docbody");
if(browsedoc){
offsetValue     = offsetValue - browsedoc.scrollTop ;
}
if ((my >= offsetValue) && (my - offsetValue <= lineOffsetValue)) {
return true;
}
return false;
}
