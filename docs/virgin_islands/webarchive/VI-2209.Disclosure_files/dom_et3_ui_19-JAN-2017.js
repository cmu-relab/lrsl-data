var pToc					= null;
var uncheckedGIF			= new Image();
uncheckedGIF.src			= "/ri/unchecked.gif";
var checkedGIF				= new Image();
checkedGIF.src			= "/ri/checked.gif";
var grayCheckedGIF			= new Image();
grayCheckedGIF.src		        = "/ri/mix_checked.gif";
var disabledGIF				= new Image();
disabledGIF.src			= "/ri/disabled.gif";
var disableSearch			= new Image();
disableSearch.src			="/ri/button_search_inactive.gif";
var nNodeIdLen				= 3;
var _jsErrorPopupDisplayed	        = false;
var _jsErrorMessage                     = "";
var sColorActive			= "#606420";
var sGreyedOutText			= "#808080"
var oAlphabet = new Array("A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z");
var MSG_noTocSearchTerm = "Please enter one or more terms to search this Table of Contents and try again."
function tocOnSubmitHandler(form) {
var doSubmit = true;
var elem = document.getElementById("tocSrchBtn");
if(pToc.tcOut(form)) {
if(elem) {
elem.src = disableSearch.src;
elem.alt = "Your search is being processed, please wait.";
elem.disabled = true;
}
} else {
doSubmit = false;
}
return doSubmit;
}
function jsTrim(sString)
{
sString = sString.replace(/^(\s+)/, "");
sString = sString.replace(/(\s+)$/, "");
return sString;
}
function checkJavascriptError(oError)
{
var pObj = pToc ? pToc : pTocHits;
if(pObj)
{
if(pObj.iDebug > 0)
{
alert(oError.description);//only works in IE
}
}
if (!_jsErrorPopupDisplayed )
{
alert('Warning: An error may have occurred.  It may affect your task.');
if ( oError && oError.description) {
_jsErrorMessage = "JS ERROR: " + oError.description;
}
else {
_jsErrorMessage = "JS ERROR has occurred";
}
_jsErrorPopupDisplayed = true;
}
return;
}
function ETTOC()
{
this.sFormActionURL	= ""
this.oCBArray			= new Array(0);
this.otfPersist		= new Array(0);
this.Persist			= false;
this.oWorkForm		= null;
this.sTCSrchCheck		= 0;
this.sTCSrchType		= "";
this.bFramesPage		= false;
this.bDivFlag			= false;
this.oPageCover		= null;
this.oLoadPage		= null
this.sTOCBrowsePath	= "";
this.sDOCQS			= "";
this.sXlinkPath		= "";
this.oMultiExpand		= null;
this.iDebug			= 0;
this.debugString		= "";
this.oMenu			= null;
this.oDeliveryForm	= null;
this.initializeElements			= initializeElements;
this.initializeDIV				= initializeDIV;
this.initializeForm				= initializeForm;
this.scrollToAnchor                           = scrollToAnchor;
this.tcOut						= stopProcess;
this.tcFormSubmit					= tcFormSubmit;
this.copyFormToWorkForm			= copyFormToWorkForm;
this.searchFormSubmit				= searchFormSubmit;
this.formToTOC					= formToTOC;
this.opnNd						= opnNd;
this.clsNd						= clsNd;
this.tc2dc						= tc2dc;
this.rtc2dc						= rtc2dc;
this.tocToDoc						= tocToDoc;
this.xlinkToc						= xlinkToc;
this.toggleSearchSelectedOnly		= toggleSearchSelectedOnly;
this.getSrchCheckedValue			= getSrchCheckedValue;
this.removeElement				= removeElement;
this.perFieldValue				= perFieldValue;
this.setPrimeFields				= setPrimeFields;
this.addToTFPersistArray			= addToTFPersistArray;
this.submitForm					= submitForm;
this.submitDelivery				= submitDelivery;
this.createHiddenField			= createHiddenField;
this.cbHandler					= cbHandler;
this.checkMe						= checkMe;
this.unCheckMe					= unCheckMe;
this.isDecendantChecked			= isDecendantChecked;
this.isChecked					= isChecked;
this.removeFromCBArray			= removeFromCBArray;
this.addToCBArray					= addToCBArray;
this.getParents					= getParents;
this.getSiblings					= getSiblings;
this.alterSelfChildren			= alterSelfChildren;
this.getNextTableSibling			= getNextTableSibling;
this.getNodeTextValue				= getNodeTextValue;
this.getNodeLevel					= getNodeLevel;
this.clearAllCheckboxes			= clearAllCheckboxes;
this.checkSearchSelCBox			= checkSearchSelCBox;
this.setCheckboxImg				= setCheckboxImg;
this.setCommonPathAndQS			= setCommonPathAndQS;
this.setCommonDocQS				= setCommonDocQS;
this.setXlinkQS					= setXlinkQS;
this.toggleSearchType				= toggleSearchType;
this.changeAdvancedLinkPath		= changeAdvancedLinkPath;
this.toggleSearchWithin			= toggleSearchWithin;
this.setNodeTitle					= setNodeTitle;
this.objTitleDiv = null;
this.showTipTimer = null;
this.hideTipTimer = null;
this.tipDuration = null;
this.setTitleVisible              = setTitleVisible;
this.removeNodeTitle          = removeNodeTitle;
this.setStatusSearchWithinSources = setStatusSearchWithinSources;
this.submitIndexTocLink = submitIndexTocLink;
this.getPersistValuesForIndexTocToggle = getPersistValuesForIndexTocToggle;
}
function initializeDIV()
{
this.bDivFlag = true;
this.oPageCover = document.getElementById("pageCover");
this.oLoadPage = document.getElementById("loadingDiv");
if(this.oPageCover == null || this.oLoadPage == null)
{
this.bDivFlag = false;
return;
}
this.oLoadPage.style.display = "";
this.oPageCover.style.display = "none";
return;
}
function initializeElements(sWorkFormID, bFramesPage, iDebug, bMultiExpand)
{
try
{
this.iDebug = iDebug;
this.oWorkForm = document.getElementById(sWorkFormID);
if(this.oWorkForm.origselnodes && this.oWorkForm.origselnodes.value != "")
{
this.oCBArray = this.oWorkForm.origselnodes.value.split(",");
}
if(this.oWorkForm.tfPersist && this.oWorkForm.tfPersist.value != "")
{
this.otfPersist = this.oWorkForm.tfPersist.value.split(",");
}
if(bMultiExpand)
{
this.oMenu = new MultiExpand();
}
this.bFramesPage = bFramesPage;
this.Persist = true;
}
catch(e)
{
checkJavascriptError(e);
}
this.tcOut = tcOut;
if(this.bDivFlag)
{
this.oPageCover.style.display = "";
this.oLoadPage.style.display = "none";
if((document.location.hash.charAt(1) == "T") && (navigator.userAgent.toLowerCase().indexOf("safari") == -1))
{
setTimeout("window.location = document.location.hash;",200);
}
}
if(this.iDebug >= 10)
{
alert("origselnodes = " + this.oCBArray);
}
return;
}
function Top(obj)
{
var par = obj;
var posy = 0;
while (par.offsetParent &&
par.offsetParent.tagName != "" &&
par.offsetParent.tagName.toUpperCase() != 'BODY')
{
posy = posy + par.offsetParent.offsetTop;
par = par.offsetParent;
}
return (posy + obj.offsetTop);
}
function findPosY(obj)
{
var curtop = 0;
if (obj.offsetParent) {
while (obj.offsetParent) {
curtop += obj.offsetTop;
obj = obj.offsetParent;
}
}
else if (obj.y)
curtop += obj.y;
return curtop;
}
function scrollToAnchor() {
if (document.location.hash)
{
var anchor = document.location.hash;
anchor = anchor.substring(1,anchor.length);
anchor ="ix_"+anchor;
var Elem = document.getElementById(anchor);
document.body.scrollTop = findPosY(Elem);
} else {
var myExp = /^.*&sNodeID=([A-Z]+)$/;
var uu  = document.location;
var node = myExp.exec(uu);
if (node) {
var anchorNode = document.getElementById("hdr_" + node[1]);
if (anchorNode == null) {
anchorNode = document.getElementById("cap_" + node[1]);
if (anchorNode == null) {
anchorNode = document.getElementById("cape_" + node[1]);
}
}
if (document.getElementById("docbody") == null) {
document.body.scrollTop = Top(anchorNode);
} else {
document.getElementById("docbody").scrollTop = Top(anchorNode) - document.getElementById("docbody").offsetTop;
}
}
}
}
function initializeForm()
{
if(this.Persist)
{
var oImage = document.getElementById("srchSelCbox");
if(oImage && oImage.src == disabledGIF.src)
{
document.getElementById("srchSelComp").style.color = sGreyedOutText;
}
if(this.oWorkForm.tocSearchType)
{
if(!this.oWorkForm.tocSearchType[1].checked)
{
this.sTCSrchType = "bool";
}
else
{
this.sTCSrchType = "free";
}
}
/*
if(this.oWorkForm.tocSearchWithin)
{
if(!this.oWorkForm.tocSearchWithin[1].checked)
{
this.toggleSearchWithin("ft");
}
else
{
this.toggleSearchWithin("toc");
}
}
*/
if(document.location.hash == "" && this.oWorkForm._nSearch)
{
this.oWorkForm._nSearch.focus();
}
}
return;
}
function tcOut(oElement, sFormAction)
{
try
{
if (!this.Persist)
{
return true;
}
this.sTCSrchCheck = this.getSrchCheckedValue(false);
if(oElement.nodeName == "FORM" && oElement.name == "tocbuddy")
{
if(this.sTCSrchCheck == "1" && this.oCBArray.length < 1)
{
alert("Please make selections from the Table of Contents or deselect 'Search Selected Only' checkbox.");
return false;
}
var sSearchType = "";
var sSearchValue = oElement._nSearch.value;
var tocSearchWithinElem = document.getElementsByName("tocSearchWithin");
var isSearchTypeToc =0;
var isSearchTypeSelecterFt=0;
for(x=0; x< tocSearchWithinElem.length;x++){
if(tocSearchWithinElem[x].value == "toc" &&
tocSearchWithinElem[x].checked)
{
isSearchTypeToc=1;
}
if(tocSearchWithinElem[x].value == "ft-selected" &&
tocSearchWithinElem[x].checked)
{
isSearchTypeSelecterFt=1;
}
}
if(isSearchTypeToc ==1)
{
if(!oElement._nSearch || jsTrim(sSearchValue) == "")
{
alert(MSG_noTocSearchTerm);
return false;
}
sSearchType += "toc";
}
else if((!oElement._nSearch || jsTrim(sSearchValue) == "") && this.sTCSrchCheck == "0")
{
alert('Please enter one or more terms to search this Full-text and try again.');
return false;
}else if(isSearchTypeSelecterFt ==1){
if( !(oElement.src1SelCbox.checked ||
oElement.src2SelCbox.checked ||
oElement.src3SelCbox.checked ||
oElement.src4SelCbox.checked ||
oElement.src5SelCbox.checked ||
oElement.src6SelCbox.checked)){
alert("Please check one or more boxes and then click the Search button.");
return false;
}else {
oElement.src1SelCbox.disabled='';
oElement.src2SelCbox.disabled='';
oElement.src3SelCbox.disabled='';
oElement.src4SelCbox.disabled='';
oElement.src5SelCbox.disabled='';
oElement.src6SelCbox.disabled='';
}
}
if(this.sTCSrchCheck == "1")
{
sSearchType += "sel";
}
sSearchType += (oElement.tocSearchType[0].checked) ? "bool" : "free";
if(sSearchType == "selfree" && jsTrim(sSearchValue) == "")
{
sSearchType = "selbool";
}
this.sTCSrchType = sSearchType;
if(sSearchType == "free" || sSearchType == "bool")
{
sFormAction = "/research/search/source/tocbuddy"
}
else
{
sFormAction = "/research/search/" + sSearchType
}
if(sSearchType.indexOf("free") >= 0)
{
this.createHiddenField("nSvc","fr",oElement);
this.createHiddenField("_query",oElement.frquery.value,oElement);
}
else
{
this.createHiddenField("nSvc","bl",oElement);
this.createHiddenField("_query",oElement.blquery.value,oElement);
}
this.perFieldValue(false);
if(this.iDebug >= 5)
{
alert(this.debugString);
this.debugString = "";
}
this.oWorkForm.action = sFormAction;
}
else if(oElement.nodeName == "A")
{//For anchors we only need to perform test.  If return true, page will call
oElement.style.color = sColorActive;
if(typeof sFormAction == "undefined" || sFormAction == "")
{
sFormAction = oElement.href;
}
if((sFormAction.search(/\/research\/del\/(print|download|fax|email|fastPrintProc)/) >= 0) ||
(sFormAction.search(/\/research2\/delivery\/(printCpp|downloadCpp|faxCpp|emailCpp)/) >= 0) ||
(sFormAction.search(/\/research2\/fastprint\/submitCpp/) >= 0))
{
if(this.oCBArray.length < 1 || this.oCBArray[0] == "")
{
alert("Print, Download, Fax and Email apply only to selected documents.  If you want to print the Table of Contents displayed on this page, use View in a Printer Friendly Format.");
return false;
}
this.bIsDelivery = true;
if(this.oDeliveryForm)
{
this.removeElement(this.oDeliveryForm);
this.oDeliveryForm = null;
}
this.oDeliveryForm = document.createElement("FORM");
this.oDeliveryForm.setAttribute("name", "Delivery");
this.oDeliveryForm.setAttribute("action", "/research/search/source/tocbuddy");
this.oDeliveryForm.setAttribute("target", "");
this.oDeliveryForm.setAttribute("method", "get");
document.body.appendChild(this.oDeliveryForm);
}
}
}
catch(e)
{
checkJavascriptError(e);
return false;
}
return true;
}
function tcFormSubmit(oElement, sForm, urlString)
{
var oSubmitForm;
try
{
if(this.bIsDelivery)
{
oSubmitForm = this.oDeliveryForm;
this.setPrimeFields(oSubmitForm)
}
else
{
this.perFieldValue(true);
oSubmitForm = this.oWorkForm;
}
if(sForm)
{
var oForm = document.forms[sForm];
if(oForm)
{
if(oForm.target)
{
oSubmitForm.target = oForm.target;
}
this.copyFormToWorkForm(oForm, oSubmitForm);
}
}
else if(oElement.target)
{
oSubmitForm.target = oElement.target;
}
else
{
oSubmitForm.target = "";
}
if(this.iDebug >= 5)
{
alert(this.debugString);
this.debugString = "";
}
if ( urlString ) {
this.sFormActionURL = urlString;
}
else {
this.sFormActionURL = oElement.href;
}
}
catch(e)
{
checkJavascriptError(e);
}
if(this.bIsDelivery)
{
oElement.href = "javascript:void(0);";
this.bIsDelivery = false;
this.submitDelivery();
}
else
{
this.submitForm();
}
return;
}
function copyFormToWorkForm(fromClone, toForm)
{
var sFieldType, sFieldName, sFieldValue;
for(var x=0; x<fromClone.elements.length; x++)
{
sFieldType = fromClone.elements[x].type;
if(sFieldType.toLowerCase() == "hidden")
{
sFieldName = fromClone.elements[x].name;
sFieldValue = fromClone.elements[x].value;
this.createHiddenField(sFieldName,sFieldValue,toForm,fromClone.elements[x].disabled);
}
}
return;
}
function searchFormSubmit(formName)
{
try
{
var searchWithin = (document.getElementsByName("toggleToFt").length ? "toc" : "ft");
var searchValue = jsTrim(this.oWorkForm._search.value);
if ( _clickedSrchBtn && (searchWithin == "toc") && (searchValue == "") ) {
alert(MSG_noTocSearchTerm);
_clickedSrchBtn = 0;
return false;
}
this.sTCSrchCheck = this.getSrchCheckedValue(false);
if (this.sTCSrchCheck == "1" && searchWithin == "ft")
{
this.sTCSrchType = (this.oWorkForm.name == "bool") ? "selbool" : "selfree";
if (this.sTCSrchType == "selfree" && this.oWorkForm._search)
{
if (searchValue == "")
{
this.sTCSrchType = "selbool";
if (this.oWorkForm._query && this.oWorkForm.blquery)
{
this.oWorkForm._query.value = this.oWorkForm.blquery;
}
this.oWorkForm.svc.value = "bl";
this.oWorkForm._form.value = "bool";
}
}
this.oWorkForm.action = "/research/search/" + this.sTCSrchType;
}
}
catch(e)
{
checkJavascriptError(e);
}
if(this.iDebug >= 5)
{
alert(this.oWorkForm.action)
}
return true;
}
function formToTOC(sURL)
{
try
{
var sFormAction = sURL;
this.sTCSrchCheck = this.getSrchCheckedValue(false);
if (sURL && sURL != "" && this.oWorkForm.name)
{
var sNewUrl = sURL.toString().replace(/(#[^#]*)$/, "");
var sURLAnchor = "";
if (sNewUrl != sURL)
{
sURLAnchor = RegExp.$1;
sFormAction = sNewUrl;
}
if (this.oWorkForm.svc)
{
fvalue = "";
if (this.oWorkForm.svc.value == "fr")
{
this.sTCSrchType = "free";
}
else if (this.oWorkForm.svc.value == "bl" )
{
this.sTCSrchType = "bool";
}
}
this.perFieldValue(true);
if (sURLAnchor != "")
{
sFormAction += sURLAnchor;
}
}
if(this.iDebug >= 5)
{
alert(this.debugString);
this.debugString = "";
}
}
catch(e)
{
checkJavascriptError(e);
}
this.sFormActionURL = sFormAction;
this.submitForm();
return false;
}
function opnNd(sNodeID, nNodeLvl, nExpNodeLvl, bMultiExpand)
{
try
{
var sAction;
if(navigator.userAgent.toLowerCase().indexOf("safari") == -1) {
sAction = this.sTOCBrowsePath + "#" + sNodeID
} else {
sAction = this.sTOCBrowsePath + "&sNodeID=" + sNodeID
}
this.sTCSrchCheck = this.getSrchCheckedValue(false);
this.perFieldValue(true);
var contdNode = document.getElementById("contd_" + sNodeID);
if(contdNode)
{
this.createHiddenField("tccontd","1", this.oWorkForm);
}
if(nExpNodeLvl == null)
{
nExpNodeLvl = 1;
}
if(bMultiExpand)
{
this.createHiddenField("tcFrME","1", this.oWorkForm);
}
this.createHiddenField("tcNav","open", this.oWorkForm);
this.createHiddenField("tcact","open", this.oWorkForm);
this.createHiddenField("tcnid",sNodeID, this.oWorkForm);
this.createHiddenField("tclevel",nNodeLvl, this.oWorkForm);
this.createHiddenField("tcexplevel",nExpNodeLvl, this.oWorkForm);
if(nNodeLvl == 1)
{
this.createHiddenField("tcbill","1", this.oWorkForm);
}
this.createHiddenField("al",sNodeID, this.oWorkForm);
this.createHiddenField("tcaid",sNodeID, this.oWorkForm);
if(this.oMenu)
{
this.oMenu.hideMeDiv();
}
if(this.iDebug >= 5)
{
alert(this.debugString);
this.debugString = "";
}
if(this.bFramesPage)
{
this.oWorkForm.target = "_self"
}
}
catch(e)
{
checkJavascriptError(e);
}
this.sFormActionURL = sAction;
var myTimer = setTimeout("pToc.submitForm()", 1);
return;
}
function clsNd(sNodeID, nNodeLvl, bMultiExpand)
{
try
{
this.sTCSrchCheck = this.getSrchCheckedValue(false);
this.perFieldValue(true);
if(bMultiExpand)
{
this.createHiddenField("tcFrME","1", this.oWorkForm);
}
this.createHiddenField("tcNav","close", this.oWorkForm);
this.createHiddenField("tcact", "close", this.oWorkForm);
this.createHiddenField("tcnid", sNodeID, this.oWorkForm);
this.createHiddenField("al", sNodeID, this.oWorkForm);
this.createHiddenField("tclevel", nNodeLvl, this.oWorkForm);
if(nNodeLvl > 1)
{
this.createHiddenField("tcaid", sNodeID, this.oWorkForm);
if(navigator.userAgent.toLowerCase().indexOf("safari") == -1) {
this.sTOCBrowsePath += "#" + sNodeID;
} else {
this.sTOCBrowsePath += "&sNodeID=" + sNodeID;
}
}
else
{
this.createHiddenField("tcaid", "", this.oWorkForm);
}
if(this.oMenu)
{
this.oMenu.hideMeDiv();
}
if(this.iDebug >= 5)
{
alert(this.debugString);
this.debugString = "";
}
if(this.bFramesPage)
{
this.oWorkForm.target = "_self"
}
}
catch(e)
{
checkJavascriptError(e);
}
this.sFormActionURL = this.sTOCBrowsePath;
var myTimer = setTimeout("pToc.submitForm()", 1);
return;
}
function chClr(oLink)
{
if ( oLink ) {
oLink.style.color = sColorActive;
}
return true;
}
function tc2dc(sNodeID, sLNI, sRefPt, sProcOrNobill, t,caption, oLink)
{
return this.tocToDoc(sNodeID, sLNI, sRefPt, sProcOrNobill, "/research/search/toctodoc",caption);
}
function rtc2dc(sNodeID, sLNI, sRefPt, sProcOrNobill, t, oLink)
{
return this.tocToDoc(sNodeID, sLNI, sRefPt, sProcOrNobill, "/research/tocreturn");
}
function tocToDoc(sNodeID, sLNI, sRefPt, sProcOrNobill, path,caption)
{
try
{
this.sTCSrchCheck = this.getSrchCheckedValue(false);
this.perFieldValue(true);
this.createHiddenField("tcsvrnid", sNodeID, this.oWorkForm);
if (sLNI != "")
{
this.createHiddenField("tclni", sLNI, this.oWorkForm);
}
if (sRefPt != "")
{
this.createHiddenField("tcrefpt", sRefPt, this.oWorkForm);
}
if (sProcOrNobill == "2")
{
this.createHiddenField("tcwchProc", sProcOrNobill, this.oWorkForm);
}
else if (sProcOrNobill == "1")
{
this.createHiddenField("tcnobill", sProcOrNobill, this.oWorkForm);
}
if(caption != ""){
this.createHiddenField("tccaption",caption,this.oWorkForm);
}
if(this.iDebug >= 5)
{
alert(this.debugString);
this.debugString = "";
}
}
catch(e)
{
checkJavascriptError(e);
}
this.sFormActionURL = path + this.sDOCQS;
if ( _jsErrorPopupDisplayed ) {
this.sFormActionURL += "&jserr=" + _jsErrorMessage;
}
this.submitForm(path + this.sDOCQS);
return false;
}
function xlinkToc(sNodeId)
{
var sHREF = this.sXlinkPath + "&tcnid=" + sNodeId;
if(this.iDebug >= 5)
{
alert(sHREF);
}
openFormhelp(sHREF,'formhelp',350,375,1);
return;
}
function toggleSearchSelectedOnly()
{
this.sTCSrchCheck = this.getSrchCheckedValue(true);
if(this.sTCSrchCheck  == 1)
{
this.sTCSrchCheck = "0";  // will be unchecked
}
else if(this.sTCSrchCheck == 0)
{
this.sTCSrchCheck = "1";  // will be checked
}
if(this.iDebug >= 1 && this.sTCSrchCheck == -1)
{
alert("** unexpected 'Search Selected only' value="+cboxStatus);
}
this.createHiddenField("tcsrchcheck", this.sTCSrchCheck, this.oWorkForm);
this.createHiddenField("srchSelImg", "1", this.oWorkForm);
if(this.iDebug >= 5)
{
alert(this.debugString);
this.debugString = "";
}
this.oWorkForm.submit();
return;
}
function getSrchCheckedValue(bGetDisabled)
{
var oCBImage = document.getElementById("srchSelCbox");
if(!oCBImage) return 0;
if(oCBImage.src == checkedGIF.src || oCBImage.src.indexOf(checkedGIF.src) != -1)
{
return 1;
}
else if(bGetDisabled && (oCBImage.src == disabledGIF.src || oCBImage.src.indexOf(disabledGIF.src) != -1))
{
return -1
}
else
{
return 0;
}
}
function perFieldValue(bLinkSubmit)
{
var sFieldValue = "";
var sFieldName = "";
var oFieldArray = this.oWorkForm.elements;
var oCurField = null
var sDeleteField = "";
var nFieldLength = oFieldArray.length-1;
for(var x=nFieldLength; x>=0; x--)
{
oCurField = oFieldArray[x];
sFieldName = oCurField.name;
if(oCurField.type != "hidden")
{
sFieldName = "tcp" + sFieldName;
if(oCurField.type == "checkbox")
{
if(oCurField.checked)
{
sFieldValue = oCurField.value;
}
else
{
sFieldValue = "";
}
}
else if(oCurField.type == "radio")
{
if(oCurField.checked)
{
sFieldValue = oCurField.value;
}
else
{
continue;
}
}
else if(oCurField.nodeName == "SELECT")
{
sFieldValue = oCurField.options[oCurField.selectedIndex].value;
}
else
{
sFieldValue = oCurField.value;
}
this.createHiddenField(sFieldName, sFieldValue, this.oWorkForm);
}
else if(bLinkSubmit && sFieldName.substring(0, 3) != "tcp" && sFieldName != "origselnodes")
{
this.removeElement(this.oWorkForm.elements[x])
}
}
if(this.otfPersist.length > 0)
{
sFieldValue = this.otfPersist.join(",");
}
else
{
sFieldValue = "";
}
this.createHiddenField("tfPersist", sFieldValue, this.oWorkForm);
if(this.oWorkForm.name == "tocbuddy")
{
this.setPrimeFields(this.oWorkForm);
}
return true;
}
function setPrimeFields(oForm)
{
if(this.oCBArray.length > 0)
{
sFieldValue = this.oCBArray.join(",");
}
else
{
sFieldValue = "";
}
this.createHiddenField("tcselnodes", sFieldValue, oForm);
this.createHiddenField("tcsrchcheck", this.sTCSrchCheck, oForm);
this.createHiddenField("tcsrchtype", this.sTCSrchType, oForm);
}
function createHiddenField(sName, sValue, oForm, bDisabled)
{
if (! bDisabled) {
bDisabled=false;
}
var oTextbox = null;
var bFieldFound = false;
for(x=0; x<oForm.elements.length; x++)
{
if(oForm.elements[x].name == sName)
{
oTextbox = oForm.elements[x];
bFieldFound = true;
break;
}
}
if(!bFieldFound)
{
oTextbox = document.createElement("INPUT");
oTextbox.setAttribute("type", "hidden");
oTextbox.setAttribute("name", sName);
oForm.appendChild(oTextbox);
this.addToTFPersistArray(sName);
}
oTextbox.disabled=bDisabled;
oTextbox.setAttribute("value", sValue);
if(this.iDebug >= 5)
{
this.debugString += sName + "=" + sValue + "\n";
}
return;
}
function addToTFPersistArray(sFieldName)
{
if (!this.otfPersist) {
return;
}
var oHoldArray = new Array(0);
var y = 0;
for(var x=0; x<this.otfPersist.length; x++)
{
if(this.otfPersist[x] != sFieldName)
{
oHoldArray[y++] = this.otfPersist[x];
}
}
oHoldArray[y] = sFieldName;
this.otfPersist = oHoldArray.sort();
return;
}
function submitForm()
{
this.oWorkForm.action = this.sFormActionURL;
this.oWorkForm.submit();
return true;
}
function submitDelivery()
{
this.oDeliveryForm.action = this.sFormActionURL;
setFields(this.oDeliveryForm, this.oDeliveryForm.delformat,
this.sFormActionURL);
this.oDeliveryForm.submit();
unsetFields(this.oDeliveryForm, this.oDeliveryForm.delformat,
this.sFormActionURL);
return true;
}
function removeElement(oField)
{
if(oField)
{
var oParentElement = oField.parentNode;
oParentElement.removeChild(oField);
}
return;
}
function cbHandler(sNodeID)
{
try
{
if(this.isChecked(sNodeID))
{
this.unCheckMe(sNodeID);
}
else
{
this.checkMe(sNodeID);
}
if(this.iDebug >= 10)
{
alert("tcselnodes = " + this.oCBArray)
}
}
catch(e)
{
checkJavascriptError(e);
}
return;
}
function checkMe(sNodeID)
{
var sHighestChkdNode = sNodeID;
var oSiblingNodes = this.getSiblings(sNodeID);
var oParentNodes = this.getParents(sNodeID);
var nNumChkdSibs, nNumSibs, oCurNodeCB, x, y, oParentNodes;
var oHoldArray = new Array(0);
var bPrevParentChckd = true;
this.alterSelfChildren(sNodeID, "check")
for(x=0; x<oParentNodes.length; x++)
{
if(oParentNodes[x] == "")
{
break;
}
nNumChkdSibs = 0;
nNumSibs = oSiblingNodes.length;
if(bPrevParentChckd)
{
for(y=0; y<oSiblingNodes.length; y++)
{
if(this.isChecked(oSiblingNodes[y]))
{
nNumChkdSibs++;
}
}
oSiblingNodes = this.getSiblings(oParentNodes[x]);
}
oCurNodeCB = document.getElementById("ix_" + oParentNodes[x]);
if(bPrevParentChckd && nNumSibs == nNumChkdSibs)
{
this.setCheckboxImg(oCurNodeCB,"check");
sHighestChkdNode = oParentNodes[x];
bPrevParentChckd = true;
}
else
{
this.setCheckboxImg(oCurNodeCB,"grayCheck");
bPrevParentChckd = false;
}
}
this.addToCBArray(sHighestChkdNode);
this.setCheckboxImg(document.getElementById("srchSelCbox"),"check");
return;
}
function unCheckMe(sNodeID)
{
var sHighestChkdNode = "";
var oHighestChkdNode = null;
var oSiblingNodes = this.getSiblings(sNodeID);
var oParentNodes = this.getParents(sNodeID);
var sCurNodeID = sNodeID;
var oCurNode = document.getElementById(sNodeID);
var bIsGrayChecked = false;
var oCurNodeCB, nNumChkdSibs;
this.alterSelfChildren(sNodeID, "uncheck");
this.removeFromCBArray(sCurNodeID, true);
for(x=0; x<oParentNodes.length; x++)
{
for(y=0; y<oSiblingNodes.length; y++)
{
if(this.isChecked(oSiblingNodes[y]))
{
this.addToCBArray(oSiblingNodes[y]);
}
}
this.removeFromCBArray(oParentNodes[x], false);
oCurNodeCB = document.getElementById("ix_" + oParentNodes[x]);
if(bIsGrayChecked || this.isDecendantChecked(oParentNodes[x]))
{
this.setCheckboxImg(oCurNodeCB,"grayCheck");
bIsGrayChecked = true;
}
else
{
this.setCheckboxImg(oCurNodeCB,"uncheck");
}
if((x+1) != oParentNodes.length)
{
oSiblingNodes = this.getSiblings(oParentNodes[x]);
}
}
if(this.oCBArray.length == 0)
{
this.setCheckboxImg(document.getElementById("srchSelCbox"),"disabled");
}
return;
}
function isDecendantChecked(sNodeID)
{
for(var x=0; x<this.oCBArray.length; x++)
{
if(this.oCBArray[x].indexOf(sNodeID) == 0)
{
return true;
}
}
return false;
}
function isChecked(sNodeID)
{
var sCurCBox
for(var x=0; x<this.oCBArray.length; x++)
{
for(var y=sNodeID.length; y>1; y-=nNodeIdLen)
{
if(this.oCBArray[x] == sNodeID.substring(0, y))
{
return true;
}
}
}
return false;
}
function removeFromCBArray(sNodeID, bKillDecendents)
{
var oHoldArray = new Array(0);
var y = 0;
for(var x=0; x<this.oCBArray.length; x++)
{
if((bKillDecendents && this.oCBArray[x].indexOf(sNodeID) < 0 && this.oCBArray[x] != "")
|| (!bKillDecendents && this.oCBArray[x] != sNodeID && this.oCBArray[x] != ""))
{
oHoldArray[y] = this.oCBArray[x];
y++;
}
}
if(oHoldArray.length > 0)
{
this.oCBArray = oHoldArray.sort();
}
else
{
this.oCBArray = oHoldArray;
}
return;
}
function addToCBArray(sNodeID)
{
var oHoldArray = new Array(0);
var y = 0;
for(var x=0; x<this.oCBArray.length; x++)
{
if(this.oCBArray[x].indexOf(sNodeID) < 0 && this.oCBArray[x] != "")
{
oHoldArray[y] = this.oCBArray[x];
y++;
}
}
oHoldArray[y] = sNodeID;
this.oCBArray = oHoldArray.sort();
return;
}
function getParents(sNodeID)
{
var x = sNodeID.length-nNodeIdLen;
var y = 0;
var sParentNodeID = sNodeID.substring(0, x);
var oParentNodes = new Array(0);
while(x > 1)
{
oParentNodes[y++] = sParentNodeID;
x -= nNodeIdLen;
sParentNodeID = sNodeID.substring(0, x);
}
return oParentNodes;
}
function getSiblings(sNodeID)
{
var oSiblingNodes = null;
var nNodeLevel = this.getNodeLevel(sNodeID);
if(nNodeLevel > 1)
{
var sCurNlvl, oLvlArray;
var sParentNodeID, sHoldSiblingNode;
var nFirstCharIndex, nSecondCharIndex, nThirdCharIndex;
var nArrayIndex = 0;
var nStartIndex = 1;
sParentNodeID = sNodeID.substring(0, (sNodeID.length-nNodeIdLen));
sCurNlvl = getNodeTextValue(document.getElementById("nlvl_" + sParentNodeID));
oLvlArray = sCurNlvl.split("|");
nNumSiblings = oLvlArray[0]-1;
oSiblingNodes = new Array(nNumSiblings);
for(nFirstCharIndex=0; nFirstCharIndex<26; nFirstCharIndex++)
{
for(nSecondCharIndex=0; nSecondCharIndex<26; nSecondCharIndex++)
{
for(nThirdCharIndex=nStartIndex; nThirdCharIndex<26; nThirdCharIndex++)
{
sHoldChildNode = sParentNodeID + oAlphabet[nFirstCharIndex] + oAlphabet[nSecondCharIndex] + oAlphabet[nThirdCharIndex];
if (sHoldChildNode != sNodeID)
{
oSiblingNodes[nArrayIndex] = sHoldChildNode
nArrayIndex++;
}
if(nArrayIndex == nNumSiblings)
{
break;
}
}
if(nArrayIndex == nNumSiblings)
{
break;
}
nStartIndex=0;
}
if(nArrayIndex == nNumSiblings)
{
break;
}
}
}
return oSiblingNodes;
}
function alterSelfChildren(sNodeID, sState)
{
var oChildrenNodes = new Array(0);
var oImgArray = document.getElementsByName("TOCCheckbox");
var y = 0;
var sCBNodeID
for(var x=0; x<oImgArray.length; x++)
{
sCBNodeID = oImgArray[x].id;
sCBNodeID = sCBNodeID.substring(3, sCBNodeID.length);
if(sCBNodeID.indexOf(sNodeID) >= 0)
{
this.setCheckboxImg(oImgArray[x],sState);
}
}
return;
}
function getNextTableSibling(oCurNode)
{
oCurNode = oCurNode.nextSibling;
if(oCurNode == null)
{
return null;
}
else if(oCurNode.nodeName != "TR")
{
oCurNode = this.getNextTableSibling(oCurNode);
}
return oCurNode;
}
function getNodeLevel(sNodeID)
{
return (sNodeID.length-1)/nNodeIdLen;
}
function clearAllCheckboxes()
{
try
{
var imgArray = document.getElementsByName("TOCCheckbox")
this.oCBArray = new Array(0);
this.setCheckboxImg(document.getElementById("srchSelCbox"),"disabled");
for(var x=0; x<imgArray.length; x++)
{
this.setCheckboxImg(imgArray[x],"uncheck");
}
}
catch(e)
{
checkJavascriptError(e);
}
return false;
}
function checkSearchSelCBox(oCBImage)
{
try
{
if(oCBImage.src.indexOf(disabledGIF.src)<0)
{
if(oCBImage.src.indexOf(uncheckedGIF.src)<0)
{
this.setCheckboxImg(oCBImage, "uncheck");
}
else
{
this.setCheckboxImg(oCBImage, "check");
}
}
}
catch(e)
{
checkJavascriptError(e);
}
return;
}
function setCheckboxImg(oImage, sState)
{
if(sState == "check")
{
oImage.src = checkedGIF.src;
if(oImage.getAttribute("ID") == "srchSelCbox")
{
document.getElementById("srchSelComp").style.color = "#000000";
oImage.alt = "Checked - search selected only";
}
else
{
oImage.alt = "Checked - check for searching or delivery";
}
}
else if(sState == "uncheck")
{
oImage.src = uncheckedGIF.src;
if(oImage.getAttribute("ID") == "srchSelCbox")
{
document.getElementById("srchSelComp").style.color = "#000000";
oImage.alt = "Unchecked - search selected only";
}
else
{
oImage.alt = "Not Checked";
}
}
else if(sState == "disabled")
{
oImage.src = disabledGIF.src;
document.getElementById("srchSelComp").style.color = sGreyedOutText;
oImage.alt = "Disabled - search selected only";
}
else
{
oImage.src = grayCheckedGIF.src;
oImage.alt = "Mixed - check for searching or delivery";
}
return;
}
function setCommonPathAndQS(path)
{
this.sTOCBrowsePath = path;
return;
}
function setCommonDocQS(path)
{
this.sDOCQS += path;
return;
}
function setXlinkQS(path)
{
this.sXlinkPath = path;
return;
}
function toggleSearchType(sSearchType)
{
try
{
var oSpanBool = document.getElementById("boolSpId");
var oSpanFree = document.getElementById("freeSpId");
this.sTCSrchType = sSearchType;
if(oSpanBool && oSpanFree && this.oWorkForm.tocSearchType)
{
var sBool = "Terms and Connectors ";
var sFree = "Natural Language ";
var sNeg = "Not "
var sPress = "Pressed"
if(sSearchType == "free")
{
this.oWorkForm.tocSearchType[0].title = sBool + sNeg + sPress
oSpanBool.title = sBool + sNeg + sPress
this.oWorkForm.tocSearchType[1].title = sFree + sPress
oSpanFree.title = sFree + sPress
}
else
{
this.oWorkForm.tocSearchType[0].title = sBool + sPress
oSpanBool.title = sBool + sPress
this.oWorkForm.tocSearchType[1].title = sFree + sNeg + sPress
oSpanFree.title = sFree + sNeg + sPress
}
}
}
catch(e)
{
checkJavascriptError(e);
}
return;
}
function changeAdvancedLinkPath(searchType)
{
if(searchType != "")
{
var oLink = document.getElementById("advance");
if (oLink && oLink.href)
{
var searchTypeRegx = "$1" + searchType + "$3";
oLink.href = oLink.href.replace(/(\/research\/form\/)(\w)+(\?|$)/, searchTypeRegx);
return true;
}
}
return false;
}
function toggleSearchWithin(type)
{
try
{
var swTextElem  = document.getElementById("swtext");
var advLinkElem = document.getElementById("advanced");
if(!swTextElem || !advLinkElem)
{
return;
}
if(type == "ft")
{
swTextElem.innerHTML = "full text";
advLinkElem.style.visibility = "visible";
}
else
{
swTextElem.innerHTML = "Table of Contents";
advLinkElem.style.visibility = "hidden";
}
}
catch(e)
{
checkJavascriptError(e);
}
return;
}
function setNodeTitle(pNode, truncText, objEvent)
{
if (!objEvent)
objEvent = window.event;
if (pNode)
{
var text = this.getNodeTextValue(pNode);
var nIdx = text.lastIndexOf("...");
if (nIdx >= 0)
{
var oText = text;
text = oText.slice(0, nIdx);
}
var fullTitle = text + truncText;
var pageWidth = document.body.clientWidth;
var pageTopPosition = 0;
if (document.body.scrollTop)
var pageTopPosition = document.body.scrollTop;
else if (window.pageXOffset)
var pageTopPosition = window.pageXOffset;
var pageBottomPosition = pageTopPosition + document.body.clientHeight;
var tooltipXposition = (objEvent.clientX < (pageWidth * 0.4)) ? objEvent.clientX : (pageWidth * 0.4);
var tooltipYposition = objEvent.clientY + pageTopPosition;
var parentElement = pNode.parentNode;
var linkTop = parseInt(parentElement.offsetTop, 10);
this.tipDuration = (parseInt(fullTitle.length / 20, 10) * 1000);
this.tipDuration = (this.tipDuration > 5000) ? this.tipDuration : 5000;
this.objTitleDiv = document.createElement("div");
this.objTitleDiv.setAttribute("name", "tooltip");
this.objTitleDiv.setAttribute("id", "tooltip");
this.objTitleDiv.style.position = "absolute";
this.objTitleDiv.style.top = (20 + tooltipYposition) + "px";
this.objTitleDiv.style.left = (10 + tooltipXposition) + "px";
this.objTitleDiv.style.font = "normal 12px arial,helvetiva,sans-serif";
this.objTitleDiv.style.color = "#000000";
this.objTitleDiv.style.backgroundColor = "#FFFFE0";
this.objTitleDiv.style.visibility = "hidden";
this.objTitleDiv.style.padding = "2px";
this.objTitleDiv.style.border = "solid 1px black";
var titleNode = document.createTextNode(fullTitle);
this.objTitleDiv.appendChild(titleNode);
document.body.appendChild(this.objTitleDiv);
if ((parseInt(this.objTitleDiv.style.top, 10) + parseInt(this.objTitleDiv.clientHeight, 10)) > pageBottomPosition) {
this.objTitleDiv.style.top = (linkTop - parseInt(this.objTitleDiv.clientHeight, 10)+ 10) + "px";
}
this.showtipTimer = setTimeout("pToc.setTitleVisible()", 500);
pNode.onmouseout = this.removeNodeTitle;
pNode.onclick = this.removeNodeTitle;
}
return;
}
function setTitleVisible()
{
if (pToc.objTitleDiv && pToc.objTitleDiv.style)
{
pToc.objTitleDiv.style.visibility = "visible";
pToc.hidetipTimer = setTimeout("pToc.removeNodeTitle()", pToc.tipDuration);
}
}
function removeNodeTitle()
{
if (pToc.showtipTimer)
{
clearTimeout(pToc.showtipTimer);
pToc.showtipTimer = null;
}
if (pToc.hidetipTimer)
{
clearTimeout(pToc.hidetipTimer);
pToc.hidetipTimer = null;
}
if (pToc.objTitleDiv && pToc.objTitleDiv.style)
{
pToc.objTitleDiv.style.visibility = "hidden";
pToc.objTitleDiv = null;
}
}
function getNodeTextValue(oCurNode)
{
var sTitle = "";
var oChildList = oCurNode.childNodes;
for(var x = 0; x < oChildList.length; x++)
{
if(oChildList[x].nodeType == 1)
{
sTitle += getNodeTextValue(oChildList[x]);
}
else
{
sTitle += oChildList[x].data;
}
}
return sTitle;
}
function stopProcess()
{
if(window.parent.Content.document.readyState
&& window.parent.Content.document.readyState == "complete")
{
var args = stopProcess.arguments;
this.tcOut = tcOut;
return this.tcOut(args);
}
alert("Please wait until your browser has completely loaded the page before interacting with the Table of Contents.");
return false;
}
function createTocHitsUiObj(utils, browser)
{
if(browser.ie5up) {
return new ie5TocHitsUi(utils, browser);
}
if(browser.ie4) {
alert("TOC Hits not supported on Internet Explorer 4");
}
if(browser.nav4) {
alert("TOC Hits not supported on Netscape 4");
}
return new domTocHitsUi(utils, browser);
}
function domTocHitsUi(utils, browser) {
this.pUtils               = utils;
this.pBrowser             = browser;
this.cbStateKey           = "";
this.CBsCleared           = false;
this.chunkedCBsSel        = false;
this.iDebug               = 10;
this.sTOCBrowsePath       = ""
this.sDOCQS               = ""
this.framesOn             = false;
this.tth2dc                  = tth2dc;
this.persistHitCheckboxes    = persistHitCheckboxes;
this.persistHitCheckboxesFoc = persistHitCheckboxesFoc;
this.persistHitCheckboxesFP  = persistHitCheckboxesFP;
this.setCommonDocQS          = setCommonDocQS;
this.setCommonPathAndQS      = setCommonPathAndQS;
this.goToc                   = goToc;
this.getCBData               = getCBData;
this.clearAllCheckboxes      = clearAllTocHitsCheckboxes;
this.setFramesOn             = setFramesOn;
this.updatePersistence       = updatePersistence;
this.setPersistField         = setPersistField;
this.submitForm              = submitForm;
}
function setFramesOn()
{
this.framesOn = true;
}
function updatePersistence(cbStateKey, otherChunkCBSel)
{
this.cbStateKey    = cbStateKey;
this.chunkedCBsSel = otherChunkCBSel;
}
function persistHitCheckboxes(pAnchor, path, loc) {
var appendValues = "&TTOCHITS=1";
if (path == "fbFocOpt") {
setUtils();
var pE = pUtils.getElem("focBudTerms", prefix);
appendValues +="&focBudTerms=" + pE.value;
}
if (this.CBsCleared) {
appendValues += "&thCBsCleared=1";
}
var pForm = document.tocform;
if (this.cbStateKey != "") {
appendValues += this.cbStateKey;
}
var persistValues = this.setPersistField(false, "&thLniList=");
if (persistValues != "") {
appendValues += persistValues;
}
if (path == "Delivery") {
if (persistValues == "" && this.chunkedCBsSel == false)  {
alert("Please select documents for delivery");
return false;
}
pForm.target = "DelWindow";
openDelWindow(640, 415);
}
else {
if(pForm.target == "DelWindow") {
pForm.target="";
}
if (pAnchor.target) {
pForm.target = pAnchor.target;
}
appendValues += this.setPersistField(true, "&thNodeIdList=");
}
if(path == "thtotoc") {
this.sTOCBrowsePath += appendValues + "&" +  pForm.thAsetHandle.name + "=" + pForm.thAsetHandle.value;
}
else if(path == "thtodoc") {
this.sDOCQS += appendValues + "&" +  pForm.thAsetHandle.name + "=" + pForm.thAsetHandle.value;
}
else {
var nIdx = pAnchor.href.lastIndexOf("#");
if (nIdx == -1) {
pForm.action = pAnchor.href + appendValues;
}
else {
pForm.action = pAnchor.href.slice(0, nIdx) + appendValues + pAnchor.href.slice(nIdx);
}
pForm.submit();
}
return false;
}
function persistHitCheckboxesFoc(formAction) {
var appendValues = "&TTOCHITS=1";
if (this.CBsCleared) {
appendValues += "&thCBsCleared=1";
}
if (this.cbStateKey != "") {
appendValues += this.cbStateKey;
}
var persistValues = this.setPersistField(false, "&thLniList=");
if (persistValues != "") {
appendValues += persistValues;
}
appendValues += this.setPersistField(true, "&thNodeIdList=");
formAction += appendValues;
document.citeForm.action = formAction;
setFields(document.citeForm,"",formAction);
document.citeForm.submit();
unsetFields(document.citeForm,"",formAction);
}
function persistHitCheckboxesFP() {
var persistValues = this.setPersistField(false, "&thLniList=");
if (persistValues == "" && this.chunkedCBsSel == false)  {
alert("Please select documents for delivery");
return "";
}
var appendValues = "&TTOCHITS=1";
if (persistValues != "") {
appendValues += persistValues;
}
if (this.cbStateKey != "") {
appendValues += this.cbStateKey;
}
if (this.CBsCleared) {
appendValues += "&thCBsCleared=1";
}
return appendValues;
}
function setPersistField(bUseName, wfKey)
{
var cbData = this.getCBData(bUseName, "|");
var persistValues = "";
if( cbData != "") {
persistValues = wfKey + cbData.substring(0, cbData.length-1);
}
return persistValues;
}
function getCBData(bName, delimeter)
{
var cbData = "";
var pElemArr = document.getElementsByTagName("INPUT");
if(pElemArr) {
var pElem;
for(var nIdx=0;nIdx<pElemArr.length;nIdx++) {
pElem = pElemArr.item(nIdx);
if(pElem.type == "checkbox") {
if(pElem.checked) {
cbData += (bName ? pElem.name : pElem.value) + delimeter;
}
}
}
}
return cbData;
}
function clearAllTocHitsCheckboxes()
{
this.chunkedCBsSel = "";
this.CBsCleared = true;
var pCB = document.getElementsByTagName("INPUT");
if(pCB) {
for(var nIdx=0;nIdx<pCB.length;nIdx++) {
if (pCB.item(nIdx).type == "checkbox") {
pCB.item(nIdx).checked = false;
}
}
}
}
function goToc(e, nodeId, nodeLevel,t) {
this.persistHitCheckboxes(e, "thtotoc", "");
this.sTOCBrowsePath += "&tcact=" + "open";
this.sTOCBrowsePath += "&tcnid=" + nodeId;
if (nodeLevel == 1) {
this.sTOCBrowsePath += "&tcbill=" + "1";
}
this.sTOCBrowsePath += "&al=" + nodeId;
this.sTOCBrowsePath += "&tcaid=" + nodeId;
this.sTOCBrowsePath += "#" + nodeId;
if (this.debug >= 5 ) {
alert(this.sTOCBrowsePath);
}
e.href=this.sTOCBrowsePath;
if(this.framesOn) {
e.target = "Content";
}
return true;
}
function tth2dc(e, toc2docnid,lni,refpt,procOrNobill,t) {
this.persistHitCheckboxes(e, "thtodoc", "");
var path = "/research/search/toctodoc";
var toctodocpathandqs;
toctodocpathandqs  = path + this.sDOCQS;
toctodocpathandqs += "&tcsvrnid=" + toc2docnid;
toctodocpathandqs += "&fromTH=1"
if (lni != '') {
toctodocpathandqs += "&tclni=" + lni;
}
if (refpt != '') {
toctodocpathandqs += "&tcrefpt=" + refpt;
}
if (procOrNobill == "2") {
toctodocpathandqs += "&tcwchProc=" + procOrNobill;
}
e.href=toctodocpathandqs;
return true;
}
function setStatusSearchWithinSources(status){
var src1 = document.getElementsByName("src1SelCbox");
var src2 = document.getElementsByName("src2SelCbox");
var src3 = document.getElementsByName("src3SelCbox");
var src4 = document.getElementsByName("src4SelCbox");
var src5 = document.getElementsByName("src5SelCbox");
var src6 = document.getElementsByName("src6SelCbox");
if(src1[0]) src1[0].disabled=status;
if(src2[0]) src2[0].disabled=status;
if(src3[0]) src3[0].disabled=status;
if(src4[0]) src4[0].disabled=status;
if(src5[0]) src5[0].disabled=status;
if(src6[0]) src6[0].disabled=status;
}
function submitIndexTocLink(link) {
if (!link.originalHref){
link.originalHref = link.href;
}
link.href = link.originalHref + this.getPersistValuesForIndexTocToggle();
}
function getPersistValuesForIndexTocToggle(){
var queryString = "";
queryString += "&tcsrchtype=" + pToc.sTCSrchType;
var nSearch = document.tocbuddy._nSearch;
if (nSearch && nSearch != "") {
queryString += "&tcp_nSearch="+escape(nSearch.value);
}
var tocSearchWithinElem = document.tocbuddy.tocSearchWithin;
if ( tocSearchWithinElem && tocSearchWithinElem[1].checked ) {
queryString += "&tocSearchWithin=toc";
} else {
queryString += "&tocSearchWithin=ft";
}
return queryString;
}
