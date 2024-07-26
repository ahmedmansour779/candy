interface Base {
  id: number;
}

interface IResPaginated<T> {
  meta: IMeta;
  data: T[];
}

interface LoginData {
  username: string;
  password: string;
}

interface Folder {
  folders: Folders[];
}
interface country {
  name: { common: string };
  timezones: string[];
}

interface Folders {
  hash: string;
  id: number;
  name: string;
  parent_id: number | null;
  path: string;
  type: "folder";
}
interface WorkSpace {
  created_at: string;
  id: number;
  members_count: number;
  name: string;
  owner_id: number;
  updated_at: string;
}

interface User extends Base {
  username: string;
  space_available: null | number;
  language: string | null;
  country: string | null;
  avatar: string;
  card_expires: null | string;
  paypal_id: string | null;
  banned_at: null | string;
  display_name: string;
  model_type: string;
  email: string;
}
interface AddUser extends Base {
  username: string;
  space_available: null | number;
  language: string | null;
  country: string | null;
  avatar: string;
  card_expires: null | string;
  paypal_id: string | null;
  banned_at: null | string;
  display_name: string;
  model_type: string;
  email: string;
}
interface Role extends Base {
  name: string;
  default: boolean;
  guests: boolean;
  type: string;
  internal?: number;
  description?: string | undefined;
}

interface AddRole extends Base {
  name: string;
  default: number;
  guests: number;
  type: string;
  internal?: number;
  description: string | null;
}

interface Plan extends Base {
  user_name: string;
  user_email: string;
  description: string;
  feature_list: string[];
  position: number;
  recommended: boolean;
  free: boolean;
  hidden: boolean;
  available_space: number;
  created_at: string;
  renews_at: string;
  ends_at: string;
  name: string;
}

interface AddPlan {
  name: string;
  description: string;
  hidden: boolean;
  free: boolean;
  recommended: boolean;
  position: number;
  available_space: number;
  feature_list: string[];
  permissions?: number[];
  prices?: {
    amount: number;
    interval_count: number;
    interval: "month" | "year";
    currency: string;
  }[];
}

interface Subscription extends Base {
  user_email: string;
  user_name: string;
  plan_id: number;
  status: boolean;
  description: string;
  created_at: string;
  ends_at: string;
  renews_at: string;
}

interface Setting {
  General: {
    app_url: "https://angeloai.co";
    "homepage->type": "landingPage";
    "themes->default_id": 0;
    "themes->user_change": true;
  };
  Drive: {
    "drive->default_view": "grid";
    "drive->send_share_notification": false;
    "share->suggest_emails": false;
  };
  Subscriptions: {
    "billing->enable": false;
    "billing->paypal->enable": false;
    "billing->paypal_test_mode": true;
    "billing->stripe->enable": false;
    "billing->accepted_cards": '["visa","mastercard","american-express","discover"]';
    "billing->invoice->address": "ali";
    "billing->invoice->notes": "ali";
  };
  Localization: {
    "dates->default_timezone": "auto";
    "locale->default": "auto";
    "dates->format": "short";
    "i18n->enable": true;
  };
  Authentication: {
    mail_from_address: "aliabdiali@gmail.com";
    "mail->contact_page_address": "mepage@com";
    mail_from_name: "ali ana";
    mail_driver: "sendmail";
  };
  uploads: {
    "uploads->public_driver": "local";
    "uploads->uploads_driver": "local";
    static_file_delivery: "";
    "uploads->chunk_size": 15728640;
    "uploads->max_size": 52428800;
    "uploads->available_space": 104857600;
    "uploads->allowed_extensions": "";
    "uploads->blocked_extensions": [
      "exe",
      "application/x-msdownload",
      "x-dosexec"
    ];
  };
  Outgoing_email_settings: {
    require_email_confirmation: true;
    "registration->disable": true;
    single_device_login: true;
    "social->compact_buttons": true;
    "auth->domain_blacklist": "aa";
  };
  analytics: {
    "analytics->gchart_api_key": "";
  };
}

interface ISettingKey {
  app_url?: string;
  "homepage->type"?: string;
  "themes->default_id"?: number;
  "themes->user_change"?: boolean;
  "drive->default_view"?: string;
  "drive->send_share_notification"?: boolean;
  "share->suggest_emails"?: boolean;
  "billing->enable"?: boolean;
  "billing->paypal->enable"?: boolean;
  "billing->paypal_test_mode"?: boolean;
  "billing->stripe->enable"?: boolean;
  "billing->accepted_cards"?: string[];
  "billing->invoice->address"?: string;
  "billing->invoice->notes"?: string;
  "dates->default_timezone"?: string;
  "locale->default"?: string;
  "dates->format"?: string;
  "i18n->enable"?: boolean;
  mail_from_address?: string;
  "mail->contact_page_address"?: string;
  mail_from_name?: string;
  mail_driver?: string;
  "uploads->public_driver"?: string;
  "uploads->uploads_driver"?: string;
  static_file_delivery?: string;
  "uploads->chunk_size"?: number;
  "uploads->max_size"?: number;
  "uploads->available_space"?: number;
  "uploads->allowed_extensions"?: string;
  "uploads->blocked_extensions"?: string[];
  require_email_confirmation?: boolean;
  "registration->disable"?: boolean;
  single_device_login?: boolean;
  "social->compact_buttons"?: boolean;
  "auth->domain_blacklist"?: string;
  "analytics->gchart_api_key"?: string;
}
interface GeneralSettings {
  app_url: string;
  "homepage->type": string;
  "themes->default_id": number;
  "themes->user_change": boolean;
}

interface DriveSettings {
  "drive->default_view": string;
  "drive->send_share_notification": boolean;
  "share->suggest_emails": boolean;
}

export interface SubscriptionSettings {
  "billing->enable": boolean;
  "billing->paypal->enable": boolean;
  "billing->paypal_test_mode": boolean;
  "billing->stripe->enable": boolean;
  "billing->accepted_cards": string[];
  "billing->invoice->address": string;
  "billing->invoice->notes": string;
}

interface LocalizationSettings {
  "dates->default_timezone": string;
  "locale->default": string;
  "dates->format": string;
  "i18n->enable": boolean;
}

interface AuthenticationSettings {
  mail_from_address: string;
  "mail->contact_page_address": string;
  mail_from_name: string;
  mail_driver: string;
}

interface UploadsSettings {
  "uploads->public_driver": string;
  "uploads->uploads_driver": string;
  static_file_delivery: string;
  "uploads->chunk_size": number;
  "uploads->max_size": number;
  "uploads->available_space": number;
  "uploads->allowed_extensions": string;
  "uploads->blocked_extensions": string[];
}

interface OutgoingEmailSettings {
  require_email_confirmation: boolean;
  "registration->disable": boolean;
  single_device_login: boolean;
  "social->compact_buttons": boolean;
  "auth->domain_blacklist": string;
}

interface AnalyticsSettings {
  "analytics->gchart_api_key": string;
}

interface Setting {
  General: GeneralSettings;
  Drive: DriveSettings;
  Subscriptions: SubscriptionSettings;
  Localization: LocalizationSettings;
  Authentication: AuthenticationSettings;
  Uploads: UploadsSettings;
  Outgoing_email_settings: OutgoingEmailSettings;
  analytics: AnalyticsSettings;
}
