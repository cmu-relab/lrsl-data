function emailLink()
{window.location = "mailto:?subject="+document.title + ' AS ' + strCurSec +"&body="+"<BR>" + WhereAmI().replace("&","%3F") + "<BR>"+ document.getElementsByName(strCurSec)[0].parentNode.parentNode.nextSibling.innerText;}	  
var ajaxRequest;
var colorboxUpdateRequest;
var TOPOFFSET=200;
var overRun=0;
var tryOnce=false;

function showTOC()
{
	if (strCurSec.toString().indexOf(".")>0)
		{loadTOC(strCurSec.split(".").splice(0,2).join("."));}
	//$("#tocDiv").css({"overflowY": "scroll"});
	$("#tocDiv").animate({width: ['769px', 'swing']}); 
	$("#tocDiv").css({"border": "1px solid white"});
	$("#TOC_A").unbind();
	$("#TOC_A").bind('click',closeTOC);

	return false;
}
function closeTOC()
{
	//$("#tocDiv").css({"overflowY": "hidden"});
	$("#tocDiv").animate({width: [0, 'swing']});
	$("#tocDiv").css({border: 0});
	$("#TOC_A").unbind();
	$("#TOC_A").bind('click',showTOC);
	return false;
}
var strCurSec=title;

function WhereAmI()
{
if (typeof getQueryString()["search"]!="undefined"){return false;}
	var strOldSec=strCurSec;
	var Yoffset=window.pageYOffset||document.body.scrollTop||document.documentElement.scrollTop;
	//$("#nav").offset({top:Yoffset<129?129:Yoffset});
	//$("#tocDiv").offset({top:Yoffset<129?129:Yoffset});
	
	Yoffset=Yoffset+TOPOFFSET+15;//7 is about one extra line for offset from the top 

	strCurSec=$("a[name]").filter(
	function(index) { 
		return ($(this).offset().top<Yoffset)
		}
	).last().attr("name")||$("a[name]").first().attr("name")
	if(!(strCurSec)){strCurSec=title;}
	strURL= window.location.pathname + "#"  + strCurSec ; 
	strLink="<a href='" + strURL  + "' >" ;
	if (thisPage.indexOf("aac.asp")>-1){strLink+=strCurSec.split(".").shift()+ " AAC " + strCurSec.split(".").splice(1,2).join(".") }else{strLink+="AS " + strCurSec }
	strLink+="</a>";
	$("#location").html(strLink);
	try{
		strSecText=document.getElementsByName(strCurSec)[0].parentNode.nextSibling.data.replace(/\s/g,"")?document.getElementsByName(strCurSec)[0].parentNode.nextSibling.data:document.getElementsByName(strCurSec)[0].parentNode.nextSibling.nextSibling.data;
		strSecText=strSecText.substr(0,500);
		}
	catch(err)
		{strSecText=""}
	if (strSecText.length==500){strSecText=strSecText+"..."}
	$("#emailLink").attr("href","mailto:?subject="+document.title + ' AS ' + strCurSec +"&body=http://"+ window.location.host+strURL.replace("&","%3F").replace("#","%23") + ' '+ strSecText);
	$("#notifyLink").attr("href","sirs_disp.asp?sess=27&val=" + strCurSec);
	if(history.replaceState)
		{history.replaceState({sec:strCurSec}, strCurSec, thisPage+"#" +strCurSec);}
	if (strOldSec !=strCurSec) 
		{clearTimeout(waitTimer);
		waitTimer=setTimeout("loadSideBar()",350);}
}

function loadSideBar()
{
  if (ajaxRequest){ajaxRequest.abort();}
try	
	{
	$.get(thisPage, {type:"xRef",Title:strCurSec.split(".")[0]},function(data) 
		{
			$("#sideTitle").html(data);
		}
	);

	
	$.get(thisPage, {type:"xRef",chapter:strCurSec.split(".").splice(0,2).join(".")},function(data) 
		{
			$("#sideChapter").html(data);
		}
	);

	ajaxRequest=$.get(thisPage, {type:"xRef",sec:strCurSec},function(data) 
		{
			$("#sideSection").html(data);
		}
	);
	}
catch(err){}
}	
	
