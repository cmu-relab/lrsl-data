var dfsPageLoaded = false;
var _javascriptError = false;
var isSafari=false;
var fpSetupPollInt;
if (navigator.userAgent.toLowerCase().indexOf("safari") != -1) {
isSafari=true;
}
window.onerror = javascriptErrorHandler;
function javascriptErrorHandler()
{
_javascriptError = true;
}
function appendURL(urlAdd)
{
var url = decodeURIComponent(window.location.href);
var appendURL = url.substring(0,url.indexOf("lexis.com/research",0)+18);
appendURL += urlAdd;
openFormhelp(appendURL,'formhelp',500,375,0);
return false;
}
function buildSelectAll(strInd,len)
{
for(var i=strInd;i<strInd+len;i++)
{
document.shepres.elements[i].checked=true;
}
}
function buildClearAll(strInd,len)
{
for(var i=strInd;i<strInd+len;i++)
{
document.shepres.elements[i].checked=false;
}
}
function isJavascriptError()
{
return (_javascriptError);
}
function goToFirstTopline()
{
var pElem = document.getElementsByName("TMB");
pElem[0].scrollIntoView(true);
}
function openPgSrchs(anchor)
{
href = anchor.href;
width = 350;
height = 375;
winname = "formhelp";
return openFormhelp(href, winname, width, height, 1);
}
function openInfo(anchor, selectObj, width, height, winname) {
href = anchor.href;
if (selectObj) {
href += "&" + "src=" + selectObj.options[selectObj.selectedIndex].value;
}
width = width ? width : 560;
height = height ? height : 335;
winname = winname ? winname : "globalhelp";
return openGlobal(href,winname,width,height,1);
}
function openFormhelp(pageToLoad,winName,width,height,center){
args=getArgs(width,height,center,0,0,0);
if ((parseInt(navigator.appVersion) >= 4 ) && (center)){
if(window.formhelp && !window.formhelp.closed){
formhelp.close();
}
}
formhelp=window.open(pageToLoad,winName,args);
return false;
}
function openGlobal(pageToLoad, winName, width, height, center){
yoffset = 0;
xoffset = 0;
if(winName == "globalsupport") {
yoffset = 90;
xoffset = 110;
}
args=getArgs(width,height,center,2, yoffset, xoffset);
if (winName == "globalhelp" && window.globalhelp && !window.globalhelp.closed) {
globalhelp.close();
}
if(winName == "globalsupport") {
if(window.globalsupport && !window.globalsupport.closed){
globalsupport.focus();
}
args += "location,status";
globalsupport=window.open(pageToLoad,winName,args);
}
else {
if(winName == "priceInfo") {
if(window.priceInfo && !window.priceInfo.closed){
priceInfo.focus();
}
priceInfo=window.open(pageToLoad,winName,args);
}
else {
if(window.globalhelp && !window.globalhelp.closed){
globalhelp.focus();
}
globalhelp=window.open(pageToLoad,winName,args);
}
}
return false;
}
function openFpSetup(pageToLoad, winName, width, height, center){
yoffset = 0;
xoffset = 0;
args=getArgs(width,height,center,2, yoffset, xoffset);
if(window.fpSetupWin && !window.fpSetupWin.closed) {
window.clearInterval(fpSetupPollInt);
window.fpSetupWin.close();
}
fpSetupWin = window.open(pageToLoad,winName,args);
fpSetupPollInt = 0;
fpSetupPollInt = setInterval("pollFpSetup()", 100);
fpSetupWin.focus();
}
function pollFpSetup() {
if(! window.fpSetupWin || window.fpSetupWin.closed) {
if (fpSetupPollInt) {
window.clearInterval(fpSetupPollInt);
fpSetupPollInt = 0;
} else {
return;
}
var xmlHttpReq;
try {
if (window.XMLHttpRequest) { // Not IE
xmlHttpReq = new XMLHttpRequest();
} else if (window.ActiveXObject) { // IE
xmlHttpReq = getIEXMLReq();
}
}
catch (objException) {
return false; // ajax failed.
}
xmlHttpReq.onreadystatechange = function() {
if (xmlHttpReq.readyState == 4) {
var oNode = xmlHttpReq.responseXML;
if ( (typeof oNode == "undefined")  || oNode == null) {
return false;
}else {
var oChildNodes = oNode.childNodes;
for(var x=0; x < oChildNodes.length; x++) {
if(oChildNodes[x].nodeName == "status") {
if(oChildNodes[x].firstChild.nodeValue == "true"){
var fpImage = document.getElementsByName("fpImage");
pFastPrint.bSetup = true;
fpImage[0].firstChild.src="/ri/delivery_fast_print.gif";
fpImage[0].firstChild.title="Fast Print - print current document";
/*if(window.addEventListner){
fpImage[0].addEventLinstner("onclick",
"pFastPrint.printFull(this.href);return false;");
if(fpImage.length == 2){
fpImage[1].addEventLinstner("onclick",
"pFastPrint.printFull(this.href);return false;");
}
}else if(window.attachEvent){
fpImage[0].attachEvent("onclick",
"pFastPrint.printFull(this.href);return false;");
if(fpImage.length == 2){
fpImage[1].attachEvent("onclick",
"pFastPrint.printFull(this.href);return false;");
}
}*/
}
}
}
}
}
}
var qs = document.location.search;
xmlHttpReq.open("GET", "/research/getfpstatus"+qs, true);
xmlHttpReq.send(null);
}
}
function openAttachmentFrame(pageToLoad, winName, width, height)
{
xposition=0; yposition=0;
args = "width=" + width + "," + "height=" + height + ","
+ "location=0," + "menubar=1," + "resizable=1," + "scrollbars=1,"
+ "status=0," + "titlebar=0," + "toolbar=0," + "hotkeys=0,"
+ "screenx=" + xposition + ","  //NN Only
+ "screeny=" + yposition + ","  //NN Only
+ "left=" + xposition + ","     //IE Only
+ "top=" + yposition;           //IE Only
ImageWindow=window.open(pageToLoad,winName,args);
return false;
}
function openAttachmentFrameWithToolbar(pageToLoad, winName, width, height)
{
xposition=0; yposition=0;
args = "width=" + width + "," + "height=" + height + ","
+ "location=0," + "menubar=1," + "resizable=1," + "scrollbars=1,"
+ "status=0," + "titlebar=0," + "toolbar=1," + "hotkeys=0,"
+ "screenx=" + xposition + ","  //NN Only
+ "screeny=" + yposition + ","  //NN Only
+ "left=" + xposition + ","     //IE Only
+ "top=" + yposition;           //IE Only
if (winName == "dppaHelp")
{
if(window.dppaHelp && !window.dppaHelp.closed)
{
dppaHelp.close();
}
}
else if (winName == "glbaHelp")
{
if(window.glbaHelp && !window.glbaHelp.closed)
{
glbaHelp.close();
}
}
ImageWindow=window.open(pageToLoad,winName,args);
return false;
}
function getWf(loc,uri) {
var args = new Object();
var query = '';
if (loc == '')
query = location.search.substring(1);
else if (loc == "window")
query = window.location.search.substring(1);
else if (loc == "uri")
query = uri.substring(uri.indexOf('?')+1);
else
query = Content.location.search.substring(1);
var pairs = query.split("&");
for (var i = 0; i < pairs.length; i++) {
var pos = pairs[i].indexOf('=');
if (pos == -1)
continue;
var argname = pairs[i].substring(0,pos);
var value = pairs[i].substring(pos+1);
args[argname] = unescape(value);
}
return args;
}
function getArgs(width,height,center,menu,yoffset,xoffset){
xposition=0; yposition=0;
if ((parseInt(navigator.appVersion) >= 4 ) && (center)){
if (menu==0){
xposition = (screen.width - width) - 10;
yposition = (screen.height - height) - 58;
}
else if(menu==1){
xposition = (screen.width - width) / 2;
yposition = ((screen.height - height) / 2) - 67;
}
else if(menu==2){
xposition = (screen.width - width) / 2;
yposition = ((screen.height - height) / 2) - 67;
menu = 0;
}
xposition += xoffset;
yposition += yoffset;
}
if (navigator.appName == 'Netscape'){
width = width + 25;
height = height + 25;
}
args="width="+width+",height="+height
+",toolbar="+menu+",menubar="+menu
+",screenx="+ xposition+",screeny="+yposition
+",left="+xposition+",top="+yposition
+",resizable=1,scrollbars=1,";
return args;
}
/*{!--
getSegVal() - gets the segment value from the segments.sniglet droplist.
--!}*/
function getSegClause(theForm, needConnector) {
var seg=theForm.S1;
var lenseg=seg.options.length;
var iseg;
var valseg;
var returnStr = '';
if (seg.options[0].selected==true &&
theForm.seg1Terms.value != '') {
alert ("Select a valid Segment.");
return (returnStr);
}
for (iseg=0; iseg<lenseg; iseg++)  {
if (seg.options[iseg].selected == true)
valseg=seg.options[iseg].value;
}
if (valseg == '-999')  {
alert("You must first select a source.");
return (returnStr);
}
if (theForm.seg1Terms.value == '')  {
alert("You have not entered any terms for your segment.")
return (returnStr);
}
if (needConnector) {
returnStr += ' and ';
}
returnStr += valseg + " (" + theForm.seg1Terms.value + ")";
return (returnStr);
}
/*{!--
addSegmentsNew() is used in segment.sniglet and use by the pages
bool and ssaBool
--!}*/
function addSegmentsNew(theForm, theTextArea) {
var needConnector = false;
if (theTextArea.value != '') {
needConnector = true;
}
var segmentClause = getSegClause(theForm, needConnector);
if (segmentClause == '') {
return false;
}
theTextArea.value += segmentClause;
theForm.seg1Terms.value = '';
theTextArea.focus();
return (true);
}
/*{!--
addSegmentsFakeDiv() is used in segment.sniglet and use by the pages
bool and ssaBool
--!}*/
function addSegmentsFakeDiv(theForm) {
var fakeOuterDiv = pUtils.getElem("FakeOuterDiv", prefix);
if (fakeOuterDiv) {
if (fakeOuterDiv.style.display == 'none') {
return addSegmentsNew(theForm, theForm._search);
}
else if (navigator.appName == 'Netscape') {
fakeDivClickHandler();
return addSegmentsNew(theForm, theForm._search);
}
else {
var fakeInnerDiv = pUtils.getElem("FakeInnerDiv", prefix);
var needConnector = false;
if (fakeInnerDiv.innerText != '') {
needConnector = true;
}
var segmentClause = getSegClause(theForm, needConnector);
if (segmentClause == '') {
return false;
}
fakeInnerDiv.innerText += segmentClause;
theForm.seg1Terms.value = '';
fakeInnerDiv.focus();
return (true);
}
}
else {
return false;
}
}
/*{!--
This  is used in Segment.sniglet and use by the pages
bool, free, ssaBool and ssaFree
--!}*/
function tefDelimiterNew(theForm, delimiter) {
if (theForm._search.value != '') {
return delimiter;
}
return '';
}
/*{!--
This function is used in Segment.sniglet and use by the pages
bool, free, ssaBool and ssaFree
--!}*/
function checkFieldLength(form, elem, maxLength) {
if ((document.forms[form].elements[elem]) &&
(document.forms[form].elements[elem].value.length > maxLength)) {
var msg = 'Search terms cannot exceed ' + maxLength + ' characters';
alert(msg);
return(false);
}
return(true);
}
function getCurrentYear(today){
var dateString = today.toString();
var dateLength = dateString.length;
var retYear = '';
retYear = dateString.substring(dateLength-4, dateLength);
return (retYear);
}
function validatorAllCiteRes(theForm){
var dateval = theForm.yearRes.value;
var datefrom = theForm.dateFrom.value;
var dateto = theForm.dateTo.value;
var focusText = theForm.T1.value;
focusText = focusText.replace(/[\u201C\u201D]+/g, "\"");
focusText = focusText.replace(/[\u2018\u2019]+/g, "\'");
theForm.T1.value = focusText;
today = new Date();
var currentYear = 2005;
if (isSafari) {
currentYear = today.getFullYear();
} else {
currentYear = getCurrentYear(today);
}
if (document.shepres.dateType[0].checked){
theForm.dateFrom.value = "";
theForm.dateTo.value = "";
}
if (document.shepres.dateType[1].checked){
theForm.dateRelative.selectedIndex = 0;
theForm.yearRes.value = "";
}
if (document.shepres.dateType[1].checked){
if (datefrom == ""){
alert("Please enter a valid beginning year in the From field.");
theForm.dateFrom.focus();
return(false);
}
if (dateto == ""){
alert("Please enter a valid ending year in the To field.");
theForm.dateTo.focus();
return(false);
}
}
if (theForm.dateRelative.selectedIndex > 0 && dateval == ""){
alert ("Please enter a valid date in the Year field.");
theForm.yearRes.focus();
return (false);
}
if (document.shepres.dateType[0].checked &&
(theForm.dateRelative.selectedIndex == 0 && dateval != "")){
alert ("Select Date Restrictions, then enter a valid date in the Year field.");
theForm.yearRes.value = "";
return (false);
}
if (dateval.length > 0 && dateval.length < 4){
alert("Please enter a valid 4-digit date in the Year field.");
theForm.yearRes.focus();
return (false);
}
if (datefrom.length > 0 && datefrom.length < 4){
alert("Please enter a valid 4-digit year in the From field.");
theForm.dateFrom.focus();
return (false);
}
if (dateto.length > 0 && dateto.length < 4){
alert("Please enter a valid 4-digit year in the To field.");
theForm.dateTo.focus();
return (false);
}
if (dateval.length > 0){
for (var i=0; i!=dateval.length; i++){
aChar = dateval.substring(i,i+1);
if (aChar < "0" || aChar > "9"){
alert ("Characters in the Year field must be numerical.");
theForm.yearRes.focus();
return (false);
}
}
aChar = dateval.substring(0,1);
if (aChar < "1"){
alert ("Please enter a valid date in the Year field (year cannot begin with Zero).");
theForm.yearRes.focus();
return (false);
}
if (dateval > currentYear){
alert ("Please enter a valid date in the Year field (year cannot be greater than current year).");
theForm.yearRes.focus();
return (false);
}
}
if (datefrom.length > 0){
for (var i=0; i!=datefrom.length; i++){
aChar = datefrom.substring(i,i+1);
if (aChar < "0" || aChar > "9"){
alert ("Characters in the From field must be numerical.");
theForm.dateFrom.focus();
return (false);
}
}
aChar = datefrom.substring(0,1);
if (aChar < "1"){
alert ("Please enter a valid year in the From field (year cannot start with Zero).");
theForm.dateFrom.focus();
return (false);
}
if (datefrom > currentYear){
alert ("Please enter a valid year in the From field (year cannot be greater than the current year).");
theForm.dateFrom.focus();
return (false);
}
}
if (dateto.length > 0){
for (var i=0; i!=dateto.length; i++){
aChar = dateto.substring(i,i+1);
if (aChar < "0" || aChar > "9"){
alert ("Characters in the To field must be numerical.");
theForm.dateTo.focus();
return (false);
}
}
aChar = dateto.substring(0,1);
if (aChar < "1"){
alert ("Please enter a valid year in the To field (year cannot start with Zero).");
theForm.dateTo.focus();
return (false);
}
if (dateto > currentYear){
alert ("Please enter a valid year in the To field (year cannot be greater than the current year).");
theForm.dateTo.focus();
return (false);
}
}
if (document.shepres.dateType[1].checked && dateto < datefrom){
alert ("Please enter a valid year in the To field (value must be greater than the From field).");
theForm.dateTo.focus();
return (false);
}
return (true);
}
function IE3Focus(){
var agt=navigator.userAgent.toLowerCase();
this.major   = parseInt(navigator.appVersion);
this.ie      = (agt.indexOf("msie") != -1);
this.ie3     = (this.ie  && (this.major < 4));
if (!this.ie3){
self.focus();
}
}
function refreshNew(url) {
with(this.document.location) {
var replaceUrl = protocol+'//'+host+url;
this.parent.document.location.replace(replaceUrl);
}
return true;
}
function validatorNew(theForm,left, middle, right)
{
var preAmble = (left) ? 'Please enter a value for the "':'';
var postAmble = (right) ? '" field.':'';
var dquote ='"';
if(theForm.value=="")
{
if(middle !="")
alert(preAmble + middle + postAmble);
theForm.focus();
return(false);
}
return(true);
}
function validatorAuth(theForm)
{
if (theForm.USER_ID.value == ""){
alert("Please enter a value for the \"LexisNexis ID\" field.");
theForm.USER_ID.focus();
return (false);
}
theForm.JS.value='1';
theForm.submit();
return (true);
}
function isMacIE(){
if ((navigator.platform.indexOf('Mac') > -1) &&
(navigator.appName.indexOf('Microsoft') > -1))
return true;
else    return false;
}
var ssaElementClicked;
function ssaClickHandler(theField) {
ssaElementClicked = theField;
}
function ssaValidateForm(theForm) {
ssa_name = ssaElementClicked ? ssaElementClicked.name : "";
if ((ssa_name == "Search") || (ssa_name == "") || (ssa_name == "searchButton")) {
if (theForm._src.value == "") {
var jurSelect = document.getElementById("jurisdiction");
var jurSelectedValue = jurSelect.options[jurSelect.selectedIndex].value;
if (jurSelectedValue == "") {
alert("You must select a Jurisdiction and at least one Source to proceed.");
theForm.jurisdiction.focus();
return false;
} else {
alert("You must select at least one Source to proceed.");
theForm.SelectSources.focus();
return false;
}
} else {
return checkFieldLength(theForm.name, "_search", 999);
}
} // if ssa_name
}
function raValidateJuris(theForm) {
var cancelForm = ((document.cancelMe) && document.cancelMe==1)? true:false;
if((!cancelForm) &&
(theForm._src.length > 1) &&
((theForm._src.value == "") || (theForm._src.selectedIndex==0))) {
alert("Please select a jurisdiction from the Select Jurisdiction " +
"dropdown list.");
theForm._src.focus();
document.cancelMe=0;
return false;
} else {
document.cancelMe=0;
return true;
}
}
function verifyButtonSelection(theForm) {
if( typeof(theForm.rbGenericGroup1.length) == "undefined"){
if(theForm.rbGenericGroup1.checked){
return(true);
}
alert("Please select a radio button for the jurisdiction.");
return(false);
}
else {
for(nIdx=0;nIdx<theForm.rbGenericGroup1.length;nIdx++)
{
if(theForm.rbGenericGroup1[nIdx].checked) {
return (true);
}
}
alert("Please select a radio button for the jurisdiction.");
return(false);
}
}
function verifyNextOptButtonSelection(theForm) {
if( typeof(theForm.nextOption.length) == "undefined"){
if(theForm.nextOption.checked){
return(true);
}
alert("Please select a radio button for the action you wish to perform.");
return(false);
}
else {
for(nIdx=0;nIdx<theForm.nextOption.length;nIdx++)
{
if(theForm.nextOption[nIdx].checked) {
return (true);
}
}
alert("Please select a radio button for the action you wish to perform.");
return(false);
}
}
function verifyWIDButtonSelection(theForm) {
if( typeof(theForm.wid.length) == "undefined"){
if(theForm.wid.checked){
return(true);
}
alert("Please select a radio button for the LexisNexis ID you wish to use.");
return(false);
}
else {
for(nIdx=0;nIdx<theForm.wid.length;nIdx++)
{
if(theForm.wid[nIdx].checked) {
return (true);
}
}
alert("Please select a radio button for the LexisNexis ID you wish to use.");
return(false);
}
}
function validatorCFA(theForm, pq, sq)
{
var len = theForm.elements.length;
var i;
var j=0;
var strg=["",""];
var element;
var preAmble = 'Please enter a value for the ';
var postAmble = ' field.';
var middle;
var alertflag=0;
var searchStr = "&searchStr=";
for(i=0; i<len; i++)
{
element=theForm.elements[i];
if (element.type == "text"){
strg[j]+=element.value;
j++;
}
}
len = j-1;
if ( (len==0) && ((pq == 0) || (sq == 0)) )
{
if (strg[0] == '' )
{
middle='"citation"';
alertflag=1;
}
}
if ( (len==1) && ((pq == 0) || (sq == 0)) )
{
if ((strg[0] == '') && (pq == 0))
{
middle = '"first citation"';
alertflag=1;
}
if (strg[1] == '' && sq == 0)
{
if ( alertflag == 1)
middle += ' and the "second citation"';
else
middle = '"second citation"';
alertflag=1;
}
}
if (alertflag == 1)
{
alert( preAmble + middle + postAmble );
return(false);
}
if(theForm.name == "ezshepalert")
{
if(theForm.cfaPrefix != null)
{
searchStr += theForm.cfaPrefix.value;
searchStr += " ";
}
if(theForm.cfaRptrFmt != null)
{
searchStr += theForm.cfaRptrFmt.value;
searchStr += " ";
}
if(theForm.cfaSuffix != null)
{
searchStr += theForm.cfaSuffix.value;
}
theForm.action += searchStr;
}
return(true);
}
function validatorSemanticLen(textarea)
{
var semInput = textarea.value;
if (semInput.length > 32000) {
alert("Semantic Search Input cannot exceed 32000 characters.");
textarea.focus();
return(false);
} else if (semInput.length > 5000) {
var overFiveKMsg = "\nPlease consider reducing the number of concepts or characters in your search to return optimal results.\n";
if (confirm(overFiveKMsg)) {
return true;
} else {
return false;
}
} else {
return(true);
}
}
function validatorLen(theForm)
{
var focusTerms = theForm.value;
if(focusTerms.length > 1000)
{
alert("Search Information in \"FOCUS Terms \" field too long");
theForm.focus();
return(false);
}
return(true);
}
function validatePartyname(theForm)
{
var text1 = theForm.party1name.value;
var text2 = theForm.party2name.value;
if(text1=="")
{
if(text2=="")
{
alert("Please enter at least one party name before running your search");
}
else
{
alert("If entering only one party name, please use the first box");
}
return(false);
}
return(true);
}
function validatorMLT(theForm)
{
var nav4 = window.Event ? true:false;
var formHandler = document.mlt;
var manStr = formHandler._manterms.value;
if(manStr.length > 400)
{
alert ('Your request failed because too much text was entered in the Mandatory Terms input box.\n(The limit is 400 characters; you selected ' + manStr.length + ' characters.)\nTry again by entering fewer mandatory terms and clicking the\n"Search" button appearing at bottom of your form.');
return(false);
}
return(true);
}
function validatorLynx(theForm)
{
var len = theForm.elements.length;
var i;
var result="";
var strg="";
var element;
for(i=0; i<len; i++)
{
element=theForm.elements[i];
if (element.type != "hidden"){
if (element.type !="select-multiple")
{
result+= i+ " "+element.value+"\n";
strg+=element.value;
}
else
{
result+=i+element.name;
list = element;
var j ;
for (j = 0; j < list.length; j++)
{
if(list[j].selected){
result+=" "+j+" "+list[j].value;
strg+=list[j].value;
}
}
result+="\n";
}
}
}
len = strg.length;
i=0;
while(strg.charAt(i++) == ' ' && i < len);
if ( i >= len)
{
alert("At least one field must be filled");
return(false);
}
return(true);
}
var anssetArray = new Array();
var anssetArrayInitialized = 0;
var noInit = 0;
var netscapeVer3 = 0;
var ieVer3 = 0;
var format = "";
var sdoc = "";
var loc = "";
var curDoc="";
var pUtils=null;
var prefix="";
var args = getWf(loc);
var countOfSelDocs = 0;
var divNumber;
var isCaseFile = false;
if (args._fmtstr)
format = args._fmtstr;
if (args._startdoc)
sdoc = (args.newStartDoc)? args.newStartDoc:args._startdoc;
if (args.docnum)
curDoc = args.docnum;
if (sdoc == "")
sdoc = "1";
if ((curDoc =="") && (args.docNo))
curDoc = args.docNo;
if (curDoc =="")
curDoc="1";
if ((parseInt(navigator.appVersion) < 4) &&
(navigator.appName.indexOf("Microsoft Internet Explorer") != -1)) {
ieVer3 = 1;
}
if ( (parseInt(navigator.appVersion) < 4) &&
(navigator.appName.indexOf("Netscape") != -1)) {
netscapeVer3 = 1;
}
function tagStateContains(docNum) {
if ( !anssetArrayInitialized ) {
return false;
}
noInit = 1;
var index = parseInt( docNum );
return anssetArray[ index - 1 ];
}
function changeFocBuddy(chkBox) {
var searchWithinIndex = 0;
try {
setUtils();
}
catch(e) {
}
if (pUtils) {
var pE = pUtils.getElem("focBudSel", prefix);
if (pE) {
var indexOfSelDocs = (pE.length == 3) ? 2:1 ;
if ( chkBox.checked) {
countOfSelDocs = countOfSelDocs + 1;
pE.selectedIndex = indexOfSelDocs;
}
else { // Verify if there are still any selected documents
countOfSelDocs = countOfSelDocs - 1;
var totalDocsSel = (document.citeForm.numDocsChked.value.length) ? parseInt(document.citeForm.numDocsChked.value):0;
totalDocsSel = totalDocsSel+countOfSelDocs;
if ( totalDocsSel > 0 ) {
pE.selectedIndex = indexOfSelDocs;
}
else {
searchWithinIndex = (pE.length == 2) ? 0:document.citeForm.prefFBSel.value;
pE.selectedIndex = searchWithinIndex;
}
}
}
}
}
function initializeArray() {
if ( noInit ) {
return;
}
if (ieVer3 || netscapeVer3) {
return;
}
if(document.citeForm){
resetArray(document.citeForm.totaldocs.value);
loadArray(document.citeForm.taggedDocs.value);
}else {
resetArray(document.caseFileForm.totaldocs.value);
loadArray(document.caseFileForm.taggedDocs.value);
}
tagArrayBoxes();
noInit = 1;
}
function resetArray(arraySize) {
var remainder = 0, size = 0;
var setsize = 4;
var gs = (window.name=="Content")? parent.Content.ln_browse:window.ln_browse;
if (ieVer3 || netscapeVer3){
return;
}
size = parseInt(arraySize);
size = ((size + 3) & ~3);
/* remainder = size % setsize;
if (remainder != 0) {
size += setsize - remainder;
}*/
for (var i=0; i < size; i++) {
anssetArray[i] = 0;
}
}
function tagArrayBoxes() {
if (ieVer3 || netscapeVer3) {
return;
}
if(document.citeForm){
var gs = (window.name=="Content")? parent.Content.ln_browse:window.ln_browse;
if ((format== "FULL" || format == "VKWIC" ||format == "SKWIC" || format =="CUSTOM" || format == "BRIEF")&&  (gs.svc != "sh") &&  (gs.svc != "toa"))
{
setThisPageTagged(curDoc);
}
else if(gs.shepBPon == 1 && ((gs.svc == "sh") || (gs.svc == "toa")))
{
setThisPageTagged(gs.firstCite);
}
else
{
setThisPageTagged(sdoc);
}
}else{
setThisPageTagged(sdoc);
}
}
function loadArray(tDocs) {
if (ieVer3 || netscapeVer3) {
return;
}
var i, j = 0;
var commaPos;
var consecutiveNums;
var hexChar;
var hexVal;
var mask;
var docsChked = 0;
for (i=0; i < tDocs.length; i++) {
hexChar = tDocs.charAt(i);
if (hexChar == "Z") {
commaPos =  tDocs.indexOf(":", i) - i;
if (commaPos < 0) {
commaPos = 0;
}
consecutiveNums = parseInt(tDocs.substring(i + 1, i + commaPos))*4;
for (var k = 0; k < consecutiveNums; k++) {
anssetArray[j++] = 0;
}
i += commaPos;
}
else if (hexChar !="F")
{
hexVal = parseInt("0x"+hexChar);
mask = 8;
for (k =0 ; k < 4; k++)
{
anssetArray[j++] = (hexVal & mask) ? 1:0;
docsChked = (hexVal & mask) ? docsChked + 1:docsChked;
mask = mask >> 1;
}
}
else if (hexChar == "F")  {
commaPos =  tDocs.indexOf(":", i) - i;
if (commaPos < 0)  {
commaPos = 0;
}
consecutiveNums = parseInt(tDocs.substring(i + 1, i + commaPos))*4;
for (var k = 0; k < consecutiveNums; k++)  {
anssetArray[j++] = 1;
docsChked = docsChked + 1;
}
i += commaPos;
}
}
anssetArrayInitialized = 1;
if(document.citeForm){
document.citeForm.numDocsChked.value = docsChked;
}else{
document.caseFileForm.numDocsChked.value = docsChked;
}
}
function setThisPageTagged(sdoc)  {
var j =  parseInt(sdoc) - 1;
if(document.citeForm){
for (var i=0; i < document.citeForm.elements.length; i++)  {
if (document.citeForm.elements[i].type == "checkbox") {
if (anssetArray[j++] == 1)  {
document.citeForm.elements[i].checked = true;
}
}
}
}else{
for (var i=0; i < document.caseFileForm.elements.length; i++)  {
if (document.caseFileForm.elements[i].type == "checkbox") {
if (anssetArray[j++] == 1)  {
document.caseFileForm.elements[i].checked = true;
}
}
}
}
}
function setUtils() {
if(!pUtils) {
if(window.name=="Content") {
pUtils = parent.getUtilsObj();
prefix = "Global_Navigation";
}
else {
pUtils = getUtilsObj();
}
}
}
function setTaggedDocsState(anHref,path,loc,suppressFormSubmit)  {
if (!document) {
return false;
}
var formObj = document.citeForm;
if (!formObj) {
return false;
}
if (ieVer3 || netscapeVer3)  {
return;
}
if (path != 'fbSubmit') {
var doFocBudStuff = true;
try {
setUtils();
}
catch(e) {
doFocBudStuff = false;
}
if (doFocBudStuff) {
var pE;
var focBud = "";
pE = pUtils.getElem("focBudTerms", prefix);
if (pE) {
focBud = "&focBudTerms=" + escape(pE.value);
}
pE = pUtils.getElem("focBudSel", prefix);
if (pE) {
focBud += "&focBudSel=";
if (pE.type == "select-one") {
focBud+=pE.item(pE.selectedIndex).value;
formObj.tmpFBSel.value = pE.item(pE.selectedIndex).value;
}
else {
focBud+=pE.value;
formObj.tmpFBSel.value = pE.value;
}
}
pE = pUtils.getElem("focBudSemantic", prefix);
if (pE) {
focBud += "&focBudSemantic=";
if (pE.checked) {
focBud += "on";
} else {
focBud += "off";
}
}
if (anHref.lastIndexOf("#") != -1) {
var newString = anHref.replace(/#/,focBud+"#");
anHref = newString;
formObj.method ="post";
}
else {
anHref+=focBud;
}
}
}
formObj.action = anHref;
if(anHref.match(/toggleView=\d+/))
{
formObj.taggedDocs.value = "";
}
else
{
saveCheckBoxes(formObj);
}
setReporter(formObj);
setTarget(formObj, path, loc, formObj);
setFields(formObj, path, anHref);
var myBrowse = (window.name == "Content") ? parent.Content.ln_browse : window.ln_browse;
if (isDeliveryHref(anHref) && myBrowse.disablePushme == "1") {
formObj.pushme.disabled=true;
}
else{
try{
if(!isFastPrintHref(anHref)){
formObj.pushme.disabled=false;
}
}
catch(exception){
}
}
if ( (typeof suppressFormSubmit == "undefined")  || !suppressFormSubmit ) {
formObj.submit();
}
unsetFields(formObj, path, anHref);
}
function setFields(formObj, path, loc){
var args;
args = getWf("uri",loc);
for ( var i in args) {
if ((args[i].lastIndexOf("#") != -1) && i != "_ansset" && i !="thAsetHandle" && i != "focBudTerms" && i !="_xfercite" ){
args[i] = args[i].split("#")[0];
}
createAndSaveHiddenField(i, args[i], formObj);
}
}
function unsetFields(formObj, path, loc){
var args;
args = getWf("uri",loc);
for ( var i in args) {
deleteAndUnsaveHiddenField(i, args[i], formObj);
}
}
function createAndSaveHiddenField(sName, sValue, oForm)
{
var oTextbox = null;
var bFieldFound = false;
if (this.savedHiddenFields == null ) {
this.savedHiddenFields = new Array();
}
for(var x=0; x<oForm.elements.length; x++)
{
if(oForm.elements[x].name == sName)
{
oTextbox = oForm.elements[x];
bFieldFound = true;
break;
}
}
if(bFieldFound) {
this.savedHiddenFields.push(new Array(
oTextbox.getAttribute("name"),oTextbox.getAttribute("value"))
);
}
if(!bFieldFound)
{
oTextbox = document.createElement("INPUT");
oTextbox.setAttribute("type", "hidden");
oTextbox.setAttribute("name", sName);
oForm.appendChild(oTextbox);
}
oTextbox.setAttribute("value", sValue);
if(this.iDebug >= 5)
{
this.debugString += sName + "=" + sValue + "\n";
}
return;
}
function deleteAndUnsaveHiddenField(sName, sValue, oForm)
{
var oTextbox = null;
var bFieldFound = false;
if (this.savedHiddenFields == null ) {
this.savedHiddenFields = new Array();
}
for(var x=0; x<oForm.elements.length; x++)
{
if(oForm.elements[x].name == sName)
{
oTextbox = oForm.elements[x];
bFieldFound = true;
break;
}
}
var bFoundSaved = false;
for (var x=0; x < this.savedHiddenFields.length; x++) {
if (this.savedHiddenFields[x][0] == sName) {
bFoundSaved = true;
if(bFieldFound) {
oTextbox.setAttribute("value", this.savedHiddenFields[x][1]);
}
this.savedHiddenFields.splice(x,1);
break;
}
}
if(bFieldFound && !bFoundSaved)
{
/*hence wotkaround for this is to get the parent pointer from child and then removing the
child object*/
try
{
oForm.removeChild(oTextbox);
}catch(e)
{
oTextbox.parentElement.removeChild(oTextbox);
}
}
return;
}
function isDeliveryHref(anHref) {
if (anHref.indexOf("/delivery/") >= 0) {
return true;
} else {
return false;
}
}
function determineCurrentPageTaggedDocs(gs, formObj) {
if ((format== "FULL" || format == "VKWIC" ||format == "SKWIC" ||
format =="CUSTOM" || format == "BRIEF") &&
(gs.svc != "sh")&&(gs.svc != "toa")) {
var ssrch = 0;
if (window.name=="Content") {
if (parent.SSrch && (parent.SSrch.isEnable == 1)) {
ssrch = 1;
}
}
else if (window.SSrch && (window.SSrch.isEnable == 1)){
ssrch = 1;
}
var dedupeOn = document.getElementById("dedupeFlag")? 1:0;
if(dedupeOn && document.getElementById("clusterIndicator")
&& "1" == document.getElementById("clusterIndicator").value){
saveClusterSelection();
}
var k = parseInt(curDoc) - 1;
for (var i=0; i < formObj.elements.length; i++)  {
if (formObj.elements[i].type == "checkbox")  {
if (ssrch || dedupeOn) {
var span = formObj.elements[i].parentNode;
if (span.tagName.toUpperCase() == "SPAN" &&
span.id.substr(0,1) == "A") {
k = span.id.substr(1) - 1;
}
}
if (formObj.elements[i].checked)  {
anssetArray[k] = 1;
}
else{
anssetArray[k] = 0;
}
break;
}
}
}
else if(gs.shepBPon == 1 && (gs.svc == "sh") || (gs.svc == "toa")) {
var citeNum = gs.firstCite;
getCurrentPageTaggedDocs(citeNum);
}
else {
getCurrentPageTaggedDocs(sdoc);
}
}
function saveCheckBoxes(formObj)  {
var count = 0;
var theHref = "";
var indexAsString = "";
var pos = 0;
var hexString = "";
var remainder = 0;
var i;
var setsize = 4;
var noneChecked = 1;
var cnt;
if(!isCaseFile){
var gs = (window.name=="Content")? parent.Content.ln_browse:window.ln_browse;
var shepKwicView = "0";
if(gs.shepBPon == 1 && (gs.svc == "sh") || (gs.svc == "toa") && format =="KWIC")
shepKwicView = "1";
}
if((format == "CITE" || format == "XCITE") && (typeof(Storage) !== "undefined") && (navigator.userAgent.indexOf("Chrome")!= -1 )){
sessionStorage.y = $("#docbody").scrollTop();
}
if (anssetArrayInitialized && (format == "CITE" || format == "XCITE" || format == "" ||format=="FULL" || format == "VKWIC" ||format == "SKWIC" || format =="CUSTOM" || format == "BRIEF" || format == "DIGEST" || shepKwicView == "1")) {
if(!isCaseFile){
determineCurrentPageTaggedDocs(gs, formObj);
} else {
getCurrentCaseFileTaggedDocs(formObj);
}
for (i=0; i < anssetArray.length; i++)  {
if (anssetArray[i] == 1)  {
indexAsString += "1";
count++;
}
else  {
indexAsString += "0";
}
}
cnt = anssetArray.length % 4;
if ( cnt != 0)
{
for(i=anssetArray.length;i < (((anssetArray.length)- cnt) + 4);i++)
{
indexAsString += "0";
}
}
formObj.numDocsChked.value = count;
var zeroStr = "Z";
var effStr = "F";
var zeroCtr = 0;
var oneCtr = 0;
var hexVal, binStr;
var hexStr = "0123456789ABCDEF";
for (i=0; i < indexAsString.length; i++)  {
if (indexAsString.substring(pos, pos+setsize) == "0000" ||
indexAsString.substring(pos, pos+setsize) == "1111")  {
if (indexAsString.substring(pos, pos+setsize) == "0000")  {
zeroCtr++;
if (oneCtr)  {
hexString += encodeConsecutiveOnes(effStr, oneCtr);
oneCtr = 0;
}
}
else  {
oneCtr++;
if (zeroCtr)  {
hexString += encodeConsecutiveZeroes(zeroStr, zeroCtr);
zeroCtr = 0;
}
}
}
else  {
if (zeroCtr)  {
hexString += encodeConsecutiveZeroes(zeroStr, zeroCtr);
}
if (oneCtr)  {
hexString += encodeConsecutiveOnes(effStr, oneCtr);
}
binStr = indexAsString.substring(pos, pos+setsize);
hexVal = 0;
for (k = 0; k < 4; k++)
{
hexVal = hexVal << 1;
hexVal += parseInt(binStr.charAt(k));
}
if ((hexVal > 0) && (hexVal < 15))
{
hexString += hexStr.charAt(hexVal);
}
zeroCtr = 0;
oneCtr = 0;
}
pos += setsize;
}
if (zeroCtr)  {
hexString = hexString + encodeConsecutiveZeroes(zeroStr, zeroCtr);
}
if (oneCtr)  {
hexString = hexString + encodeConsecutiveOnes(effStr, oneCtr);
}
for (i=0; i < indexAsString.length; i++)  {
if (1 == parseInt(indexAsString.substring(i, i+1))) {
noneChecked = 0;
break;
}
}
if (!noneChecked)  {
formObj.taggedDocs.value = hexString;
}
else  {
formObj.taggedDocs.value = "";
}
} // only for cite/full/custom and kwic
if (formObj.taggedDocs.value.length)  {
var tagString = "&taggedDocs=" + formObj.taggedDocs.value;
if (formObj.action.lastIndexOf("#") != -1)
{
var newString = formObj.action.replace(/#/,tagString+"#");
formObj.action = newString;
}
else
{
formObj.action = formObj.action + tagString;
}
}
}
function setReporter(formObj) {
try{
if (parent.Power_Navigation && parent.pNav) {
var pRptList = parent.pNav.utils.getElem("reportList", "Power_Navigation");
if (pRptList) {
var pE = pRptList.options.item(0);
var nIdx = pRptList.selectedIndex;
if(nIdx == -1) {
nIdx = 0;
}
var strRepNum = pRptList.options.item(nIdx).name;
var strPage = parent.pNav.utils.getElem("pagetext", "Power_Navigation").value;
if (strRepNum && strRepNum.length) {
strRepNum = strRepNum.substr(0, (strRepNum.length-1) );
var tagString = "&strRepNum=" + strRepNum;
if (formObj.action.lastIndexOf("#") != -1)
{
var newString = formObj.action.replace(/#/,tagString+"#");
formObj.action = newString;
}
else
{
formObj.action = formObj.action + tagString;
}
}
if (strPage && strPage.length) {
var tagString = "&strPage=" + strPage;
if (formObj.action.lastIndexOf("#") != -1)
{
var newString = formObj.action.replace(/#/,tagString+"#");
formObj.action = newString;
}
else
{
formObj.action = formObj.action + tagString;
}
}
}
}else {
var pRptList = pNav.utils.getElem("reportList", "");
if (pRptList) {
var pE = pRptList.options.item(0);
var nIdx = pRptList.selectedIndex;
if(nIdx == -1) {
nIdx = 0;
}
var strRepNum = pRptList.options.item(nIdx).getAttribute("name");
var strPage = pNav.utils.getElem("pagetext", "").value;
if (strRepNum && strRepNum.length) {
strRepNum = strRepNum.substr(0, (strRepNum.length-1) );
var tagString = "&strRepNum=" + strRepNum;
if (formObj.action.lastIndexOf("#") != -1)
{
var newString = formObj.action.replace(/#/,tagString+"#");
formObj.action = newString;
}
else
{
formObj.action = formObj.action + tagString;
}
}
if (strPage && strPage.length) {
var tagString = "&strPage=" + strPage;
if (formObj.action.lastIndexOf("#") != -1)
{
var newString = formObj.action.replace(/#/,tagString+"#");
formObj.action = newString;
}
else
{
formObj.action = formObj.action + tagString;
}
}
}
}
}
catch(exception) { }
}
function setTarget(formObj, path, loc, form) {
if (path == 0) { //path != Delivery
if (loc == "window")  {
formObj.target="_self";
}
else if (loc == "parent") {
if (window.name == "cui") {
formObj.target="";
} else if (window.name!="__srcsel__") {
formObj.target="_parent";
} else {
formObj.target="";
}
}
else  {
if (window.name == "cui")  {
formObj.target = "_parent";
}
else {
formObj.target="Content";
}
}
}
else if (path == "MailMerge") {
path = "Delivery";
openDelWindow(405, 350);
formObj.target = "DelWindow";
}
else if (path == "Delivery" || path == "FastPrint") {
if (path == "FastPrint") {
openFpWindow(630, 415);
formObj.target = "fpWindow";
writeFpSentMsg();
}
else {
var nAgt = navigator.userAgent;
if(((nAgt.indexOf("Chrome"))!=-1) && (nAgt.indexOf('Windows NT 6.1')!= -1))
{
openDelWindow(660,415);
}
else{
openDelWindow(640, 415);
}
formObj.target = "DelWindow";
}
}
else if (path == "shepNavLink") {  // Shepards Next and Prev links.
if (window.name=="Content") {
formObj.target="Content";
} else {
formObj.target="";
}
}
else if (path == "shepbud") {  // Shepards buddy collapse
if (window.name=="Global_Navigation") {
formObj.target="_parent";
} else {
formObj.target="";
}
}
else {  // When Path is not 0 , for example when path is "custom", "focus" and "MLT"
if (loc == "window") {
formObj.target="_self";
}
else if (loc == "parent") {
formObj.target="_parent";
}
else {
formObj.target="_parent";
}
}
}
function writeFpSentMsg()
{
if(window.fpWin && !window.fpWin.closed) {
fpWin.document.write('<html><body><head><script language=JavaScript>var delStart=1</script></head></body>Your LexisNexis<sup>&reg;</sup> Fast Print request has been sent, and is currently being formatted. This may take a few moments, depending on the size of the request. Please wait, as closing this window may cancel your print request.</body></html>');
}
}
function printDocRange(href, firstDoc, lastDoc, totalDocs)
{
openFpWindow(630, 415);
writeFpSentMsg();
var docRange = firstDoc + "-" + lastDoc;
var numDocs = parseInt(lastDoc) - parseInt(firstDoc) + 1;
var oldFmt = document.citeForm.delformat.value;
document.citeForm.numDocsChked.value = numDocs;
document.citeForm.totaldocs.value     = totalDocs;
document.citeForm.fpDocs.value        = docRange;
document.citeForm.delformat.value     = format;
document.citeForm.fpCiteReq.value     = "page";
document.citeForm.target              = "fpWindow";
document.citeForm.action              = href;
setFields(document.citeForm,format,href);
document.citeForm.submit();
unsetFields(document.citeForm,format,href);
document.citeForm.fpDocs.value        = "";
document.citeForm.delformat.value     = oldFmt;
document.citeForm.fpCiteReq.value     = "";
document.citeForm.target              = "DelWindow";
}
function printDocRangeSingleSrch(href, firstDoc, lastDoc, totalDocs, nodeId)
{
var docRange = "";
if (nodeId == "")
{
var k = 0;
for (var i=0; i < document.citeForm.elements.length; i++)
{
if (document.citeForm.elements[i].type == "checkbox")
{
var span = document.citeForm.elements[i].parentNode;
if (span.tagName.toUpperCase() == "SPAN" &&
span.id.substr(0,1) == "A")
{
k = span.id.substr(1);
docRange += k + ",";
}
}
}
}
openFpWindow(630, 415);
writeFpSentMsg();
var numDocs = parseInt(lastDoc) - parseInt(firstDoc) + 1;
var oldFmt = document.citeForm.delformat.value;
document.citeForm.fpNodeId.value      = nodeId;
document.citeForm.numDocsChked.value = numDocs;
document.citeForm.totaldocs.value     = totalDocs;
document.citeForm.fpDocs.value        = docRange;
document.citeForm.delformat.value     = format;
document.citeForm.fpCiteReq.value     = "csgdocs";
document.citeForm.target              = "fpWindow";
document.citeForm.action              = href;
setFields(document.citeForm,format,href);
document.citeForm.submit();
unsetFields(document.citeForm,format,href);
document.citeForm.fpDocs.value        = "";
document.citeForm.delformat.value     = oldFmt;
document.citeForm.fpCiteReq.value     = "";
document.citeForm.target              = "DelWindow";
}
function openDelWindow(width, height) {
xposition=0; yposition=0;
var ver = (parseInt(navigator.appVersion) >= 4 );
if (ver) {
if(window.delwin && !window.delwin.closed) {
delwin.close();
}
}
if (ver){
xposition = (screen.width - width) / 2;
yposition = ((screen.height - height) / 2) - 67;
}
if (navigator.appName == 'Netscape'){
width = width + 25;
height = height + 25;
}
var resize = 1;
if ((navigator.appName == 'Netscape') &&
(parseInt(navigator.appVersion) == 4 )) {
resize = 0;
}
args = "width="+width+",height="+height
+",toolbar="+ 0 +",menubar="+ 0
+",screenx="+ xposition+",screeny="+yposition
+",left="+xposition+",top="+yposition
+",resizable="+resize+",scrollbars=1";
delwin=window.open("", "DelWindow", args);
}
function openFpWindow(width, height) {
xposition=0; yposition=0;
var ver = (parseInt(navigator.appVersion) >= 4 );
if (ver && (navigator.userAgent.toLowerCase().indexOf("safari") == -1)) {
if(window.fpWin && !window.fpWin.closed) {
fpWin.close();
}
}
if (ver){
xposition = (screen.width - width) / 2;
yposition = ((screen.height - height) / 2) - 67;
}
if (navigator.appName == 'Netscape'){
width = width + 25;
height = height + 25;
}
var resize = 1;
if ((navigator.appName == 'Netscape') &&
(parseInt(navigator.appVersion) == 4 )) {
resize = 0;
}
args = "width="+width+",height="+height
+",toolbar="+ 0 +",menubar="+ 0
+",screenx="+ xposition+",screeny="+yposition
+",left="+xposition+",top="+yposition
+",resizable="+resize+",scrollbars=1";
fpWin = ( window.open("", "fpWindow", args) );
$(fpWin).blur();
$(window).focus();
}
function encodeConsecutiveZeroes(zeroStr, zeroCtr)  {
zeroStr += zeroCtr + ":";
return zeroStr;
}
function encodeConsecutiveOnes(effStr, oneCtr)  {
effStr += oneCtr + ":";
return effStr;
}
function getCurrentPageTaggedDocs(sdoc)  {
var ssrch = 0;
if (window.name=="Content") {
if (parent.SSrch && (parent.SSrch.isEnable == 1)) {
ssrch = 1;
}
}
else {
if (window.SSrch && (window.SSrch.isEnable == 1)){
ssrch = 1;
}
}
var dedupeOn = document.getElementById("dedupeFlag")? 1:0;
if(dedupeOn && document.getElementById("clusterIndicator")
&& "1" == document.getElementById("clusterIndicator").value){
saveClusterSelection();
}
var gs = (window.name=="Content") ? parent.Content.ln_browse :
window.ln_browse;
var shepFp = 0;
if(gs.shepBPon == "1" && (gs.svc == "sh") && (gs.firstCite == "1")) {
shepFp = 1;
}
var k = parseInt(sdoc) - 1;
for (var i=0; i < document.citeForm.elements.length; i++)  {
if (document.citeForm.elements[i].type == "checkbox")  {
if (ssrch || dedupeOn ) {
var span = document.citeForm.elements[i].parentNode;
if (span.tagName.toUpperCase() == "SPAN" &&
span.id.substr(0,1) == "A") {
k = span.id.substr(1) - 1;
}
}
if (shepFp) {
k = document.citeForm.elements[i].value - 1;
}
if (document.citeForm.elements[i].checked)  {
anssetArray[k++] = 1;
}
else  {
anssetArray[k++] = 0;
}
}
}
}
function hbar(){
var object=document.all['body'];
if (object.clientWidth>=593){
object.style.overflowX='hidden';
}
else {
object.style.overflowX='auto';
}
return;
}
function trimString(inString) {
var outString;
var startPos;
var endPos;
var ch;
startPos = 0;
ch = inString.charAt(startPos);
while ((ch == " ") || (ch == "\b") || (ch == "\f") || (ch == "\n") || (ch == "\r") || (ch == "\n")) {
startPos++;
ch = inString.charAt(startPos);
}
endPos = inString.length - 1;
ch = inString.charAt(endPos);
while ((ch == " ") || (ch == "\b") || (ch == "\f") || (ch == "\n") || (ch == "\r") || (ch == "\n")) {
endPos--;
ch = inString.charAt(endPos);
}
outString = inString.substring(startPos, endPos + 1);
return outString;
}
function KeypressHandler(e, passedInForm) {
var key;
var field;
if (document.all) {
key = event.keyCode;
field = event.srcElement;
}
else if (navigator.appName=="Netscape") {
key = ((parseInt(navigator.appVersion) > 4))? e.keyCode:e.which;
field = e.target;
}
else {
return true;
}
if (key == 13) {
var f;
if (passedInForm) {
f = passedInForm;
}
else {
f = field.form;
}
if ((f.onsubmit && f.onsubmit())){
f.submit();
}
if (document.all) {
event.returnValue=false;
event.cancelBubble=true;
return false;
}
else {
if (document.getElementById) {e.returnValue=false;e.cancelBubble=true}
return false;
}
}
return true;
}
var browserOK = false;
var capturedText='';
var notificationWindow = null;
if ((document.getSelection)||(window.getSelection)||(document.selection && document.selection.createRange)) {
browserOK = true;
} else {
browserOK = false;
}
function captureText() {
var str = ''
if (window.getSelection) {
str = window.getSelection() + '';
}
else if (document.getSelection) {
str = document.getSelection();
}
else if (document.selection && (document.selection.type != "None") && document.selection.createRange) {
var range = document.selection.createRange();
str = range.text;
}
capturedText = str;
}
function validateSelection() {
var str = capturedText;
if (document.SubmitText) {
if (str.length >0 && str.length <= 1000) {
document.SubmitText.selectedText.value=str;
return true;
} else {
var mlLoc = (window.name=="Content")? "top":"top";
if (str.length > 1000) {
alert ('Your request failed because too much text was selected.\n\n\(The limit is 1000 characters; you selected ' + str.length + ' characters.)\nTry again by highlighting a smaller portion of relevant text and then clicking the\n"More Like Selected Text" link appearing at the '+mlLoc+' of your document.\n\nHint: For best results, keep your selection relatively brief \(preferably not more than\na paragraph\). If possible, try to focus on a single proposition or issue.');
} else {
alert ('Your request failed because no text was selected.\n\nTry again by highlighting a portion of relevant text and then clicking the\n\"More Like Selected Text\" link appearing at the '+mlLoc+' of your document.');
}
}
}
return false;
}
function submitMLST() {
document.SubmitText.submit();
}
if (document.layers) {
if (document.layers.BCTHdrDots) {
document.layers.BCTHdrDots.captureEvents(Event.MOUSEOVER);
document.layers.BCTHdrDots.onmouseover = function(event) {
document.layers.BCTHdrDots.routeEvent(event);
}
}
else if (document.layers.BCTFtrDots) {
document.layers.BCTFtrDots.captureEvents(Event.MOUSEOVER);
document.layers.BCTFtrDots.onmouseover = function(event) {
document.layers.BCTFtrDots.routeEvent(event);
}
}
}
var bBCT = false;
function tocBctObj(loc) {
this.onmouseover = ' onmouseover="bco' + loc + '.show(\'' + loc + '\')"';
this.onmouseout = ' onmouseout="bco' + loc + '.hide(\'' + loc + '\')"';
if (document.layers) {
this.posLyr = '<layer id="BCTpos' + loc + 'Layer" visibility="hide" style="position: relative;"></layer>';
this.lyrStart = '<layer id="BCTbct' + loc + 'Layer" visibility="hide" style="position: absolute; background-color: #FFFFCC; layer-background-color: #FFFFCC; margin: 1px; border: 1px #000000 solid; border-color: #000000; padding: 1px;"';
this.lyrStart += this.onmouseover + this.onmouseout + '>';
this.lyrEnd = '</layer>';
}
else {
this.posLyr = '<div id="BCTpos' + loc + 'Layer" class="tocposIE"></div>';
this.lyrStart = '<div id="BCTbct' + loc + 'Layer" class="tocexpandIE"';
this.lyrStart += this.onmouseover + this.onmouseout + '>';
this.lyrEnd = '</div>';
}
this.pos = tocBctPos;
this.hide = tocBctHide;
this.show = tocBctShow;
bBCT = true;
}
function tocBctPos(event, loc) {
if (document.layers) {
eval('document.layers.BCTbct' + loc + 'Layer.top = event.pageY');
eval('document.layers.BCTbct' + loc + 'Layer.left = (window.innerWidth/2) - (document.layers.BCTbct' + loc + 'Layer.clip.width /2)');
}
else {
var lyrObj = eval('BCTbct' + loc + 'Layer');
with (lyrObj.style){
visibility = 'hidden';
display = 'block';
pixelLeft = (document.body.offsetWidth / 2) - (lyrObj.offsetWidth /2);
display = 'none';
}
}
tocBctShow(loc);
}
function tocBctHide(loc) {
if (document.layers) {
eval('document.layers.BCTbct' + loc + 'Layer.visibility = \'hide\'');
}
else {
eval('BCTbct' + loc + 'Layer.style.visibility = \'hidden\'');
eval('BCTbct' + loc + 'Layer.style.display = \'none\'');
}
}
function tocBctShow(loc) {
if (document.layers) {
eval('document.layers.BCTbct' + loc + 'Layer.visibility = \'show\'');
}
else {
eval('BCTbct' + loc + 'Layer.style.visibility = \'visible\'');
eval('BCTbct' + loc + 'Layer.style.display = \'block\'');
}
}
function bctPosOnResize() {
if(bBCT) {
addLnkEvt();
if(!bcoHdr) {
var bcoHdr = new tocBctObj('Hdr');
}
if(!bcoFtr) {
var bcoFtr = new tocBctObj('Ftr');
}
}
}
var isIE4 = false;
var isIE5 = false;
if (navigator.appName.indexOf("Microsoft") != -1) {
if(parseInt(navigator.appVersion.indexOf("MSIE 4")) != -1) {
isIE4 = true;
}
else {
isIE5 = true;
}
}
function addLnkEvt()
{
if(isIE4) {
document.onmousedown = onContext;
document.onmouseup = onContext;
}
else if(isIE5) {
document.oncontextmenu = onContext;
}
else {
document.captureEvents(Event.MOUSEDOWN);
document.onmousedown = onContext;
}
}
function onContext(e) {
if(isIE4) {
if(window.event.button == 2) {
bRet =  showMenu(window.event.srcElement);
if(!bRet) {
window.event.cancelBubble = true;
window.event.returnValue = bRet;
}
return bRet;
}
}
else if(isIE5) {
return showMenu(window.event.srcElement);
}
else if(e.which == 3 && e.target != "") {
return showMenu(e.target);
}
}
function showMenu(obj)
{
var bRet = true;
if(obj.toString().indexOf("javascript:") != -1) {
bRet = false;
}
else if(obj.src) {
if(obj.src.indexOf("open.gif") != -1 || obj.src.indexOf("closed.gif") != -1
|| obj.src.indexOf("icon-DOCPlusLrg.gif") != -1 || obj.src.indexOf("icon-DOCMinusLrg.gif") != -1
|| obj.src.indexOf("checked.gif") != -1 || obj.src.indexOf("unchecked.gif") != -1
|| obj.src.indexOf("mix_checked.gif") != -1 || obj.src.indexOf("xlinkInfo2.gif") != -1
|| obj.src.indexOf("fast_print.gif") != -1 || obj.src.indexOf("fast_print_up.gif") != -1
|| obj.src.indexOf("fast_prt_arr.gif") != -1 || obj.src.indexOf("fast_prt_arr_up.gif") != -1
|| obj.src.indexOf("fast_prt_conf.gif") != -1 || obj.src.indexOf("fast_prt_conf_up.gif") != -1  ) {
bRet = false;
}
}
return bRet;
}
function setEventHandler(elem, eH, eF) {
if ( elem[eH] ) {
var sTmp = elem[eH].toString();
var pFun = sTmp.match("function");
if (pFun) {
var nSt = sTmp.indexOf("(", pFun.lastIndex);
var nEnd = sTmp.indexOf(")", nSt);
var sParms = sTmp.substring(nSt+1, nEnd);
nSt = sTmp.indexOf("{", nEnd);
nEnd = sTmp.lastIndexOf("}");
var sBody = sTmp.substring(nSt+1, nEnd);
elem[eH] = new Function(sParms,eF+"();"+sBody);
}
}
else {
elem[eH] = new Function(eF+"();");
}
}
function setDomEventHandler(objElement, strEvent, objFunction, capturePhase) {
if (!capturePhase)
capturePhase = false;
if (objElement.addEventListener) { // DOM model
if (strEvent.substring(0, 2).toLowerCase()  == "on")
strEvent = strEvent.substring(2);
objElement.addEventListener(strEvent, objFunction, capturePhase);
}
else if (objElement.attachEvent) { // IE5 and up model
objElement.attachEvent(strEvent, objFunction);
}
}
function removeDomEventHandler(objElement, strEvent, objFunction, capturePhase) {
if (!capturePhase)
capturePhase = false;
if (objElement.removeEventListener) { // DOM model
if (strEvent.substring(0, 2).toLowerCase()  == "on")
strEvent = strEvent.substring(2);
objElement.removeEventListener(strEvent, objFunction, capturePhase);
}
else if (objElement.detachEvent) { // IE5 and up model
objElement.detachEvent(strEvent, objFunction);
}
}
function delEventHandler(elem, eH, eF) {
if ( elem[eH] ) {
var eFuncs = elem[eH].toString();
if ( eFuncs.search(/function/i) >= 0 ) {
eFuncs = eval('eFuncs.replace(/' + eF+ '\\(\\);\[\\s\\n\]*/,"");');
}
else {
eFuncs = eval('eFuncs.replace(/' + eF+ '/,"");');
}
var result = eFuncs.match(/(function)\s*([^\)]+\))\s*\{\s*((.|\s)*)/);
if ( result && result[3] ) {
code = result[3].replace(/\}[\s]*$/g, "");
elem[eH] = new Function(code);
}
else {
elem[eH] = null;
}
}
}
function upc(isFixedFont){
var pgcDefined= document.getElementById("pgc");
if(pgcDefined){
var dw,lc,pgcIH,pc,d=document,l=7;
var tfd=(window.name=="Content" || window.name=="cui") ? parent.frames[0].document:d;
if (d.layers) {// NN4
pgcIH=function(html){
var t=tfd.layers;
for(var x=0;x<t.length;x++){
if(t[x].id.substr(0,3) == "pgc"){
var tl=t[x].document.layers[0].document;
tl.open("text/html");
tl.write(html);
tl.close();
}
}
};
lc=Math.ceil(d.bodyend.top/d.lineheight.clip.height);
dw=d.width;
}else{// NN6,IE
if (!d.getElementById){
d.getElementById=tfd.getElementById=function(objID){
return (this.all[objID].length)? this.all[objID][0]:this.all[objID];
};
l=6;
}
pgcIH=function(html){
tfd.getElementById("pgc").innerHTML=html;
tfd.getElementById("pgc").className="pgc";
tfd.getElementById("pgc1").className="pgc";
tfd.getElementById("pgc").style.fontWeight="bold";
tfd.getElementById("pgc").title="Printed page estimate is based on single-column format and font settings for currrent view";
if (d==tfd) //non-frame -- multiple <SPAN> tags to update
{
var pgc2 = tfd.getElementById("pgc_2");
if(pgc2){
pgc2.innerHTML=html;
}
}
};
var bt=d.getElementById("bodyend"),lh=d.getElementById("lineheight");
lc=Math.ceil(bt.offsetTop/lh.offsetHeight);
dw = $(document).width();
}
var zone;
zone = document.getElementById("zone");
if ((dw<300) && (zone && zone.value != "noah")){
return;
}
var pc=cpc(lc,dw,isFixedFont);
var oHTML = pc;
pgcIH(oHTML);
}
}
function cpc(lc,dw,isFixedFont){
var a,b,c,d,e;
if (isFixedFont){
a=1.0/Math.sqrt(dw),b=Math.log(lc);
c=44.20253245638035*a,d=0.9769690215847577*b;
e=Math.ceil(Math.exp(-2.162816466843455-c+d));
}else{
a=1.0/Math.sqrt(dw),b=Math.log(lc);
c=42.75906269904418*a,d=0.9836609690736422*b;
e=Math.ceil(Math.exp(-2.124804292352891-c+d));
}
return (e<200)? ""+e:">200";
}
function validatorFocus(form, e) {
if(cBtn) return true;
var ff = form;
if (ff.singleSrchOn && ff.singleSrchOn.value == "1")
{
var catsrc_rb_selected = false;
var focsel_rb_present  = true;
if (ff.focsel)
{
for (var i=0; i < ff.focsel.length; i++)
{
if (ff.focsel[i].checked)
{
if (ff.focsel[i].value == "2")
{
return(true);
}
if (ff.focsel[i].value == "3")
{
catsrc_rb_selected = true;
}
}
}
}
else
{
focsel_rb_present = false;
}
var _catsrclist = '';
var num_checked = 0;
for (var i=0; i < ff.cs_cbox.length; i++)
{
if (ff.cs_cbox[i].checked == true)
{
_catsrclist += ff.cs_cbox[i].value + ',';
num_checked++;
}
}
if (typeof(ff.cs_cbox.length) == "undefined")
{
if (ff.cs_cbox.checked == false)
{
alert("Please select documents to search within.");
return(false);
}
}
if (focsel_rb_present == false && _catsrclist == '' &&
typeof(ff.cs_cbox.length) != "undefined")
{
alert("Please select documents to search within.");
return(false);
}
if (catsrc_rb_selected == true && _catsrclist == '')
{
alert("Please select documents to search within.");
return(false);
}
if (num_checked != ff.cs_cbox.length) {
ff._catsrclist.value = _catsrclist;
}
else {
if (focsel_rb_present) {
ff.focsel[ff.focsel.length-1].value = "0";
}
}
}
if ((!ff.singleSrchOn ||
(ff.singleSrchOn && ff.singleSrchOn.value != "1")) &&
ff.focsel &&
ff.focsel[ff.focsel.length-1] &&
ff.focsel[ff.focsel.length-1].checked){
if (ff.selDocText.value.length == 0) {
alert("Please enter data in the SELECTED DOCUMENTS field");
ff.selDocText.focus();
return (false);
}
}
if (document.layers && (e.target == ff) && !fBtn) {
return true;
} else fBtn = false;
if (form.name == 'semantic') {
if (ff.semInput.value == "") {
alert("Please enter terms in the FOCUS terms field.");
return false;
} else return validatorSemanticLen(ff.semInput);
} else {
if (ff._focusTerms.value==""){
if (((ff.dateType[0].checked) && (ff.dateRelative.selectedIndex==0)) ||
(ff.dateType[1].checked && (ff.dateTo.value=="" && ff.dateFrom.value==""))){
alert("Please enter terms in the FOCUS terms field or insert" +
" a date restriction.");
return false;
} else return true;
} else return validatorLen(ff._focusTerms);
}
}
function validatorTOCHitFocus(focusTerms){
if (focusTerms.value==""){
alert("Please enter terms in the FOCUS terms field.");
return false;
} else return validatorLen(focusTerms);
}
function focusKeypressHandler(e){
var ff = (document.forms.focus)? document.forms.focus:document.safocus;
if (e && e.which==13) {
if (validatorFocus(e) && ff.onsubmit ) {
return ff.onsubmit();
}
else return false;
} else return true;
}
function openDnldWin(href, width, height) {
xposition=0; yposition=0;
var ver = (parseInt(navigator.appVersion) >= 4 );
if (ver){
xposition = (screen.width - width) / 2;
yposition = ((screen.height - height) / 2) - 67;
}
if (navigator.appName == 'Netscape'){
width = width + 25;
height = height + 25;
}
var resize = 1;
if ((navigator.appName == 'Netscape') &&
(parseInt(navigator.appVersion) == 4 )) {
resize = 0;
}
args = "width="+width+",height="+height
+",toolbar=0,menubar=0"
+",screenx="+ xposition+",screeny="+yposition
+",left="+xposition+",top="+yposition
+",resizable="+resize+",scrollbars=0";
dnldWin=window.open(href, "dnldWindow", args);
}
function graySearch() {
if ((navigator.appName == 'Netscape') &&
(parseInt(navigator.appVersion) == 4 )) {
return true;
}
if(!document.getElementById) {
document.getElementById=function(objID){
return (this.all[objID].length) ? this.all[objID][0]:this.all[objID];
};
}
var elem = document.getElementById("searchBtn");
if(elem.src.indexOf("button_search_purple.gif") != -1) {
elem.src = elem.src.replace(/button_search_purple.gif/,
"button_search_inactive.gif");
return true;
}
if(elem.src.indexOf("button_search_blue.gif") != -1) {
elem.src = elem.src.replace(/button_search_blue.gif/,
"button_search_inactive.gif");
return true;
}
return false;
}
function grayHNSearch() {
if ((navigator.appName == 'Netscape') &&
(parseInt(navigator.appVersion) == 4 )) {
return true;
}
if(!document.getElementById) {
document.getElementById=function(objID){
return (this.all[objID].length) ? this.all[objID][0]:this.all[objID];
};
}
var elem2 = document.getElementById("Go");
if(elem2.src.indexOf("ButRetrieveAll.gif") != -1 || elem2.name == "Go") {
elem2.src = elem2.src.replace(/ButRetrieveAll.gif/,
"ButRetrieveAllDis.gif");
elem2.alt = elem2.alt.replace(/Retrieve all headnotes and additional cases for this topic/,"Your search is being processed, please wait");
return true;
}
return false;
}
function processCLT(theField) {
theForm = document.forms[0];
if ((theForm._src.value == "") ||
(theForm._src.value == "undefined")) {
alert("Please select a jurisdiction from the Select Jurisdiction dropdown list.");
theForm._src.focus();
return false;
}
else {
theForm.action = theForm.ssaCLTURL.value;
theForm._ssaCLT.value = "1";
theForm.svc.value = "sf";
theForm.submit();
}
}
function resetForm(pForm) {
var pFill = pForm.elements;
var pObj;
for(nIdx=0;nIdx<pFill.length;nIdx++) {
pObj = pFill.item(nIdx);
if(pObj.type == "text"  || pObj.type == "textarea") {
pObj.value = "";
}
else if(pObj.type == "select-multiple" || pObj.type == "select-one") {
pObj.selectedIndex = -1;
pObj.selectedIndex = 0;
}
}
}
function resetPrsForm(pForm)
{
var pFill = pForm.elements;
var pObj;
for(nIdx=0;nIdx<pFill.length;nIdx++)
{
pObj = pFill.item(nIdx);
if(pObj.type == "text"  || pObj.type == "textarea")
{
pObj.value = "";
}
else if (pObj.type == "checkbox")
{
pObj.checked = true;
}
else if (pObj.name == "Radius")
{
pObj.selectedIndex = 4;
}
else if(pObj.type == "select-multiple" || pObj.type == "select-one")
{
pObj.selectedIndex = 0;
}
}
}
function submitSort(selectObj, promptCode){
var locStr     = ((document.frames) && (document.frames.length>0))?
document.frames[1].location:document.location;
var totalDocsSel;
totalDocsSel = (document.citeForm.numDocsChked.value.length) ? parseInt(document.citeForm.numDocsChked.value):0;
totalDocsSel = totalDocsSel + countOfSelDocs;
var sortDamata;
var damataLink = document.getElementById('sortDamataLink');
if(damataLink){
sortDamata=damataLink.value;
}
var popUpFlag = 0;
if((totalDocsSel > 0) && sortDamata){
popUpFlag=1;
divNumber=3;
}
else if (totalDocsSel > 0){
popUpFlag=1;
divNumber=1;
}
else if(sortDamata){
popUpFlag=1;
divNumber=2;
}
if(popUpFlag){
$('#transitionDiv').css({'position':'absolute'});
$('#transitionDiv').css({'filter':'alpha(opacity=0)'}).fadeIn();
var sortCheckBox = document.getElementById('hidePopUpCheck'+divNumber);
if(sortCheckBox && (sortCheckBox.checked == true)){
sortCheckBox.checked=false;
}
$('#sortPopUpDiv'+divNumber).fadeIn();
$('#sortAnchorOk'+divNumber).unbind('click').bind('click', function() {
checkDamata();
closeSortPopUp();
submitSortForm(selectObj,promptCode);
});
$('#sortAnchorCancel'+divNumber).unbind('click').bind('click', function() {
closeSortPopUp();
resetSortWidget(selectObj);
});
$('#sortClose'+divNumber).unbind('click').bind('click', function() {
closeSortPopUp();
resetSortWidget(selectObj);
});
popUpFlag=0;
}
else{
submitSortForm(selectObj,promptCode);
}
}
function checkDamata(){
var link;
var damataLink = document.getElementById("sortDamataLink");
if(damataLink){
link=damataLink.value;
}
if(link){
link = link + '&dummy=' +new Date().getTime();
if($("#hidePopUpCheck"+divNumber).attr("checked")=="checked") {
$.ajax({
url: link,
async: false
});
}
}
}
function closeSortPopUp(){
$('#sortPopUpDiv'+divNumber).fadeOut();
var innerDiv =  document.getElementById("transitionDiv");
innerDiv.style.display = "none";
}
function submitSortForm(selectObj, promptCode) {
var d=document;
var fcSortLargeMsg =
'Sorting by "Frequently Cited" requires identifying how many\n' +
'times each case is cited by other cases in your search\n' +
'results. This may take a few minutes.\n\n' +
'Do you want to continue?';
var fcSortMaxMsg   =
'Your results cannot be sorted using "Frequently Cited."\n' +
'There are too many cases to sort by how\n' +
'often each case is cited by the others.';
var fcSortDRMsg    =
'Your search contains a date restriction. Sorting your\n' +
'results by frequency of citation will not expand your\n' +
'answers beyond the selected date range.';
with(selectObj)
var sortVal = (value)? value:options[selectedIndex].value;
if (promptCode && sortVal=="fc"){
if (promptCode == 1 || promptCode == 4) {
if (!confirm(fcSortLargeMsg)) {
resetSortWidget(selectObj);
return false;
}
if (promptCode == 4)
alert(fcSortDRMsg);
} else if (promptCode == 2) {
alert(fcSortMaxMsg);
resetSortWidget(selectObj);
return;
} else if (promptCode == 3) {
alert(fcSortDRMsg);
}
}
var sortFrm = ((d.sortfrm))? d.sortfrm:Global_Navigation.document.sortfrm;
var mlstFrm = ((d.SubmitText))? d.SubmitText:Content.document.SubmitText;
mlstFrm.action  = sortFrm.action;
mlstFrm[selectObj.name].value = sortVal;
var locStr     = ((document.frames) && (document.frames.length>0))?
document.frames[1].location:d.location;
var sortUrlReg = new RegExp("_fmtstr=(\\w+)");
var sortUrlVal = locStr.href.match(sortUrlReg);
if (sortUrlVal && sortUrlVal.length && sortUrlVal.length == 2) {
mlstFrm.sortFmtstr.value = sortUrlVal[1];
}
mlstFrm.submit();
selectObj.disabled = true;
}
function resetSortWidget(selectObj1, selectObj2) {
var d=document;
var syncList =
function(listbox, value) {
for(var x=0;x<listbox.length;x++) {
if (listbox[x].value == value) {
listbox[x].selected = true;
break;
}
}
};
if (!selectObj1)
return;
var sortUrlReg = new RegExp(selectObj1.name+"=(\\w{2})");
var sortUrlVal = d.location.href.match(sortUrlReg);
if (sortUrlVal && sortUrlVal.length && sortUrlVal.length == 2) {
syncList(selectObj1, sortUrlVal[1]);
if (selectObj2) {
syncList(selectObj2, sortUrlVal[1]);
}
}
else {
if(selectObj1[0].selected){
selectObj1[1].selected = true;
}
else{
selectObj1[0].selected = true;
}
if (selectObj2) {
selectObj2[0].selected = true;
}
}
}
function openTSWin(sHref, winName)
{
if(winName =="") {
winName='IDR';
}
var w = 640;
var h = 480;
var features = "location=0,menubar=0,resizable=1,scrollbars=1,status=0,titlebar=0,toolbar=1";
if(screen.width)
{
var winl = (screen.width-w)/2;
var wint = (screen.height-h)/2;
}
else
{
winl = 0;
wint = 0;
}
if (winl < 0) winl = 0;
if (wint < 0) wint = 0;
var settings = 'height=' + h + ',';
settings += 'width=' + w + ',';
settings += 'top=' + wint + ',';
settings += 'left=' + winl + ',';
settings += features;
win = window.open(sHref, winName, settings);
win.focus();
return false;
}
function checkSSN(ssn)
{
var reHyphen=/\b\d{3}-\d{2}-\d{4}\b/;
var reLogic=/\b((and)|(or))\b/i;
var list = ssn.value.split(" ");
var validSSN = true;
for (var i=0; i<list.length; i++)
{
if(list[i] !="" && !reHyphen.test(list[i]) && !reLogic.test(list[i]))
{
validSSN = false;
break;
}
}
if (ssn.value !="" && !validSSN )
{
var msg = "Please enter the SSN's in the following format:\n\n"
+ "234-56-7890 345-67-8901";
alert(msg);
ssn.focus();
ssn.select();
}
}
function onFocusBuddySubmit(form, svc) {
var foAction = form.action;
foAction += "&focusBuddy=1";
foAction += "&focBudSvc=" + svc;
foAction += "&focBudTerms=" + escape(form.focBudTerms.value);
if (Content.pTocHits) {
if (validatorTOCHitFocus(form.focBudTerms)) {
Content.pTocHits.persistHitCheckboxesFoc(foAction);
}
}
else {
if (validatorNew(form.focBudTerms,false,'Please enter terms in the FOCUS Terms field.',false)) {
foAction += "&focBudSel=";
foAction += form.focBudSel.item(form.focBudSel.selectedIndex).value;
Content.setTaggedDocsState(foAction,'fbSubmit','parent.Content');
}
}
return false;
}
function alterDisplay(oNode, sClassName, oImg, oSrc)
{
if(oNode)
{
oNode.className = sClassName;
}
if(oImg && oSrc)
{
oImg.setAttribute("src", oSrc.src);
oImg.setAttribute("alt", oSrc.alt);
}
}
function saveObjInFocus(objName) {
objInFoc = objName;
}
function focBudSelHandler(fbSel) {
var gs = (window.name=="Content") ? parent.Content.ln_browse : window.ln_browse;
if ((gs.svc != "fo") && (gs.svc != "safo")) {
var selectedVal = fbSel.options[fbSel.selectedIndex].value;
if (selectedVal == "sel") {
var count = 0;
var i;
if ((anssetArrayInitialized) &&
(format == "CITE" || format == "XCITE" || format == "" ||
format=="FULL" || format == "`" ||  format == "VKWIC" || format == "SKWIC" || format =="CUSTOM" ||
format == "BRIEF" || format == "DIGEST")) {
determineCurrentPageTaggedDocs(gs,document.citeForm);
for (i = 0; i < anssetArray.length; i++)  {
if (anssetArray[i] == 1) {
count++;
}
}
if (count == 0) {
alert('No documents are selected.  If you do not select any documents, the FOCUS search will be performed on all of your results.');
}
}
}
}
}
function showTooltip(elem,evt,whichOne)
{
if(!pDiv)
{
pDiv = document.createElement("DIV");
pDiv.id = "myDiv";
pDiv.style.fontSize = "9pt";
pDiv.style.fontFamily = "Arial,Helvetica,sans-serif";
pDiv.style.paddingLeft = "4";
pDiv.style.paddingRight = "4";
pDiv.style.paddingTop = "4";
pDiv.style.paddingBottom = "6";
pDiv.style.position = "absolute";
pDiv.style.width = "174px";
pDiv.style.backgroundColor = "#FFFFCC";
pDiv.style.border = "1px #000000 solid";
document.body.appendChild(pDiv);
}
pDiv.style.visibility = "visible";
pDiv.innerHTML = tipsArray[whichOne];
positionTooltip(elem,pDiv);
}
function hideTooltip()
{
pDiv.style.visibility = "hidden";
}
function positionTooltip(elem,pDiv)
{
objItem = elem;
objParent = null;
var intX = 0;
var intY = 0;
do
{
intX += objItem.offsetLeft;
intY += objItem.offsetTop;
objParent = objItem.offsetParent.tagName;
objItem = objItem.offsetParent;
} while(objParent != 'BODY')
pDiv.style.left = intX;
pDiv.style.top  = intY - 12 - pDiv.offsetHeight;
}
function swapSection(showDiv,hideDiv,theForm,relConState)
{
showEl = document.getElementById(showDiv);
hideEl = document.getElementById(hideDiv);
hideEl.style.display = 'none';
showEl.style.display = '';
theForm.showRelConcepts.value = relConState;
}
function setFocusRangeList(ff, checkStatus)
{
for (var i=0; i < ff.cs_cbox.length; i++)
{
ff.cs_cbox[i].checked = checkStatus;
}
if (typeof(ff.cs_cbox.length) == "undefined")
{
ff.cs_cbox.checked = checkStatus;
}
return false;
}
function selectFocCatSrcGroup(focSel)
{
if (focSel) {
for (var i=0; i < focSel.length; i++) {
if (focSel[i].value == "3") {
focSel[i].checked = true;
}
}
}
}
function ldc_containsSpecialChars(sString, sChars) {
for (var x=0; x<sChars.length; x++) {
if(sString.indexOf(sChars.charAt(x)) >= 0){
return true;
}
}
return false;
}
function ldc_strTrim(thisStr) {
return thisStr.replace(/^\s+/,'').replace(/\s+$/,'');
}
function checkPrsSSN(ssn)
{
var social = ldc_strTrim(ssn.value);
var hyphen=/\b\d{3}-\d{2}-\d{4}\b/;
var numerics=/\b\d{9}\b/;
if(social !="" && !hyphen.test(social) && !numerics.test(social))
{
var msg = "Please re-enter the Social Security Number using one of the formats displayed under the SSN field \n(123-45-6789 or 123456789).\n\n";
alert(msg);
ssn.focus();
ssn.select();
}
}
function checkPrsSpecialChars(field) {
sChars = new String("\\/!*+");
var sString = field.value;
for (var x=0; x<sChars.length; x++) {
if(sString.indexOf(sChars.charAt(x)) >= 0){
var msg = "You have entered an invalid search character.  Only use alpha or numeric characters, spaces, hyphens, and apostrophes.  Do not use wildcard characters such as ! or * or Boolean logic (w/n).\n\n";
alert(msg);
field.focus();
field.select();
return true;
}
}
return false;
}
function MM_reloadPage(init) {  //reloads the window if Nav4 resized
if (init==true) with (navigator)  {
if ((appName=="Netscape")&&(parseInt(appVersion)==4))  {
Content.document.MM_pgW=innerWidth; Content.document.MM_pgH=innerHeight; onresize=MM_reloadPage;
}
}
else if (innerWidth!=Content.document.MM_pgW || innerHeight!=Content.document.MM_pgH)
location.reload();
}
function MM_findObj(n, d)  { //v4.01
var p,i,x;  if(!d) d=Content.document;
if((p=n.indexOf("?"))>0&&parent.frames.length)  {
d=parent.frames[n.substring(p+1)].document; n=n.substring(0,p);
}
if(!(x=d[n])&&d.all)
x=d.all[n];
for (i=0;!x&&i<d.forms.length;i++)
x=d.forms[i][n];
for(i=0;!x&&d.layers&&i<d.layers.length;i++)
x=MM_findObj(n,d.layers[i].document);
if(!x && d.getElementById)
x=d.getElementById(n);
return x;
}
function MM_showHideLayers() { //v6.0
var i,p,v,obj,args=MM_showHideLayers.arguments;
for (i=0; i<(args.length-2); i+=3)
if ((obj=MM_findObj(args[i]))!=null) {
v=args[i+2];
if (obj.style) {
obj=obj.style;
v=(v=='show')?'visible':(v=='hide')?'hidden':v;
}
obj.visibility=v;
}
}
function classChange(tag,clas,styleProp,styleValue)  {
for (i=0;i<document.getElementsByTagName(tag).length; i++)  {
if (document.getElementsByTagName(tag).item(i).className == clas) {
eval ('document.getElementsByTagName(tag).item(i).style.' + styleProp + ' = "' + styleValue + '"');
}
}
}
function checkMonth(MM)
{
var month = ldc_strTrim(MM.value);
var numerics=/\b01|02|03|04|05|06|07|08|09|10|11|12\b/;
if(month !="" && !numerics.test(month))
{
var msg = "Please enter a valid date.\n\n";
alert(msg);
MM.focus();
MM.select();
}
}
function checkDay(DD)
{
var day = ldc_strTrim(DD.value);
var numerics=/\b01|02|03|04|05|06|07|08|09|10|11|12|13|14|15|16|17|18|19|20|21|22|23|24|25|26|27|28|29|30|31\b/;
if(day !="" && !numerics.test(day))
{
var msg = "Please enter a valid date.\n\n";
alert(msg);
DD.focus();
DD.select();
}
}
function checkYear(YYYY)
{
var year = ldc_strTrim(YYYY.value);
var numerics=/\b\d{4}\b/;
if(year !="" && !numerics.test(year))
{
var msg = "Please enter a valid date.\n\n";
alert(msg);
YYYY.focus();
YYYY.select();
}
}
function validatorPerson(theForm)
{
var len = theForm.elements.length;
var i;
var result="";
var strg="";
var element;
var valid = true;
var glbaSet = false;
var dppaSet = false;
for(i=0; i<len; i++)
{
element=theForm.elements[i];
if (element.type != "hidden")
{
if (element.name == "glba")
{
if (element.value != "")
{
glbaSet = true;
}
}
else if (element.name == "dppa")
{
if (element.value != "")
{
dppaSet = true;
}
}
else if (element.name != "swim" && element.name != "Radius")
{
result+= i+ " "+element.value+"\n";
strg+=element.value;
}
}
}
var errArray = new Array();
if (strg.length == '0')
{
errArray[errArray.length] =
"Please enter text in at least one search field in order to search.";
}
var monthSet = false;
var daySet = false;
var yearSet = false;
if (theForm.MM.value != "")
{
monthSet = true;
}
if (ldc_strTrim(theForm.DD.value) != "")
{
daySet = true;
}
if (ldc_strTrim(theForm.YYYY.value) != "")
{
yearSet = true;
}
if (daySet)
{
if ( !monthSet)
{
theForm.MM.focus();
errArray[errArray.length] =
"If you enter a day in the Birth Date field, you must also enter a month and year";
}
else if ( !yearSet)
{
theForm.YYYY.focus();
errArray[errArray.length] =
"If you enter a day in the Birth Date field, you must also enter a year";
}
}
else if (monthSet)
{
if ( !yearSet)
{
theForm.YYYY.focus();
errArray[errArray.length] =
"If you enter a month in the Birth Date field, you must also enter a year";
}
}
if (dppaSet == false)
{
theForm.dppa.focus();
errArray[errArray.length] =
"You must select a DPPA use from the drop-down list.";
}
if (glbaSet == false)
{
theForm.glba.focus();
errArray[errArray.length] =
"You must select a GLBA use from the drop-down list.";
}
if (errArray.length > 0)
{
valid = false;
var errString = errArray.reverse().join("\n");
alert(errString);
}
return(valid);
}
function validatorPrs(theForm)
{
var len = theForm.elements.length;
var i;
var result="";
var strg="";
var element;
var valid = true;
var glbaSet = false;
var dppaSet = false;
for(i=0; i<len; i++)
{
element=theForm.elements[i];
if (element.type != "hidden")
{
if (element.name == "glba")
{
if (element.value != "")
{
glbaSet = true;
}
}
else if (element.name == "dppa")
{
if (element.value != "")
{
dppaSet = true;
}
}
else if (element.name != "Radius")
{
result+= i+ " "+element.value+"\n";
strg+=element.value;
}
}
}
var errArray = new Array();
if (strg.length == '0')
{
errArray[errArray.length] =
"Please enter text in at least one search field in order to search.";
}
if (dppaSet == false)
{
theForm.dppa.focus();
errArray[errArray.length] =
"You must select a DPPA use from the drop-down list.";
}
if (glbaSet == false)
{
theForm.glba.focus();
errArray[errArray.length] =
"You must select a GLBA use from the drop-down list.";
}
if (errArray.length > 0)
{
valid = false;
var errString = errArray.reverse().join("\n");
alert(errString);
}
return(valid);
}
function manageBox(dummyVar)
{
}
function changeColor(){
if (document.all) {
document.forms["recentSub"].submit();
}else{
var selIndex = document.forms["recentSub"].sub.selectedIndex;
if(document.forms["recentSub"].sub.options[selIndex].style.color== 'blue'){
document.forms["recentSub"].sub.style.color = 'blue';
} else{
document.forms["recentSub"].sub.style.color = 'black';
}
}
document.forms["recentSub"].submit();
}
function changeColorOnly(){
if (document.all) {
return;
}else{
var selIndex = document.forms["recentSub"].sub.selectedIndex;
if(document.forms["recentSub"].sub.options[selIndex].style.color== 'blue'){
document.forms["recentSub"].sub.style.color = 'blue';
} else{
document.forms["recentSub"].sub.style.color = 'black';
}
}
return;
}
function getIEXMLReq() {
var oXmlReq = null;
var sActiveX = "";
var versions = ["Msxml2.XMLHTTP.7.0",
"Msxml2.XMLHTTP.6.0",
"Msxml2.XMLHTTP.5.0",
"Msxml2.XMLHTTP.4.0",
"Msxml2.XMLHTTP.3.0",
"Msxml2.XMLHTTP",
"Microsoft.XMLHTTP"];
if (oXmlReq == null) {
for (var x=0; x<versions.length; x++) {
try {
oXmlReq = new ActiveXObject(versions[x]);
if (oXmlReq)
break;
}
catch (objException) {
}
}
}
return oXmlReq;
}
function readCookie(name) {
var nameEQ = name + "=";
var ca = document.cookie.split(';');
for(var i=0;i < ca.length;i++) {
var c = ca[i];
while (c.charAt(0)==' ') c = c.substring(1,c.length);
if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
}
return null;
}
function appendUserSim(doc,element) {
if ( readCookie("_custId") ) {
var whichDOM = (doc==null) ? document : doc;
var sp = whichDOM.createElement('span');
sp.className = "userSimId";
sp.appendChild(whichDOM.createTextNode("User Simulation: "));
var sp2 = doc.createElement('span');
sp2.appendChild(whichDOM.createTextNode(readCookie("_custId")));
sp2.className = "userSimIdStrong";
sp.appendChild(sp2);
element.appendChild(sp);
}
}
function updateUserSim(obj)
{
if (document.getElementById && document.createElement && document.createTextNode) {
try {
if ( document.getElementById("userSimId") ) {
appendUserSim(document,document.getElementById("userSimId"));
}
else if ( Global_Navigation && Global_Navigation.document.getElementById("userSimId") ) {
appendUserSim(Global_Navigation.document,Global_Navigation.document.getElementById("userSimId"));
}
}
catch (e) {  }
}
}
function showISLN(name)
{
try {
if (navigator.appVersion.toLowerCase().indexOf('msie') != -1) {
var s=document.getElementsByTagName("SPAN");
var sp=null;
for (var indx=0;indx<s.length;indx++) {
sp=s[indx];
if (sp.name==name) {
sp.style.display='inline';
sp.style.visibility='visible';
}
}
} else {
var s=document.getElementsByName(name);
var sp=null;
for (var indx=0;indx<s.length;indx++) {
sp=s[indx];
sp.style.display='inline';
sp.style.visibility='visible';
}
}
} catch(e){ }
}
function kerSubmitHandler(qs,type){// Create the ajax request object
var xmlHttpReq=0;
try{
if (window.XMLHttpRequest) { // Not IE
xmlHttpReq = new XMLHttpRequest();
} else if (window.ActiveXObject) { // IE
xmlHttpReq = getIEXMLReq();
}
}
catch (objException) {
return false;
}
var url = '/research/cutker?type=' + type +'&'+qs+'&dummy=' +new Date().getTime();
xmlHttpReq.open('GET', url, false);
xmlHttpReq.send(null);
return true;
}
function openSrchFeedback(pageToLoad)
{
width = 560;
height = 325;
center = 1;
menu = 2;
yoffset = 0;
xoffset = 0;
args=getArgs(width,height,center,menu,yoffset,xoffset);
if(window.srchFeedback && !window.srchFeedback.closed){
srchFeedback.focus();
}
srchFeedback=window.open(pageToLoad,"srchFeedback",args);
}
function ldc_getNodePosition(oElement) {
var aPosition={x:0,y:0};
while (oElement != null) {
aPosition.x += oElement.offsetTop;
aPosition.y += oElement.offsetLeft;
oElement = oElement.offsetParent;
}
return aPosition;
}
function validateFasSearch(fasForm)
{
if (!_fasSearchRequest) {
return true;  // alpha request - don't need to validate search terms
}
if (!fasForm) {
return true;  // should not happen.  If so, just let it goes...
}
var findterms = fasForm.findterms.value;
findterms = findterms.replace(/(^\s+)(\s+$)/, "");
if (findterms == "") {
alert("Please enter the source name or part of the name for the source you are looking for.");
return false;
}
if (findterms.length > 1000) {
alert("Please limit your search text to 1000 characters or fewer.");
return false;
}
var trimFindterms = ldc_strTrim(findterms);
if (trimFindterms.indexOf(";") >= 0) {
var regex = /^[A-Za-z0-9&\-]{2,6}\W*\;\W*[A-Za-z0-9&\-]{2,6}$/;
if (trimFindterms.match(regex)) {
return true;
}
else {
var msg;
msg = "If you use a semicolon (;) in your search, the Find a Source " +
"feature only looks for short source names such as "            +
"GENFED;COURTS.  No short source name with the terms you "      +
"entered (" + findterms + ") exists.\n\n"                       +
"If you are not looking for these short source names, please "  +
"remove the semicolon from your search.";
alert(msg);
document.getElementById("fas_form").findterms.focus();
return false;
}
}
return true;
}
function submitFasRequest(searchTermsOK, fasForm)
{
if (!searchTermsOK) {
return false;
}
if (_fasSearchRequest) {
var fasTerms = document.getElementById("fas_form").findterms.value;
var path;
if (fasTerms.indexOf(";") >= 0) {
path = "/research/sel/fasshort";
} else {
path = "/research/sel/faslong";
}
} else {
path = "/research/sel/fasalpha";
}
fasForm.action = path;
return true;  // submit form
}
function jsTrim(sString)
{
sString = sString.replace(/^(\s+)/, "");
sString = sString.replace(/(\s+)$/, "");
return sString;
}
function ldc_clearChildren(oNode) {
while(oNode.hasChildNodes()) {
oNode.removeChild(oNode.firstChild);
}
}
function openMungoFrame(href, target, h, w){
return true;
}
function rdfEnable(theForm)
{
if (theForm.rdf) {
if(theForm.optClient.length != 3){
if(theForm.optClient[1].checked==true){
$('#newClientReqLabel').css('display','block');
}
else{
$('#newClientReqLabel').css('display','none');
}
}
else{
if (theForm.optClient[1].checked==true || theForm.optClient[2].checked==true) {
theForm.optPrevRdf.disabled=true;
theForm.rdf.disabled=false;
$('#rdfMinCharLabel').css('display','block');
$('#rdfTextReqLabel').css('display','block');
if(document.getElementById("rdfTextReqLabel")){
$('#rdfTextAreaCellDiv').width(230);
}
if(theForm.optClient[2].checked==true)
$('#newClientReqLabel').css('display','block');
else
$('#newClientReqLabel').css('display','none');
}
else {
theForm.optPrevRdf.disabled=false;
$('#rdfMinCharLabel').css('display','block');
$('#newClientReqLabel').css('display','none');
if (theForm.optPrevRdf.checked==true) {
theForm.rdf.disabled=true;
$('#rdfMinCharLabel').css('display','none');
$('#rdfTextReqLabel').css('display','none');
if(document.getElementById("rdfTextReqLabel")){
$('#rdfTextAreaCellDiv').width(150);
}
}
else {
theForm.rdf.disabled=false;
$('#rdfMinCharLabel').css('display','block');
$('#rdfTextReqLabel').css('display','block');
if(document.getElementById("rdfTextReqLabel")){
$('#rdfTextAreaCellDiv').width(230);
}
}
}
}//if theForm.optClient.length
}//If theForm.rdf
}
function ldcGraySearch() {
if ((navigator.appName == 'Netscape') &&
(parseInt(navigator.appVersion) == 4 )) {
return true;
}
if(!document.getElementById) {
document.getElementById=function(objID){
return (this.all[objID].length) ? this.all[objID][0]:this.all[objID];
};
}
var elem = document.getElementById("searchBtn");
if(elem.className == "button primary") {
elem.className = "button disabled";
return true;
}
if(elem.src.indexOf("button_search_blue.gif") != -1 || elem.name == "MLTSearch") {
elem.src = elem.src.replace(/button_search_blue.gif/,
"button_search_inactive.gif");
return true;
}
return false;
}
function changeFont()
{
var agt=navigator.userAgent.toLowerCase();
if(agt.indexOf("msie") != -1)
{
try
{
var anchorTags = document.getElementsByName("TOC");
if(anchorTags != null)
{
for (var i = 0; i < anchorTags.length ; i++)
{
var anchor = anchorTags[i];
anchor.style.color = "#333";
anchor.style.textDecoration='none';
}
}
return true;
}
catch(e)
{
return true;
}
}
return true;
}
function closeModal(closeButton){
saveClusterSelection();
saveCheckBoxes(document.getElementById("citeForm"));
var mainDiv =  document.getElementById("dedupediv");
mainDiv.style.display = "none";
mainDiv.innerHtml = "";
document.getElementById("clusterIndicator").value = "0";
var innerDiv =  document.getElementById("transDiv");
innerDiv.style.display = "none";
document.getElementById("dedupeIframe").src = "";
}
function saveClusterSelection(){
inputTags = document.getElementById('dedupediv').getElementsByTagName("span");
for(var i = 0, l = inputTags.length; i < l; i++){
checkBox = inputTags[i].getElementsByTagName("input");
for(var j = 0,  k= checkBox.length; j < k; j++){
if(checkBox[j].checked){
checkBox[j].removeAttribute("UNCHECKED");
checkBox[j].setAttribute("CHECKED","");
}
else{
checkBox[j].removeAttribute("CHECKED");
checkBox[j].setAttribute("UNCHECKED","");
}
}
}
document.getElementById('dedupeFormContent').innerHTML = document.getElementById('dedupediv').innerHTML;
}
function getIframeContent() {
iframeObjDoc = getIframeDocument(document.getElementById("dedupeIframe"));
var serverResponse = iframeObjDoc.body.innerHTML;
document.getElementById('dedupediv').innerHTML = serverResponse;
iframeObjDoc.body.innerHTML ="";
dedupeClusterOnload();
}
function getIframeDocument(iframe)
{
if (iframe.contentDocument) {
return iframe.contentDocument;
}
else if (iframe.contentWindow) {
return iframe.contentWindow.document;
}
else if (iframe.document) {
return iframe.document;
}
else {
return null;
}
}
function processCluster(url)
{
$('body').append('<div id="transDiv"></div>');
$('#transDiv').css({'position':'absolute'});
$('#transDiv').css({'filter':'alpha(opacity=40)'}).fadeIn();
$('body').append('<div id="dedupediv" class="dedupePopUpHidden"></div>');
document.getElementById("clusterIndicator").value = "1";
if(!document.getElementById("dedupeIframe")){
$('body').append('<iframe id="dedupeIframe" style="display:hidden;" src="" onload="getIframeContent()"></iframe>');
}
document.getElementById("dedupeIframe").src=url;
$('#dedupediv').fadeIn();
saveCheckBoxes(document.getElementById("citeForm"));
}
function deDupeSubmit(formName){
var formatname = document.getElementById("dedupeDropDown");
var formatvalue= formatname.options[formatname.selectedIndex].value;
if(formatvalue == 0 )
formatname.setAttribute("class","dedupeSelectTextRed");
else
formatname.setAttribute("class","dedupeSelectTextGreen");
saveCheckBoxes(document.getElementById("citeForm"));
var procUrl = document.getElementById("dedupeProcUrl").value
+ formatvalue
+ "&taggedDocs=" + document.citeForm.taggedDocs.value;
window.location.href = procUrl ;
}
function dedupeClusterOnload(){
var k= 0;
var dedupeSpans = document.getElementsByTagName('span');
loadArray(parent.document.citeForm.taggedDocs.value);
for(var i = 0, l = dedupeSpans.length; i < l; i++){
if( dedupeSpans[i].id.substr(0,1) == "A" ){
k = dedupeSpans[i].id.substr(1) - 1;
if (dedupeSpans[i].childNodes[0].type == "checkbox"){
if(anssetArray[k] == 1){
dedupeSpans[i].childNodes[0].checked = true;
}
else{
dedupeSpans[i].childNodes[0].checked = false;
}
}
}
}
}
function addSimilarityDets(obj){
newExpLead = document.getElementById("clusterLead");
newShadowCnt = document.getElementById("clusterShadow");
if(newExpLead){
obj.href = obj.href + "&expLead="+newExpLead.value;
if(newShadowCnt){
obj.href = obj.href +"&shadowcount="+newShadowCnt.value;
}
}
return false;
}
function restoreViewOption()
{
var loc="uri";
var args = getWf(loc,window.location.href);
var format="";
if (args._fmtstr)
format = args._fmtstr;
if(format=='CITE' || format=='XCITE'){
$('select[name*="dropList"]').find("option[text='Cite']").attr("selected","selected");
}
if(format=='FULL'){
$('select[name*="dropList"]').find("option[text='Full']").attr("selected","selected");
}
if(format=='VKWIC' || format=='SKWIC'){
$('select[name*="dropList"]').find("option[text*='KWIC']").attr("selected","selected");
}
if(format=='BRIEF'){
$('select[name*="dropList"]').find("option[text*='Brief']").attr("selected","selected");
}
if(format=='DIGEST'){
$('select[name*="dropList"]').find("option[text='Digest']").attr("selected","selected");
}
if(format=='CUSTOM'){
$('select[name*="dropList"]').find("option[text*='Custom']").attr("selected","selected");
}
if(format=='TTOCHITS'){
$('select[name*="dropList"]').find("option[text*='Hits']").attr("selected","selected");
}
if(format=='TOC'){
$('select[name*="dropList"]').find("option[text ='TOC']").attr("selected","selected");
}
}
function maxSizeElement(iframeElment){
if($(window).width() < 1020 ){
$('#wrapperDiv').width('1020px');
}
else{
$('#wrapperDiv').width('100%');
}
}
