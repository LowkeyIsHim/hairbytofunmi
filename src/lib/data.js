import { createAdminClient } from './supabase';
import { cookies } from 'next/headers';

// --- DATABASE FUNCTIONS ---

const getSupabase = () => {
    const cookieStore = cookies();
    return createAdminClient(cookieStore);
};

// Fetches all styles for the public site and admin
export async function getAllStyles() {
    const supabase = getSupabase();
    const { data, error } = await supabase
        .from('styles')
        .select('*')
        .order('created_at', { ascending: false });

    if (error) {
        console.error('Error fetching styles:', error);
        return [];
    }
    return data;
}

// Fetches a single style by ID
export async function getStyleById(id) {
    const supabase = getSupabase();
    const { data, error } = await supabase
        .from('styles')
        .select('*')
        .eq('id', id)
        .single();

    if (error) {
        console.error('Error fetching single style:', error);
        return null;
    }
    return data;
}

// Fetches site settings (Bio, Hours, Socials)
export async function getSettings() {
    const supabase = getSupabase();
    // Assuming settings table only has one row with ID 1
    const { data, error } = await supabase
        .from('settings')
        .select('*')
        .eq('id', 1)
        .single();

    if (error) {
        console.error('Error fetching settings:', error);
        // Provide safe defaults if fetch fails
        return {
            stylist_bio: "Transforming hair dreams into reality with elegance, style, and care. Specializing in braids, twists, curls, and more.",
            working_hours: "9:00 AM — 7:00 PM",
            whatsapp_number: process.env.WHATSAPP_NUMBER || "2348012345678",
            tiktok_link: process.env.TIKTOK_LINK || "#",
            email_link: process.env.EMAIL_LINK || "mailto:bookings@hairbytofunmi.com",
        };
    }
    return data;
}
