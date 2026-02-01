# 🚀 Deployment Checklist

## Pre-Deployment

### Backend

- [ ] `.env` file configured with IBM credentials
- [ ] Dependencies installed (`npm install`)
- [ ] Port 5000 is available
- [ ] `uploads/` directory exists and is writable
- [ ] Test backend with: `curl http://localhost:5000`

### Frontend

- [ ] Dependencies installed (`npm install`)
- [ ] `.env` configured with correct API URL
- [ ] Build tested (`npm run build`)
- [ ] Preview tested (`npm run preview`)

## Local Testing

- [ ] Backend starts without errors
- [ ] Frontend starts without errors
- [ ] Backend status shows "Online" in UI
- [ ] Demo mode works (Good Fit & High Risk scenarios)
- [ ] Toggle "Use Real AI Analysis" works
- [ ] File upload accepts PDF files
- [ ] Real analysis completes successfully
- [ ] Results display correctly
- [ ] History modal shows entries
- [ ] Settings modal opens
- [ ] Profile modal opens

## Connection Tests

Run `test-connection.html` and verify:

- [ ] Test 1: Backend Server Status - PASS
- [ ] Test 2: CORS Configuration - PASS
- [ ] Test 3: Analysis API Endpoint - PASS

## Production Deployment

### Backend Deployment (e.g., Railway, Render, Heroku)

1. Set environment variables:

```
IBM_API_KEY=...
IBM_PROJECT_ID=...
IBM_URL=...
PORT=5000
```

2. Deploy commands:

```bash
cd server
npm install --production
npm start
```

3. Note your backend URL (e.g., https://your-app.railway.app)

### Frontend Deployment (e.g., Vercel, Netlify)

1. Update `frontend/.env`:

```env
VITE_API_URL=https://your-backend-url.com
```

2. Build:

```bash
cd frontend
npm run build
```

3. Deploy `dist/` folder

4. Configure environment variable in hosting:

```
VITE_API_URL=https://your-backend-url.com
```

## Post-Deployment Tests

- [ ] Frontend loads without errors
- [ ] Backend API is reachable from frontend
- [ ] CORS headers are correct
- [ ] Demo mode works
- [ ] Real file upload works
- [ ] IBM watsonx integration works
- [ ] All modals function properly
- [ ] Mobile responsive design works

## Security Checklist

- [ ] `.env` files not committed to git
- [ ] API keys are environment variables only
- [ ] CORS configured for production domains
- [ ] File upload size limits enforced
- [ ] Uploaded files are cleaned up
- [ ] No sensitive data in frontend code

## Performance Checks

- [ ] Frontend bundle size reasonable
- [ ] Backend response time < 5s
- [ ] Images/assets optimized
- [ ] Loading states shown during processing

## Documentation

- [ ] README.md is up to date
- [ ] SETUP.md is accurate
- [ ] API endpoints documented
- [ ] Environment variables listed

## Monitoring

- [ ] Backend health endpoint accessible
- [ ] Error logging configured
- [ ] Usage analytics (optional)

## Rollback Plan

- [ ] Git tag created for this version
- [ ] Previous version URL saved
- [ ] Database backup if applicable

---

## Quick Production URLs Template

```
Production Frontend: https://_____.vercel.app
Production Backend:  https://_____.railway.app
Health Check:        https://_____.railway.app/

Test with:
curl https://_____.railway.app
```

## Common Issues

### CORS Error in Production

- Add production frontend URL to CORS whitelist in server.js

```javascript
app.use(
  cors({
    origin: ["https://your-frontend.vercel.app"],
  }),
);
```

### Environment Variables Not Loading

- Ensure VITE\_ prefix for frontend vars
- Rebuild after changing .env
- Check hosting platform's environment config

### File Upload Fails

- Check server disk space
- Verify write permissions on uploads/
- Confirm file size limits

### IBM API Errors

- Verify credentials are correct
- Check IBM account status
- Ensure project ID matches
- Review IBM API quotas

---

✅ **Ready to Deploy!**

Follow this checklist step by step to ensure a smooth deployment.
