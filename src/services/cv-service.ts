import { supabase } from "../config/supabase";
import { v4 as uuidv4 } from "uuid";
import path from "path";
import { Express } from "express";

export async function uploadCV(file: Express.Multer.File, userId: string) {
  const fileExt = path.extname(file.originalname);
  const fileName = `${userId}-${uuidv4()}${fileExt}`;
  const bucket = process.env.SUPABASE_BUCKET as string;

  const { data, error } = await supabase.storage
    .from(bucket)
    .upload(fileName, file.buffer, {
      contentType: file.mimetype,
      upsert: true,
    });

  if (error) throw new Error(error.message);

  const { data: publicData } = supabase.storage
    .from(bucket)
    .getPublicUrl(fileName);

  if (!publicData) throw new Error("Failed to generate public URL");

  return publicData.publicUrl;
}
