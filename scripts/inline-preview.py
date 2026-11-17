"""Vista previa de la portada en un solo archivo (para revisar sin servidor). Los enlaces internos quedan inactivos."""
import re, base64, mimetypes, sys
lang = sys.argv[1] if len(sys.argv) > 1 else 'es'
src = 'dist/es/index.html' if lang == 'es' else 'dist/index.html'
html = open(src, encoding='utf8').read()
def data(path):
    p = 'dist' + path.split('?')[0]
    mt = mimetypes.guess_type(p)[0] or ('font/woff2' if p.endswith('.woff2') else 'image/webp' if p.endswith('.webp') else 'application/octet-stream')
    return f'data:{mt};base64,' + base64.b64encode(open(p, 'rb').read()).decode()
css = open('dist/css/site.css', encoding='utf8').read()
css = re.sub(r'url\((/fonts/[^)]+)\)', lambda m: f'url({data(m.group(1))})', css)
js = open('dist/js/site.js', encoding='utf8').read()
html = re.sub(r'<link rel="stylesheet"[^>]+>', lambda m: '<style>' + css + '</style>', html)
html = re.sub(r'<script src="/js/site.js[^>]*></script>', lambda m: '<script>' + js + '</script>', html)
html = re.sub(r'<link rel="(?:preload|icon|apple-touch-icon|manifest|canonical|alternate)"[^>]*>\n?', '', html)
html = re.sub(r'<script type="application/ld\+json">.*?</script>\n?', '', html, flags=re.S)
html = re.sub(r'src="(/img/[^"]+)"', lambda m: f'src="{data(m.group(1))}"', html)
html = html.replace('loading="lazy"', '')
# enlaces internos inactivos (la vista previa es solo la portada); los externos se conservan
html = re.sub(r'href="/[^"]*"', 'href="#top" data-inert', html)
html = html.replace('<form class="form" action="/contact.php" method="post"', '<form class="form" onsubmit="return false"')
note = ('Vista previa de la portada. Los enlaces a otras páginas están inactivos aquí.' if lang == 'es' else 'Home page preview. Links to other pages are inactive here.')
html = html.replace('<body class="home">', f'<body class="home" id="top"><div style="background:#22c55e;color:#031207;font:600 13px/1.4 system-ui;padding:8px 14px;text-align:center">{note}</div>')
html = html.replace('<!doctype html>', '<!DOCTYPE html>')
open(f'/home/claude/preview-home-{lang}.html', 'w', encoding='utf8').write(html)
print(len(html) // 1024, 'KB')
