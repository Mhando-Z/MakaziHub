import { createClient } from "@supabase/supabase-js";
const supabaseUrl = "https://azbvtbwolxnqjttznnhe.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImF6YnZ0YndvbHhucWp0dHpubmhlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDUwNjQzNzEsImV4cCI6MjA2MDY0MDM3MX0.BY4F-JP_etYR_ISGz0yPO-LmLrG6nMeoXzsiHxocaug";

const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
