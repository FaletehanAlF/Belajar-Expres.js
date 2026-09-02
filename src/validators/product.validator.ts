import { z } from "zod";

export const productSchema = z.object({
  name: z.string().min(3, "Nama minimal 3 karakter"),
  price: z.number().positive("Harga harus lebih dari 0"),
});