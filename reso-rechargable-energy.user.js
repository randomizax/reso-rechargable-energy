// ==UserScript==
// @id             iitc-plugin-reso-rechargable-energy@randomizax
// @name           IITC plugin: reso rechargable xm in portal detail
// @category       Info
// @version        0.1.1.20160506.70127
// @namespace      https://github.com/jonatkins/ingress-intel-total-conversion
// @updateURL      https://rawgit.com/randomizax/reso-rechargable-energy/latest/reso-rechargable-energy.meta.js
// @downloadURL    https://rawgit.com/randomizax/reso-rechargable-energy/latest/reso-rechargable-energy.user.js
// @description    [randomizax-2016-05-06-070127] Show each resonator's missing energy in portal details.
// @include        https://www.ingress.com/intel*
// @include        http://www.ingress.com/intel*
// @match          https://www.ingress.com/intel*
// @match          http://www.ingress.com/intel*
// @grant          none
// ==/UserScript==


function wrapper(plugin_info) {
// ensure plugin framework is there, even if iitc is not yet loaded
if(typeof window.plugin !== 'function') window.plugin = function() {};

//PLUGIN AUTHORS: writing a plugin outside of the IITC build environment? if so, delete these lines!!
//(leaving them in place might break the 'About IITC' page or break update checks)
// plugin_info.buildName = 'randomizax';
// plugin_info.dateTimeVersion = '20160506.70127';
// plugin_info.pluginId = 'reso-rechargable-energy';
//END PLUGIN AUTHORS NOTE



// PLUGIN START ////////////////////////////////////////////////////////

// use own namespace for plugin
window.plugin.resoRechargableEnergy = function() {};

window.plugin.resoRechargableEnergy.updateMeter = function(data) {
  $("span.meter-level")
    .css({
      "word-spacing": "-1px",
      "text-align": "left",
      "font-size": "90%",
      "padding-left": "2px",
    })
    .each(function() {
      var matchResult = $(this).parent().attr('title').match(/:\t(\d+) \/ (\d+)/);
      if(matchResult) {
        var html = $(this).html() + '<div style="position:absolute;right:0;top:0">' + (matchResult[1] - matchResult[2]) + '</div>';
        $(this).html(html);
      }
    });
};

var setup =  function() {
  window.addHook('portalDetailsUpdated', window.plugin.resoRechargableEnergy.updateMeter);
};

// PLUGIN END //////////////////////////////////////////////////////////


setup.info = plugin_info; //add the script info data to the function as a property
if(!window.bootPlugins) window.bootPlugins = [];
window.bootPlugins.push(setup);
// if IITC has already booted, immediately run the 'setup' function
if(window.iitcLoaded && typeof setup === 'function') setup();
} // wrapper end
// inject code into site context
var script = document.createElement('script');
var info = {};
if (typeof GM_info !== 'undefined' && GM_info && GM_info.script) info.script = { version: GM_info.script.version, name: GM_info.script.name, description: GM_info.script.description };
script.appendChild(document.createTextNode('('+ wrapper +')('+JSON.stringify(info)+');'));
(document.body || document.head || document.documentElement).appendChild(script);


