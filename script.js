
//Validation des entrées
function verif_recette(){

    // Appel des valeurs
    let nom = $("#nom").val();
    let ing1 = $("#ingredient1").val();
    let ing2 = $("#ingredient2").val();
    let ing3 = $("#ingredient3").val();
    let ing4 = $("#ingredient4").val();
    let ing5 = $("#ingredient5").val();
    let qut1 = $("#quantite1").val();
    let qut2 = $("#quantite2").val();
    let qut3 = $("#quantite3").val();
    let qut4 = $("#quantite4").val();
    let qut5 = $("#quantite5").val();
    let instr = $("#instructions").val();

    let list_ing = [ing1, ing2, ing3, ing4, ing5]
    let nbre_ings = 0

    let list_qut = [qut1, qut2, qut3, qut4, qut5]


    let erreurcount = 0
    $("#modalErreurBody").text("")

    if (nom.length === 0){
        erreurcount += 1;
        erreurbreakcheck(erreurcount)
        $('#modalErreur').modal('show')
        $("#modalErreurBody").append("Le nom de la recette ne peux pas être vide.")
    }

    //Vérification que ingrédients existes
    if (ing1.length === 0){
        erreurcount += 1;
        erreurbreakcheck(erreurcount)
        $('#modalErreur').modal('show')
        $("#modalErreurBody").append("L'ingrédient 1 ne doit pas être rien.")
    }
    if (ing2.length === 0){
        erreurcount += 1;
        erreurbreakcheck(erreurcount)
        $('#modalErreur').modal('show')
        $("#modalErreurBody").append("L'ingrédient 2 ne doit pas être rien.")
    }
    if (ing3.length === 0){
        erreurcount += 1;
        erreurbreakcheck(erreurcount)
        $('#modalErreur').modal('show')
        $("#modalErreurBody").append("L'ingrédient 3 ne doit pas être rien.")
    }

    //Vérification que nombre d'ingrédients est correct
    for (let nbre of list_ing){if(nbre.length !== 0){nbre_ings += 1}}
    if (nbre_ings < 3) {
        erreurcount += 1;
        erreurbreakcheck(erreurcount)
        $('#modalErreur').modal('show')
        $("#modalErreurBody").append("La recette doit contenr au moins 3 ingrédients")
    }

    //Vérifier si chaque ingrédient à une quuantité associée
    if (list_ing.some(ing.length !== 0 && list_qut.index.length === 0)){
        erreurcount += 1;
        erreurbreakcheck(erreurcount)
        $('#modalErreur').modal('show')
        $("#modalErreurBody").append("Chaque ingrédient doit avoir une quantité associée.")
    }

    //Vérifier si les instructions existent
    if (instr.length === 0){
        erreurcount += 1;
        erreurbreakcheck(erreurcount)
        $('#modalErreur').modal('show')
        $("#modalErreurBody").append("La recette doit contenir des instructions.")
    }

    if (erreurcount === 0){
        creer_recette()
    }
}


//Vérifie si c'est la première erreur ou non pour les breaks
function erreurbreakcheck(nmbre){
    if (nmbre !== 1){
        $("#modalErreurBody").append("<br>")
    }
}
function close(){
    $('#modalErreur').modal('hide')
}


fetch("https://6585b4dd022766bcb8c9321d.mockapi.io/recette/recettes")
    .then(function (reponse) {
        if (!reponse.ok) {
            throw new Error("Erreur " + reponse.status);
        }
        return reponse.json();
    })
    .then(function (recettes){
        recettes.forEach(function (recette){
            creer_recette(recette);
        });
    })
    .catch(function (erreur){
        $(".alert").text(error.status).removeClass("d-none");
    });
function creer_recette(recette) {
    $("#list_recettes").append(`<div class="container border border-secondary-subtle mb-4">
                <h3 class="mb-3" id="rec_nomrec">${recette.rec_nom}</h3>
                                <ul id="rec0_ings">Ingrédients :
                                    <li class="mb-3">${recette.rec_ing1}</li>
                                    <li class="mb-3">${recette.rec_ing2}</li>
                                    <li class="mb-3">${recette.rec_ing3}</li>
                                </ul>
                            <p class="mb-3">Instructions: ${recette.rec_instr}</p>
                            <button type="button" class="btn btn-danger">Supprimer</button>
                            </div>`);
}


$("#ajouter").on("click",verif_recette)
$("#closeModal").on("click",close)