# The Pantheon — Jekyll site

This project uses **Jekyll 4.4.1** only.

## Run locally (macOS)

```sh
gem install bundler
bundle install
bundle exec jekyll serve
```

Open http://127.0.0.1:4000. Stop the server with `Ctrl-C`.

## Homepage

The homepage uses a dedicated `_layouts/pantheon.html` layout. It intentionally has no conventional header or footer. The navigation inscriptions link to six room pages, currently lightweight placeholders ready to be developed.

The architectural photograph is `assets/images/caryatids-reference.png`. The birds and ambient motion are implemented in `assets/js/main.js`; the reduced-motion preference disables those effects.

## Update the Loose Relics ticker

Edit `_data/loose_relics.yml`. Each entry has:
- `title`: the text shown in the ticker
- `url`: an internal path or external URL
- `category`: determines the separator-dot colour

Example:

```yaml
- title: "A fascinating article"
  url: "https://example.com/article"
  external: true
  category: "writing"
```

Available styled categories include `writing`, `history`, `books`, and `oddities`. New categories get the default dot colour until a matching CSS class is added.

The ticker duplicates its sequence to create a seamless continuous loop. It pauses on hover and keyboard focus.

## GitHub Pages deployment

The workflow at `.github/workflows/pages.yml` builds with Jekyll and deploys `_site`.

In GitHub, open **Settings → Pages → Build and deployment** and select **GitHub Actions**.

Push the project to the `main` branch to deploy.

## Notes

- The Jekyll build configuration and Gemfile are preserved.
- The shared interior layout remains available for the room pages, journal and about page.
- The ticker entries are demonstration entries; replace them with your own discoveries.


## Repair note (2026-11-23)

The previous archive contained both `index.html` and `index.markdown`, which Jekyll
both attempted to publish to `/`. The generated `_site/index.html` in the supplied
archive was zero bytes. The obsolete starter `index.markdown` has been removed so
`index.html` is the single homepage source. The obsolete duplicate `about.markdown`
has also been removed; `about.md` is the retained About page.

Generated output, caches, Git metadata, macOS metadata and `node_modules` are not
included in this source archive. They are recreated locally as needed.
