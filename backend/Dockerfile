FROM node:22-alpine AS builder

WORKDIR /app

COPY package.json ./
RUN yarn install --no-lockfile

COPY . .
RUN yarn build

FROM node:22-alpine

WORKDIR /app

COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

EXPOSE 5000

CMD ["node", "dist/main"]