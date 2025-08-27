import { Hono } from "hono";
import { Invoice as XenditInvoiceClient } from "xendit-node";

const app = new Hono();

// Init Xendit client
const xenditInvoice = new XenditInvoiceClient({
  secretKey: process.env.XENDIT_SECRET_KEY || "",
});

// counter invoice ID lokal (reset tiap server restart)
let counter = 1;
function makeInvoiceId(): string {
  const invoiceId = `nusatoys-${counter}`;
  counter++;
  return invoiceId;
}

// Buat payment / invoice
app.post("/payments", async (c) => {
  try {
    const body = await c.req.json();
    const {
      product,
      amount,
      qty,
      buyerName,
      buyerEmail,
      buyerPhone,
    } = body;

    if (!product || !amount || !qty) {
      return c.json(
        { success: false, error: "Harus isi product, amount, qty" },
        400
      );
    }

    const invoiceId = makeInvoiceId();

    const invoice = await xenditInvoice.createInvoice({
      data: {
        externalId: invoiceId,
        amount,
        description: `Pembelian ${product} (${qty} item)`,
        invoiceDuration: 86400, // 1 hari
        currency: "IDR",
        customer: {
          givenNames: buyerName,
          email: buyerEmail,
          mobileNumber: buyerPhone,
        },
        customerNotificationPreference: {
          invoiceCreated: ["email", "sms"],
          invoiceReminder: ["email", "sms"],
          invoicePaid: ["email", "sms"],
        },
        successRedirectUrl: `${
          process.env.CLIENT_URL || "http://localhost:5173"
        }/cart?status=success`,
        failureRedirectUrl: `${
          process.env.CLIENT_URL || "http://localhost:5173"
        }/cart?status=failed`,
      },
    });

    return c.json({
      success: true,
      data: {
        invoice_id: invoiceId,
        invoice_url: invoice.invoiceUrl,
        amount,
        product,
        qty,
      },
    });
  } catch (e) {
    console.error(e);
    return c.json({ success: false, error: "Gagal membuat pembayaran" }, 500);
  }
});

// Webhook dari Xendit
app.post("/webhooks/xendit", async (c) => {
  try {
    const callbackToken = c.req.header("x-callback-token");
    if (callbackToken !== process.env.XENDIT_WEBHOOK_TOKEN) {
      return c.json({ success: false, error: "Token tidak valid" }, 401);
    }

    const data = await c.req.json();
    console.log("Webhook Xendit:", data);

    return c.json({ success: true });
  } catch (e) {
    console.error(e);
    return c.json({ success: false, error: "Webhook gagal diproses" }, 500);
  }
});

export default app;
