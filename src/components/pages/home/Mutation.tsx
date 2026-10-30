/*
|-----------------------------------------
| setting up Mutation.tsx for the App
| @author: Toufiquer Rahman<toufiquer.0@gmail.com>
| @copyright: Toufiquer, 1 November, 2026
|-----------------------------------------
*/

"use client";

import Image from "next/image";
import { useState } from "react";

import ImagePickerModal from "@/components/dashboard-ui/ImagePickerModal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";

import { defaultData, parseCards, resolveHomeData, type HomeCard, type HomeData } from "./data";

const sectionNames = [
  "Trust & expertise",
  "Our services",
  "Google Ads",
  "Facebook & Instagram Ads",
  "Why choose Adsrova",
  "Creative showcase",
  "How we work",
  "Industries",
  "Results & case studies",
  "Frequently asked questions",
  "Contact & final CTA",
];
export default function Mutation({ data, onChange }: { data?: Partial<HomeData>; onChange: (data: HomeData) => void }) {
  const [mediaOpen, setMediaOpen] = useState(false);
  const [expanded, setExpanded] = useState<number | null>(null);
  const values = resolveHomeData(data);
  const sections = parseCards(values.sectionsJson);
  const update = (next: Partial<HomeData>) => onChange({ ...values, ...next });
  const updateCard = (index: number, card: HomeCard) =>
    update({ sectionsJson: JSON.stringify(sections.map((item, i) => (i === index ? card : item))) });
  return (
    <div className="custom-parent-border bg-[#fffaf0] text-stone-800">
      <div className="mx-auto max-w-7xl space-y-4 p-4">
        <header className="flex flex-wrap items-center justify-between gap-4 rounded-sm border border-[#eadfca] bg-white p-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-amber-700">Page editor</p>
            <h2 className="mt-1 text-xl font-semibold">Home page content</h2>
            <p className="mt-1 text-sm text-stone-500">Edit the hero and the eleven fixed sections below.</p>
          </div>
          <label className="flex items-center gap-3 text-sm">
            Force update{" "}
            <Switch
              checked={values.forceUpdate === "true"}
              onCheckedChange={(checked) => update({ forceUpdate: checked ? "true" : "false" })}
            />
          </label>
        </header>
        <div className="grid gap-4 lg:grid-cols-[2fr_1fr]">
          <section className="space-y-4 rounded-sm border border-[#eadfca] bg-white p-4">
            <h3 className="font-semibold">Hero content</h3>
            <Field label="Eyebrow" value={values.eyebrow} onChange={(eyebrow) => update({ eyebrow })} />
            <Field label="Headline" value={values.title} onChange={(title) => update({ title })} />
            <label className="grid gap-1 text-sm">
              Introduction
              <Textarea value={values.intro} onChange={(e) => update({ intro: e.target.value })} />
            </label>
            <div className="grid gap-4 sm:grid-cols-2">
              {(["paddingX", "paddingY"] as const).map((key) => (
                <label className="grid gap-2 text-sm" key={key}>
                  {key === "paddingX" ? "Horizontal" : "Vertical"} padding: {values[key]}px
                  <Slider
                    aria-label={key}
                    min={0}
                    max={300}
                    step={1}
                    value={[Number(values[key]) || 0]}
                    onValueChange={([value]) => update({ [key]: value ?? 0 })}
                  />
                </label>
              ))}
            </div>
          </section>
          <section className="rounded-sm border border-[#eadfca] bg-white p-4">
            <h3 className="font-semibold">Hero image</h3>
            <p className="mt-1 text-sm text-stone-500">Choose an image from the media library.</p>
            {values.imageUrl ? (
              <Image
                className="mt-3 aspect-video w-full rounded-sm object-cover"
                src={values.imageUrl}
                alt={values.imageAlt || defaultData.imageAlt}
                width={600}
                height={338}
                unoptimized
              />
            ) : (
              <div className="mt-3 grid aspect-video place-items-center bg-sky-50 text-sm text-sky-800">
                Default workspace image
              </div>
            )}
            <Button
              size="sm"
              type="button"
              onClick={() => setMediaOpen(true)}
              className="mt-3 w-full cursor-pointer bg-amber-100 text-amber-900 transition duration-700 hover:bg-amber-200"
            >
              Edit image
            </Button>
            <div className="mt-3">
              <Field label="Image alt text" value={values.imageAlt} onChange={(imageAlt) => update({ imageAlt })} />
            </div>
          </section>
        </div>
        <section className="rounded-sm border border-[#eadfca] bg-white p-4">
          <h3 className="font-semibold">Page sections</h3>
          <p className="mt-1 text-sm text-stone-500">
            The homepage contains exactly twelve sections. Edit each section’s heading and introduction here.
          </p>
          <div className="mt-4 grid gap-2">
            {sections.map((card, index) => (
              <article className="rounded-sm border border-[#eadfca] bg-[#fffdf8]" key={sectionNames[index]}>
                <div className="flex items-center gap-3 p-3">
                  <span className="text-xs font-semibold text-blue-700">{String(index + 2).padStart(2, "0")}</span>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-semibold">{sectionNames[index]}</p>
                    <p className="truncate text-xs text-stone-500" title={card.title}>
                      {card.title}
                    </p>
                  </div>
                  <Button
                    size="sm"
                    type="button"
                    className="cursor-pointer bg-amber-100 text-amber-900 transition duration-700 hover:bg-amber-200"
                    aria-expanded={expanded === index}
                    onClick={() => setExpanded(expanded === index ? null : index)}
                  >
                    {expanded === index ? "Close" : "Edit"}
                  </Button>
                </div>
                {expanded === index && (
                  <div className="grid gap-3 border-t border-[#eadfca] bg-white p-3">
                    <Field
                      label="Section heading"
                      value={card.title}
                      onChange={(title) => updateCard(index, { ...card, title })}
                    />
                    <label className="grid gap-1 text-sm">
                      Introduction
                      <Textarea
                        value={card.description}
                        onChange={(e) => updateCard(index, { ...card, description: e.target.value })}
                      />
                    </label>
                  </div>
                )}
              </article>
            ))}
          </div>
        </section>
      </div>
      {mediaOpen && (
        <ImagePickerModal
          close={() => setMediaOpen(false)}
          description="Select an image from Media Library or upload a new home image."
          onSelect={(imageUrl) => {
            update({ imageUrl });
            setMediaOpen(false);
          }}
          selectedUrl={values.imageUrl}
          title="Choose home image"
          uploadLabel="Upload home image"
        />
      )}
    </div>
  );
}
function Field({ label, value, onChange }: { label: string; value: string; onChange: (value: string) => void }) {
  return (
    <label className="grid gap-1 text-sm">
      {label}
      <Input value={value} onChange={(e) => onChange(e.target.value)} />
    </label>
  );
}
