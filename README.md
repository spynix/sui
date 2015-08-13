#SUI - Spynix's UI

This UI code is not particularly robust, nor is it full of the expansive
features found in popular packages.  The purpose of it is to fill a smaller
niche, while including many popular UI functions.

##Ideology

- Each module should be completely self-sufficient, able to handle its own needs.
No pollution of the DOM, no window globals.  Sometimes it has to be done, but
the idea is to make the intrusion as small as possible.

- Each module should separate the logic and presentation as much as possible.

- Each module should return a properly closed group of utility functions which
provide the module's functionality.
  - Each module should have a create function which is the primary method of the
  module.  This should return either an object or a properly closed expression
  which itself contains all data necessary for fully utilizing the capabilities
  of the tool.

##Dependancies

Right now the only dependancy is jQuery.  This is not really in line with the
ideology, so future expansion to remove all jQuery usage is in the cards.  For
now I'm going to give in and make use of it for expediency.

You could call Require a pseudo-dependancy I suppose, but you can rip out the
modules and assign to variables explicitly and forego the entire AMD stuff.
Everything can be situational, so if you don't want to replicate it then don't.

##License

This code is released under the 2-clause ("simplified") BSD license.  The full
license can be viewed at ./LICENSE.

## Other

I had written other UI code in the past that utilized globals under a namespace.
This is the rewrite of that to conform to this library's ideology, however in
the future I may clean up and provide the old form as well.  Having global
access to your framework can reduce hassle, and I can envision cases where you'd
just want to make it do what you want it to do without a lot of drama.