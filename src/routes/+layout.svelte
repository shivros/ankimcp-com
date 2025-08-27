<script lang="ts">
	import Header from './Header.svelte';
	import '../app.css';

	let { children } = $props();
</script>

<div class="flex min-h-screen flex-col">
	<Header />
	<main class="container mx-auto flex-1 p-8">
		{@render children()}
	</main>
	<footer class="bg-gray-100 py-6 text-center text-sm text-gray-600">
		<p>
			<span>visit </span>
			<a href="https://svelte.dev/docs/kit" class="font-semibold text-orange-600 hover:underline"
				>svelte.dev/docs/kit</a
			>
			<span> to learn about SvelteKit</span>
		</p>
	</footer>
</div>
