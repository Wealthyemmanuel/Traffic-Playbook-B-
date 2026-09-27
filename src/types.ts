export interface PageConfig {
  videoType: 'custom_mp4' | 'youtube' | 'vimeo' | 'loom';
  videoUrl: string;
  destinationUrl: string;
  senderName?: string;
  supportEmail: string;
  supportWhatsApp: string;
}

export const TARGET_AFFILIATE_URL = 'https://internetwealthtraining.selar.com/page/2k?affiliate=qd6e';

export const DEFAULT_CONFIG: PageConfig = {
  videoType: 'vimeo',
  videoUrl: 'https://player.vimeo.com/video/1229753592?badge=0&autopause=0&player_id=0&app_id=58479&autoplay=1&muted=1',
  destinationUrl: TARGET_AFFILIATE_URL,
  senderName: 'Emmanuel',
  supportEmail: 'hello@emmanuelifennna.com.ng',
  supportWhatsApp: 'https://wa.me/2347033570538',
};
