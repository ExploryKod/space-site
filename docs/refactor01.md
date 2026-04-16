# CI Error Notes

## Fixed so far

### `@next/next/no-html-link-for-pages`

- File: `app/[lng]/page.tsx`
- Issue: internal navigation to the destination page used a raw `<a>` tag.
- Fix: replaced it with `next/link` and used the localized route `/${lng}/destination`.
- Why: this matches Next.js navigation rules and preserves locale-aware client routing.

### `react-hooks/set-state-in-effect` in `MobileNav`

- File: `app/_components/layout/MobileNav.tsx`
- Issue: the menu was closed with `setIsOpen(false)` inside a `useEffect` watching `pathname`.
- Fix: removed that effect and close the menu directly in each navigation link `onClick`.
- Why: state changes now happen at the interaction boundary instead of synchronously inside an effect, which avoids cascading-render lint issues and keeps the same UX during normal navigation.

## Remaining CI issues

- `react-hooks/set-state-in-effect` in `modules/app/react/components/ThemeSwitcher.tsx`
- `@typescript-eslint/no-explicit-any` in:
  - `modules/app/react/DependencyProvider.tsx`
  - `modules/store/redux/store.ts`
  - `modules/testing/environements.ts`
- `@typescript-eslint/no-empty-object-type` in `modules/store/dependencies.ts`
- Warnings still present in:
  - `jest.config.ts`
  - `modules/app/main.ts`
  - `modules/auth/infra/services/resend-email.service.ts`

## Notes

- The CI workflow is now useful because it surfaced both framework-specific issues (`next/link`, React effect rules) and type-boundary issues (`any`, `{}`).
- When fixing the remaining errors, prefer architectural fixes over disabling lint rules.
