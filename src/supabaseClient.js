import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://noqwocjrkrjbzgpuxhpw.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5vcXdvY2pya3JqYnpncHV4aHB3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTI4ODQ5MzEsImV4cCI6MjA2ODQ2MDkzMX0.kQLp1G1WTjaZiK-3wqU_6C6oNDCo0Lki1aSvliPwJ-U'

export const supabase = createClient(supabaseUrl, supabaseKey)
