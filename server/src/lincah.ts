import { Hono } from "hono";

const lincah = new Hono();

lincah.get("/destination/search", async (c) => {
  try {
    const query = c.req.query("q");
    if (!query) {
      return c.json({ success: false, error: "Harus isi kata kunci pencarian" }, 400);
    }

    const res = await fetch(
      `https://api.lincah.id/api/destination/search?q=${encodeURIComponent(query)}`
    );
    const data = (await res.json()) as any;
    return c.json(data);
  } catch (err) {
    console.error("Gagal mencari destinasi:", err);
    return c.json({ success: false, error: "Gagal mencari destinasi" }, 500);
  }
});

lincah.post("/shipping/cost", async (c) => {
  try {
    const { origin_code, destination_code, weight, volume } = await c.req.json();

    if (!origin_code || !destination_code || !weight) {
      return c.json(
        { success: false, error: "Harus isi origin_code, destination_code, dan weight" },
        400
      );
    }

    const body: Record<string, any> = {
      origin_code,
      destination_code,
      weight: parseFloat(weight),
    };

    // tambahin volume kalau ada
    if (volume) {
      body.volume = parseFloat(volume);
    }

    const res = await fetch("https://api.lincah.id/api/check/ongkir", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    const data = (await res.json()) as any;
    return c.json(data);
  } catch (err) {
    console.error("Gagal menghitung ongkos kirim:", err);
    return c.json({ success: false, error: "Gagal menghitung ongkos kirim" }, 500);
  }
});

export default lincah;
