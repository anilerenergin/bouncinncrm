"use client";

import { useCreateEvent } from "@/src/hooks/use-create-event";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { StepOne } from "./components/step-one";
import { StepTwo, type CreateEventFormData } from "./components/step-two";

const DEFAULT_VENUE_ID = "30000000-0000-0000-0000-000000000001";

export default function CreateEventPage() {
  const router = useRouter();
  const [step, setStep] = useState<1 | 2>(1);
  const [date, setDate] = useState<Date | undefined>(undefined);

  const { mutate: createEvent, isPending } = useCreateEvent();

  const handleStepOneNext = (selectedDate: Date) => {
    setDate(selectedDate);
    setStep(2);
  };

  const handleStepTwoBack = () => {
    setStep(1);
  };

  const handleCreate = (data: CreateEventFormData) => {
    if (!date) return;

    createEvent(
      {
        venue_id: DEFAULT_VENUE_ID,
        title: data.title,
        description: data.description,
        capacity: data.capacity,
        start_date_time: date.toISOString(),
        cover_image: data.coverImage,
      },
      {
        onSuccess: () => {
          router.push("/events");
        },
      }
    );
  };

  const handleCancel = () => {
    router.push("/events");
  };

  return (
    <div className="min-h-screen bg-gray-50/50 p-6 flex flex-col">
      <div className="flex-1 flex items-center justify-center">
        {step === 1 && (
          <StepOne onNext={handleStepOneNext} onCancel={handleCancel} />
        )}
        {step === 2 && date && (
          <StepTwo
            selectedDate={date}
            onBack={handleStepTwoBack}
            onSubmit={handleCreate}
            isSubmitting={isPending}
          />
        )}
      </div>
    </div>
  );
}
