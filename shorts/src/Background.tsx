import { AbsoluteFill, useCurrentFrame, useVideoConfig } from "remotion";

// GeoLocally-branded animated background — indigo + green mesh + technical grid + vignette.
const INDIGO = "#4f46e5";
const ACCENT = "#10b981";

export const Background = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = frame / fps;

  const b1x = 72 + Math.sin(t * 0.18) * 12;
  const b1y = 22 + Math.cos(t * 0.13) * 8;
  const b2x = 24 + Math.cos(t * 0.11) * 12;
  const b2y = 82 + Math.sin(t * 0.16) * 8;
  const shift = (frame * 0.22) % 46;

  return (
    <AbsoluteFill style={{ backgroundColor: "#030712" }}>
      {/* flowing indigo + green mesh */}
      <AbsoluteFill
        style={{
          background: `radial-gradient(circle at ${b1x}% ${b1y}%, ${INDIGO}33, transparent 28%), radial-gradient(circle at ${b2x}% ${b2y}%, ${ACCENT}22, transparent 32%)`,
          filter: "blur(8px)",
        }}
      />
      {/* technical dot grid */}
      <AbsoluteFill
        style={{
          backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.07) 1.4px, transparent 1.7px)",
          backgroundSize: "46px 46px",
          backgroundPosition: `${shift}px ${shift}px`,
          opacity: 0.5,
        }}
      />
      {/* moving accent scan-light */}
      <AbsoluteFill
        style={{
          background: `radial-gradient(circle at ${b1x}% ${b1y}%, ${ACCENT}1f, transparent 16%)`,
          mixBlendMode: "screen",
        }}
      />
      {/* vignette */}
      <AbsoluteFill style={{ background: "radial-gradient(ellipse at center, transparent 30%, rgba(0,0,0,0.65) 100%)" }} />
    </AbsoluteFill>
  );
};
