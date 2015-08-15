/*   File: toolbar.js
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
 *   tool {
 *     icon: <image>
 *     text: <displayed text>
 *     tooltip {
 *       title: <tooltip title> (defaults to null)
 *       content: <tooltip text>
 *       vector: <geometric angle of tooltip linking> (can be actual angle or cardinal direction)
 *       distance: <distance between tooltip and hooked element>
 *       connector: <none, line, or arrow>
 *       show_delay: <wait period before beginning display animation>
 *       show_transition: <duration of display animation>
 *       hide_delay: <wait period before beginning hide animation>
 *       hide_transition: <duration of hide animation>
 *     }
 *     events {
 *       for now events are ignored
 *     }
 *   }
 * 
 */


define(["jquery", "tooltip"], function($, tooltip) {
  var toolbar_module = (function() {
    var top_toolbar_id = 0;  
    
    return {
      create: function(bar, tools, config) {
        var i, l, temp, toolbar;
        
        if (!bar || !tools)
          return false;
        
        $(bar).addClass("toolbar");
        
        toolbar = (function(bar, top_id) {
          var id = top_id;
          var top_tool_id = 0;
          var tool_list = [];

          var attach_event = function(element, event, f) {
            element[event] = f;
          };
          
          return {
            id: function() {
              return id;
            },
            
            top_tool_id: function() {
              return top_tool_id;
            },
            
            add_tool: function(icon, text) {
              var tool = document.createElement("div");
              var span, spacer, txt;

              tool.id = "tool_" + top_tool_id.toString();
              tool.className = "tool";
              
              if (icon) {
                span = document.createElement("span");
                span.className = "icon fa fa-fw " + icon;

                tool.appendChild(span);
              }

              if (text) {
                if (icon) {
                  spacer = document.createElement("span");
                  spacer.className = "spacer";
                  tool.appendChild(spacer);
                }

                txt = document.createElement("span");
                txt.className = "text";
                txt.appendChild(document.createTextNode("" + text));
                tool.appendChild(txt);
              }

              bar.appendChild(tool);
              tool_list.push(tool);
              top_tool_id++;
              
              return tool; /* return the tool element so we can attach a tooltip if needed */
            },
            
            remove_tool: function() {
            }
          };
        })(bar, top_toolbar_id);
        
        top_toolbar_id++;
        
        for (i = 0, l = tools.length; i < l; i++) {
          temp = toolbar.add_tool(tools[i].icon, tools[i].text);
          
          if (tools[i].tooltip)
            tooltip(temp, tools[i].tooltip);
        }
        
        return toolbar;
      },
      
      get_top_id: function() {
	      return top_toolbar_id;
      }
    };
  })();
  
  return toolbar_module;
});