FROM node:current-alpine3.22

WORKDIR /app

# Install Nest CLI globally
RUN npm install -g @nestjs/cli

# Copy package.json and install deps (cached layer)
COPY package*.json ./
RUN npm install

# Copy tsconfig and sources
COPY . .

EXPOSE 3000

CMD ["npm", "run", "start:dev"]
