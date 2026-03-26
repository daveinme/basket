import os
import subprocess
import threading
import tkinter as tk
from tkinter import messagebox, ttk
from PIL import Image, ImageTk

def zenity_folder(title):
    r = subprocess.run(['zenity', '--file-selection', '--directory', f'--title={title}'],
                       capture_output=True, text=True)
    return r.stdout.strip() if r.returncode == 0 else ''

def zenity_file(title):
    r = subprocess.run(['zenity', '--file-selection',
                        '--file-filter=Immagini | *.png *.jpg *.jpeg',
                        f'--title={title}'],
                       capture_output=True, text=True)
    return r.stdout.strip() if r.returncode == 0 else ''

PREVIEW_W = 480
PREVIEW_H = 320

# ── Stato ───────────────────────────────────────────────────
state = {
    'src':      '',
    'dest':     '',
    'logo':     '',
    'position': 4,   # 0-8, default centro
    'opacity':  100,
    'logo_img': None,
    'preview_base': None,
}

def scegli_sorgente():
    path = zenity_folder('Cartella sorgente')
    if path:
        var_src.set(path)
        state['src'] = path
        aggiorna_preview()

def scegli_dest():
    path = zenity_folder('Cartella destinazione')
    if path:
        var_dest.set(path)
        state['dest'] = path

def scegli_logo():
    path = zenity_file('Seleziona logo')
    if path:
        var_logo.set(os.path.basename(path))
        state['logo'] = path
        state['logo_img'] = Image.open(path).convert('RGBA')
        aggiorna_preview()

def set_position(idx):
    state['position'] = idx
    for i, btn in enumerate(pos_buttons):
        btn.config(bg='#f05a1a' if i == idx else '#2a2f3a')
    aggiorna_preview()

def on_opacity(val):
    state['opacity'] = int(float(val))
    lbl_opacity.config(text=f'{state["opacity"]}%')
    aggiorna_preview()

def calc_xy(pos, fw, fh, lw, lh, margin=40):
    """Calcola coordinate logo da posizione 0-8 (griglia 3x3)."""
    row, col = divmod(pos, 3)
    if col == 0:   x = margin
    elif col == 1: x = (fw - lw) // 2
    else:          x = fw - lw - margin
    if row == 0:   y = margin
    elif row == 1: y = (fh - lh) // 2
    else:          y = fh - lh - margin
    return x, y

def aggiorna_preview():
    src  = state['src']
    logo = state['logo_img']

    # Base preview: prima foto della sorgente o sfondo nero
    photos = []
    if src:
        photos = [f for f in os.listdir(src) if f.lower().endswith('.jpg')]

    if photos:
        base = Image.open(os.path.join(src, sorted(photos)[0])).convert('RGBA')
    else:
        base = Image.new('RGBA', (6000, 4000), (30, 30, 40, 255))

    # Ridimensiona per preview
    base_prev = base.resize((PREVIEW_W, PREVIEW_H), Image.LANCZOS)

    if logo:
        # Scala logo proporzionalmente alla preview
        scale   = PREVIEW_W / base.width
        lw      = int(logo.width  * scale)
        lh      = int(logo.height * scale)
        logo_sc = logo.resize((lw, lh), Image.LANCZOS)

        # Applica opacità
        if state['opacity'] < 100:
            r, g, b, a = logo_sc.split()
            a = a.point(lambda p: int(p * state['opacity'] / 100))
            logo_sc = Image.merge('RGBA', (r, g, b, a))

        margin_sc = int(40 * scale)
        x, y = calc_xy(state['position'], PREVIEW_W, PREVIEW_H, lw, lh, margin_sc)
        base_prev.paste(logo_sc, (x, y), logo_sc)

    state['preview_base'] = base_prev
    tk_img = ImageTk.PhotoImage(base_prev)
    canvas.image = tk_img
    canvas.create_image(0, 0, anchor='nw', image=tk_img)

def avvia():
    src  = state['src']
    dest = var_dest.get()
    logo = state['logo_img']

    if not src or not dest or not logo:
        messagebox.showwarning('Attenzione', 'Seleziona sorgente, destinazione e logo.')
        return

    photos = [f for f in os.listdir(src) if f.lower().endswith('.jpg')]
    if not photos:
        messagebox.showinfo('Info', 'Nessun JPG trovato nella cartella sorgente.')
        return

    btn_avvia.config(state='disabled')
    progress['maximum'] = len(photos)
    progress['value']   = 0
    lbl_stato.config(text='Avvio...')

    def processo():
        os.makedirs(dest, exist_ok=True)

        # Logo con opacità
        logo_final = logo.copy()
        if state['opacity'] < 100:
            r, g, b, a = logo_final.split()
            a = a.point(lambda p: int(p * state['opacity'] / 100))
            logo_final = Image.merge('RGBA', (r, g, b, a))

        for i, filename in enumerate(sorted(photos), 1):
            img = Image.open(os.path.join(src, filename)).convert('RGBA')
            x, y = calc_xy(state['position'], img.width, img.height,
                           logo_final.width, logo_final.height)
            img.paste(logo_final, (x, y), logo_final)
            img.convert('RGB').save(os.path.join(dest, filename), 'JPEG', quality=95)
            root.after(0, lambda v=i, f=filename: aggiorna_stato(v, f, len(photos)))

        root.after(0, fine)

    threading.Thread(target=processo, daemon=True).start()

