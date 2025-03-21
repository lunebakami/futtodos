/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_URL: string;
  readonly VITE_SITE_TITLE: string;
  readonly VITE_SITE_DESCRIPTION: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
} 