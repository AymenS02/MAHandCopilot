import { dataset, projectId } from '../env';

/**
 * Get the URL for a Sanity file asset
 * @param assetRef - The asset reference from Sanity (e.g., from pdfFile.asset._ref)
 * @returns The full URL to the file
 */
export const urlForFile = (assetRef: string): string => {
  // Remove the 'file-' prefix if present
  const fileId = assetRef.replace(/^file-/, '');
  return `https://cdn.sanity.io/files/${projectId}/${dataset}/${fileId}`;
};

