<script lang="ts">
    import { createEventDispatcher } from 'svelte';

    export let accept = 'image/*';
    export let maxSize = 5 * 1024 * 1024; // 5MB default
    export let label = 'Upload File';
    export let loading = false;

    const dispatch = createEventDispatcher<{
        error: string;
        upload: File;
    }>();

    let fileInput: HTMLInputElement;
    let dragOver = false;

    function handleFileSelect(event: Event) {
        const input = event.target as HTMLInputElement;
        const file = input.files?.[0];
        
        if (file) {
            validateAndDispatch(file);
        }
    }

    function handleDrop(event: DragEvent) {
        event.preventDefault();
        dragOver = false;
        
        const file = event.dataTransfer?.files[0];
        if (file) {
            validateAndDispatch(file);
        }
    }

    function validateAndDispatch(file: File) {
        if (file.size > maxSize) {
            dispatch('error', `File size exceeds ${maxSize / 1024 / 1024}MB limit`);
            return;
        }

        dispatch('upload', file);
    }

    function handleDragOver(event: DragEvent) {
        event.preventDefault();
        dragOver = true;
    }

    function handleDragLeave() {
        dragOver = false;
    }
</script>

<div
    class="relative flex justify-center items-center w-full h-32 px-4 transition bg-white border-2 border-gray-300 border-dashed rounded-lg appearance-none cursor-pointer hover:border-gray-400 focus:outline-none {dragOver ? 'border-blue-500' : ''}"
    on:dragover={handleDragOver}
    on:dragleave={handleDragLeave}
    on:drop={handleDrop}
>
    <input
        type="file"
        class="absolute inset-0 z-50 w-full h-full p-0 m-0 outline-none opacity-0 cursor-pointer"
        {accept}
        on:change={handleFileSelect}
        bind:this={fileInput}
        disabled={loading}
    />
    
    <div class="flex flex-col items-center justify-center">
        {#if loading}
            <svg class="w-6 h-6 mr-1 text-blue-500 animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
        {:else}
            <svg class="w-8 h-8 mb-2 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
            </svg>
        {/if}
        <p class="text-sm text-gray-600">
            {label}
        </p>
    </div>
</div> 