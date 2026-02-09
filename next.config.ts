import { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const nextConfig: NextConfig = {
    output: "export",
    basePath: "/bouncinncrm",
    trailingSlash: true,
    images: {
        unoptimized: true,
        remotePatterns: [
            {
                protocol: "https",
                hostname: "images.unsplash.com",
            },
            {
                protocol: "https",
                hostname: "plus.unsplash.com",
            },
        ],
    },
};

import fs from 'fs';
import path from 'path';

const i18nPath = './src/i18n/request.ts';
const absoluteI18nPath = path.resolve(__dirname, 'src/i18n/request.ts');

console.log('--- Debugging next-intl config ---');
console.log('Current directory:', process.cwd());
console.log('__dirname:', __dirname);
console.log('Checking relative path:', i18nPath);
console.log('Checking absolute path:', absoluteI18nPath);
console.log('File exists (relative):', fs.existsSync(i18nPath));
console.log('File exists (absolute):', fs.existsSync(absoluteI18nPath));
console.log('----------------------------------');

const withNextIntl = createNextIntlPlugin(i18nPath);
export default withNextIntl(nextConfig);
