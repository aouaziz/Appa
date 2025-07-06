import ProgramDetailPageClient from "./ProgramDetailPageClient";

export default function ProgramDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  return <ProgramDetailPageClient slug={params.slug} />;
}
