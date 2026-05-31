export interface Rsvp {
  id?: string;
  name: string;
  attendance: 'hadir' | 'tidak_hadir' | 'belum_konfirmasi';
  guest_count: number;
  message: string;
  created_at?: string;
}

export interface Wish {
  id?: string;
  name: string;
  message: string;
  created_at?: string;
}

export interface BankAccount {
  bank: string;
  account_number: string;
  account_name: string;
  icon?: string;
}

export interface WeddingConfig {
  id?: string;
  bride_name: string;
  groom_name: string;
  bride_full_name: string;
  groom_full_name: string;
  bride_parents: string;
  groom_parents: string;
  wedding_date: string;
  akad_time: string;
  resepsi_time: string;
  akad_location: string;
  resepsi_location: string;
  akad_maps_url: string;
  resepsi_maps_url: string;
  cover_image: string;
  gallery_images: string[];
  music_url: string;
  qris_image: string;
}

export interface LoveStory {
  id?: string;
  title: string;
  date: string;
  description: string;
  icon?: string;
}
