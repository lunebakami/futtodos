<script lang="ts">
    import { onMount } from 'svelte';
    import { userService } from '$lib/services/api';
    import type { User, CreateUserDto, UpdateUserDto } from '$lib/types';

    let users: User[] = [];
    let loading = true;
    let error = '';
    let showCreateForm = false;
    let showEditForm = false;
    let selectedUser: User | null = null;

    let newUser: CreateUserDto = {
        email: '',
        name: '',
        password: ''
    };

    let editUser: UpdateUserDto = {
        email: '',
        name: '',
        password: ''
    };

    onMount(async () => {
        try {
            const response = await userService.getAll();
            users = response.data;
        } catch (err) {
            error = 'Failed to fetch users';
        } finally {
            loading = false;
        }
    });

    async function handleCreate() {
        try {
            const response = await userService.create(newUser);
            users = [...users, response.data];
            showCreateForm = false;
            newUser = { email: '', name: '', password: '' };
        } catch (err) {
            error = 'Failed to create user';
        }
    }

    async function handleUpdate() {
        if (!selectedUser) return;
        try {
            const response = await userService.update(selectedUser.id, editUser);
            users = users.map(user => user.id === selectedUser.id ? response.data : user);
            showEditForm = false;
            selectedUser = null;
            editUser = { email: '', name: '', password: '' };
        } catch (err) {
            error = 'Failed to update user';
        }
    }

    async function handleDelete(id: string) {
        if (!confirm('Are you sure you want to delete this user?')) return;
        try {
            await userService.delete(id);
            users = users.filter(user => user.id !== id);
        } catch (err) {
            error = 'Failed to delete user';
        }
    }

    function openEditForm(user: User) {
        selectedUser = user;
        editUser = {
            email: user.email,
            name: user.name,
            password: ''
        };
        showEditForm = true;
    }
</script>

<div class="container mx-auto px-4 py-8">
    <h1 class="text-3xl font-bold mb-8">User Management</h1>

    {#if error}
        <div class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
        </div>
    {/if}

    <button
        class="bg-blue-500 text-white px-4 py-2 rounded mb-4"
        on:click={() => showCreateForm = true}
    >
        Create New User
    </button>

    {#if showCreateForm}
        <div class="bg-white p-4 rounded shadow mb-4">
            <h2 class="text-xl font-semibold mb-4">Create User</h2>
            <form on:submit|preventDefault={handleCreate} class="space-y-4">
                <div>
                    <label class="block text-sm font-medium text-gray-700">Email</label>
                    <input
                        type="email"
                        bind:value={newUser.email}
                        class="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                        required
                    />
                </div>
                <div>
                    <label class="block text-sm font-medium text-gray-700">Name</label>
                    <input
                        type="text"
                        bind:value={newUser.name}
                        class="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                        required
                    />
                </div>
                <div>
                    <label class="block text-sm font-medium text-gray-700">Password</label>
                    <input
                        type="password"
                        bind:value={newUser.password}
                        class="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                        required
                    />
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

    {#if showEditForm && selectedUser}
        <div class="bg-white p-4 rounded shadow mb-4">
            <h2 class="text-xl font-semibold mb-4">Edit User</h2>
            <form on:submit|preventDefault={handleUpdate} class="space-y-4">
                <div>
                    <label class="block text-sm font-medium text-gray-700">Email</label>
                    <input
                        type="email"
                        bind:value={editUser.email}
                        class="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                        required
                    />
                </div>
                <div>
                    <label class="block text-sm font-medium text-gray-700">Name</label>
                    <input
                        type="text"
                        bind:value={editUser.name}
                        class="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                        required
                    />
                </div>
                <div>
                    <label class="block text-sm font-medium text-gray-700">New Password (leave blank to keep current)</label>
                    <input
                        type="password"
                        bind:value={editUser.password}
                        class="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                    />
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
                            selectedUser = null;
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
        <div class="bg-white shadow rounded-lg overflow-hidden">
            <table class="min-w-full divide-y divide-gray-200">
                <thead class="bg-gray-50">
                    <tr>
                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                </thead>
                <tbody class="bg-white divide-y divide-gray-200">
                    {#each users as user}
                        <tr>
                            <td class="px-6 py-4 whitespace-nowrap">{user.name}</td>
                            <td class="px-6 py-4 whitespace-nowrap">{user.email}</td>
                            <td class="px-6 py-4 whitespace-nowrap">
                                <button
                                    class="text-blue-600 hover:text-blue-900 mr-4"
                                    on:click={() => openEditForm(user)}
                                >
                                    Edit
                                </button>
                                <button
                                    class="text-red-600 hover:text-red-900"
                                    on:click={() => handleDelete(user.id)}
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    {/each}
                </tbody>
            </table>
        </div>
    {/if}
</div> 