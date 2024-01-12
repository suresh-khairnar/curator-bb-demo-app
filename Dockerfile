FROM node:18-alpine AS base

FROM base AS deps

WORKDIR /app

COPY package.json ./

RUN npm install

FROM base AS builder

WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules

COPY . .

RUN npm run build

FROM base AS runner

WORKDIR /app

RUN addgroup --system --gid 1001 curator

RUN adduser --system --uid 1001 curatorUser

COPY --from=builder --chown=curatorUser:curator /app/package.json ./package.json

COPY --from=builder --chown=curatorUser:curator . .

USER curatorUser

EXPOSE 3000

#CMD ["npm", "start"]