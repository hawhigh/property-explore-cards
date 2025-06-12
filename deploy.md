
# Villa Lucilla - TinyHost Deployment Guide

## Build Instructions

1. Install dependencies:
```bash
npm install
```

2. Build the application:
```bash
npm run build
```

3. The build creates a `dist` folder with all static files

## TinyHost Deployment

1. **Zip the contents** of the `dist` folder (not the folder itself)
2. **Upload to TinyHost** via their file manager
3. **Configure domain** `villalucilla.eu` in TinyHost control panel
4. **Set document root** to the uploaded files location

## Important Files Included

- `_redirects` - For Netlify-style hosting (if supported)
- `.htaccess` - For Apache servers (most common for shared hosting)

## Domain Configuration

Point your `villalucilla.eu` domain to TinyHost nameservers or update DNS records as provided by TinyHost.

## Testing

After deployment, test these URLs:
- https://villalucilla.eu (main page)
- https://villalucilla.eu/single (Villa Lucilla showcase)
- https://villalucilla.eu/dashboard (user dashboard)

All should work without 404 errors thanks to the routing configuration.
