/*
chrome.browserAction.onClicked.addListener(function(tab){
	if (tab.url.indexOf("tim.com.local") > 0) { 
		chrome.tabs.executeScript(tab.id, {file: "script.js"});
	}
});
*/

chrome.browserAction.onClicked.addListener(function(tab){
	if (tab.url.indexOf("tim.com.local") > 0 || tab.url.indexOf("timbrasildev.prod.acquia-sites.com")) { 
		chrome.tabs.executeScript(tab.id, {file: "jquery.js"},
			function(){
				chrome.tabs.executeScript(tab.id, {file: "script.js"});
			}
	);
		chrome.tabs.insertCSS({file: "css/animate.css"});
		chrome.tabs.insertCSS({file: "css/ext.css"});
	}
});
