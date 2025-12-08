import { render, screen } from "@testing-library/react";
import SectionList from "../page";

// Mock Next.js router
jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: jest.fn(),
    replace: jest.fn(),
  }),
  Link: ({ children, href }: { children: React.ReactNode; href: string }) => (
    <a href={href}>{children}</a>
  ),
}));

// Mock Next.js Image
jest.mock("next/image", () => ({
  __esModule: true,
  default: ({ src, alt }: { src: string; alt: string }) => (
    <img src={src} alt={alt} />
  ),
}));

const mockFiles = [
  {
    slug: "tool-x",
    title: "Tool X",
    date: "2025-12-07",
    coverImage: "/images/covers/tool-x.jpg",
  },
];

// Mock fetch
global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({ files: mockFiles }),
  })
) as jest.Mock;

describe("SectionList", () => {
  it("shows article cards with title & date", async () => {
    render(<SectionList params={{ section: "tool-spotlights" }} />);
    
    // Wait for async data to load
    await screen.findByText("Tool X");
    
    expect(screen.getByText("Tool X")).toBeInTheDocument();
    expect(screen.getByText("2025-12-07")).toBeInTheDocument();
  });
});

