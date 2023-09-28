import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://wfsnfwlsdfrwtbomfmex.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Indmc25md2xzZGZyd3Rib21mbWV4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTU4NjM0NDEsImV4cCI6MjAxMTQzOTQ0MX0.ftIeyf9xfYDF4I3g3OCBQkOyealTVGQOr2Dt7j_5IPE';

export const supabase = createClient(supabaseUrl, supabaseKey);