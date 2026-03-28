import { supabase } from '../lib/supabase';

const BUCKET = 'car-images';
const MAX_SIZE = 5 * 1024 * 1024; // 5MB
const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp'];

/**
 * Upload a car image to Supabase Storage.
 * @param {File} file
 * @param {(progress: number) => void} [onProgress]
 * @returns {Promise<{ imageUrl: string, imagePath: string }>}
 */
export async function uploadCarImage(file, onProgress) {
  if (!file) throw new Error('No file selected.');
  if (file.size > MAX_SIZE) throw new Error('Image must be 5MB or less.');
  if (!ALLOWED_TYPES.includes(file.type)) throw new Error('Only JPG, PNG, and WEBP files are allowed.');

  const ext = file.name.split('.').pop()?.toLowerCase() || 'jpg';
  const uniqueName = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
  const filePath = `cars/${uniqueName}`;

  onProgress?.(20);

  const { error: uploadError } = await supabase.storage
    .from(BUCKET)
    .upload(filePath, file, {
      cacheControl: '3600',
      upsert: false,
      contentType: file.type,
    });

  if (uploadError) throw new Error(uploadError.message);

  onProgress?.(90);

  const { data } = supabase.storage.from(BUCKET).getPublicUrl(filePath);

  if (!data?.publicUrl) throw new Error('Failed to retrieve public URL after upload.');

  onProgress?.(100);

  return { imageUrl: data.publicUrl, imagePath: filePath };
}

/**
 * Delete a car image from Supabase Storage.
 * Fails gracefully — does not throw if the file is missing.
 * @param {string} [imagePath]
 */
export async function deleteCarImage(imagePath) {
  if (!imagePath) return;
  // Swallow errors — a missing file should never block a Firestore operation
  try {
    await supabase.storage.from(BUCKET).remove([imagePath]);
  } catch {
    console.warn(`Could not delete image at path: ${imagePath}`);
  }
}
