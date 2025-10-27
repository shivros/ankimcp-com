<script lang="ts">
	import { Settings, Database, Shield, Zap, ArrowLeft } from 'lucide-svelte';
</script>

<svelte:head>
	<title>Documentation - AnkiMCP</title>
	<meta
		name="description"
		content="Complete documentation for AnkiMCP - capabilities, configuration, and API reference"
	/>
</svelte:head>

<div class="docs-container">
	<nav class="docs-nav">
		<a href="/" class="back-link">
			<ArrowLeft class="h-4 w-4" />
			Back to Home
		</a>
		<h1 class="mb-6 text-2xl font-bold">Documentation</h1>
		<ul class="nav-list">
			<li><a href="#overview">Overview</a></li>
			<li><a href="#installation">Installation</a></li>
			<li><a href="#configuration">Configuration</a></li>
			<li><a href="#capabilities">Capabilities</a></li>
			<li><a href="#api-reference">API Reference</a></li>
			<li><a href="#security">Security</a></li>
			<li><a href="#troubleshooting">Troubleshooting</a></li>
		</ul>
	</nav>

	<main class="docs-content">
		<section id="overview" class="section">
			<h2 class="mb-4 text-3xl font-bold">Overview</h2>
			<p class="mb-4">
				AnkiMCP is an Anki addon that bridges your flashcard collection with AI assistants through
				the Model Context Protocol (MCP). Unlike traditional REST APIs, MCP provides a standardized
				way for AI tools to access and interact with your data safely and efficiently.
			</p>

			<div class="feature-comparison mb-6">
				<h3 class="mb-4 text-xl font-semibold">AnkiMCP vs AnkiConnect</h3>
				<div class="grid gap-6 md:grid-cols-2">
					<div class="comparison-card">
						<h4 class="mb-2 font-semibold text-green-600">AnkiMCP Advantages</h4>
						<ul class="list-inside list-disc space-y-1 text-sm">
							<li>Built for AI assistant integration</li>
							<li>MCP protocol standardization</li>
							<li>Fine-grained permission system</li>
							<li>Automatic server lifecycle management</li>
							<li>Type-safe tool definitions</li>
						</ul>
					</div>
					<div class="comparison-card">
						<h4 class="mb-2 font-semibold text-blue-600">AnkiConnect Use Cases</h4>
						<ul class="list-inside list-disc space-y-1 text-sm">
							<li>Browser extensions (Yomichan, etc.)</li>
							<li>Direct HTTP API integration</li>
							<li>Legacy application support</li>
							<li>Custom automation scripts</li>
						</ul>
					</div>
				</div>
			</div>
		</section>

		<section id="installation" class="section">
			<h2 class="mb-4 text-3xl font-bold">Installation</h2>

			<div class="installation-methods">
				<div class="method-card">
					<h3 class="mb-3 text-xl font-semibold">Method 1: AnkiWeb (Recommended)</h3>
					<ol class="mb-4 list-inside list-decimal space-y-2">
						<li>Open Anki and go to <code>Tools → Add-ons → Get Add-ons...</code></li>
						<li>Enter the addon code: <code class="addon-code">XXXXXXXXX</code></li>
						<li>Click OK and restart Anki</li>
						<li>The MCP server will start automatically when you open a profile</li>
					</ol>
					<div class="note">
						<p>
							<strong>Note:</strong> The addon code will be available once AnkiMCP is published to AnkiWeb.
						</p>
					</div>
				</div>

				<div class="method-card">
					<h3 class="mb-3 text-xl font-semibold">Method 2: Manual Installation</h3>
					<ol class="list-inside list-decimal space-y-2">
						<li>
							Download the latest release from <a
								href="https://github.com/matt-fff/ankimcp/releases"
								class="link">GitHub</a
							>
						</li>
						<li>Extract the archive</li>
						<li>
							Copy the <code>src/ankimcp</code> folder to your Anki addons directory:
							<ul class="mt-2 ml-6 list-inside list-disc space-y-1">
								<li><strong>Windows:</strong> <code>%APPDATA%\\Anki2\\addons21\\</code></li>
								<li>
									<strong>macOS:</strong> <code>~/Library/Application Support/Anki2/addons21/</code>
								</li>
								<li><strong>Linux:</strong> <code>~/.local/share/Anki2/addons21/</code></li>
							</ul>
						</li>
						<li>Restart Anki</li>
					</ol>
				</div>
			</div>
		</section>

		<section id="configuration" class="section">
			<h2 class="mb-4 text-3xl font-bold">Configuration</h2>

			<div class="config-section">
				<h3 class="mb-3 text-xl font-semibold">
					<Settings class="mr-2 inline h-5 w-5" />
					Anki Addon Settings
				</h3>
				<p class="mb-4">Configure AnkiMCP through Anki's addon configuration:</p>
				<ol class="mb-4 list-inside list-decimal space-y-2">
					<li>Go to <code>Tools → Add-ons</code></li>
					<li>Select AnkiMCP and click <code>Config</code></li>
					<li>Modify settings as needed</li>
				</ol>

				<div class="config-example">
					<h4 class="mb-2 font-semibold">Configuration Options</h4>
					<pre class="config-code"><code
							>{`{
  "host": "localhost",
  "port": 8765,
  "global_permissions": {
    "read": true,
    "write": true,
    "delete": false
  },
  "deck_permissions": {
    "MyPrivateDeck": {
      "read": false,
      "write": false,
      "delete": false
    }
  },
  "protected_decks": ["ImportantDeck", "ExamPrep"]
}`}</code
						></pre>
				</div>
			</div>

			<div class="config-section">
				<h3 class="mb-3 text-xl font-semibold">MCP Host Configuration</h3>
				<p class="mb-4">Configure your MCP host to connect to AnkiMCP:</p>

				<div class="host-configs">
					<div class="host-config">
						<h4 class="mb-2 font-semibold">Claude Desktop</h4>
						<p class="mb-2 text-sm">
							Edit <code>~/.config/claude-desktop/claude_desktop_config.json</code>:
						</p>
						<pre class="config-code"><code
								>{`{
  "mcpServers": {
    "ankimcp": {
      "command": "python",
      "args": ["-m", "ankimcp"],
      "env": {
        "ANKIMCP_HOST": "localhost",
        "ANKIMCP_PORT": "8765"
      }
    }
  }
}`}</code
							></pre>
					</div>

					<div class="host-config">
						<h4 class="mb-2 font-semibold">Other MCP Hosts</h4>
						<p class="mb-2 text-sm">For custom MCP implementations, connect to:</p>
						<ul class="list-inside list-disc text-sm">
							<li><strong>Host:</strong> <code>localhost</code> (or configured host)</li>
							<li><strong>Port:</strong> <code>8765</code> (or configured port)</li>
							<li><strong>Protocol:</strong> MCP over stdio/HTTP</li>
						</ul>
					</div>
				</div>
			</div>
		</section>

		<section id="capabilities" class="section">
			<h2 class="mb-4 text-3xl font-bold">
				<Zap class="mr-2 inline h-7 w-7" />
				Capabilities
			</h2>
			<p class="mb-6">
				AnkiMCP provides comprehensive access to your Anki collection through these MCP tools:
			</p>

			<div class="capabilities-grid">
				<div class="capability-card">
					<Database class="mb-3 h-8 w-8 text-blue-600" />
					<h3 class="mb-2 text-lg font-semibold">Deck Management</h3>
					<ul class="capability-list">
						<li><code>list_decks</code> - Get all available decks</li>
						<li><code>create_deck</code> - Create new decks</li>
						<li><code>delete_deck</code> - Remove decks (with protection)</li>
						<li><code>get_deck_stats</code> - Retrieve deck statistics</li>
					</ul>
				</div>

				<div class="capability-card">
					<Database class="mb-3 h-8 w-8 text-green-600" />
					<h3 class="mb-2 text-lg font-semibold">Note Operations</h3>
					<ul class="capability-list">
						<li><code>search_notes</code> - Search using Anki syntax</li>
						<li><code>get_note_info</code> - Detailed note information</li>
						<li><code>create_note</code> - Add new notes/cards</li>
						<li><code>update_note</code> - Modify existing notes</li>
						<li><code>delete_notes</code> - Remove notes (with protection)</li>
					</ul>
				</div>

				<div class="capability-card">
					<Database class="mb-3 h-8 w-8 text-purple-600" />
					<h3 class="mb-2 text-lg font-semibold">Card Information</h3>
					<ul class="capability-list">
						<li><code>get_card_info</code> - Individual card details</li>
						<li><code>find_cards</code> - Search for specific cards</li>
						<li><code>get_card_reviews</code> - Review history</li>
						<li><code>suspend_cards</code> - Suspend/unsuspend cards</li>
					</ul>
				</div>

				<div class="capability-card">
					<Database class="mb-3 h-8 w-8 text-orange-600" />
					<h3 class="mb-2 text-lg font-semibold">Statistics & Analysis</h3>
					<ul class="capability-list">
						<li><code>get_collection_stats</code> - Overall collection metrics</li>
						<li><code>get_review_stats</code> - Learning progress data</li>
						<li><code>get_due_cards</code> - Cards scheduled for review</li>
						<li><code>get_learning_stats</code> - Performance analytics</li>
					</ul>
				</div>
			</div>
		</section>

		<section id="api-reference" class="section">
			<h2 class="mb-4 text-3xl font-bold">API Reference</h2>
			<p class="mb-6">Detailed reference for each MCP tool available in AnkiMCP:</p>

			<div class="api-reference">
				<div class="api-method">
					<h3 class="api-method-name">list_decks</h3>
					<p class="api-description">
						Returns all available decks with their IDs and configuration status.
					</p>
					<div class="api-example">
						<h4>Response Example:</h4>
						<pre class="api-code"><code
								>{`[
  {
    "id": 1234567890,
    "name": "Japanese::Vocabulary",
    "newCount": 45,
    "reviewCount": 12,
    "totalCount": 892
  }
]`}</code
							></pre>
					</div>
				</div>

				<div class="api-method">
					<h3 class="api-method-name">search_notes</h3>
					<p class="api-description">Search notes using Anki's powerful search syntax.</p>
					<div class="api-parameters">
						<h4>Parameters:</h4>
						<ul>
							<li>
								<code>query</code> (string) - Anki search query (e.g., "deck:Japanese tag:vocabulary")
							</li>
							<li><code>limit</code> (number, optional) - Maximum results to return</li>
						</ul>
					</div>
					<div class="api-example">
						<h4>Response Example:</h4>
						<pre class="api-code"><code
								>{`[
  {
    "noteId": 1234567890,
    "fields": {
      "Front": "こんにちは",
      "Back": "Hello"
    },
    "tags": ["vocabulary", "greetings"],
    "modelName": "Basic"
  }
]`}</code
							></pre>
					</div>
				</div>

				<div class="api-method">
					<h3 class="api-method-name">create_note</h3>
					<p class="api-description">Create a new note in the specified deck.</p>
					<div class="api-parameters">
						<h4>Parameters:</h4>
						<ul>
							<li><code>deckName</code> (string) - Target deck name</li>
							<li><code>modelName</code> (string) - Note type/model name</li>
							<li><code>fields</code> (object) - Field values as key-value pairs</li>
							<li><code>tags</code> (array, optional) - Tags to add to the note</li>
						</ul>
					</div>
				</div>
			</div>
		</section>

		<section id="security" class="section">
			<h2 class="mb-4 text-3xl font-bold">
				<Shield class="mr-2 inline h-7 w-7" />
				Security & Permissions
			</h2>
			<p class="mb-6">
				AnkiMCP includes comprehensive security features to protect your Anki collection:
			</p>

			<div class="security-features">
				<div class="security-feature">
					<h3 class="mb-2 text-lg font-semibold">Global Permissions</h3>
					<p class="mb-3">Set default permissions for all operations:</p>
					<ul class="list-inside list-disc space-y-1">
						<li><strong>Read:</strong> Allow viewing decks, notes, and statistics</li>
						<li><strong>Write:</strong> Allow creating and updating notes/decks</li>
						<li><strong>Delete:</strong> Allow removing notes and decks</li>
					</ul>
				</div>

				<div class="security-feature">
					<h3 class="mb-2 text-lg font-semibold">Deck-Specific Controls</h3>
					<p class="mb-3">Override permissions for individual decks:</p>
					<pre class="security-code"><code
							>{`"deck_permissions": {
  "PersonalDiary": {
    "read": false,    // Completely hidden
    "write": false,
    "delete": false
  },
  "WorkNotes": {
    "read": true,     // Read-only access
    "write": false,
    "delete": false
  }
}`}</code
						></pre>
				</div>

				<div class="security-feature">
					<h3 class="mb-2 text-lg font-semibold">Protected Decks</h3>
					<p class="mb-3">Add an extra layer of protection against accidental deletion:</p>
					<pre class="security-code"><code
							>"protected_decks": [
  "MedicalSchool",
  "PhD Research",
  "CertificationExam"
]</code
						></pre>
					<p class="text-sm text-gray-600">
						Protected decks cannot be deleted even if delete permissions are enabled.
					</p>
				</div>
			</div>
		</section>

		<section id="troubleshooting" class="section">
			<h2 class="mb-4 text-3xl font-bold">Troubleshooting</h2>

			<div class="troubleshooting-guide">
				<div class="issue">
					<h3 class="issue-title">MCP Server Not Starting</h3>
					<div class="issue-content">
						<p><strong>Symptoms:</strong> AI assistant can't connect to AnkiMCP</p>
						<p><strong>Solutions:</strong></p>
						<ul class="ml-4 list-inside list-disc space-y-1">
							<li>Ensure Anki is running with a profile loaded</li>
							<li>Check that the addon is enabled in Tools → Add-ons</li>
							<li>Verify port 8765 is not blocked by firewall</li>
							<li>Restart Anki and try again</li>
						</ul>
					</div>
				</div>

				<div class="issue">
					<h3 class="issue-title">Permission Denied Errors</h3>
					<div class="issue-content">
						<p>
							<strong>Symptoms:</strong> "Permission denied" when AI tries to create/modify content
						</p>
						<p><strong>Solutions:</strong></p>
						<ul class="ml-4 list-inside list-disc space-y-1">
							<li>Check addon configuration for global permissions</li>
							<li>Verify deck-specific permissions are not too restrictive</li>
							<li>Ensure the target deck isn't in the protected list</li>
						</ul>
					</div>
				</div>

				<div class="issue">
					<h3 class="issue-title">Connection Refused</h3>
					<div class="issue-content">
						<p><strong>Symptoms:</strong> MCP host can't connect to localhost:8765</p>
						<p><strong>Solutions:</strong></p>
						<ul class="ml-4 list-inside list-disc space-y-1">
							<li>Check if another application is using port 8765</li>
							<li>Try changing the port in addon configuration</li>
							<li>Verify localhost DNS resolution works</li>
							<li>Check system firewall settings</li>
						</ul>
					</div>
				</div>
			</div>

			<div class="help-section">
				<h3 class="mb-2 text-lg font-semibold">Getting Help</h3>
				<p class="mb-3">If you're still experiencing issues:</p>
				<ul class="list-inside list-disc space-y-1">
					<li>
						Check the <a href="https://github.com/matt-fff/ankimcp/issues" class="link"
							>GitHub issues</a
						> for similar problems
					</li>
					<li>Create a new issue with detailed error messages and your configuration</li>
					<li>Include your Anki version and operating system</li>
				</ul>
			</div>
		</section>
	</main>
