#!/bin/bash

# 🚀 Razorpay Environment Setup Script

echo "=================================="
echo "🚀 Setting up Razorpay Environment"
echo "=================================="
echo ""

# Check if .env.local already exists
if [ -f ".env.local" ]; then
    echo "⚠️  .env.local already exists!"
    echo "Do you want to overwrite it? (y/N)"
    read -r response
    if [[ ! "$response" =~ ^([yY][eE][sS]|[yY])$ ]]; then
        echo "❌ Setup cancelled"
        exit 0
    fi
fi

# Create .env.local file
cat > .env.local << 'EOF'
# Razorpay Test Credentials
# Get these from https://dashboard.razorpay.com/app/keys

# Server-side credentials (used in API routes)
RAZORPAY_KEY_ID=rzp_test_RYSNG6FH2SYRQU
RAZORPAY_KEY_SECRET=mwCCfgmXJ0dlME8C4VUs5Alc

# Client-side key (used in frontend)
NEXT_PUBLIC_RAZORPAY_KEY_ID=rzp_test_RYSNG6FH2SYRQU

# Test mode flag
NEXT_PUBLIC_TEST_MODE=true
TEST_MODE=true

# Supabase credentials (update these with your values)
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url_here
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key_here
EOF

echo "✅ Created .env.local file"
echo ""
echo "📋 Next steps:"
echo "1. Review .env.local and update Supabase credentials if needed"
echo "2. Restart your development server:"
echo "   npm run dev"
echo "3. Test payment at: http://localhost:3000/checkout"
echo ""
echo "🧪 Test card details:"
echo "   Card: 4111 1111 1111 1111"
echo "   CVV: Any 3 digits"
echo "   Expiry: Any future date"
echo ""
echo "✅ Setup complete!"

