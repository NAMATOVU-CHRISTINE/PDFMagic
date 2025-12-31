import { api } from './api';

export const pdfApi = {
  merge: (files: File[]) => {
    const formData = new FormData();
    files.forEach(f => formData.append('files', f));
    return api.post('/pdf/merge', formData);
  },

  split: (file: File, pages: string) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('pages', pages);
    return api.post('/pdf/split', formData);
  },

  compress: (file: File, quality: string) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('quality', quality);
    return api.post('/pdf/compress', formData);
  },

  rotate: (file: File, rotation: string) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('rotation', rotation);
    return api.post('/rotate', formData);
  },
};

export default pdfApi;
