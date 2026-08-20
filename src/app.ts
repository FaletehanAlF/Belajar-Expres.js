import express, { type Express, type Request, type Response } from 'express';
import cors from "cors"
import { title } from 'node:process';

const app: Express = express();
const port = 8000;

app.use(cors ())

const sepatu = [
  {
    title: "Nike AiR F1",
    category: "Kets"
  },
   {
    title: "Puma Speedcat",
     category: "Kets"
  },
   {
    title: "Adidas Samba",
    category: "Kets"

  },
]

const buah = [
  {
    title: "Jeruk",
    color: "orange"
  },
   {
    title: "apel",
     color: "merah"
  },
   {
    title: "melon",
    color: "hijau"

  },
]
app.get("/api/sepatu", (req: Request,res: Response) => {
  res.status(200).json({
  message: "Berhasil fetch data sepatu!",
  data: sepatu
  })
 
})

app.get("/api/buah", (req: Request,res: Response) => {
  res.status(200).json({
  message: "Berhasil fetch data buah!",
  data: buah
  })
 
})

// app.get('/api/products', (req: Request, res: Response) => {
//     res.status(200).json({
//         message: "berhasil di tampilkan",
//         data: [{
//             name: "sepatu",
//             category: "kets",
//             price: 1500000
//         }]
//     })
// });

// app.post("/api/sepatu", (req, res) => {
//   res.status(201).json({
//     message: "Product berhasil ditambahkan"
//   });
// });
// app.put("/api/sepatu", (req, res) => {
//   res.status(200).json({
//     message: `Product berhasil di update`
//   });
// });
// app.delete("/api/sepatu", (req, res) => {
//   res.status(204).json({
//     message: `Product berhasil dihapus`
//   });
// });

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});