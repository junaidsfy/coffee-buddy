import React from 'react';
import { motion } from 'motion/react';
import { Youtube, Play, ExternalLink, Eye, Clock } from 'lucide-react';
import { YOUTUBE_VIDEOS } from '../data/gallery';
import { CAFE_DATA } from '../data/cafe';
import { trackEvent } from '../utils/analytics';

export const YouTubeSection: React.FC = () => {
  const handleVideoClick = (videoUrl: string, title: string) => {
    trackEvent('youtube_clicked', {
      source: 'youtube_section_card',
      video_title: title,
    });
    window.open(videoUrl, '_blank', 'noopener,noreferrer');
  };

  const handleChannelClick = () => {
    trackEvent('youtube_clicked', { source: 'youtube_channel_header' });
  };

  return (
    <section className="py-16 sm:py-24 bg-[#FAF7F2] border-b border-[#EFE7DD]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 sm:mb-12 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FF0000]/10 text-[#CC0000] text-xs font-bold uppercase tracking-wider mb-2">
              <Youtube className="w-3.5 h-3.5 text-[#FF0000]" />
              YouTube Channel
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold text-[#231B15] tracking-tight">
              Watch Coffee Buddys
            </h2>
            <p className="mt-1.5 text-xs sm:text-sm text-[#6E5D4F]">
              Brewing tutorials, origin stories, and café vlogs on our official channel.
            </p>
          </div>

          <a
            href={CAFE_DATA.socials.youtube}
            target="_blank"
            rel="noopener noreferrer"
            onClick={handleChannelClick}
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-[#CC0000] hover:text-[#990000] transition-colors"
          >
            <span>Subscribe @coffeebuddy2026</span>
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>

        {/* Video Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {YOUTUBE_VIDEOS.map((vid, idx) => (
            <motion.div
              key={vid.id}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              onClick={() => handleVideoClick(vid.url, vid.title)}
              className="bg-white rounded-2xl overflow-hidden border border-[#E9DFD3] shadow-sm hover:shadow-md hover:border-[#CC0000]/40 transition-all cursor-pointer group flex flex-col"
            >
              {/* Thumbnail */}
              <div className="relative aspect-video bg-black overflow-hidden">
                <img
                  src={vid.thumbnail}
                  alt={vid.title}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90"
                />
                
                {/* Play Button Overlay */}
                <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/40 transition-colors">
                  <div className="w-12 h-12 rounded-full bg-[#FF0000] group-hover:scale-110 transition-transform flex items-center justify-center text-white shadow-lg">
                    <Play className="w-5 h-5 fill-white ml-0.5" />
                  </div>
                </div>

                {/* Duration */}
                <div className="absolute bottom-2.5 right-2.5 px-2 py-0.5 rounded bg-black/80 text-white text-[10px] font-bold flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  <span>{vid.duration}</span>
                </div>
              </div>

              {/* Info */}
              <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-bold text-sm sm:text-base text-[#231B15] group-hover:text-[#CC0000] transition-colors line-clamp-2 leading-snug">
                    {vid.title}
                  </h3>
                  <p className="mt-1.5 text-xs text-[#6E5D4F] line-clamp-2 font-light leading-relaxed">
                    {vid.description}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-[#F2ECE3] flex items-center justify-between text-xs text-[#8A7A6E]">
                  <span className="flex items-center gap-1">
                    <Eye className="w-3.5 h-3.5" />
                    {vid.views}
                  </span>
                  <span className="text-[#CC0000] font-semibold flex items-center gap-1">
                    Watch Video <ExternalLink className="w-3 h-3" />
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};
