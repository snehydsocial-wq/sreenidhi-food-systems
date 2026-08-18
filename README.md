# Sreenidhi Food Systems — Static Website

This folder is the deployable GitHub Pages site. It contains 49 indexed HTML routes, shared CSS/JavaScript, original supplied logos, six web-optimized segment photographs, and 80 supplied SVG product images. There is intentionally no aggregated products catalogue.

## Preview locally

Open `index.html` directly, or serve the folder with any static server.

## Replace product media

The gallery uses exactly the numbered images available for each product. Products with four supplied SVGs show four selectable images; products with one supplied SVG show one image. Products without supplied media retain one clearly marked temporary image.

Number files using the matching product slug, for example:

- `xtendra-bake-magic-plus-1.svg`
- `xtendra-bake-magic-plus-2.svg`
- `xtendra-bake-magic-plus-3.svg`
- `xtendra-bake-magic-plus-4.svg`

SVG, WebP, JPG, JPEG and PNG are accepted. Put source media in `work/source/product-images/`, then rebuild.

## Replace product videos

Videos play from YouTube's privacy-enhanced embed domain; no video files are stored in this website. Edit the relevant URL in `assets/js/product-videos.js`. Each product has a separate entry, even though all entries currently use the same supplied video. See `PRODUCT-VIDEO-LINKS.md` for the complete map.

## Contact form

The form posts to FormSubmit for `sreenidhienterpriseshyd@gmail.com`. The first live submission may require an email confirmation from FormSubmit. Direct phone, email and WhatsApp actions work independently of the form.

## Domain and social sharing

The site is configured for `https://sreenidhifoodsystems.com/`. The included `CNAME` file, canonical URLs, Open Graph metadata and social-preview image all use this domain. If the final live domain changes, update `SITE_URL` in `work/build_site.py` and rebuild before deployment.

## GitHub Pages

Upload the contents of this folder to the root of a GitHub repository, commit, then open Repository Settings → Pages. Select “Deploy from a branch”, choose the main branch and `/ (root)`, and save.

The `.nojekyll` file is included so GitHub Pages serves the static files without Jekyll processing.
