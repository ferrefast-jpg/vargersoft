"""Arte real de las apps para la galería de trabajo."""
from PIL import Image
import subprocess, os
S='/home/claude/assets-src/'; O='static/img/work/'
def save(im,name,q=82): im.save(O+name+'.webp',quality=q,method=6)
# mascotas Scorlee (fondo transparente)
for m in ('feliz','celebrando','pensando'):
    im=Image.open(S+f'scorlee-mascota-{m}.png').convert('RGBA'); im.thumbnail((400,400)); save(im,f'scorlee-{m}',88)
# Freshie (svg -> webp transparente)
for f in ('fresh','eat_soon','frozen','past','saved'):
    subprocess.run(['rsvg-convert','-h','520',S+f'freshie-{f}.svg','-o',f'/tmp/fr-{f}.png'],check=True)
    save(Image.open(f'/tmp/fr-{f}.png').convert('RGBA'),f'freshie-{f.replace("_","-")}',88)
# escenas Paternoster 9:16
for s in ('amanecer','noche','oro','vela','vitral'):
    im=Image.open(S+f'paternoster-{s}.jpg').convert('RGB').resize((540,960),Image.LANCZOS); save(im,f'paternoster-{s}',80)
# pantallas (alto 932)
def screen(src,name):
    im=Image.open(S+src).convert('RGB'); h=932; w=round(im.width*h/im.height); save(im.resize((w,h),Image.LANCZOS),name,82)
for i in range(1,7): screen(f'casealerta-iphone-{i}.jpg',f'casealerta-screen-{i}')
screen('casealerta-paywall.jpg','casealerta-paywall')
for s in ('home','result','search','setup'): screen(f'freshortoss-{s}.webp',f'freshortoss-{s}')
t=Image.open(S+'derate-truck.png').convert('RGBA'); save(t,'derate-truck',90)
tot=0
for f in sorted(os.listdir(O)):
    sz=os.path.getsize(O+f); tot+=sz; print(f, Image.open(O+f).size, sz)
print('total KB',tot//1024)
