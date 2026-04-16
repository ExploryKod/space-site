"use client";

import React from "react";

type TabProps = {
    slug: string;
    isActive: boolean;
    isFocusable: boolean;
    tabId: string;
    pictureId: string;
    onClick: () => void;
    onFocus: () => void;
    buttonRef: (node: HTMLButtonElement | null) => void;
    children: React.ReactNode;
}

export default function Tab({
  slug,
  isActive,
  isFocusable,
  tabId,
  pictureId,
  onClick,
  onFocus,
  buttonRef,
  children,
}: TabProps) {


    const styles = "uppercase ff-sans-cond text-accent letter-spacing-2";
    const variants = {
        active: "",
        inactive: "",
    };
    const variant = isActive ? "active" : "inactive";
    const classNames = `${styles} ${variants[variant]}`;

    return (
        <button
        type="button"
        aria-selected={isActive}
        role="tab"
        id={`${slug}-trigger`}
        aria-controls={tabId}
        className={classNames}
        tabIndex={isFocusable ? 0 : -1}
        data-image={pictureId}
        onClick={onClick}
        onFocus={onFocus}
        ref={buttonRef}
      >
        {children}
      </button>
    );
}