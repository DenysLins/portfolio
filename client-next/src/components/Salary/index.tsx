import * as React from "react";
import { useTranslation } from "next-i18next";
import Link from "next/link";
import { useRouter } from "next/router";

import style from "@/styles/components/salary.module.scss";

const Salary = () => {
  const { t } = useTranslation("navigation");
  const router = useRouter();

  return (
    <div className={style.container}>
      <div className={style.projects}>
        <div className={style.project}>
          1.
          <Link href={"/projects/salary"}>{t("1")}</Link>
        </div>
      </div>
    </div>
  );
};

export default Salary;
