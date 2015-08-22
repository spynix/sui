/*   File: grid.js
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
 */


define(["jquery"], function($) {
	var grid_module = (function() {
		var top_grid_id = 0;
    
    var defaults = {
      cells: {
        max_width: 300,
        max_height: 100
      },
      
      data: {
        type: "json"
      },
      
      paging: {
        active: true, /* on by default */
        size: 10,
        page: 1
      },
      
      renderers: {
        cell: false,
        row: false
      }
    };
    
    function create_column_header(name) {
      var div = document.createElement("div");
      
      div.className = "sui-grid-header-cell";
      div.innerHTML = "<div class=\"sui-grid-header-cell-text\">" + name + "</div>";
      
      return div;
    }
    
    function create_header() {
      var div = document.createElement("div");
      
      div.className = "sui-grid-header";
      
      return div;
    }
    
    function create_viewport() {
      var div = document.createElement("div");
      
      div.className = "sui-grid-viewport";
      
      return div;
    }
    
    function create_content() {
      var div = document.createElement("div");
      
      div.className = "sui-grid-contents";
      
      return div;
    }
    
    function create_paginator() {
      var div = document.createElement("div");
      
      div.className = "sui-grid-paginator";
      
      return div;
    }
    
    function create_footer() {
      var div = document.createElement("div");
      
      div.className = "sui-grid-footer";
      
      return div;
    }
    
    function create_rows_per_page(number) {
      var div = document.createElement("div");
      var form = document.createElement("form");
      var label = document.createElement("label");
      var input = document.createElement("input");
      
      div.className = "rpp";
      
      form.id = "rpp_form";
      form.action = "javascript:void(0);";
      div.appendChild(form);
      
      label.htmlFor = "rpp";
      label.innerHTML = "Rows Per Page: ";
      form.appendChild(label);
      
      input.name = "rpp";
      input.type = "text";
      input.id = "rpp_input";
      input.value = number.toString();
      form.appendChild(input);
      
      return div;
    }
    
    function create_row_expression(index_row, viewport, column_list, element_row, renderers) {
      var row_index = index_row;
      var parent = viewport;
      var element = element_row;
      var columns = column_list;
      var cells = init_cells(columns);
      
      function remove_all_cells() {
        var i, l;

        for (i = 0, l = cells.length; i < l; i++)
          cells[i].remove();

        /* since we're removing them all anyway, this should be the
         * faster choice for dumping the array
         */
        cells = [];
      }

      function init_cells(columns) {
        var i, l, temp;
        var records = [];

        for (i = 0, l = columns.length; i < l; i++) {
          temp = create_cell(index_row, i, columns[i].label, element, renderers.cell);                  
          records.push(temp);
        }

        return records;
      }
      
      return (function(index_row, viewport, columns, element_row, renderers) {
        return { /* row public API */
          get_cell: function(index) {
            return cells[index];
          },
          
          num_cells: function() {
            return cells.length;
          },
          
          get_index: function() {
            return row_index;
          },
          
          get_element: function() {
            return element;
          },
          
          remove: function() {
            remove_all_cells();
            parent.removeChild(element);
          },

          render: function() {
            var i, l;

            for (i = 0, l = cells.length; i < l; i++)
              cells[i].render();
          },

          update: function(d) {
            var i, l, label;

            for (i = 0, l = cells.length; i < l; i++) {
              label = cells[i].label();
              
              if (d == undefined) {
                cells[i].update(null);
                console.log("row->update(): error: cells[" + i.toString() + "]: undefined");
                continue;
              }

              if (d == null) { /* row in question didn't exist */
                cells[i].update(null);
                continue;
              }

              if (d.hasOwnProperty(label)) /* data had the goods */
                cells[i].update(d[label]);
              else /* the data was malformed or something */
                cells[i].update(null);
            }
          }
        };
      })(row_index, parent, columns, element, renderers);
    }
    
    function create_row(index_row, viewport, columns, renderers) {
      var div = document.createElement("div");

      div.className = "sui-grid-row";
      viewport.appendChild(div);
      
      return create_row_expression(index_row, viewport, columns, div, renderers);
    }
    
    function create_cell_expression(index_row, index_cell, label, element_row, element_cell, renderer) {
      var row_index = index_row;
      var cell_index = index_cell;
      var column_label = label;
      var parent = element_row;
      var element = element_cell;
      var data;
      
      return (function(index_row, index_cell, label, element_row, element_cell, renderer) {
        return { /* cell public API */
          get_element: function() {
            return element;
          },
          
          get_index: function() {
            return cell_index;
          },
          
          get_data: function() {
            return data;
          },
          
          /* removes the cell from the DOM */
          remove: function() {
            parent.removeChild(element);
          },

          label: function() {
            return column_label;
          },

          render: function() {
            if (typeof renderer === "function")
              renderer(data);
            else {
              if (data === undefined) {
                console.log("cell->update(): error: data undefined");
                return false;
              }
              
              if (data !== null)
                $(element).text(data.toString());
              else
                $(element).text("");
            }
          },

          update: function(d) {
            data = d;
          }
        };
      })(row_index, cell_index, label, parent, element, renderer);      
    }
    
    function create_cell(index_row, index_cell, label, element_row, renderer) {
      var div = document.createElement("div");

      div.className = "sui-grid-cell";
      element_row.appendChild(div);
      
      return create_cell_expression(index_row, index_cell, label, element_row, div, renderer);
    }
    
    function create_grid(element, column_list, top_id, conf) {
      var id = top_id;
      var config = conf;
      var columns = column_list;
      var rows = [];
      var data = {};
      var modifying = true;
      var contents, header, viewport, paginator, footer;
      
      function add_rows(quantity) {
        var i, l, temp;
        
        if (quantity <= 0)
          return false;
        
        for (i = rows.length, l = rows.length + quantity; i < l; i++) {
          temp = create_row(i, viewport, columns, conf.renderers);
          
          rows.push(temp);
        }
        
        return true;
      }
      
      function remove_rows(quantity) {
        var i, l, temp;
        
        if (quantity <= 0)
          return false;
        
        for (i = (rows.length - quantity), l = rows.length; i < l; i++)
          rows[i].remove();
        
        rows.splice((rows.length - quantity), quantity);
        
        return true;
      }
      
      /* adjust_rows():
       *   it's assumed that the initial setting of the number of rows will
       *   take place in init().  this function simply adds or subtracts as
       *   necessary
       */
      function adjust_rows(quantity) {
        var i, l, temp;
        
        if (!quantity || isNaN(quantity))
          return false;
        
        modifying = true;
        
        if (quantity == config.paging.size) { /* do nothing, but we didn't error out */
          modifying = false;
          return true;
        } else if (quantity < config.paging.size) { /* remove unneeded rows */
          if (remove_rows(config.paging.size - quantity))
            config.paging.size = quantity;
        } else if (quantity > config.paging.size) { /* add extra rows */
          if (add_rows(quantity - config.paging.size))
            config.paging.size = quantity;
        } else {
          console.log("Something went really wrong in adjusting the grid's number of rows.");
        }
        
        modifying = false;
        
        update();
      }
      
      function adjust_row_heights(index) {
        var row = rows[index];
        var top = 0;
        var i, l, cell, height;
        
        for (i = 0, l = row.num_cells(); i < l; i++) {
          cell = row.get_cell(i).get_element();
          height = $(cell).height();
          
          if (height > top)
            top = height;
        }
        
        top = Math.min(top, config.cells.max_height);
        
        for (i = 0, l = row.num_cells(); i < l; i++) {
          cell = row.get_cell(i).get_element();
          
          $(cell).height(top);
        }
      }
      
      function adjust_header_heights() {
        var top_height = 0;
        var height;
        
        $(header).find(".sui-grid-header-cell").each(function() {
          height = $(this).height();
          
          if (height > top_height)
            top_height = height;
        });
        
        $(header).find(".sui-grid-header-cell").each(function() {
          $(this).height(top_height);
        });
      }
      
      function adjust_cell_heights() {
        var i, j;
        
        for (i = 0, j = rows.length; i < j; i++)
          adjust_row_heights(i);
      }
      
      function adjust_heights() {
        adjust_cell_heights();
        adjust_header_heights();
      }
      
      function adjust_widths() {
        var i, j, k, l, row, cell, width;
        var widths = [];
        
        for (i = 0, l = columns.length; i < l; i++) {
          widths[i] = 0;
        }
        
        for (i = 0, j = rows.length; i < j; i++) {
          row = rows[i];
          
          for (k = 0, l = row.num_cells(); k < l; k++) {
            cell = row.get_cell(k).get_element();
            width = $(cell).width();
            
            if (width > widths[k])
              widths[k] = width;
          }
        }
        
        $(header).find(".sui-grid-header-cell").each(function(index) {
          if ($(this).width() > widths[index])
            widths[index] = $(this).width();
        });
        
        for (i = 0, l = columns.length; i < l; i++) {
          widths[i] = Math.min(widths[i], config.cells.max_width);
        }
        
        for (i = 0, j = rows.length; i < j; i++) {
          row = rows[i];
          
          for (k = 0, l = row.num_cells(); k < l; k++) {
            cell = row.get_cell(k).get_element();
            
            $(cell).width(widths[k]);
          }
        }
        
        $(header).find(".sui-grid-header-cell").each(function(index) {
          $(this).width(widths[index]);
        });
      }
      
      /* header_widths done inside adjust_cell_widths() */
      function adjust_cell_dimensions() {
        var i, j, k, l, row, cell;
        
        /* reset any past inline width/height style settings */
        for (i = 0, j = rows.length; i < j; i++) {
          row = rows[i];
          
          for (k = 0, l = row.num_cells(); k < l; k++) {
            cell = row.get_cell(k).get_element();
            
            cell.style = "";
          }
        }
        
        /* i don't THINK we need to remove heights from header-cells
         * since they won't change, but i may prove myself wrong.  for now
         * im not doing anything to them
         */
        adjust_widths();
        adjust_heights();
      }

      /* render():
       *   trickles the render command downwards eventually telling all
       *   cells to push their corresponding data to the DOM
       */
      function render() {
        var i, l;
        
        modifying = true;
        
        for (i = 0, l = rows.length; i < l; i++)
          rows[i].render();
        
        adjust_cell_dimensions();
        
        modifying = false;
      }

      /* update():
       *   updates the data stored in each cell to reflect what's currently
       *   in the cache.  render is then called to push that data into the
       *   dom.
       */
      function update() {
        var i, j, k, l, top, bottom;
        
        top = (config.paging.size * config.paging.page);
        bottom = (top - config.paging.size);
        
        if (!data.cache)
          return false;
        
        modifying = true;
        
        for (i = 0, j = rows.length, k = bottom, l = top; (i < j) && (k < l); i++, k++)
          rows[i].update((data.cache[k] !== null ? data.cache[k] : null));
        
        modifying = false;

        render();
      }
      
      return (function(element, columns, top_id, conf) {
        return { /* grid public API */
          init: function() {
            var i, l, temp;

            /* first create all the dom elements that our grid will rely on */
            header = create_header();
            viewport = create_viewport();
            
            if (config.paging.active)
              paginator = create_paginator();
            
            footer = create_footer();
            
            contents = create_content();
            
            contents.appendChild(header);
            contents.appendChild(viewport);
            
            element.appendChild(contents);
            
            if (config.paging.active)
              element.appendChild(paginator);
            
            element.appendChild(footer);
            
            footer.appendChild(create_rows_per_page(config.paging.size));
            
            data.old = null;
            data.cache = null;

            /* create our column headers */
            for (i = 0, l = columns.length; i < l; i++) {
              temp = create_column_header(columns[i].name);

              header.appendChild(temp);
            }

            /* now we add in our initial rows */
            for (i = 0; i < config.paging.size; i++) {
              temp = create_row(i, viewport, columns, conf.renderers);

              rows.push(temp);
            }

            /* will worry about paginator later */
            modifying = false;
          },
          
          refresh: function() {
            if (modifying) {
              console.log("Unable to process refresh request.  The grid is currently busy.");
              return false;
            }
            
            render();
          },

          /* called from the paginator's rows per page text input */
          rows_per_page: function(quantity) {
            if (modifying) {
              console.log("Unable to process rows per page request.  The grid is currently busy.");
              return false;
            }
            
            return adjust_rows(quantity);
          },

          /* assumes correct number of rows in grid */
          set_page: function(page) {
            var i, j, k, l, temp, num_pages, overflow, top, bottom;
            
            if (modifying) {
              console.log("Unable to process set page request.  The grid is currently busy.");
              return false;
            }
            
            if (!data.cache)
              return false;

            overflow = data.cache.length % config.paging.size;
            num_pages = (data.cache.length / config.paging.size) + (overflow ? 1 : 0);

            if (!page || (page < 1) || (page > num_pages))
              return false;

            config.paging.page = page;

            update();
          },

          /* handle page validation in set_page() */
          next: function() {
            set_page(config.paging.page + 1);
          },

          previous: function() {
            set_page(config.paging.page - 1);
          },

          /* set_data():
           *   currently only handles an array of json rows
           *   
           *   data set to the rows takes place ONLY in next(), previous(),
           *   or set_page() via update().  it's simply pulled from here.
           */
          set_data: function(d) {
            var i, l;
            var records = [];

            if (!d)
              return false;

            if (d === data.cache)
              return true;
            
            modifying = true;

            data.old = data.cache;

            for (i = 0, l = d.length; i < l; i++) {
              if (typeof d[i] !== "object")
                continue;

              records.push(d[i]);
            }

            data.cache = records;
            
            modifying = false;

            update();
          }
        };
      })(element, columns, top_id, conf);
    }
		
		return {
      create: function(element, columns, config) {
        var i, l, grid;
        var options = {};
        
        if (!element || !columns)
          return false;
        
        $.extend(true, options, defaults, config);
        
        $(element).addClass("sui-grid");
        
        /* you don't directly create rows or cells.  creation of rows is
         * automatically handled inside the grid expression when the user,
         * either explicitly or through the UI, changes the number of rows per
         * page.  each row then in turn is responsible for the generation of
         * its own cells, so likewise, the grid itself doesn't directly create
         * cells.
         * 
         * also, if header, viewport, and footer aren't initialized for whatever
         * reason, the grid will fail pretty awesomely.  i threw that stuff into
         * init().
         */
        grid = create_grid(element, columns, top_grid_id, options);
        
        /* we'll take care of initializing the grid ourselves, but populating
         * the grid with data is the responsibility of the user
         */
        grid.init();
        grid.set_page(1);
        
        return grid;
      }
		};
	})();
	
	return grid_module;
});