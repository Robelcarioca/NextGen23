// ════════════════════════════════════════════════════════
// NEXT-GEN CREATIVE — SUPABASE CONFIGURATION
// ════════════════════════════════════════════════════════

// Supabase Configuration
const SUPABASE_URL = window.location.hostname === 'localhost' 
  ? 'https://YOUR-PROJECT.supabase.co'
  : (window.__SUPABASE_URL__ || 'https://YOUR-PROJECT.supabase.co');

const SUPABASE_KEY = window.location.hostname === 'localhost'
  ? 'YOUR-ANON-KEY'
  : (window.__SUPABASE_KEY__ || 'YOUR-ANON-KEY');

// Initialize Supabase
let supabase = null;

function initSupabase() {
  console.log('Initializing Supabase...');
  
  if (!SUPABASE_URL || SUPABASE_URL.includes('YOUR-PROJECT')) {
    console.warn('⚠️ Supabase URL not configured!');
    console.warn('Please set SUPABASE_URL environment variable');
    return false;
  }
  
  if (!SUPABASE_KEY || SUPABASE_KEY.includes('YOUR-ANON-KEY')) {
    console.warn('⚠️ Supabase Key not configured!');
    console.warn('Please set SUPABASE_KEY environment variable');
    return false;
  }
  
  // Create Supabase client
  supabase = {
    url: SUPABASE_URL,
    key: SUPABASE_KEY
  };
  
  console.log('✅ Supabase configured: ' + SUPABASE_URL.split('/')[2]);
  return true;
}

// Fetch data from Supabase
async function fetchSupabaseData(table) {
  if (!supabase) {
    console.error('Supabase not initialized');
    return null;
  }
  
  try {
    const response = await fetch(
      `${SUPABASE_URL}/rest/v1/${table}`,
      {
        method: 'GET',
        headers: {
          'apikey': SUPABASE_KEY,
          'Authorization': `Bearer ${SUPABASE_KEY}`,
          'Content-Type': 'application/json'
        }
      }
    );
    
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching from Supabase:', error);
    return null;
  }
}

// Save data to Supabase
async function saveToSupabase(table, data) {
  if (!supabase) {
    console.error('Supabase not initialized');
    return false;
  }
  
  try {
    // Check if record exists (assuming 'id' field)
    const existingResponse = await fetch(
      `${SUPABASE_URL}/rest/v1/${table}?id=eq.${data.id}`,
      {
        method: 'GET',
        headers: {
          'apikey': SUPABASE_KEY,
          'Authorization': `Bearer ${SUPABASE_KEY}`
        }
      }
    );
    
    const existing = await existingResponse.json();
    const method = existing.length > 0 ? 'PATCH' : 'POST';
    
    const response = await fetch(
      `${SUPABASE_URL}/rest/v1/${table}`,
      {
        method: method,
        headers: {
          'apikey': SUPABASE_KEY,
          'Authorization': `Bearer ${SUPABASE_KEY}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      }
    );
    
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    console.log('✅ Data saved to Supabase');
    return true;
  } catch (error) {
    console.error('Error saving to Supabase:', error);
    return false;
  }
}

// Delete from Supabase
async function deleteFromSupabase(table, id) {
  if (!supabase) {
    console.error('Supabase not initialized');
    return false;
  }
  
  try {
    const response = await fetch(
      `${SUPABASE_URL}/rest/v1/${table}?id=eq.${id}`,
      {
        method: 'DELETE',
        headers: {
          'apikey': SUPABASE_KEY,
          'Authorization': `Bearer ${SUPABASE_KEY}`
        }
      }
    );
    
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    console.log('✅ Data deleted from Supabase');
    return true;
  } catch (error) {
    console.error('Error deleting from Supabase:', error);
    return false;
  }
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
  const isConfigured = initSupabase();
  
  if (!isConfigured) {
    console.warn('⚠️ IMPORTANT: Configure Supabase!');
    console.warn('');
    console.warn('Option 1 (Recommended): Set environment variables');
    console.warn('  SUPABASE_URL=https://YOUR-PROJECT.supabase.co');
    console.warn('  SUPABASE_KEY=YOUR-ANON-KEY');
    console.warn('');
    console.warn('Option 2: Edit supabase-config.js');
    console.warn('  Replace YOUR-PROJECT with your Supabase project ID');
    console.warn('  Replace YOUR-ANON-KEY with your anon key');
    console.warn('');
    console.warn('Get these from Supabase Project Settings → API');
  } else {
    console.log('✅ Supabase configured and ready');
  }
});

// ════════════════════════════════════════════════════════
// SUPABASE SETUP INSTRUCTIONS
// ════════════════════════════════════════════════════════
//
// Step 1: Create Supabase Project
//   - Go to https://supabase.com
//   - Click "New Project"
//   - Choose your region
//   - Set database password
//   - Wait for project to initialize
//
// Step 2: Create Tables
//   - Go to SQL Editor
//   - Create these tables:
//
//   CREATE TABLE site_config (
//     id SERIAL PRIMARY KEY,
//     hero_title TEXT,
//     hero_subtitle TEXT,
//     about_text TEXT,
//     contact_email TEXT,
//     updated_at TIMESTAMP DEFAULT NOW()
//   );
//
//   CREATE TABLE designs (
//     id SERIAL PRIMARY KEY,
//     title TEXT NOT NULL,
//     description TEXT,
//     category TEXT,
//     image_url TEXT,
//     featured BOOLEAN DEFAULT FALSE,
//     created_at TIMESTAMP DEFAULT NOW()
//   );
//
// Step 3: Get Your Credentials
//   - Go to Project Settings → API
//   - Copy: Project URL (SUPABASE_URL)
//   - Copy: anon public key (SUPABASE_KEY)
//
// Step 4: Set Environment Variables
//   - Vercel Project Settings → Environment Variables
//   - Add: SUPABASE_URL
//   - Add: SUPABASE_KEY
//   - Redeploy
//
// Step 5: Enable CORS
//   - Supabase Console → Auth → Policies
//   - Add your Vercel domain to allowed URLs
//
// ════════════════════════════════════════════════════════
