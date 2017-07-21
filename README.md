[![CircleCI](https://img.shields.io/circleci/project/github/RedSparr0w/node-csgo-parser.svg)](https://circleci.com/gh/AMoreaux/hapi-cli)
[![NPM Downloads](https://img.shields.io/npm/dm/hapi-starter.svg)](https://www.npmjs.com/package/hapi-starter)
[![Coverage Status](https://coveralls.io/repos/github/AMoreaux/hapi-cli/badge.svg?branch=master)](https://coveralls.io/github/AMoreaux/hapi-cli?branch=master)
[![Known Vulnerabilities](https://snyk.io/test/github/amoreaux/hapi-cli/badge.svg)](https://snyk.io/test/github/amoreaux/hapi-cli)

# Hapi-cli generator
## todo

- [ ] Cmd to generate postman collection by route parameters
- [ ] Cmd to generate policies
- [ ] Cmd to generate same validation from mongoose to joi
- [ ] Add custom source for generator file


## Installation

    npm install -g hapi-starter

## Create project

    hapi-cli new [project-name]

    cd [project-name]

    npm start

## Create model

    hapi-cli generate model [name] [options]
    
#### Options

    --properties | -p : List of properties of your entitie. (format: [name]:[type])
    
#### Examples

    hapi-cli generate model room --properties size:number,name:string

## Create controller

    hapi-cli generate controller [name] [options]
    
#### Options

    --methods | -m : List of methods for your controller (default: create,remove,find,update )

#### Examples

    hapi-cli generate controller room
    hapi-cli generate controller room --methods create,remove

## Create Route

    hapi-cli generate route [name] [options]
    
#### Options

    --verbs | -m : List of endpoints for your route (default: get,post,delete,put )
    --uri | -u : Uri of the enpoint (required)
    --controller | -c : Name of controller. (default: file's name )
    
#### Examples

    hapi-cli generate route room --uri /room
    hapi-cli generate route room --verbs get,post --uri /room
    
## Create API

    hapi-cli generate api [name] [options]
    
#### Options

    --verbs | -m : List of endpoints for your route (default: get,post,delete,put )
    --uri | -u : Uri of the enpoint (required)
    --controller | -c : Name of controller. (default: file's name )
    --methods | -m : List of methods for your controller (default: create,remove,find,update )
    --properties | -p : List of properties of your entitie. (format: [name]:[type])

#### Example

    hapi-cli generate route owner --uri /owner/{id}
    