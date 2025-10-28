# Nutri Nest Images Directory

This directory contains all the images used in the Nutri Nest application.

## Folder Structure

```
public/images/
├── logo/                    # Brand logos and icons
│   ├── logo.png            # Main Nutri Nest logo
│   ├── logo-icon.png       # Logo icon only
│   └── favicon.ico         # Website favicon
├── products/               # Product images
│   ├── orange-gummy.png  # Orange gummies product image
│   ├── pomogranate-gummy.png # Pomegranate gummies product image
│   └── combo-pack.png      # Combo pack product image
├── hero/                   # Hero section images
│   ├── hero-bg.jpg         # Hero background image
│   └── hero-kids.jpg       # Kids with gummies image
├── testimonials/           # Customer testimonial images
│   ├── customer-1.jpg      # Customer profile images
│   ├── customer-2.jpg
│   └── customer-3.jpg
├── icons/                  # UI icons and graphics
│   ├── eye-icon.svg        # Eye health icon
│   ├── shield-icon.svg     # Protection icon
│   ├── leaf-icon.svg       # Natural/vegan icon
│   └── award-icon.svg      # Quality icon
└── README.md              # This file
```

## Image Guidelines

### Logo Images
- **Format**: PNG with transparent background
- **Size**: 
  - Main logo: 400x200px
  - Icon: 64x64px
  - Favicon: 32x32px
- **Style**: Consistent with brand colors (#FB923C, #F97316, #EC4899)

### Product Images
- **Format**: JPG or PNG
- **Size**: 800x800px (square format)
- **Style**: Clean, professional product photography
- **Background**: White or transparent

### Hero Images
- **Format**: JPG
- **Size**: 1920x1080px (16:9 aspect ratio)
- **Style**: Bright, cheerful, family-focused
- **Content**: Kids enjoying healthy snacks, family moments

### Testimonial Images
- **Format**: JPG or PNG
- **Size**: 200x200px (square format)
- **Style**: Professional headshots or family photos
- **Background**: Neutral or brand-colored

### Icons
- **Format**: SVG (preferred) or PNG
- **Size**: 64x64px
- **Style**: Simple, clean, consistent with brand
- **Colors**: Use brand color palette

## Usage in Code

Images are referenced in the code using the `/images/` path:

```jsx
// Example usage
<img src="/images/logo/logo.png" alt="Nutri Nest Logo" />
<img src="/images/products/orange-gummy.png" alt="Orange Gummies" />
```

## Optimization

- Use WebP format for better compression when possible
- Provide fallback JPG/PNG for older browsers
- Optimize images for web (compress without losing quality)
- Use appropriate sizes for different screen densities

## Brand Colors Reference

- **Primary**: #FB923C (Vibrant Orange)
- **Background**: #FFF7ED (Soft Orange Cream)
- **Accent 1**: #F97316 (Deep Orange)
- **Accent 2**: #EC4899 (Pomegranate Pink)
- **Neutral**: #B4B4B4 (Soft Gray)
- **Highlight**: #EF4444 (Red/Pomegranate)
- **Text**: #7C2D12 (Dark Orange Brown)
