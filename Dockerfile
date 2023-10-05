# Use a imagem Node.js 14 como base
FROM node:14

# Define o diretório de trabalho no contêiner
WORKDIR /app

# Copie o arquivo package.json e o arquivo package-lock.json para o diretório de trabalho
COPY package*.json ./

# Instale as dependências
RUN npm install

# Copie todos os arquivos do projeto para o diretório de trabalho
COPY . .

# Exponha a porta em que a API NestJS será executada (3000)
EXPOSE 3000

# Comando para iniciar a aplicação
CMD ["npm", "start"]
