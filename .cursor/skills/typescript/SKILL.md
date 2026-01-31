---
name: typescript
description: Apply TypeScript best practices for strict typing, explicit public API types, and declaration-safe code. Use when writing or editing TypeScript files, adding or refining types, or when the user asks for TypeScript guidance.
---

# TypeScript

## When to Apply

- Writing or editing `.ts` files
- Adding types, interfaces, or generics
- User asks for TypeScript help or strict typing
- Fixing type errors or improving type safety

## Core Principles

### 1. Strict Typing

- Rely on `strict: true` (or equivalent). Do not disable strict checks to fix errors.
- Prefer explicit parameter and return types for **public** functions and methods. Allow inference for obvious locals.
- Use `unknown` instead of `any` when the type is truly unknown; narrow before use.

### 2. Avoid `any`

- Do not introduce `any` unless the user explicitly requests it or a library has no types.
- For untyped external values: use `unknown` and type guards, or define a minimal interface.
- For generic “pass-through” data: use generics or a specific type rather than `any`.

### 3. Public API and Declarations

- Exported functions, classes, and their public methods should have explicit return types so `.d.ts` output is clear.
- Optional parameters: use `param?: Type`; for “optional but can be undefined” use `param: Type | undefined` when that distinction matters.
- Prefer `interface` for object shapes that are part of the public API; use `type` for unions, mapped types, or when extending with intersections.

### 4. Classes and Visibility

- Use `public`, `private`, or `protected` so intent is clear and declaration files reflect the real API.
- Mark constructor-only dependencies (e.g. helpers) as `private` or `protected`; expose only what callers need.

### 5. Async and Promises

- Return `Promise<T>` explicitly from async functions that are part of the public API.
- Do not use `Promise<any>`; use a concrete `T` or `unknown` and narrow.

### 6. Null and Undefined

- Use `strictNullChecks` (on when `strict` is true). Handle `null` and `undefined` explicitly.
- Prefer optional chaining (`?.`) and nullish coalescing (`??`) over ad-hoc checks when it keeps code clear.

## Patterns

### Typing function parameters and returns (public API)

```typescript
// Prefer: explicit return type for public API
export function getItem(id: string): Promise<Item | null> {
  return fetchItem(id);
}

// Avoid: no return type on exported function
export function getItem(id: string) {
  return fetchItem(id);
}
```

### Handling unknown data

```typescript
// Prefer: unknown + guard
function parsePayload(data: unknown): Config {
  if (typeof data !== "object" || data === null || !("key" in data)) {
    throw new Error("Invalid config");
  }
  return data as Config;
}

// Avoid: any
function parsePayload(data: any): Config {
  return data;
}
```

### Optional vs undefined

```typescript
// Optional (can be omitted)
function create(options?: { name: string }) {}

// Explicit undefined in type
function find(id: string): Result | undefined {}
```

## Project Conventions (this repo)

- Target and module: follow `tsconfig.json` (e.g. `target`, `module`, `declaration`).
- Use `@typescript-eslint` recommended rules; do not disable type-aware rules without good reason.
- Keep declaration output in mind: exported names and their types become the public contract.

## Summary Checklist

- [ ] No new `any`; use `unknown` and narrow if needed
- [ ] Public/exported functions and methods have explicit return types
- [ ] Optional parameters use `?`; null/undefined handled under strict null checks
- [ ] Class members have appropriate visibility (`public` / `private` / `protected`)
- [ ] Async public API returns `Promise<ConcreteType>` (not `Promise<any>`)
