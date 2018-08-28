# Notice Mobile privacy profiler web view

## Structure
Le projet est divisé en deux segments :
- Client :
Il contient un serveur node.js ainsi que le code de l'affichage client grâce à Vue.js
- Serveur :
Il est le seul point de jonction avec la base de données. Le client envoi des requêtes POST à l'attention du serveur pour recevoir en retour les réponses au format JSON

## Mise en route
* Le projet à été développé sous intelIJ.
* La gestion du lancement des serveurs et de l'installation des paquets est réalisé à l'aide de npm.
* Le lancement des serveurs est réalisé à l'aide de scripts NPM:
* Pour les lancer : <br/>
 ouvrir le fichier package.json => click droit sur le titre de l'onglet => "Show npm scripts"

## Dossier gitLab
Le repository est disponible [ici](https://gitlab.inria.fr/mobile-privacy-profiler/MobilePrivacyProfilerWebView)
## Client
L'application à été réalisée après avoir suivit les tutoriels suivants

- [Tutoriel : Build full stack web apps with MEVN Stack](https://medium.com/@anaida07/mevn-stack-application-part-1-3a27b61dcae0)
- [Exemple : Application fonctionelle avec Vue.js](https://github.com/mazipan/chucknorris/blob/master/README.md)

### Organisation du code
Attention de ne pas confondre ici les parties de code qui seront interprétés côté serveur et côté client.

### index.html

Il s'agit de la page web "d'origine" : tous les éléments visibles sont insérés à la place de la balise

````
<div id="app"></div>
````
### main.js

Il s'agit du fichier exécuté en premier lors de l'exécution du code JS.
On lui demande ici de charger l'élément App.vue qui affiche les éléments à présenter

````
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
````

### App.vue

On y retrouve l'architecture des fichiers Vue 

````
<template>
  <div class="VueApp grid__row" id="app">
    // Ici l'affichage en HTML 
    <header-section/>
    
    <tab-section v-bind:activeTab = "activeTab" />

    <div class="main">
      <transition name="fade" mode="out-in">
        <keep-alive>
          <router-view/>
        </keep-alive>
      </transition>
    </div>
  </div>
</template>

<script>
// Ici le code javaScript
name: 'App', // nom du module
  store, // variable de la vue (qui sera donc globale)
  components: { // Modules à charger présents dans le code HTMAL
    HeaderSection,
    TabSection
  },
  computed: { // variable résultat d'un appel de fonction
    activeTab () {
      return store.state.activeTab
    }
  },
  created () {
  }
</script>

<style>
.customClass {
// Ici les classes css pour les éléments de la page et les éléments fils
}
</style>

````

Attention : pour bien commencer avec Vue.js voir : [ici](https://fr.vuejs.org/v2/guide/instance.html#Diagramme-du-cycle-de-vie)
(Le cycle de vie est important à garder en tête)
### Store
On trouve ici des variables globales qui ont pour but d'être partagées dans toute l'application web (variables d'états)
On y trouve l'utilisateur actif ainsi que l'onglet actif.
<br/> Le fichier est construit en trois parties:
- **state :** qui regroupe les états
- **mutation :** qui regroupe les méthodes de changement d'état (permet un débug facilité par écriture dans la lonsole en cas de mode débug actif)
- **getters :** qui permettent l'accès aux variables des états du store
### "router"
Il regroupe l'ensemble des API du serveur d'affichage (client)
Il permet de remplacer la balise : ````<router-view/>```` de App.vue par une vue définie ailleur (cf import) lors de l'appel d'une url différante ex : ````http://localhost:8080/#/SelectUser```` 
### "components" et "pages"
 Il n'y a as de différence de nature entre les fichiers présents dans ces deux répertoires.
 Tout comme App.vue, il s'agit de fichiers où l'on trouve les trois composantes d'un fichier vue (html, javaScript et css)
 <br/>Cependant, les fichiers présents dans "components" sont utilisés comme éléments de pages
 <br/>Les "pages" sont des éléments acessibles par le "router"
### ajouter une page
- il faut créer un nouveau fichier Vue
- l'ajourer au fichier "router"
- le rendre accessible à la navigation : <br/>ex : ````<router-link to="/bluetooth">````
### développer une page
le but est de construire des listes et des paramètres à afficher dans la partie html
 - Pour récupérer des données brut, une requête est réalisée à la partie server via une méthode de services/FetchService.js
 - Le JSON obtenu en réponse est en suite transformé en données affichables
 - Pour afficher un contenu lors du permier chargement, voir la composante 'mounted'
 - Pour assurer l'actualisation de l'affichage, la composante 'watch' est à utiliser

### Principales librairies utilisées
 - [Vue-Morris.js](https://github.com/bbonnin/vue-morris):
    - [LineChart](https://morrisjs.github.io/morris.js/lines.html)
    - [BarChart](https://morrisjs.github.io/morris.js/bars.html)
 - [Vue2-datepicker.js](https://www.npmjs.com/package/vue2-datepicker/v/1.4.1)
    - [exemples](https://mengxiong10.github.io/vue2-datepicker/demo/index.html)
 - [Vue2leaflet.js](https://github.com/KoRiGaN/Vue2Leaflet)
    - [exemples](https://korigan.github.io/Vue2Leaflet/) 
### futur développements
La page Geolocation est encore en cours de développement.
Il faudra convertir les entrées correspondantes aux cell (antennes relait téléphone) et borens wifi en positions GPS exploitables
<br/>GPS : voir opencellid.org avec [ceci](http://wiki.opencellid.org/wiki/API) et [cela](https://www.opencellid.org/#zoom=16&lat=48.16751&lon=-1.57774)
<br/> ... et plus
## Serveur
Il n'est composé que d'un seul fichier d'intéret : server/app.js

### Réglage du port d'écoute
Le port d'écoute peut être changé par la modification de la ligne suivante :
````
144    app.listen(process.env.PORT || 8081)
````
### Réglage de l'adresse de la base de données
L'adresse du fichier de la base de données à consulter peut être modifié par la modification de la ligne suivante :
````
8   var dbAdress = 'custom/path/folder.db'
````
### Répondre à une nouvelle API
Pour créer une nouvelle requête d'interrogation de la base de données, suivre le schema suivant
````
app.post('/CustomPath', (req, res) => {
    db = startConnection (dbAdress)
    console.log('Control message to display in the console')
    var userId = ''+req.body.UserId // cast of the argument to String
    db.all(
        'SELECT columns to display FROM table WHERE userId= ?',
        [userId],
        function(error, rows) {
            res.send(rows) // execute your code before this line
        }
    )
    db.close((err) => {
        if(err==null) {console.log('Connection closed')}
        else {console.error(err.message)
        }
    })
})
````