FROM node:16-alpine

WORKDIR /salsa_admin

COPY . .
RUN npm install
RUN npm run build

EXPOSE 5000

#CMD ["npm", "run", "build"]
