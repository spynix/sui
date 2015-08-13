require.config({
  paths: {
    jquery: "jquery-2.1.4.min"
  }
});


require(["jquery", "tabs"], function($, tabs) {
	var tabber1, tabber2;
	
	tabber1 = tabs.create($("#container1 > #controller"), $("#container1 > #viewport"), [
	  {
		  title: "Tab #1",
		  content: "This is the first tab created."
	  },
	  {
		  title: "Tab #2",
		  content: "This is the second tab created."
	  },
	  {
		  title: "Another Tab",
		  content: "Yet another tab for your viewing pleasure."
	  },
	  {
		  title: "A Really Large Tab",
		  content: "B-e-a-utiful?"
	  }
	], {});
	
	tabber2 = tabs.create($("#container2 > #controller"), $("#container2 > #viewport"), [
	  {
		  title: "Bacon",
		  content: "It's what's for breakfast."
	  },
	  {
		  title: "Breakfast",
		  content: "It had better include bacon."
	  },
	  {
		  title: "Dinosaurs",
		  content: "I bet a few of them made some delicious bacon."
	  },
	  {
		  title: "Honey Badgers",
		  content: "They're your friends for life.  When's the last time you hugged a honey badger?"
	  }
	], {});
	
	tabber1.remove_tab(1);
	tabber1.add_tab("A New Tab", "This was a tab added after tabber creation through use of the control expression returned to the tabber1 variable.");
});