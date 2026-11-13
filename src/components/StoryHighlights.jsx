import React, { useState, useEffect } from 'react';
import { X, Play, Pause, ChevronLeft, ChevronRight, ShoppingBag } from 'lucide-react';
import { storeData } from '../data/storeData';

export default function StoryHighlights({
  onSelectCategory,
  externalStoryIndex = null,
  onCloseExternal
}) {
  const [internalStoryIndex, setInternalStoryIndex] = useState(null);
  const [progress, setProgress] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const activeStoryIndex = externalStoryIndex !== null ? externalStoryIndex : internalStoryIndex;

  const setActiveIndex = (idx) => {
    setInternalStoryIndex(idx);
    if (idx === null && onCloseExternal) {
      onCloseExternal();
    }
  };

  useEffect(() => {
    if (externalStoryIndex !== null) {
      setProgress(0);
      setIsPaused(false);
    }
  }, [externalStoryIndex]);

  // Story progression timer
  useEffect(() => {
    if (activeStoryIndex === null || isPaused) return;

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          // move to next story or close
          if (activeStoryIndex < storeData.stories.length - 1) {
            setActiveIndex(activeStoryIndex + 1);
            return 0;
          } else {
            setActiveIndex(null);
            return 0;
          }
        }
        return prev + 2; // ~5 seconds per story
      });
    }, 100);

    return () => clearInterval(interval);
  }, [activeStoryIndex, isPaused]);

  const openStory = (idx) => {
    setActiveIndex(idx);
    setProgress(0);
    setIsPaused(false);
  };

  const closeStory = () => {
    setActiveIndex(null);
    setProgress(0);
  };

  const nextStory = () => {
    if (activeStoryIndex < storeData.stories.length - 1) {
      setActiveIndex(activeStoryIndex + 1);
      setProgress(0);
    } else {
      closeStory();
    }
  };

  const prevStory = () => {
    if (activeStoryIndex > 0) {
      setActiveIndex(activeStoryIndex - 1);
      setProgress(0);
    }
  };

  const currentStory = activeStoryIndex !== null ? storeData.stories[activeStoryIndex] : null;

  return (
    <>
      {/* HORIZONTAL STORY CIRCLES */}
      <section className="w-full bg-[#efefef] py-4 px-4 md:px-8 border-b border-neutral-300/50 overflow-x-auto no-scrollbar">
        <div className="max-w-[1720px] mx-auto flex items-center gap-6 md:gap-8 justify-start sm:justify-center">
          {storeData.stories.map((story, idx) => (
            <button
              key={story.id}
              onClick={() => openStory(idx)}
              className="flex flex-col items-center gap-2 group shrink-0 focus:outline-hidden"
            >
              {/* Outer ring */}
              <div className="relative p-[2.5px] rounded-full transition-transform duration-300 group-hover:scale-105 bg-gradient-to-tr from-orange-500 via-rose-500 to-blue-700">
                <div className="p-0.5 bg-white rounded-full">
                  <div className="w-16 h-16 md:w-20 md:h-20 rounded-full overflow-hidden bg-neutral-200">
                    <img
                      src={story.image}
                      alt={story.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                </div>
              </div>

              {/* Title & badge */}
              <div className="text-center">
                <span className="text-[11px] md:text-xs font-semibold tracking-tight text-neutral-900 block group-hover:text-black">
                  {story.title}
                </span>
                <span className="text-[9px] font-mono uppercase text-neutral-500 block">
                  {story.linkText}
                </span>
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* FULLSCREEN STORY VIEWER MODAL */}
      {currentStory && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-0 md:p-6">
          <div className="relative w-full h-full md:max-w-md md:h-[85vh] bg-neutral-900 rounded-none md:rounded-2xl overflow-hidden shadow-2xl flex flex-col justify-between">
            {/* Top Bar with Progress Bars */}
            <div className="absolute top-0 inset-x-0 p-4 z-20 bg-gradient-to-b from-black/70 to-transparent">
              {/* Segmented progress indicators */}
              <div className="flex gap-1.5 mb-3">
                {storeData.stories.map((s, idx) => (
                  <div key={s.id} className="h-1 flex-1 bg-white/30 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-white transition-all duration-100 ease-linear rounded-full"
                      style={{
                        width:
                          idx < activeStoryIndex
                            ? '100%'
                            : idx === activeStoryIndex
                            ? `${progress}%`
                            : '0%'
                      }}
                    />
                  </div>
                ))}
              </div>

              {/* Story Header */}
              <div className="flex items-center justify-between text-white">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full overflow-hidden border border-white/50">
                    <img src={currentStory.image} alt={currentStory.title} className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold leading-none">{currentStory.title}</h4>
                    <span className="text-[10px] font-mono text-white/70 uppercase">{currentStory.badge}</span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setIsPaused(!isPaused)}
                    className="text-white/80 hover:text-white p-1"
                    aria-label={isPaused ? 'Play' : 'Pause'}
                  >
                    {isPaused ? <Play size={16} /> : <Pause size={16} />}
                  </button>
                  <button
                    onClick={closeStory}
                    className="text-white/80 hover:text-white p-1"
                    aria-label="Close"
                  >
                    <X size={20} />
                  </button>
                </div>
              </div>
            </div>

            {/* Main Visual Display */}
            <div className="w-full h-full relative">
              <img
                src={currentStory.media}
                alt={currentStory.title}
                className="w-full h-full object-cover"
              />

              {/* Prev / Next Tap Navigation overlay */}
              <div className="absolute inset-0 flex">
                <div
                  className="w-1/2 h-full cursor-pointer z-10"
                  onClick={prevStory}
                  aria-label="Previous story"
                />
                <div
                  className="w-1/2 h-full cursor-pointer z-10"
                  onClick={nextStory}
                  aria-label="Next story"
                />
              </div>
            </div>

            {/* Bottom CTA Bar */}
            <div className="absolute bottom-0 inset-x-0 p-5 z-20 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex items-center justify-between">
              <div>
                <span className="text-[10px] font-mono text-white/70 uppercase tracking-wider block">Category</span>
                <span className="text-white font-semibold text-sm">{currentStory.tag}</span>
              </div>

              <button
                onClick={() => {
                  closeStory();
                  onSelectCategory(currentStory.tag);
                }}
                className="flex items-center gap-2 bg-white text-black hover:bg-neutral-100 font-semibold px-5 py-2.5 rounded-full text-xs uppercase tracking-wider transition-colors shadow-lg"
              >
                <ShoppingBag size={14} />
                <span>{currentStory.linkText}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
