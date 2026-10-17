export interface SearchBeatmapFromMd5 {
  accuracy: number
  ar: number
  beatmapset: Beatmapset
  beatmapset_id: number
  bpm: number
  checksum: string
  convert: boolean
  count_circles: number
  count_sliders: number
  count_spinners: number
  cs: number
  current_user_playcount: number
  deleted_at: null
  difficulty_rating: number
  drain: number
  failtimes: Failtimes
  hit_length: number
  id: number
  is_scoreable: boolean
  last_updated: Date
  lazer_only: boolean
  max_combo: number
  mode: string
  mode_int: number
  owners: Owner[]
  passcount: number
  playcount: number
  ranked: number
  status: string
  total_length: number
  url: string
  user_id: number
  version: string
}

export interface Beatmapset {
  anime_cover: boolean
  artist: string
  artist_unicode: string
  availability: Availability
  bpm: number
  can_be_hyped: boolean
  covers: Covers
  creator: string
  deleted_at: null
  discussion_enabled: boolean
  discussion_locked: boolean
  favourite_count: number
  genre_id: number
  hype: null
  id: number
  is_scoreable: boolean
  language_id: number
  last_updated: Date
  legacy_thread_url: string
  nominations_summary: NominationsSummary
  nsfw: boolean
  offset: number
  play_count: number
  preview_url: string
  ranked: number
  ranked_date: Date
  rating: number
  ratings: number[]
  source: string
  spotlight: boolean
  status: string
  storyboard: boolean
  submitted_date: Date
  tags: string
  title: string
  title_unicode: string
  track_id: null
  user_id: number
  video: boolean
}

export interface Availability {
  download_disabled: boolean
  more_information: null
}

export interface Covers {
  card: string
  'card@2x': string
  cover: string
  'cover@2x': string
  list: string
  'list@2x': string
  slimcover: string
  'slimcover@2x': string
}

export interface NominationsSummary {
  current: number
  eligible_main_rulesets: string[]
  required_meta: RequiredMeta
}

export interface RequiredMeta {
  main_ruleset: number
  non_main_ruleset: number
}

export interface Failtimes {
  exit: number[]
  fail: number[]
}

export interface Owner {
  id: number
  username: string
}
