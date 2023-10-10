FROM node:18-alpine as builder
WORKDIR /work

COPY package.json ./
RUN yarn
COPY . .
RUN yarn build

FROM node:18-alpine as runner

WORKDIR /work
COPY --from=builder /work/package.json .
COPY --from=builder /work/next.config.js ./
COPY --from=builder /work/public ./public
COPY --from=builder /work/.next/standalone ./
COPY --from=builder /work/.next/static ./.next/static
COPY --from=builder /work/.env ./

EXPOSE 3000

ENTRYPOINT ["yarn", "start"]