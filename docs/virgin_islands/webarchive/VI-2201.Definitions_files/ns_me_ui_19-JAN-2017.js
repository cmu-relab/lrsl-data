function getMeTargetAndCall(e)
{
var oCurTag = e.target;
if(oCurTag.nodeName == "TD")
{
oCurTag = oCurTag.firstChild;
}
while(oCurTag.nodeName != "A")
{
oCurTag = oCurTag.parentNode;
}
callOpnClsNd(oCurTag);
return false;
}
function rowStyleActive(e)
{
alterRowStyle(e.target, "trActive");
return true;
}
function rowStyleInactive(e)
{
alterRowStyle(e.target, "trInactive");
return true;
}
function setMeEventHandler(oEventCaller, sEvent, oFunction)
{
sEvent = sEvent.substring(2);//Remove "ON" from the event for NN only
oEventCaller.addEventListener(sEvent, oFunction, false);
return true;
}
function calcMeScrnPos(nTopPos)
{
var browsediv = document.getElementById("docbody");
var nScrnTopPos;
if(browsediv){
nScrnTopPos = window.innerHeight - nTopPos + browsediv.scrollTop;
}else{
nScrnTopPos = (pageYOffset+window.innerHeight)-nTopPos;
}
return nScrnTopPos;
}
function setDivHeightWidth(divHeight, divWidth)
{
if(divHeight > window.innerHeight)
{
divHeight = window.innerHeight
this.oCurDiv.style.height = window.innerHeight
this.oCurDiv.style.width = divWidth + 20;
this.oCurDiv.style.overflow = "auto";
}
return divHeight;
}
