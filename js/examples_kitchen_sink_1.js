/*   File: examples_kitchen_sink_1.js
 * Author: Jin Savage ("spynix")
 * 
 * 
 * License - 2-clause ("simplified") BSD
 * ----------------------------------------------------------------------------
 * 
 * Copyright (c) 2015, Jin Savage ("spynix")
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *
 * 1. Redistributions of source code must retain the above copyright notice, this
 *    list of conditions and the following disclaimer.
 * 2. Redistributions in binary form must reproduce the above copyright notice,
 *    this list of conditions and the following disclaimer in the documentation
 *    and/or other materials provided with the distribution.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
 * ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
 * WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
 * DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR
 * ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
 * (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
 * LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
 * ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
 * (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
 * SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */
 
 
 require.config({
  paths: {
    jquery: "jquery-2.1.4.min"
  }
});


require(["jquery", "accordion", "tabs", "toolbar", "tooltip"], function($, accordion, tabs, toolbar, tooltip) {
	var tabber1, tabber2, toolbar1, toolbar2, accordion1;
	var p1 = "Irure eu aliqua nulla ullamco ad adipisicing dolor. Ex aliquip mollit esse aute labore culpa aute commodo qui velit anim eiusmod aliquip. Ullamco quis cupidatat velit cillum. Anim eiusmod minim anim laborum adipisicing velit commodo et excepteur occaecat eiusmod minim ex excepteur. Laborum elit minim consequat aliqua Lorem. Proident est ut duis consectetur do.";
	var p2 = "Laboris consequata ullamco velit est officia pariatur anim cupidatat occaecat fugiat. Occaecat aute enim cupidatat cillum sit ipsum. Id irure voluptate ullamco ea pariatur incididunt ipsum nisi ullamco.";
	var p3 = "Aliquip culpa veniam eu in aute anim elit. Elit laborum ea eiusmod reprehenderit qui nisi veniam officia tempor sint. Ullamco ut magna nulla aute fugiat laboris minim nisi adipisicing adipisicing id est. Nisi consectetur esse esse amet sint magna nostrud ad. Dolore est ad Lorem incididunt amet.";
	var p4 = "Cillum enim pariatur ullamco amet velit elit adipisicing do duis deserunt. Est excepteur elit anim dolor labore in veniam sunt ea deserunt do aliquip. Cillum proident do deserunt ea qui Lorem elit sint exercitation occaecat. Veniam commodo sit excepteur in ullamco commodo occaecat pariatur laboris cupidatat eiusmod ex. Id nisi laborum reprehenderit nulla proident ea nulla ex. In ipsum laborum cupidatat deserunt ex occaecat amet.";
  var text = p1 + "<br /><br />" + p2 + "<br /><br />" + p3 + "<br /><br />" + p4;
	
	tabber1 = tabs.create(document.getElementById("controller1"), document.getElementById("viewport1"), [
	  {
		  title: "More Tab Controls",
		  content: "<div class=\"container\"><div id=\"controller2\"></div><div id=\"viewport2\"></div></div>"
	  },
	  {
		  title: "Tab #2",
		  content: "<div id=\"toolbar1\"></div>" + text
	  },
	  {
		  title: "Tab #3",
		  content: "<div id=\"toolbar2\"></div>" + p2 + "<div id=\"accordion1\"></div>"
	  }
	], { persistent: true });
	
	tabber2 = tabs.create(document.getElementById("controller2"), document.getElementById("viewport2"), [
	  {
		  title: "Nested Tab #1",
		  content: "This is a tab nested inside another tab control."
	  },
	  {
		  title: "Nested Tab #2",
		  content: "Yet more nested tab contents for your viewing pleasure."
	  },
	  {
		  title: "Reminder",
		  content: "This tab control's views won't persist, unlike the main tab control, unless you set the configuration option <persistent: true> when creating the tab control."
	  }
	], {});
	
	toolbar1 = toolbar.create(document.getElementById("toolbar1"), [
	  {
      icon: "fa-cube",
      text: "Cube",
      tooltip: {
        content: "Perform a cube on the specified target"
      }
    },
    {
      icon: "fa-folder-o"
    },
    {
      icon: "fa-line-chart",
      text: "Charting"
    },
    {
      icon: "fa-music",
      text: "Sheet Music"
    },
    {
      icon: "fa-square-o",
      text: "Square",
      tooltip: {
        content: "Perform a square on the specified target"
      }
    }
	]);
	
	toolbar2 = toolbar.create(document.getElementById("toolbar2"), [
	  {
		  icon: "fa-rss",
		  tooltip: {
			  content: "RSS Feed"
		  }
	  },
	  {
		  icon: "fa-plus",
		  tooltip: {
			  content: "Add"
		  }
	  },
	  {
		  icon: "fa-trash",
		  tooltip: {
			  content: "Remove"
		  }
	  },
	  {
		  icon: "fa-cog",
		  tooltip: {
			  content: "Settings"
		  }
	  }
	]);
	
	accordion1 = accordion.create(document.getElementById("accordion1"), [
    {
      title: "Some info",
      content: "This is a test of the some info system."
    },
    {
      title: "Asdf",
      content: "asdf asdf asdf adsf asdf asdf asdf asdf"
    },
    {
      title: "Fdsa",
      content: "fdsa fdsa fdsa fdsa fdsa fdsa fdsa fdsa"
    },
    {
      title: "More stuff",
      content: "Yet more crap nobody cares about."
    }
  ]);
});