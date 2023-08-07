# ===== Base Stage =====
FROM node:16-slim as base-stage

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# ===== Test & Build Stage =====
FROM base-stage as test-build-stage

# Install app dependencies
RUN npm ci

# Copy app source
COPY . .

# Run tests
RUN npm test

# Build the project, transpile TypeScript to JavaScript
RUN npm run build

# ===== Production Stage =====
FROM base-stage as production-stage

# Install only production dependencies
RUN npm ci --only=production

# Copy built files from the test and build stage
COPY --from=test-build-stage /app/build ./build

# Communicate exposed port
EXPOSE 8080

# Your start command
CMD ["npm", "start"]
