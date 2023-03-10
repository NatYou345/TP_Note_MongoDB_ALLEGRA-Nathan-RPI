function addStudent() {
  // Je récupère l'ensemble des informations de mon formulaire
  var nom = document.querySelector('#nom');
  var dateDeNaissance = document.querySelector('#dateDeNaissance');
  var classe = document.querySelector('#classe');
  var email = document.querySelector('#email');
  var sexe = document.querySelector('#sexe');

  // Objet temporaire respectant la même structure que le schéma du model
  var tmp = {
    nom: nom.value,
    dateDeNaissance: dateDeNaissance.value,
    classe: classe.value,
    email: email.value,
    sexe: sexe.value
  };

  let url = '/student';

  let options = {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    mode: 'cors',
    cache: 'default',
    body: JSON.stringify(tmp)
  }

  fetch(url, options)
  .then((res) => {
    if(res.ok) {
      addOneLine(tmp);
      document.forms['formEtudiant'].reset(); // je selectionne parmis tous les forms de la page celui d'identifiant formSpe 
      // .reset() permet de remettre à vide les champs du form
    }
  });
}

function deleteStudent(id) {
  let url = '/student/' + id;
  let options = {
    method: 'DELETE',
  }

  fetch(url, options)
    .then((res) => {
      if(res.ok) {
        window.location.href = '/pages/student.html';
      }
    })
}

function addOneLine(data) {
  var tab = document.querySelector('#students');
  var newLine = document.createElement('tr');
  for (const prop in data) {
    if(prop != '_id' && prop != '__v') {
      var tmp = document.createElement('td');
      tmp.innerText = data[prop];  // data.prop
      newLine.appendChild(tmp);
    }
  }

  // Je créé un lien vers la page détail
  var tdLink = document.createElement('td');
  var link = document.createElement('a');
  link.href = '/pages/detail.html#' + data._id;
  link.innerText = 'Détails';
  tdLink.appendChild(link);
  newLine.appendChild(tdLink);

  // Je créé le bouton suppression
  var tdSuppr = document.createElement('td');
  var btnSuppr = document.createElement('button');
  btnSuppr.innerText = 'Suppression';
  btnSuppr.classList.add('btn', 'btn-outline-danger');
  tdSuppr.appendChild(btnSuppr);
  newLine.appendChild(tdSuppr);

  btnSuppr.addEventListener('click', (e) => {
    deleteStudent(data._id);
  });

  tab.appendChild(newLine);
}

// Je créé l'écouteur d'evt associé au clic du bouton validaiton
var btn = document.querySelector('#valider');
btn.addEventListener('click', (e) => {
  // je stop l'action par défaut du bouton
  e.preventDefault();
  addStudent();
});

let myHeaders = new Headers();
let url = '/student';

let options = {
  method: 'GET',
  headers: myHeaders,
  mode: 'cors',
  cache: 'default'
};

fetch(url, options)
  .then((res) => {
    if(res.ok) {
      // on extraie le résultat en JSON
      return res.json();
    }
  })
  .then((response) => {
    response.forEach(elt => {
      addOneLine(elt);
    });
  })