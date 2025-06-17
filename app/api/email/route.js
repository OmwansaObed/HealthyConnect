import { transporter, mailOptions } from "../../../utils/nodemailer";

export async function POST(req) {
  console.log("SEND EMAIL API HIT");
  const { to, subject, text, html } = await req.json();

  if (!to || !subject || (!text && !html)) {
    return new Response(JSON.stringify({ error: "Missing fields" }), {
      status: 400,
    });
  }

  try {
    await transporter.sendMail({
      ...mailOptions,
      to,
      subject,
      text,
      html,
    });

    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (error) {
    console.error("Email error:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  }
}

export async function GET(req) {
  console.log("GET EMAIL API HIT");
  return new Response(JSON.stringify({ success: true }), { status: 200 });
}
