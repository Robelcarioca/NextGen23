#!/bin/bash

# Fix all Firebase references to Supabase

# Replace in admin/index.html
sed -i 's/Firebase Realtime Database/Supabase PostgreSQL Database/g' admin/index.html
sed -i 's/Firebase DB/Supabase DB/g' admin/index.html
sed -i 's/Firebase not configured/Supabase not configured/g' admin/index.html
sed -i 's/Firebase write error/Supabase write error/g' admin/index.html
sed -i 's/Firebase write failed/Supabase write failed/g' admin/index.html
sed -i 's/Firebase not yet configured/Supabase not yet configured/g' admin/index.html
sed -i 's/firebase-config.js/supabase-config.js/g' admin/index.html

# Replace in index.html
sed -i 's/Firebase/Supabase/g' index.html

echo "✅ All Firebase references replaced with Supabase!"
