//************     COPYRIGHT NOTICE LexisNexis  *****************
//   This JS file is protected by copyright law.  
//   Any use or reproduction in any form without the permission of LexisNexis 
//   is strictly prohibited. Distribution or use for commercial purposes is prohibited. 
//   http://www.lexisnexis.com/lncc/about/copyrt.html  Copyright
//   http://www.lexisnexis.com/lncc/about/terms.html  General conditions and terms for use
//   send mail to Owner:  Custom.Solutions@lexisnexis.com
function appendAddress (objTxtStreetNum, objTxtStreet, objTxtCity, objTxtState, objTxtZip, strQuery, extOperator, intOperator, strNumIntOperator, strSegName)
{
var streetNum = "";
var street = "";
var city = "";
var state = "";
var zip = "";
var strAd = "";
if (typeof strQuery == "undefined")
		strQuery = "";
if (typeof strSegName == "undefined")
		strSegName = "Address";		
if (typeof strNumIntOperator == "undefined")
		strNumIntOperator = "and";
if ((typeof extOperator == "undefined") || (extOperator == ""))    
      extOperator = "and";
if ((typeof intOperator == "undefined") || (intOperator == ""))    
      intOperator = "and";
if (typeof objTxtStreetNum == "undefined")
		objTxtStreetNum = "";
else
{      	  	
	if (isFormObj(objTxtStreetNum))
		streetNum = objTxtStreetNum.value;
	else
		streetNum = objTxtStreetNum;
}
if (typeof objTxtStreet == "undefined")
		objTxtStreet = "";
else
{      	  	
	if (isFormObj(objTxtStreet))
		street = objTxtStreet.value;
	else
		street = objTxtStreet;
}
if (typeof objTxtCity == "undefined")
		objTxtCity = "";
else
{      	  	
	if (isFormObj(objTxtCity))
		city = objTxtCity.value;
	else
		city = objTxtCity;
}
if (typeof objTxtState == "undefined")
		objTxtState = "";
else
{      	  	
	if (isFormObj(objTxtState))
		state = objTxtState.value;
	else
		state = objTxtState;
}
if (typeof objTxtZip == "undefined")
		objTxtZip = "";
else
{      	  	
	if (isFormObj(objTxtZip))
		zip = objTxtZip.value;
	else
		zip = objTxtZip;
}
if ((streetNum == "") && (street == "") && (city == "") && (state == "") && (zip == ""))
	return strQuery;
if (streetNum != "")
	strAd = streetNum;
if (street != "")
{
	if (strAd != "")
		strAd += " " + strNumIntOperator + " ";
	strAd += street;
}
if (city != "")
{
	if (strAd != "")
		strAd += " " + intOperator + " ";
	strAd += city;
}
if (state != "")
{
	if (strAd != "")
		strAd += " " + intOperator + " ";
	strAd += state;
}
if (zip != "")
{
	if (strAd != "")
		strAd += " " + intOperator + " ";
	strAd += zip;
}

if (strAd != "")
{
	if (strQuery != "")
			strQuery += " " + extOperator + " ";	
	strQuery += strSegName + "(" + strAd + ")";	  	
}	
	return strQuery;
} 
function appendDate(btnDate, objTxtFrom, objTxtTo, strQuery, extOperator, strSegName) //replaces buildDate()
{
  var befStr = "";
  var aftStr = "";
  var from, to;
    if ((typeof extOperator == "undefined") || (extOperator == ""))    
      extOperator = "and";
	if (typeof strSegName == "undefined")    
      strSegName = "Date";
	if (typeof strQuery == "undefined")
		strQuery = "";	 	
	if (!btnDate[1].checked)
      return strQuery;
     if (isFormObj(objTxtFrom))
		from = objTxtFrom.value;
	 else
		from = objTxtFrom;
	 if (isFormObj(objTxtTo))
		to = objTxtTo.value;
	 else
		to = objTxtTo;
    if (to != "")
      befStr = "leq " + to;
    if (from != "")
      aftStr = " geq " + from;             
    if (befStr != "" || aftStr != "")
    {
	  if (strQuery != "")
		strQuery += " " + extOperator + " ";		        
      strQuery += strSegName + "(";
      if (befStr != "")
        strQuery += befStr;
      if (aftStr)
      {
        if (befStr)
          strQuery += " and ";
        strQuery += aftStr;
      }
      strQuery += ")";
    }
  return strQuery;
}
function appendName (objTxtFirst, objTxtLast, strQuery, exact, extOperator, intOperator, strSegName)
{
var first = "";
var last = "";
if (typeof strQuery == "undefined")
		strQuery = "";
if (typeof strSegName == "undefined")
		strSegName = "Name";		
if ((typeof exact == "undefined") || (exact == ""))
		exact = false;				
if ((typeof extOperator == "undefined") || (extOperator == ""))    
      extOperator = "and";
if ((typeof intOperator == "undefined") || (intOperator == ""))    
      intOperator = "W/3";      	  	
if (isFormObj(objTxtFirst))
		first = objTxtFirst.value;
	 else
		first = objTxtFirst;
if (isFormObj(objTxtLast))
		last = objTxtLast.value;
else
		last = objTxtLast;
if ((strQuery != "") && ((first != "") || (last != "")) )
			strQuery += " " + extOperator + " ";
		if (last != "" || first != "")
		{
			strQuery += strSegName+"(";
			if (exact == false)
			{
				if (last != "")
				{
				  if (first != "")
				    strQuery += last + " " +intOperator+ " " + first;
				  else
				    strQuery += last;
				}
				else
				  strQuery += first;
				if (last != "" || first != "")
				  strQuery += ")";
			}
			else
				strQuery += last + " " + first + ")";
		}
	return strQuery;
}
function appendSegment(objTxtElement, strSegName, strQuery, extOperator)
{
var text = "";
	if (isFormObj(objTxtElement))
		text = objTxtElement.value;
	 else
		text = objTxtElement;
	if (typeof strQuery == "undefined")
		strQuery = "";
	if ((typeof extOperator == "undefined") || (extOperator == ""))    
      extOperator = "and";
    if (text != "")
        {
        if (strQuery != "")
			strQuery += " " + extOperator + " ";
                strQuery += strSegName + "(" + text + ")";
        }
        return strQuery;
}
function appendValue(formElement, extOperator, strQuery, intOperator)
{
	if ((typeof extOperator == "undefined") || (extOperator == ""))    
      extOperator = "and";
	if (typeof strQuery == "undefined")
		strQuery = "";	 	
	if ((typeof intOperator == "undefined") || (intOperator == ""))    
      intOperator = "or";
	if (formElement.value != "")
	{
		if (strQuery != "")
			strQuery += " " + extOperator + " ";
		if (formElement.type == "select-one")
			strQuery += formElement.options[formElement.selectedIndex].value;
		else if (formElement.type == "select-multiple")
		{
		  var selectval = "";
		  for (i = 0; i < formElement.options.length; ++i)
			{
				if (formElement.options[i].selected)
					{
						if (selectval != "")
							selectval += " "+intOperator+" ";
						else
							selectval += "(";  //opening paren
						selectval += formElement.options[i].value;
					}	
			}    
		 selectval += ")";
		 strQuery += selectval;
		}
		else
			strQuery += formElement.value;
	}
	return strQuery;
}
function autoTab(input, len) {
   if(input.value.length >= len) 
   {
      input.value = input.value.slice(0, len);
      input.form[(getIndex(input)+1) % input.form.length].focus();      
   }
   return true;
}
function buildDate(btnDate, frm_rng, to_rng)  //Deprecated
{
var befStr = "";
var aftStr = "";
var retVal = "";
if (!btnDate[1].checked)
return retVal;            
if (to_rng.value != "")
befStr = "leq " + to_rng.value;
if (frm_rng.value != "")
aftStr = " geq " + frm_rng.value;
if (befStr != "" || aftStr != "")
{
retVal = " and date(";
if (befStr != "")
retVal += befStr;
if (aftStr)
{
if (befStr)
retVal += " and ";
retVal += aftStr;
}
retVal += ")";
}
else
retVal = "";    
return retVal;
}
function buildFooter(targetName,showSuppID)
{
	var tempDate = new Date();
	var copyYear = tempDate.getFullYear();	
	if ((typeof targetName == "") || (typeof targetName == "undefined") || (targetName == ""))
		targetName = "_self";
	var aboutLink = "<a href='http:\/\/www.lexisnexis.com' target=" + targetName + " class='footerLink'><font face='verdana,arial,helvetica' size='1'>About LexisNexis<\/font><\/a>";
	var termsLink = "<a href='http:\/\/www.lexisnexis.com\/terms\/general.aspx' target=" + targetName + " class='footerLink'><font face='verdana,arial,helvetica' size='1'>Terms and Conditions<\/font><\/a>";
	var privacyLink ="<a href='http:\/\/www.lexisnexis.com\/privacypolicy\/legalprofessional\/' target=" + targetName + " class='footerLink'><font face='verdana,arial,helvetica' size='1'>Privacy Policy<\/font><\/a>";
	var copyLink = "<a href='http:\/\/www.lexisnexis.com\/terms\/copyright\/' target=" + targetName + " class='footerLink'><font face='verdana,arial,helvetica' size='1'>Copyright &copy;<\/font><\/a>&nbsp;";
	var sep = "<font face='verdana,arial,helvetica' size='1'>&nbsp;&nbsp;|&nbsp;&nbsp;<\/font>";
	var reLine="<font face='verdana,arial,helvetica' size='1'>LexisNexis, a division of Reed Elsevier Inc. All rights reserved.</font>";
	var footerCopy = "<center>" + aboutLink + sep + termsLink + sep + privacyLink
	footerCopy += "<br>" + copyLink + "<font face='verdana,arial, helvetica' size='1'>&nbsp;" + copyYear + "<\/font>&nbsp;" + reLine +  "</center>";
	document.write(footerCopy);
}

