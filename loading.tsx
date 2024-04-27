import { Spinner } from "@nextui-org/spinner";

export default function Loading() {
  return (
    <div className="absolute inset-0 flex items-center justify-center animate-pulse">
      <Spinner size="lg" color="primary" />
    </div>
  );
}