function embedLink()
{
	createColorbox();
	$("#jsLinkBox").show();
}

function printLink()
{
	createColorbox();

	$("#jsLinkBox").hide();

}
function createColorbox()
{
	if (startSec==""){startSec=strCurSec.toString();}
	startSec=startSec.split("article")[0].split("part")[0];
	endSec=endSec.split("article")[0].split("part")[0];
	$("#content").addClass("noPrintContent");
	//var interfaceHeight=$topBorder.height() + $bottomBorder.height() + $content.outerHeight(true) - $content.height();
	var strHTML="<div id=jsLinkBox>To Embed this statute copy and paste the following HTML into your page.<BR><div id=jsLink></div></div><div id=cbNav style='float:left;padding-left:5px;color:white;height:90%;width:110px;' ><div id=printBox>Use the Slider to pick the sections you would like to print </div><div style='float:left;width:20px;height:500px;overflow:hidden' id=slider></div><div id='textSelect'   ><BR><BR>Starting Section:<BR><input id='secStart' type=text size=5 onkeyup='updatecolorbox();' value='"  + startSec + "'><BR>Ending Section:<BR><input onkeyup='updatecolorbox();' id='secEnd' size=5 type=text value='" + endSec + "'><BR><input type=button onclick='printFunc()' value=Print><BR><BR><BR></div></div><div id=loading><img src='http://w3.legis.state.ak.us/images/loading.gif'></div><div id=colorboxContent style='margin-right:30px;padding-left:10px;float:right;color:black;width:80%;background-color:white;text-align:left'><center><img src='http://w3.legis.state.ak.us/images/loading.gif'></center></div>";
	$.colorbox({html:strHTML,height:"75%",width:"870px"});
	createSlider();
}
function printFunc()
{
$("#cboxLoadedContent").css("overflow","visible");
$("#colorbox").css("position","static");
$("#colorbox").css("margin","20px");
window.print();
}	
	
	
function updatecolorbox()
{
	if (colorboxUpdateRequest){colorboxUpdateRequest.abort();}
	strStart=$("#secStart").val();
	strEnd=$("#secEnd").val();
	url= "&lt;script language=&quot;javascript&quot; src=&quot;"+serverPage+"?media=js&secStart=" + strStart + "&secEnd=" + strEnd+"&quot;&gt;&lt;/script&gt;<BR><BR>";
	$("#jsLink").html(url);	
	$("#colorboxContent").html("" );$("#loading").show();
	colorboxUpdateRequest=$.get(thisPage , {media:"print",secStart:strStart,secEnd:strEnd},function(data) 
		{$("#loading").hide();
		$("#colorboxContent").html(data );}
		);
}

function loadTOC(intTitle)
{
	intTitle=intTitle.toString();
	if (intTitle.substring(intTitle.length-2)==".0"){intTitle=intTitle.substring(0,intTitle.length-2);}
	$.get(thisPage, {media:"js",type:"TOC",title:intTitle},function(data) 
		{
			if(intTitle.indexOf(".")>0)	//loading Chapters
			{
				$("#partHead").html("-&gt"+data.substr(0,data.indexOf("</a>")+4));
				$("#partHead a").attr("href","javascript:void(0)");
			
			}
			else if (intTitle.indexOf("p")>0 )//Loading Parts
			{
				$("#titleHead").html("-&gt"+data.substr(0,data.indexOf("</a>")+4));
			
			}
			else //Loading Titles
			{	$("#titleLink").text(data.substr(data.indexOf(">")+1,data.indexOf("</a>")-data.indexOf(">")-2));
				$("#titleHead").text("");
				$("#partHead").text("");
				
			}
			$("#ChapterToc").html( data.substr(data.indexOf("</a>")+4).replace("Sec. "+strCurSec,"<font style='font-weight:2900;'>Sec. "+strCurSec+"</font>"));
			$("#titleHead").show();
			$("#TitleToc").hide();
			$("#ChapterToc").show();
		}
	);
}

