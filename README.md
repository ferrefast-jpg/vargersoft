# vargersoft.com

Sitio de VARGERSOFT (división de software de VARGER Group LLC). Generador estático propio: cada página sale como HTML completo, en inglés (`/`) y español (`/es/`).

## Uso

```
npm install
node build.mjs        # genera dist/
python3 -m http.server 8765 --directory dist   # vista local
```

## Estructura

- `build.mjs` — plantillas y generación de páginas, sitemap, robots, llms.txt.
- `src/data-core.mjs` — marca, menú y los 8 servicios con precios.
- `src/data-more.mjs` — apps, galería de trabajo, industrias, descargas, FAQ, portada.
- `src/guides.mjs` — guías (recursos). `src/legal.mjs` — privacidad y términos (borradores).
- `src/icons.mjs` — iconografía e ilustraciones propias (SVG).
- `static/` — CSS, JS, fuentes, imágenes, `contact.php`, `.htaccess`.
- `scripts/` — preparación de imágenes a partir del arte real de cada app.

Cada texto vive como `[inglés, español]`. Para cambiar un precio o un texto se edita `src/` y se vuelve a generar.

## Publicación

`dist/` es el sitio. En Hostinger se despliega como sitio estático (el formulario usa `contact.php`).
