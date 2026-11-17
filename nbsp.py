import re
def sieroty(s):
    body = s.index('<body')
    def fix(m):
        return '>' + re.sub(r'(?<=[\s(])([wizaouWIZAOU]) ', lambda k: k.group(1) + '&nbsp;', m.group(1)) + '<'
    return s[:body] + re.sub(r'>([^<]+)<', fix, s[body:])
