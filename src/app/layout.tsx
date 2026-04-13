import type { Metadata } from "next";
import "./globals.css";
import { Navbar } from "@/components/Navbar";

export const metadata: Metadata = {
  title: "DeepBrain — 个人 AI 知识大脑",
  description: "用 AI 构建、搜索、连接你的个人知识网络",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-CN">
      <body className="bg-gray-50 text-gray-900 antialiased">
        <Navbar />
        {children}
        <footer className="text-center py-10 text-gray-300 text-sm">
          Powered by DeepBrain · 个人 AI 知识大脑
        </footer>
      </body>
    </html>
  );
}
