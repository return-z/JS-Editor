<script>
	import { RopeNode } from '../lib/rope.js';
	let rope = new RopeNode('');
	function handleKeyDown(event) {
		const cursorPosition = parseInt(event.selectionStart);
		rope.insert(cursorPosition, event.key);
	}
	function walkRope(event) {
		rope.walk();
	}
</script>

<h1 class="flex w-full justify-center text-2xl text-gray-800 p-4">Welcome to my code editor</h1>
<div class="flex flex-col">
	<div class="flex flex-col h-80 p-4">
		<textarea on:keydown={handleKeyDown} class="flex grow p-4 border border-gray-800"></textarea>
	</div>
	<button on:click={walkRope} class="p-4 bg-transparent border border-black">Walk the rope</button>
</div>
