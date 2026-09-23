FROM node:20-alpine

WORKDIR /app

# Copy package definition
COPY package.json ./

# Copy application source code
COPY server.js ./
COPY lib/ ./lib/
COPY data/ ./data/
COPY public/ ./public/

# Environment settings
ENV NODE_ENV=production
ENV PORT=4321

EXPOSE 4321

CMD ["node", "server.js"]
