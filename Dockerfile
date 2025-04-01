# Image size ~ 400MB
FROM node:21-alpine3.18 as builder

WORKDIR /app

# Install pnpm
RUN corepack enable && corepack prepare pnpm@latest --activate
ENV PNPM_HOME=/usr/local/bin

# Install build dependencies first
RUN apk add --no-cache python3 make g++ git

# Copy package files
COPY package*.json .
COPY pnpm-lock.yaml .

# Install dependencies
RUN pnpm install --frozen-lockfile

# Copy rest of the application
COPY . .

# Build the application
RUN pnpm run build

FROM node:21-alpine3.18 as deploy

WORKDIR /app

ARG PORT
ENV PORT $PORT
EXPOSE $PORT

COPY --from=builder /app/assets ./assets
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/*.json /app/*-lock.yaml ./

RUN corepack enable && corepack prepare pnpm@latest --activate 
ENV PNPM_HOME=/usr/local/bin

RUN pnpm install --prod --frozen-lockfile \
    && addgroup -g 1001 -S nodejs \
    && adduser -S -u 1001 nodejs \
    && chown -R nodejs:nodejs /app

USER nodejs

CMD ["pnpm", "start"]