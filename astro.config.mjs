import tailwind from "@astrojs/tailwind";
import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
  site: "https://fava-landing-page.netlify.app/",
  integrations: [image({
    serviceEntryPoint: 'astrojs/image/sharp'
  }),sitemap]
});
