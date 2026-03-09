import { ImageResponse } from "next/og";
import { readFile } from "fs/promises";
import { join } from "path";

export const ogSize = { width: 1200, height: 630 };

export async function createOGImage(title: string, subtitle: string) {
  const logoData = await readFile(join(process.cwd(), "public/images/brand/logo.png"));
  const logoBase64 = `data:image/png;base64,${logoData.toString("base64")}`;

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
          background: "linear-gradient(135deg, #0A0A0A 0%, #0F3D26 100%)",
          padding: "60px",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "28px",
          }}
        >
          <img src={logoBase64} width={320} height={160} style={{ objectFit: "contain" }} />
          <div style={{ width: 100, height: 2, background: "#1B5E3B" }} />
          <div
            style={{
              color: "#F5F0EB",
              fontSize: 36,
              fontWeight: 600,
              letterSpacing: "0.1em",
              textAlign: "center",
            }}
          >
            {title}
          </div>
          <div
            style={{
              color: "#C8A96E",
              fontSize: 18,
              fontWeight: 400,
              letterSpacing: "0.15em",
              textAlign: "center",
              maxWidth: 700,
            }}
          >
            {subtitle}
          </div>
        </div>
      </div>
    ),
    { ...ogSize }
  );
}
