'use strict';

// Création de 2 variables personnage et obstacle et sélection par id

var personnage = document.querySelector("#personnage");

var obstacle = document.querySelector("#obstacle");

// Création d'une fonction pour animer le saut du personnage en se référant à la classe css .animationSaut
// Suppression de la classe animationSaut avec un setTimeout égal à la durée du saut afin de pouvoir recommencer après chaque saut

function saut() {
  personnage.classList.add("animationSaut");

  setTimeout(function () {
    personnage.classList.remove("animationSaut");
  }, 700);
}

var collision = false; // déclaration d'une variable afin de pouvoir l'utiliser plus bas et arrêter le setTimeout lorsqu'on a perdu afin d'arrêter l'alerte "vous avez gagné" au bout de 25s

// Détection de la collision entre le personnage et l'obstacle.
// Utilisation de parseFloat afin de récupérer un nombre (sans px)
// Collision = perdu

setInterval(function () {
  // récupérer la valeur calculée des propriétés css de personnage et obstacle puis cibler les propriétés spécifiques

  var hautPersonnage = parseFloat(
    window.getComputedStyle(personnage).getPropertyValue("top")
  );

  var gaucheObstacle = parseFloat(
    window.getComputedStyle(obstacle).getPropertyValue("left")
  );

  if (gaucheObstacle < 110 && gaucheObstacle > 0 && hautPersonnage >= 450) {
    collision = true;
    obstacle.style.animation = "none"; // arrêt de l'animation de l'obstacle après avoir perdu.
    personnage.style.animation = "none"; // arrêt de l'animation du personnage après avoir perdu.
    obstacle.style.display = "none"; // disparition de l'obstacle après avoir perdu.
    personnage.style.display = "none"; // disparition du personnage après avoir perdu.

    document.getElementById("competences").style.display = "none"; // cacher les compétences à la fin du jeu(si perdu)
    document.getElementById("score").style.display = "none"; // cacher le score à la fin du jeu(si perdu)
    document.getElementById("virusFin").style.display = "block"; // apparition d'un gros virus lorsqu'on a perdu
    document.querySelector("h1").innerHTML = "Vous avez perdu !"; // message à la fin du jeu lorsqu'on a perdu
    document.querySelector("h2").innerHTML = "Le virus s'est propagé :("; // complément de message fin de jeu
    document.querySelector("h3").style.display = "block"; // apparition d'un petit message de chargement

    alert("PERDU ! L'ordinateur a été infecté !");
    defaite(); // lancement de la fonction défaite pour clear timeout et éviter que l'alerte "vous avez gagné apparaisse au bout de 25s"
    setTimeout(() => {
      if (confirm("Voulez vous rejouer ?")) {
        window.location.href = "jeu.html"; // Si oui, rejouer
      } else {
        window.location.href = "index.html"; // sinon, renvoi vers la page principale avec le CV
      }
      clearInterval(intervalScore); // on arrête le score de la fonction intervalScore qui est plus bas
    }, 5000);
  }
});

// Apparition des competences au fur et à mesure du jeu

var timeoutFin; // définition d'une variable pour qu'elle soit disponible dans "maFonctionInterval"

var maFonctionInterval = function () {
  setTimeout(function () {
    document.getElementById("js").style.display = "inline";
  }, 3000);

  setTimeout(function () {
    document.getElementById("html").style.display = "inline";
  }, 6000);

  setTimeout(function () {
    document.getElementById("css").style.display = "inline";
  }, 9000);

  setTimeout(function () {
    document.getElementById("jquery").style.display = "inline";
  }, 12000);

  setTimeout(function () {
    document.getElementById("bootstrap").style.display = "inline";
  }, 15000);

  setTimeout(function () {
    document.getElementById("node").style.display = "inline";
  }, 18000);

  setTimeout(function () {
    document.getElementById("ajax").style.display = "inline";
  }, 21000);

  setTimeout(function () {
    document.getElementById("mongo").style.display = "inline";
  }, 24000);

  // Conditions de fin de jeu si on a gagné et possibilité de rejouer ou revenir à la page d'origine avec le CV

  timeoutFin = setTimeout(() => {
    alert("Vous avez gagné !");
    document.querySelector("h1").innerHTML = "Vous avez gagné !"; // message à la fin du jeu lorsqu'on a gagné
    obstacle.style.animation = "none"; // arrêt de l'animation de l'obstacle après avoir gagné.
    obstacle.style.display = "none"; // disparition complète de l'obstacle après avoir gagné.
    document.querySelector("h2").innerHTML =
      "Le virus a été évité ! Vous avez débloqué toutes les compétences de Kamil !"; // complément de message fin de jeu
    document.querySelector("h2").style.color = "green";
    document.querySelector("h3").style.display = "block"; // apparition d'un petit message de chargement
    clearInterval(intervalScore); // on arrête le score de la fonction intervalScore qui est plus bas

    setTimeout(() => {
      if (confirm("Voulez vous rejouer ?")) {
        window.location.href = "jeu.html"; // Si oui, rejouer
      } else {
        window.location.href = "index.html"; // si non, renvoi vers la page principale avec le CV
      }
    }, 5000);
  }, 25000);
};

maFonctionInterval();

// Evolution du score

var score = 0;

var intervalScore = setInterval(function () {
  score = score + 100;
  document.getElementById("score").innerHTML = "SCORE : " + score;
}, 3000);

// suppression de l'alerte 'vous avez gagné'(qui se déclenche après 25s de jeu) lorsqu'on a perdu
// exécution de cette fonction plus haut dans le code

var defaite = function () {
  if ((collision = true)) {
    clearTimeout(timeoutFin);
  }
};
