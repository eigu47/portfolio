export default function Camera() {
  return (
    <>
      <ambientLight intensity={0.2} />
      <spotLight
        intensity={0.5}
        position={[10, 15, 10]}
        angle={0.2}
        penumbra={0.5}
      />
    </>
  );
}
