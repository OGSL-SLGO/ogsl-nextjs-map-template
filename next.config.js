const withFlowbiteReact = require("flowbite-react/plugin/nextjs");
const yaml = require('js-yaml');
const fs = require('fs');

const config = yaml.load(fs.readFileSync('./config.yaml', 'utf8'));
const createNextIntlPlugin = require('next-intl/plugin');
const withNextIntl = createNextIntlPlugin();
const github_repository = process.env.GITHUB_REPOSITORY;
var basePath = ''
if (github_repository) {
    basePath = `/${github_repository.split('/')[1]}`;
    
}

var nextConfig = {
    output: 'export', // Enables static export
    images: { unoptimized: true },
    basePath: basePath,
    env: {
        CONFIG: JSON.stringify(config),
        BASE_PATH: basePath,
    }
};

nextConfig = withFlowbiteReact(nextConfig)
nextConfig = withNextIntl(nextConfig);

module.exports = nextConfig;