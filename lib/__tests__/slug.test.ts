import { slugifyTitle } from "@/lib/slug";

describe("slugifyTitle", () => {
  it("turns a title into a URL-safe slug", () => {
    expect(slugifyTitle("Hello World!")).toBe("hello-world");
    expect(slugifyTitle(" AI & Vibe Stacks ")).toBe("ai-vibe-stacks");
  });
});

