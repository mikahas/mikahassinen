export async function GET() {
  return new Response(
    JSON.stringify({
      status: 418,
      message: "I'm a teapot",
      quote: "There's coffee in that nebula.",
      source: "Captain Kathryn Janeway, USS Voyager",
      rfc: "https://www.rfc-editor.org/rfc/rfc2324",
    }),
    {
      status: 418,
      headers: { "Content-Type": "application/json" },
    }
  );
}
