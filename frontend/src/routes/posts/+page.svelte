<script lang="ts">
    import { onMount } from 'svelte';
    import { blogService, storageService } from '$lib/services/api';
    import { generateSlug } from '$lib/utils/slug';
    import FileUpload from '$lib/components/FileUpload.svelte';
    import type { BlogPost, CreateBlogPostDto, UpdateBlogPostDto } from '$lib/types';

    let posts: BlogPost[] = [];
    let loading = true;
    let error = '';
    let showCreateForm = false;
    let showEditForm = false;
    let selectedPost: BlogPost | null = null;
    let uploadLoading = false;

    let newPost: CreateBlogPostDto = {
        title: '',
        description: '',
        slug: '',
        imageUrl: ''
    };

    let editPost: UpdateBlogPostDto = {
        title: '',
        description: '',
        slug: '',
        imageUrl: ''
    };

    $: if (newPost.title) {
        newPost.slug = generateSlug(newPost.title);
    }

    $: if (editPost.title) {
        editPost.slug = generateSlug(editPost.title);
    }

    onMount(async () => {
        try {
            const response = await blogService.getAll();
            posts = response.data;
        } catch (err) {
            error = 'Failed to fetch blog posts';
        } finally {
            loading = false;
        }
    });

    async function handleCreate() {
        try {
            await blogService.create(newPost);
            await fetchPosts();
            showCreateForm = false;
            newPost = {
                title: '',
                description: '',
                slug: '',
                imageUrl: ''
            };
        } catch (err) {
            error = 'Failed to create blog post';
        }
    }

    async function handleUpdate() {
        if (!selectedPost) return;
        try {
            await blogService.update(selectedPost.id, editPost);
            await fetchPosts();
            showEditForm = false;
            selectedPost = null;
            editPost = {
                title: '',
                description: '',
                slug: '',
                imageUrl: ''
            };
        } catch (err) {
            error = 'Failed to update blog post';
        }
    }

    async function handleDelete(id: string) {
        if (!confirm('Are you sure you want to delete this blog post?')) return;
        try {
            await blogService.delete(id);
            await fetchPosts();
        } catch (err) {
            error = 'Failed to delete blog post';
        }
    }

    function openEditForm(post: BlogPost) {
        selectedPost = post;
        editPost = {
            title: post.title,
            description: post.description,
            slug: post.slug,
            imageUrl: post.imageUrl
        };
        showEditForm = true;
    }

    async function handleFileUpload(event: CustomEvent<File>) {
        uploadLoading = true;
        error = '';

        try {
            const file = event.detail;
            const result = await storageService.uploadFile(file);
            if (selectedPost) {
                editPost.imageUrl = result.url;
            } else {
                newPost.imageUrl = result.url;
            }
        } catch (err) {
            console.error('Error uploading file:', err);
            error = 'Failed to upload file';
        } finally {
            uploadLoading = false;
        }
    }

    function handleUploadError(event: CustomEvent<string>) {
        error = event.detail;
    }

    async function fetchPosts() {
        try {
            const response = await blogService.getAll();
            posts = response.data;
        } catch (err) {
            console.error('Error fetching posts:', err);
        }
    }
</script>

