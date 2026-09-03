import express from "express";
import db from "./database/index.ts";
import { productSchema } from "./validators/product.validator.ts";

const app = express();

app.use(express.json());

app.post("/products", async (req, res) => {
  try {
    const result = productSchema.safeParse(req.body);

    if (!result.success) {
      return res.status(400).json({ 
        message: "Data tidak valid",
        errors: result.error.issues,
      });
    }

    const { name, price } = result.data;

    await db.execute(
      "INSERT INTO products (name, price) VALUES (?, ?)",
      [name, price],
    );

    res.status(201).json({
      message: "Product berhasil ditambahkan",
      data: {
        name,
        price,
      },
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Terjadi kesalahan pada server",
    });
  }
});

app.get("/products", async (req, res) => {
  try {
    const [products] = await db.execute(
      "SELECT * FROM products",
    );

    res.status(200).json({
      message: "Berhasil mengambil data",
      data: products,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Terjadi kesalahan pada server",
    });
  }
});

app.put("/products/:id", async (req, res) => {
  try {
    const id = req.params.id;

    const result = productSchema.safeParse(req.body);

    if (!result.success) {
      return res.status(400).json({
        message: "Data tidak valid",
        errors: result.error.issues,
      });
    }

    const { name, price } = result.data;

    await db.execute(
      "UPDATE products SET name = ?, price = ? WHERE id = ?",
      [name, price, id],
    );

    res.status(200).json({
      message: "Product berhasil diupdate",
      data: {
        id,
        name,
        price,
      },
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Terjadi kesalahan pada server",
    });
  }
});

app.delete("/products/:id", async (req, res) => {
  try {
    const id = req.params.id;

    await db.execute(
      "DELETE FROM products WHERE id = ?",
      [id],
    );

    res.status(200).json({
      message: "Product berhasil dihapus",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Terjadi kesalahan pada server",
    });
  }
});

app.listen(8000, () => {
  console.log("Server berjalan di http://localhost:8000");
});