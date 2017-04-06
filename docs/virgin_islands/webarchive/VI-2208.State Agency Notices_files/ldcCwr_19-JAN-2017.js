function ccObj()
{
this.debug = 0;
this.p=new Array(); //array of reporter pp's
this.nr = 0;     // number of reporters listed for document
this.pr = null;  // array of star reporters
this.x = null;   // the xlink URL
this.bb = null;  // the reference (someday will be blue book)
this.ci = null;  // cite
this.cy = null;  // court, year
this.na = null;  // case name
this.pow = null; // the popup win that displays sel text + reference
this.cdoc = null;// the Content frame document
this.cwin = null;// the Content frame window
this.news = false;//self explanatory comment
this.u = null;   // the usual utils pointer
this.txt = "";   // the selected text
this.startOfFootNote = false; //indicates if a footnote element has started
this.getCourtYear = function(lr)
{
re = /([0-9]+)\s+(.+)LEXIS.+/;
var cy = re.exec(lr);
var cyr = (cy[1] || cy[2])?"(":"";
if (!cyr) return "";
cyr = cyr + cy[2];
if (cy[1] && cy[2]) cyr = cyr + " ";
cyr = cyr + cy[1] + ")";
return cyr;
}
this.init = function()
{
if (this.debug) alert("init...");
this.cdoc = document;
this.cwin = window;
var gs = this.cwin.ln_browse;
this.x = gs.xlinkURL;
this.get = gs.isgetable;
if (gs.ajuri && gs.deyear) {
this.cy = "("+gs.ajuri+" "+gs.deyear+")";
} else {
this.cy=null;
}
this.ci=gs.cite;
this.na=gs.docName;
this.bb = (this.na)?this.na+", "+this.ci:this.ci;
this.u = (pUtils)?pUtils:getUtilsObj();
this.u.getHeaders(1);
this.pr = this.u.headArr;
this.nr = this.pr.length;
if (this.nr>0){
var realnumrep=0;
for (i=0;i<this.nr;i++){
if (this.pr[i].className=="pmhead"){
realnumrep+=1;
}
}
this.nr=realnumrep;
}
this.lx = -1;
var courtYear=null;
try {
if (this.nr > 0) {
for (i = 0; i < this.nr; i++) {
if (this.pr[i].firstChild.innerHTML.indexOf("LEXIS") > 0) {
courtYear = this.getCourtYear(this.pr[i].firstChild.innerHTML);
this.lx=i;
}
}
}
} catch (exception) {
if (this.debug) alert("ERROR: failed to init reporter array");
}
if (!this.cy) {
this.cy=courtYear;
}
if (this.debug) alert("cy=" + this.cy);
var espan = null;
espan=this.u.getElem("docreference");
if (espan) {
if (this.bb && this.bb == "News") {
if (this.debug) alert("docRef == News");
var ems = this.cdoc.getElementsByTagName("EM");
if (ems) {
espan.innerHTML="<b>"+ems[0].innerHTML+"</b>";
this.bb = ems[0].innerHTML;
}
}
this.news = true;
}
if (this.debug) alert("cc init: nrep="+this.nr+"\n"+"x="+this.x+"\n"+"doc="+this.bb);
}
this.init();
this.mousedown = function(ev)
{
if (!cc) return true;
if (!cc.get) return true;
var agt=navigator.userAgent.toLowerCase();
if(pBrowser.ie5up){
var pSection = document.getElementById("tempSection");
tar = event.srcElement;
}
else{
var pSection = document.getElementById("moredocket");
tar=ev.target;
}
if(pSection){
if(pSection.className == "leftPaneMoreBox" && !(  tar.offsetParent.className == "leftPaneMoreBox" || tar.offsetParent.className== "leftPaneContent" || tar.offsetParent.className == "leftPaneHeader" )){
pSection.className = "hideNode";
}
}
var e=(cc.cwin.event)?cc.cwin.event:ev;
try {
if ((pBrowser.ie5up&&e.button==1)) {
if (e.srcElement.id!="bodystyle"&&e.srcElement.parentNode.id!="bodystyle") {
return true;
}
}
if ((pBrowser.nav&&e.button==0)) {
if (e.target.id!="bodystyle"&&e.target.parentNode.id!="bodystyle") {
return true;
}
}
for (i=0;i<cc.nr;i++) {
var p1=cc.locateSpan(i+1,e.clientX,e.clientY);
re=/.+\*(\w+)/;
p1=(p1)?((re.exec(p1))[1]):"";
cc.p[i]=p1;
}
} catch(exception){if(this.debug)alert("ERROR: cc problem");}
return true;
}
this.cdoc.onmousedown=this.mousedown;
this.POW = function()
{
var wad = 'left=' + Math.round((screen.availWidth - 560) / 2) +
',top=' + Math.round((screen.availHeight - 430) / 2) +
',scrollbars=no' +
',status=no'    +
',width=560'    +
',height=430'   +
',toolbar=no'   +
',location=no'  +
',menubar=no'   +
',resizable=no';
this.pow = window.open('/ri/ldcCwr1.html','cc',wad);
} // end POW function
/* these 2 functions no longer needed by Cw/C, but don't want to delete
them because somebody else might need them someday.
this.Top = function(obj)
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
this.Left = function(obj)
{
var par = obj;
var posx = 0;
while (par.offsetParent &&
par.offsetParent.tagName != "" &&
par.offsetParent.tagName.toUpperCase() != 'BODY')
{
posx = posx + par.offsetParent.offsetLeft;
par = par.offsetParent;
}
return (posx + obj.offsetLeft);
}
*/
this.firstValidReporter = function()
{
return (this.nr)?1:0;
}
this.getHTMLTextWithFormat = function(e)
{
var j;
var resText = "";
if (e.nodeName == "P") {
resText = "<P>";
}
if (e.nodeName == "A") {
var hrefText = e.getAttribute('href',2);
var nameText = e.getAttribute('name');
if (hrefText != null && nameText != null) {
if (hrefText.indexOf("#fnote") >= 0 ||
nameText.indexOf("fnote") == 0 ) this.startOfFootNote = true;
}
}
if (e.hasChildNodes()) {
for (j = 0; j < e.childNodes.length; j++) {
resText = resText + this.getHTMLTextWithFormat(e.childNodes[j]);
}
}
else {
if (e.nodeType == 3) {
if (this.startOfFootNote) {
resText = "n" + e.nodeValue;
this.startOfFootNote = false;
} else {
resText = e.nodeValue;
resText =  resText.replace(/[<]/g,'&lt;');
resText =  resText.replace(/[>]/g,'&gt;');
}
}
else if (e.nodeName == "BR") {
resText = "<BR>";
}
}
return resText;
}
this.sel2div = function()
{
if (this.debug) alert("sel2div");
var r = null;
var sel = null;
var d = this.cdoc.createElement("DIV");
if (pBrowser.ie5up) {
sel = this.cdoc.selection;
if (sel.type != "None") {
r=sel.createRange();
d.innerHTML = (r)?r.htmlText:"";
this.txt = this.getHTMLTextWithFormat(d);
}
} else if (pBrowser.nav7up ||
navigator.userAgent.toLowerCase().indexOf('firefox')) {
var sel = this.cwin.getSelection();
if (sel && sel.rangeCount) {
r = sel.getRangeAt(0);
var r2 = this.cdoc.createRange();
r2.setStart(d,0);
r2.setEnd(d, 0);
r2.insertNode(r.cloneContents());
this.txt = this.getHTMLTextWithFormat(d);
}
}
if (this.debug) alert("sel2div=" + d.innerHTML);
return d;
}
this.locateSpan = function(rptNum, eX, eY)
{
if(this.debug) alert("locateSpan(rptNum=" + rptNum + " eX=" + eX + " eY=" + eY + ")");
if (!this.u.sc("S"+rptNum)) return "";
var pmColl = this.u.scColl("S"+rptNum);
var high = pmColl.length - 1;
if (this.debug) alert("found " + (high+1) + " pagemarkers");
var low = 0;
var mid = 0;
var mx = eX;
var my = eY;
if (!pmColl.length) {
return this.returnSpan(pmColl,eX,eY);
}
do {
mid=Math.floor((low+high)/2);
if (this.u.sameLineCite(pmColl.item(mid),my)) {
if (mx<pmColl.item(mid).offsetLeft)
high=mid - 1;
else
low=mid + 1;
}
else {
var offsetValue = this.u.calculateOffsetCite(pmColl.item(mid),0);
var browsedoc= document.getElementById("docbody");
if(browsedoc){
offsetValue = offsetValue - browsedoc.scrollTop;
}
if (my< offsetValue)
high=mid - 1;
else
low=mid + 1;
}
} while (low <= high);
var pmInnerTxt="";
if (high >=0)
pmInnerTxt=(high<mid)?pmColl.item(high).firstChild.data:pmColl.item(mid).firstChild.data;
if (this.debug) alert("locateSpen return=" + pmInnerTxt);
return pmInnerTxt;
}
this.returnSpan = function(pr, eX, eY)
{
var mx = eX;
var my = eY;
var lh;
lh = this.u.getElem("lineheight").offsetHeight;  // line height
var prt = this.u.calculateOffsetCite(pr,0);
if ((((my - prt )<= lh) && (mx > pr.offsetLeft) && (my > prt)) || (my > (prt + lh)))
return pr.innerText;
else
return "";
}
this.parseRange = function(cr,caci,islex)
{
if (this.debug) alert("parseRange(" + cr + ", " + caci + " islex=" + islex + ")");
var d = this.sel2div();
var p1=(this.p&&this.cr)?this.p[this.cr-1]:null;
var flag = true;
var text;
if(pBrowser.ie5up){
text = d.innerText;
}
else{
text = d.textContent;
}
var sp = d.getElementsByTagName("SPAN");
var pm = null;
var spid;
var spam;
var re = /.*\-(\w+)/;
for (i=0; i<sp.length; i++) {
spid = (pBrowser.ie)?sp.item(i).id:sp.item(i).getAttribute("name");
if (spid && spid.charAt(1) == cr) {
spam = (pBrowser.ie)?sp.item(i).name:sp.item(i).id;
if(!spam) {
spam=sp.item(i).getAttribute("name");
}
pm = re.exec(spam);
if (!p1 && pm) p1 = pm[1];
/* if p1 resulting from mousedown location pinpoint page search
*  is greater than a pinpoint within the selected range of text
*  then discard p1. Why? User has scrolled away since initial
*  click and made a selection elsewhere.
**/
if (p1 && pm) {
if (p1 > pm[1]) p1=pm[1];
if (p1 == pm[1]){
var decrementFlag =true;
if(flag){
flag = false;
var m = d.getElementsByTagName("*");
var fc;
var sc;
for(j=0; j<m.length-1; j++){
curr = (pBrowser.ie)?m.item(j).name:m.item(j).getAttribute("name");
nxt = (pBrowser.ie)?m.item(j+1).name:m.item(j+1).getAttribute("name");
if (curr) fc=curr;
if (nxt) sc=nxt;
if (sc && fc)
if(fc=="SEGH" && (spam.indexOf(sc)!= -1)) {
decrementFlag = false;
break;
}
}
}
var	expr = /.+[\s]+.+[\[][*].+/;
if (expr.test(text) && decrementFlag) p1=p1-1;
}
}
}
}
var p2 = (pm)?pm[1]:"";
if (this.debug) alert("p1=" + p1 + " p2=" + p2);
var ns=null;  //xlink search term
var fp;       //first pagemarker, if any
var pp;       //the pinpoint of the cite
if (p1 || p2) {
if (caci.indexOf(",") > 0) {
re = /.*\,\s(.*)/;
if( re.exec(caci) )
ns = ((re.exec(caci))[1]).replace(/(\s)/g, "+");
else
ns = caci.replace(/(\s)/g, "+");
} else ns = caci.replace(/(\s)/g, "+");
if (this.debug) alert("initial ns=" + ns);
if (!islex) {
p1=p1+'';
fp = (p1)?p1:p2;
if (fp && fp.charAt(0) != "P") {
re = /.*\s(\w*)/;
pp = (re.exec(caci))[1];
if (pp)
{
var i= ns.lastIndexOf(pp);
var templeft = ns.substring(0, i);
var tempright = ns.substring(i,ns.length);
tempright = tempright.replace(pp, fp);
ns = templeft + tempright;
}
} else {
if (fp) {
ns = ns + ",+" + fp;
}
}
if (this.debug) alert("updated xlink get=" + ns);
}
if (this.debug) alert("old pp=" + pp + " first pag mark=" + fp);
if (pp != fp || (p1 && p2 && (p1 != p2))) {
caci += ", ";
if (p1 && p2 && (p1 != p2))
caci += p1 + "-" + p2;
else
caci += (p1)?p1:p2;
}
} else {
re=/search=(.*)$/;
ns=(ns)?ns:re.exec(this.x)[1];
}
/* fix xlink pinpoint notation of cite to be "439 F.3d 1114 at 1125"
* from "439 F.3d 1125". see webstar 2536956
**/
if (fp){
this.x=this.x.split("%")[0];
this.x=this.x+"%20at%20"+fp;
}
if (this.debug) alert("parserange returning=" + caci);
return caci;
}
this.getPagDocRef = function()
{
if (this.debug) alert("getPagDocRef");
var cc;
var cr = 0;
try {
cr=pNav.pag.cr;
if (!cr) cr=this.firstValidReporter();
} catch(exception) {
if (this.debug) alert("ERROR: pNav problem");
this.cr=this.firstValidReporter();
}
this.cr=cr;
if (cr < 1) {
cc = this.bb;
} else {
var rept=null;
re = /(.+),([0-9]*).*$/;
cc = this.na;
if (this.debug) alert("case or cite=" + cc);
var rpt=re.exec(this.pr[cr-1].firstChild.innerHTML);
if (rpt) {
rept=rpt[1];
if (rpt[2]) rept=rept+","+rpt[2];
}
if (rept) {
if (this.debug) alert("reporter=" + rept);
if (cc) cc = cc+", "+rept;
else cc = rept;
} else {
cc = this.bb;
}
}
if (this.debug) alert("cc=" + cc);
cc = this.parseRange(cr,cc,(cr==(this.lx+1)));
if (this.cy) {
cc = cc + " " + this.cy;
}
if (this.debug) alert("getPagDocRef=" + cc);
return cc;
}
this.copy = function()
{
if (!this.pow)
return;
if (!this.pow.loaded) {
setTimeout("cc.copy()", 250); //.o0OZzzzzzzzz
return;
}
var ref=null;
if (this.nr > 0) {
ref = this.getPagDocRef();
} else {
this.sel2div();
ref=(this.cy)?this.bb+" "+this.cy:this.bb;
}
re=/(.*search\=).*$/;
var newx=re.exec(this.x);
if (newx) {
re=/search=(.*)$/;
this.x=newx[1]+escape((re.exec(this.x))[1]);
if (this.debug) alert("xlink=" + this.x);
}
if (this.debug) alert("final ref=" + this.bb);
if (!ref) {
if (!window.confirm("A citation for this document is not available. Do you want to continue?")) {
this.pow.close();
return;
}
}
if (!this.pow)
return;
this.pow.setQuotation(this.txt, this.x, ref, !this.news&&(this.get=="1"));
this.pow.quote();
this.txt="";
} // end of copy function
}
function doCopyWithRef()
{
if (cc) {
cc.POW();
setTimeout("cc.copy()", 1000);
window.onbeforeunload=null;
return true;
} else
return false;
}