function appendData(data)
{
$("#content").append(data);
if ($("#content").height()<window.screen.availHeight)
	{fetchData("next");}
scrollToDiv($("a[name='"+askedForSec + "']"));
}

function fetchData(intType)
{
	if (ajaxRequest){ajaxRequest.abort();}

	//intType is the type of call,  0=initial,1=prior to,2=ahead of
	if (intType==0)
	{
			$.get(thisPage , {media:"print",secStart:FirstLoadedSec,secEnd:LastLoadedSec},function(data,status,XMLHttpReq) 
			{
			//load a small section of chapters around the asked for data.
			if (data!=""){
				tryOnce=false;
				//if we are here and #content is non-existant wait a moment
				if ($("#content").length==0){setTimeout ( function () { appendData(data)}, 250 );}
				else {appendData(data); FirstLoadedSec=parseHeaders(XMLHttpReq.getAllResponseHeaders())["FirstSec"];LastLoadedSec=parseHeaders(XMLHttpReq.getAllResponseHeaders())["LastSec"];}
				}
			//If we aren't finding anything due to bad asked for section first expand our search then just go to begining
			else  { 
				if (tryOnce==true){window.location=thisPage;}
				tryOnce=true;
				FirstLoadedSec=parseInt(askedForSec);
				LastLoadedSec=parseInt(askedForSec)+1;
				fetchData(0);
				
				}
			});
	}
	if (intType=="prev")
	{
		ajaxRequest=$.get(thisPage , {media:"print",type:"fetch",secEnd:FirstLoadedSec},function(data,status,XMLHttpReq) 
			{
			FirstLoadedSec=parseHeaders(XMLHttpReq.getAllResponseHeaders())["FirstSec"];
		
			$("#content").prepend(data);
			}
			);
	}
	if (intType=="next")
	{
			ajaxRequest=$.get(thisPage , {media:"print",type:"fetch",secStart:LastLoadedSec},function(data,status,XMLHttpReq) 
			{
			LastLoadedSec=parseHeaders(XMLHttpReq.getAllResponseHeaders())["LastSec"];
			$("#content").append(data);
			});	
	}
}
	

	
var startSec="";
var endSec="";
var FirstLoadedSec;
var LastLoadedSec

function loadDocument()
{
	if (typeof getQueryString()["search"]!="undefined"){return false;}
    askedForSec=window.location.hash.substring(1);
	if (askedForSec==""){askedForSec=title.toString()}
	var arrTitleChapter=askedForSec.split(".").splice(0,2);
    if (arrTitleChapter.length==1) 
        {arrTitleChapter[1]=0;}
    if (arrTitleChapter[1]<5)
        {FirstLoadedSec=arrTitleChapter[0];}
    else {FirstLoadedSec=arrTitleChapter[0]+"."+(parseInt(arrTitleChapter[1],10)-1);}
	LastLoadedSec=(parseInt(arrTitleChapter[0],10))+"." +(parseInt(arrTitleChapter[1],10)+10);
    fetchData(0);
}


function getQueryString() {
  var result = {}, queryString = location.search.substring(1),
  re = /([^&=]+)=([^&]*)/g, m;
  while (m = re.exec(queryString)) {
    result[decodeURIComponent(m[1])] = decodeURIComponent(m[2]);
  }
  return result;
}




//Run These on Startup
function placeNav(){$(".basisnav").append($("#nav"));}
var waitTimer;
var thisPage=location.href.split('/').pop().split('?').shift().split('#').shift();
loadDocument();	
$(document).ready(placeNav);
$(document).ready(createEndless);
$(window).scroll(WhereAmI);


 function mouseDownCapture(e)
 {startSec=$("a[name]").filter(function(index) { return (this.offsetTop<e.pageY)}).last().attr("name")||$("a[name]").first().attr("name");
 }
function mouseUpCapture(e)
 {endSec=$("a[name]").filter(function(index) { return (this.offsetTop<e.pageY)}).last().attr("name")||$("a[name]").first().attr("name");
 }	
 
