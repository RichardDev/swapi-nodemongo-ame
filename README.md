### API Para o desafio backend da ame digitial ###

A api foi construída utilizando nodejs para gerenciar os endpoints e os dados são armazenados com o mongodb.

SO utilizado: Ubuntu 18
Para executar e testar a api:
Requisitos: Linux
Requisitos: Instalar o nodejs >= 10
MongoDB: Para este teste não vai ser necessário instalar o mongodb, pois estou utilizando o serviço free https://mlab.com/

Após a instalação do nodejs, basta instalar as dependências npm install.

Para rodar e executar o projeto após a instalação das dependências basta executar:
npm run start.

Para rodar os testes funcionais da api rode o comando:
npm run test.

O projeto é executado em : localhost:3000
Para executar os endpoints recomendo utilizar: https://www.getpostman.com/


Endpoints:
listar planetas
GET localhost:3000/planetas

Buscar planetas por nome
GET localhost:3000/buscar/nome/:nome

Buscar planetas por id
GET localhost:3000/buscar/id/:id

Cadastrar planeta
POST localhost:3000/adicionar

Remover planeta por id
DELETE localhost:3000/remover/id

May the force be with you.


