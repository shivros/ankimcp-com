<script lang="ts">
	import { onDestroy } from 'svelte';

	let {
		label = '',
		language = '',
		allowCopy = true
	} = $props<{ label?: string; language?: string; allowCopy?: boolean }>();

	let copied = false;
	let codeEl: HTMLElement | undefined;
	let copyTimer: ReturnType<typeof setTimeout> | undefined;

	async function handleCopy() {
		if (!codeEl) return;

		const text = codeEl.innerText.trimEnd();
		try {
			await navigator.clipboard.writeText(text);
			copied = true;
			clearTimeout(copyTimer);
			copyTimer = setTimeout(() => {
				copied = false;
			}, 2000);
		} catch (error) {
			console.error('Failed to copy code', error);
		}
	}

	onDestroy(() => {
		clearTimeout(copyTimer);
	});
</script>

<div class="code-block" data-language={language ? language.toLowerCase() : null}>
	{#if label || language || allowCopy}
		<div class="code-block__meta">
			<div class="code-block__info">
				{#if label}
					<span class="code-block__label">{label}</span>
				{/if}
				{#if language}
					<span class="code-block__language">{language}</span>
				{/if}
			</div>
			{#if allowCopy}
				<button
					type="button"
					class:copied
					class="code-block__copy"
					on:click|preventDefault|stopPropagation={handleCopy}
					aria-live="polite"
				>
					{#if copied}
						Copied!
					{:else}
						Copy
					{/if}
				</button>
			{/if}
		</div>
	{/if}
	<div class="code-block__scroll">
		<pre>
                        <code bind:this={codeEl}><slot /></code>
                </pre>
	</div>
</div>

<style>
	.code-block {
		--code-surface: color-mix(in srgb, var(--color-bg-2) 92%, transparent);
		--code-border: color-mix(in srgb, var(--color-text) 14%, transparent);
		--code-header: color-mix(in srgb, var(--color-bg-1) 94%, transparent);
		--code-text: var(--color-text);
		--code-accent: color-mix(in srgb, var(--color-theme-1) 70%, transparent);
		border: 1px solid var(--code-border);
		border-radius: 0.9rem;
		background: var(--code-surface);
		overflow: hidden;
		display: flex;
		flex-direction: column;
	}

	:global([data-theme='dark']) .code-block {
		--code-surface: color-mix(in srgb, var(--color-bg-1) 82%, #000 18%);
		--code-border: color-mix(in srgb, var(--color-text) 26%, transparent);
		--code-header: color-mix(in srgb, var(--color-bg-1) 78%, #000 22%);
		--code-accent: color-mix(in srgb, var(--color-theme-2) 65%, var(--color-theme-1));
	}

	.code-block__meta {
		display: flex;
		justify-content: space-between;
		align-items: center;
		gap: 1rem;
		padding: 0.75rem 1rem;
		background: var(--code-header);
		border-bottom: 1px solid color-mix(in srgb, var(--code-border) 80%, transparent);
		font-size: 0.85rem;
	}

	.code-block__info {
		display: flex;
		align-items: center;
		gap: 0.75rem;
		flex-wrap: wrap;
	}

	.code-block__label {
		font-weight: 600;
		color: color-mix(in srgb, var(--code-text) 82%, transparent);
		letter-spacing: 0.02em;
	}

	.code-block__language {
		font-family: var(--font-mono);
		font-size: 0.75rem;
		letter-spacing: 0.08em;
		text-transform: uppercase;
		background: color-mix(in srgb, var(--code-accent) 16%, transparent);
		border: 1px solid color-mix(in srgb, var(--code-accent) 45%, transparent);
		color: color-mix(in srgb, var(--code-accent) 70%, var(--code-text));
		border-radius: 999px;
		padding: 0.15rem 0.5rem;
	}

	.code-block__copy {
		border: 1px solid color-mix(in srgb, var(--code-text) 20%, transparent);
		border-radius: 999px;
		background: transparent;
		color: color-mix(in srgb, var(--code-text) 78%, transparent);
		font-size: 0.75rem;
		font-weight: 600;
		padding: 0.25rem 0.75rem;
		cursor: pointer;
		transition:
			background 0.2s ease,
			border-color 0.2s ease,
			color 0.2s ease;
	}

	.code-block__copy:hover,
	.code-block__copy:focus-visible {
		background: color-mix(in srgb, var(--code-accent) 20%, transparent);
		border-color: color-mix(in srgb, var(--code-accent) 45%, transparent);
		color: color-mix(in srgb, var(--code-text) 90%, transparent);
		outline: none;
	}

	.code-block__copy.copied {
		background: color-mix(in srgb, var(--code-accent) 16%, transparent);
		border-color: color-mix(in srgb, var(--code-accent) 60%, transparent);
		color: color-mix(in srgb, var(--code-text) 94%, transparent);
	}

	.code-block__scroll {
		overflow-x: auto;
	}

	pre {
		margin: 0;
		padding: 1rem 1.25rem;
		font-family: var(--font-mono);
		font-size: 0.9rem;
		line-height: 1.6;
		color: color-mix(in srgb, var(--code-text) 92%, transparent);
	}

	code {
		display: block;
		white-space: pre;
	}
</style>
