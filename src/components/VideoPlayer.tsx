import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, Volume2, VolumeX, Maximize, RotateCcw, Settings, ExternalLink, ArrowRight } from 'lucide-react';
import posterImage from '../assets/images/bridge_video_poster_1790185633586.jpg';
import { TARGET_AFFILIATE_URL } from '../types';

interface VideoPlayerProps {
  videoUrl?: string;
  videoType?: 'custom_mp4' | 'youtube' | 'vimeo' | 'loom';
  destinationUrl?: string;
  onOpenSettings?: () => void;
}

export const VideoPlayer: React.FC<VideoPlayerProps> = ({
  videoUrl = '',
  videoType = 'custom_mp4',
  destinationUrl = TARGET_AFFILIATE_URL,
  onOpenSettings,
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(180);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(0.85);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const [showControls, setShowControls] = useState(true);
  const [hasStarted, setHasStarted] = useState(false);
  const [showCaptions, setShowCaptions] = useState(true);
  
  const videoRef = useRef<HTMLVideoElement>(null);
  const playerContainerRef = useRef<HTMLDivElement>(null);

  const captions = [
    { start: 0, end: 5, text: "Hey! You've just received your copy of the Traffic Playbook." },
    { start: 5, end: 11, text: "If you haven't checked your inbox or WhatsApp yet, make sure you look for it right away." },
    { start: 11, end: 18, text: "Before you go through it, I want to show you something important." },
    { start: 18, end: 27, text: "Getting people to see your offer is exciting, but traffic without a monetization system leaves money on the table." },
    { start: 27, end: 36, text: "How do you build trust? How do you position your offer and sell with real confidence?" },
    { start: 36, end: 46, text: "That is where the 0–$2K Affiliate Marketing Blueprint comes in to connect the full system." },
    { start: 46, end: 180, text: "Click the red button below this video to see the full details and get started." },
  ];

  const currentCaption = captions.find(c => currentTime >= c.start && currentTime <= c.end)?.text || '';

  useEffect(() => {
    let interval: any;
    if (isPlaying && (!videoUrl || videoType !== 'custom_mp4')) {
      interval = setInterval(() => {
        setCurrentTime((prev) => {
          if (prev >= duration) {
            setIsPlaying(false);
            return 0;
          }
          return prev + 1;
        });
      }, 1000 / playbackSpeed);
    }
    return () => clearInterval(interval);
  }, [isPlaying, duration, playbackSpeed, videoUrl, videoType]);

  const togglePlay = () => {
    if (!hasStarted) {
      setHasStarted(true);
    }
    if (videoRef.current && videoUrl && videoType === 'custom_mp4') {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play().catch(() => {});
      }
    }
    setIsPlaying(!isPlaying);
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = parseFloat(e.target.value);
    setCurrentTime(newTime);
    if (videoRef.current && videoUrl && videoType === 'custom_mp4') {
      videoRef.current.currentTime = newTime;
    }
  };

  const toggleMute = () => {
    if (videoRef.current && videoUrl && videoType === 'custom_mp4') {
      videoRef.current.muted = !isMuted;
    }
    setIsMuted(!isMuted);
  };

  const handleFullscreen = () => {
    if (!playerContainerRef.current) return;
    if (!document.fullscreenElement) {
      playerContainerRef.current.requestFullscreen().catch(() => {});
    } else {
      document.exitFullscreen().catch(() => {});
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const getYouTubeEmbedUrl = (url: string) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return match && match[2].length === 11
      ? `https://www.youtube.com/embed/${match[2]}?autoplay=1&rel=0`
      : null;
  };

  const getLoomEmbedUrl = (url: string) => {
    if (url.includes('loom.com/share/')) {
      return url.replace('loom.com/share/', 'loom.com/embed/');
    }
    return url;
  };

  const getVimeoEmbedUrl = (url: string) => {
    if (!url) return '';
    // If it's already a player.vimeo.com URL, preserve its parameters
    if (url.includes('player.vimeo.com/video/')) {
      return url;
    }
    const match = url.match(/vimeo\.com\/(\d+)/);
    return match ? `https://player.vimeo.com/video/${match[1]}?autoplay=1` : url;
  };

  const isVimeo = videoType === 'vimeo' || (videoUrl && videoUrl.includes('vimeo.com'));
  const isExternalEmbed = videoUrl && (videoType === 'youtube' || isVimeo || videoType === 'loom');

  // Check if it's the 9:16 portrait video or if aspect ratio is 177.78% (9:16 portrait)
  const isPortraitVideo = isVimeo && (videoUrl.includes('1229753592') || videoUrl.includes('portrait'));

  return (
    <div className="w-full max-w-xl mx-auto my-4 sm:my-6 px-0 text-center">
      {/* Video Container with clean border */}
      <div 
        ref={playerContainerRef}
        className={`relative group bg-black rounded-xl sm:rounded-2xl overflow-hidden shadow-2xl border-2 border-black mx-auto ${
          isPortraitVideo ? 'max-w-sm sm:max-w-md' : 'w-full'
        }`}
        onMouseEnter={() => setShowControls(true)}
        onMouseLeave={() => isPlaying && setShowControls(false)}
      >
        {/* Video Area: Responsive container matching user's 177.78% 9:16 ratio when portrait */}
        <div 
          className="relative w-full bg-neutral-950 flex items-center justify-center overflow-hidden"
          style={{
            paddingTop: isPortraitVideo ? '177.78%' : '56.25%',
          }}
        >
          {isExternalEmbed ? (
            <iframe
              src={
                videoType === 'youtube'
                  ? getYouTubeEmbedUrl(videoUrl) || videoUrl
                  : videoType === 'loom'
                  ? getLoomEmbedUrl(videoUrl)
                  : getVimeoEmbedUrl(videoUrl)
              }
              title="Traffic Playbook B"
              className="absolute top-0 left-0 w-full h-full border-0"
              allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            />
          ) : videoUrl && videoType === 'custom_mp4' && hasStarted ? (
            <video
              ref={videoRef}
              src={videoUrl}
              className="absolute top-0 left-0 w-full h-full object-contain"
              onTimeUpdate={() => videoRef.current && setCurrentTime(videoRef.current.currentTime)}
              onLoadedMetadata={() => videoRef.current && setDuration(videoRef.current.duration)}
              onClick={togglePlay}
              playsInline
            />
          ) : (
            <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center overflow-hidden">
              <img
                src={posterImage}
                alt="Bridge Video Presentation"
                referrerPolicy="no-referrer"
                className={`w-full h-full object-cover transition-transform duration-700 ${isPlaying ? 'scale-105 filter brightness-90' : 'filter brightness-95'}`}
              />

              {isPlaying && (
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-black/50 flex flex-col justify-end p-6">
                  <div className="flex items-end gap-1.5 h-10 mb-8 opacity-80 justify-center">
                    {[35, 60, 85, 45, 95, 70, 40, 80, 55, 90, 65, 30, 75, 50, 85, 60, 40, 95, 70, 45, 80, 55, 30, 65].map((height, i) => (
                      <div
                        key={i}
                        className="w-1 bg-red-600 rounded-full animate-pulse"
                        style={{
                          height: `${Math.max(15, (height * ((currentTime + i) % 7 + 1)) / 7)}%`,
                          animationDuration: `${0.4 + (i % 5) * 0.15}s`,
                        }}
                      />
                    ))}
                  </div>
                </div>
              )}

              {isPlaying && showCaptions && currentCaption && (
                <div className="absolute bottom-16 left-4 right-4 text-center pointer-events-none z-20">
                  <span className="inline-block bg-black/85 text-white text-xs sm:text-sm font-medium px-4 py-2 rounded-lg backdrop-blur-sm max-w-2xl border border-white/10 shadow-lg">
                    {currentCaption}
                  </span>
                </div>
              )}
            </div>
          )}

          {(!isExternalEmbed && (!hasStarted || !isPlaying)) && (
            <div className="absolute inset-0 z-20 flex items-center justify-center bg-black/35 backdrop-blur-[1px] transition-all">
              <button
                type="button"
                onClick={togglePlay}
                className="group/btn relative flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-red-600 hover:bg-red-700 text-white shadow-2xl shadow-red-600/50 transition-all duration-200 transform hover:scale-105 active:scale-95 focus:outline-none focus:ring-4 focus:ring-red-500/40 cursor-pointer"
                aria-label="Play video"
              >
                <span className="absolute -inset-2 rounded-full border-2 border-red-500/60 animate-ping pointer-events-none"></span>
                <Play className="w-8 h-8 sm:w-10 sm:h-10 ml-1 fill-white text-white drop-shadow" />
              </button>
            </div>
          )}
        </div>

        {/* Video Controls Bar for custom MP4 */}
        {!isExternalEmbed && (
          <div
            className={`absolute bottom-0 left-0 right-0 z-30 bg-gradient-to-t from-black via-black/90 to-transparent px-3 sm:px-4 pt-4 pb-3 transition-opacity duration-200 ${
              showControls || !isPlaying ? 'opacity-100' : 'opacity-0 pointer-events-none'
            }`}
          >
            <div className="relative w-full flex items-center mb-2 group/slider">
              <input
                type="range"
                min="0"
                max={duration}
                value={currentTime}
                onChange={handleSeek}
                className="w-full h-1.5 sm:h-2 bg-neutral-700 rounded-lg appearance-none cursor-pointer accent-red-600 focus:outline-none"
                style={{
                  background: `linear-gradient(to right, #dc2626 ${(currentTime / duration) * 100}%, #404040 ${(currentTime / duration) * 100}%)`,
                }}
              />
            </div>

            <div className="flex items-center justify-between text-white text-xs">
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={togglePlay}
                  className="p-1 hover:text-red-400 transition-colors focus:outline-none"
                  aria-label={isPlaying ? 'Pause' : 'Play'}
                >
                  {isPlaying ? <Pause className="w-4 h-4 fill-current" /> : <Play className="w-4 h-4 fill-current" />}
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setCurrentTime(0);
                    if (videoRef.current) videoRef.current.currentTime = 0;
                  }}
                  className="p-1 hover:text-red-400 transition-colors hidden sm:block"
                  title="Rewind"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                </button>

                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    onClick={toggleMute}
                    className="p-1 hover:text-red-400 transition-colors"
                  >
                    {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                  </button>
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.05"
                    value={isMuted ? 0 : volume}
                    onChange={(e) => {
                      const val = parseFloat(e.target.value);
                      setVolume(val);
                      setIsMuted(val === 0);
                      if (videoRef.current) videoRef.current.volume = val;
                    }}
                    className="w-12 sm:w-16 h-1 bg-neutral-600 rounded appearance-none cursor-pointer accent-red-600"
                  />
                </div>

                <span className="font-mono text-[11px] text-neutral-300 ml-1">
                  {formatTime(currentTime)} / {formatTime(duration)}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setShowCaptions(!showCaptions)}
                  className={`text-[11px] font-bold px-1.5 py-0.5 rounded border transition-colors ${
                    showCaptions ? 'bg-red-600 text-white border-red-600' : 'text-neutral-400 border-neutral-600 hover:text-white'
                  }`}
                  title="Captions"
                >
                  CC
                </button>

                <button
                  type="button"
                  onClick={() => {
                    const speeds = [1, 1.25, 1.5, 2];
                    const next = speeds[(speeds.indexOf(playbackSpeed) + 1) % speeds.length];
                    setPlaybackSpeed(next);
                    if (videoRef.current) videoRef.current.playbackRate = next;
                  }}
                  className="text-[11px] font-mono font-medium px-1.5 py-0.5 rounded bg-neutral-800 hover:bg-neutral-700 text-neutral-300 transition-colors"
                >
                  {playbackSpeed}x
                </button>

                <button
                  type="button"
                  onClick={handleFullscreen}
                  className="p-1 hover:text-red-400 transition-colors"
                  aria-label="Fullscreen"
                >
                  <Maximize className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Button directly under the video as requested */}
      <div className="mt-6 sm:mt-8 max-w-md mx-auto">
        <a
          href={destinationUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="group relative w-full flex items-center justify-center gap-2.5 px-6 py-4 bg-red-600 hover:bg-red-700 active:bg-red-800 text-white font-extrabold text-base sm:text-lg rounded-xl shadow-xl shadow-red-600/30 transition-all duration-200 transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
        >
          <span className="tracking-wide uppercase">
            SEE THE 0–$2K BLUEPRINT
          </span>
          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </a>
        <p className="text-xs text-neutral-500 mt-2 text-center italic">
          Click above to see the full details.
        </p>
      </div>
    </div>
  );
};
