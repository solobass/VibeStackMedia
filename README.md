# Vibe Stack Media

Media company for Prompt 'Vibe' Coding

## Setup

1. Install dependencies:
```bash
npm install
```

2. Run development server:
```bash
npm run dev
```

The app will run on `http://localhost:5000`

## Deployment to Vercel

### Initial Setup

1. Install Vercel CLI (if not already installed):
```bash
npm i -g vercel
```

2. Login to Vercel:
```bash
vercel login
```

3. Deploy to Vercel:
```bash
vercel
```

Follow the prompts to link your project.

### Connecting Your Namecheap Domain

1. **In Vercel Dashboard:**
   - Go to your project settings
   - Navigate to "Domains"
   - Add your domain: `vibestackmedia.com` (and `www.vibestackmedia.com` if you want both)

2. **In Namecheap:**
   - Log into your Namecheap account
   - Go to Domain List → Manage for `vibestackmedia.com`
   - Navigate to "Advanced DNS"
   - Add/Update the following DNS records:

   **For the root domain (vibestackmedia.com):**
   - Type: `A Record`
   - Host: `@`
   - Value: `76.76.21.21` (Vercel's IP - verify this is current in Vercel docs)
   - TTL: Automatic

   **For www subdomain (www.vibestackmedia.com):**
   - Type: `CNAME Record`
   - Host: `www`
   - Value: `cname.vercel-dns.com`
   - TTL: Automatic

   **Alternative (Recommended by Vercel):**
   - You can also use Vercel's nameservers instead:
     - In Namecheap: Change nameservers to:
       - `ns1.vercel-dns.com`
       - `ns2.vercel-dns.com`
   - Then manage DNS entirely through Vercel dashboard

3. **Wait for DNS Propagation:**
   - DNS changes can take 24-48 hours to propagate
   - You can check status in Vercel dashboard

4. **Verify SSL:**
   - Vercel automatically provisions SSL certificates via Let's Encrypt
   - This happens automatically once DNS is configured correctly

## Git Workflow

This project uses Git for version control. After making changes:

```bash
git add .
git commit -m "Your commit message"
git push
```

Vercel will automatically deploy when you push to your main/master branch (if auto-deploy is enabled).

