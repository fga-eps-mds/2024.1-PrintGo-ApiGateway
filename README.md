# 2023.2-PrintGo-Gateway

<div align="center">
     <img src="assets/logoPrintGo.svg" height="350px" width="350px">
</div>

## Quality Control

[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=fga-eps-mds_2023.2-PrintGo-PrinterService&metric=alert_status)](https://sonarcloud.io/summary/new_code?id=fga-eps-mds_2023.2-PrintGo-PrinterService)



## Sobre

O PrintGo é um sistema produzido para a PC-GO cuja função é monitorar ativos de impressão. A ferramenta, que é de fácil uso, auxilia na contagem de impressões na hora de prestação de contas e para isso apresenta um dashboard que pode ser transformado em relatórios.

Aplicação disponível em: [link da aplicação](?)

## Requisitos

- Node.js 18.18 (Latest em 10-05-2023)
- Docker
- Docker-compose


### Instalação

- **Execução local necessário servicos do user service e printer service devem ser executados previamente**

```bash
# 1. Clone o projeto
git clone https://github.com/fga-eps-mds/2023.2-PrintGo-ApiGateway.git

# 2. Entre na pasta do projeto
cd 2023.2-PrintGo-ApiGateway

docker-compose up --build
    # --build somente eh necessario na primeira vez que estiver rodando
    # depois `docker-compose up` ja resolve
    # em linux talvez seja necessario a execucao em modo root `sudo docker-compose up`
    # voce pode também caso queria adicionar um -d ao final para liberar o o terminal `docker-compose up -d`
    # Para finalizar o servico execute no root do projeto `docker-compose down`
```

## Contribuir

Para contribuir com esse projeto é importante seguir nosso [Guia de Contribuição](https://fga-eps-mds.github.io/2023.2-PrintGo-Doc/guia_de_contribuicao/) do repositório e seguir nosso [Código de Conduta](https://fga-eps-mds.github.io/2023.2-PrintGo-Doc/codigo_conduta/).

## Ambientes

- [Documentação](https://github.com/fga-eps-mds/2023.2-PrintGo-Doc)

- [Front-End](https://github.com/fga-eps-mds/2023.2-PrintGo-FrontEnd)

- [Back-End: UserService](https://github.com/fga-eps-mds/2023.2-PrintGo-UserService)

- [Back-End: OcurrenceService](https://github.com/fga-eps-mds/2023.2-PrintGo-OcurrenceService)

- [Back-End: PrinterService](https://github.com/fga-eps-mds/2023.2-PrintGo-PrinterService)
