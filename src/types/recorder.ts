export interface RecordingState {
  isRecording: boolean;
  isPaused: boolean;
  durationSeconds: number;
}

export interface AudioSettings {
  systemAudio: boolean;
  systemVolume: number;
  microphone: boolean;
  micVolume: number;
  micDevice: string;
}
