ARG NODE_VERSION=20

# Alpine image
FROM node:${NODE_VERSION}-alpine AS alpine
RUN apk update
RUN apk add --no-cache libc6-compat

# Setup pnpm on the alpine base
FROM alpine AS base
RUN npm install pnpm --global
RUN pnpm config set store-dir ~/.pnpm-store

# Build the project
FROM base AS builder

WORKDIR /app

COPY package.json pnpm-lock.yaml ./

# First install the dependencies (as they change less often)
RUN --mount=type=cache,id=pnpm,target=~/.pnpm-store pnpm install --frozen-lockfile

# Copy source code
COPY . .

ENV NEXT_TELEMETRY_DISABLED=1
RUN pnpm build

# Final image
FROM alpine AS runner

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nodejs
USER nodejs

WORKDIR /app

COPY --from=builder --chown=nodejs:nodejs /app/next.config.js .
COPY --from=builder --chown=nodejs:nodejs /app/package.json .

# Automatically leverage output traces to reduce image size
# https://nextjs.org/docs/advanced-features/output-file-tracing
COPY --from=builder --chown=nodejs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nodejs:nodejs /app/.next/static ./.next/static

WORKDIR /app

ARG PORT=3030
ENV PORT=${PORT}
ENV NODE_ENV=production
EXPOSE ${PORT}

CMD ["node", "server.js"]
