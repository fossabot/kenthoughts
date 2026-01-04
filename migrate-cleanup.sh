#!/bin/bash

# Migration cleanup script
# This script helps clean up old Gatsby files after VitePress migration is verified

echo "🧹 VitePress Migration Cleanup Script"
echo "======================================"
echo ""
echo "This will remove old Gatsby-specific files and directories."
echo "Make sure you've tested the VitePress build first!"
echo ""
read -p "Continue? (y/n) " -n 1 -r
echo
if [[ ! $REPLY =~ ^[Yy]$ ]]
then
    echo "Cancelled."
    exit 1
fi

echo ""
echo "Removing old Gatsby files..."

# Remove Gatsby source files
rm -rf src/
echo "✓ Removed src/"

# Remove old content directory (blog content is now in blog/)
rm -rf content/
echo "✓ Removed content/"

# Remove Gatsby config backups
rm -f gatsby-config.ts.backup
echo "✓ Removed gatsby-config.ts.backup"

# Remove tsconfig backup if exists
rm -f tsconfig.json.bak
echo "✓ Cleaned up backups"

echo ""
echo "✅ Cleanup complete!"
echo ""
echo "Next steps:"
echo "1. Run 'npm install' to install VitePress dependencies"
echo "2. Run 'npm run dev' to start the development server"
echo "3. Test your site at http://localhost:5173"
echo "4. Run 'npm run build' to build for production"
