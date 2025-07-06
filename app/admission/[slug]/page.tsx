import ProgramDetailPageClient from "./ProgramDetailPageClient"


interface Props {
  params: {
    slug: string
  }
}

export default function ProgramDetailPage({ params }: Props) {
  const { slug } = params
  return <ProgramDetailPageClient slug={slug} />
}
