<script>
	import { RopeNode } from '../lib/rope.js';
	let rope = new RopeNode('');
	let editor;
	function handleKeyDown(event) {
		const cursorPosition = parseInt(editor.selectionStart);
		switch (event.key) {
			case 'ArrowLeft':
				editor.selectionStart = editor.selectionEnd = Math.max(0, editor.selectionStart - 1);
				return;
			case 'ArrowRight':
				editor.selectionStart = editor.selectionEnd = Math.min(
					editor.selectionStart + 1,
					editor.value.length
				);
				break;
			case 'Backspace':
				if (cursorPosition > 0) {
					rope.remove(cursorPosition - 1, cursorPosition);
					editor.selectionStart = editor.selectionEnd = Math.max(0, editor.selectionStart - 1);
				}
				break;
			case 'CapsLock':
				break;
			default:
				rope.insert(cursorPosition, event.key);
		}
		editor.value = rope.getLeaves();
	}
</script>

<body class="bg-slate-800 w-full h-screen">
	<h1 class="flex w-full justify-center text-2xl text-white font-mono p-4">
		Rope based editor in JS
	</h1>
	<div class="flex flex-col">
		<div class="flex flex-col h-80 p-4 mx-5">
			<textarea
				id="editor"
				on:keydown|preventDefault={handleKeyDown}
				bind:this={editor}
				class="flex text-white grow p-4 rounded-lg border border-gray-800 font-mono bg-gray-900 focus:outline-gray-600"
			></textarea>
		</div>
	</div>
</body>
