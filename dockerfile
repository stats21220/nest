FROM node:14-alpine
WORKDIR /opt/app
ADD package.json package.json
RUN npm install --force
ADD . .
RUN npm run build
CMD ["node", "./dist/main.js"]
