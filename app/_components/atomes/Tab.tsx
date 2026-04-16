"use client";

import React from "react";

type TabProps = {
    slug: string;
    isActive: boolean;
    tabId: string;
    pictureId: string;
    children: React.ReactNode;
}

export default function Tab({ slug, isActive, tabId, pictureId, children }: TabProps) {


    const styles = "uppercase ff-sans-cond text-accent letter-spacing-2";
    const variants = {
        active: "",
        inactive: "",
    };
    const variant = isActive ? "active" : "inactive";
    const classNames = `${styles} ${variants[variant]}`;

    return (
        <button
        key={slug}
        aria-selected={isActive}
        role="tab"
        aria-controls={tabId}
        className={classNames}
        tabIndex={isActive ? 0 : -1}
        data-image={pictureId}
      >
        {children}
      </button>
    );
}