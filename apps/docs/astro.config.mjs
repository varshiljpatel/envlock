// @ts-check
import { defineConfig } from "astro/config";
import starlight from "@astrojs/starlight";

// https://astro.build/config
export default defineConfig({
  integrations: [
    starlight({
      tableOfContents: {
        maxHeadingLevel: 5,
      },
      customCss: [
        "@fontsource/poppins/200.css",
        "@fontsource/poppins/300.css",
        "@fontsource/poppins/400.css",
        "@fontsource/poppins/500.css",
        "@fontsource/poppins/600.css",
        "@fontsource/poppins/700.css",
        "./src/styles/custom.css",
      ],
      title: "Envlock",
      social: [
        {
          icon: "github",
          label: "GitHub",
          href: "https://github.com/varshiljpatel/envlock",
        },
      ],
      sidebar: [
        {
          label: "Introduction",
          items: [
            { label: "Introduction", slug: "intro" },
            { label: "Problem statement", slug: "problem" },
            { label: "Features", slug: "features" },
          ],
        },
        {
          label: "Getting started",
          items: [
            { label: "Installation", slug: "installation" },
            { label: "Supported Platforms", slug: "supported_platforms" },
          ],
        },
        {
          label: "Usage",
          items: [
            { label: "Encryption", slug: "usage/encryption" },
            { label: "Decryption", slug: "usage/decryption" },
            { label: ".gitignore", slug: "usage/auto" },
          ],
        },
        {
          label: "How it works",
          items: [
            { label: "Encryption", slug: "how_it_works/encryption" },
            { label: "Decryption", slug: "how_it_works/decryption" },
          ],
        },
        {
          label: "Misc",
          items: [
            { label: "License", slug: "misc/license" },
            { label: "Contributing", slug: "misc/contributing" },
            { label: "Author", slug: "misc/author" },
            { label: "Acknowledgments", slug: "misc/acknowledgments" },
            { label: "Feedback", slug: "misc/feedback" },
            { label: "Future Plans", slug: "misc/future_plans" },
          ],
        },
        // {
        // 	label: 'Reference',
        // 	autogenerate: { directory: 'reference' },
        // },
      ],
    }),
  ],
});
