import { useEffect } from 'react'
import { useIsPlaying, useVolume, useSong } from '../states/playbackStore';
import { useToneArmFinished } from '../states/animationStore';
import { TONE_ARM_SOUND_EFFECT, VINYL_SOUND_EFFECT } from '../utils/constants';
// Custom hook which encapsulates playback logic
const usePlayback = (): void => {

    const isPlaying = useIsPlaying()
    const song = useSong()
    const toneArmFinished = useToneArmFinished()

  //  Pause song
  useEffect(() => {
    if (!isPlaying) {
      song.pause();
      TONE_ARM_SOUND_EFFECT.play();
      VINYL_SOUND_EFFECT.pause();
    }
  }, [isPlaying]);

  // Song plays only when the tone arm moves onto the record
  useEffect(() => {
    if (isPlaying && toneArmFinished) {
      console.log("Play button hit + tone arm moved");
      TONE_ARM_SOUND_EFFECT.play();
      VINYL_SOUND_EFFECT.play();
      song.play();
    }
  }, [toneArmFinished]);

}

const useVolumeControls = (): void => {
  const song = useSong()
  const volume = useVolume()

  // Initialize song volume
  song.volume = 0.1;

  useEffect(() => {
    TONE_ARM_SOUND_EFFECT.volume = volume;
    song.volume = volume;
  }, [volume]);
}

const useInitializePlayback = () => {
  usePlayback()
  useVolumeControls()
}

export { useInitializePlayback }