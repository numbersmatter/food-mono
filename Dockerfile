FROM node:22-alpine AS base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

FROM base AS devbuild
WORKDIR /app
COPY . .
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile
RUN pnpm run -r build
RUN pnpm deploy --filter=events-app --prod appout

FROM base AS events2
WORKDIR /app
ENV NODE_ENV=production
COPY --from=devbuild /app/appout/ .
EXPOSE 3000
CMD ["pnpm", "start"]

