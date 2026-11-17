"""Optimiza los recursos de marca reales (logo y apps) para el sitio."""
from PIL import Image
import shutil, subprocess, os
S='/home/claude/assets-src/'; O='static/img/'

def bbox_nonblack(im, thr=28, limit=None):
    g=im.convert('RGB')
    if limit: g=g.crop(limit)
    mask=g.point(lambda v: 255 if v>thr else 0).convert('L')
    bb=mask.getbbox()
    if limit and bb: bb=(bb[0]+limit[0],bb[1]+limit[1],bb[2]+limit[0],bb[3]+limit[1])
    return bb

# --- Logo VARGERSOFT (captura del sitio en vivo, fondo negro) ---
raw=Image.open(S+'vargersoft-logo-raw.png').convert('RGB')
bb=bbox_nonblack(raw, limit=(40,100,800,440))       # excluye el cursor de la captura
pad=18; bb=(max(bb[0]-pad,0),max(bb[1]-pad,0),bb[2]+pad,bb[3]+pad)
logo=raw.crop(bb)
logo.save(O+'logo.webp',quality=92,method=6)
print('logo',logo.size)
nav=logo.copy(); nav.thumbnail((360,160)); nav.save(O+'logo-nav.webp',quality=92,method=6)
# marca "V" para favicon
mark_bb=bbox_nonblack(raw, limit=(150,130,540,300))
m=raw.crop(mark_bb); side=max(m.size)+40
sq=Image.new('RGB',(side,side),(0,0,0)); sq.paste(m,((side-m.width)//2,(side-m.height)//2))
for n in (512,192,180,32):
    sq.resize((n,n),Image.LANCZOS).save(O+('apple-touch-icon.png' if n==180 else f'icon-{n}.png'))
sq.resize((48,48),Image.LANCZOS).save('static/favicon.ico',sizes=[(16,16),(32,32),(48,48)])
# imagen social 1200x630
og=Image.new('RGB',(1200,630),(0,0,0)); l2=logo.copy(); l2.thumbnail((900,420))
og.paste(l2,((1200-l2.width)//2,(630-l2.height)//2)); og.save(O+'og.jpg',quality=88)

# --- Iconos de apps ---
def icon(src,name):
    im=Image.open(S+src).convert('RGBA'); bg=Image.new('RGBA',im.size,(0,0,0,0)); bg.alpha_composite(im)
    bg=bg.resize((192,192),Image.LANCZOS); bg.save(O+f'apps/{name}-icon.webp',quality=90,method=6)
icon('derate-icon.png','derate'); icon('paternoster-icon.png','paternoster'); icon('freshortoss-icon.png','freshortoss')
icon('scorlee-icon.png','scorlee'); icon('casealerta-icon.png','casealerta')
shutil.copy(S+'signatureforever-icon.svg',O+'apps/signatureforever-icon.svg')
# bajabill: quitar metadatos c2pa del svg con rsvg (rasteriza limpio)
subprocess.run(['rsvg-convert','-w','192','-h','192',S+'bajabill-icon.svg','-o','/tmp/bb-icon.png'],check=True)
Image.open('/tmp/bb-icon.png').save(O+'apps/bajabill-icon.webp',quality=90)
subprocess.run(['rsvg-convert','-w','900',S+'bajabill-logo.svg','-o','/tmp/bb-logo.png'],check=True)

# --- Miniaturas 800x420 ---
def thumb(src,name,focus=0.5):
    im=Image.open(S+src).convert('RGB'); tw,th=800,420; r=tw/th
    w,h=im.size
    if w/h>r: nw=int(h*r); x=int((w-nw)*focus); im=im.crop((x,0,x+nw,h))
    else: nh=int(w/r); y=int((h-nh)*focus); im=im.crop((0,y,w,y+nh))
    im.resize((tw,th),Image.LANCZOS).save(O+f'apps/{name}-thumb.webp',quality=84,method=6)
thumb('paternoster-og.jpg','paternoster'); thumb('scorlee-og.png','scorlee'); thumb('signatureforever-og.jpg','signatureforever')
thumb('casealerta-header.jpg','casealerta',0.5); thumb('derate-shot-small.jpg','derate')
fc=Image.open(S+'freshortoss-cover.png').convert('RGBA'); b=Image.new('RGBA',fc.size,(34,197,94,255)); b.alpha_composite(fc); b.convert('RGB').save('/tmp/fot.png'); 
im=Image.open('/tmp/fot.png'); im.resize((800,420),Image.LANCZOS).save(O+'apps/freshortoss-thumb.webp',quality=84,method=6)
# bajabill: logo real sobre crema
lg=Image.open('/tmp/bb-logo.png').convert('RGBA'); card=Image.new('RGBA',(800,420),(250,244,232,255)); lg.thumbnail((520,240))
card.alpha_composite(lg,((800-lg.width)//2,(420-lg.height)//2)); card.convert('RGB').save(O+'apps/bajabill-thumb.webp',quality=86,method=6)
for f in sorted(os.listdir(O+'apps')): print(f, os.path.getsize(O+'apps/'+f))
