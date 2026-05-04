export const isPreviewAvailable = (createdAt: Date) =>
  createdAt > new Date(Date.now() - 24 * 60 * 60 * 1000);
