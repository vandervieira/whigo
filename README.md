<img src="assets/loginLogo.png" width="300">

**Descubra eventos próximos a você, em tempo real. Rede social focada em eventos e checkins com propósito de divulgação de eventos.**

## Descrição do Projeto

O Whigo é um projeto de estudos desenvolvido para a disciplina de Sistemas Mobile do curso de Sistemas para Internet da Unisinos. O objetivo do projeto é fornecer uma plataforma onde os usuários possam descobrir eventos próximos a eles e realizar check-ins, facilitando a divulgação e participação em eventos.

## Funcionalidades

- Descobrir eventos próximos com base na localização do usuário, visualizando-os pelo mapa.
- Realizar check-ins em eventos.
- Visualizar detalhes dos eventos, incluindo informações como data, horário, localização, imagem e descrição.
- Pesquisar eventos por categoria, nome, data, localização, amigos confirmados.
- Criar eventos, incluindo informações como título, descrição, data, horário, imagem e localização.
- Editar e excluir eventos criados pelo usuário.
- Autenticação de usuário através do Firebase Auth.
- Armazenamento de dados de eventos, usuários, posts no Firebase Firestore.
- Armazenamento de imagens de eventos, posts e avatar de usuários no Firebase Storage.
- Integração com a API do ViaCep para obter dados de endereço a partir do CEP.
- Utilização da API do Google Geocode para obter coordenadas geográficas com base no endereço recebido do ViaCep.

## Como executar o projeto localmente
> O projeto ainda está em desenvolvimento para estudos, portanto pode apresentar comportamentos inesperados (bugs)

Para executar o projeto localmente, siga as instruções abaixo:

1. Certifique-se de ter o Node.js e o Yarn/NPM instalados em seu sistema.
2. Clone este repositório em sua máquina local.
3. Navegue até o diretório raiz do projeto.
4. Execute o seguinte comando no terminal para instalar as dependências:

```shell
yarn install
```

Após a instalação das dependências, execute o seguinte comando para iniciar o servidor de desenvolvimento:

```shell
yarn start
```

Após a compilação bem-sucedida, você terá diferentes opções para visualizar o aplicativo:
- Utilize o aplicativo Expo disponível para Android ou iOS.
- Escaneie o código QR exibido no terminal utilizando o aplicativo Expo no seu celular.
- Execute o aplicativo em um emulador iOS ou Android (yarn android or yarn ios)

## Tecnologias utilizadas

- [Expo](https://expo.io/)
- [React Native](https://reactnative.dev/)
- [Firebase](https://firebase.google.com/) (Auth, Firestore e Storage)
- [react-native-maps](https://github.com/react-native-maps/react-native-maps)
- [ViaCep API](https://viacep.com.br/)
- [Google API - Geocode](https://developers.google.com/maps/documentation/geocoding/start)

## Contribuição

Contribuições são bem-vindas! Se você quiser contribuir para o projeto, sinta-se à vontade para abrir uma issue ou enviar um pull request.

## Licença

Este projeto está licenciado sob a licença [MIT](https://opensource.org/licenses/MIT).
