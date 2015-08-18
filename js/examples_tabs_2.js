/*   File: examples_tabs_2.js
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


require(["jquery", "tabs"], function($, tabs) {
	var tabber1, tabber2;
	
	tabber1 = tabs.create(document.getElementById("controller1"), document.getElementById("viewport1"), [
	  {
		  title: "Tab #1",
		  content: "<div class=\"container\"><div id=\"controller2\"></div><div id=\"viewport2\"></div></div>"
	  },
	  {
		  title: "Tab #2",
		  content: "This is the second tab created."
	  },
	  {
		  title: "Tab #3",
		  content: "Yet another tab for your viewing pleasure."
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
	  }
	], {});
});