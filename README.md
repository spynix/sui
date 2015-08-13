#SUI - Spynix's UI

This UI code is not particularly robust, nor is it full of the expansive
features found in popular packages.  The purpose of it is to fill a smaller
niche, while including many popular UI functions.

I wanted to call the library something like Simple UI or Standalone UI or the
like.  Problem is, those names are either so common they're definitely already
taken, they're too long for me to bother typing repeatedly, or they're just
plain stupid sounding.  So I simply settled on Spynix's UI for now.

##Ideology

- Each module should be self-sufficient.  No pollution of the DOM, no window
globals.  Sometimes it has to be done, but the idea is to make the intrusion as
small as possible.

- Each module should separate the logic and presentation as much as possible.

- Each module should return a properly closed group of utility functions which
provide the module's functionality.
  - Each module should have a create function which is the primary method of the
  module.  This should return either an object or a properly closed expression
  which itself contains all data necessary for fully utilizing the capabilities
  of the tool.

##Dependancies

- jQuery: This is not really in line with the ideology, so future expansion to
remove all jQuery usage is in the cards.  For now I'm going to give in and make
use of it for expediency.  I don't make particularly heavy use of it either.

- Font-Awesome: So far this dependancy only applies if you want to use icons in
the toolbar component.  It shouldn't be too difficult to rip it out and set up
some iconography via images or something though.

- Require: You could call this a pseudo-dependancy I suppose, but it's easy
enough to take the modules and assign them to variables explicitly and forego
the AMD design.  Everything can be situational, so if you don't want it then
don't use it.

##License

This code is released under the 2-clause ("simplified") BSD license.  The full
license can be viewed at ./LICENSE.

## Other

I had written other UI code in the past that utilized globals under a namespace.
This is the rewrite of that to conform to this library's ideology, however in
the future I may clean up and provide the old form as well.  Having global
access to your framework can reduce hassle, and I can envision cases where you'd
just want to make it do what you want it to do without a lot of drama.