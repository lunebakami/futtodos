<script lang="ts">
	const siteTitle = import.meta.env.VITE_SITE_TITLE || 'CMS Dashboard';
	const siteDescription = import.meta.env.VITE_SITE_DESCRIPTION || 'Manage your blog content and users';
</script>

<div class="container mx-auto px-4 py-8">
    <h1 class="text-4xl font-bold text-center mb-8">Welcome to {siteTitle}</h1>
    
    <div class="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        <a href="/users" class="block p-6 bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow">
            <h2 class="text-2xl font-semibold mb-4">User Management</h2>
            <p class="text-gray-600">Manage your users, including creating, editing, and deleting user accounts.</p>
        </a>
        
        <a href="/posts" class="block p-6 bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow">
            <h2 class="text-2xl font-semibold mb-4">Blog Posts</h2>
            <p class="text-gray-600">Create and manage your blog posts, including drafts and published content.</p>
        </a>
    </div>
</div>
