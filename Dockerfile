#use a imagem base do python
FROM python:3.8

#instalando o flask e redis
run pip install flask redis

#copia o codigo fonte do app para dentro do container
COPY . /app

#diretório de trabalho
WORKDIR /app

#colocando os comandos para exercutar o app
CMD ["python", "app.py"]

# comando docker build para construir a imagem
# docker build -t aplicacao-flask-app

# Apos a construção da imagem  pode executar o aplicativo em um contêiner Docker
# Usando o comando docker run
# O aplicativo estará acessível no seu navegador em localhost:5000.