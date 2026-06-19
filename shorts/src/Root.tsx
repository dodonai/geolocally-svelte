import { Composition } from "remotion";
import { GeolocallyShort, SHORT_DURATION, SHORT_FPS } from "./Short";

export const Root = () => {
  return (
    <>
      <Composition
        id="GeolocallyShort"
        component={GeolocallyShort}
        durationInFrames={SHORT_DURATION}
        fps={SHORT_FPS}
        width={1080}
        height={1920}
      />
    </>
  );
};
