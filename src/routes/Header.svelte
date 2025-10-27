<script lang="ts">
	import { page } from '$app/state';
	import { Github, Sun, Moon } from 'lucide-svelte';
	import { onMount } from 'svelte';

	let theme = $state<'light' | 'dark'>('light');

	onMount(() => {
		// Check for saved theme preference or default to light
		const savedTheme = localStorage.getItem('theme') || 'light';
		theme = savedTheme as 'light' | 'dark';
		document.documentElement.setAttribute('data-theme', theme);
	});

	function toggleTheme() {
		theme = theme === 'light' ? 'dark' : 'light';
		localStorage.setItem('theme', theme);
		document.documentElement.setAttribute('data-theme', theme);
	}
</script>

<header>
	<div class="logo">
		<a href="/" class="logo-link">
			<h1>AnkiMCP</h1>
		</a>
	</div>

	<nav>
		<ul>
			<li class:active={page.url.pathname === '/'}>
				<a href="/">Home</a>
			</li>
			<li class:active={page.url.pathname.startsWith('/docs')}>
				<a href="/docs">Documentation</a>
			</li>
		</ul>
	</nav>

	<div class="header-actions">
		<button onclick={toggleTheme} class="theme-toggle" aria-label="Toggle theme">
			{#if theme === 'light'}
				<Moon class="h-5 w-5" />
			{:else}
				<Sun class="h-5 w-5" />
			{/if}
		</button>
		<a href="https://github.com/matt-fff/ankimcp" class="github-btn">
			<Github class="h-5 w-5" />
			<span>GitHub</span>
		</a>
	</div>
</header>

<style>
	header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 1rem 2rem;
		background: color-mix(in srgb, var(--color-bg-2) 92%, transparent);
		border-bottom: 1px solid color-mix(in srgb, var(--color-text) 12%, transparent);
		position: sticky;
		top: 0;
		z-index: 50;
		transition: all 0.2s;
		backdrop-filter: blur(6px);
	}

	:global([data-theme='dark']) header {
		background: color-mix(in srgb, var(--color-bg-2) 86%, #000 14%);
		border-bottom-color: color-mix(in srgb, var(--color-text) 18%, transparent);
	}

	.logo h1 {
		margin: 0;
		font-size: 1.5rem;
		font-weight: bold;
		color: var(--color-theme-1);
	}

	.logo-link {
		text-decoration: none;
	}

	.logo-link:hover h1 {
		color: color-mix(in srgb, var(--color-theme-1) 80%, var(--color-theme-2));
	}

	nav ul {
		display: flex;
		list-style: none;
		margin: 0;
		padding: 0;
		gap: 2rem;
	}

	nav a {
		text-decoration: none;
		color: color-mix(in srgb, var(--color-text) 65%, transparent);
		font-weight: 500;
		padding: 0.5rem 1rem;
		border-radius: 0.375rem;
		transition: all 0.2s;
	}

	nav a:hover {
		color: var(--color-theme-1);
		background: color-mix(in srgb, var(--color-theme-2) 16%, transparent);
	}

	nav .active a {
		color: var(--color-theme-1);
		background: color-mix(in srgb, var(--color-theme-1) 18%, transparent);
	}

	.header-actions {
		display: flex;
		align-items: center;
		gap: 0.75rem;
	}

	.theme-toggle {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 2.25rem;
		height: 2.25rem;
		background: color-mix(in srgb, var(--color-bg-2) 92%, transparent);
		border: 1px solid color-mix(in srgb, var(--color-text) 12%, transparent);
		border-radius: 0.375rem;
		color: color-mix(in srgb, var(--color-text) 70%, transparent);
		cursor: pointer;
		transition: all 0.2s;
	}

	.theme-toggle:hover {
		background: color-mix(in srgb, var(--color-theme-2) 20%, transparent);
		color: var(--color-theme-1);
		border-color: color-mix(in srgb, var(--color-theme-2) 28%, transparent);
	}

	:global([data-theme='dark']) .theme-toggle {
		background: color-mix(in srgb, var(--color-bg-2) 86%, #000 14%);
		border-color: color-mix(in srgb, var(--color-text) 18%, transparent);
		color: color-mix(in srgb, var(--color-text) 75%, transparent);
	}

	:global([data-theme='dark']) .theme-toggle:hover {
		background: color-mix(in srgb, var(--color-theme-2) 24%, transparent);
		color: var(--color-theme-2);
		border-color: color-mix(in srgb, var(--color-theme-2) 32%, transparent);
	}

	.github-btn {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		padding: 0.5rem 1rem;
		background: var(--color-theme-1);
		color: white;
		text-decoration: none;
		border-radius: 0.375rem;
		font-weight: 500;
		font-size: 0.875rem;
		transition:
			background 0.2s,
			transform 0.2s;
		box-shadow: 0 10px 25px color-mix(in srgb, var(--color-theme-1) 25%, transparent);
	}

	.github-btn:hover {
		background: color-mix(in srgb, var(--color-theme-1) 80%, var(--color-theme-2));
		transform: translateY(-1px);
	}

	@media (max-width: 768px) {
		header {
			padding: 1rem;
		}

		nav ul {
			gap: 1rem;
		}

		nav a {
			padding: 0.25rem 0.5rem;
			font-size: 0.875rem;
		}

		.header-actions {
			gap: 0.5rem;
		}

		.github-btn span {
			display: none;
		}
	}
</style>