</div>

<style>
        .docs-container {
                display: grid;
                grid-template-columns: minmax(220px, 280px) minmax(0, 1fr);
                gap: clamp(1.5rem, 4vw, 3rem);
                width: 100%;
                max-width: min(1200px, 100%);
                margin: 0 auto;
                padding: clamp(1.5rem, 4vw, 3rem);
                align-items: start;
                box-sizing: border-box;
        }

        .docs-nav {
                position: sticky;
                top: clamp(1rem, 2vw, 2.5rem);
                height: fit-content;
                background: var(--surface-raised);
                padding: 1.75rem;
                border-radius: 1rem;
                border: 1px solid var(--surface-border);
                box-shadow: var(--shadow-soft);
                backdrop-filter: blur(12px);
                -webkit-backdrop-filter: blur(12px);
        }

        .docs-nav h1 {
                margin-bottom: 1.5rem;
        }

        .back-link {
                display: inline-flex;
                align-items: center;
                gap: 0.5rem;
                color: var(--text-muted);
                text-decoration: none;
                margin-bottom: 1rem;
                font-size: 0.9rem;
                font-weight: 500;
                transition: color 0.2s ease, transform 0.2s ease;
        }

        .back-link:hover,
        .back-link:focus-visible {
                color: var(--color-theme-1);
                transform: translateX(-4px);
        }

        .nav-list {
                list-style: none;
                padding: 0;
                margin: 0;
                display: flex;
                flex-direction: column;
                gap: 0.35rem;
        }

        .nav-list a {
                color: var(--text-muted);
                text-decoration: none;
                padding: 0.35rem 0.6rem;
                border-radius: 0.5rem;
                transition: color 0.2s ease, background-color 0.2s ease;
                font-weight: 500;
        }

        .nav-list a:hover,
        .nav-list a:focus-visible {
                color: var(--color-theme-1);
                background: var(--surface-muted);
        }

        .docs-content {
                min-width: 0;
                display: flex;
                flex-direction: column;
                gap: 3rem;
        }

        .section {
                display: flex;
                flex-direction: column;
                gap: 1.25rem;
                padding-bottom: 2.5rem;
                border-bottom: 1px solid var(--surface-border);
                scroll-margin-top: 8rem;
        }

        .section:last-child {
                border-bottom: none;
                padding-bottom: 0;
        }

        .section h2 {
                font-size: clamp(1.75rem, 2vw, 2.25rem);
                font-weight: 700;
        }

        .section h3 {
                font-size: clamp(1.1rem, 1.5vw, 1.35rem);
                font-weight: 600;
        }

        .section h4 {
                font-size: 1rem;
                font-weight: 600;
                color: var(--text-muted);
        }

        .feature-comparison {
                background: var(--surface-raised);
                padding: 1.75rem;
                border-radius: 1rem;
                border: 1px solid var(--surface-border);
                box-shadow: var(--shadow-soft);
        }

        .comparison-card {
                background: var(--surface-muted);
                padding: 1.5rem;
                border-radius: 0.85rem;
                border: 1px solid var(--surface-border);
                box-shadow: var(--shadow-soft);
                transition: transform 0.2s ease, box-shadow 0.2s ease;
        }

        .comparison-card:hover {
                transform: translateY(-4px);
                box-shadow: var(--shadow-medium);
        }

        .installation-methods {
                display: grid;
                gap: 1.5rem;
        }

        .method-card {
                background: var(--surface-raised);
                border: 1px solid var(--surface-border);
                border-radius: 1rem;
                padding: 1.5rem;
                box-shadow: var(--shadow-soft);
        }

        .addon-code {
                background: var(--color-theme-2);
                color: var(--tag-text-on-accent);
                padding: 0.25rem 0.6rem;
                border-radius: 0.4rem;
                font-weight: 600;
                letter-spacing: 0.02em;
        }

        .note {
                background: var(--accent-warm-bg);
                border: 1px solid var(--accent-warm-border);
                padding: 1rem;
                border-radius: 0.75rem;
        }

        .config-section {
                display: flex;
                flex-direction: column;
                gap: 1rem;
        }

        .config-example,
        .config-code {
                background: var(--code-block-bg);
                color: var(--code-block-text);
                border: 1px solid var(--code-border);
                border-radius: 0.85rem;
                padding: 1.25rem;
                box-shadow: var(--shadow-soft);
                overflow-x: auto;
                font-family: var(--font-mono);
                font-size: 0.95rem;
        }

        .config-code code {
                background: transparent;
                color: inherit;
                padding: 0;
                border: 0;
        }

        .host-configs {
                display: grid;
                gap: 1.25rem;
        }

        .host-config {
                background: var(--surface-raised);
                border: 1px solid var(--surface-border);
                border-radius: 1rem;
                padding: 1.5rem;
                box-shadow: var(--shadow-soft);
        }

        .capabilities-grid {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
                gap: 1.5rem;
        }

        .capability-card {
                background: var(--surface-raised);
                border: 1px solid var(--surface-border);
                border-radius: 1rem;
                padding: 1.5rem;
                box-shadow: var(--shadow-soft);
                transition: transform 0.2s ease, box-shadow 0.2s ease;
        }

        .capability-card:hover {
                transform: translateY(-4px);
                box-shadow: var(--shadow-medium);
        }

        .capability-list {
                list-style: none;
                margin: 0;
                padding: 0;
        }

        .capability-list li {
                padding: 0.6rem 0;
                border-bottom: 1px solid var(--surface-border);
                font-size: 0.95rem;
        }

        .capability-list li:last-child {
                border-bottom: none;
        }

        .capability-list code {
                font-size: 0.85rem;
                font-weight: 600;
        }

        .api-reference {
                display: grid;
                gap: 1.5rem;
        }

        .api-method {
                background: var(--surface-raised);
                border: 1px solid var(--surface-border);
                border-radius: 1rem;
                padding: 1.5rem;
                box-shadow: var(--shadow-soft);
                display: flex;
                flex-direction: column;
                gap: 1rem;
        }

        .api-method-name {
                font-size: 1.15rem;
                font-weight: 600;
        }

        .api-description {
                color: var(--text-muted);
                margin-bottom: 1rem;
        }

        .api-parameters h4,
        .api-example h4 {
                font-weight: 600;
                margin-bottom: 0.5rem;
                font-size: 0.95rem;
                color: var(--text-muted);
        }

        .api-parameters ul {
                list-style: none;
                padding: 0;
                margin: 0 0 1rem;
        }

        .api-parameters li {
                padding: 0.35rem 0;
                font-size: 0.95rem;
        }

        .api-code {
                background: var(--code-block-bg);
                color: var(--code-block-text);
                border: 1px solid var(--code-border);
                border-radius: 0.85rem;
                padding: 1.25rem;
                font-family: var(--font-mono);
                font-size: 0.9rem;
                box-shadow: var(--shadow-soft);
        }

        .security-features,
        .troubleshooting-guide {
                display: grid;
                gap: 1.5rem;
        }

        .security-feature {
                background: var(--surface-raised);
                border: 1px solid var(--surface-border);
                border-radius: 1rem;
                padding: 1.5rem 1.5rem 1.5rem 1.75rem;
                box-shadow: var(--shadow-soft);
                border-left: 4px solid var(--color-theme-2);
        }

        .security-code {
                background: var(--code-block-bg);
                color: var(--code-block-text);
                border: 1px solid var(--code-border);
                border-radius: 0.85rem;
                padding: 1.1rem;
                font-family: var(--font-mono);
                font-size: 0.9rem;
                box-shadow: var(--shadow-soft);
        }

        .issue {
                background: var(--accent-danger-bg);
                border: 1px solid var(--accent-danger-border);
                border-radius: 1rem;
                overflow: hidden;
                box-shadow: var(--shadow-soft);
        }

        .issue-title {
                padding: 1rem 1.5rem 0.75rem;
                margin: 0;
                font-size: 1.1rem;
                font-weight: 600;
                color: var(--accent-danger-text);
                border-bottom: 1px solid var(--accent-danger-border);
        }

        .issue-content {
                padding: 1.25rem 1.5rem 1.5rem;
        }

        .help-section {
                background: var(--accent-info-bg);
                border: 1px solid var(--accent-info-border);
                border-radius: 1rem;
                padding: 1.5rem;
                box-shadow: var(--shadow-soft);
        }

        .link {
                color: var(--color-theme-2);
        }

        .link:hover,
        .link:focus-visible {
                color: var(--color-theme-1);
        }

        .config-example code,
        .api-code code,
        .security-code code {
                background: transparent;
                color: inherit;
                padding: 0;
                border: 0;
        }

        @media (max-width: 1024px) {
                .docs-container {
                        grid-template-columns: 1fr;
                        padding: clamp(1.25rem, 5vw, 2rem);
                }

                .docs-nav {
                        position: relative;
                        top: auto;
                        display: grid;
                        gap: 1rem;
                }

                .docs-content {
                        gap: 2.5rem;
                }
        }

        @media (max-width: 640px) {
                .feature-comparison,
                .method-card,
                .config-example,
                .config-code,
                .api-method,
                .security-feature,
                .issue,
                .help-section {
                        padding: 1.25rem;
                }

                .api-method {
                        gap: 0.75rem;
                }
        }
</style>
