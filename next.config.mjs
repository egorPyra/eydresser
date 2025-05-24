import path from 'node:path';

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['avatars.mds.yandex.net', 'atletika64.ru', 'i.pinimg.com', 'fl-fashion-clothes.storage.yandexcloud.net'],
  },
  webpack: (config) => {
    config.resolve.alias['@'] = path.resolve(process.cwd(), ''); // если компоненты в src
    return config;
  }
};

export default nextConfig;
