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

	<footer>
		<div class="footer-content">
			<div class="footer-section">
				<h3>AnkiMCP</h3>
				<p>AI-powered Anki integration via MCP</p>
			</div>
			<div class="footer-section">
				<h4>Links</h4>
				<ul>
					<li><a href="/">Home</a></li>
					<li><a href="/docs">Documentation</a></li>
					<li><a href="https://github.com/matt-fff/ankimcp">GitHub</a></li>
				</ul>
			</div>
			<div class="footer-section">
				<h4>Related</h4>
				<ul>
					<li><a href="https://apps.ankiweb.net/">Anki</a></li>
					<li><a href="https://claude.ai/">Claude</a></li>
					<li><a href="https://github.com/modelcontextprotocol">MCP</a></li>
				</ul>
			</div>
		</div>
		<div class="footer-bottom">
			<p>&copy; 2024 AnkiMCP. Open source project.</p>
		</div>
	</footer>
</div>

<style>
	main {
		flex: 1;
		padding: 0;
	}

	footer {
		background: var(--color-bg-1);
		border-top: 1px solid #e5e7eb;
		padding: 2rem 0 1rem;
	}

	:global([data-theme='dark']) footer {
		border-top-color: #374151;
	}

	.footer-content {
		max-width: 1200px;
		margin: 0 auto;
		padding: 0 2rem;
		display: grid;
		grid-template-columns: 2fr 1fr 1fr;
		gap: 2rem;
	}

	.footer-section h3 {
		color: #3b82f6;
		font-size: 1.25rem;
		font-weight: bold;
		margin: 0 0 0.5rem 0;
	}

	.footer-section h4 {
		color: #374151;
		font-size: 1rem;
		font-weight: 600;
		margin: 0 0 0.75rem 0;
	}

	.footer-section p {
		color: #6b7280;
		margin: 0;
	}

	.footer-section ul {
		list-style: none;
		padding: 0;
		margin: 0;
	}

	.footer-section li {
		margin-bottom: 0.5rem;
	}

	.footer-section a {
		color: #6b7280;
		text-decoration: none;
		transition: color 0.2s;
	}

	.footer-section a:hover {
		color: #3b82f6;
	}

	.footer-bottom {
		max-width: 1200px;
		margin: 2rem auto 0;
		padding: 1rem 2rem 0;
		border-top: 1px solid #e5e7eb;
		text-align: center;
	}

	.footer-bottom p {
		color: #6b7280;
		font-size: 0.875rem;
		margin: 0;
	}

	@media (max-width: 768px) {
		.footer-content {
			grid-template-columns: 1fr;
			gap: 1.5rem;
			padding: 0 1rem;
		}

		.footer-bottom {
			padding: 1rem 1rem 0;
		}
	}
</style>