function buildFooterLNEButterWorths(targetName)
{
	var tempDate = new Date();
	var copyYear = tempDate.getFullYear();

	if ((typeof targetName == "") || (typeof targetName == "undefined") || (targetName == ""))
	{
		targetName = "_self";
	}
	
	//create the links for about LN, Terms, copyright.
	var dottedLine = "<table cellpadding'0' cellspacing='0' style='background-image: url(/clients/jslib/images/footer_rule.gif)' width='60%'><tr><td><img src='s.gif' height='5' width='5'></td></tr></table>"
	var spacer = "<table cellpadding'0' cellspacing='0'><tr><td><img src='/clients/jslib/images/s.gif' height='2' width='2'></td></tr></table>"
	var aboutButterworthsLink = "<a href='http:\/\/www.lexisnexis.co.uk\/marketing\/about_us_pages\/about_us.htm' target=" + targetName + "><font face='verdana,arial,helvetica' style='FONT-SIZE: 11px; COLOR: #3300cc; text-decoration: none;'>About LexisNexis Butterworths<\/font><\/a>";
	var aboutLink = "<a href='http:\/\/www.lexis-nexis.co.uk\/' target=" + targetName + "><font face='verdana,arial,helvetica' size='1' style='FONT-SIZE: 7.5pt; COLOR: #3300cc; text-decoration: none;'>LexisNexis&reg; Butterworths</a>.&nbsp;<\/font><\/a>";
	var termsLink = "<a href='http:\/\/www.lexisnexis.com\/uk\/legal\/auth\/displayterms.do?content=GENERAL' target=" + targetName + "><font face='verdana,arial,helvetica' style='FONT-SIZE: 11px; COLOR: #3300cc; text-decoration: none;'>Terms and Conditions<\/font><\/a>";
	var copyLink = "<a href='http:\/\/www.lexisnexis.com\/terms\/copr\/lngp\/uk\/' target=" + targetName + "><font face='verdana,arial,helvetica' size='1' style='FONT-SIZE: 7.5pt; COLOR: #3300cc; text-decoration: none;'>Copyright&copy;<\/font><\/a>";
	var reLine="<font face='verdana,arial,helvetica' size='1'>All rights reserved.</font>";

	var footerCopy = "";
	footerCopy = "<center>" + dottedLine + aboutButterworthsLink + "<font face='verdana,arial,helvetica' size='1' color='CCCCCC'>&nbsp;&#124;&nbsp;<\/font>" + termsLink + spacer + dottedLine + copyLink + "<font face='verdana,arial,helvetica' size='1'>" + "&nbsp;" + copyYear + "&nbsp;" + aboutLink + reLine;

	document.write(footerCopy);
}

function displaySource(searchForm, sourceList, strAPI)
{
	var srcWindow;
	var url = "";
	var i;
	var libraryFile;
	var fileNames;
	var atlOneSelected = false;

	with (searchForm)
	{
		//Make sure at least one item is selected in the list
		for(i = 0; i < sourceList.length; i++)
			if(sourceList.options[i].selected)
				atlOneSelected = true;
		
		if(atlOneSelected)
		{
			libraryFile = sourceList.options[sourceList.selectedIndex].value.split(";");
			fileNames = libraryFile[1].split(",").join("%20or%20");

			switch(strAPI)
			{
				case 'lexis':	url = "http://www.lexis.com/research/xlink?source=718dis;dguide&search=";
								break;
				default:		url = "http://www.lexis-nexis.com/api.universe/v1_search?src=718dis;dguide&ORIGINATION_CODE=00004&query=";
								break;
			}

			url += "file-name(" + fileNames + ")"
	
			if((srcWindow == null) || (srcWindow.closed))
				srcWindow = window.open(url, "srcWindow", "left=0,top=0,width=450,height=500,status=yes,resizable=yes,scrollbars=yes");
			else
			{
				srcWindow.focus();
				srcWindow.location.href = url;
			}
		}
	}
}

function displaySourceInfo(objSelSource, strApi)
{
	alert("This function does not work in production.  Please use displaySource() instead.");
	//return false;
	
	var srcWindow, srcString, library_file, file_names, url;
	srcString = objSelSource.options[objSelSource.selectedIndex].value;
	library_file = srcString.split(";");
	file_names = library_file[1].split(",");
	if (typeof strApi == "undefined")    
    strApi = "nexis";
	url = "/clients/asplib/csifind.asp?lib=" + library_file[0] + "&file=" + file_names + "&api=" + strApi
	if ( (srcWindow == null) || (srcWindow.closed) )
		srcWindow = window.open(url, "srcWindow", "left=0,top=0,width=450,height=500,status=yes,resizable=yes,scrollbars=yes");
	else
	{
		srcWindow.focus();
		srcWindow.location.href = url;
	}
}

