/*   File: tabs.js
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
  var tabs_module = (function() {
    var top_control_id = 0;
    
    function create_control(controller, viewport, top_id) {
      return (function(controller, viewport, top_id) {
        var id = top_id;
        var top_tab_id = 0;
        var tablist = [];

        var attach_event = function(element, event, f) {
          element[event] = f;
        };

        return {
          id: function() {
            return id;
          },

          top_tab_id: function() {
            return top_tab_id;
          },

          add_tab: function(title, content) {
            var tab = document.createElement("div");

            if (!title || !content)
              return false;

            tab.id = "tab_" + id.toString() + "_" + top_tab_id.toString();
            tab.className = "tab";
            tab.innerHTML = title;

            controller.appendChild(tab);
            tablist.push(tab);
            top_tab_id++;

            attach_event(tab, "onclick", (function(controller, viewport, content) {
              return function () {
                /* this is a shittier method than i wanted for removing the
                 * active class from the other tabs with, but the alternatives
                 * i thought up made it way more complex so i said fuck that
                 * shit.  i'd like to revisit this and come up with a better
                 * solution in the future.
                 */
                $(controller).find(".active").removeClass("active");
                $(this).addClass("active");
                viewport.innerHTML = content;
              };
            })(controller, viewport, content));
          },

          remove_tab: function(index) {
            controller.removeChild(tablist[index]);
            tablist.splice(index, 1);
          },

          get_tab: function(index) {
            return tablist[index];
          },

          get_tabs: function() {
            return tablist;
          },
          
          num_tabs: function() {
            return tablist.length;
          }
        };
      })(controller, viewport, top_id);
    }
    
    function create_persistent_control(controller, viewport, top_id) {
      return (function(controller, viewport, top_id) {
        var id = top_id;
        var top_tab_id = 0;
        var tablist = [];

        var attach_event = function(element, event, f) {
          element[event] = f;
        };

        return {
          id: function() {
            return id;
          },

          top_tab_id: function() {
            return top_tab_id;
          },

          add_tab: function(title, content) {
            var tab = document.createElement("div");
            var view = document.createElement("div");

            if (!title || !content)
              return false;

            tab.id = "tab_" + id.toString() + "_" + top_tab_id.toString();
            tab.className = "tab";
            tab.innerHTML = title;
            
            view.id = "tab_" + id.toString() + "_" + top_tab_id.toString() + "_view";
            view.className = "viewport-persistence";
            view.innerHTML = content;

            controller.appendChild(tab);
            tablist.push(tab);
            top_tab_id++;
            
            viewport.appendChild(view);

            attach_event(tab, "onclick", (function(controller, viewport, view) {
              return function () {
                /* this is a shittier method than i wanted for removing the
                 * active class from the other tabs with, but the alternatives
                 * i thought up made it way more complex so i said fuck that
                 * shit.  i'd like to revisit this and come up with a better
                 * solution in the future.
                 */
                $(controller).find(".active").removeClass("active");
                $(this).addClass("active");
                
                $(viewport).find(".viewport-persistence.active").removeClass("active");
                $(view).addClass("active");
              };
            })(controller, viewport, view));
          },

          remove_tab: function(index) {
            controller.removeChild(tablist[index]);
            tablist.splice(index, 1);
          },

          get_tab: function(index) {
            return tablist[index];
          },

          get_tabs: function() {
            return tablist;
          },
          
          num_tabs: function() {
            return tablist.length;
          }
        };
      })(controller, viewport, top_id);
    }
    
    return {
      create: function(controller, viewport, tabs, config) {
        var control, i, l;

        if (!controller || !viewport)
          return false;
        
        $(controller).addClass("controls");
        $(viewport).addClass("viewport");
        
        if (config.persistent === true)
          control = create_persistent_control(controller, viewport, top_control_id);
        else
          control = create_control(controller, viewport, top_control_id);
        
        top_control_id++;
        
        for (i = 0, l = tabs.length; i < l; i++)
          control.add_tab(tabs[i].title, tabs[i].content);
        
        /* if we have at least one tab in our list, click the first one by default */
        if (control.num_tabs() >= 1)
          $(control.get_tab(0)).click();

        return control;
      },
      
      get_top_id: function() {
	      return top_control_id;
      }
    };
  })();
  
  return tabs_module;
});