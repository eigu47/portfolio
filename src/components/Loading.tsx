import { useProgress } from "@react-three/drei";

export default function Loading() {
  const { progress } = useProgress();

  return (
    <div className="absolute flex h-full w-full items-center justify-center">
      <h1 className="bg-slate-300 p-3 text-2xl text-slate-950">
        Loading {progress.toFixed(2)} %...
      </h1>
    </div>
  );
}
