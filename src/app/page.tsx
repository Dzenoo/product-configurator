import Home from "@/components/Home";
import Customizer from "@/components/Customizer";
import CanvasModel from "@/canvas/Canvas";

export default function HomePage() {
  return (
    <div className="app transition-all">
      <Home />
      <CanvasModel />
      <Customizer />
    </div>
  );
}
