FROM docker-registry.thunics.com:5000/node:18-alpine

RUN mkdir /app
WORKDIR /app
ENV NODE_ENV=production
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY ./public /app/public
RUN mkdir .next
RUN chown nextjs:nodejs .next
COPY  --chown=nextjs:nodejs ./.next/standalone /app/
COPY  --chown=nextjs:nodejs ./.next/static /app/.next/static
COPY  --chown=nextjs:nodejs ./.next/server /app/.next/server
USER nextjs

EXPOSE 3000

ENV PORT=3000

# set hostname to localhost
ENV HOSTNAME="0.0.0.0"
ENV AUTH_TRUST_HOST=true

# start server
CMD ["node", "server.js"]