FROM node:16-alpine
ADD package.json package.json
RUN npm install --force
ADD . .
RUN npm run build
RUN npm prune --production
CMD ["node", "./dist/main.js"]
