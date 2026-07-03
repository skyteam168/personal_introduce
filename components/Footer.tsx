/*
 * @Author: flyknit 867162548@qq.com
 * @Date: 2026-07-03 08:46:36
 * @Description: 
 * @FilePath: \personal_introduce\components\Footer.tsx
 * @LastEditTime: 2026-07-03 10:12:06
 * @LastEditors: flyknit 867162548@qq.com
 * 
 * Copyright (c) 2026 by ${867162548@qq.com}, All Rights Reserved. 
 */
"use client";

import { useLanguage } from "@/components/providers/LanguageProvider";

export function Footer() {
  const { t } = useLanguage();
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border/50 py-12">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 sm:flex-row">
        <p className="text-sm text-muted">
          © {year} Xiaowei Yang. {t.footer.rights}
        </p>
        {/* <p className="text-xs text-muted/60">{t.footer.built}</p> */}
      </div>
    </footer>
  );
}
