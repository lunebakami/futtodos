<script lang="ts">
	import '../app.css';
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';

	export let data: { authenticated: boolean };

	function handleLogout() {
		localStorage.removeItem('token');
		localStorage.removeItem('user');
		goto('/login');
	}
</script>

<div class="min-h-screen bg-gray-100">
	{#if data.authenticated}
		<nav class="bg-white shadow-sm">
			<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div class="flex justify-between h-16">
					<div class="flex">
						<div class="flex-shrink-0 flex items-center">
							<a href="/" class="text-xl font-bold text-gray-800">Dashboard</a>
						</div>
						<div class="hidden sm:ml-6 sm:flex sm:space-x-8">
							<a
								href="/"
								class="{$page.url.pathname === '/' ? 'border-blue-500 text-gray-900' : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'} inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
							>
								Home
							</a>
							<a
								href="/posts"
								class="{$page.url.pathname === '/posts' ? 'border-blue-500 text-gray-900' : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'} inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
							>
								Posts
							</a>
							<a
								href="/users"
								class="{$page.url.pathname === '/users' ? 'border-blue-500 text-gray-900' : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'} inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
							>
								Users
							</a>
						</div>
					</div>
					<div class="flex items-center">
						<button
							on:click={handleLogout}
							class="ml-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
						>
							Logout
						</button>
					</div>
				</div>
			</div>
		</nav>
	{/if}

	<main class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
		<slot />
	</main>
</div>
