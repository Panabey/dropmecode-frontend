FROM node:18-alpine

# За основу взят https://github.com/vercel/next.js/tree/canary/examples/with-docker-compose
WORKDIR /app

COPY next_app/  /app 

RUN npm ci

# https://github.com/vercel/next.js/discussions/14030
ARG ENV_VARIABLE
ENV ENV_VARIABLE=${ENV_VARIABLE}
ARG NEXT_PUBLIC_ENV_VARIABLE
ENV NEXT_PUBLIC_ENV_VARIABLE=${NEXT_PUBLIC_ENV_VARIABLE}

# Отключить телеметрию во время сборки
ENV NEXT_TELEMETRY_DISABLED 1

RUN npm run build

CMD npm run start