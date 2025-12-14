'use client'
import { IconBrandGithub, IconBrandInstagram, IconBrandLinkedin, IconMail } from "@tabler/icons-react";
import { usePathname } from "next/navigation";

export default function Footer() {
  const pathname=usePathname()
  if (pathname.includes('/project/')||pathname.includes('/admin')||pathname.includes("/blog")) return
  return (
    <footer className="w-full bg-gray-100 text-neutral-900 dark:bg-neutral-900 dark:text-neutral-300 py-14 absolute">
      <div className="max-w-7xl mx-auto px-6">
        {/* Top Section */}
        <div className="grid md:grid-cols-4 gap-10">
          {/* Brand */}
          <div>
            <h2 className="text-2xl font-bold text-black dark:text-white">YourBrand</h2>
            <p className="mt-3 text-neutral-800 dark:text-neutral-400 text-sm">
              Building websites, apps & smart solutions that make your ideas come alive.
            </p>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-semibold text-black dark:text-white mb-3">Services</h3>
            <ul className="space-y-2 text-sm text-neutral-800 dark:text-neutral-400">
              <li>Web Development</li>
              <li>Mobile App Development</li>
              <li>Full-Stack Solutions</li>
              <li>API & Back-End</li>
              <li>AI Integration</li>
              <li>Mentorship</li>
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-black dark:text-white mb-3">Quick Links</h3>
            <ul className="space-y-2 text-sm text-neutral-800 dark:text-neutral-400">
              <li>Home</li>
              <li>Create Project</li>
              <li>Mentorship</li>
              <li>Blog</li>
              <li>Contact</li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold text-black dark:text-white mb-3">Contact</h3>
            <p className="text-neutral-800 dark:text-neutral-400 text-sm mb-4">
              Need help with a project? Let's build something great.
            </p>
            <div className="flex gap-4">
              <a><IconMail className="w-6 h-6 hover:text-white transition" /></a>
              <a><IconBrandGithub className="w-6 h-6 hover:text-white transition" /></a>
              <a><IconBrandInstagram className="w-6 h-6 hover:text-white transition" /></a>
              <a><IconBrandLinkedin className="w-6 h-6 hover:text-white transition" /></a>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-neutral-700 mt-10 pt-6 text-center text-sm text-neutral-900 dark:text-neutral-500">
          © {new Date().getFullYear()} YourBrand. All rights reserved.
        </div>

      </div>
    </footer>
  );
}
