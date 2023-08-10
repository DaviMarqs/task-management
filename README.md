# Task Management App

**Test it at**: [Task Management](https://task-management-front.vercel.app/)

A minimalist task management application, created using the following technologies:

- **Front-end**: React, Tailwind CSS, TypeScript
- **Back-end**: Nest.js, MongoDB (Atlas), Prisma, Docker
- **Unit Testing**: Jest
- **API Documentation**: Swagger

This application has been designed with a "Mobile first" approach, providing an excellent user experience on mobile devices. The scalable architecture of Nest.js, combined with the flexibility of React, has been used to create an efficient and easily maintainable application.

The project is hosted on different platforms:

- Front-end hosted on Vercel: [Access the Front-end](https://task-management-front.vercel.app/)
- Back-end on Render with Docker: [Access the Back-end](https://task-management-api-0d9v.onrender.com/api)
- Database on MongoDB Atlas

To run the application locally, follow the steps below:

1. **Front-end**:

   - Create a `.env` file in the root of the front-end project.
   - Set the environment variable `VITE_API_URL` to `localhost:3000` in the `.env` file.

   - Execute the following command to install dependencies and start the development server:

     ```sh
     npm install
     npm run dev
     ```

2. **Back-end**:

   - Create a `.env` file in the root of the back-end project.
   - Set the environment variable `DATABASE_URL` to the MongoDB database connection URL in the `.env` file.

   - Execute the following command to install dependencies and start the development server:

     ```sh
     npm install
     npm run start:dev
     ```

3. **Testing**:

   - Execute the following command to run unit tests:

     ```sh
     npm run test
     ```

4. **Docker**:

   - To run the server using Docker, you can use the following commands:

     ```sh
     npm run docker-build
     npm run start-docker
     ```

Feel free to explore and test the application. If you encounter any issues or have questions, please don't hesitate to contact us.

Enjoy the Task Management App! 🚀

---

## Aplicação de Gerenciamento de Tarefas

**Teste em**: [Task Management](https://task-management-front.vercel.app/)

Uma aplicação minimalista de gerenciamento de tarefas, criada utilizando as seguintes tecnologias:

- **Front-end**: React, Tailwind CSS, TypeScript
- **Back-end**: Nest.js, MongoDB (Atlas), Prisma, Docker
- **Testes Unitários**: Jest
- **Documentação da API**: Swagger

Esta aplicação foi desenvolvida com foco em design "Mobile first", proporcionando uma excelente experiência de uso em dispositivos móveis. A arquitetura escalável do Nest.js, combinada com a flexibilidade do React, foi usada para criar uma aplicação eficiente e de fácil manutenção.

O projeto está hospedado em diferentes plataformas:

- Front-end hospedado na Vercel: [Acesse o Front-end](https://task-management-front.vercel.app/)
- Back-end no Render com Docker: [Acesse o Back-end](https://task-management-api-0d9v.onrender.com/api)
- Banco de Dados no MongoDB Atlas

Para rodar a aplicação localmente, siga os passos abaixo:

1. **Front-end**:

   - Crie um arquivo `.env` na raiz do projeto do front-end.
   - Defina a variável de ambiente `VITE_API_URL` como `localhost:3000` no arquivo `.env`.

   - Execute o seguinte comando para instalar as dependências e iniciar o servidor de desenvolvimento:

     ```sh
     npm install
     npm run dev
     ```

2. **Back-end**:

   - Crie um arquivo `.env` na raiz do projeto do back-end.
   - Defina a variável de ambiente `DATABASE_URL` como a URL de conexão do banco de dados MongoDB no arquivo `.env`.

   - Execute o seguinte comando para instalar as dependências e iniciar o servidor de desenvolvimento:

     ```sh
     npm install
     npm run start:dev
     ```

3. **Testes**:

   - Execute o seguinte comando para executar os testes unitários:

     ```sh
     npm run test
     ```

4. **Docker**:

   - Para rodar o servidor usando Docker, você pode utilizar os seguintes comandos:

     ```sh
     npm run docker-build
     npm run start-docker
     ```

Sinta-se à vontade para explorar e testar a aplicação. Se encontrar algum problema ou tiver dúvidas, não hesite em entrar em contato.

Aproveite a Aplicação de Gerenciamento de Tarefas! 🚀
