FROM node:22-alpine AS base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable
RUN corepack prepare pnpm@latest --activate

FROM base AS devbuild
WORKDIR /app
COPY . .
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile
RUN pnpm run -r build
RUN pnpm --filter=semester-app --prod  deploy appout

FROM base AS semester
WORKDIR /app
ENV NODE_ENV=production
COPY --from=devbuild /app/appout/ .
EXPOSE 3000
CMD ["pnpm", "start"]