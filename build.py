import json
M = json.load(open('meta.json'))
s = open('src.html', encoding='utf-8').read()
def ss(n): return ', '.join(f'foto/{n}-{w}.webp {w}w' for w in M[n]['ws'])
def img(n, sizes, alt, mid=None):
    ws = M[n]['ws']; w, h = M[n]['ar']; mid = mid or ws[min(1, len(ws)-1)]; H = round(h*mid/w)
    return f'<img data-src="foto/{n}-{mid}.webp" data-srcset="{ss(n)}" sizes="{sizes}" width="{mid}" height="{H}" decoding="async" alt="{alt}">'
TEL = '<svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"><path d="M5 3h4l2 5-2.5 1.5a11 11 0 0 0 6 6L16 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 5a2 2 0 0 1 2-2z"/></svg>'
d = M['hero-d']; m = M['hero-m']
HERO = (f'<picture><source media="(max-width:760px)" srcset="{ss("hero-m")}" sizes="100vw" width="640" height="{round(m["ar"][1]*640/m["ar"][0])}">'
        f'<img src="foto/hero-d-1600.webp" srcset="{ss("hero-d")}" sizes="100vw" width="1600" height="{round(d["ar"][1]*1600/d["ar"][0])}" fetchpriority="high" alt="Pielęgniarka bada puls starszego pacjenta podczas wizyty domowej"></picture>')
PRE = (f'<link rel="preload" as="image" type="image/webp" media="(max-width:760px)" imagesrcset="{ss("hero-m")}" imagesizes="100vw" fetchpriority="high">\n'
       f'<link rel="preload" as="image" type="image/webp" media="(min-width:761px)" imagesrcset="{ss("hero-d")}" imagesizes="100vw" fetchpriority="high">')
rep = {'@@PRELOAD@@': PRE, '@@HERO@@': HERO, '@@TEL@@': TEL,
 '@@KREW@@': img('krew','(max-width:899px) 92vw, 46vw','Pobranie krwi z żyły do probówki'),
 '@@KROP1@@': img('kroplowka','(max-width:899px) 92vw, 46vw','Dłoń pacjenta z założonym wenflonem do kroplówki'),
 '@@PROBKA@@': img('probka','(max-width:979px) 92vw, 40vw','Probówka z pobraną krwią gotowa do badania'),
 '@@DRUZYNA@@': img('druzyna','(max-width:979px) 92vw, 46vw','Zespół pracowników w biurze firmy'),
 '@@BADGE_STYLE@@': open('badge_style.part', encoding='utf-8').read().replace('<style>', '').replace('</style>', ''),
 '@@BADGE@@': open('badge_link.part', encoding='utf-8').read().strip()}
for k, v in rep.items(): s = s.replace(k, v)
import re
body=s.index('<body')
from nbsp import sieroty; s=sieroty(s)
assert '@@' not in s and '—' not in s
open('index.html', 'w', encoding='utf-8').write(s)
print(len(s))
