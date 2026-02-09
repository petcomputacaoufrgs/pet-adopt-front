# Build
FROM node:20-alpine AS builder
WORKDIR /app

# Copia os arquivos de dependência
COPY package*.json ./
RUN npm ci

# Copia o código fonte
COPY . .

# No React puro (CRA), as variáveis precisam existir NA HORA DO BUILD.
# Elas devem começar com REACT_APP_
ARG REACT_APP_API_URL
ARG REACT_APP_ASSETS_URL
ENV REACT_APP_API_URL=$REACT_APP_API_URL
ENV REACT_APP_ASSETS_URL=$REACT_APP_ASSETS_URL

# Roda o build
RUN npm run build


# Serve
FROM node:20-alpine
WORKDIR /app

# Instala um servidor HTTP
RUN npm install -g serve

# Copia apenas a pasta 'build' gerada no estágio anterior
COPY --from=builder /app/build ./build

# Expõe a porta 3000
EXPOSE 3000

# Comando para servir a pasta build na porta 3000
CMD ["serve", "-s", "build", "-l", "3000"]