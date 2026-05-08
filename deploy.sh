#!/bin/bash

# MediCare+ Deployment Script
echo "🚀 MediCare+ Deployment Script"
echo "================================"

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 18+"
    exit 1
fi

# Check Node.js version
NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 18 ]; then
    echo "❌ Node.js version 18+ is required. Current version: $(node -v)"
    exit 1
fi

echo "✅ Node.js version: $(node -v)"

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Build the project
echo "🔨 Building the project..."
npm run build

if [ $? -eq 0 ]; then
    echo "✅ Build successful!"
    echo "📁 Build files are in the 'dist' directory"
    
    # Check if dist folder exists
    if [ -d "dist" ]; then
        echo "📊 Build size: $(du -sh dist | cut -f1)"
        echo "📄 Files created: $(find dist -type f | wc -l)"
    fi
    
    echo ""
    echo "🎯 Choose your deployment method:"
    echo "1. Vercel (Recommended)"
    echo "2. Netlify"
    echo "3. GitHub Pages"
    echo "4. Manual (upload dist folder)"
    echo ""
    echo "📖 Check DEPLOYMENT_GUIDE.md for detailed instructions"
    
else
    echo "❌ Build failed!"
    exit 1
fi