def aggiorna_stato(i, filename, total):
    progress['value'] = i
    lbl_stato.config(text=f'[{i}/{total}] {filename}')

def fine():
    lbl_stato.config(text='Completato!')
    btn_avvia.config(state='normal')
    messagebox.showinfo('Fatto', f'Foto elaborate:\n{var_dest.get()}')

# ── UI ──────────────────────────────────────────────────────
root = tk.Tk()
root.title('Firma Foto')
root.resizable(False, False)
root.configure(bg='#1a1e26')

FONT   = ('Segoe UI', 10)
FONT_B = ('Segoe UI', 10, 'bold')
PAD    = {'padx': 10, 'pady': 5}

tk.Label(root, text='Firma Foto', font=('Segoe UI', 14, 'bold'),
         bg='#1a1e26', fg='#f05a1a').grid(row=0, column=0, columnspan=4, pady=(14, 8))

# ── Colonna sinistra: controlli ──────────────────────────────
frame_ctrl = tk.Frame(root, bg='#1a1e26')
frame_ctrl.grid(row=1, column=0, sticky='n', padx=(14, 6), pady=4)

def row_input(parent, row, label, var, cmd):
    tk.Label(parent, text=label, font=FONT_B, bg='#1a1e26', fg='#e8eaf0').grid(
        row=row, column=0, sticky='e', **PAD)
    tk.Entry(parent, textvariable=var, width=26, font=FONT, bg='#111318',
             fg='#e8eaf0', insertbackground='white', relief='flat',
             state='readonly').grid(row=row, column=1, **PAD)
    tk.Button(parent, text='Sfoglia', font=FONT, bg='#2a2f3a', fg='#e8eaf0',
              relief='flat', cursor='hand2', command=cmd).grid(row=row, column=2, **PAD)

var_src  = tk.StringVar()
var_dest = tk.StringVar()
var_logo = tk.StringVar()

row_input(frame_ctrl, 0, 'Sorgente:',    var_src,  scegli_sorgente)
row_input(frame_ctrl, 1, 'Destinazione:', var_dest, scegli_dest)
row_input(frame_ctrl, 2, 'Logo:',        var_logo, scegli_logo)

# ── Griglia posizione ────────────────────────────────────────
tk.Label(frame_ctrl, text='Posizione logo:', font=FONT_B,
         bg='#1a1e26', fg='#e8eaf0').grid(row=3, column=0, sticky='e', **PAD)

frame_grid = tk.Frame(frame_ctrl, bg='#1a1e26')
frame_grid.grid(row=3, column=1, pady=6, sticky='w')

pos_buttons = []
for i in range(9):
    r, c = divmod(i, 3)
    btn = tk.Button(frame_grid, width=3, height=1,
                    bg='#f05a1a' if i == 4 else '#2a2f3a',
                    relief='flat', cursor='hand2',
                    command=lambda idx=i: set_position(idx))
    btn.grid(row=r, column=c, padx=2, pady=2)
    pos_buttons.append(btn)

# ── Slider opacità ───────────────────────────────────────────
tk.Label(frame_ctrl, text='Opacità logo:', font=FONT_B,
         bg='#1a1e26', fg='#e8eaf0').grid(row=4, column=0, sticky='e', **PAD)

frame_op = tk.Frame(frame_ctrl, bg='#1a1e26')
frame_op.grid(row=4, column=1, sticky='w', pady=4)

slider = tk.Scale(frame_op, from_=10, to=100, orient='horizontal', length=160,
                  bg='#1a1e26', fg='#e8eaf0', highlightthickness=0,
                  troughcolor='#111318', activebackground='#f05a1a',
                  command=on_opacity, showvalue=False)
slider.set(100)
slider.pack(side='left')
lbl_opacity = tk.Label(frame_op, text='100%', font=FONT, bg='#1a1e26', fg='#f05a1a', width=4)
lbl_opacity.pack(side='left')

# ── Colonna destra: preview ──────────────────────────────────
frame_prev = tk.Frame(root, bg='#111318', bd=1, relief='flat')
frame_prev.grid(row=1, column=1, padx=(6, 14), pady=4, sticky='n')

canvas = tk.Canvas(frame_prev, width=PREVIEW_W, height=PREVIEW_H,
                   bg='#111318', highlightthickness=0)
canvas.pack()
aggiorna_preview()

# ── Progress + bottone ──────────────────────────────────────
frame_bot = tk.Frame(root, bg='#1a1e26')
frame_bot.grid(row=2, column=0, columnspan=2, sticky='ew', padx=14, pady=(4, 14))

style = ttk.Style()
style.theme_use('clam')
style.configure('TProgressbar', troughcolor='#111318', background='#f05a1a', thickness=10)

progress = ttk.Progressbar(frame_bot, style='TProgressbar', mode='determinate')
progress.pack(fill='x', pady=(0, 4))

lbl_stato = tk.Label(frame_bot, text='', font=('Segoe UI', 9),
                     bg='#1a1e26', fg='#8891a4')
lbl_stato.pack()

btn_avvia = tk.Button(frame_bot, text='Avvia elaborazione', font=FONT_B,
                      bg='#f05a1a', fg='#fff', relief='flat',
                      cursor='hand2', padx=20, pady=7, command=avvia)
btn_avvia.pack(pady=(6, 0))

root.mainloop()
