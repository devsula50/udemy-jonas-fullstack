import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://wfmrqtyxiizfnzhanvtv.supabase.co";
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndmbXJxdHl4aWl6Zm56aGFudnR2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTUwODA5MjgsImV4cCI6MjAxMDY1NjkyOH0.XcUlzjDFzI9-lGwG3k990BdjZxlxgmjFwMBUPl4XGIQ'
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
