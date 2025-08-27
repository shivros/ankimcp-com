<script lang="ts">
	import { page } from '$app/state';
</script>

<header class="bg-white shadow">
	<div class="container mx-auto flex items-center justify-between p-4">
		<a href="/" class="text-xl font-bold text-orange-600">AnkiMCP</a>
		<nav>
			<ul class="flex space-x-4 text-sm">
				<li>
					<a
						href="/"
						class={page.url.pathname === '/'
							? 'text-orange-600'
							: 'text-gray-600 hover:text-orange-600'}
					>
						Home
					</a>
				</li>
				<li>
					<a
						href="/docs"
						class={page.url.pathname.startsWith('/docs')
							? 'text-orange-600'
							: 'text-gray-600 hover:text-orange-600'}
					>
						Docs
					</a>
				</li>
				<li>
					<a
						href="/about"
						class={page.url.pathname === '/about'
							? 'text-orange-600'
							: 'text-gray-600 hover:text-orange-600'}
					>
						About
					</a>
				</li>
				<li>
					<a
						href="/sverdle"
						class={page.url.pathname.startsWith('/sverdle')
							? 'text-orange-600'
							: 'text-gray-600 hover:text-orange-600'}
					>
						Sverdle
					</a>
				</li>
			</ul>
		</nav>
	</div>
</header>
