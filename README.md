# Hapi-cli generator
##todo

- [ ] Cmd to generate postman collection by route parameters
- [ ] Cmd to generate only one route
- [ ] Cmd to generate only one controller
- [ ] Cmd to generate policies
- [ ] Option for auth
- [ ] Cmd to generate same validation from mongoose to joi
- [ ] Unit test


## Installation

    npm install -g


## Create project

    hapi-cli new [project-name]

    cd [project-name]

    npm start


## Create model

    hapi-cli generate model [name] [params]

#### example

    hapi-cli generate model user firstname:string
