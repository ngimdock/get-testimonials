import React, { useState } from "react";
import { AudioRecorder, useAudioRecorder } from "react-audio-voice-recorder";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";

export const ReviewSelector = () => {
  return (
    <Tabs defaultValue="audio" className="w-full">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="audio">Audio note</TabsTrigger>
        <TabsTrigger value="text">Text</TabsTrigger>
      </TabsList>
      <TabsContent value="audio" className="flex flex-col gap-2">
        <AudioComponent
          onAudioFinished={(blob) => {
            console.log({ blob });
          }}
        />

        <p className="max-w-sm text-center text-sm font-light text-muted-foreground">
          Just record your voice we will convert it to text for you
        </p>
      </TabsContent>
      <TabsContent value="text"></TabsContent>
    </Tabs>
  );
};

const AudioComponent = ({
  onAudioFinished,
}: {
  onAudioFinished: (blob: Blob) => void;
}) => {
  const [blob, setBlob] = useState<Blob | null>(null);

  const recorderControls = useAudioRecorder(
    {
      noiseSuppression: true,
      echoCancellation: true,
    },
    (err) => console.table(err) // onNotAllowedOrFound
  );

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
        <Button size="sm" onClick={recorderControls.stopRecording}>
          Submit
        </Button>
      ) : null}
    </div>
  );
};
