var nShowTimer, nHideTimer, nCreateTimer;
function clearAllTimersT()
{
if(!isNaN(nHideTimer))
{
clearTimeout(nHideTimer);
}
if(!isNaN(nShowTimer))
{
clearTimeout(nShowTimer);
}
return true;
}
function sd(sNodeID, oImage)//showDiv()
{
if(!isNaN(nHideTimer))
{
clearTimeout(nHideTimer);
}
pToc.oMenu.setMeProperties(sNodeID, oImage);
nShowTimer = setTimeout("pToc.oMenu.createMeMenu()", 500);
return false;
}
function dhd()//delayHideDiv()
{
if(!isNaN(nShowTimer))
{
clearTimeout(nShowTimer);
}
nHideTimer = setTimeout("pToc.oMenu.hideMeDiv()", 1000);
return true;
}
function ihd()//immediateHideDiv()
{
if(!isNaN(nShowTimer))
{
clearTimeout(nShowTimer);
}
nHideTimer = setTimeout("pToc.oMenu.hideMeDiv()", 10);
return true;
}
function callOpnClsNd(oCurTag)
{
var sParameters = oCurTag.id;
var oParamArray = sParameters.split("|");
pToc.oMenu.oCurDiv.onmouseout = null;
if(oParamArray.length == 3)
{
pToc.opnNd(oParamArray[0], oParamArray[1], oParamArray[2], "true");
}
else if(oParamArray.length == 2)
{
pToc.clsNd(oParamArray[0], oParamArray[1], "true");
}
return false;
}
function alterRowStyle(oCurTag, sClassName)
{
clearAllTimersT();
while(oCurTag.nodeName != "TR")
{
oCurTag = oCurTag.parentNode;
}
oCurTag.className = sClassName;
return true;
}
function MultiExpand()
{
this.sNodeID	= "";
this.oImage		= null;
this.sImgALT	= ""
this.oCurDiv	= null;
this.sCurHdr	= null;
this.nCurClvl	= null;
this.sCurNlvl	= null;
this.nTopPos	= 0;
this.nLeftPos	= 0;
this.setMeProperties		= setMeProperties;
this.getMePosition			= getMePosition;
this.createMeMenu			= createMeMenu;
this.getMeHeaderText		= getMeHeaderText
this.parseNonAlphaNumeric	= parseNonAlphaNumeric;
this.createMeDiv			= createMeDiv
this.createMeTable			= createMeTable;
this.createMeRow			= createMeRow;
this.createMeArrow			= createMeArrow;
this.createMeLink			= createMeLink;
this.setMeEventHandler		= setMeEventHandler;
this.positionMeDiv			= positionMeDiv;
this.calcMeScrnPos			= calcMeScrnPos;
this.showMeDiv				= showMeDiv;
this.hideMeDiv				= hideMeDiv;
this.getNodeTextValue		= getNodeTextValue;
this.getNodeLevel			= getNodeLevel;
this.setDivHeightWidth		= setDivHeightWidth;
}
function setMeProperties(sNodeID, oImage)
{
var oHeader = null;
var oCurNlvl = null;
this.oImage = oImage;
this.sImgALT = oImage.getAttribute("ALT");
this.sNodeID = sNodeID;
this.nTopPos = this.getMePosition(oImage, "top");
this.nLeftPos = this.getMePosition(oImage, "left");
this.sCurHdr = this.getMeHeaderText(sNodeID);
this.nCurClvl = this.getNodeLevel(sNodeID);
this.oCurNlvl = document.getElementById("nlvl_" + sNodeID);
if(this.oCurNlvl)
{
this.sCurNlvl = this.getNodeTextValue(this.oCurNlvl);
}
else
{
this.sCurNlvl = "0";
}
return;
}
function getMePosition(oElement, sAxis)
{
var sPos = 0;
while (oElement != null)
{
if(sAxis == "top")
{
sPos += oElement.offsetTop;
}
else
{
sPos += oElement.offsetLeft;
}
oElement = oElement.offsetParent;
}
return sPos;
}
function createMeMenu()
{
this.hideMeDiv();
this.oCurDiv = this.createMeDiv();
var oLvlArray = this.sCurNlvl.split("|");
var nLvlLength = oLvlArray.length + this.nCurClvl
var oNewTable = this.createMeTable("table_div", "tableDiv");
var oNewTBody = document.createElement("TBODY");
var sRelNodeLvl = 0;
var bArrowImg, sLinkID, sNewRow, sNodeID, sParHdr;
for(x=1; x<=nLvlLength; x++)
{
if(x == this.nCurClvl)
{
if(this.sImgALT == "Expand")
{
sNewRow = this.sCurHdr;
sLinkID = this.sNodeID + "|" + this.nCurClvl + "|1";
bArrowImg = true;
}
else if(this.sImgALT == "Collapse")
{
sNewRow = this.sCurHdr;
sLinkID = this.sNodeID + "|" + this.nCurClvl;
bArrowImg = true;
}
else
{
sNewRow = this.sCurHdr;
sLinkID = "";
bArrowImg = true;
x = nLvlLength + 1;
}
}
else if(x > this.nCurClvl)
{
var sItem = " Item"
if(oLvlArray[sRelNodeLvl] > 1)
{
sItem += "s"
}
sNewRow = 'Open to level ' + (x) + ' (' + jsTrim(oLvlArray[sRelNodeLvl]) + sItem + ')';
sRelNodeLvl++;
sLinkID = this.sNodeID + "|" + this.nCurClvl + "|" + sRelNodeLvl;
bArrowImg = false;
}
else if(x < this.nCurClvl)
{
sNodeID = this.sNodeID.substring(0, (nNodeIdLen*(x))+1);
sParHdr = this.getMeHeaderText(sNodeID);
sNewRow = 'Close ' + sParHdr;
sLinkID = sNodeID + "|" + this.nCurClvl;
bArrowImg = false;
}
oNewTBody.appendChild(this.createMeRow("row" + x, "menuRow", sNewRow, bArrowImg, sLinkID));
}
oNewTable.appendChild(oNewTBody);
this.oCurDiv.appendChild(oNewTable);
document.body.appendChild(this.oCurDiv);
this.positionMeDiv();
this.showMeDiv();
return;
}
function getMeHeaderText(sHdrId)
{
var sHeader;
var oHeader = document.getElementById("hdr_" + sHdrId);
if(oHeader != null)
{
sHeader = this.getNodeTextValue(oHeader);
sHeader = parseNonAlphaNumeric(sHeader) + " ";
}
else
{
oHeader = document.getElementById("cap_" + sHdrId);
sHeader = " ";
if(oHeader == null)
{
oHeader = document.getElementById("cape_" + sHdrId);
sHeader = "... ";
}
sHeader = this.getNodeTextValue(oHeader) + sHeader;
}
return sHeader;
}
function parseNonAlphaNumeric(sText)
{
var nLastChar = sText.length
var nTextLength = nLastChar-1;
var rAlphaNumeric = /\w/;
var sChar;
for(var x=nTextLength; x>0; x--)
{
sChar = sText.charAt(x);
if(rAlphaNumeric.exec(sChar) != null)
{
break;
}
else
{
nLastChar = x;
}
}
return sText.substring(0, nLastChar);
}
function createMeDiv()
{
var oNewDiv = document.createElement("DIV");
oNewDiv.setAttribute("id", "menuDiv");
oNewDiv.setAttribute("name", "menuDiv");
oNewDiv.className = "divInactive";
this.setMeEventHandler(oNewDiv, "onmouseover", clearAllTimersT);
this.setMeEventHandler(oNewDiv, "onmouseout", dhd);
return oNewDiv;
}
function createMeTable(sID, sClass)
{
var oNewTable = document.createElement("TABLE");
oNewTable.setAttribute("id", sID);
oNewTable.className = sClass;
return oNewTable;
}
function createMeRow(sID, sClass, sText, bImage, sLinkID)
{
var oNewRow = document.createElement("TR");
var oNewCell = document.createElement("TD");
var oNewText = document.createTextNode(sText);
var oNewLink, oNewArrow;
oNewCell.setAttribute("valign", "middle")
oNewRow.className = "trInactive";
if(bImage)
{
oNewArrow = createMeArrow();
if(sLinkID == "")
{
oNewCell.appendChild(oNewText);
oNewCell.appendChild(oNewArrow);
oNewRow.appendChild(oNewCell);
}
else
{
oNewLink = this.createMeLink(sLinkID);
oNewLink.appendChild(oNewText);
oNewLink.appendChild(oNewArrow);
oNewCell.appendChild(oNewLink);
oNewRow.appendChild(oNewCell);
this.setMeEventHandler(oNewRow, "onmouseover", rowStyleActive);
this.setMeEventHandler(oNewRow, "onmouseout", rowStyleInactive);
this.setMeEventHandler(oNewRow, "onclick", getMeTargetAndCall);
}
}
else
{
oNewLink = this.createMeLink(sLinkID);
oNewLink.appendChild(oNewText);
oNewCell.appendChild(oNewLink);
oNewRow.appendChild(oNewCell);
this.setMeEventHandler(oNewRow, "onmouseover", rowStyleActive);
this.setMeEventHandler(oNewRow, "onmouseout", rowStyleInactive);
this.setMeEventHandler(oNewRow, "onclick", getMeTargetAndCall);
}
return oNewRow;
}
function createMeArrow()
{
oNewFont = document.createElement("FONT");
oNewFont.setAttribute("face", "webdings");
oNewText = document.createTextNode("3");
oNewFont.appendChild(oNewText);
return oNewFont;
}
function createMeLink(sID)
{
var oNewAnchor = document.createElement("A");
oNewAnchor.setAttribute("id", sID);
oNewAnchor.className = "aMenuItem";
this.setMeEventHandler(oNewAnchor, "onmouseover", rowStyleActive);
this.setMeEventHandler(oNewAnchor, "onmouseout", rowStyleInactive);
return oNewAnchor;
}
function positionMeDiv()
{
var nScrnTopPos = 0;
var divHeight = this.oCurDiv.offsetHeight;
var divWidth = this.oCurDiv.offsetWidth;
var scrollAdjust =0;
var browsediv = document.getElementById("docbody");
if(browsediv){
scrollAdjust = browsediv.scrollTop;
}
nScrnTopPos = this.calcMeScrnPos(this.nTopPos);
if((nScrnTopPos-14) < divHeight)
{
divHeight = this.setDivHeightWidth(divHeight, divWidth);
this.oCurDiv.style.top = this.nTopPos - scrollAdjust +(nScrnTopPos-divHeight);
}
else
{
this.oCurDiv.style.top = this.nTopPos + 14 - scrollAdjust;
}
this.oCurDiv.style.left = this.nLeftPos+14;
return;
}
function showMeDiv()
{
this.oCurDiv.style.visibility = "visible";
return;
}
function hideMeDiv()
{
if(this.oCurDiv)
{
this.oCurDiv.style.visibility = "hidden";
document.body.removeChild(this.oCurDiv);
this.oCurDiv = null;
}
return;
}
