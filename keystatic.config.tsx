import { config, fields, collection, singleton } from "@keystatic/core";

export default config({
  storage: {
    kind: "github",
    repo: {
      owner: "xzit",
      name: "xzit",
    },
  },
  ui: {
    brand: {
      name: "XZIT",
      mark: () => <img src="/favicon.svg" alt="XZIT" height={24} />,
    },
  },
  singletons: {
    home: singleton({
      label: "Homepage",
      path: "src/content/home",
      schema: {
        title: fields.text({ label: "Title" }),
        description: fields.markdoc.inline({ label: "Description" }),
        seoTitle: fields.text({ label: "SEO Title" }),
        seoDescription: fields.text({
          label: "SEO Description",
          multiline: true,
        }),
        content: fields.blocks(
          {
            posts: {
              label: "All Posts",
              itemLabel: (props) => props.fields.title.value,
              schema: fields.object({
                title: fields.text({ label: "Title" }),
              }),
            },
            links: {
              label: "Links",
              itemLabel: (props) => props.fields.title.value,
              schema: fields.object({
                title: fields.text({ label: "Title" }),
                links: fields.array(
                  fields.object({
                    label: fields.text({ label: "Label" }),
                    url: fields.url({ label: "URL" }),
                    description: fields.text({ label: "Description" }),
                    external: fields.checkbox({ label: "Open in new tab" }),
                  }),
                  {
                    label: "Links",
                    itemLabel: (props) => props.fields.label.value,
                  },
                ),
              }),
            },
            features: {
              label: "Features",
              itemLabel: (props) => props.fields.title.value,
              schema: fields.object({
                title: fields.text({ label: "Title" }),
                category: fields.array(
                  fields.object({
                    title: fields.text({ label: "Title" }),
                    items: fields.array(
                      fields.object({
                        title: fields.text({ label: "Title" }),
                        content: fields.markdoc.inline({ label: "Content" }),
                        tags: fields.array(fields.text({ label: "Tag" }), {
                          label: "Tags",
                          itemLabel: (props) => props.value,
                        }),
                      }),
                      {
                        label: "Items",
                        itemLabel: (props) => props.fields.title.value,
                      },
                    ),
                  }),
                  {
                    label: "Categories",
                    itemLabel: (props) => props.fields.title.value,
                  },
                ),
              }),
            },
          },
          { label: "Content" },
        ),
      },
    }),
    site: singleton({
      label: "Settings",
      path: "src/content/site",
      schema: {
        socials: fields.array(
          fields.object({
            label: fields.text({ label: "Label" }),
            url: fields.url({ label: "URL" }),
          }),
          {
            label: "Social Media",
            itemLabel: (props) => props.fields.label.value,
          },
        ),
      },
    }),
  },
  collections: {
    posts: collection({
      label: "Posts",
      slugField: "title",
      path: "src/content/posts/*",
      entryLayout: "content",
      format: { contentField: "content" },
      schema: {
        title: fields.slug({ name: { label: "Title" } }),
        content: fields.markdoc({
          label: "Content",
          options: {
            image: {
              directory: "src/assets/images/posts",
              publicPath: "../../assets/images/posts/",
            },
          },
        }),
        seoTitle: fields.text({ label: "SEO Title" }),
        seoDescription: fields.text({
          label: "SEO Description",
          multiline: true,
        }),
        date: fields.date({ label: "Date", defaultValue: "today" }),
      },
    }),
  },
});
