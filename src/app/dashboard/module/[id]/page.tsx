import { ModulePageClient } from "@/components/ModulePageClient";

export default async function ModulePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <ModulePageClient id={id} />;
}
