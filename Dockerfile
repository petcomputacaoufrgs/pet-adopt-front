# Estágio 1: Build
FROM node:20 AS builder
WORKDIR /app

# Copia os arquivos de dependência
COPY package*.json ./

# Instala as dependências ignorando scripts pós-instalação para maior segurança e evitar quebras
RUN npm ci --ignore-scripts

# Copia o código fonte
COPY . .

# VITE: As variáveis precisam começar com VITE_ para irem para o navegador
ARG VITE_API_URL
ARG VITE_ASSETS_URL
ENV VITE_API_URL=$VITE_API_URL
ENV VITE_ASSETS_URL=$VITE_ASSETS_URL

# Roda o build (O Vite gera a pasta 'dist' por padrão)
RUN npm run build


#Estágio 2: Serve
FROM node:20-slim
WORKDIR /app

# Instala um servidor HTTP leve
RUN npm install -g serve

# Copia a pasta 'dist' gerada no estágio anterior
COPY --from=builder /app/dist ./dist

# Expõe a porta 5173 (Padrão do Vite)
EXPOSE 5173

CMD ["serve", "-s", "dist", "-l", "5173"]