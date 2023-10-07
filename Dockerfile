# Use a imagem Node.js como base
FROM node:14-alpine

# Diretório de trabalho no contêiner
WORKDIR /app

# Copie o arquivo package.json e package-lock.json para o contêiner
COPY package*.json ./

# Instale as dependências
RUN npm install

# Copie todo o código fonte para o contêiner
COPY . .

# Exponha a porta que a aplicação NestJS irá escutar
ENV PORT 3000
EXPOSE 3000

# Variáveis de ambiente para o PostgreSQL
ENV POSTGRES_HOST=
ENV POSTGRES_PORT=
ENV POSTGRES_USER=
ENV POSTGRES_PASSWORD=
ENV POSTGRES_DB=
ENV API_PYTHON=

# Variável de ambiente para a chave secreta do JWT
ENV JWT_SECRET_KEY=

# Comando para iniciar a aplicação NestJS
CMD [ "npm", "start" ]
