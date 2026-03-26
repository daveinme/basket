from PIL import Image
import os

SRC  = '/home/daveinme/Scrivania/baskkk/done/DSC01399.jpg'
DEST = '/home/daveinme/Scrivania/baskkk/done/firma/DSC01399.jpg'
LOGO = '/home/daveinme/Documenti/Vscode/sitobasket/LOGO BASKET_ORI.png'

os.makedirs(os.path.dirname(DEST), exist_ok=True)

img  = Image.open(SRC).convert('RGBA')
logo = Image.open(LOGO).convert('RGBA')

x = (img.width  - logo.width)  // 2
y = (img.height - logo.height) // 2

img.paste(logo, (x, y), logo)
img.convert('RGB').save(DEST, 'JPEG', quality=95)
print('OK ->', DEST)
