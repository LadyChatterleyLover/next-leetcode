/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    domains: [
      'assets.leetcode.cn',
      'static.leetcode-cn.com',
      'static.leetcode.cn',
      'assets.leetcode-cn.com',
      'pic.leetcode-cn.com',
      'pic.leetcode.cn',
      'assets.leetcode.com',
    ],
  },
}

module.exports = nextConfig
