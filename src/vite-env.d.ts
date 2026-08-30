/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_ZOMATO_URL?: string;
  readonly VITE_SWIGGY_URL?: string;
  readonly APP_URL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
