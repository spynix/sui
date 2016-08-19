#SUI - Spynix's UI

At present this is more of a personal experiment in my free time than anything
else.  Just reinventing the wheel some.

##Available Components
- Accordion

- Grid
  - This is a work in progress.

- Tabs
  - The tab control supports reusing a single dom element as the viewport, or
  with the persistence option will generate separate views for each tab contents
  and swap between them to maintain an active DOM presence.  This allows for
  functionality like nested controls.  Not necessary for static data, but
  needed for referencing (to prevent scope out).

- Toolbar
  - The toolbar component will automatically inherit the tooltip component.
  The idea was for a legacy style toolbar with only icons and tooltips.  The
  fact text is assignable to each tool is simply a bonus.
  
  - You can add and remove tools as desired, but there's currently no way to
  explicitly remove tooltips once created yet, so if you remove a tool from a
  toolbar it will orphan the tooltip.
  
- Tooltip
  - As stated above, they work but there's no way to remove them cleanly once
  created.
  
  - Tooltips currently do not **RE**position themselves to prevent occlusion of the
  tooltip by the viewport.  This is desired, simply not written yet.
  
  - The tooltips currently also feel like those really lame tooltips you find
  on websites every so often.  I think this is mostly because even if you leave
  a mouseover target before the "show this element's tooltip" function starts,
  it won't cancel showing it.  ...it might also help to have the connectors
  working too.  Just saying...

##Ideology

- I want each module as small and simple as possible, without using other
libraries.

- Each module should be self-sufficient without relying on custom data assigned
to nodes or window globals.  Sometimes it has to be done, but the idea is to
make the intrusion as small as possible.

- Each module should separate the logic and presentation as much as possible.
This means utilizing stylesheeting instead of inline styling when able.

- Each module should return a closured expression which provides the module's
functionality.  This makes it possible to always maintain the component count
and other goodies.

- Each module should have a create function which is the primary method of the
module.  This should return either an object or a properly closed expression
which itself contains all the necessary data and becomes the primary method
for controlling the component.  (tooltips are currently a failure on this point)

##Dependancies

- jQuery: This is not really in line with the ideology, so future expansion to
remove all jQuery usage may be in the cards.  For now I'm going to give in and
make use of it for expediency.  I don't make particularly heavy use of it, but
the places where I do, it would be jackassy headaches to write my own versions
of what I use it for.  I don't like relying on jQuery but it's just as likely
I'll cave and not remove it.  1:1 odds on each.

- Font-Awesome: So far this dependancy only applies if you want to use icons in
the toolbar component.  It shouldn't be too difficult to rip it out and set up
some iconography via images or something though.

- Require: You could call this a pseudo-dependancy I suppose, but it's easy
enough to take the modules and assign them to variables explicitly and forego
the AMD design.  Everything can be situational, so if you don't want it then
don't use it.

##License

This code is currently under the 2-clause ("simplified") BSD license.  The full
license can be viewed at ./LICENSE.  If this library ever approaches awesome, I
might consider modifying the license.  If I do, it will probably end up
something like "free for non-commercial."