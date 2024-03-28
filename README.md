**JS editor**

This is a web based editor (that runs in the browser) built in Svelte and plain JS. It uses the Rope data structue to handle the editor data. You can find more about the rope data structure here: https://en.wikipedia.org/wiki/Rope_(data_structure)#:~:text=6%20External%20links-,Description,leaves%20in%20its%20left%20subtree.

This data structure allows efficient insertions and removals compared to a plain string.

The client facing editor is built upon the textarea tag in HTML. I have mostly stripped off the functionality of the textarea with preventdefault and created my own handlers to incorporate the rope based data structure
