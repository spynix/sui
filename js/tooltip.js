/*   File: tooltip.js
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
 *   element: <dom element> (the element to receive the tooltip)
 *   config {
 *     title: <displayed title> (defaults to null and not added to the tooltip)
 *     content: <displayed text>
 *     vector: <directionality> (either an angle or a cardinal direction)
 *     distance: <integer> 
 *     connector: <none, line, arrow> (sometimes called a stem)
 *     show_delay: <integer in ms> (wait period before beginning show animation)
 *     show_transition: <integer in ms> (duration of show animation)
 *     hide_delay: <integer in ms> (wait period before beginning hide animation)
 *     hide_transition: <integer in ms> (duration of hide animation)
 *   }
 *   
 *   
 * Notes
 * ----------------------------------------------------------------------------
 *   hook: this is a container div wrapped around the selected element so that
 *         all selected element functionality remains untouched and all event
 *         handlers can be attached here
 * 
 *   vector: in the future i'd like a more geometrically accurate result here
 *         by using any valid angle, but for now it simply takes the angle
 *         and converts it to a cardinal vector, or you can use an explicit
 *         cardinal vector string
 *         
 *         right now this works somewhat unintuitively though, and may need
 *         redesigning because of that, but it collectively handles both
 *         sides of the connection between the tooltip and the hook
 * 
 *   removing tooltips: currently not available.  in the future i want to make
 *         it so each module manhandles its own respective fields, but at the
 *         same time not replicate code across each created object, so i'll be
 *         spending more time deciding how i want to accomplish that
 * 
 */


