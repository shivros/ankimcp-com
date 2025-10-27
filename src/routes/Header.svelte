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
		background: var(--color-bg-2);
		border-bottom: 1px solid #e5e7eb;
		position: sticky;
		top: 0;
		z-index: 50;
		transition: all 0.2s;
	}

	:global([data-theme='dark']) header {
		border-bottom-color: #374151;
	}

	.logo h1 {
		margin: 0;
		font-size: 1.5rem;
		font-weight: bold;
		color: #3b82f6;
	}

	.logo-link {
		text-decoration: none;
	}

	.logo-link:hover h1 {
		color: #2563eb;
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
		color: #6b7280;
		font-weight: 500;
		padding: 0.5rem 1rem;
		border-radius: 0.375rem;
		transition: all 0.2s;
	}

	nav a:hover {
		color: #3b82f6;
		background: #f3f4f6;
	}

	nav .active a {
		color: #3b82f6;
		background: #eff6ff;
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
		background: transparent;
		border: 1px solid #e5e7eb;
		border-radius: 0.375rem;
		color: #6b7280;
		cursor: pointer;
		transition: all 0.2s;
	}

	.theme-toggle:hover {
		background: #f3f4f6;
		color: #374151;
		border-color: #d1d5db;
	}

	:global([data-theme='dark']) .theme-toggle {
		border-color: #4b5563;
		color: #d1d5db;
	}

	:global([data-theme='dark']) .theme-toggle:hover {
		background: #374151;
		color: #f9fafb;
		border-color: #6b7280;
	}

	.github-btn {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		padding: 0.5rem 1rem;
		background: #1f2937;
		color: white;
		text-decoration: none;
		border-radius: 0.375rem;
		font-weight: 500;
		font-size: 0.875rem;
		transition: background 0.2s;
	}

	.github-btn:hover {
		background: #374151;
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
