import { programsData } from "@/app/data/programs"
import ProgramDetailPageClient from "./ProgramDetailPageClient"

export async function generateStaticParams() {
  return programsData.map((program) => ({
    slug: program.slug,
  }))
}

export default async function ProgramDetailPage({ 
  params 
}: { 
  params: Promise<{ slug: string }> 
}) {
  const { slug } = await params
  return <ProgramDetailPageClient slug={slug} />
}