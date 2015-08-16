/*   File: examples_accordions_1.js
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


require(["jquery", "accordion"], function($, accordion) {
  var accordion1, accordion2;
  
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
  
  accordion2 = accordion.create(document.getElementById("accordion2"), [
    {
      title: "Accordion #2's first entry!",
      content: "Wheeeeeeeeeeeeee"
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
      title: "Accordion #2's last entry!",
      content: "Yaaaaaay"
    }
  ]);
});