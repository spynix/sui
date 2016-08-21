/*   File: .js
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
 * 
 * 
 * Structure
 * ----------------------------------------------------------------------------
 *   element: <dom element>
 *   config {
 *     type: <horizontal or vertical> (const string)
 *     static: <true or false> (defaults to false)
 *     ratio: <number:number> (permanent if static, initial sizes if volatile)
 *     size: <number> (size in pixels of the divider, not including borders)
 *     border: <number> (size in pixels of the border of the divider)
 *     colors {
 *       background: <RGB code> (color of the divider's background)
 *       border: <RGB code> (color of the divider's border)
 *     }
 *   }
 * 
 * 
 * Notes
 * ----------------------------------------------------------------------------
 * 
 */


define(["jquery"], function($) {
  var split_module = (function() {
    var top_panel_id = 0;
    var top_divider_id = 0;
    
    var defaults = {
      type: "horizontal",
      ratio: "1:1",
      size: 6,
      border: 1,
      nw: {
	      min_size: 50
      },
      divider: {
	      size: 6,
	      border_size: 1,
	      background_color: "#b0d0d0",
        border_color: "#202020"
      },
      se: {
	      min_size: 50
      },
      colors: {
        background: "#b0d0d0",
        border: "#202020"
      }
    };
    
    
    var parse_ratio = function(str) {
      var index = str.indexOf(":");
      var first = str.slice(0, index);
      var second = str.slice((index + 1), str.length);
      
      return {
        nw: isNaN(first) ? false : Number(first),
        se: isNaN(second) ? false : Number(second)
      };
    };
    
    
    /* for use with getBoundingClientRect() */
    var width_removals = function(element) {
	    var total = 0;
	    
      total += parseInt($(element).css("border-left-width"), 10);
      total += parseInt($(element).css("border-right-width"), 10);
      total += parseInt($(element).css("padding-left"), 10);
      total += parseInt($(element).css("padding-right"), 10);
      
      return total;
    };
    
    
    /* for use with getBoundingClientRect() */
    var height_removals = function(element) {
	    var total = 0;
	    
      total += parseInt($(element).css("border-top-width"), 10);
      total += parseInt($(element).css("border-bottom-width"), 10);
      total += parseInt($(element).css("padding-top"), 10);
      total += parseInt($(element).css("padding-bottom"), 10);
      
      return total;
    };
    
    
    var create_panels = function(element, type) {
	    var nw = document.createElement("div");
	    var divider = document.createElement("div");
	    var se = document.createElement("div");
	    
	    nw.id = "panel_" + top_panel_id.toString();
      top_panel_id++;
      
      se.id = "panel_" + top_panel_id.toString();
      top_panel_id++;
      
      divider.id = "divider_" + top_divider_id.toString();
      top_divider_id++;
      
      $(element).addClass("split-container");
      
      $(nw).addClass("split-" + type.toString());
      $(nw).addClass("nw");
      
      $(se).addClass("split-" + type.toString());
      $(se).addClass("se");
      
      $(divider).addClass("split-" + type.toString());
      $(divider).addClass("divider");
      
      element.appendChild(nw);
      element.appendChild(divider);
      element.appendChild(se);
      
      return {
	      nw: nw,
	      divider: divider,
	      se: se
      };
    };
    
    
    var drag_handler = function(divider, nw, se, type) {
	    return function() { drag(divider, nw, se, type); };
    };
    
    
    var drag = function(divider, nw, se, type) {
	    var interval = setInterval(function() {
	    }, 200);
	    
	    
    };
    
    
    var resize_handler = function(container, nw, divider, se, type) {
		  return function() { resize(container, nw, divider, se, type); };
    };
    
    
    var resize = function(container, nw, divider, se, type) {
      var working_width, working_height, bounds, scale, temp;
	    
      bounds = container.getBoundingClientRect();
	    
      working_width = bounds.right - bounds.left;
      working_height = bounds.bottom - bounds.top;
	    
      working_width -= width_removals(container);
      working_height -= height_removals(container);
      
      if (type === "horizontal") {
        scale = ($(nw).outerWidth() / ($(se).outerWidth() + $(nw).outerWidth()));
        working_width -= $(divider).outerWidth();
	      
        temp = scale * working_width;
	      
        nw.style.width = "" + temp + "px";
        nw.style.height = "" + working_height + "px";
	      
        working_width -= temp;
	      
        divider.style.height = "" + working_height + "px";
	      
        se.style.width = "" + working_width + "px";
        se.style.height = "" + working_height + "px";
      } else if (type === "vertical") {
        scale = ($(nw).outerHeight() / ($(se).outerHeight() + $(nw).outerHeight()));
        working_height -= $(divider).outerHeight();
	      
        temp = scale * working_height;
	      
        nw.style.height = "" + temp + "px";
        nw.style.width = "" + working_width + "px";
	      
        working_height -= temp;
	      
        divider.style.width = "" + working_width + "px";
	      
        se.style.height = "" + working_height + "px";
        se.style.width = "" + working_width + "px";
      }
    };
    
    
    /* create():
     *   creates our 3 children panels and sizes them correctly for the first
     *   time.  after that resizing will be handled by the container.onresize
     *   handler or divider.onmousedown -- ie our drag event
     */
    var create = function(element, config) {
      var ratio = parse_ratio(config.ratio);
      var nw_width, nw_height, se_width, se_height, working_width, working_height;
      var panels, bounds;
      
      if ((config.type !== "horizontal") && (config.type !== "vertical"))
        config.type = "horizontal";
        
      panels = create_panels(element, config.type);
      bounds = element.getBoundingClientRect();

      working_width = bounds.right - bounds.left;
      working_height = bounds.bottom - bounds.top;

      working_width -= width_removals(element);
      working_height -= height_removals(element);
      
      if (config.type === "horizontal") {
        $(panels.divider).addClass("we");
        
        panels.divider.style.width = "" + config.size + "px";
        working_width -= config.size;
        
        panels.divider.style.backgroundColor = config.colors.background;
        panels.divider.style.borderLeftColor = config.colors.border;
        panels.divider.style.borderRightColor = config.colors.border;
        panels.divider.style.borderLeftWidth = "" + config.border + "px";
        panels.divider.style.borderRightWidth = "" + config.border + "px";
        panels.divider.style.borderLeftStyle = "solid";
        panels.divider.style.borderRightStyle = "solid";
        working_width -= (config.border * 2);
        
        /* available pixels / (number of parts total) * (number of nw parts) */
        nw_width = Math.round((working_width / (ratio.nw + ratio.se)) * ratio.nw);
        
        working_width -= nw_width;
        se_width = working_width;
        
        panels.nw.style.width = "" + nw_width + "px";
        panels.se.style.width = "" + se_width + "px";
        
        panels.nw.style.height = "" + working_height + "px";
        panels.se.style.height = "" + working_height + "px";
        panels.divider.style.height = "" + working_height + "px";
      } else if (config.type === "vertical") {
        $(panels.divider).addClass("ns");
        
        panels.divider.style.height = "" + config.size + "px";
        working_height -= config.size;
        
        panels.divider.style.backgroundColor = config.colors.background;
        panels.divider.style.borderTopColor = config.colors.border;
        panels.divider.style.borderBottomColor = config.colors.border;
        panels.divider.style.borderTopWidth = "" + config.border + "px";
        panels.divider.style.borderBottomWidth = "" + config.border + "px";
        panels.divider.style.borderTopStyle = "solid";
        panels.divider.style.borderBottomStyle = "solid";
        working_height -= (config.border * 2);
        
        nw_height = Math.round((working_height / (ratio.nw + ratio.se)) * ratio.nw);
        
        working_height -= nw_height;
        se_height = working_height;
        
        panels.nw.style.height = "" + nw_height + "px";
        panels.se.style.height = "" + se_height + "px";
        
        panels.nw.style.width = "" + working_width + "px";
        panels.se.style.width = "" + working_width + "px";
        panels.divider.style.width = "" + working_width + "px";
      }
      
      window.resize_handlers.push(resize_handler(element, panels.nw, panels.divider, panels.se, config.type));
      
      return {
        nw: panels.nw,
        se: panels.se,
        divider: panels.divider
      };
    };
    
    
    var split = function(element, config) {
      var result;
      var options = {};
      
      $.extend(true, options, defaults, config);
      
      window.resize_handlers = (window.resize_handlers || []);
      
      window.onresize = function() {
	      var i, l;
	      
	      for (i = 0, l = window.resize_handlers.length; i < l; i++)
	        window.resize_handlers[i]();
      };
      
      result = create(element, options);
      
      return result;
    };
    
    return split;
  })();
  
  return split_module;
});