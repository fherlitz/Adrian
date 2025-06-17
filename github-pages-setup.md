# GitHub Pages Deployment Guide

## 🚀 Setting Up GitHub Pages for Your Adrian Website

### Prerequisites
- ✅ GitHub account (you have this)
- ✅ Repository: `git@github.com:fherlitz/Adrian.git`
- ✅ Domain registered in Cloudflare

## Step 1: Prepare Your Repository

### Check Your Repository Structure
Your repository should have these files in the root:
```
/
├── index.html          ✅ (your main page)
├── styles.css          ✅
├── script.js          ✅
├── imprint.html       ✅
├── fotos/             ✅ (your images folder)
├── desktop.mp4        ✅
├── mobile.mp4         ✅
└── README.md          (optional)
```

### Push Your Files (if not already done)
```bash
git add .
git commit -m "Prepare for GitHub Pages deployment"
git push origin main
```

## Step 2: Enable GitHub Pages

1. **Go to your repository:** https://github.com/fherlitz/Adrian
2. **Settings tab** → Scroll down to "Pages" section
3. **Source:** Select "Deploy from a branch"
4. **Branch:** Select `main` (or `master`)
5. **Folder:** Select `/ (root)`
6. **Click "Save"**

Your site will be available at: `https://fherlitz.github.io/Adrian`

## Step 3: Configure Custom Domain

### Option A: Using Your Existing Cloudflare Domain

1. **In GitHub Repository:**
   - Go to Settings → Pages
   - In "Custom domain" field, enter your domain: `yourdomain.com`
   - Check "Enforce HTTPS" (after DNS is set up)

2. **In Cloudflare DNS:**
   - Go to Cloudflare Dashboard → DNS
   - Delete existing A records for your root domain
   - Add these GitHub Pages A records:
   ```
   Type: A, Name: @, Content: 185.199.108.153
   Type: A, Name: @, Content: 185.199.109.153  
   Type: A, Name: @, Content: 185.199.110.153
   Type: A, Name: @, Content: 185.199.111.153
   ```
   - Add CNAME for www:
   ```
   Type: CNAME, Name: www, Content: fherlitz.github.io
   ```

### Option B: Using a Subdomain (if you want to keep main domain elsewhere)

1. **Create subdomain** (e.g., `adrian.yourdomain.com`):
   ```
   Type: CNAME, Name: adrian, Content: fherlitz.github.io
   ```

2. **In GitHub Pages settings:**
   - Custom domain: `adrian.yourdomain.com`

## Step 4: SSL Configuration

GitHub Pages automatically provides SSL certificates for custom domains.

**To verify SSL is working:**
1. Wait 10-15 minutes after DNS setup
2. Check "Enforce HTTPS" in GitHub Pages settings
3. Visit your site with `https://yourdomain.com`
4. Test at: https://www.ssllabs.com/ssltest/

## Step 5: Email Setup (Cloudflare Email Routing)

Even though you're hosting on GitHub, you can still use Cloudflare for email:

1. **Cloudflare Dashboard → Email → Email Routing**
2. **Enable Email Routing**
3. **Add destination:** Your Gmail address
4. **Create aliases:**
   ```
   contact@yourdomain.com → your@gmail.com
   info@yourdomain.com → your@gmail.com
   ```

## Step 6: Configure Gmail (Same as Before)

1. **Gmail Settings → Accounts and Import**
2. **"Send mail as" → Add another email address**
3. **Add:** `contact@yourdomain.com`
4. **Choose:** "Send through Gmail" (easiest option)

## 🔧 GitHub Actions for Auto-Deploy (Optional)

Create `.github/workflows/deploy.yml` for automatic deployment:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v3
    
    - name: Setup Pages
      uses: actions/configure-pages@v3
      
    - name: Upload artifact
      uses: actions/upload-pages-artifact@v2
      with:
        path: '.'
        
    - name: Deploy to GitHub Pages
      id: deployment
      uses: actions/deploy-pages@v2
```

## 📋 Deployment Checklist

### Repository Setup:
- [ ] All files committed and pushed to main branch
- [ ] Repository is public (required for free GitHub Pages)
- [ ] index.html is in root directory

### GitHub Pages Setup:
- [ ] Pages enabled in repository settings
- [ ] Source set to "main" branch, "/ (root)" folder
- [ ] Custom domain configured
- [ ] HTTPS enforcement enabled (after DNS setup)

### DNS Configuration:
- [ ] A records pointing to GitHub Pages IPs
- [ ] CNAME record for www subdomain
- [ ] DNS propagation complete (check with dnschecker.org)

### SSL & Security:
- [ ] HTTPS working (https://yourdomain.com)
- [ ] SSL test passed (ssllabs.com)
- [ ] Mixed content issues resolved

### Email Setup:
- [ ] Cloudflare Email Routing enabled
- [ ] Gmail configured to send from domain
- [ ] Test emails sent and received

## 🎯 Update Your Contact Form

After email setup, update the contact form destination:

```javascript
// In script.js, line ~107:
to_email: "contact@yourdomain.com" // Update from fherlitz@outlook.com
```

## 💡 Advantages of GitHub Pages

1. **Free hosting** for public repositories
2. **Automatic SSL** certificates
3. **Git-based deployment** (push to deploy)
4. **Custom domains** supported
5. **Good performance** with CDN
6. **Version control** built-in

## 🆘 Common Issues & Solutions

**Site not updating:**
- Check Actions tab for build status
- Clear browser cache
- Wait up to 10 minutes for changes

**Custom domain not working:**
- Verify DNS records are correct
- Check DNS propagation (dnschecker.org)
- Ensure HTTPS is enforced after DNS setup

**SSL certificate pending:**
- Wait 24 hours for automatic certificate
- Temporarily disable HTTPS enforcement
- Re-enable after certificate is issued

**Repository must be public:**
- GitHub Pages requires public repo for free tier
- Or upgrade to GitHub Pro for private repos

## 🔄 Updating Your Site

Simple workflow for updates:
1. Edit files locally
2. `git add .`
3. `git commit -m "Update website"`
4. `git push origin main`
5. GitHub automatically deploys changes

## 📞 Resources

- **GitHub Pages Docs:** https://docs.github.com/en/pages
- **DNS Checker:** https://dnschecker.org/
- **SSL Test:** https://www.ssllabs.com/ssltest/
- **GitHub Status:** https://githubstatus.com/ 