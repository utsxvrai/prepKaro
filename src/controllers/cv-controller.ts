import { Request, Response } from "express";
import { uploadCV } from "../services/cv-service";
import { PrismaClient} from "../generated/prisma"; // Prisma client

const prisma = new PrismaClient();

export async function uploadCVController(req: Request, res: Response) {
  try {

    const file = req.file as Express.Multer.File | undefined;
    const { userId } = req.body;

    if (!file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    if (!userId) {
      return res.status(400).json({ error: "User ID is required" });
    }

    const publicUrl = await uploadCV(file, userId);
    console.log('Uploaded CV URL:', publicUrl);

    await prisma.user.update({
      where: { id: userId },
      data: { cvUrl: publicUrl },
    });

    res.json({ message: "CV uploaded successfully", url: publicUrl });
  } catch (err) {
    res.status(500).json({ error: (err as Error).message });
  }
}
