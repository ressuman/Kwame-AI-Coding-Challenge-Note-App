export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const LIMITS = {
  TITLE_MAX_LENGTH: 100,
  BODY_MAX_LENGTH: 20000,
  AUTO_SAVE_DELAY: 1000,
  TOAST_DURATION: 3000,
} as const;

export const TOAST_CONFIG = {
  position: "top-right" as const,
  autoClose: LIMITS.TOAST_DURATION,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
};
