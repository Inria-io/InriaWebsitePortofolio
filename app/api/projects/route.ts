import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const featured = searchParams.get("featured") === "true";
    const tag = searchParams.get("tag");

    const supabase = await createClient();
    let query = supabase.from("projects").select("*").order("created_at", { ascending: false });

    if (featured) {
      query = query.eq("featured", true);
    }

    const { data, error } = await query;

    if (error) {
      return NextResponse.json(
        { error: "Failed to fetch projects. " + error.message },
        { status: 500 }
      );
    }

    let filteredData = data;
    if (tag) {
      filteredData = data.filter((project: any) =>
        project.tags.map((t: string) => t.toLowerCase()).includes(tag.toLowerCase())
      );
    }

    return NextResponse.json(filteredData);
  } catch (error) {
    console.error("API Error: ", error);
    return NextResponse.json(
      { error: "An unexpected error occurred." },
      { status: 500 }
    );
  }
}