function forceSSL()
{
    if(window.location.protocol != "https:")
        window.location.href = "https://" + window.location.href.substr(window.location.href.indexOf('://') + 3);    
}

function forceDomain(targetDomain, redirect) {

	if (redirect == null) {
		redirect = true
	}

	// Create a HostnameParser Object to determine the server and domain
	var hostParser = new HostnameParser(window.location.hostname)

	var hostPort    = (window.location.port != "") ? ":" + window.location.port : ""
	var thisDomain  = hostParser.domain
	var thisServer;
	
	if (targetDomain.toLowerCase() == "lexis-nexis") {
		targetDomain = "lexisnexis";
	}
	
	//If there is no host, or if there is and and it's not csint...
	if((hostParser.server == "") || (hostParser.server != "" && hostParser.server.toLowerCase().indexOf('csint') == -1))
	   thisServer = resolveHost(targetDomain); //figure out the host of the target domain
	else //reuse the same host we had before
	   thisServer = hostParser.server;	
	
	var redirURL = window.location.protocol + "//" + thisServer + hostParser.seperator + targetDomain + ".com" + hostPort + window.location.pathname + window.location.search

	if ((thisDomain != targetDomain) && redirect) {
		window.location.replace(redirURL)
	} 	
		
	return redirURL
	
} // forceDomain()

function formatSSN(SSNval, strQuery, segName, extOperator)
{	
if ((typeof extOperator == "undefined") || (extOperator == ""))    
      extOperator = "and";
if (typeof segName == "undefined")   
      segName = "";
if (typeof strQuery == "undefined")
		strQuery = "";	 			            
		if (SSNval.length == 9 && !isNaN(SSNval))
		{
			var noDash = SSNval;
			var left = noDash.substring(0, 3);
			var middle = noDash.substring(3, 5);
			var right = noDash.substring(5, 9);	
			SSNval = left + "-" + middle + "-" + right;
		}						
		var dash1 = SSNval.substring(3,4);
		var dash2 = SSNval.substring(6,7);				
		if (dash1 == "-" && dash2 == "-")
		{
			if ((strQuery != "") && (extOperator != ""))
				strQuery += " " + extOperator + " ";
			if (segName != "")
				strQuery += segName + "(" + SSNval + ")";
			else
				strQuery += SSNval;
		}
		return strQuery;
}
function getIndex(input) {
   var index = -1, i = 0, found = false;
   while (i < input.form.length && index == -1)
      if (input.form[i] == input) index = i;
      else i++;
   return index;
}
function getQueryStringValue(strKey) {
	var returnString = "";
	if (window.location.search != "") {
		var searchValues = window.location.search.substring(1).split("&");
		for (var i = 0;searchValues != "" && i < searchValues.length; i++) {
			var thisValue = searchValues[i].split("=");
			if (thisValue[0] == strKey) {
				returnString = thisValue[1];
				break;
			}
		}
	}
	return returnString;
}
function HostnameParser(hostString) {
	hostArray = hostString.toLowerCase().split(".")
	this.seperator   = "."
	this.domain
	this.server
	
	switch (hostArray.length) {
		case 1 : // must be in "csint"
			this.domain = ""
			this.server = hostArray[0]
			break
		case 2 : // must be "lexisnexis.com" or "lexis-nexis.com"
			this.domain    = hostArray[0]
			this.server    = ""			
			break
		default: // must be "[www or csint].[lexisnexis or lexis-nexis].com"
			hostArray.pop() // Clear out .com
			this.domain = hostArray.pop()
			//this.server = hostArray.join(this.seperator)
			this.server = hostArray.pop()
			break
	}
	
} // HostnameParser()

//For production when someone only enters http://[lexisnexis or lexis-nexis or lexis or nexis].com without the host.
function resolveHost(domain)
{
    var hostString = "www";
    
    if(domain == "lexis" || domain == "nexis")            
        hostString = "w3";    
    
    return hostString;
}

function isFormObj(objectName)
{
if (typeof objectName.form == "undefined")
	return false;
if (typeof objectName.value == "undefined")
	return false;
return true;
}
function isDev()
{
	var currentURL = location.href;
	if(currentURL.indexOf("csint") != -1)
		return true;
	else
		return false;
}

//Depcrecated - User isDevLocal()
function isDev8080()
{
	var currentURL = location.href;
	if(currentURL.indexOf("csintdev") != -1)
		return true;
	else
		return false;
}

function isDevLocal()
{
	var currentURL = location.href;
	if(currentURL.indexOf("csintdev") != -1)
		return true;
	else
		return false;
}

function openSuppWin() 
{
  dt = new Date();
  url = 'http://www.nexis.com/research/suppId' + '?_dt=' + dt.getTime();
  window.open(url, "newwin", "scrollbars=yes,resizable=no,directories=no,toolbar=no,menubar=no,width=300,height=220");
}
function resolveDates(objRadioBtn, objSelDates)
{
var i;
if (objRadioBtn[1].checked)
	{
	  for (i=0; i<objSelDates.length; i++)
		{
		  if ((objSelDates.options[i].value == "0:ALL") || (objSelDates.options[i].value == ""))
			{
			  objSelDates.selectedIndex = i;
			  return;				
			}			
		}
	
	}
	return;
}
function requiredIsBlank(objTxtElement,strLabel,strAltMsg)
{
var errMsg = "";
if ((strAltMsg == "") || (typeof strAltMsg == "undefined"))
	errMsg = "The " + strLabel + " is required.";
else
	errMsg = strAltMsg;
if (objTxtElement.value == "")
	{
	  alert(errMsg);
	  objTxtElement.focus();
	  return true;	
	}
return false;
}
function setDefaultField(objForm)
{
	if (setDefaultField.arguments.length == 0)
	{
		for (var FIndex = 0; FIndex < document.forms.length; FIndex++)
		{
			for (var EIndex = 0; EIndex < document.forms[FIndex].elements.length; EIndex++)
			{
				var thisElement = document.forms[FIndex].elements[EIndex];
				if (thisElement.type == "text" || thisElement.type == "textarea")
				{
					window.focus();
					thisElement.focus();
					return true;
				} // end if
			} // end for
		} // end for
	} // end if
	else
	{
		if (typeof objForm == "object")
		{
			if (typeof objForm.form == "object")
				objForm.focus();
			else if (typeof objForm.elements == "object")
			{
				for (var EIndex = 0; EIndex < objForm.elements.length; EIndex++)
				{
					var thisElement = objForm.elements[EIndex];
					if (thisElement.type == "text" || thisElement.type == "textarea")
					{
						window.focus();
						thisElement.focus();
						return true;
					} // end if
				} // end for
			} // end else if
		} // end if
	} // end else
	return false;
} // end setDefaultField()

function queryIsBlank(strQueryString, objFormElement, strMsg)
{
if ((strMsg == "") || (typeof strMsg == "undefined"))
 	strMsg = "Please enter some search terms."
	
if (strQueryString == "")
	{
	alert(strMsg)
	if ((objFormElement == "") || (typeof objFormElement == "undefined"))
		setDefaultField();
	else
		objFormElement.focus();
	return true;
	}
return false;
}

