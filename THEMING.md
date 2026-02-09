# Tema Sistemi - Login Sayfası

## 🎨 CSS Değişkenleri

Login sayfası artık tamamen CSS değişkenleri ile çalışıyor ve hem **light** hem **dark** tema için hazır.

### Renk Değişkenleri

#### Brand Renkleri (Her iki temada aynı)

```css
--brand-yellow: #f4e500; /* Ana sarı renk */
--brand-yellow-hover: #e0d400; /* Hover durumu */
--brand-yellow-dark: #c9bd00; /* Daha koyu varyant */
```

#### Auth Sayfası Renkleri

##### Light Theme

```css
--auth-bg: oklch(1 0 0); /* Beyaz arka plan */
--auth-card-bg: oklch(1 0 0); /* Beyaz kart */
--auth-card-border: oklch(0.95 0 0); /* Açık gri border */
--auth-logo-bg: oklch(0.145 0 0); /* Siyah logo */
--auth-title: oklch(0.145 0 0); /* Koyu başlık */
--auth-subtitle: oklch(0.556 0 0); /* Orta gri alt başlık */
--auth-label: oklch(0.35 0 0); /* Koyu gri label */
--auth-input-bg: oklch(1 0 0); /* Beyaz input */
--auth-input-border: oklch(0.922 0 0); /* Açık gri border */
--auth-input-icon: oklch(0.6 0 0); /* Gri ikonlar */
--auth-input-icon-error: oklch(0.577 0.245 27.325); /* Kırmızı */
--auth-link: oklch(0.556 0 0); /* Gri link */
--auth-link-hover: oklch(0.35 0 0); /* Koyu hover */
--auth-error: oklch(0.577 0.245 27.325); /* Kırmızı hata */
--auth-footer: oklch(0.7 0 0); /* Açık gri footer */
--auth-decorative-opacity: 0.3; /* Dekoratif daireler */
```

##### Dark Theme

```css
--auth-bg: oklch(0.145 0 0); /* Koyu arka plan */
--auth-card-bg: oklch(0.205 0 0); /* Biraz daha açık koyu */
--auth-card-border: oklch(0.269 0 0); /* Hafif border */
--auth-logo-bg: oklch(0.985 0 0); /* Beyaz logo */
--auth-title: oklch(0.985 0 0); /* Beyaz başlık */
--auth-subtitle: oklch(0.708 0 0); /* Açık gri alt başlık */
--auth-label: oklch(0.85 0 0); /* Açık gri label */
--auth-input-bg: oklch(0.25 0 0); /* Koyu input */
--auth-input-border: oklch(0.35 0 0); /* Hafif border */
--auth-input-icon: oklch(0.6 0 0); /* Gri ikonlar */
--auth-input-icon-error: oklch(0.704 0.191 22.216); /* Kırmızı */
--auth-link: oklch(0.708 0 0); /* Açık gri link */
--auth-link-hover: oklch(0.85 0 0); /* Daha açık hover */
--auth-error: oklch(0.704 0.191 22.216); /* Kırmızı hata */
--auth-footer: oklch(0.5 0 0); /* Orta gri footer */
--auth-decorative-opacity: 0.15; /* Daha az belirgin daireler */
```

## 🔧 Kullanım

### Tailwind CSS Sınıfları

Tüm renkler Tailwind utility class'ları olarak kullanılabilir:

```tsx
// Arka plan renkleri
<div className="bg-auth-bg">...</div>
<div className="bg-brand-yellow">...</div>

// Metin renkleri
<h1 className="text-auth-title">...</h1>
<p className="text-auth-subtitle">...</p>

// Border renkleri
<div className="border-auth-card-border">...</div>

// Hover durumları
<button className="bg-brand-yellow hover:bg-brand-yellow-hover">...</button>
<a className="text-auth-link hover:text-auth-link-hover">...</a>
```

### Opacity için Style Prop

Opacity değerleri CSS değişkeni olarak tanımlandığı için inline style kullanılmalı:

```tsx
<div
  className="bg-brand-yellow"
  style={{ opacity: "var(--auth-decorative-opacity)" }}
/>
```

## 🌓 Dark Mode Testi

Dark mode'u test etmek için:

1. **Manuel olarak**: HTML elementine `dark` class'ı ekleyin

   ```html
   <html class="dark"></html>
   ```

2. **next-themes ile**: Projenizde zaten `next-themes` kurulu

   ```tsx
   import { useTheme } from "next-themes";

   function ThemeToggle() {
     const { theme, setTheme } = useTheme();

     return (
       <button onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
         Toggle Theme
       </button>
     );
   }
   ```

## 📝 Yeni Renk Ekleme

Yeni bir renk eklemek için:

1. **globals.css** dosyasında tanımlayın:

   ```css
   :root {
     --my-custom-color: #hexcode;
   }

   .dark {
     --my-custom-color: #hexcode-dark;
   }
   ```

2. **@theme inline** bloğuna ekleyin:

   ```css
   @theme inline {
     --color-my-custom-color: var(--my-custom-color);
   }
   ```

3. **Tailwind'de kullanın**:
   ```tsx
   <div className="bg-my-custom-color text-my-custom-color">...</div>
   ```

## ✅ Avantajlar

- ✨ **Tek kaynak**: Tüm renkler tek bir yerde tanımlanıyor
- 🌓 **Dark mode ready**: Her iki tema için hazır
- 🔄 **Kolay güncelleme**: Bir değişiklik tüm sayfayı etkiliyor
- 🎨 **Tutarlılık**: Tüm componentler aynı renkleri kullanıyor
- 📱 **Responsive**: Tema değişikliği otomatik uygulanıyor
- 🚀 **Performans**: CSS değişkenleri tarayıcı tarafından optimize ediliyor

## 🎯 Kullanılan Componentler

### Login Page (`src/app/(auth)/login/page.tsx`)

- `bg-auth-bg` - Arka plan
- `bg-brand-yellow` - Dekoratif daireler
- `bg-auth-card-bg` - Kart arka planı
- `border-auth-card-border` - Kart border
- `bg-auth-logo-bg` - Logo arka planı
- `text-auth-title` - Başlık
- `text-auth-subtitle` - Alt başlık
- `text-auth-footer` - Footer metni

### Login Form (`src/features/auth/components/login-form.tsx`)

- `text-auth-label` - Form label'ları
- `text-auth-input-icon` - İkonlar
- `text-auth-input-icon-error` - Hata ikonu (kilit)
- `bg-auth-input-bg` - Input arka planı
- `border-auth-input-border` - Input border
- `text-auth-link` - Linkler
- `text-auth-link-hover` - Link hover
- `text-auth-error` - Hata mesajları
- `bg-brand-yellow` - Login butonu
- `bg-brand-yellow-hover` - Buton hover

## 🔍 Lint Uyarıları

CSS dosyasındaki lint uyarıları (`@custom-variant`, `@theme`, `@apply`) Tailwind CSS 4'ün özel direktifleridir ve normal davranıştır. Bunlar hataya sebep olmaz.
