# Bubo basic startup #

## Project configuration ##

Prerequis : 
- node (version 18) avec npm
-  votre editeur (ici vs code)

Dans un nouveau dossier vierge tapez 
```bash
npm init
```
et suivez les questions, pour le main file entrez 'src/index.ts'

Bubo est conçu pour etre utilisé avec typescript, nous allons donc l'utiliser avec typescript dans notre exemple

### Setup typescript ###

à la racine du projet, dans une console entrez: 
```bash
npm i typescript --save-dev
```
puis 
```
npx tsc --init
```
pour créer le tsconfig dont on aura besoin pour le projet.

Nous allons y modifier plusieurs choses
- "target": "ESNext"
- "experimentalDecorators": true
- "emitDecoratorMetadata": true
- "module": "ESNext"
- "rootDir": "src"
- "moduleResolution": "Node"
- "outDir": "dist"

de la meme manière dans le package.json
- "type": "module"
- "module": "esnext"

## Installation des packets necessaires ##

Nous avons besoin de Bubojs Api ainsi que d'un adaptateur Http, par defaut nous allons utiliser TinyHttp

```
npm i @bubojs/api@1.0.2
npm i @bubojs/tinyhttp@1.0.0
```

## Création du fichier ##

Créez un fichier server.ts dans src

Dans ce fichier nous allons mettre trois éléments pour faire démarrer notre serveur

### l'instance de Bubojs ###

```typescript
import { app, Get } from '@bubojs/api'
import { TinyHttpAdapter } from '@bubojs/tinyhttp'

export const startServer = async () => {
  try {
    const adapter = new TinyHttpAdapter();
    app.initHttpModule(adapter);
  } catch (error) {
    console.log(`An error Occurred during server startup ${error}`);
  }
};
```

1) Tout d'abord importez les modules necessaires, nous avons besoin de @bubojs/api qui contient le coeur de bubo ainsi que @bubojs/tinyhttp qui est le module reponsable de l'implementation de tinyhttp pour bubojs

2) Le démarrage est englobé dans un try catch car les erreurs sont censés être traitées par l'utilisateur

3) Créez une instance de TinyHttpAdapteur qui va gérer les requetes et les réponses pour bubo

4) Initialisez Bubo avec l'adaptateur précédement créé

5) Voila c'est fait

### Une route par defaut ###

```ts
class Default {
    @Get()
    helloworld(){
        return "Hello world"
    }
}
```

Bubojs est concu pour etre utilisé avec des decorateurs pour la creation de controlleurs et de routes, pour une route aussi simple on utilise un petit hack

1) Créez une classe peu importe le nom, elle va juste nous permettre d'ajouter un decorateur

2) Ajoutez y une fonction qui renvoie ce que vous voulez retourner au client qui va appeller votre route

3) Au dessus de cette fonction ajoutez le decorateur @Get(), il va créer une route, à la racine, qui appellera votre fonction
### Commande de démarrage du serveur ###

```ts
await startServer();
```
Cette commande à la fin du fichier permet de démarrer le serveur

## Commande pour lancer le projet ##

Pour lancer le projet vous allez ajouter une commande de debug dans le package.json

```json
  "scripts": {
    "dev": "node  --watch --loader ts-node/esm src/server.ts"
  }
```
Vous pouvez ajouter d'autres commandes dans "scripts"

Ensuite à la racine de votre projet vous tapez 
```bash
npm run dev
```

vous devriez avoir quelque chose de similaire :
```bash
> bubo_basic_startup@1.0.0 dev
> node  --watch --loader ts-node/esm src/server.ts

(node:29148) ExperimentalWarning: Watch mode is an experimental feature and might change at any time
(Use `node --trace-warnings ...` to show where the warning was created)
(node:4760) ExperimentalWarning: Custom ESM Loaders is an experimental feature and might change at any time
(Use `node --trace-warnings ...` to show where the warning was created)
listen to 3000
```

votre serveur est en route, vous pouvez voir le result dans votre navigateur en tapant dans l'adresse [http://localhost:3000](http://localhost:3000)


