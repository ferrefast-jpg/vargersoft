#!/usr/bin/env bash
# Publica vargersoft.com desde el código de la rama main.
#
#   bash scripts/deploy.sh staging      -> solo dirección de prueba (sin indexar)
#   bash scripts/deploy.sh production   -> www.vargersoft.com (y también prueba)
#
# Cómo funciona:
#   - Construye el sitio (STAGING=1 para prueba) en dist-staging/ o dist/.
#   - Copia lo construido a una rama de solo-publicación:
#       staging-site     -> https://springy-darkred-dolphin-64.hostingersite.com
#       production-site  -> https://www.vargersoft.com
#   - Hostinger tiene auto-deploy desde esas ramas: cada push se publica solo.
#   - Después de publicar en producción, limpiar caché con el MCP de Hostinger:
#       hosting_cache_clear { domain: "vargersoft.com" }
#
# Regla: production solo cuando Juan lo autoriza.
set -euo pipefail

TARGET="${1:-staging}"
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
REMOTE="$(git -C "$ROOT" remote get-url origin)"
MSG="${2:-Publicación $(date -u +%Y-%m-%dT%H:%MZ)}"

publish() { # $1 = carpeta construida, $2 = rama
  local src="$ROOT/$1" branch="$2" tmp
  tmp="$(mktemp -d)"
  if git ls-remote --exit-code --heads "$REMOTE" "$branch" >/dev/null 2>&1; then
    git clone -q --depth 1 --branch "$branch" "$REMOTE" "$tmp"
  else
    git -C "$tmp" init -q -b "$branch" && git -C "$tmp" remote add origin "$REMOTE"
  fi
  find "$tmp" -mindepth 1 -maxdepth 1 ! -name .git -exec rm -rf {} +
  cp -r "$src/." "$tmp/"
  git -C "$tmp" add -A
  if git -C "$tmp" diff --cached --quiet; then
    echo "sin cambios en $branch"
  else
    git -C "$tmp" -c user.name="Claude" -c user.email="noreply@anthropic.com" commit -q -m "$MSG"
    git -C "$tmp" push -q origin "$branch"
    echo "publicado: $branch"
  fi
  rm -rf "$tmp"
}

cd "$ROOT"
[ -d node_modules ] || npm ci --silent

STAGING=1 node build.mjs
publish dist-staging staging-site

if [ "$TARGET" = "production" ]; then
  node build.mjs
  publish dist production-site
  echo "Recuerda: hosting_cache_clear { domain: \"vargersoft.com\" }"
fi
