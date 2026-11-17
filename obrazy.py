import json
from PIL import Image, ImageOps, ImageFilter
R=r'C:/Users/Admin/Downloads/Odrobimy_kampania/klienci/VitalMobile/raw/'
MAGIC=(b'\xff\xd8\xff',b'\x89PNG',b'RIFF')
M={}
def load(f,mode='RGB'):
    assert open(R+f,'rb').read(12).startswith(MAGIC),f
    return ImageOps.exif_transpose(Image.open(R+f)).convert(mode)
def out(name,im,ws,q=70):
    M[name]={'ws':[],'ar':list(im.size)}
    for w in ws:
        w=min(w,im.width); h=round(im.height*w/im.width)
        r=im.resize((w,h),Image.LANCZOS).filter(ImageFilter.UnsharpMask(radius=0.8,percent=40,threshold=2))
        r.save(f'foto/{name}-{w}.webp','WEBP',quality=q,method=6)
        if w not in M[name]['ws']: M[name]['ws'].append(w)
def ratio(im,ar,cx=.5,cy=.5):
    W,H=im.size
    if W/H>ar: nw=round(H*ar); x=round((W-nw)*cx); return im.crop((x,0,x+nw,H))
    nh=round(W/ar); y=round((H-nh)*cy); return im.crop((0,y,W,y+nh))
h=ImageOps.mirror(load('26078.jpg'))
out('hero-d',h,[960,1280,1600,1920],q=66)
out('hero-m',h.crop((860,0,1600,1280)),[420,560,740],q=58)
out('krew',ratio(load('2149404714.jpg'),4/3,.6),[480,800,1000],q=70)
out('kroplowka',ratio(load('witaMI-scaled.jpg'),4/5,.5,.62),[480,800,1100],q=70)
out('probka',ratio(load('krew2-scaled.jpg'),4/5,.5,.2),[480,800,1100],q=70)
out('lab',ratio(load('999.jpg'),4/5,.5,.4),[480,669],q=72)
out('druzyna',ratio(load('5210.jpg'),3/2),[640,1000,1400],q=70)
out('biuro',ratio(load('327312-P9JRLI-8-1.jpg'),3/2),[640,1000],q=70)
lg=load('stickylogo.png','RGBA'); lg=lg.crop(lg.getchannel('A').getbbox())
z=lg.crop((0,0,round(lg.width*0.3),lg.height)); z=z.crop(z.getchannel('A').getbbox())
s=round(max(z.size)*1.15); c=Image.new('RGBA',(s,s),(255,255,255,255)); c.alpha_composite(z,((s-z.width)//2,(s-z.height)//2))
for hh in (48,96,180,192): c.resize((hh,hh),Image.LANCZOS).save(f'foto/ikona-{hh}.png',optimize=True)
json.dump(M,open('meta.json','w'))
print(M)
