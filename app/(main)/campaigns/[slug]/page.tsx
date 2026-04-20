import { Metadata } from "next";
import { notFound } from "next/navigation";
import { PortableText } from "@portabletext/react";
import { sanityFetch } from "@/sanity/lib/client";
import { CAMPAIGN_BY_SLUG_QUERY } from "@/sanity/lib/queries";
import { CampaignPage } from "@/lib/types";
import { urlFor } from "@/sanity/lib/image";
import Image from "next/image";
import { ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";

const IMAGE_EXTENSIONS = /\.(jpe?g|png|webp|gif|svg)(\?|$)/i;

function CampaignFileAttachment({ url, title }: { url: string; title: string }) {
  const isImage = IMAGE_EXTENSIONS.test(url);
  return (
    <div className="space-y-4">
      <a href={url} target="_blank" rel="noopener noreferrer">
        <Button size="lg" className="gap-2">
          <ExternalLink className="h-4 w-4" />
          {isImage ? "View Image" : "View File"}
        </Button>
      </a>
      {isImage ? (
        <div className="relative w-full rounded-lg border overflow-hidden bg-muted/30">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={url} alt={title} className="w-full h-auto object-contain" />
        </div>
      ) : (
        <div className="relative w-full min-h-[60vh] rounded-lg border overflow-hidden bg-muted/30">
          <iframe
            src={url}
            title={`${title} attachment`}
            className="absolute inset-0 h-full w-full"
          />
        </div>
      )}
    </div>
  );
}

type Props = { params: { slug: string } };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const campaign = await sanityFetch<CampaignPage | null>({
    query: CAMPAIGN_BY_SLUG_QUERY,
    params: { slug: params.slug },
  });

  if (!campaign) {
    return { title: "Page Not Found | Muslim Association of Hamilton" };
  }

  return {
    title: `${campaign.title} | Muslim Association of Hamilton`,
    description: campaign.description ?? undefined,
  };
}

export default async function CampaignPageRoute({ params }: Props) {
  const campaign = await sanityFetch<CampaignPage | null>({
    query: CAMPAIGN_BY_SLUG_QUERY,
    params: { slug: params.slug },
  });

  if (!campaign) {
    notFound();
  }

  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-4xl md:text-5xl font-bold text-primary">
          {campaign.title}
        </h1>
        {campaign.description && (
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {campaign.description}
          </p>
        )}
      </div>

      {campaign.image && (
        <div className="relative w-full aspect-[16/9] rounded-xl overflow-hidden">
          <Image
            src={urlFor(campaign.image).width(1200).height(675).url()}
            alt={campaign.title}
            fill
            className="object-cover"
            priority
          />
        </div>
      )}

      {campaign.body && campaign.body.length > 0 && (
        <article className="prose prose-lg max-w-none">
          <PortableText value={campaign.body} />
        </article>
      )}

      {campaign.pdfUrl && (
        <CampaignFileAttachment url={campaign.pdfUrl} title={campaign.title} />
      )}
    </div>
  );
}
