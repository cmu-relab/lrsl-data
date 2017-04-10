var pBrowser = 0;
function WebBrowser()
{
var agt=navigator.userAgent.toLowerCase();
var appVer = navigator.appVersion.toLowerCase();
this.minor = parseFloat(appVer);
this.major = parseInt(this.minor);
var iePos  = appVer.indexOf('msie');
if (iePos !=-1) {
this.minor = parseFloat(appVer.substring(iePos+5,appVer.indexOf(';',iePos)))
this.major = parseInt(this.minor);
}
var rvPos = appVer.indexOf('rv:');
if(rvPos !=-1){
this.minor = parseFloat(appVer.substring(rvPos+3,appVer.indexOf(')', rvPos)))
this.major = parseInt(this.minor);
}
var nav6Pos = agt.indexOf('netscape6');
if (nav6Pos !=-1) {
this.minor = parseFloat(agt.substring(nav6Pos+10));
this.major = parseInt(this.minor);
}
var nav7Pos = agt.indexOf('netscape/7');
if (nav7Pos !=-1) {
this.minor = parseFloat(agt.substring(nav7Pos+9));
this.major = parseInt(this.minor);
}
var ffoxPos = agt.indexOf('firefox/');
if (ffoxPos != -1) {
this.minor = 7.2;
this.major = 7;
this.firefox = true;
}
this.nav      = ((agt.indexOf('mozilla')!=-1) && (agt.indexOf('spoofer')==-1)
&& (agt.indexOf('compatible') == -1) && (agt.indexOf('opera')==-1)
&& (agt.indexOf('webtv')==-1));
this.nav2     = (this.nav && (this.major == 2));
this.nav3     = (this.nav && (this.major == 3));
this.nav4     = (this.nav && (this.major == 4));
this.nav4up   = (this.nav && (this.major >= 4));
this.nav451up = (this.nav && (this.minor >= 4.51));
this.navonly  = (this.nav && ((agt.indexOf(";nav") != -1) ||
(agt.indexOf("; nav") != -1)) );
this.nav6   = (this.nav && this.major==6);    // new 010118 mhp
this.nav6up = (this.nav && this.minor >= 6);  // new 010118 mhp
this.nav7   = (this.nav && this.major==7);    // new 04/08/03
this.nav7up = (this.nav && this.minor >= 7);  // new 04/08/03
this.nav5   = (this.nav && this.major == 5 && !this.nav6); // checked for ns6
this.nav5up = (this.nav && this.minor >= 5);
this.ie   = (iePos!=-1);
this.ie3  = (this.ie && (this.major < 4));
this.ie4   = (this.ie && this.major == 4);
this.ie4up = (this.ie && this.minor >= 4);
this.ie5   = (this.ie && this.major == 5);
this.ie5up = (this.ie && this.minor >= 5);
this.ie6   = (this.ie && this.major == 6);
this.ie6up = (this.ie && this.minor >= 6);
this.aol   = (agt.indexOf("aol") != -1);
this.aol3  = (this.aol && this.ie3);
this.aol4  = (this.aol && this.ie4);
this.opera = (agt.indexOf("opera") != -1);
this.webtv = (agt.indexOf("webtv") != -1);
this.safari = (agt.indexOf("safari") != -1);
if (this.safari) {    // Act like Nav7+
this.nav = true;
this.nav7 = true;
this.nav7up = true;
this.nav6up = true;
this.nav5up = true;
this.nav4up = true;
this.minor = 7.1;
this.major = 7;
}
this.js;
if (this.nav2 || this.ie3)
this.js = 1.0;
else if (this.nav3 || this.opera)
this.js = 1.1;
else if ((this.nav4 && (this.minor <= 4.05)) || this.ie4)
this.js = 1.2;
else if ((this.nav4 && (this.minor > 4.05)) || this.ie5 || this.ie6)
this.js = 1.3;
else if (this.nav5 && !(this.nav6))
this.js = 1.4;
else if (this.nav6)
this.js = 1.5;
else if (this.nav && (this.major > 5))
this.js = 1.4;
else if (this.ie && (this.major > 5))
this.js = 1.3;
else
this.js = 0.0;
this.win   = ( (agt.indexOf("win")!=-1) || (agt.indexOf("16bit")!=-1) );
this.win95 = ((agt.indexOf("win95")!=-1) || (agt.indexOf("windows 95")!=-1));
this.win16 = ((agt.indexOf("win16")!=-1) ||
(agt.indexOf("16bit")!=-1) || (agt.indexOf("windows 3.1")!=-1) ||
(agt.indexOf("windows 16-bit")!=-1) );
this.win31 = ((agt.indexOf("windows 3.1")!=-1) || (agt.indexOf("win16")!=-1) ||
(agt.indexOf("windows 16-bit")!=-1));
this.win98 = ((agt.indexOf("win98")!=-1) || (agt.indexOf("windows 98")!=-1));
this.winnt = ((agt.indexOf("winnt")!=-1) || (agt.indexOf("windows nt")!=-1));
this.win32 = (this.win95 || this.winnt || this.win98 ||
((this.major >= 4) && (navigator.platform == "Win32")) ||
(agt.indexOf("win32")!=-1) || (agt.indexOf("32bit")!=-1));
this.os2   = ((agt.indexOf("os/2")!=-1) ||
(navigator.appVersion.indexOf("OS/2")!=-1) ||
(agt.indexOf("ibm-webexplorer")!=-1));
if (this.safari) {  // Pretend to be on Win32 instead of Mac
this.mac = false;
this.mac68k = false;
this.macppc = false;
this.win = true;
this.win32 = true;
} else {
this.mac    = (agt.indexOf("mac")!=-1);
this.mac68k = (this.mac && ((agt.indexOf("68k")!=-1) ||
(agt.indexOf("68000")!=-1)));
this.macppc = (this.mac && ((agt.indexOf("ppc")!=-1) ||
(agt.indexOf("powerpc")!=-1)));
}
this.sun   = (agt.indexOf("sunos")!=-1);
this.sun4  = (agt.indexOf("sunos 4")!=-1);
this.sun5  = (agt.indexOf("sunos 5")!=-1);
this.suni86= (this.sun && (agt.indexOf("i86")!=-1));
this.irix  = (agt.indexOf("irix") !=-1);    // SGI
this.irix5 = (agt.indexOf("irix 5") !=-1);
this.irix6 = ((agt.indexOf("irix 6") !=-1) || (agt.indexOf("irix6") !=-1));
this.hpux  = (agt.indexOf("hp-ux")!=-1);
this.hpux9 = (this.hpux && (agt.indexOf("09.")!=-1));
this.hpux10= (this.hpux && (agt.indexOf("10.")!=-1));
this.aix   = (agt.indexOf("aix") !=-1);      // IBM
this.aix1  = (agt.indexOf("aix 1") !=-1);
this.aix2  = (agt.indexOf("aix 2") !=-1);
this.aix3  = (agt.indexOf("aix 3") !=-1);
this.aix4  = (agt.indexOf("aix 4") !=-1);
this.linux = (agt.indexOf("inux")!=-1);
this.sco   = (agt.indexOf("sco")!=-1) || (agt.indexOf("unix_sv")!=-1);
this.unixware = (agt.indexOf("unix_system_v")!=-1);
this.mpras    = (agt.indexOf("ncr")!=-1);
this.reliant  = (agt.indexOf("reliantunix")!=-1);
this.dec   = ((agt.indexOf("dec")!=-1) || (agt.indexOf("osf1")!=-1) ||
(agt.indexOf("dec_alpha")!=-1) || (agt.indexOf("alphaserver")!=-1) ||
(agt.indexOf("ultrix")!=-1) || (agt.indexOf("alphastation")!=-1));
this.sinix = (agt.indexOf("sinix")!=-1);
this.freebsd = (agt.indexOf("freebsd")!=-1);
this.bsd = (agt.indexOf("bsd")!=-1);
this.unix  = ((agt.indexOf("x11")!=-1) || this.sun || this.irix || this.hpux ||
this.sco ||this.unixware || this.mpras || this.reliant ||
this.dec || this.sinix || this.aix || this.linux || this.bsd || this.freebsd);
this.vms   = ((agt.indexOf("vax")!=-1) || (agt.indexOf("openvms")!=-1));
}
function browserProps() {
var propList = "";
if ((navigator.userAgent.indexOf("MSIE")!=-1) &&
(parseInt(navigator.appVersion)==3)) {
propList += "ie3";
} else {
var is = new WebBrowser();
var i = 0;
for (prop in is) {
if (is[prop] == true) {
if (i > 0) propList += ",";
propList += prop;
++i;
}
}
}
return propList;
}
