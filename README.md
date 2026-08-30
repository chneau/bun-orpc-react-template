# bun-orpc-react-template

A lightweight, full-stack template using **Bun**, **oRPC**, **React 19**,
**Wouter**, and **TanStack React Query**.

## ⚡ Features

- **Unified & Fast**: Bun serves the API, bundles the frontend, and runs the dev
  server.
- **Type-Safe RPC**: End-to-end type safety between client and server using oRPC
  & Zod.
- **TanStack Query Integration**: First-class `@orpc/tanstack-query` utils for
  type-safe query/mutation options and cache management.
- **Modern Stack**: React 19, Wouter for lightweight routing, and TanStack React
  Query for async state.
- **Production Ready**: Multi-stage Dockerfile and optimized build outputs.
- **Minimalist**: No complex build tools (Webpack/Vite) required, just Bun!

## 🚀 Quick Start

**Prerequisite**: [Install Bun](https://bun.sh)

1. **Clone & Install**

   ```bash
   git clone https://github.com/chneau/bun-orpc-react-template.git
   cd bun-orpc-react-template
   bun install
   ```

2. **Run Dev Server** (Hot Reloading)
   ```bash
   bun dev
   ```
   Visit `http://localhost:3000`

## 📂 Structure

- **`client/`**: React frontend code (pages, components, oRPC client & React
  Query hooks).
- **`server.ts`**: oRPC router/backend and Bun HTTP server configuration.

## 🛠 Scripts

| Script                 | Description                                           |
| :--------------------- | :---------------------------------------------------- |
| `bun dev`              | Start dev server with HMR                             |
| `bun start`            | Run production server                                 |
| `bun run build`        | Compile for production (`dist/`)                      |
| `bun run run-dist`     | Run compiled production build                         |
| `bun run lint`         | Run TypeScript type checking (`tsc --noEmit`)         |
| `bun run check`        | Run formatters/linters (Deno, Oxlint, Biome, exports) |
| `bun run all`          | Upgrade packages and run all checks                   |
| `bun run docker-build` | Build Docker image                                    |
| `bun run run-docker`   | Run Docker container locally                          |
