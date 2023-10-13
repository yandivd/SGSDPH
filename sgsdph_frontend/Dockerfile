FROM node:16-alpine

WORKDIR /salsa_frontend

COPY . .
RUN npm install
RUN npm run build

EXPOSE 3000

#CMD ["npm", "run", "build"]
