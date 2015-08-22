/*   File: examples_grid_1.js
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


require(["jquery", "grid"], function($, grid) {
  window.grid1 = grid.create(document.getElementById("grid1"), [
    {
      label: "index",
      name: "Index"
    }, {
      label: "_id",
      name: "ID"
    }, {
      label: "lastname",
      name: "Last Name"
    }, {
      label: "firstname",
      name: "First Name"
    }, {
      label: "email",
      name: "E-Mail"
    }, {
      label: "phone",
      name: "Telephone #"
    }
  ], {
    paging: {
      size: 15
    }
  });
  
  $.ajax("./json/grid_data_1.json", {
    async: true,
    dataType: "json",
    success: function(d) {
      window.grid1.set_data(d);
    },
    error: function(xhr, status, err) {
    }
  });
  
  $("#rpp_input").keypress(function(event) {
    if (event.which == 13)
      if (!isNaN(this.value) && (this.value >= 1))
        window.grid1.rows_per_page(parseInt(this.value, 10));
  });
});