<div class="container mx-auto px-4 py-8">
    <h1 class="text-3xl font-bold mb-8">Blog Posts Management</h1>

    {#if error}
        <div class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
        </div>
    {/if}

    <button
        class="bg-blue-500 text-white px-4 py-2 rounded mb-4"
        on:click={() => showCreateForm = true}
    >
        Create New Blog Post
    </button>

    {#if showCreateForm}
        <div class="bg-white p-4 rounded shadow mb-4">
            <h2 class="text-xl font-semibold mb-4">Create Blog Post</h2>
            <form on:submit|preventDefault={handleCreate} class="space-y-4">
                <div>
                    <label class="block text-sm font-medium text-gray-700">Title</label>
                    <input
                        type="text"
                        bind:value={newPost.title}
                        class="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                        required
                    />
                </div>
                <div>
                    <label class="block text-sm font-medium text-gray-700">Slug</label>
                    <input
                        type="text"
                        bind:value={newPost.slug}
                        class="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                        required
                    />
                    <p class="mt-1 text-sm text-gray-500">URL-friendly version of the title</p>
                </div>
                <div>
                    <label class="block text-sm font-medium text-gray-700">Description</label>
                    <textarea
                        bind:value={newPost.description}
                        class="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                        rows="6"
                        required
                    ></textarea>
                </div>
                <div>
                    <label class="block text-sm font-medium text-gray-700">Image</label>
                    <FileUpload
                        on:upload={handleFileUpload}
                        on:error={handleUploadError}
                        loading={uploadLoading}
                        label="Upload post image"
                    />
                    {#if newPost.imageUrl}
                        <img src={newPost.imageUrl} alt="Preview" class="mt-2 h-32 w-auto object-cover rounded" />
                    {/if}
                </div>
                <div class="flex space-x-2">
                    <button type="submit" class="bg-green-500 text-white px-4 py-2 rounded">
                        Create
                    </button>
                    <button
                        type="button"
                        class="bg-gray-500 text-white px-4 py-2 rounded"
                        on:click={() => showCreateForm = false}
                    >
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    {/if}

    {#if showEditForm && selectedPost}
        <div class="bg-white p-4 rounded shadow mb-4">
            <h2 class="text-xl font-semibold mb-4">Edit Blog Post</h2>
            <form on:submit|preventDefault={handleUpdate} class="space-y-4">
                <div>
                    <label class="block text-sm font-medium text-gray-700">Title</label>
                    <input
                        type="text"
                        bind:value={editPost.title}
                        class="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                        required
                    />
                </div>
                <div>
                    <label class="block text-sm font-medium text-gray-700">Slug</label>
                    <input
                        type="text"
                        bind:value={editPost.slug}
                        class="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                        required
                    />
                    <p class="mt-1 text-sm text-gray-500">URL-friendly version of the title</p>
                </div>
                <div>
                    <label class="block text-sm font-medium text-gray-700">Description</label>
                    <textarea
                        bind:value={editPost.description}
                        class="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                        rows="6"
                        required
                    ></textarea>
                </div>
                <div>
                    <label class="block text-sm font-medium text-gray-700">Image</label>
                    <FileUpload
                        on:upload={handleFileUpload}
                        on:error={handleUploadError}
                        loading={uploadLoading}
                        label="Upload post image"
                    />
                    {#if editPost.imageUrl}
                        <img src={editPost.imageUrl} alt="Preview" class="mt-2 h-32 w-auto object-cover rounded" />
                    {/if}
                </div>
                <div class="flex space-x-2">
                    <button type="submit" class="bg-green-500 text-white px-4 py-2 rounded">
                        Update
                    </button>
                    <button
                        type="button"
                        class="bg-gray-500 text-white px-4 py-2 rounded"
                        on:click={() => {
                            showEditForm = false;
                            selectedPost = null;
                        }}
                    >
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    {/if}

    {#if loading}
        <div class="text-center">Loading...</div>
    {:else}
        <div class="grid gap-6">
            {#each posts as post}
                <div class="bg-white shadow rounded-lg p-6">
                    <div class="flex justify-between items-start">
                        <div>
                            <h2 class="text-xl font-semibold mb-2">{post.title}</h2>
                            <p class="text-gray-600 mb-4">{post.description}</p>
                            {#if post.imageUrl}
                                <img src={post.imageUrl} alt={post.title} class="w-full h-48 object-cover rounded-lg mb-4" />
                            {/if}
                            <div class="flex items-center space-x-4 text-sm text-gray-500">
                                <span>Author: {post.author?.name}</span>
                                <span>Created: {new Date(post.createdAt).toLocaleDateString()}</span>
                            </div>
                        </div>
                        <div class="flex space-x-2">
                            <button
                                class="text-blue-600 hover:text-blue-900"
                                on:click={() => openEditForm(post)}
                            >
                                Edit
                            </button>
                            <button
                                class="text-red-600 hover:text-red-900"
                                on:click={() => handleDelete(post.id)}
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            {/each}
        </div>
    {/if}
</div> 