// ==UserScript==
// @id             iitc-plugin-reso-rechargable-energy@randomizax
// @name           IITC plugin: reso rechargable xm in portal detail
// @category       Info
// @version        0.1.0.@@DATETIMEVERSION@@
// @namespace      https://github.com/jonatkins/ingress-intel-total-conversion
// @updateURL      @@UPDATEURL@@
// @downloadURL    @@DOWNLOADURL@@
// @description    [@@BUILDNAME@@-@@BUILDDATE@@] Add a button so that quickly refresh portal details data.
// @include        https://www.ingress.com/intel*
// @include        http://www.ingress.com/intel*
// @match          https://www.ingress.com/intel*
// @match          http://www.ingress.com/intel*
// @grant          none
// ==/UserScript==

@@PLUGINSTART@@

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

@@PLUGINEND@@