define(["jquery"], function($) {
  var tooltip_module = (function() {
    var top_tooltip_id = 0;
    var vectors = ["n", "ne", "e", "se", "s", "sw", "w", "nw"];
    var connectors = ["arrow", "line", "none"];
    
    var defaults = {
      id: -1,                         /* unique id for every tooltip */
      active: true,                   /* is this tooltip on or off (not related to showing or not) */
      visible: false,                 /* is the tooltip currently being displayed */
      element: null,                  /* the parent element this tooltip is attached to */
      container: null,                /* reference for the generated tooltip element */
      hook: null,                     /* see devnotes->hook */
      title: null,                    /* if a title is specified, creates a dialogue modal style header */
      content: "This is a tooltip.",  /* innerHTML of the tooltip's body */
      vector: "n",                    /* see devnotes->vector */
      distance: 16,                   /* distance in pixels the tooltip will appear from the element */
      connector: "line",              /* the graphical connector made between the tooltip and the element */
      show_delay: 400,                /* wait period before showing the tooltip */
      show_timeout: null,             /* reference to the timeout function for show */
      show_transition: 400,           /* transition time from transparent to opaque */
      hide_delay: 400,                /* wait period before hiding the tooltip */
      hide_timeout: null,             /* reference to the timeout function for hide */
      hide_transition: 400            /* transition time from opaque to transparent */
    };
    
    
    /* create():
     *   creates the tooltip element itself
     */
    var create = function(config) {
      var container = document.createElement("div");
      var title = config.title !== null ? document.createElement("div") : false;
      var content = document.createElement("div");
      
      container.id = "tooltip_" + config.id.toString();
      container.className = "tooltip";
        
      if (title) {
        title.className = "tooltip-title";
        title.innerHTML = config.title;
        container.appendChild(title);
      }
      
      content.className = "tooltip-content";
      content.innerHTML = config.content;
      container.appendChild(content);
      
      document.body.appendChild(container);
      
      return container;
    };
    
    
    var position = function(hook, container, vector, distance) {
      var body_bounds, hook_bounds, container_bounds;
      var hook_center, hook_middle;
      var container_top, container_left;
      var hook_width, hook_height, container_width, container_height;

      body_bounds = document.body.getBoundingClientRect();
      hook_bounds = hook.getBoundingClientRect();
      container_bounds = container.getBoundingClientRect();
      
      hook_width = hook_bounds.right - hook_bounds.left;
      hook_height = hook_bounds.bottom - hook_bounds.top;
      
      container_width = container_bounds.right - container_bounds.left;
      container_height = container_bounds.bottom - container_bounds.top;

      hook_center = Math.round(hook_bounds.left + Math.round(hook_width / 2)); /* vertical plane */
      hook_middle = Math.round(hook_bounds.top + Math.round(hook_height / 2)); /* horizontal plane */

      switch (vector) {
        case "n": /* fall through */
        default:
          container_top = hook_bounds.top - distance - container_height;
          container_left = Math.round(hook_center - Math.round(container_width / 2));

          break;
        case "ne":
          break;
        case "e":
          break;
        case "se":
          break;
        case "s":
          break;
        case "sw":
          break;
        case "w":
          break;
        case "nw":
          break;
      }

      container.style.position = "absolute";
      container.style.top = container_top + "px";
      container.style.left = container_left + "px";
    };
    
    
    /* attach():
     *   performs dom element<->tooltip linking
     */
    var attach = function(element, config) {
//      var i = 0, l = 0;
//      var event_handles = [];
      var container, hook;
      
      if (!element || !config)
        return false;
      
      container = create(config);
      
      $(element).wrap('<div class="tooltip-hook"></div>');
      hook = element.parentElement;

      $(container).fadeOut({ duration: 0 });
      
      $(hook).on("mouseenter", (function(hook, container, vector, duration, transition, distance) {
        var timeout = false;
        
        return function() {
          if (timeout !== false) {
            clearTimeout(timeout);
            timeout = false;
          }
          
          if (!isNaN(duration) && (duration >= 1) && (duration <= 5000))
            timeout = setTimeout((function(hook, container, vector, distance) {
              return function() {
                $(container).fadeIn({
                  duration: transition,
                  start: function() { position(hook, container, vector, distance); },
                  complete: function() {
                  }
                });
              };
            })(hook, container, vector, distance), duration);
          else {
            $(container).fadeIn({
              duration: transition,
              start: function() { position(hook, container, vector, distance); },
              complete: function() {
              }
            });
          }
        };
      }(hook, container, config.vector, config.show_delay, config.show_transition, config.distance)));
      
      $(hook).on("mouseleave", (function(hook, container, vector, duration, transition) {
        var timeout = false;
        
        return function() {  
          if (timeout !== false) {
            clearTimeout(timeout);
            timeout = false;
          }

          if (!isNaN(duration) && (duration >= 1) && (duration <= 5000))
            timeout = setTimeout(function() {
              $(container).fadeOut({
                duration: transition,
                complete: function() {
                }
              });
            }, duration);
          else {
            $(container).fadeOut({
              duration: transition,
              complete: function() {
              }
            });
          }
        };
      } (hook, container, config.vector, config.hide_delay, config.hide_transition)));
      
      
      /* get the triggers for everything in tooltip.events and generate the
       * corresponding handlers for them all
       */
//      event_handles = Object.keys(config.events);
//      
//      for (i = 0, l = event_handles.length; i < l; i++)
//        $(config.hook).on(event_handles[i], config.events[event_handles[i]]);
    };
    
    
    /* nearest_vector():
     *   if an actual angle is used, this will determine which vector to use
     *   based on that angle.  rotation is clockwise beginning at 0-deg = north.
     */
    var nearest_vector = function(angle) {
      if (angle <= -1)
        angle *= -1;
      
      return (vectors[Math.round(angle / 45) % 8]);
    };
    
    
    /* tooltip():
     *   module entry point.  for now rather than returning a group of closed
     *   functions it simply pipes a single function -- the one to actually
     *   produce the tooltip -- instead.  once i decide how i want to handle
     *   removing an existing tooltip this may change.
     */
    var tooltip = function(element, config) {
      var options = {};

      if (!element)
        return false;

      /* if there's already a tooltip attached to this element... */
      if ($(element).parent().is('div[class="tooltip"]'))
        return false;

      $.extend(true, options, defaults, config);
      
      /* if the vector is a mathematical angle, transform it to a directional
       * vector relative to the element */
      if (!isNaN(options.vector))
        options.vector = nearest_vector(options.vector);

      options.id = top_tooltip_id;
      top_tooltip_id++;

      attach(element, options);
      
      return true;
    };
    
    return tooltip;
  })();
  
  return tooltip_module;
});