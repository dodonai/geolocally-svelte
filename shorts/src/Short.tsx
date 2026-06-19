import { AbsoluteFill, Audio, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { LINES, AUDIO_END, OUTRO_CTA, OUTRO_URL } from "./captions";
import { Background } from "./Background";

// GeoLocally brand
const INDIGO = "#4f46e5";
const ACCENT = "#10b981";
const BG = "#030712";
const FONT = 'Inter, ui-sans-serif, system-ui, -apple-system, "Segoe UI", sans-serif';
const SERIF = '"Playfair Display", Georgia, serif';

export const SHORT_FPS = 30;
export const OUTRO_SECONDS = 3.2;
export const SHORT_DURATION = Math.ceil((AUDIO_END + OUTRO_SECONDS) * SHORT_FPS);

export const GeolocallyShort = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = frame / fps;
  const outroStart = AUDIO_END + 0.25;
  const isOutro = t >= outroStart;

  // active caption line
  let active = LINES.find((l) => t >= l.start && t <= l.end + 0.12);
  if (!active) {
    for (let i = LINES.length - 1; i >= 0; i--) {
      if (LINES[i].start <= t) { active = LINES[i]; break; }
    }
  }

  return (
    <AbsoluteFill style={{ backgroundColor: BG, fontFamily: FONT, color: "#fff" }}>
      <Audio src={staticFile("short.mp3")} />
      <Background />

      {/* top brand label */}
      <div style={{ position: "absolute", top: 96, left: 0, right: 0, textAlign: "center" }}>
        <div style={{ fontFamily: SERIF, fontStyle: "italic", fontWeight: 800, letterSpacing: -1, fontSize: 56, color: "#fff" }}>
          GeoLocally
        </div>
        <div style={{ marginTop: 12, fontSize: 22, color: ACCENT, letterSpacing: 6, textTransform: "uppercase", fontWeight: 600 }}>
          AI search for local business
        </div>
      </div>

      {/* karaoke captions */}
      {!isOutro && active ? (
        <AbsoluteFill style={{ alignItems: "center", justifyContent: "center", padding: "0 96px" }}>
          <div style={{ fontSize: 104, fontWeight: 800, lineHeight: 1.08, textAlign: "center", letterSpacing: "-0.02em" }}>
            {active.words.map((w, i) => {
              const on = t >= w.start && t <= w.end + 0.06;
              return (
                <span key={i} style={{ color: on ? ACCENT : "#fff", marginRight: 22, display: "inline-block", transform: on ? "translateY(-6px)" : "none" }}>
                  {w.text}
                </span>
              );
            })}
          </div>
        </AbsoluteFill>
      ) : null}

      {isOutro ? <Outro startFrame={Math.floor(outroStart * fps)} /> : null}

      {/* progress bar */}
      <div style={{ position: "absolute", bottom: 80, left: 96, right: 96, height: 6, background: "rgba(255,255,255,0.12)" }}>
        <div style={{ height: "100%", width: `${Math.min(100, (t / AUDIO_END) * 100)}%`, background: INDIGO }} />
      </div>
    </AbsoluteFill>
  );
};

const Outro = ({ startFrame }: { startFrame: number }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const local = frame - startFrame;
  const enter = spring({ frame: local, fps, config: { damping: 14, stiffness: 110 } });
  const opacity = interpolate(enter, [0, 1], [0, 1]);
  return (
    <AbsoluteFill style={{ alignItems: "center", justifyContent: "center", padding: "0 96px", opacity, transform: `scale(${0.95 + 0.05 * enter})` }}>
      <div style={{ textAlign: "center" }}>
        <div style={{ fontSize: 72, fontWeight: 800, marginBottom: 30, letterSpacing: "-0.02em" }}>{OUTRO_CTA}</div>
        <div style={{ fontSize: 36, color: ACCENT, fontWeight: 600 }}>{OUTRO_URL}</div>
      </div>
    </AbsoluteFill>
  );
};
