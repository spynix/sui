/*   File: modal.js
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


define(["jquery"], function ($) {
  var modal_module = (function() {
    var top_modal_id = 0; /* currently unused, to be used in future version */
    var first_create_call = 1;

    return {
      create: function(config) {
        var modal, bg, fg, t, c;

        /* use the same divs for all modals so only build them once */
        if (first_create_call) {
          if (document.getElementById("sui-modal-background") === null) {
            bg = document.createElement("div");
            fg = document.createElement("div");
            t = document.createElement("div");
            c = document.createElement("div");

            bg.id = "sui-modal-background";
            fg.id = "sui-modal";
            t.id = "sui-modal-title";
            c.id = "sui-modal-content";

            bg.className = "sui-modal-background";
            fg.className = "sui-modal";
            t.className = "sui-modal-title";
            c.className = "sui-modal-content";

            document.body.appendChild(bg);
            document.body.appendChild(fg);
            fg.appendChild(t);
            fg.appendChild(c);
          }

          first_create_call = 0;
        }

        /* container is a reference to the dom element #sui-modal,
         * but title and content are the innerHTML of their respectives
         */
        modal = (function(foreground, top_id, w, h) {
          var id = top_id;
          var container, title, content;
          var width, height, active;

          var attach_event = function(element, event, f) {
            element[event] = f;
          };

          var detach_event = function(element, event) {
            element[event] = undefined;
          };

          var deactivate = function() {
            document.getElementById("sui-modal").style.display = "none";
            document.getElementById("sui-modal-background").style.display = "none";

            flush("all");

            detach_event(document.getElementById("sui-modal-background"), "onclick");

            active = 0;

            return true;
          };

          var activate = (function(f) {
            return function() {
              var b, m, t, c;

              flush("all");

              b = document.getElementById("sui-modal-background");
              m = document.getElementById("sui-modal");
              t = document.getElementById("sui-modal-title");
              c = document.getElementById("sui-modal-content");

              b.style.display = "block";
              m.style.display = "flex";

              if (title.length >= 1) {
                t.style.display = "block";
                t.innerHTML = title;
              }

              c.innerHTML = content;

              size();

              attach_event(document.getElementById("sui-modal-background"), "onclick", (function(f) {
                return function() {
                  f();
                };
              })(f));

              active = 1;

              return true;
            };
          })(deactivate);

          function flush(what) {
            if ((typeof what === "undefined") || (what === "all") || (what === 0)) {
              document.getElementById("sui-modal-title").innerHTML = "";
              document.getElementById("sui-modal-content").innerHTML = "";
            } else if ((what === "title") || (what === 1)) {
              document.getElementById("sui-modal-title").innerHTML = "";
            } else if ((what === "content") || (what === 2)) {
              document.getElementById("sui-modal-content").innerHTML = "";
            }

            return true;
          }

          function size() {
            var m = document.getElementById("sui-modal");

            m.style.width = width;
            m.style.height = height;

            return true;
          }

          container = foreground;
          width = w;
          height = h;
          title = "";
          content = "";
          active = 0;

          return {
            id: function() {
              return id;
            },

            isactive: function() {
              return active;
            },

            get_width: function() {
              return width;
            },

            get_height: function() {
              return height;
            },

            get_container: function() {
              return container;
            },

            get_title: function() {
              return title;
            },

            get_content: function() {
              return content;
            },

            /* I really want to add proper w/h validation/sanity, but currently
             * for both speed of deployment and simplicity I'm not, because I
             * also want it to handle both percentages and pixels.  ie:
             *         "50%" and "300px" are both valid
             *
             * It's pushed directly to css anyway, so being able to handle
             * validation for the two basic w/h css methods would be good.
             */
            set_width: function(new_width) {
              if (typeof new_width !== "undefined")
                width = new_width;

              return true;
            },

            set_height: function(new_height) {
              if (typeof new_height !== "undefined")
                height = new_height;

              return true;
            },

            set_title: function(new_title) {
              if ((typeof new_title !== "string") || (new_title.length <= 0))
                return false;

              title = new_title;

              flush("title");
              document.getElementById("sui-modal-title").innerHTML = title;

              return true;
            },

            set_content: function(new_content) {
              if ((typeof new_content !== "string") || (new_content.length <= 0))
                return false;

              content = new_content;

              flush("content");
              document.getElementById("sui-modal-content").innerHTML = content;
              
              return true;
            },

            activate: activate,
            deactivate: deactivate,
            show: activate,
            hide: deactivate
          };
        })(fg, top_modal_id, config.width, config.height);

        top_modal_id++;

        /* title and content initialize to "" inside the modal = {};
         * if there isn't a title or content passed to the create function
         * through config, it's ok.  set_title and set_content won't modify the
         * existing values unless there's a string passed in with strlen >= 1.
         * this is so you can create an empty modal if you want to.
         */
        modal.set_title(config.title);
        modal.set_content(config.content);
        modal.set_width(config.width || "50%");
        modal.set_height(config.height || "50%");

        return modal;
      }
    };

  })();

  return modal_module;
});