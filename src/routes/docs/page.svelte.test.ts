import { page } from '@vitest/browser/context';
import { render } from 'vitest-browser-svelte';
import { describe, expect, it } from 'vitest';
import Page from './+page.svelte';

describe('/docs/+page.svelte', () => {
	it('renders documentation heading', async () => {
		render(Page);
		const heading = page.getByRole('heading', { level: 1, name: /documentation/i });
		await expect.element(heading).toBeInTheDocument();
	});
});
