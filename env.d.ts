/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_BASE_URL: string;
  readonly VITE_APP_ENV: string;
  readonly VITE_PARAM: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