function appendNameMiddle(objTxtFirst, objTxtMiddle, objTxtLast, strQuery, exact, extOperator, lastFirstIntOperator, firstMiddleIntOperator, strSegName, lastMiddleIntOperator)
{
	var first = "";
	var middle = "";
	var last = "";

	if (typeof strQuery == "undefined")
		strQuery = "";
	if (typeof strSegName == "undefined")
		strSegName = "Name";		
	if ((typeof exact == "undefined") || (exact == ""))
		exact = false;				
	if ((typeof extOperator == "undefined") || (extOperator == ""))    
		extOperator = "and";
	if (typeof lastFirstIntOperator == "undefined")
		lastFirstIntOperator = "w/3";      	  	
	if (typeof firstMiddleIntOperator == "undefined")
		firstMiddleIntOperator = "w/2";      	  	
	if (typeof lastMiddleIntOperator == "undefined")
		firstMiddleIntOperator = "w/3";      	  	
	if (isFormObj(objTxtFirst))
		first = objTxtFirst.value;
	else
		first = objTxtFirst;

	if (isFormObj(objTxtMiddle))
		middle = objTxtMiddle.value;
	else
		middle = objTxtMiddle;
	if (isFormObj(objTxtLast))
		last = objTxtLast.value;
	else
		last = objTxtLast;
	if ((strQuery != "") && ((first != "") || (middle != "") || (last != "")) )
		strQuery += " " + extOperator + " ";
		
	if (last != "" || first != "" || middle != "")
	{
		// starts the parentheses
		strQuery += strSegName+"(";
		if (exact == false)
		{
			if (last != "")
			{
			  if (first != "")
				{
				  if (middle != "")
					  strQuery += last + " " + lastFirstIntOperator + " " + first + " " + firstMiddleIntOperator + " " + middle;
					else
					  strQuery += last + " " + lastFirstIntOperator + " " + first;
				} 
			  else
			  {
			    if (middle != "")
					strQuery += last + " " + lastMiddleIntOperator + " " + middle;
				else
					strQuery += last;
			  }
			}
			else
			{
			  if (first != "")
			  {
			    if (middle != "")
				  strQuery += first + " " + firstMiddleIntOperator + " " + middle;
				else
				  strQuery += first;
			  }
			}
		}
		else
			strQuery += last + " " + first + " " + middle;
		// ends the parentheses
		strQuery += ")";
	}

	return strQuery;
}

try
{
    if (typeof window.parent.displaySearchValues == "undefined")
    {
	    window.parent.displaySearchValues = "new";
    }
}
catch(err)
{

}
	
function showSearchValues(thisForm) {
	if (isDev() == true) {
		if (showSearchValues.arguments.length == 0) {
			alert("Invalid argument: Form Name\nThe search form name must be the first argument to showSearchValues().");
			return false;
		} // end if
		if (typeof thisForm.name == "undefined") {
			if (typeof thisForm != "string" && typeof thisForm.length == "number" && thisForm.length > 1) {
				alert("Which form's values do you want to display in showSearchValues()?\nForm: " + thisForm[0].name + " is an array of forms.");
				return false;
			} // end if
			else {
				alert("Invalid search form in showSearchValues().\nThe search form srgument must be an Object.");
				return false;
			} // end else
		} // end if
		
		var returnString = false;
		var sourceString = "";
		var termsString = "";
		var extraObjects = new Array();
		var extraObjectsIndex = 0;
		
		// Add additional arguments that were passed into the function as either string element names or element objects to the extraObjects array.
		for (var i = 1; i < showSearchValues.arguments.length; i++) {
			if (typeof showSearchValues.arguments[i] != "object")
				extraObjects[extraObjectsIndex] = (eval("thisForm." + showSearchValues.arguments[i]) != "undefined") ? eval("thisForm." + showSearchValues.arguments[i]) : showSearchValues.arguments[i];
			else
				extraObjects[extraObjectsIndex] = showSearchValues.arguments[i];
			extraObjectsIndex++;
		} // end for

		// Add extra development and testing elements.
		var extraElements = new Array("searchtype","after","relativedate","ORIGINATION_CODE","keydesc","client","clientid");
		for (var devIndex = 0; devIndex < extraElements.length; devIndex++)
			if (typeof eval("thisForm." + extraElements[devIndex]) != "undefined")
				extraObjects[extraObjectsIndex++] = eval("thisForm." + extraElements[devIndex]);

		// Test for source fields
		if (typeof thisForm.src == "object") { // for nexis.com source field.
			if (thisForm.src.type == "select-one")
				sourceString = "\nSource: " + thisForm.src.options[thisForm.src.selectedIndex].value;
			else if (thisForm.src.type == "select-multiple") {
				var sourceNumber = 0;
				var sourceStringMultiple = "";
				var sourceStringSingle = "";
				for (var s = 0; s < thisForm.src.length; s++) {
					if (thisForm.src.options[s].selected == true) {
						sourceStringMultiple += "\nSource " + (++sourceNumber) + ": " + thisForm.src.options[s].value;
						sourceStringSingle += "\nSource: " + thisForm.src.options[s].value;
					} // end if
				} // end for
				sourceString = (sourceNumber > 1) ? sourceStringMultiple : sourceStringSingle;
			} // end else if
			else
				sourceString = "\nSource: " + thisForm.src.value;
		} // end if
		else if (typeof thisForm.source == "object") { // for lexis.com or LNE (professional) source field.
			if (thisForm.source.type == "select-one")
				sourceString = "\nSource: " + thisForm.source.options[thisForm.source.selectedIndex].value;
			else if (thisForm.source.type == "select-multiple") {
				var sourceNumber = 0;
				var sourceStringMultiple = "";
				var sourceStringSingle = "";
				for (var s = 0; s < thisForm.source.length; s++) {
					if (thisForm.source.options[s].selected == true) {
						sourceStringMultiple += "\nSource " + (++sourceNumber) + ": " + thisForm.source.options[s].value;
						sourceStringSingle += "\nSource: " + thisForm.source.options[s].value;
					} // end if
				} // end for
				sourceString = (sourceNumber > 1) ? sourceStringMultiple : sourceStringSingle;
			} // end else if
			else
				sourceString = "\nSource: " + thisForm.source.value;
		} // end else if
		else
			sourceString = "\n\"SRC\" or \"SOURCE\" form elements for the source were not found.";

		// Test for query string fields
		if (typeof thisForm.query == "object") { // for nexis.com query string field.
			if (thisForm.query.type == "select-one")
				termsString = "\nSearch terms: " + thisForm.query.options[thisForm.query.selectedIndex].value;
			else if (thisForm.query.type == "select-multiple") {
				var termNumber = 0;
				var termsStringMultiple = "";
				var termsStringSingle = "";
				for (var s = 0; s < thisForm.query.length; s++) {
					if (thisForm.query.options[s].selected == true) {
						termsStringMultiple += "\nSearch term " + (++termNumber) + ": " + thisForm.query.options[s].value;
						termsStringSingle += "\nSearch terms: " + thisForm.query.options[s].value;
					} // end if
				} // end for
				termsString = (termNumber > 1) ? termsStringMultiple : termsStringSingle;
			} // end else if
			else
				termsString = "\nSearch terms: " + thisForm.query.value;
		} // end if
		else if (typeof thisForm.search == "object") { // for lexis.com query string field.
			if (thisForm.search.type == "select-one")
				termsString = "\nSearch terms: " + thisForm.search.options[thisForm.search.selectedIndex].value;
			else if (thisForm.search.type == "select-multiple") {
				var termNumber = 0;
				var termsStringMultiple = "";
				var termsStringSingle = "";
				for (var s = 0; s < thisForm.search.length; s++) {
					if (thisForm.search.options[s].selected == true) {
						termsStringMultiple += "\nSearch term " + (++termNumber) + ": " + thisForm.search.options[s].value;
						termsStringSingle += "\nSearch terms: " + thisForm.search.options[s].value;
					} // end if
				} // end for
				termsString = (termNumber > 1) ? termsStringMultiple : termsStringSingle;
			} // end else if
			else
				termsString = "\nSearch terms: " + thisForm.search.value;
		} // end else if
		else if (typeof thisForm.searchTerm == "object") { // for LNE (professional) query string field.
			if (thisForm.searchTerm.type == "select-one")
				termsString = "\nSearch terms: " + thisForm.searchTerm.options[thisForm.searchTerm.selectedIndex].value;
			else if (thisForm.searchTerm.type == "select-multiple") {
				var termNumber = 0;
				var termsStringMultiple = "";
				var termsStringSingle = "";
				for (var s = 0; s < thisForm.searchTerm.length; s++) {
					if (thisForm.searchTerm.options[s].selected == true) {
						termsStringMultiple += "\nSearch term " + (++termNumber) + ": " + thisForm.searchTerm.options[s].value;
						termsStringSingle += "\nSearch terms: " + thisForm.searchTerm.options[s].value;
					} // end if
				} // end for
				termsString = (termNumber > 1) ? termsStringMultiple : termsStringSingle;
			} // end else if
			else
				termsString = "\nSearch terms: " + thisForm.searchTerm.value;
		} // end else if
		else
			termsString = "\n\"QUERY\" or \"SEARCH\" form elements for the query string were not found.";
		
		var confirmString = "This development-only alert box will not display in production...\n" + sourceString + termsString;
		
		for (var extraIndex = 0; extraIndex < extraObjects.length; extraIndex++) {
			var extraString = "";
			if (typeof extraObjects[extraIndex] == "object") {
				if (extraObjects[extraIndex].type == "select-one")
					extraString = "\nSelected " + extraObjects[extraIndex].name + ": " + extraObjects[extraIndex].options[extraObjects[extraIndex].selectedIndex].value;
				else if (extraObjects[extraIndex].type == "select-multiple") {
					var extraNumber = 0;
					var extraStringMultiple = "";
					var extraStringSingle = "";
					for (var s = 0; s < extraObjects[extraIndex].length; s++) {
						if (extraObjects[extraIndex].options[s].selected == true) {
							extraStringMultiple += "\nSelected " + extraObjects[extraIndex].name + " " + (++extraNumber) + ": " + extraObjects[extraIndex].options[s].value;
							extraStringSingle += "\nSelected " + extraObjects[extraIndex].name + ": " + extraObjects[extraIndex].options[s].value;
						} // end if
					} // end for
					extraString = (extraNumber > 1) ? extraStringMultiple : extraStringSingle;
				} // end else if
				else
					extraString = "\n" + extraObjects[extraIndex].name + ": " + extraObjects[extraIndex].value;
			} // end if
			else
				extraString = "\n" + extraObjects[extraIndex] + ": Invalid form element passed to this function.";
			confirmString += extraString;
		} // end for
		
		confirmString += "\n\nClick OK to submit this search, or Cancel (alert will display for future submissions)."
		if (window.parent.displaySearchValues == true || window.parent.displaySearchValues == "new") {
			if (confirm(confirmString) == true) {
				if (window.parent.displaySearchValues == "new")
					window.parent.displaySearchValues = confirm("Display the development alert box for future searches?\n\n\"OK\" will display the alerts for future searches, \"Cancel\" will not.");
				returnString = true;
			} // end if
		} // end if
		else
			returnString = true;
	} // end if
	else
		returnString = true;
	return returnString;
} // end showSearchValues()

