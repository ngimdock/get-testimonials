"use client";

import React, { useState } from "react";
import { AudioRecorder, useAudioRecorder } from "react-audio-voice-recorder";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { processAudioAction, updateReviewAction } from "./reviews.action";
import { toast } from "sonner";
import { useLocalStorage } from "react-use";
import { Loader } from "lucide-react";

export const ReviewSelector = ({ productId }: { productId: string }) => {
  return (
    <div className="w-full max-w-lg">
      <Tabs defaultValue="text" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="text">Text</TabsTrigger>
          <TabsTrigger disabled value="audio">
            Audio note
          </TabsTrigger>
        </TabsList>
        <TabsContent value="text">
          <ReviewTextForm productId={productId} />
        </TabsContent>
        <TabsContent value="audio" className="flex flex-col gap-2">
          <AudioComponent
            productId={productId}
            onAudioFinished={(blob) => {
              console.log({ blob });
            }}
          />

          <p className="max-w-sm text-center text-sm font-light text-muted-foreground">
            Just record your voice we will convert it to text for you
          </p>
        </TabsContent>
      </Tabs>
    </div>
  );
};

const ReviewTextForm = ({ productId }: { productId: string }) => {
  const [text, setText] = useState("");

  const queryClient = useQueryClient();

  const [reviewId] = useLocalStorage<string | null>(
    `review-id-${productId}`,
    null
  );

  const textMutation = useMutation({
    mutationFn: async () => {
      const { data, serverError } = await updateReviewAction({
        id: reviewId as string,
        text,
        productId,
      });

      if (serverError || !data) {
        toast.error(serverError ?? "Failed to update review text");
        return;
      }

      await queryClient.invalidateQueries({
        queryKey: ["review", data.id, "product", productId],
      });
    },
  });

  return (
    <div className="flex flex-col gap-2">
      <Textarea
        placeholder="Whrite your review here"
        className="w-full bg-accent/50"
        onChange={(e) => setText(e.target.value)}
      />

      <Button
        disabled={!text || textMutation.isPending}
        size="sm"
        onClick={() => textMutation.mutate()}
      >
        {textMutation.isPending ? <Loader /> : <span>Submit</span>}
      </Button>
    </div>
  );
};

const AudioComponent = ({
  onAudioFinished,
  productId,
}: {
  onAudioFinished: (blob: Blob) => void;
  productId: string;
}) => {
  const [blob, setBlob] = useState<Blob | null>(null);

  const queryClient = useQueryClient();

  const [reviewId] = useLocalStorage<string | null>(
    `review-id-${productId}`,
    null
  );

  const recorderControls = useAudioRecorder(
    {
      noiseSuppression: true,
      echoCancellation: true,
    },
    (err) => console.table(err) // onNotAllowedOrFound
  );

  const audioMutation = useMutation({
    mutationFn: async () => {
      if (!blob) {
        toast.error("No audio recorded");
        return;
      }

      if (!reviewId) {
        toast.error("Review not found");
        return;
      }
      const formData = new FormData();

      const file = new File([blob], "audio.webm", {
        type: "audio/webm",
      });

      formData.append("audio", file);

      const { data, serverError } = await processAudioAction({
        formData,
        productId,
        reviewId,
      });

      if (serverError || !data) {
        toast.error(serverError ?? "Failed to load review");
        return;
      }

      await queryClient.invalidateQueries({
        queryKey: ["review", data.id, "product", productId],
      });
    },
  });

  return (
    <div className="flex flex-col items-center gap-2">
      {blob && <audio controls src={URL.createObjectURL(blob)}></audio>}
      <AudioRecorder
        onRecordingComplete={(blob) => {
          setBlob(blob);
          onAudioFinished(blob);
        }}
        recorderControls={recorderControls}
        // downloadOnSavePress={true}
        // downloadFileExtension="mp3"
        showVisualizer={true}
      />
      {recorderControls.isRecording && (
        <Button size="sm" onClick={recorderControls.stopRecording}>
          Stop recording
        </Button>
      )}
      {blob ? (
        <Button
          size="sm"
          onClick={() => {
            audioMutation.mutate();
          }}
        >
          Submit
        </Button>
      ) : null}
    </div>
  );
};
