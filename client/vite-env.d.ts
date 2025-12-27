/// <reference types="vite/client" />

type ContentfulEnv = {
  VITE_CONTENTFUL_SPACE_ID?: string;
  VITE_CONTENTFUL_DELIVERY_TOKEN?: string;
  VITE_CONTENTFUL_ENVIRONMENT?: string;
};

interface ImportMetaEnv extends ContentfulEnv {}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
