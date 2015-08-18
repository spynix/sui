/*   File: examples_tabs_1.js
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
		  content: "This is the first tab created."
	  },
	  {
		  title: "Tab #2",
		  content: "This is the second tab created."
	  },
	  {
		  title: "Another Tab",
		  content: "Yet another tab for your viewing pleasure."
	  },
	  {
		  title: "A Really Large Tab",
		  content: "B-e-a-utiful?"
	  }
	], {});
	
	tabber2 = tabs.create(document.getElementById("controller2"), document.getElementById("viewport2"), [
	  {
		  title: "Bacon",
		  content: "It's what's for breakfast."
	  },
	  {
		  title: "Breakfast",
		  content: "It had better include bacon."
	  },
	  {
		  title: "Dinosaurs",
		  content: "I bet a few of them made some delicious bacon."
	  },
	  {
		  title: "Honey Badgers",
		  content: "They're your friends for life.  When's the last time you hugged a honey badger?"
	  }
	], {});
	
	tabber1.remove_tab(1);
	tabber1.add_tab("A New Tab", "This was a tab added after tabber creation through use of the control expression returned to the tabber1 variable.");
	
	tabber2.add_tab("Default", "This tab is selected by default manually via tabber2->click.  This is the intended behavior because it's possible to create a tabber with no tabs initially, so it's not always possible to \"default select\" the first tab.");
	
  /* forcing a click to the first tab is not necessary because the control will
   * automatically select the first indexed tab in the list upon creation if you
   * create a control with at least one tab 
   */
//	tabber1.get_tab(0).click();

  /* this is necessary to make the default selected tab something other than the
   * first indexed tab
   */
	tabber2.get_tab(4).click();
});