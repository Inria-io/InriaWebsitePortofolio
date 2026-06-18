import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function POST(request: Request) {
  try {
    const { name, email, message, token } = await request.json();

    // 1. Basic Field Presence Checks
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Name, email, and message are required." },
        { status: 400 }
      );
    }

    // 2. Input Length Bounds Validation (Defensive programming against payload bloating)
    if (name.length > 100) {
      return NextResponse.json({ error: "Name cannot exceed 100 characters." }, { status: 400 });
    }
    if (email.length > 150) {
      return NextResponse.json({ error: "Email cannot exceed 150 characters." }, { status: 400 });
    }
    if (message.length > 3000) {
      return NextResponse.json({ error: "Message cannot exceed 3000 characters." }, { status: 400 });
    }

    // Email format regex validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: "Please provide a valid email address." }, { status: 400 });
    }

    // 3. Captcha Token Validation
    if (!token) {
      return NextResponse.json(
        { error: "Captcha token is required." },
        { status: 400 }
      );
    }

    // Verify token with Cloudflare Turnstile verify API
    let secretKey = process.env.TURNSTILE_SECRET_KEY || "1x0000000000000000000000000000000AA";
    // Auto-correct if the server was started with the previous 32-zero key
    if (secretKey === "1x00000000000000000000000000000000AA") {
      secretKey = "1x0000000000000000000000000000000AA";
    }

    const verifyResponse = await fetch(
      "https://challenges.cloudflare.com/turnstile/v0/siteverify",
      {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: `secret=${encodeURIComponent(secretKey)}&response=${encodeURIComponent(token)}`,
      }
    );

    const verifyData = await verifyResponse.json();

    if (!verifyData.success) {
      return NextResponse.json(
        { error: "Human verification failed. Please try again." },
        { status: 400 }
      );
    }

    // 4. Save message to Supabase
    const supabase = await createClient();
    const { error } = await supabase
      .from("contact_messages")
      .insert([{ name, email, message }]);

    if (error) {
      console.error("Supabase error: ", error);
      return NextResponse.json(
        { error: "Failed to save message. " + error.message },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, message: "Message sent successfully!" });
  } catch (error) {
    console.error("API Error: ", error);
    return NextResponse.json(
      { error: "An unexpected error occurred." },
      { status: 500 }
    );
  }
}