var arrSections ;
 function createSlider() {

	arrSections = new Array();
	$("a[name]").each(function(index) {
			if($(this).attr("name").indexOf("article")<0){arrSections.push($(this).attr("name"))}});
	for(i=0;i<arrSections.length;i++)
		{if (arrSections[i]==startSec)
			{hiVal=Math.abs(i-arrSections.length+1);}
		 if (arrSections[i]==endSec)
			{lowVal=Math.abs(i-arrSections.length+1);}
		}
	if (typeof hiVal == 'undefined'){hiVal=0;}
	if (typeof lowVal == 'undefined'){lowVal=hiVal;}
	if (hiVal<lowVal){temp=hiVal;temp2=startSec;startSec=endSec;endSec=temp2;hiVal=lowVal;lowVal=temp;}
	$( "#slider" ).slider({
			orientation: "vertical",
			range: true,
			max: arrSections.length-1,
			values:[lowVal,hiVal],
			slide: function( event, ui ) {
				$( "#secStart" ).val(arrSections[arrSections.length-1-ui.values[ 1 ]]);
				$( "#secEnd" ).val(arrSections[arrSections.length-1-ui.values[ 0]]);
				updatecolorbox();
			}
		});
		$( "#secStart" ).val(startSec);
		$( "#secEnd" ).val(endSec);
		updatecolorbox();

	}
 


 
 //ENDLESS SCROLLING FEATURES
 function createEndless()
 {
	 $(window).endlessScroll({
	   ceaseFireOnEmpty: false,
	   fireOnce:false,
	  
	  insertBefore:$("#content"),
	  insertAfter:$("#content"),
	  loader: '<div class="loading">Loading more Please wait....<div>',
	  callback : function(f,p,s){fetchData(s);}
	}); 
} 
 
 
 
 /*
//fix my location due to Header floats. 
if ("onhashchange" in window) { // event supported?
    window.onhashchange = function () {
        checkLink(window.location.hash.substring(1));
    }
}
else { // event not supported:
    var storedHash = window.location.hash;
    window.setInterval(function () {
        if (window.location.hash != storedHash) {
            storedHash = window.location.hash;
            hashChanged(storedHash);
        }
    }, 100);
} 
*/
 
function checkLink(strSection)
{
	var selectedSection=$("[name='"+strSection+"']");
	
	if (selectedSection.length>0)
		{scrollToDiv(selectedSection);}
	else
		{window.location= window.location.pathname + "?reload#"  + strSection ; }

	return false;
} 
var scrollCount=0;
function scrollToDiv(element){
	if ($("#content").length>0 && element.length>0 )
	{
	TOPOFFSET=$("#content").offset().top +$("#fixPageTop").height()-20 ;
	var navheight=TOPOFFSET;
    var offset = element.offset()||$("#content").offset();
    var offsetTop = offset.top;
    var totalScroll = offsetTop-navheight;
	var pageScroll= parseInt($("body").scrollTop()||$("html").scrollTop());
//    if (parseInt(pageScroll-totalScroll)!=0 && scrollCount<10 )
//	{
	//ie 8 has a problem where we are here before the height is full rendered so content will change in height before we are done.  So reiterate.
//	scrollCount++;
	$("html,body").animate({
            scrollTop: totalScroll
   }, 500,"swing");
//   function() {scrollToDiv(element)}
//	}
//	else {scrollCount=0;}
//	return false;
	}
}

function checkScroll(element)
{

}
//

function parseHeaders(headerStr) {
  var headers = {};
  if (!headerStr) {
    return headers;
  }
  var headerPairs = headerStr.split('\u000d\u000a');
  for (var i = 0; i < headerPairs.length; i++) {
    var headerPair = headerPairs[i];
    var index = headerPair.indexOf('\u003a\u0020');
    if (index > 0) {
      var key = headerPair.substring(0, index);
      var val = headerPair.substring(index + 2);
      headers[key] = val;
    }
  }
  return headers;
}


//HASH TAG CHANGES
/*$(window).onload(function() {
    if (location.location.hash)
        $(window).scrollTop($(window).scrollTop() + 200);
		
		or
		
		var offset = $('.target').offset();
var scrollto = offset.top - 50; // fixed_top_bar_height = 50px
$('html, body').animate({scrollTop:scrollto}, 0);
	*/	
 
