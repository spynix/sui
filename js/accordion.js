/*   File: accordion.js
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
 * 
 */


define(["jquery"], function($) {
	var accordion_module = (function() {
		var top_accordion_id = 0;
		
		return {
			create: function(element, panels, config) {
				var accordion, i, l;
				
				if (!element || !panels)
				  return false;
				  
				$(element).addClass("accordion");
        
        accordion = (function(element, top_id) {
          var id = top_id;
          var top_panel_id = 0;
          var panel_list = [];
          
          var attach_event = function(element, event, f) {
            element[event] = f;
          };
          
          return {
            id: function() {
              return id;
            },
            
            top_panel_id: function() {
              return top_panel_id;
            },
            
            add_panel: function(title, content) {
              var panel = document.createElement("div");
              var head = document.createElement("div");
              var body = document.createElement("div");
              
              panel.id = "accordion_" + id.toString() + "_panel_" + top_panel_id.toString();
              panel.className = "accordion-panel";
              
              head.className = "accordion-title";
              body.className = "accordion-content";
              
              head.innerHTML = title;
              body.innerHTML = content;
              
              panel.appendChild(head);
              panel.appendChild(body);
              
              element.appendChild(panel);
              panel_list.push(panel);
              top_panel_id++;
              
              $(body).slideUp({ duration: 0 });
              
              attach_event(head, "onclick", (function(body) {
                return function() {
                  $(body).slideToggle({ duration: 250 });
                };
              })(body));
            }
          };
        })(element, top_accordion_id);
        
        top_accordion_id++;
        
        for (i = 0, l = panels.length; i < l; i++)
          accordion.add_panel(panels[i].title, panels[i].content);
        
        return accordion;
			},
			
			get_top_id: function() {
				return top_accordion_id;
			}
		};
	})();
	
	return accordion_module;
});