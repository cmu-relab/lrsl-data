var pToc = null;
var pTocHits = null;
function ettocObject(bTocUi) {
this.isUnreal = false;
this.pUtils = window.Content && parent.getUtilsObj ? parent.getUtilsObj() : getUtilsObj();
this.pBrowser = this.pUtils.browser;
this.pCiteAsst  = null;
this.pEtUi      = null;
this.nLoad      = 0;
this.pEtModel = createEtModelObj(this.pUtils, this.pBrowser);
if(bTocUi) {
this.pEtUi  = createTocUiObj(this.pEtModel, this.pUtils, this.pBrowser);
this.pEtUi.setCheckBoxColl();
}
this.dataError    = false;
this.ahe                       = addHeObject;
this.athe                      = addTocHe;
this.tocseg                    = tocseg;
this.cbHandler                 = function(nodeId) { return this.pEtUi.cbHandler(nodeId); }
this.checkSearchSelCBox        = function(elem, chkRdyState) { this.pEtUi.checkSearchSelCBox(elem, chkRdyState); }
this.clearAllCheckboxes        = function() { return this.pEtUi.clearAllCheckboxes(); }
this.clearCheckboxes           = function(nodes) { this.pEtUi.clearCheckboxes(nodes); }
this.dumpNodes                 = function() { this.pEtUi.dumpNodes(); }
this.getCiteAsstPtr            = function() { return this.pCiteAsst; }
this.clsNd                     = function(e, nodeId, nodeLevel, t) { return this.pEtUi.clsNd(e, nodeId, nodeLevel, t); }
this.opnNd                     = function(e, nodeId, nodeLevel, t) { return this.pEtUi.opnNd(e, nodeId, nodeLevel, t); }
this.printResult               = function() { this.pEtUi.printResult(); }
this.rtc2dc                    = function(e,toc2docnid,lni,refpt,procOrNobill,t) { this.pEtUi.rtc2dc(e,toc2docnid,lni,refpt,procOrNobill,t); }
this.searchFormSubmit          = function(formName) { return this.pEtUi.tocSrchBuddySubmit(formName); }
this.setCommonDocQS            = function(qs)   { this.pEtUi.setCommonDocQS(qs); }
this.setCommonPathAndQS        = function(path) { this.pEtUi.setCommonPathAndQS(path); }
this.setNodeTitle              = function(pNode, truncText) { this.pEtUi.setNodeTitle(pNode, truncText); }
this.setXlinkQS                = function(path) { this.pEtUi.setXlinkQS(path); }
this.tc2dc                     = function(e,toc2docnid,lni,refpt,procOrNobill,t) { this.pEtUi.tc2dc(e,toc2docnid,lni,refpt,procOrNobill,t); }
this.tcOut                     = function(elem, href) { return this.pEtUi.tcOut(elem, href); }
this.tocSrchBuddySubmit        = function(formName) { return this.pEtUi.tocSrchBuddySubmit(formName); }
this.toggleSearchSelectedOnly  = function(elem) { return this.pEtUi.toggleSearchSelectedOnly(elem); }
this.toggleSearchType          = function(elem) { this.pEtUi.toggleSearchType(elem); }
this.THEinventory              = function() { this.pEtUi.THEinventory(); }
this.xlinkToc                  = function(nodeId, t) { this.pEtUi.xlinkToc(nodeId, t); }
this.setFocus                  = function() { this.pEtUi.setFocus(); }
this.tocDataAvail         = tocDataAvail;
this.heListAvail          = heListAvail;
this.segmentsAvail        = segmentsAvail;
this.getSegmentsPtr       = function() { return this.pEtModel.pSegments; }
this.getHeListPtr         = function() { return this.pEtModel.pHeList; }
this.getChildren          = function(refpt) { return this.pEtModel.getChildren(refpt); }
}
ettocObject.tocExpEnable = false;
function tocseg( doCiteAssistant, doExplore, doSegmentScan, TOCcite) {
if ( doSegmentScan ) {
this.pEtModel.scanSegs();
}
var sPupFlag;
if(window.Content && parent.sPup){
sPupFlag = true;
}else if(document.sPup){
sPupFlag = true;
}
if ( doCiteAssistant && this.pEtModel.pHeList && !sPupFlag && !this.dataError) {
this.pCiteAsst = createCiteAsstObj(this.pUtils, this.pBrowser, this.pEtModel, TOCcite);
this.pCiteAsst.initCALyr();
}
if ( doExplore ) {
ettocObject.tocExpEnable = true;
if(window.Content){
parent.TOCInitExplore();
}else {
TOCInitExplore();
}
}
}
function addHeObject(levelNum, labelName, labelNum,  captionText, refpt, overflow) {
this.dataError = this.pEtModel.ahe(levelNum, labelName, labelNum,  captionText, refpt, overflow);
}
function addTocHe(levelNum, nodeId, hiddenCheckedNode) {
this.pEtUi.athe(levelNum, nodeId, hiddenCheckedNode);
}
function tocDataAvail() {
if( (this.pEtModel.pSegments == null) || (this.pEtModel.pHeList == null)) {
return false;
}
else {
return true;
}
}
function heListAvail() {
if(this.pEtModel.pHeList == null) {
return false;
}
else {
return true;
}
}
function segmentsAvail() {
if(this.pEtModel.pSegments == null) {
return false;
}
else {
return true;
}
}
function tocHitsObject() {
this.pUtils = window.name=="Content" && parent.getUtilsObj ? parent.getUtilsObj() : getUtilsObj();
this.pBrowser = this.pUtils.browser;
this.pTocHitsUi             = createTocHitsUiObj(this.pUtils, this.pBrowser);
this.updatePersistence      = function(cbStateKey, otherChunkCBSel) { this.pTocHitsUi.updatePersistence(cbStateKey, otherChunkCBSel); }
this.tth2dc                 = function(e,toc2docnid,lni,refpt,procOrNobill,t) { this.pTocHitsUi.tth2dc(e,toc2docnid,lni,refpt,procOrNobill,t); }
this.setCommonDocQS         = function(qs){ this.pTocHitsUi.setCommonDocQS(qs); }
this.setCommonPathAndQS     = function(path) { this.pTocHitsUi.setCommonPathAndQS(path); }
this.goToc                  = function(e, nodeId, nodeLevel, t) { return this.pTocHitsUi.goToc(e, nodeId, nodeLevel, t); }
this.persistHitCheckboxes   = function(pAnchor, path, loc) { return this.pTocHitsUi.persistHitCheckboxes(pAnchor, path, loc); }
this.persistHitCheckboxesFP = function() { return this.pTocHitsUi.persistHitCheckboxesFP(); }
this.persistHitCheckboxesFoc = function(pForm) { return this.pTocHitsUi.persistHitCheckboxesFoc(pForm); }
this.clearAllCheckboxes     = function() { return this.pTocHitsUi.clearAllCheckboxes(); }
this.setFramesOn            = function() { this.pTocHitsUi.setFramesOn(); }
}
domEtModel.refptLevelLen  = 0;   // refpt level (eg AB) length
domEtModel.HeMaxDepth     = 1;   // Max level of TOC depth
domEtModel.segName          = "SEGH";
domEtModel.docNavName       = "DOCNAV";
domEtModel.lgFence	    = true;
function createEtModelObj(utilsObj, browserObj)
{
if(browserObj.ie5up) {
return new ie5EtModel(utilsObj, browserObj);
}
if(browserObj.ie4) {
return new ie4EtModel(utilsObj, browserObj);
}
if(browserObj.nav4) {
return new ns4EtModel(utilsObj, browserObj);
}
return new domEtModel(utilsObj, browserObj);
}
function domEtModel(utilsObj, browserObj) {
this.pUtils    = utilsObj;
this.pBrowser  = browserObj;
this.dataError = false;
this.pHeList     = null;
this.pHeListIdx  = -1;
this.pCurLevelHe = null;
this.pSegments = null;
this.addHe            = addHe;
this.ahe              = ahe;
this.createSegObj     = createSegObj;
this.getChildren      = getChildren;
this.scanSegs         = scanSegs;
this.validateLevelOK  = validateLevelOK;
}
function scanSegs() {
var segColl, docColl;
if(!domEtModel.lgFence) {
segColl = this.pUtils.getTagElems("A", domEtModel.segName);
} else {
segColl = document.getElementsByName(domEtModel.segName);
}
if ((domEtModel.lgFence && segColl.length > 0)
|| (!domEtModel.lgFence && segColl)) {
this.pSegments = new Array();
if ( segColl.length ) {
for (segIndex=0; segIndex < segColl.length; segIndex++) {
this.pSegments[segIndex] = this.createSegObj(segColl[segIndex]);
this.pSegments[segIndex].si = getSegIndex(segColl[segIndex]);
}
}
else {  // only one segment
this.pSegments[0] = this.createSegObj(segColl);
this.pSegments[0].si = getSegIndex(segColl);
}
}
if(!domEtModel.lgFence) {
docColl = this.pUtils.getTagElems("A", domEtModel.docNavName);
} else {
docColl = document.getElementsByName(domEtModel.docNavName);
}
if (!pToc.heListAvail() && ((domEtModel.lgFence && docColl.length > 0)
|| (!domEtModel.lgFence && docColl))) {
if ( docColl.length ) {
if (!this.pSegments) this.pSegments = new Array();
for (segIndex=0; segIndex < docColl.length; segIndex++) {
var tmpSegObj = this.createSegObj(docColl[segIndex]);
tmpSegObj.si = getSegIndex(docColl[segIndex]);
this.pSegments[this.pSegments.length] = tmpSegObj;
}
}
else {  // only one doc segment
if (!this.pSegments) this.pSegments = new Array();
var tmpSegObj = this.createSegObj(docColl);
tmpSegObj.si = getSegIndex(docColl);
this.pSegments[this.pSegments.length] = tmpSegObj;
}
var sortSI = function(a, b){ // sort by sourceIndex property (IE specific)
return (a.si < b.si)? "-1":"1";
}
this.pSegments = this.pSegments.sort(sortSI);
}
}
function getSegIndex(segElement) {
var anchorLength = document.anchors.length;
var segIndex;
for (var anchorIndex = 0; anchorIndex < anchorLength; anchorIndex++) {
if (document.anchors[anchorIndex] === segElement) {
segIndex = anchorIndex;
break;
}
}
return anchorIndex;
}
function createSegObj(segElement) {
var aSegObj;
aSegObj = new segObject();
if(!domEtModel.lgFence) {
aSegObj.anchorName = segElement.name;
} else {
aSegObj.anchorName = segElement.id;
}
var elemTxt = getTextNodeText(segElement);
if (segElement.name == domEtModel.docNavName){
elemTxt = segElement.getAttribute("alttext");
}
aSegObj.segName = elemTxt.replace(/(^[\W]*|[\W]*$)/g,'').toLowerCase();
return aSegObj;
}
function getTextNodeText(objElement) {
var returnTxt
var segChildren = objElement.childNodes;
var nodesLength = segChildren.length;
for (var nIndex = 0; nIndex < nodesLength; nIndex++) {
if (segChildren[nIndex].nodeType == 1) {
returnTxt = getTextNodeText(segChildren[nIndex])
}
else if (segChildren[nIndex].nodeType == 3) {
returnTxt = segChildren[nIndex].data;
break;
}
}
return returnTxt;
}
function ahe(levelNum, labelName, labelNum,  captionText, refpt, overflow) {
if ( overflow) {
if ( this.pCurLevelHe ) {
this.pCurLevelHe.captionText += captionText;
}
else {
this.dataError = true;
}
return;
}
var pNewHe              = new heObject();
pNewHe.levelNum         = levelNum;
pNewHe.labelNum         = labelNum;
pNewHe.labelName        = labelName;
pNewHe.captionText      = captionText;
pNewHe.refpt_prefix     = refpt.charAt(0);
pNewHe.refpt            = refpt.substr(1);  // take out the first 'T'
pNewHe.heChildren       = null;
pNewHe.curHeChildrenIdx = -1;
if ( domEtModel.refptLevelLen == 0) {
if ( levelNum == 1) {
domEtModel.refptLevelLen = pNewHe.refpt.length;
}
}
this.addHe(pNewHe, 1);
return this.dataError;
}
function addHe(newHe, validation) {
if ( newHe.levelNum == 1 ) {
if ( this.pHeList == null) {
this.pHeList = new Array();
}
this.pHeList[++this.pHeListIdx] = newHe;
this.pCurLevelHe   = this.pHeList[this.pHeListIdx];
}
else {
if ( newHe.levelNum == this.pCurLevelHe.levelNum ) {
if ( validation && !this.validateLevelOK(this.pCurLevelHe, newHe, "same") ) {
window.status = "New refpt (" + newHe.refpt + ") is NOT at the same current refpt (" + this.pCurLevelHe.refpt + ")";
this.dataError = true;
return;
}
var j = ++this.pCurLevelHe.heParent.curHeChildrenIdx;
newHe.heParent = this.pCurLevelHe.heParent;
this.pCurLevelHe.heParent.heChildren[j] = newHe;
this.pCurLevelHe = this.pCurLevelHe.heParent.heChildren[j];
}
else if ( newHe.levelNum > this.pCurLevelHe.levelNum ) {
if ( validation && !this.validateLevelOK(this.pCurLevelHe, newHe, "next" ) ) {
window.status = "New refpt (" + newHe.refpt + ") does NOT follow the current refpt (" + this.pCurLevelHe.refpt + ")";
this.dataError = true;
return;
}
if ( newHe.levelNum > domEtModel.HeMaxDepth ) {
domEtModel.HeMaxDepth = newHe.levelNum;
}
if ( this.pCurLevelHe.heChildren == null )  {
this.pCurLevelHe.heChildren = new Array();
}
this.pCurLevelHe.heChildren[++this.pCurLevelHe.curHeChildrenIdx] = newHe;
this.pCurLevelHe.heChildren[this.pCurLevelHe.curHeChildrenIdx].heParent = this.pCurLevelHe;
this.pCurLevelHe = this.pCurLevelHe.heChildren[0];
}
else if (  newHe.levelNum < this.pCurLevelHe.levelNum  ) {
var pHe = this.pCurLevelHe.heParent;
while ( pHe ) {
if (pHe.levelNum == newHe.levelNum) {
this.pCurLevelHe = pHe;
break;
}
pHe = pHe.heParent;
}
if ( pHe ) {
var pHeParent = pHe.heParent;
var k = ++pHeParent.curHeChildrenIdx;
newHe.heParent = pHeParent;
pHeParent.heChildren[k] = newHe;
this.pCurLevelHe = pHeParent.heChildren[k];
}
}
}
}
function getChildren(refpt, refptWithPrefix) {
if ( !this.pHeList ) {
return null;
}
if ( refpt == null || refpt == "" ) {
return this.pHeList;
}
var pHeParent = this.pHeList;
var numChildren = this.pHeListIdx;
var matchedRefpt  = false;
refpt = refpt.toUpperCase();
for (var j=domEtModel.refptLevelLen; j <= refpt.length; j=j+domEtModel.refptLevelLen) {
if ( refptWithPrefix ) {
if ( j == domEtModel.refptLevelLen) {
ref=refpt.substring(0,j+1);
}
else {
ref=refpt.substring(0,j+1);
}
}
else {
ref=refpt.substring(0,j);
}
matchedRefpt = false;
for (var x=0; x <= numChildren; x++) {
if ( pHeParent[x].refpt == ref) {
matchedRefpt = true;
break;
}
}
if ( matchedRefpt ) {
if ( j < (refpt.length-1) ) {  // refpt without the prefix 'T'
numChildren = pHeParent[x].curHeChildrenIdx;
pHeParent = pHeParent[x].heChildren;
matchedRefpt = false;
}
}
else {
return null;
}
}
if ( matchedRefpt ) {
return pHeParent[x];
}
return null;
}
function validateLevelOK(pCurLevelHe, newHe, levelValidation) {
var curRefpt;
var newRefpt;
if ( levelValidation == "same" ) {  // asked to be added to the same level
newRefpt = newHe.refpt.substr(0, newHe.refpt.length - domEtModel.refptLevelLen);
curRefpt = pCurLevelHe.refpt.substr(0, this.pCurLevelHe.refpt.length-domEtModel.refptLevelLen);
}
else if ( levelValidation == "next" ) { // asked to be added to the next level
curRefpt = this.pCurLevelHe.refpt;
newRefpt = newHe.refpt.substr(0, newHe.refpt.length-domEtModel.refptLevelLen);
}
return ( (newRefpt == curRefpt)  );
}
function heObject() {
this.levelNum     = 0;
this.labelName    = null;
this.labelNum     = null;
this.captionText  = null;
this.refpt        = null;
this.heParent     = null;
this.heChildren   = null;
this.curHeChildrenIdx = -1;
this.getHeParent       = function() { return this.heParent; }
this.getHeChildren     = function() { return this.heChildren; }
}
function segObject() {
this.anchorName = null;
this.segName = null;
this.si = null // sorting index -- sourceIndex for IE5 & IE6
this.getAnchorName  = function() { return this.anchorName; }
this.getSegName     = function() { return this.segName; }
}
var images = new Array('disabled', 'checked', 'unchecked', 'mix_checked');
var image_path = "/ri/";
var an_image = new Array();
for (loop = 0; loop < images.length; loop++) {
an_image[loop]     = new Image();
an_image[loop].src = image_path + images[loop]+".gif";
}
var debug = 0;
var prevLevelNum = -1;
var totalCheckBoxChecked = 0;
var _tocReady = false;
var _hasAtleastACheckedNode = false;
domTocUi.noCheckBox       = -1;
domTocUi.unchecked        = 0;
domTocUi.checked          = 1;
domTocUi.grayChecked      = 2;
domTocUi.disabledChecked  = -1;
domTocUi.uncheckedGIF     = "unchecked.gif";
domTocUi.checkedGIF       = "checked.gif";
domTocUi.grayCheckedGIF   = "mix_checked.gif";
domTocUi.disabledGIF      = "disabled.gif";
var pressed            = "Pressed";
var notPressed         = "Not Pressed";
var termsAndConnectors = "Terms and Connectors";
var NaturalLanguague   = "Natural Language";
var pfx_imageCBOX    = "ix_";
var srchSelTitle          = "search selected only"
var disabledSrchSelTitle  = "Disabled - "  + srchSelTitle;
var uncheckedSrchSelTitle = "Unchecked - " + srchSelTitle;
var checkedSrchSelTitle   = "Checked - "   + srchSelTitle;
var checkboxTitleSuffix   = "check for searching or delivery"
var _jsErrorPopupDisplayed = false;
function checkJavascriptError()
{
if ( isJavascriptError() && !_jsErrorPopupDisplayed ) {
alert('Warning: An error may have occurred.  It may affect your task.');
_jsErrorPopupDisplayed = true;
}
}
function createTocUiObj(model, utils, browser)
{
if(browser.ie5up) {
return new ie5TocUi(model, utils, browser);
}
if(browser.ie4) {
return new ie4TocUi(model, utils, browser);
}
if(browser.nav4) {
return new ns4TocUi(model, utils, browser);
}
return new domTocUi(model, utils, browser);
}
function domTocUi(model, utils, browser) {
this.pEtModel  = model;
this.pUtils    = utils;
this.pBrowser  = browser;
this.isTocReady = function() { return true; }
this.popTocNotReadyMessage = popTocNotReadyMessage;
this.athe = athe;
this.clearCheckboxes = clearCheckboxes;
this.clearAllCheckboxes = clearAllCheckboxes;
this.getNodeText = getNodeText;
this.processNodes = processNodes;
this.THEinventory = THEinventory;
this.setNodeTitle = setNodeTitle;
this.setSearchSelCBoxState = setSearchSelCBoxState;
this.toggleSearchSelCBox = toggleSearchSelCBox;
this.checkSearchSelCBox = checkSearchSelCBox;
this.updateSearchSelCBoxState = updateSearchSelCBoxState;
this.updateSearchSelCBoxInitState = updateSearchSelCBoxInitState;
this.checkBoxStatusByElem = checkBoxStatusByElem;
this.checkBoxStatusByNodeId = checkBoxStatusByNodeId;
this.isCheckBoxChecked = isCheckBoxChecked;
this.updateCheckBoxState = updateCheckBoxState;
this.incParentCheckBoxCnt = incParentCheckBoxCnt;
this.decParentCheckBoxCnt = decParentCheckBoxCnt;
this.incParentGrayCheckBoxCnt = incParentGrayCheckBoxCnt;
this.decParentGrayCheckBoxCnt = decParentGrayCheckBoxCnt;
this.checkMeAndParents = checkMeAndParents;
this.checkChildren = checkChildren;
this.uncheckMeAndParents = uncheckMeAndParents;
this.uncheckChildren = uncheckChildren;
this.checkMe = checkMe;
this.uncheckMe = uncheckMe;
this.cbHandler = cbHandler;
this.getCheckedNodesCDM = getCheckedNodesCDM;
this.getCheckedNodes = getCheckedNodes;
this.changeAdvancedLinkPath = changeAdvancedLinkPath;
this.updateAdvancedLinkPath = updateAdvancedLinkPath;
this.isSpace = isSpace;
this.getPersistValues = getPersistValues;
this.formToTOC = formToTOC;
this.getSearchSelectedOnlyState = getSearchSelectedOnlyState;
this.tcOut = tcOut;
this.tocSrchBuddySubmit = tocSrchBuddySubmit;
this.toggleSearchType = toggleSearchType;
this.setCommonPathAndQS = setCommonPathAndQS;
this.setCommonDocQS = setCommonDocQS;
this.setXlinkQS = setXlinkQS;
this.toggleSearchSelectedOnly = toggleSearchSelectedOnly;
this.xlinkToc = xlinkToc;
this.opnNd = opnNd;
this.clsNd = clsNd;
this.rtc2dc = rtc2dc;
this.tc2dc = tc2dc;
this.toctodoc = toctodoc;
this.getUpdatedCKnodes = getUpdatedCKnodes;
this.getSearchFormValues = getSearchFormValues;
this.traverseNodes = traverseNodes;
this.dumpNodes = dumpNodes;
this.getAllCheckedNodes = getAllCheckedNodes;
this.changeDebugLevel = changeDebugLevel;
this.printResult = printResult;
this.setFocus = setFocus;
this.setCheckBoxColl = setCheckBoxColl;
this.getCheckBox = getCheckBox;
this.retrieveCB = function(sId) { return this.checkBoxColl.namedItem(sId); }
this.getAdvancedLink = function() { return this.pUtils.cne("advance"); }
this.searchType   = "";
}
function popTocNotReadyMessage() {
alert("Please wait for your browser to load the table of contents completely before selecting an item.");
}
function athe(levelNum, nodeId, hiddenCheckedNode) {
var pNewHe              = new heObject();
pNewHe.levelNum         = levelNum;
pNewHe.refpt            = nodeId;
pNewHe.hiddenCheckedNode= (hiddenCheckedNode) ? 1 : 0;
pNewHe.heChildren       = null;
pNewHe.curHeChildrenIdx = -1;
pNewHe.captionText      = "";
if ( hiddenCheckedNode ) {
if ( prevLevelNum < 0 ) { // shouldn't happen but you never know
prevLevelNum = 1;
}
pNewHe.levelNum = prevLevelNum + 1;
}
else {
prevLevelNum = levelNum;
}
pNewHe.initialCBstatus  = this.checkBoxStatusByNodeId(pNewHe.refpt);
pNewHe.cboxStatus       = pNewHe.initialCBstatus;
pNewHe.childrenCheckedCnt=0;
pNewHe.childrenGrayCheckedCnt=0;
if ( pNewHe.initialCBstatus == domTocUi.checked ||
pNewHe.initialCBstatus == domTocUi.grayChecked) {
totalCheckBoxChecked++;
}
if ( domEtModel.refptLevelLen == 0) {
if ( levelNum == 1) {
domEtModel.refptLevelLen = pNewHe.refpt.length - 1;  // minus 'T' prefix
}
}
this.pEtModel.addHe(pNewHe, 0);
}
function clearCheckboxes(nodes)
{
for (var x=0; x < nodes.length; x++) {
node = nodes[x];
if ( node.cboxStatus == domTocUi.checked ||
node.cboxStatus == domTocUi.grayChecked ){
this.updateCheckBoxState(node, domTocUi.unchecked);
node.childrenCheckedCnt = 0;
node.childrenGrayCheckedCnt = 0;
if ( node.heChildren ) {
this.clearCheckboxes(node.heChildren);
}
}
}
}
function clearAllCheckboxes() {
if ( !this.isTocReady() ) {
this.popTocNotReadyMessage();
return false;
}
if ( this.pEtModel.pHeList ) {
this.clearCheckboxes( this.pEtModel.pHeList );
this.updateSearchSelCBoxState();
}
return false;
}
function setNodeTitle(pNode, truncText) {
if(pNode) {
var text = this.getNodeText(pNode);
var nIdx = text.lastIndexOf("...");
if(nIdx >= 0) {
var oText = text;
text = oText.slice(0, nIdx);
}
pNode.title = text + truncText;
pNode.onmouseover = null;
}
}
function getNodeText(pElem)
{
if(pElem.firstChild.firstChild) {
return pElem.firstChild.firstChild.data;
}
return pElem.firstChild.data;
}
function processNodes(nodes) {
var parentNode;
for (var x=0; x < nodes.length; x++) {
node = nodes[x];
if ( node.hiddenCheckedNode ) {
continue;
}
checkBoxStatus = this.checkBoxStatusByNodeId(node.refpt);
if ( checkBoxStatus == domTocUi.checked){
_hasAtleastACheckedNode = true;
parentNode = node.heParent;
if ( parentNode ) {
parentNode.childrenCheckedCnt++;
}
}
else if ( checkBoxStatus == domTocUi.grayChecked){
parentNode = node.heParent;
if ( parentNode ) {
parentNode.childrenGrayCheckedCnt++;
}
}
if ( node.heChildren ) {
this.processNodes(node.heChildren);
}
}
}
function THEinventory() {
if ( this.pEtModel.pHeList == null) {
return;
}
this.processNodes(this.pEtModel.pHeList);
if ( debug >= 8 ) {
this.dumpNodes();
}
var wf = getWf('');
if ( wf.tcsrchcheck ) {
var cboxStatus = heObject.noCheckBox;
if ( wf.tcsrchcheck == "1") {
cboxStatus = domTocUi.checked;
}
else if ( wf.tcsrchcheck == "0") {
cboxStatus = domTocUi.unchecked;
}
if ( cboxStatus != domTocUi.noCheckBox ) {
this.updateSearchSelCBoxState(1, cboxStatus);
}
}
else {
this.updateSearchSelCBoxInitState();  // set its initial state
}
this.updateAdvancedLinkPath();
_tocReady = true;
}
function setSearchSelCBoxState(srchSelCboxElem, gif, title)
{
var newImage = image_path + gif;
var curImage = srchSelCboxElem.src.match(/\/ri\/.+/);
if ( curImage == newImage && srchSelCboxElem.title == title )
return; // same - no op
srchSelCboxElem.src       = newImage;
srchSelCboxElem.title     = title;
var pElem = this.pUtils.sc("srchSelComp");
if(pElem) {
pElem.title = title;
}
}
function toggleSearchSelCBox(srchSelCboxElem)
{
var cboxStatus = this.checkBoxStatusByElem(srchSelCboxElem);
if ( cboxStatus == domTocUi.checked ) {
this.setSearchSelCBoxState(srchSelCboxElem,
domTocUi.uncheckedGIF,
uncheckedSrchSelTitle);
}
else if ( cboxStatus == domTocUi.unchecked ) {
this.setSearchSelCBoxState(srchSelCboxElem,
domTocUi.checkedGIF,
checkedSrchSelTitle);
}
}
function checkSearchSelCBox( srchSelCboxElem, checkReadyState )
{
var pElem = this.pUtils.cne(srchSelCboxElem);
if ( pElem && this.checkBoxStatusByElem(pElem) == domTocUi.disabledChecked) {
return;
}
if ( checkReadyState && !this.isTocReady() ) {
this.popTocNotReadyMessage();
return;
}
this.toggleSearchSelCBox( pElem );
}
function updateSearchSelCBoxState(checkStatus, cboxStatus) {
var cboxColor = "black";
var srchSelCboxElem = this.pUtils.cne("srchSelCbox");
srchSelCboxElem = this.pUtils.cne("srchSelCbox");
if ( checkStatus ) {
if(cboxStatus ==  domTocUi.unchecked) {
this.setSearchSelCBoxState(srchSelCboxElem,
domTocUi.uncheckedGIF,
uncheckedSrchSelTitle);
}
else if(cboxStatus ==  domTocUi.checked) {
this.setSearchSelCBoxState(srchSelCboxElem,
domTocUi.checkedGIF,
checkedSrchSelTitle);
}
else if(cboxStatus ==  domTocUi.disabledChecked) {
this.setSearchSelCBoxState(srchSelCboxElem,
domTocUi.disabledGIF,
disabledSrchSelTitle);
cboxColor = "gray";
}
}
else {
if ( totalCheckBoxChecked <= 0  ) {
this.setSearchSelCBoxState(srchSelCboxElem,
domTocUi.disabledGIF,
disabledSrchSelTitle);
cboxColor = "gray";
}
else {
this.setSearchSelCBoxState(srchSelCboxElem,
domTocUi.checkedGIF,
checkedSrchSelTitle);
}
}
var pElem = this.pUtils.cne("srchSelComp");
if (pElem) {
pElem.style.color = cboxColor;
}
}
function updateSearchSelCBoxInitState() {
var srchSelCboxElem = this.pUtils.cne("srchSelCbox");
var disableGif = "/" + domTocUi.disabledGIF;
if ( srchSelCboxElem.src.indexOf(disableGif) >= 0 ) {
var pElem = this.pUtils.cne("srchSelComp");
if (pElem) {
pElem.style.color = "gray";
}
}
else {
var checkedGif = "/" + domTocUi.checkedGIF;
if ( srchSelCboxElem.src.indexOf(checkedGif) >= 0 && (!_hasAtleastACheckedNode) ){
this.updateSearchSelCBoxState(1, domTocUi.noCheckBox);
}
}
}
function checkBoxStatusByElem(imageCBoxElem) {
if (  imageCBoxElem &&
(result = imageCBoxElem.src.toString().match(/([^\/]+)$/)) ) {
if(result[1] == domTocUi.uncheckedGIF) {
return domTocUi.unchecked;
}
if(result[1] == domTocUi.checkedGIF) {
return domTocUi.checked;
}
if(result[1] == domTocUi.grayCheckedGIF) {
return domTocUi.grayChecked;
}
if(result[1] == domTocUi.disabledChecked) {
return domTocUi.disabledChecked;
}
}
return domTocUi.noCheckBox;
}
function checkBoxStatusByNodeId(nodeId) {
var nodeIdGIF;
var imageCBoxElem = this.getCheckBox(pfx_imageCBOX + nodeId);
return (this.checkBoxStatusByElem(imageCBoxElem));
}
function isCheckBoxChecked(nodeId) {
return ( (this.checkBoxStatusByNodeId(nodeId) == domTocUi.checked ) ? true : false );
}
function updateCheckBoxState(node, cboxStatus) {
var imageCBoxElem = this.getCheckBox(pfx_imageCBOX + node.refpt);
if ( !imageCBoxElem || !imageCBoxElem.src )
return false;
if ( debug >= 10 ) {
alert("node.refpt="+node.captionText+".  (CHILDCNT)="+node.childrenCheckedCnt+".  (GRAYCHILDCNT)="+node.childrenGrayCheckedCnt+".  TotalCheckBoxChecked="+totalCheckBoxChecked+".  node.cboxStatus="+node.cboxStatus+".  cboxStatus="+cboxStatus);
}
if ( ((node.cboxStatus == domTocUi.unchecked) &&
(cboxStatus == domTocUi.checked)) ||
((node.cboxStatus == domTocUi.unchecked) &&
(cboxStatus == domTocUi.grayChecked)) ) {
totalCheckBoxChecked++;
}
else if ( (node.cboxStatus == domTocUi.checked &&
cboxStatus == domTocUi.unchecked) ||
(node.cboxStatus == domTocUi.grayChecked &&
cboxStatus == domTocUi.unchecked) ) {
if ( totalCheckBoxChecked > 0 ) {
totalCheckBoxChecked--;
}
}
if ( cboxStatus == domTocUi.checked ) {
imageCBoxElem.src   =  image_path + domTocUi.checkedGIF;
imageCBoxElem.title = "Checked - " + checkboxTitleSuffix;
node.cboxStatus = cboxStatus;
}
else if ( cboxStatus == domTocUi.grayChecked ) {
imageCBoxElem.src   =  image_path + domTocUi.grayCheckedGIF;
imageCBoxElem.title = "Mixed - " + checkboxTitleSuffix;
node.cboxStatus = cboxStatus;
}
else if ( cboxStatus == domTocUi.unchecked ) {
imageCBoxElem.src   = image_path + domTocUi.uncheckedGIF;
imageCBoxElem.title = "Unchecked - " + checkboxTitleSuffix;
node.cboxStatus = cboxStatus;
}
else {
return false;
}
if ( debug >= 10 ) {
alert("totalCheckBoxChecked="+totalCheckBoxChecked);
}
return true;
}
function incParentCheckBoxCnt(parentNode) {
if ( parentNode && (parentNode.cboxStatus != domTocUi.noCheckBox) ) {
parentNode.childrenCheckedCnt++;
}
if ( debug >= 9 ) {
alert("INCREASE node="+parentNode.captionText+" ["+parentNode.refpt+"].  childrenCheckedCnt="+parentNode.childrenCheckedCnt);
}
}
function incParentGrayCheckBoxCnt(parentNode) {
if ( parentNode && (parentNode.cboxStatus != domTocUi.noCheckBox) ) {
parentNode.childrenGrayCheckedCnt++;
}
if ( debug >= 9 ) {
alert("INCREASE node="+parentNode.captionText+" ["+parentNode.refpt+"].  childrenGrayCheckedCnt="+parentNode.childrenGrayCheckedCnt);
}
}
function decParentCheckBoxCnt(parentNode) {
if ( parentNode && (parentNode.cboxStatus != domTocUi.noCheckBox) ) {
if ( parentNode.childrenCheckedCnt > 0 ) {
parentNode.childrenCheckedCnt--;
}
else {
if ( debug >= 1 ) {
alert("** ["+parentNode.captionText+"] decParentCheckBoxCnt count is zero!!  cnt="+parentNode.childrenCheckedCnt); // TEST
}
}
if ( debug >= 9 ) {
alert("DECREASE node="+parentNode.captionText+" ["+parentNode.refpt+"].  childrenCheckedCnt="+parentNode.childrenCheckedCnt);
}
}
}
function decParentGrayCheckBoxCnt(parentNode) {
if ( parentNode && (parentNode.cboxStatus != domTocUi.noCheckBox) ) {
if ( parentNode.childrenGrayCheckedCnt > 0 ) {
parentNode.childrenGrayCheckedCnt--;
}
else {
if ( debug >= 1 ) {
alert("** ["+parentNode.captionText+"] decParentCheckBoxCnt count is zero!!  cnt="+parentNode.childrenGrayCheckedCnt);
}
}
if ( debug >= 9 ) {
alert("DECREASE node="+parentNode.captionText+" ["+parentNode.refpt+"].  childrenGrayCheckedCnt="+parentNode.childrenGrayCheckedCnt);
}
}
}
function checkMeAndParents(node, cboxStatus) {
var childNodeCboxStatus = node.cboxStatus;
this.updateCheckBoxState(node, cboxStatus);
var parentNode = node.heParent;
if ( parentNode ) {
if ( parentNode.cboxStatus != domTocUi.checked ) {
if ( cboxStatus == domTocUi.checked ) {
this.incParentCheckBoxCnt(parentNode);
if ( childNodeCboxStatus ==  domTocUi.grayChecked) {
this.decParentGrayCheckBoxCnt(parentNode);
}
}
else if ( cboxStatus == domTocUi.grayChecked ) {
this.incParentGrayCheckBoxCnt(parentNode);
if ( childNodeCboxStatus ==  domTocUi.checked) {
this.decParentCheckBoxCnt(parentNode);
}
}
var status;
if ( parentNode.childrenCheckedCnt >= (parentNode.curHeChildrenIdx+1) &&
parentNode.childrenGrayCheckedCnt <= 0 ) {
status = domTocUi.checked;
}
else {
status = domTocUi.grayChecked;
}
if ( status != parentNode.cboxStatus)
this.checkMeAndParents(parentNode, status);
}
}
}
function checkChildren(node) {
if ( node == null || node.curHeChildrenIdx < 0 )
return;
var childNode;
for (var x=0; x <= node.curHeChildrenIdx; x++) {
childNode = node.heChildren[x];
if ( (childNode.cboxStatus == domTocUi.grayChecked) ||
(childNode.cboxStatus == domTocUi.unchecked) ) {
if ( childNode.cboxStatus == domTocUi.grayChecked ) {
this.decParentGrayCheckBoxCnt(childNode.heParent);
}
this.updateCheckBoxState(childNode, domTocUi.checked);
this.incParentCheckBoxCnt(childNode.heParent);
if ( childNode.curHeChildrenIdx >= 0 ) {
this.checkChildren(childNode);
}
}
}
}
function uncheckMeAndParents(node, cboxStatus) {
var childNodeCboxStatus = node.cboxStatus;
this.updateCheckBoxState(node, cboxStatus);
var parentNode = node.heParent;
if ( parentNode ) {
if ( childNodeCboxStatus == domTocUi.checked ) {
this.decParentCheckBoxCnt(parentNode);
if ( cboxStatus ==  domTocUi.grayChecked) {
this.incParentGrayCheckBoxCnt(parentNode);
}
}
else if ( childNodeCboxStatus == domTocUi.grayChecked ) {
this.decParentGrayCheckBoxCnt(parentNode);
}
var parentStatusWillBe;
if ( parentNode.childrenCheckedCnt <= 0 &&
parentNode.childrenGrayCheckedCnt <= 0 ) {
parentStatusWillBe = domTocUi.unchecked;
}
else {
parentStatusWillBe = domTocUi.grayChecked;
}
if ( parentStatusWillBe != parentNode.cboxStatus ) {
this.uncheckMeAndParents(parentNode, parentStatusWillBe)
}
}
}
function uncheckChildren(node) {
if ( node == null || node.curHeChildrenIdx < 0 )
return;
var childnode;
for (var x=0; x <= node.curHeChildrenIdx; x++) {
childNode = node.heChildren[x];
if ( childNode.cboxStatus == domTocUi.checked ||
childNode.cboxStatus == domTocUi.grayChecked) {
this.updateCheckBoxState(childNode, domTocUi.unchecked);
this.decParentCheckBoxCnt(childNode.heParent);
if ( childNode.cboxStatus == domTocUi.grayChecked ) {
this.decParentGrayCheckBoxCnt(childNode.heParent);
}
}
if ( childNode.childrenCheckedCnt > 0 ||
childNode.childrenGrayCheckedCnt > 0 ) {
this.uncheckChildren(childNode);
}
}
}
function checkMe(node) {
this.checkMeAndParents(node, domTocUi.checked);
if ( node.curHeChildrenIdx >= 0 ) {
this.checkChildren(node);
}
this.updateSearchSelCBoxState();
}
function uncheckMe(node) {
this.uncheckMeAndParents(node, domTocUi.unchecked);
if ( node.curHeChildrenIdx >= 0 ) {
this.uncheckChildren(node);
}
if ( totalCheckBoxChecked <= 0 ) {
this.updateSearchSelCBoxState();
}
}
function cbHandler(nodeId) {
if ( !this.isTocReady() ) {
this.popTocNotReadyMessage();
return false;
}
var node = this.pEtModel.getChildren( nodeId, 1);
if ( node == null ) {
return false;
}
if ( this.isCheckBoxChecked(nodeId) ) {
this.uncheckMe(node);
}
else {
this.checkMe(node);
}
return false;
}
function getCheckedNodesCDM(nodes) {
for (var x=0; x < nodes.length; x++) {
node = nodes[x];
if ( node.cboxStatus == domTocUi.checked || node.hiddenCheckedNode ) {
checkedNodes += "checkbox=checked.        "+ node.captionText + "\n";
if ( _checkedNodeIds != "" ) {
_checkedNodeIds += ",";
}
_checkedNodeIds += node.refpt;
}
else if ( node.cboxStatus == domTocUi.grayChecked ) {
checkedNodes += "checkbox=grayChecked.  "+ node.captionText + ".  node.curHeChildrenIdx=" + node.curHeChildrenIdx + "\n";
if ( (node.cboxStatus == domTocUi.checked ||
node.cboxStatus == domTocUi.grayChecked) && node.heChildren ) {
this.getCheckedNodesCDM( node.heChildren );
}
}
}
}
var _checkedNodeIds = "";
function getCheckedNodes(nodes) {
_checkedNodeIds = "";
checkedNodes = "";
this.getCheckedNodesCDM(nodes);
if ( debug >= 5) {
alert(checkedNodes);
}
return _checkedNodeIds;
}
function changeAdvancedLinkPath(searchType) {
if ( searchType != "" ) {
var elem = this.getAdvancedLink();
if ( elem && elem.href ) {
var searchTypeRegx = "$1" + searchType + "$3";
elem.href = elem.href.replace(/(\/research\/form\/)(\w)+(\?|$)/, searchTypeRegx);
return true;
}
}
return false;
}
function updateAdvancedLinkPath() {
var elem = this.getAdvancedLink();
if ( document.tocbuddy.tocSearchType[0].checked ) {  // boolean
if ( elem.href && elem.href.indexOf("/research/form/bool?") < 0 ) {
this.changeAdvancedLinkPath("bool");
}
}
else if ( document.tocbuddy.tocSearchType[1].checked ) {  // free
if ( elem.href && elem.href.indexOf("/research/form/free?") < 0 ) {
this.changeAdvancedLinkPath("free");
}
}
else {
alert("unexpected search type.  It is neither 'boolean' nor 'freestyle'");
}
}
function isSpace(str) {
return ( !str || str.match(/^[\s]*$/) );
}
function getPersistValues( checkError ) {
var pValues = "";
var searchType = "";
var checkedNodeIds = "";
var formName;
checkedNodeIds = this.getCheckedNodes(this.pEtModel.pHeList);
if ( checkedNodeIds != "" ) {
searchType = ( document.tocbuddy.tocSearchType[0].checked ) ? "selbool" : "selfree";
}
else {
searchType = ( document.tocbuddy.tocSearchType[0].checked ) ? "bool" : "free";
}
if ( searchType == "free" || searchType == "selfree" ) {
formName = "free";
}
else {
formName = "bool";
}
if ( checkedNodeIds != "" ) {
pValues += "&tcselnodes="+checkedNodeIds;
}
else {
pValues += "&tcselnodes=";
}
if ( searchType != "") {
pValues += "&tcsrchtype="+searchType;
}
var srchSelOnlyState = this.getSearchSelectedOnlyState();
if ( checkError ) {
if ( (checkedNodeIds == "") && (srchSelOnlyState == domTocUi.checkedGIF) ){
alert('Please select items from the Table of Contents, or un-check the "Search Selected Only" box');
return "";
}
}
if ( srchSelOnlyState == domTocUi.checkedGIF ) {
pValues += "&tcsrchcheck=1";
}
else if ( srchSelOnlyState == domTocUi.uncheckedGIF ) {
pValues += "&tcsrchcheck=0";
}
else {
pValues += "&tcsrchcheck=";  // disable - null it out
}
var nSearch = this.pUtils.cne("_nSearch");
if ( !this.isSpace(nSearch.value) ) {
pValues += "&tcp_nSearch="+escape(nSearch.value);
}
var fValue;
var wf = getWf('');
var mandatoryTerms = false;
var boolSegment    = false;
if ( formName == "bool") {
if ( wf.tcpconnector) {
fValue = wf.tcpconnector;
if ( !this.isSpace(fValue) ) {
pValues += "&tcpconnector="+fValue;
boolSegment    = true;
}
}
if ( wf.tcpseg1Terms ) {
fValue = wf.tcpseg1Terms;
if ( !this.isSpace(fValue) ) {
pValues += "&tcpseg1Terms="+fValue;
boolSegment    = true;
}
}
if ( boolSegment ) {
pValues += "&tcpShow_Segments.x=1";
}
}
else if ( formName == "free" ) {
if ( wf.tcp_manterms ) {
fValue = wf.tcp_manterms;
if ( !this.isSpace(fValue) ) {
pValues += "&tcp_manterms="+fValue;
mandatoryTerms = true;
}
}
if ( wf.tcp_seg1terms ) {
fValue = wf.tcp_seg1terms;
if ( !this.isSpace(fValue) ) {
pValues += "&tcp_seg1terms="+fValue;
mandatoryTerms = true;
}
}
if (  mandatoryTerms ) {
pValues += "&tcpShow_Mandatory.x=1";
}
}
if ( wf.tcpS1 ) {
fValue = wf.tcpS1;
if ( !this.isSpace(fValue) ) {
pValues += "&tcpS1="+fValue;
mandatoryTerms = true;
boolSegment    = true;
}
}
if ( wf.tcpdateType ) {
fValue = wf.tcpdateType;
if ( !this.isSpace(fValue) ) {
pValues += "&tcpdateType="+fValue;
}
}
if ( wf.tcpdateRelative) {
fValue = wf.tcpdateRelative;
if ( !this.isSpace(fValue) ) {
pValues += "&tcpdateRelative="+fValue;
}
}
if ( wf.tcpdateFrom ) {
fValue = wf.tcpdateFrom;
if ( !this.isSpace(fValue) ) {
pValues += "&tcpdateFrom="+fValue;
}
}
if ( wf.tcpdateTo ) {
fValue = wf.tcpdateTo;
if ( !this.isSpace(fValue) ) {
pValues += "&tcpdateTo="+fValue;
}
}
if ( document.tocbuddy._tfPersist ) {
fValue = document.tocbuddy._tfPersist.value;
if ( !this.isSpace(fValue) ) {
pValues += "&tfPersist="+fValue;
if ( formName == "bool") {
pValues += ",tcpconnector,tcpseg1Terms,tcpShow_Segments.x";
}
else if ( formName == "free" ) {
pValues += ",tcp_manterms,tcp_seg1terms,tcpShow_Mandatory.x";
}
}
}
if ( wf.tocDebug && wf.tocDebug == "7782" ) {
fValue = wf.tocDebug;
if ( !this.isSpace(fValue) ) {
pValues += "&tocDebug="+fValue;
}
if ( wf.debug && wf.debug >= 0 ) {
debug = wf.debug;
pValues += "&debug="+debug;
}
}
return pValues;
}
function getSearchFormValues(formName) {
var pValues = "";
var fValue;
fValue = document.forms[formName]._search.value;
if ( !this.isSpace(fValue) ) {
pValues += "&tcp_nSearch="+escape(fValue);
}
if ( formName == "bool" ) {
if ( document.forms[formName].connector ) {
fValue = document.forms[formName].connector.value;
if ( !this.isSpace(fValue) ) {
pValues += "&tcpconnector="+fValue;
}
}
if ( document.forms[formName].seg1Terms ) {
fValue = document.forms[formName].seg1Terms.value;
if ( !this.isSpace(fValue) ) {
pValues += "&tcpseg1Terms="+fValue;
}
}
}
else if ( formName == "free" ) {
if ( document.forms[formName]._manterms ) {
fValue = document.forms[formName]._manterms.value;
if ( !this.isSpace(fValue) ) {
pValues += "&tcp_manterms="+fValue;
}
}
if ( document.forms[formName]._seg1terms ) {
fValue = document.forms[formName]._seg1terms.value;
if ( !this.isSpace(fValue) ) {
pValues += "&tcp_seg1terms="+fValue;
}
}
}
if ( document.forms[formName].S1 ) {
fValue = document.forms[formName].S1.value;
if ( !this.isSpace(fValue) ) {
pValues += "&tcpS1="+fValue;
}
}
if ( document.forms[formName].dateType[0].checked) {
fValue = document.forms[formName].dateType[0].value;
}
else {
fValue = document.forms[formName].dateType[1].value;
}
if ( !this.isSpace(fValue) ) {
pValues += "&tcpdateType="+fValue;
}
fValue = document.forms[formName].dateRelative.value;
if ( !this.isSpace(fValue) ) {
pValues += "&tcpdateRelative="+fValue;
}
fValue = document.forms[formName].dateFrom.value;
if ( !this.isSpace(fValue) ) {
pValues += "&tcpdateFrom="+fValue;
}
fValue = document.forms[formName].dateTo.value;
if ( !this.isSpace(fValue) ) {
pValues += "&tcpdateTo="+fValue;
}
return pValues;
}
function formToTOC(url) {
var goUrl = url;
var fValue;
var formName = (document.free) ? "free" : "bool";
if ( url && url != "" && document.forms[formName] ) {
var newUrl;
var urlAnchor = "";
newUrl = url.toString().replace(/(#[^#]*)$/, "");
if ( newUrl != url ) {
urlAnchor = RegExp.$1;
goUrl = newUrl;
}
goUrl += this.getSearchFormValues(formName);
if ( document.forms[formName].svc ) {
fvalue = "";
if ( document.forms[formName].svc.value == "fr" ) {
fValue = "free";
}
else if ( document.forms[formName].svc.value == "bl" ) {
fValue = "bool";
}
if ( fValue != "") {
goUrl += "&tcsrchtype="+fValue;
}
}
if ( urlAnchor != "" ) {
goUrl += urlAnchor;
}
}
if ( debug >= 3) {
alert("goUrl="+goUrl);
}
location.href = goUrl;
return false;
}
function getSearchSelectedOnlyState( ) {
var srchSelCboxElem = this.pUtils.cne("srchSelCbox");  // "search selected only" elem
if ( srchSelCboxElem && (result = srchSelCboxElem.src.match(/[^\/]*$/)) ) {
return  result[0];
}
return null;
}
function tcOut(elem, href) {
if ( !this.isTocReady() ) {
this.popTocNotReadyMessage();
return false;
}
if ( !document.tocbuddy &&
!document.bool &&
!document.free ) {
return true;
}
checkJavascriptError();
var searchSelectedOnlyState = this.getSearchSelectedOnlyState();
var searchValue = "";
if ( this.pUtils.cne("_nSearch") ) {
searchValue = this.pUtils.cne("_nSearch").value;
}
var hrefStr = href ? href : elem.href;
var checkedNodeIds = "";
var searchTOC = false;     // the state "Table of Contents" radio
if ( document.tocbuddy ) {
var tocSearchWithinElem = document.tocbuddy.tocSearchWithin;
if ( tocSearchWithinElem && tocSearchWithinElem[1].checked ) {
if (this.isSpace(searchValue)) {
alert('Please enter one or more terms to search this Table of Contents and try again.');
return false;
}
searchTOC = true;
}
if ( elem.name && elem.name == "tocbuddy") {
if ( (!searchValue || this.isSpace(searchValue)) &&
(searchSelectedOnlyState != domTocUi.checkedGIF) ) {
alert('Please enter one or more terms to search this Full-text and try again.');
return false;
}
}
if ( hrefStr &&
((hrefStr.search(/\/research\/del\/(print|download|fax|email|fastPrintProc)/) >= 0 ) ||
(hrefStr.search(/\/research2\/delivery\/(printCpp|downloadCpp|faxCpp|emailCpp)/) >= 0) ||
(hrefStr.search(/\/research2\/fastprint\/submitCpp/) >= 0))) {
if ( totalCheckBoxChecked <= 0 ) {
alert("Print, Download, Fax and Email apply only to selected documents.  If you want to print the Table of Contents displayed on this page, use View in a Printer Friendly Format.");
return false;
}
checkedNodeIds = this.getCheckedNodes(this.pEtModel.pHeList);
if ( checkedNodeIds == "" && totalCheckBoxChecked > 0 ) {
alert("An error has occurred on this page.  Please refresh your browser and begin your task again.");
return false;
}
}
}
if ( (elem.name && elem.name == "tocbuddy") ) {
var searchType     = "";
checkedNodeIds = this.getCheckedNodes(this.pEtModel.pHeList);
if ( searchSelectedOnlyState == domTocUi.checkedGIF ) {
if (document.tocbuddy.tocSearchType[0].checked) {   // check "T&C" radio
searchType = (searchTOC) ? "tocselbool" : "selbool";
}
else {
searchType = (searchTOC) ? "tocselfree" : "selfree";
}
}
else {
if ( document.tocbuddy.tocSearchType[0].checked ) { // check "T&C" radio
searchType = (searchTOC) ? "tocbool" : "bool";
}
else {
searchType = (searchTOC) ? "tocfree" : "free";
}
}
if ( (searchSelectedOnlyState == domTocUi.checkedGIF) &&
isSpace(checkedNodeIds)) {
alert("Please make selections from the Table of Contents or deselect 'Search Selected Only' checkbox.");
return false;
}
document.tocbuddy.tcselnodes.value = checkedNodeIds;
if ( searchSelectedOnlyState == domTocUi.checkedGIF ) {
document.tocbuddy.tcsrchcheck.value = "1";
}
else {
document.tocbuddy.tcsrchcheck.value = "0";
}
if ( (searchType == "selbool"    || searchType == "selfree" ||
searchType == "tocselbool" || searchType == "tocselfree") &&
(document.tocbuddy.tcsrchcheck.value == "1") ) {
if ( searchType == "selfree" && this.isSpace(searchValue) ) {
searchType = "selbool"
}
document.tocbuddy.action = "/research/search/"+searchType;
}
else if ( searchType == "tocbool" || searchType == "tocfree") {
document.tocbuddy.action = "/research/search/"+searchType;
}
else {
document.tocbuddy.action = "/research/search/source/tocbuddy";
}
if ( searchType == "free"    || searchType == "selfree" ||
searchType == "tocfree" || searchType == "tocselfree" ) {
document.tocbuddy.nSvc.value = "fr";
document.tocbuddy._query.value = document.tocbuddy.frquery.value;
}
else if ( searchType == "bool"    || searchType == "selbool" ||
searchType == "tocbool" || searchType == "tocselbool") {
document.tocbuddy.nSvc.value = "bl";
document.tocbuddy._query.value = document.tocbuddy.blquery.value;
}
document.tocbuddy.tcsrchtype.value = searchType;
if ( debug >= 3 ) {
alert("form tocbuddy submission.  form action="+document.tocbuddy.action+".  nSvc="+document.tocbuddy.nSvc.value+".  _query="+document.tocbuddy._query.value+".  SearchSelectedOnly="+document.tocbuddy.tcsrchcheck.value+".  totalNodesChecked="+totalCheckBoxChecked+".  selectedNodes="+document.tocbuddy.tcselnodes.value);
}
return true;
}
if ( elem && hrefStr ) {
if ( document.bool || document.free ) {
hrefStr += this.getSearchFormValues( document.bool ? "bool" : "free" );
}
else {
var persistValues = this.getPersistValues(true);
if ( isSpace(persistValues) ) {
return false;
}
hrefStr += persistValues;
}
if ( debug >= 5 ) {
alert("hrefStr="+hrefStr);
}
elem.href = hrefStr;
}
return true;
}
function tocSrchBuddySubmit(formName) {
if ( this.getSearchSelectedOnlyState() == domTocUi.checkedGIF ) {
var searchType = (formName == "bool") ? "selbool" : "selfree";
if ( searchType == "selfree" &&
document.forms[formName] && document.forms[formName]._search ) {
var searchValue = document.forms[formName]._search.value;
if ( isSpace(searchValue) ) {
searchType = "selbool";
if ( document.forms[formName]._query &&
document.forms[formName].blquery) {
document.forms[formName]._query.value = document.forms[formName].blquery;
}
document.forms[formName].svc.value = "bl";
document.forms[formName]._form.value = "bool";
}
}
document.forms[formName].action = "/research/search/"+searchType;
}
if ( debug >= 3 ) {
alert("action="+document.forms[formName].action);
}
return true;
}
function toggleSearchType(searchType) {
if ( !this.isTocReady() ) {
this.popTocNotReadyMessage();
return;
}
if(this.searchType == searchType) return;
this.searchType = searchType;
var boolElem = document.tocbuddy.tocSearchType[0];
var freeElem = document.tocbuddy.tocSearchType[1];
var boolSp = this.pUtils.sc("boolSpId");
var freeSp = this.pUtils.sc("freeSpId");
if ( this.searchType == "bool" ) {     // boolean is on
boolElem.title   = termsAndConnectors + " " + pressed;
freeElem.title   = NaturalLanguague   + " " + notPressed;
}
else {                                 // freestyle is on
boolElem.title   = termsAndConnectors + " " + notPressed
freeElem.title   = NaturalLanguague   + " " + pressed;
}
if ( boolSp && freeSp ) {
boolSp.title     = boolElem.title;
freeSp.title     = freeElem.title;
}
this.changeAdvancedLinkPath(this.searchType);
}
function toggleSearchSelectedOnly() {
var cboxStatus = this.checkBoxStatusByElem(this.pUtils.getElem("srchSelCbox"));
var toggleSrchSelOnlyValue = "-1";
if ( cboxStatus == domTocUi.checked ) {
toggleSrchSelOnlyValue = "0";  // will be unchecked
}
else if ( cboxStatus == domTocUi.unchecked ) {
toggleSrchSelOnlyValue = "1";  // will be checked
}
else if ( cboxStatus != domTocUi.disabledChecked ) {
if ( debug >= 1 ) {
alert("** unexpected 'Search Selected only' value="+cboxStatus);
}
}
var formName = document.free ? "free" : "bool";
if ( document.forms[formName].tcsrchcheck ) {
document.forms[formName].tcsrchcheck.value = toggleSrchSelOnlyValue;
}
var srcImg = this.pUtils.getElem("srchSelImg");
if(srcImg) {
srcImg.value = "1";
}
document.forms[formName].submit();
}
var tocBrowsePath;
var docQS;
var xlinkPath;
function setCommonPathAndQS(path) {
tocBrowsePath = path;
}
function setCommonDocQS(qs) {
docQS = qs;
}
function setXlinkQS(path) {
xlinkPath = path ;
}
function xlinkToc(nodeId, t) {
tempXlinkPath = xlinkPath;
xlinkPath += "&tcnid=" + nodeId;
if ( t == "1")
document.tocform.target = "_self";
else
document.tocform.target = "_parent";
openFormhelp(xlinkPath,'formhelp',350,375,1);
xlinkPath = tempXlinkPath;
}
function opnNd(e, nodeId, nodeLevel,t) {
var persistValues = this.getPersistValues(false);
if ( persistValues != "" ) {
tocBrowsePath += persistValues;
}
tocBrowsePath += "&tcact=" + "open";
tocBrowsePath += "&tcnid=" + nodeId;
if (nodeLevel == 1) {
tocBrowsePath += "&tcbill=" + "1";
}
tocBrowsePath += "&al=" + nodeId;
tocBrowsePath += "&tcaid=" + nodeId;
tocBrowsePath += "#" + nodeId;
if ( debug >= 5 ) {
alert(tocBrowsePath);
}
e.href=tocBrowsePath;
return true;
if (t == "1")
document.tocform.target = "_self";
else
document.tocform.target = "_parent";
document.tocform.action = tocBrowsePath;
document.tocform.submit();
}
function clsNd(e, nodeId, nodeLevel,t) {
var persistValues = this.getPersistValues(false);
if ( persistValues != "" ) {
tocBrowsePath += persistValues;
}
tocBrowsePath += "&tcact=" + "close";
tocBrowsePath += "&tcnid=" + nodeId;
tocBrowsePath += "&al=" + nodeId;
tocBrowsePath += "&tcaid=";
if (nodeLevel > 1) {
tocBrowsePath += nodeId;
tocBrowsePath += "#" + nodeId;
}
if ( debug >= 5 ) {
alert(tocBrowsePath);
}
e.href=tocBrowsePath;
return true;
if (t == "1")
document.tocform.target = "_self";
else
document.tocform.target = "_parent";
document.tocform.action = tocBrowsePath;
document.tocform.submit();
}
function rtc2dc(e, toc2docnid,lni,refpt,procOrNobill,t) {
var path = "/research/tocreturn";
return this.toctodoc(e, toc2docnid,lni,refpt,procOrNobill,path, t);
}
function tc2dc(e, toc2docnid,lni,refpt,procOrNobill,t) {
var path = "/research/search/toctodoc";
return this.toctodoc(e, toc2docnid,lni,refpt,procOrNobill,path, t);
}
function toctodoc(e, toc2docnid,lni,refpt,procOrNobill,path,t) {
var toctodocpathandqs;
toctodocpathandqs  = path + docQS;
toctodocpathandqs += "&tcsvrnid=" + toc2docnid;
if (lni != '')
toctodocpathandqs += "&tclni=" + lni;
if (refpt != '')
toctodocpathandqs += "&tcrefpt=" + refpt;
if (procOrNobill == "2")
toctodocpathandqs += "&tcwchProc=" + procOrNobill;
else if (procOrNobill == "1")
toctodocpathandqs += "&tcnobill=" + procOrNobill;
var persistValues = this.getPersistValues(false);
if ( persistValues != "" ) {
toctodocpathandqs += persistValues;
}
e.href=toctodocpathandqs;
return true;
if (t == "1")
document.tocform.target = "_self";
else
document.tocform.target = "_parent";
document.tocform.action = toctodocpathandqs;
document.tocform.submit();
}
function setCheckBoxColl()
{
this.checkBoxColl = document.getElementsByName("TOCCheckbox");
}
function getCheckBox(sId)
{
var pCB = null;
if(this.checkBoxColl) {
pCB = this.retrieveCB(sId);
}
return pCB;
}
function setFocus()
{
if(location.hash) {
var sId = location.hash.slice(1,location.hash.length);
var pHash = this.pUtils.cne(sId);
if(pHash) {
return;
}
}
var pSearch = this.pUtils.cne("_nSearch");
if(pSearch) {
pSearch.focus();
}
}
function toggleSearchWithin(type)
{
var swTextElem  = document.getElementById("swtext");
var advLinkElem = document.getElementById("advanced");
if ( !swTextElem || !advLinkElem ) {
return;
}
if( type == "ft") {
swTextElem.innerHTML = "full text";
advLinkElem.style.visibility = "visible";
}
else {
swTextElem.innerHTML = "Table of Contents";
advLinkElem.style.visibility    = "hidden";
}
}
function getUpdatedCKnodes(nodes) {
for (var x=0; x < nodes.length; x++) {
node = nodes[x];
if ( node.cboxStatus != node.initialCBstatus ) {
updatedNodes += "updated.  "+ node.captionText + "\n";
}
if ( node.heChildren ) {
this.getUpdatedCKnodes(node.heChildren);
}
}
}
function traverseNodes(nodes) {
for (var x=0; x < nodes.length; x++) {
node = nodes[x];
if ( node.childrenCheckedCnt <= 0 && node.childrenGrayCheckedCnt <= 0 &&
node.curHeChildrenIdx < 0 && !node.heChildren) {
continue;
}
nodeInfo += "level="+node.levelNum + "  ";
nodeInfo += "status="+node.cboxStatus + "  ";
nodeInfo += "childCheckedCnt="+node.childrenCheckedCnt + "  ";
nodeInfo += "childGrayCheckedCnt="+node.childrenGrayCheckedCnt + "  ";
nodeInfo += "totalChildren="+(node.curHeChildrenIdx+1) + "   ";
for (var y=1; y < node.levelNum; y++) {
nodeInfo += "___";
}
nodeInfo += node.captionText + ".  ";
nodeInfo += "\n";
if ( node.heChildren ) {
this.traverseNodes(node.heChildren);
}
}
}
var nodeInfo="";
function dumpNodes() {
nodeInfo = "";
this.traverseNodes(this.pEtModel.pHeList);
alert(nodeInfo);
}
var checkedNodes = "";    // Testing...
var updatedNodes = "";    // testing...
function getAllCheckedNodes(nodes) {  // TESTING...
for (var x=0; x < nodes.length; x++) {
node = nodes[x];
if ( node.cboxStatus == domTocUi.checked ) {
checkedNodes += "checkbox=checked.          NodeId="+node.refpt+"  "+ node.captionText + "\n";
if ( _checkedNodeIds != "" ) {
_checkedNodeIds += ",";
}
_checkedNodeIds += node.refpt;
}
else if ( node.cboxStatus == domTocUi.grayChecked ) {
checkedNodes += "checkbox=grayChecked.  NodeId="+node.refpt+"  "+node.captionText + "\n";
}
if ( (node.cboxStatus == domTocUi.checked ||
node.cboxStatus == domTocUi.grayChecked) && node.heChildren ) {
this.getAllCheckedNodes( node.heChildren );
}
}
}
function changeDebugLevel() {
debug = fdebug.debug.value;
alert(debug);
return true;
}
function printResult() {
this.getAllCheckedNodes(this.pEtModel.pHeList);
alert(checkedNodes);
alert(_checkedNodeIds);
return false;
}
function createCiteAsstObj(utils, browser, model, TOCcite)
{
if(browser.ie5up) {
return new ie5CiteAsst(utils, browser, model, TOCcite);
}
if(browser.ie4) {
return new ie4CiteAsst(utils, browser, model, TOCcite);
}
if(browser.nav4) {
return new ns4CiteAsst(utils, browser, model, TOCcite);
}
return new domCiteAsst(utils, browser, model, TOCcite);
}
function domCiteAsst(utils, browser, model, TOCcite){
this.pUtils = utils;
this.pBrowser = browser;
this.pEtModel = model;
this.tocCite = TOCcite
this.mouseX;
this.mouseY;
this.srcElem;
this.tmOID = 0;
this.tmOhide = 0;
this.menuDur = 8000;
this.menuDelay = 2000;
this.ie4owhf = true;      // ie4 offsetwidth high offset.
this.showCA = showCA;
this.hideCA = hideCA;
this.setCA = setCA;
this.clrCA = clrCA;
this.execCA = execCA;
this.initCALyr = initCALyr;
this.destCALyr = destCALyr;
this.findClosestRefpt = findClosestRefpt;
this.cursorAfterThisEle = cursorAfterThisEle;
this.anc = anc;
this.getRefpts = getRefpts;
this.thisEleBeforeThatEle = thisEleBeforeThatEle;
this.getCiteAssistantTrail = getCiteAssistantTrail;
this.cursorOutsideHe = cursorOutsideHe;
this.getClosestRefpt = getClosestRefpt;
this.bottomBrPos = bottomBrPos;
this.tocName  = "TOC";
this.pRefpt = null;
}
function anc(id, idx)
{
return ( (this.pUtils.ac(id).length) ?
(this.pUtils.ac(id)[idx]) :
(this.pUtils.ac(id)) );
}
function initCALyr(){
var ld;
if(window.Content){
ld= parent.Content.document;
}else{
ld= document;
}
ld.addEventListener("mousemove",   this.setCA, true);
ld.addEventListener("mouseout",  this.clrCA, true);
ld.body.addEventListener("scroll", this.setCA, true);
ld.body.addEventListener("unload", this.destCALyr, true);
var pElem = ld.body.appendChild(ld.createElement("DIV"));
pElem.id = "CALyr";
pElem.className = "CALyr";
}
function setCA(event) {
var pCite = pToc.getCiteAsstPtr();
window.status = "";
pCite.hideCA();
pCite.clrCA();
if(!event || !event.currentTarget) {
if(window.Content){
event = pCite.pUtils.getEvent(parent.Content, pCite, true);
}else{
event = pCite.pUtils.getEvent(window, pCite, true);
}
}
if(!event) return;
pCite.mouseX = event.pageX;
pCite.mouseY = event.pageY;
if (event.type == "scroll") {
pCite.clrCA();
var cDoc ;
if(window.Content){
cDoc= parent.Content.document;
}else {
cDoc= document;
}
if ((cDoc.scrollTrigger) && (cDoc.scrollTrigger != 0))
clearTimeout(cDoc.scrollTrigger);
pCite.tmOID = cDoc.scrollTrigger = setTimeout("pToc.getCiteAsstPtr()." +
"execCA(pToc.getCiteAsstPtr().srcElem);document.scrollTrigger=0",
pCite.menuDelay);
return true;
}
pCite.srcElem = event.target;
if (pCite.srcElem.tagName == "IMG") {
return true;
}
else {
var e = pCite.srcElem;
while (e.tagName != "BODY" && e.tagName != "HTML") {
if (e.tagName == "A") {
if (e.getAttribute("href") && e.getAttribute("href") != "") {
return true;  // It's inside a HREF link
}
break;
}
if (e.parentElement)
e = e.parentElement;
else
break;
}
}
var bsoffsetTop ;
var beoffsetTop;
var screenWidth;
if(window.Content){
bsoffsetTop = pCite.pUtils.getElem("bodystyle", "Content").offsetTop;
beoffsetTop = pCite.pUtils.getElem('bodyend', "Content").offsetTop;
screenWidth = parent.Content.document.body.clientWidth;
}else{
bsoffsetTop = pCite.pUtils.getElem("bodystyle", "").offsetTop;
beoffsetTop = pCite.pUtils.getElem('bodyend', "").offsetTop;
screenWidth = document.body.clientWidth;
}
if ((pCite.mouseY >= bsoffsetTop) &&
(pCite.mouseY <= beoffsetTop)  &&
(pCite.mouseX < screenWidth) ) {
pCite.tmOID = setTimeout("pToc.getCiteAsstPtr().execCA(pToc.getCiteAsstPtr().srcElem)", pToc.getCiteAsstPtr().menuDelay);
}
}
function hideCA(){
var pElem ;
if(window.Content){
pElem = pToc.getCiteAsstPtr().pUtils.getElem("CALyr", "Content");
}else{
pElem = pToc.getCiteAsstPtr().pUtils.getElem("CALyr", "");
}
pElem.style.visibility = "hidden";
}
function clrCA(){
var pCite = pToc.getCiteAsstPtr();
if(pCite.tmOID > 0) {
clearTimeout(pCite.tmOID);
pCite.tmOID = 0;
}
if ( pCite.tmOhide > 0 ) {
clearTimeout(pCite.tmOhide);
pCite.tmOhide = 0;
}
pCite.mouseX = -1;
pCite.mouseY = -1;
}
function destCALyr(event){
var ld ;
if(window.Content){
ld = parent.Content.document;
}else{
ld = document;
}
ld.removeEventListener("mousemove", this.setCA, true);
ld.removeEventListener("mouseout", this.clrCA, true);
var pCite = pToc.getCiteAsstPtr();
pCite.clrCA();
pCite = null;
}
function execCA(elem) {
var pCite = pToc.getCiteAsstPtr();
if(pCite.tmOID>0) {
clearTimeout(pCite.tmOID);
pCite.tmOID = 0;
}
var tocCiteTrail = this.tocCite;
var refpt;
refpt = pCite.findClosestRefpt();
if ( refpt ) {
var tocTrail;
tocTrail = pCite.getCiteAssistantTrail( refpt.substr(7) );
if ( tocTrail ) {
tocCiteTrail += " " + tocTrail;
}
}
if(window.Content){
pCite.pUtils.getElem('CALyr', 'Content').innerHTML = tocCiteTrail;
}else{
pCite.pUtils.getElem('CALyr', '').innerHTML = tocCiteTrail;
}
pCite.showCA(tocCiteTrail.length);
window.status = this.pUtils.charEntity2hex(tocCiteTrail);
pCite.tmOhide = setTimeout('pToc.getCiteAsstPtr().hideCA()',
pToc.getCiteAsstPtr().menuDur);
}
function showCA(numChars){
var pCite = pToc.getCiteAsstPtr();
var pSz = 325;     // pop-up size in pixel
var fc  = 6.40;    // average size of a char
var mX = pCite.mouseX;
var mY = pCite.mouseY;
var CALyrElement ;
if(window.Content){
CALyrElement = pCite.pUtils.getElem('CALyr', 'Content');
}else{
CALyrElement = pCite.pUtils.getElem('CALyr', '');
}
var CALyroffW = CALyrElement.offsetWidth;
var CALyroffH = CALyrElement.offsetHeight;
if ( pCite.pBrowser.ie4 || (fc * numChars) > pSz ) {
var citeLength = fc * (numChars);
if (citeLength > pSz)
citeLength = pSz;
CALyrElement.style.width = citeLength+"px";
if (pCite.ie4owhf) {
pCite.ie4owhf = false;
CALyroffW = parseInt(CALyrElement.style.width);
CALyroffH = 17;
}
}
if ((document.body.clientWidth - mX) < CALyroffW)
CALyrElement.style.left = mX - (CALyroffW + 10);
else
CALyrElement.style.left = 10 + mX;
if (mY + CALyroffH + 10 > this.bottomBrPos() )
CALyrElement.style.top = mY - (CALyroffH + 10);
else
CALyrElement.style.top = 10 + mY;
CALyrElement.style.visibility = "visible";
}
function getRefpts() {
if ( this.pRefpt == null ) {
if(!domEtModel.lgFence) {
this.pRefpt = this.pUtils.getTagElems("A", this.tocName);
} else {
this.pRefpt = document.getElementsByName(this.tocName);
}
}
return this.pRefpt;  // return refpt collection
}
function cursorAfterThisEle(tocAnchorEle) {
var coordX = this.mouseX;
var coordY = this.mouseY;
var lh ;
if(window.Content){
lh= this.pUtils.getElem("lineheight", "Content").offsetHeight;  // line height
}else{
lh= this.pUtils.getElem("lineheight", "").offsetHeight;  // line height
}
var eleOff = this.pUtils.calculateOffsetCite( tocAnchorEle, 0);
if ((((coordY - eleOff )<= lh) && (coordX > tocAnchorEle.offsetLeft) &&
(coordY > eleOff)) || (coordY > (eleOff +lh))) {
return true;
}
return false;
}
function thisEleBeforeThatEle(thisEle, thatEle) {
if ( (thisEle.offsetTop  <  thatEle.offsetTop) ||
(thisEle.offsetTop  == thatEle.offsetTop) &&
(thisEle.offsetLeft <  thatEle.offsetLeft) ) {
return true;
}
return false;
}
function cursorOutsideHe(refptColl) {
if ( this.pEtModel.pSegments == null ) {
return false;  // no segment - inside he by default
}
if(!domEtModel.lgFence) {
if ( this.pEtModel.pSegments == null ) {
return false;  // no segment - inside he by default
}
var segColl = this.pUtils.ac(domEtModel.segName);
var segCollLen = 1;  // assume there is only one segment
if ( segColl.length ) {
segCollLen = segColl.length;
}
if ( this.cursorAfterThisEle(refptColl[0]) &&
!this.cursorAfterThisEle(refptColl[refptColl.length-1]) ) {
return false;  // cursor is within the 1st and last TOC hierarchy elements
}
for (var x = (segCollLen-1); x >= 0; x--) {
if (this.thisEleBeforeThatEle(refptColl[refptColl.length-1], this.anc(domEtModel.segName,x)) &&
this.cursorAfterThisEle(this.anc(domEtModel.segName,x)) ) {
return true;  // it's outside
}
}
} else {//Flag = false
var segNodes = document.getElementsByName(domEtModel.segName);
var segCollLastElemIndex = segNodes.length - 1
if ( this.cursorAfterThisEle(refptColl[0]) &&
!this.cursorAfterThisEle(refptColl[refptColl.length-1]) ) {
return false;  // cursor is within the 1st and last TOC hierarchy elements
}
for (var x=segCollLastElemIndex; x > -1; x--) {//loop from the bottom of the list to the top
if (this.thisEleBeforeThatEle(refptColl[refptColl.length-1], segNodes[x]) &&
this.cursorAfterThisEle(segNodes[x]) ) {
return true;  // it's outside
}
}
}
return false;
}
function findClosestRefpt() {
var refptColl = this.getRefpts();
if ( !refptColl) {
return null;
}
if ( !this.pEtModel.pSegments ) {
if ( refptColl.length ) {
return this.getClosestRefpt(refptColl);
}
else {
/*CWB - The following code is in fact incorrect.  After the fix for the
PowerNav is released this code should be removed and the code below that
is commented out should replace it.  This change has not been tested.*/
if ( this.cursorAfterThisEle(this.anc(this.tocName,0)) ) {
return refptColl.name;
}
/*var tocNodes = document.getElementsByName(this.tocName);
if (tocNodes.length > 0 && this.cursorAfterThisEle(tocNodes[0]) ) {
return refptColl.id;
}*/
}
return null;
}
if ( !refptColl.length ) {
if ( this.cursorAfterThisEle(refptColl) ) {
/*CWB - The following code is in fact incorrect.  After the fix for the
PowerNav is released this code should be removed and the code below that
is commented out should replace it.  This change has not been tested.*/
var segColl = this.pUtils.ac(domEtModel.segName);
var segCollLen = 1;  // assume there is only one segment
if ( segColl.length ) {
segCollLen = segColl.length;
}
for (var x = (segCollLen-1); x >= 0; x--) {
if (this.thisEleBeforeThatEle( this.anc(this.tocName,0), this.anc(domEtModel.segName,x) ) ) {
if ( !this.cursorAfterThisEle(this.anc(domEtModel.segName,x)) )
return refptColl.name;
break;
}
}
/*var segNodes = document.getElementsByName(domEtModel.segName);
var segCollLastElemIndex = segNodes.length - 1
var tocNodes = document.getElementsByName(this.tocName);
var segNodes = document.getElementsByName(domEtModel.segName);
for (var x=segCollLastElemIndex; x > -1; x--) {
if (this.thisEleBeforeThatEle(tocNodes[0], segNodes[x] ) ) {
if ( !this.cursorAfterThisEle(segNodes[x]) )
return refptColl.id;
break;
}
}*/
}
return null;
}
if ( this.cursorOutsideHe( refptColl ) ) {
return null;
}
return this.getClosestRefpt(refptColl);
}
function getClosestRefpt(refptColl) {
var high = refptColl.length - 1;
var low = 0;
var mid = 0;
var mx  = this.mouseX;
var my  = this.mouseY;
do {
mid=Math.floor((low+high)/2);
if (this.pUtils.sameLineCite(refptColl[mid],my)) {
if (mx<refptColl[mid].offsetLeft)
high=mid - 1;
else
low=mid + 1;
}
else {
var offsetValue = this.pUtils.calculateOffsetCite(refptColl[mid],0);
var browsedoc= document.getElementById("docbody");
if(browsedoc){
offsetValue = offsetValue - browsedoc.scrollTop ;
}
if (my< offsetValue)
high=mid - 1;
else
low=mid + 1;
}
} while (low <= high);
if (high >=0) {
var anchorName = "";
if ( high < mid ) {
if(!domEtModel.lgFence) {
anchorName = refptColl[high].name;
} else {
anchorName = refptColl[high].id;
}
}
else {
if(!domEtModel.lgFence) {
anchorName = refptColl[mid].name;
} else {
anchorName = refptColl[mid].id;
}
}
return anchorName;
}
return null;
}
function getCiteAssistantTrail(refpt) {
var refpt_he;
if ( ! (refpt_he = this.pEtModel.getChildren(refpt)) ) {
return null;
}
var trail = "";
for (var pHe = refpt_he; pHe; pHe = pHe.heParent) {
trail = pHe.labelNum + trail;
}
return trail;
}
function bottomBrPos()
{
return (pageYOffset + window.innerHeight);
}
