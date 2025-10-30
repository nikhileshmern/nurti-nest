#!/usr/bin/env node

/**
 * Supabase Configuration Verification Script
 * 
 * This script verifies that Supabase is properly configured
 * and all required tables exist.
 * 
 * Usage: node verify-supabase.js
 */

const https = require('https');
const fs = require('fs');
const path = require('path');

// Simple .env.local parser
function loadEnv() {
  const envPath = path.join(__dirname, '.env.local');
  if (!fs.existsSync(envPath)) {
    return {};
  }
  
  const envFile = fs.readFileSync(envPath, 'utf8');
  const envVars = {};
  
  envFile.split('\n').forEach(line => {
    line = line.trim();
    if (line && !line.startsWith('#')) {
      const [key, ...valueParts] = line.split('=');
      if (key && valueParts.length > 0) {
        envVars[key.trim()] = valueParts.join('=').trim();
      }
    }
  });
  
  return envVars;
}

const env = loadEnv();

const SUPABASE_URL = env.NEXT_PUBLIC_SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_ANON_KEY = env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const SUPABASE_SERVICE_KEY = env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY;

console.log('╔════════════════════════════════════════════════════╗');
console.log('║   SUPABASE CONFIGURATION VERIFICATION SCRIPT    ║');
console.log('╚════════════════════════════════════════════════════╝');
console.log('');

// Check environment variables
console.log('📋 Checking Environment Variables...\n');

const checks = {
  url: !!SUPABASE_URL && !SUPABASE_URL.includes('your-project'),
  anonKey: !!SUPABASE_ANON_KEY && SUPABASE_ANON_KEY.length > 50,
  serviceKey: !!SUPABASE_SERVICE_KEY && SUPABASE_SERVICE_KEY.length > 50,
};

if (checks.url) {
  console.log('✅ NEXT_PUBLIC_SUPABASE_URL: Configured');
  console.log(`   URL: ${SUPABASE_URL}`);
} else {
  console.log('❌ NEXT_PUBLIC_SUPABASE_URL: Missing or invalid');
  console.log('   Please set in .env.local');
}

if (checks.anonKey) {
  console.log('✅ NEXT_PUBLIC_SUPABASE_ANON_KEY: Configured');
  console.log(`   Key: ${SUPABASE_ANON_KEY.substring(0, 20)}...`);
} else {
  console.log('❌ NEXT_PUBLIC_SUPABASE_ANON_KEY: Missing or invalid');
  console.log('   Please set in .env.local');
}

if (checks.serviceKey) {
  console.log('✅ SUPABASE_SERVICE_ROLE_KEY: Configured');
  console.log(`   Key: ${SUPABASE_SERVICE_KEY.substring(0, 20)}...`);
} else {
  console.log('❌ SUPABASE_SERVICE_ROLE_KEY: Missing or invalid');
  console.log('   Please set in .env.local');
}

console.log('');

// If environment variables are missing, stop here
if (!checks.url || !checks.anonKey || !checks.serviceKey) {
  console.log('❌ Configuration incomplete. Please add the following to .env.local:\n');
  if (!checks.url) {
    console.log('NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co');
  }
  if (!checks.anonKey) {
    console.log('NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here');
  }
  if (!checks.serviceKey) {
    console.log('SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here');
  }
  console.log('');
  console.log('Get these values from: https://supabase.com/dashboard → Project Settings → API');
  process.exit(1);
}

// Test database connection
console.log('🔍 Testing Database Connection...\n');

const requiredTables = ['orders', 'products', 'combos', 'newsletter_subscribers', 'contact_messages'];

async function checkTable(tableName) {
  return new Promise((resolve, reject) => {
    const url = new URL(`${SUPABASE_URL}/rest/v1/${tableName}`);
    url.searchParams.append('select', 'count');
    url.searchParams.append('limit', '1');

    const options = {
      hostname: url.hostname,
      path: url.pathname + url.search,
      method: 'GET',
      headers: {
        'apikey': SUPABASE_ANON_KEY,
        'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
        'Content-Type': 'application/json'
      }
    };

    const req = https.request(options, (res) => {
      let data = '';

      res.on('data', (chunk) => {
        data += chunk;
      });

      res.on('end', () => {
        if (res.statusCode === 200) {
          resolve({ table: tableName, exists: true, status: res.statusCode });
        } else {
          resolve({ table: tableName, exists: false, status: res.statusCode, error: data });
        }
      });
    });

    req.on('error', (error) => {
      reject({ table: tableName, error: error.message });
    });

    req.end();
  });
}

// Check all tables
Promise.all(requiredTables.map(checkTable))
  .then((results) => {
    console.log('📊 Database Tables:\n');
    
    let allTablesExist = true;
    
    results.forEach((result) => {
      if (result.exists) {
        console.log(`✅ Table: ${result.table} - Exists`);
      } else {
        console.log(`❌ Table: ${result.table} - Not Found (Status: ${result.status})`);
        allTablesExist = false;
      }
    });

    console.log('');

    if (allTablesExist) {
      console.log('╔════════════════════════════════════════════════════╗');
      console.log('║           ✅ SUPABASE FULLY CONFIGURED ✅          ║');
      console.log('╚════════════════════════════════════════════════════╝');
      console.log('');
      console.log('Your database is ready to use!');
      console.log('');
      console.log('Next steps:');
      console.log('  1. npm run dev');
      console.log('  2. Go to /checkout and make a test order');
      console.log('  3. Check /orders to see your order history');
      console.log('');
    } else {
      console.log('╔════════════════════════════════════════════════════╗');
      console.log('║        ⚠️  DATABASE SETUP INCOMPLETE ⚠️           ║');
      console.log('╚════════════════════════════════════════════════════╝');
      console.log('');
      console.log('Some tables are missing. Please:');
      console.log('');
      console.log('  1. Go to: https://supabase.com/dashboard');
      console.log('  2. Select your project');
      console.log('  3. Go to SQL Editor');
      console.log('  4. Create a new query');
      console.log('  5. Copy and paste the contents of supabase-schema.sql');
      console.log('  6. Click Run');
      console.log('  7. Run this script again: node verify-supabase.js');
      console.log('');
    }
  })
  .catch((error) => {
    console.error('❌ Error connecting to Supabase:', error);
    console.log('');
    console.log('Troubleshooting:');
    console.log('  1. Check that your Supabase URL is correct');
    console.log('  2. Check that your API keys are valid');
    console.log('  3. Check that your Supabase project is active');
    console.log('  4. Try visiting your Supabase URL in a browser');
    console.log('');
  });

