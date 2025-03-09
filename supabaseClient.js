import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://szwveyosphuzydtlebgg.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InN6d3ZleW9zcGh1enlkdGxlYmdnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjIxMjA2NjAsImV4cCI6MjAzNzY5NjY2MH0.fkaN_7JEqaHaMtxqROuwC_y5T1b1jozUiG9Hi10COKQ'
const supabase = createClient(supabaseUrl, supabaseKey)

export default supabase;
