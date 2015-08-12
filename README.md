#SUI - Spynix's UI

This UI code is not particularly robust, nor is it full of the expansive
features found in popular packages.  The purpose of it is to fill a smaller
niche, while including the most popular UI functionality.

##Ideology

Each module should be completely self-sufficient, able to handle its needs.  No
pollution of the DOM, no window globals.  Sometimes it has to be done, but the
idea is to make the intrusion as small as possible.

Each module should separate the logic and presentation as much as possible.

##License

This code is released under the 2-clause ("simplified") BSD license.  The
license is located at ./LICENSE.

## Other

I had written other UI code in the past that utilized globals under a namespace.
This is the rewrite of that to conform to this library's ideology, however in
the future I may clean up and provide the old form as well.  Having global
access to your framework can reduce hassle, and I can envision cases where you'd
just want to make it do what you want it to do without a lot of drama.