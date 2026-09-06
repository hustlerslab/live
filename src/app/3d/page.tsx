import type { Metadata } from "next";

import { Walkthrough3DView } from "@/features/walkthrough3d/components/walkthrough3d-view";

export const metadata: Metadata = {
  title: "3D Walkthrough",
  description:
    "Interactive 3D walkthrough on the Aether engine — orbit, walk in first person, take the guided tour, and edit with validated AI proposals.",
};

/**
 * The raw viewer against the seed apartment. The Studio route (/) reaches
 * the same component with a freshly generated scene.
 */
export default function Page() {
  return <Walkthrough3DView />;
}