// Example Usage:
// isValidEmailAddr(document.getElementById("emailInput"), "lexis.com nexis.com", true)
function isValidEmailAddr(objTxtElement, strCompVal, handleErrors)
{
    var err = 0;	// Whether an error has occured.  0 = no error, 1 = invalid format, 2 = invalid domain
    var address = objTxtElement.value.toUpperCase();
    // Domains to check.
	var checks = strCompVal.toUpperCase().replace(/^\s+|\s+&/g, "").split(" ");
	// Address format check.
	var tester = /^[A-Z0-9!#$%&'*+\/=?^_`{|}~-]+(?:\.[A-Z0-9!#$%&'*+\/=?^_`{|}~-]+)*@(?:[A-Z0-9](?:[A-Z0-9-]*[A-Z0-9])?\.)+[A-Z0-9](?:[A-Z0-9-]*[A-Z0-9])?$/; //99% of RFC 2822
	
	if (tester.test(address)) {
		var eDomain = address.split("@")[1];
		
		// Assume the domain is invalid.
		if (checks.length > 0) {
			err = 2;
		}
		
		if (isDev()) {
			checks[checks.length] = "LEXISNEXIS.COM";
		}
		
		for (var i = 0; i < checks.length; ++i) {
			if (checks[i] == eDomain) {
				err = 0;
				i = checks.length;
			}
		}
	}
	else {
		err = 1;
	}
	
    if (handleErrors === true) { // optional error handling
        if (err == 2) {
			var msg = "Only email addresses from " + checks.join(", ") + " are allowed.  Please enter a valid email address.";
					
			if (isDev()) {
				msg += "\n\nNOTE:  \"lexisnexis.com\" is considered a valid domain during testing.";
			}
			
            alert(msg);
            objTxtElement.focus();
        }
		
        if (err == 1) {
            alert("Please enter a valid email address.");
            objTxtElement.focus();
        }
    }
	
	return err == 0;
}


function KeypressHandler(e) 
{
	var key
	var field

	// get the key pressed and the field from which it originated
	// different between NN and IE
	if (document.all) 
	{
		// here, we have IE
		key = event.keyCode
		field = event.srcElement
	}
	else if (navigator.appName=="Netscape") 
	{
		// here, we have netscape ver. 4 & 6
		key = ((parseInt(navigator.appVersion) > 4))? e.keyCode:e.which
		field = e.target
	}
	else 
	{
		// don't know what we have. bail out
		return true
	}

	if (key == 13) 
	{
		// call the form's onSubmit handler (usually a validator)
		// if successful, submit the form
		var f = field.form
		if ((!f.onsubmit) || (f.onsubmit && f.onsubmit())){
			field.form.submit()
		}

		// prepare for exit - different between NN and IE
		if (document.all) 
		{
			// ie
			event.returnValue  = false
			event.cancelBubble = true
			return false
		}
		else 
		{
			// netscape
			if (document.getElementById) {
				e.returnValue  = false
				e.cancelBubble = true
			}
			return false
		}
	}
	return true
	
} // KeypressHandler(e)

function setAllDates(lstDateList)
{
	if(typeof lstDateList == "object" && typeof lstDateList.form == "object")
	{		
		if (lstDateList.type != "select-one")
		{
			if(isDev())
				alert("setAllDates() can only be used with an element of type select-one.");
			return false;
		}
		else
		{
			for(x=0; x<lstDateList.options.length; x++)
			{
				if(lstDateList.options[x].value == "0:ALL" || lstDateList.options[x].value == "") 
				{
					lstDateList.options[x].selected = true;
					return;
				}
			}
		}
	}
	else
	{
		if(isDev())
			alert("setAllDates() only accepts a date select list.");
		return false;
	}			
}

function getRadioValue(radioGroup)
{	
	var selectedValue = "";
	
	if(radioGroup.length == undefined)
		selectedValue = radioGroup.value;
	else
	{
		for(x=0; x<radioGroup.length; x++)
		{
			if(radioGroup[x].checked)
				selectedValue = radioGroup[x].value;			
		}
	}	
	return selectedValue;
}

function setSelectList(objList, optionValue)
{	
	var matchFound = false;	

	if(optionValue)
	{	
		for(x=0; x<objList.options.length; x++)
		{
			if(objList.options[x].value == optionValue)
			{
				objList.options[x].selected = true;
				matchFound = true;
			}
		}
		
		if(!(matchFound))
		{
			for(x=0; x<objList.options.length; x++)
			{
				if(objList.options[x].text == optionValue)				
					objList.options[x].selected = true;				
			}
		}
	}
}

function prisonFooter() 
{
            var tempDate = new Date();
            var copyYear = tempDate.getFullYear();
            var footerText = "<a href=\"footer_termsconditions.htm\">Terms and Conditions<\/a>&nbsp;&nbsp;|&nbsp;&nbsp;";
				footerText += "<a href=\"footer_privacy.htm\">Privacy<\/a>&nbsp;&nbsp;|&nbsp;&nbsp;<a href=\"footer_copyright.htm\">Copyright &copy;&nbsp;" + copyYear + "<\/a><br>";
				footerText += "LexisNexis, a division of Reed Elsevier Inc. All rights reserved.";
            document.write("<div class=\"footDiv\">" + footerText + "<\/div>");
} // end prisonFooter()

function stripLeadTrailBlanks(theForm)
{
	var i, j, elem, str,k,S1,S2;
	with (theForm)
	{	 
		for (elem = 0; elem < elements.length; ++elem)
		{
			if (elements[elem].type == "text" || elements[elem].type == "textarea")
			{
				str = elements[elem].value; 	     
				for (i = 0; i < str.length && str.charCodeAt(i) == 32; ++i);
				for (j = str.length - 1; j >= i && str.charCodeAt(j) == 32; --j);
				if(elements[elem].type == "textarea")	     	      
				{
					S1 = "";
					S2 = "";
					if(i < str.length)
					{
						S1 = str.substring(i,j+1);					
						for (k = 0; k < S1.length; ++k)
						{			
							if(S1.charCodeAt(k) != 13 && S1.charCodeAt(k) != 10 )
							{	
								if((S1.charCodeAt(k) == 32 && S2.length > 0) || S1.charCodeAt(k) != 32)
								{																			
									S2 += S1.charAt(k);
								}
							}
							else if((S1.charCodeAt(k) == 13 || S1.charCodeAt(k) == 10)  && S2.length > 0)
							{																												
								S2 += " ";								
							}
						}						
						elements[elem].value = S2;							
					}
					else
					{											
						elements[elem].value = "";				
					}
				}
				else 
					elements[elem].value = (i < str.length) ? str.substring(i, j + 1) : "";	 				   
			}
		}
	}
}

function convertAfterToQuery(after, format)
{	
    var dStr = "";
    
    if(!format)
        var format = "us";
    
    if(after != "")
    {
	    var dRange     = after.substring(0, after.length - 3);
	    var dRangeType = after.substring(after.length - 2);
	    var theDate = new Date();
        
	    switch(dRangeType)
	    {
		    case "DY":
			    theDate.setDate(theDate.getDate() - dRange);
			    break;
		    case "WK":
			    theDate.setDate(theDate.getDate() - (dRange * 7));
			    break;
		    case "MO":
			    theDate.setMonth(theDate.getMonth() - dRange);
			    break;
		    case "YR":
			    theDate.setFullYear(theDate.getFullYear() - dRange);
			    break;
	    } 
	    
        if(format.toLowerCase() == "uklegal")
    	    dStr = "date(geq (" + theDate.getDate() + "/" +(theDate.getMonth() + 1) + "/" + theDate.getFullYear() + "))";
        else
    	    dStr = "date(geq (" + (theDate.getMonth() + 1) + "/" + theDate.getDate() + "/" + theDate.getFullYear() + "))";		
    }         
    return dStr;
}

function stringReplace(strValue, strToReplace, strReplacement) 
{
    var regExp = new RegExp(strToReplace, "g");
    strValue = strValue.replace(regExp, strReplacement);
    return strValue;
}

function buildLogoFooter(logoName, region, targetName, clientLogo)
{
	var tempDate = new Date();
	var copyYear = tempDate.getFullYear();	
	if ((typeof targetName == "") || (typeof targetName == "undefined") || (targetName == ""))
		targetName = "_blank";
	if ((typeof logoName == "") || (typeof logoName == "undefined") || (logoName == ""))
		logoName = "ALNBT_131x25_FFFFFF.gif";
	var tableStarter = "<table border='0' cellpadding='0' cellspacing='0' class='footerTable'><tr>"
	var logoArea = "<td class='footerLogo'><a href='http:\/\/global.lexisnexis.com\/' target='_blank'><img src='\/clients\/images\/LN_logos\/" + logoName + "' alt='LexisNexis&#174;' hspace='10' vspace='10' border='0' title='LexisNexis&#174;' \/><\/a><\/td>"
	var divider = "<td class='footerDivider' width='1'><\/td>"
	var textStarter = "<td class='footerText'><div style='margin-left:10px; line-height:14px;'><font size='1' face='Verdana, Arial, Helvetica, sans-serif'>"
	var linkDivider = "<span style='margin:0px 4px 0px 4px;' class='footerLinkDivider'>|<\/span>"
	var clientLogoArea = "<td class='clientLogo'><img src='" + clientLogo + "' alt='' border='0' \/><\/td>"
	var tableEnder;
	if ((typeof clientLogo == "") || (typeof clientLogo == "undefined") || (clientLogo == ""))
		tableEnder = "</tr></table>";
	else
		tableEnder = clientLogoArea + "</tr></table>";

	var aboutLink, termsLink, privacyLink, copyLink, textEnder, theFooter;
	switch (region)
	{
		case "widget":
			termsLink = "<a href='http:\/\/www.lexisnexis.com\/terms\/general.aspx' target=" + targetName + " class='footerLink'>Terms &amp; Conditions<\/a>";
			copyLink = "<a href='http:\/\/www.lexisnexis.com\/terms\/copyright\/' target=" + targetName + " class='footerLink'>&#169; " + copyYear + " LexisNexis<\/a> ";
			linkDivider = "<span class='footerLinkDivider'>&nbsp;|&nbsp;<\/span>";
			theFooter = tableStarter + logoArea + "</tr><tr>" + textStarter + termsLink + linkDivider + copyLink;
			theFooter +=  "</tr><tr>" + tableEnder;
			break;
		case "No_Logo":
			termsLink = "<a href='http:\/\/www.lexisnexis.com\/terms\/general.aspx' target=" + targetName + " class='footerLink'>Terms &amp; Conditions<\/a>";
			copyLink = "<a href='http:\/\/www.lexisnexis.com\/terms\/copyright\/' target=" + targetName + " class='footerLink'>&#169; " + copyYear + " LexisNexis<\/a> ";
			linkDivider = "<span class='footerLinkDivider'>&nbsp;|&nbsp;<\/span>";
			theFooter = "<span class='footerText'>" + termsLink + linkDivider + copyLink + "<\/span>";
			break;
		case "Privacy_Update":
			aboutLink = "<a href='http:\/\/www.lexisnexis.com\/about\/' target=" + targetName + " class='footerLink'>About LexisNexis<\/a>";
			termsLink = "<a href='http:\/\/www.lexisnexis.com\/terms\/general.aspx' target=" + targetName + " class='footerLink'>Terms and Conditions<\/a>";
			privacyLink = "<a href='http:\/\/www.lexisnexis.com\/privacypolicy\/legalprofessional\/' target=" + targetName + " class='footerLink'>Privacy Policy<\/a>";
			copyLink = "<a href='http:\/\/www.lexisnexis.com\/terms\/copyright\/' target=" + targetName + " class='footerLink'>Copyright &#169;<\/a> ";
			textEnder = copyYear + " LexisNexis, a division of Reed Elsevier Inc. All rights reserved.<\/font><\/div><\/td>";
			theFooter = tableStarter + logoArea + divider + textStarter + aboutLink + linkDivider + termsLink + linkDivider + privacyLink + "<br \/>";
			theFooter +=  copyLink + textEnder + tableEnder;
			break;
		case "CA_Legal":
			aboutLink = "<a href='http:\/\/www.lexisnexis.ca\/en\/about-us\/' target=" + targetName + " class='footerLink'>About LexisNexis&#174; Canada Inc.<\/a>";
			termsLink = "<a href='http:\/\/www.lexisnexis.com\/ca\/legal\/auth\/displayterms.do?content=GENERAL' target=" + targetName + " class='footerLink'>Terms and Conditions<\/a>";
			privacyLink = "<a href='http:\/\/www.lexisnexis.ca\/en\/privacy\/' target=" + targetName + " class='footerLink'>Privacy Policy<\/a>";
			copyLink = "<a href='http:\/\/www.lexisnexis.com\/terms\/copr\/lngp\/ca\/' target=" + targetName + " class='footerLink'>Copyright &#169;<\/a> ";
			textEnder = copyYear + " <a href='http:\/\/www.lexisnexis.ca\/en\/' target=" + targetName + " class='footerLink'>LexisNexis Canada Inc.<\/a>. All rights reserved.<\/font><\/div><\/td>";
			theFooter = tableStarter + logoArea + divider + textStarter + aboutLink + linkDivider + termsLink + linkDivider + privacyLink + "<br \/>";
			theFooter += copyLink + textEnder + tableEnder;
			break;
	    case "CA_Legal_FR":
	        http://www.lexisnexis.ca/fr/about-us/
	            aboutLink = "<a href='http:\/\/www.lexisnexis.ca\/fr\/about-us\/' target=" + targetName + " class='footerLink'>&Agrave; propos de LexisNexis Canada inc.<\/a>";
	        termsLink = "<a href='http:\/\/www.lexisnexis.com\/ca\/legal\/auth\/displayterms.do?content=GENERAL' target=" + targetName + " class='footerLink'> Conditions d'utilisation<\/a>";
	        privacyLink = "<a href='http:\/\/www.lexisnexis.ca\/fr\/privacy\/' target=" + targetName + " class='footerLink'> Politique de confidentialit&eacute;<\/a>";
	        copyLink = "<a href='http:\/\/www.lexisnexis.com\/terms\/copr\/lngp\/ca\/' target=" + targetName + " class='footerLink'>Copyright &#169;<\/a> ";
	        textEnder = copyYear + " <a href='http:\/\/www.lexisnexis.ca\/fr\/' target=" + targetName + " class='footerLink'>LexisNexis Canada Inc.<\/a>. Tous droits r&eacute;serv&eacute;s.<\/font><\/div><\/td>";
	        theFooter = tableStarter + logoArea + divider + textStarter + aboutLink + linkDivider + termsLink + linkDivider + privacyLink + "<br \/>";
	        theFooter += copyLink + textEnder + tableEnder;
	        break;
		case "UK_Professional":
			termsLink = "Your use of this service is governed by <a href='http:\/\/www.lexisnexis.com\/terms\/Europe\/' target=" + targetName + " class='footerLink'>Terms and Conditions<\/a>. Please review them.";
			copyLink = "<a href='http:\/\/www.lexisnexis.com\/terms\/Europe\/copyright\/' target=" + targetName + " class='footerLink'>Copyright &#169;<\/a> ";
			textEnder = copyYear + " <a href='http:\/\/www.lexisnexis.co.uk\/' target=" + targetName + " class='footerLink'>LexisNexis Group<\/a> a division of Reed Elsevier (UK) Ltd. All rights reserved.<\/font><\/div><\/td>";
			theFooter = tableStarter + logoArea + divider + textStarter + termsLink + "<br \/>";
			theFooter +=  copyLink + textEnder + tableEnder;
			break;
		case "UK_Butterworths":
			aboutLink = "<a href='http:\/\/www1.lexisnexis.co.uk\/marketing\/about_us_pages\/about_us.htm' target=" + targetName + " class='footerLink'>About LexisNexis&#174;<\/a>";
			termsLink = "<a href='http:\/\/www.lexisnexis.com\/uk\/legal\/auth\/displayterms.do?content=GENERAL' target=" + targetName + " class='footerLink'>Terms and Conditions<\/a>";
			copyLink = "<a href='http:\/\/www.lexisnexis.com\/terms\/copr\/lngp\/uk\/' target=" + targetName + " class='footerLink'>Copyright &#169;<\/a> ";
			privacyLink = "<a href='http:\/\/www.lexisnexis.co.uk\/privacypolicy' target=" + targetName + " class='footerLink'>Privacy &amp; Cookies Policy (Updated)<\/a>";
			textEnder = copyYear + " <a href='http:\/\/www.lexisnexis.co.uk\/' target=" + targetName + " class='footerLink'>LexisNexis<\/a>. All rights reserved.<\/font><\/div><\/td>";
			theFooter = tableStarter + logoArea + divider + textStarter + aboutLink + linkDivider + termsLink + linkDivider + privacyLink + "<br \/>";
			theFooter +=  copyLink + textEnder + tableEnder;
			break;
		case "UK_GlobalNews":
			aboutLink = "<a href='http:\/\/www.lexisnexis.co.uk\/about-us\/' target=" + targetName + " class='footerLink'>About LexisNexis&#174;<\/a>";
			termsLink = "<a href='http:\/\/www.lexisnexis.com\/uk\/nexis\/auth\/displayterms.do?content=GENERAL' target=" + targetName + " class='footerLink'>Terms and Conditions<\/a>";
			copyLink = "<a href='http:\/\/www.lexisnexis.com\/terms\/copr\/lngp\/uk\/' target=" + targetName + " class='footerLink'>Copyright &#169;<\/a> ";
			privacyLink = "<a href='http:\/\/www.lexisnexis.co.uk\/privacypolicy' target=" + targetName + " class='footerLink'>Privacy &amp; Cookies Policy (Updated)<\/a>";
			textEnder = copyYear + " <a href='http:\/\/www.lexisnexis.co.uk\/' target=" + targetName + " class='footerLink'>LexisNexis<\/a>. All rights reserved.<\/font><\/div><\/td>";
			theFooter = tableStarter + logoArea + divider + textStarter + aboutLink + linkDivider + termsLink + linkDivider + privacyLink + "<br \/>";
			theFooter +=  copyLink + textEnder + tableEnder;
			break;
		case "FR_GNB_French":
			termsLink = "L'utilisation de ce service est soumise aux  <a href='http:\/\/www.lexisnexis.com\/fr\/business\/auth\/displayterms.do?content=GENERAL' target=" + targetName + " class='footerLink'>Conditions d'utilisation<\/a>. Veuillez les consulter.";
			copyLink = "<a href='http:\/\/www.lexisnexis.com\/terms\/copr\/lngp\/fr\/' target=" + targetName + " class='footerLink'>Copyright &#169;<\/a> ";
			textEnder = copyYear + " <a href='http:\/\/www.lexisnexis.fr\/' target=" + targetName + " class='footerLink'>LexisNexis <\/a> Tous droits r�serv�s.<\/font><\/div><\/td>";
			theFooter = tableStarter + logoArea + divider + textStarter + termsLink + "<br \/>";
			theFooter +=  copyLink + textEnder + tableEnder;
			break;
		case "FR_GNB_English":
			termsLink = "The use of this service is subject to <a href='http:\/\/www.lexisnexis.com\/fr\/business\/auth\/displayterms.do?content=GENERAL' target=" + targetName + " class='footerLink'>Terms and Conditions<\/a>. Please review them.";
			copyLink = "<a href='http:\/\/www.lexisnexis.com\/terms\/copr\/lngp\/fr\/' target=" + targetName + " class='footerLink'>Copyright &#169;<\/a> ";
			textEnder = copyYear + " <a href='http:\/\/www.lexisnexis.fr\/' target=" + targetName + " class='footerLink'>LexisNexis<\/a>   All rights reserved.<\/font><\/div><\/td>";
			theFooter = tableStarter + logoArea + divider + textStarter + termsLink + "<br \/>";
			theFooter +=  copyLink + textEnder + tableEnder;
			break;
		default:
			aboutLink = "<a href='http:\/\/www.lexisnexis.com\/about\/' target=" + targetName + " class='footerLink'>About LexisNexis<\/a>";
			termsLink = "<a href='http:\/\/www.lexisnexis.com\/terms\/general.aspx' target=" + targetName + " class='footerLink'>Terms and Conditions<\/a>";
			privacyLink = "<a href='http:\/\/www.lexisnexis.com\/privacypolicy\/legalprofessional\/' target=" + targetName + " class='footerLink'>Privacy Policy<\/a>";
			copyLink = "<a href='http:\/\/www.lexisnexis.com\/terms\/copyright\/' target=" + targetName + " class='footerLink'>Copyright &#169;<\/a> ";
			textEnder = copyYear + " LexisNexis, a division of Reed Elsevier Inc. All rights reserved.<\/font><\/div><\/td>";
			theFooter = tableStarter + logoArea + divider + textStarter + aboutLink + linkDivider + termsLink + linkDivider + privacyLink + "<br \/>";
			theFooter +=  copyLink + textEnder + tableEnder;
			break;
	}
	document.write(theFooter);
}

/**
 * An object to handle mundane or error-prone parts of handling cookies.
 *
 * NOTE: Use only letters and numbers for the cookie name when a cookie has to
 *		 be read and written on both the client-side and server-side.  IIS
 *		 encodes more characters than required.
 */ 
var CookieUtil = {
	/**
	 * Decodes the item.  Gives special attention to spaces encoded as '+'.
	 *
	 * @param {string} item String to decode.
	 * @returns {string} Decoded string.
	 * @private
	 */
	_decode: function(item) {
		return decodeURIComponent(item.replace(/\+/g, ' '));
	},
	/**
	 * Encodes the item.
	 *
	 * @param {string} item String to encode.
	 * @returns {string} Encoded string.
	 * @private
	 */
	_encode: function(item) {
		return encodeURIComponent(item);
	},
	/**
	 * Checks for cookie's existance.
	 *
	 * @param {string} key Cookie name.
	 * @returns {boolean} Whether cookie exists and is not empty.
	 */
	exists: function(key) {
		return CookieUtil.read(key).length > 0;
	},
	/**
	 * Reads the value of a cookie.  An empty string is returned if no cookie.
	 *
	 * @param {string} key Cookie name.
	 * @returns {string} Cookie value.
	 */
	read: function(key) {
		var cookies = document.cookie.split(/\s*;\s*/);
		var ret = '', cookie, i, st = cookies.length;
		
		for (i = 0; i < st; ++i) {
			cookie = cookies[i].split(/\s*=\s*/);

			if (cookie.length && CookieUtil._decode(cookie[0]) == key) {
				if (cookie.length > 1) {
					ret = CookieUtil._decode(cookie[1]);
				}
			}
		}

		return ret;
	},
	/**
	 * Removes a cookie.
	 *
	 * The path, domain, and secure options are only needed if the cookie was
	 * set with the options.
	 *
	 * @param {string} key Cookie name.
	 * @param {object} opts Options to use.  Optional.
	 * @option {string} path Path cookie is in.  Optional.
	 * @option {string} domain Domain cookie is readable from.  Optional.
	 * @option {boolean} secure Cookie is restricted to https.  Optional.
	 */
	remove: function(key, opts) {
		var options = {days: -1};
		
		if (opts) {
			if (opts.path) {
				options.path = opts.path;
			}
			
			if (opts.domain) {
				options.domain = opts.domain;
			}
			
			if (opts.secure) {
				options.secure = opts.secure;
			}
		}
		
		this.write(key, '', options);
	},
	/**
	 * Writes a cookie.
	 *
	 * @param {string} key Cookie name.
	 * @param {string} value Cookie value.
	 * @param {object} opts Options to use.  Optional.
	 * @option {Date} date Date to expire.  Optional.
	 * @option {integer} days Number of days to expire.  Optional.
	 * @option {boolean} longTerm Whether the cookie should stick around a
	 *		while.  Optional.
	 * @option {string} path Path the cookie should reside in.  Optional.
	 * @option {string} domain Domain the cookie should be accessible to.
	 *		Optional.
	 * @option {boolean} secure Restrict cookie to https.  Optional.
	 */
	write: function(key, value, opts) {
		var msInDay = 86400000;				// Number of milliseconds in a day.
		var cookie;
		
		if (key) {
			// Set cookie value.
			cookie = CookieUtil._encode(key) + '='
				+ CookieUtil._encode(value || '') + '; ';
				
			if (opts) {	
				// Set expire date.
				if (opts.date) {
					cookie += 'expires="' + opts.date.toGMTString() + '"; ';
				} else if (opts.days) {
					var today = new Date();

					today.setTime(today.getTime() + (opts.days * msInDay));
					
					cookie += 'expires="' + today.toGMTString() + '"; ';
				} else if (opts.longTerm) {
					var today = new Date();

					// Set cookie to 10 years.
					today.setTime(today.getTime() + (3650 * msInDay));
					
					cookie += 'expires="' + today.toGMTString() + '"; ';
				}

				// Set path to restrict to.
				if (opts.path) {
					cookie += 'path="' + opts.path + '"; ';
				}

				// Set domains to restrict to.
				if (opts.domain) {
					cookie += 'domain="' + opts.domain + '"; ';
				}

				// Restrict cookie to https.
				if (opts.secure === true) {
					cookie += 'secure; ';
				}
			}

			document.cookie = cookie;
		}
	}
};
