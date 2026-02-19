import { ImageResponse } from "next/og";

export const runtime = "edge";

export const alt = "Alan | Portfolio — Desenvolvedor Front-End";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #09090b 0%, #18181b 50%, #09090b 100%)",
          fontFamily: "Inter, sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "24px",
          }}
        >
          <div
            style={{
              fontSize: 72,
              fontWeight: 800,
              color: "#fafafa",
              letterSpacing: "-2px",
            }}
          >
            {"<Alan />"}
          </div>

          <div
            style={{
              fontSize: 28,
              fontWeight: 500,
              color: "#3b82f6",
              letterSpacing: "4px",
              textTransform: "uppercase",
            }}
          >
            Desenvolvedor Front-End
          </div>

          <div
            style={{
              display: "flex",
              gap: "16px",
              marginTop: "16px",
            }}
          >
            {["React", "Next.js", "TypeScript", "Tailwind"].map((tech) => (
              <div
                key={tech}
                style={{
                  fontSize: 18,
                  color: "#a1a1aa",
                  padding: "8px 20px",
                  border: "1px solid #27272a",
                  borderRadius: "9999px",
                }}
              >
                {tech}
              </div>
            ))}
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
