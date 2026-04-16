# Refactor 02

## ThemeSwitcher cleanup

### Context

CI reported a React lint error in `modules/app/react/components/ThemeSwitcher.tsx`:

- `react-hooks/set-state-in-effect`

The component used the classic mounted-flag pattern:

- local `mounted` state
- `useEffect(() => setMounted(true), [])`

This works in many apps, but the current React lint rules flag synchronous `setState` inside effects because it can lead to cascading renders and is often a sign that the component can be expressed more declaratively.

### Change made

The component was refactored to:

- remove `mounted` state
- remove the `useEffect`
- use `resolvedTheme` from `next-themes`
- derive the button label and icon directly from `resolvedTheme ?? "dark"`

### Why this is better

- No effect-driven state just to know whether the component has mounted.
- Less component complexity and fewer render phases.
- Better alignment with current React guidance and lint expectations.
- Keeps the same user-facing behavior for toggling theme.

### Remaining note

There is still a non-blocking style warning suggesting:

- `min-w-[7.5rem]` -> `min-w-30`

This does not break CI logic and can be handled later as styling cleanup.
