import { programsData } from "@/app/data/programs"
import ProgramDetailPageClient from "./ProgramDetailPageClient"

export async function generateStaticParams() {
  return programsData.map((program) => ({
    slug: program.slug,
  }))
}

export default function ProgramDetailPage({ params }: { params: { slug: string } }) {
  const { slug } = params
  return <ProgramDetailPageClient slug={slug} />
}
