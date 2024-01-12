FROM node:18-alpine AS base

FROM base AS deps

WORKDIR /app

COPY package.json ./

RUN npm i

FROM base AS builder

ARG GOOGLE_ANALYTICS_ID

ENV REACT_APP_GOOGLE_ANALYTICS_ID $GOOGLE_ANALYTICS_ID

WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules

COPY . .

RUN npm run build

FROM base AS runner

WORKDIR /app

RUN addgroup --system --gid 1001 axiom

RUN adduser --system --uid 1001 axiomUser

COPY --from=builder --chown=axiomUser:axiom /app/package.json ./package.json

COPY --from=builder --chown=axiomUser:axiom /app/build ./build

COPY --from=builder --chown=axiomUser:axiom /app/public ./public

RUN npm install -g serve

USER axiomUser

EXPOSE 3000

CMD ["npm", "run", "serve"]
