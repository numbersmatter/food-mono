FROM node:20-slim AS base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

FROM base AS build
COPY . /usr/src/app
WORKDIR /usr/src/app
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile
RUN pnpm run -r build
RUN pnpm deploy --filter=family-app --prod /prod/family-app
#RUN pnpm deploy --filter=events-app --prod /prod/events-app

FROM base AS family-app
COPY --from=build /prod/family-app /prod/family-app
WORKDIR /prod/family-app
RUN pnpm install
RUN pnpm build
EXPOSE 3000
CMD [ "pnpm", "start" ]

FROM base AS events-app
COPY --from=build /usr/src/app /app/events-app
WORKDIR /app/events-app/apps/staff-apps/events-app/
EXPOSE 3000
CMD [ "pnpm", "start"]
