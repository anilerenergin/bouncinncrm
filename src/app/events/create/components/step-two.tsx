"use client";

import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import { Textarea } from "@/src/components/ui/text-area";
import { dayjs } from "@/src/core/utils/dayjs";
import { ArrowRight, Calendar as CalendarIcon, Upload, X } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import Image from "next/image";
import { useRef, useState } from "react";

export interface CreateEventFormData {
  title: string;
  capacity: number;
  description: string;
  coverImage?: string;
}

interface StepTwoProps {
  selectedDate: Date;
  onBack: () => void;
  onSubmit: (data: CreateEventFormData) => void;
  isSubmitting: boolean;
}

export function StepTwo({
  selectedDate,
  onBack,
  onSubmit,
  isSubmitting,
}: StepTwoProps) {
  const t = useTranslations("CreateEvent");
  const locale = useLocale();
  const [formData, setFormData] = useState<CreateEventFormData>({
    title: "",
    capacity: 0,
    description: "",
    coverImage: undefined,
  });

  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith("image/")) {
      handleFile(file);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFile(file);
    }
  };

  const handleFile = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      setFormData({ ...formData, coverImage: e.target?.result as string });
    };
    reader.readAsDataURL(file);
  };

  const removeImage = () => {
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    setFormData({ ...formData, coverImage: undefined });
  };

  const handleSubmit = () => {
    onSubmit(formData);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] w-full max-w-4xl mx-auto">
      <div className="bg-white rounded-3xl p-8 shadow-sm w-full max-w-3xl">
        <div className="flex justify-between items-start mb-6">
          <div className="w-full">
            <div className="bg-[var(--brand-yellow)]/20 text-yellow-800 px-4 py-2 rounded-lg inline-flex items-center gap-2 mb-6 w-full max-w-2xl border border-[var(--brand-yellow)]">
              <CalendarIcon className="h-4 w-4 text-yellow-700" />
              <span className="font-medium text-sm">
                {t("editingDetails")}:{" "}
                {dayjs(selectedDate).locale(locale).format("dddd, MMM D")}
              </span>
            </div>

            <h1 className="text-3xl font-bold mb-2">{t("step2Title")}</h1>
            <p className="text-gray-500 max-w-xl">{t("step2Subtitle")}</p>
          </div>
          <Button
            variant="ghost"
            onClick={onBack}
            className="text-gray-500 hover:text-gray-900 shrink-0"
          >
            {t("back")}
          </Button>
        </div>

        <div className="space-y-6 max-w-2xl">
          {/* Capacity */}
          <div className="space-y-2">
            <label className="text-sm font-medium">{t("capacityLabel")}</label>
            <Input
              placeholder={t("capacityPlaceholder")}
              type="number"
              value={formData.capacity || ""}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  capacity: parseInt(e.target.value) || 0,
                })
              }
            />
          </div>

          {/* Title */}
          <div className="space-y-2">
            <label className="text-sm font-medium">{t("titleLabel")}</label>
            <Input
              placeholder={t("titlePlaceholder")}
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
            />
          </div>

          {/* Description */}
          <div className="space-y-2">
            <label className="text-sm font-medium">{t("descLabel")}</label>
            <Textarea
              placeholder=""
              className="min-h-[120px] resize-none"
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              maxLength={300}
            />
            <div className="text-right text-xs text-gray-400">
              {formData.description?.length || 0}/300 {t("chars")}
            </div>
          </div>

          {/* Cover Image */}
          <div className="space-y-2">
            <label className="text-sm font-medium">{t("coverLabel")}</label>
            <div className="text-xs text-right text-gray-400 mb-1">
              {t("rec")}
            </div>

            {!formData.coverImage ? (
              <div
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
                className={`border-2 border-dashed rounded-xl p-10 flex flex-col items-center justify-center text-center cursor-pointer transition-colors ${
                  isDragging
                    ? "border-[var(--brand-yellow)] bg-[var(--brand-yellow)]/5"
                    : "border-gray-200 hover:bg-gray-50"
                }`}
              >
                <input
                  type="file"
                  ref={fileInputRef}
                  className="hidden"
                  onChange={handleFileSelect}
                  accept="image/*"
                />
                <div className="pointer-events-none bg-gray-100 p-3 rounded-full mb-3">
                  <Upload className="h-6 w-6 text-gray-500" />
                </div>
                <p className="pointer-events-none font-medium text-sm mb-1">
                  {t("uploadTitle")}
                </p>
                <p className="pointer-events-none text-xs text-gray-400">
                  {t("uploadDesc")}
                </p>
              </div>
            ) : (
              <div className="relative rounded-xl overflow-hidden border border-gray-200">
                <Image
                  src={formData.coverImage}
                  alt="Cover preview"
                  width={800}
                  height={400}
                  className="w-full h-48 object-cover"
                  unoptimized
                />
                <button
                  onClick={removeImage}
                  className="absolute top-2 right-2 p-1.5 bg-black/50 hover:bg-black/70 rounded-full text-white transition-colors"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="flex justify-end mt-8">
          <Button
            onClick={handleSubmit}
            disabled={isSubmitting || !formData.title}
            className="bg-[var(--brand-yellow)] text-black hover:bg-[var(--brand-yellow-hover)] font-semibold rounded-lg px-8 py-6"
          >
            {isSubmitting ? t("submitting") : t("submit")}{" "}
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
