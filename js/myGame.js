
var game = new Phaser.Game(800 , 600 , Phaser.AUTO , "" , {preload: preload, create: create, update: update});

var contador = 0;
function preload(){
	game.load.image('diamont', 'assets/diamond.png');
	game.load.image('star', 'assets/star.png');
	cursors = game.input.keyboard.createCursorKeys();

    //Audio
    game.load.audio("audioFondo" , "audio/fondo.mp3");
    game.load.audio("audioColision" , "audio/col.mp3");
}
function create(){
 	star = game.add.sprite(game.world.width/2, game.world.height/2, 'star');
 	game.physics.arcade.enable(star);
 	
 	star.body.collideWorldBounds = true;
 	star.body.gravity.y = 600;

 	// grupo de diamantes
 	diamantes = game.add.group();
    diamantes.enableBody = true;

    //llamada funcion que llamara asi misma
    generarDiamantes();

    // Texto
    nivelTexto = game.add.text(650, 10, "Nivel        1 ", {
        font: "25px Arial",
        fill: "#ff0044",
        align: "center"
    });

    estrellasTexto = game.add.text(650, 35, "Estrellas  0 ", {
        font: "25px Arial",
        fill: "#ff0044",
        align: "center"
    });

    //Audio
    auColision = game.add.audio("audioColision");
    aufondo = game.add.audio("audioFondo");

    aufondo.play('',0,1,true,true);

    
}
function update(){

	game.physics.arcade.overlap(star, diamantes, Colision, null, this);

 	if(cursors.left.isDown)
	    star.body.velocity.x = -250;
	
	if(cursors.right.isDown)
	    star.body.velocity.x = +250;
	
	if(cursors.up.isDown)
	    star.body.velocity.y = -150;
    
    if(cursors.down.isDown)
    	star.body.velocity.y = +150;
    

}
function Colision(star  , diamantes){
    diamantes.kill();

    contador++;
    estrellasTexto.setText("Estrellas  " + contador);

    auColision.play();  
}

function generarDiamantes(){
    game.time.events.add(Phaser.Timer.SECOND * 1, generarDiamantes, this);

   for (var i = 0; i < 1; i++)
    {
        diamante = diamantes.create(game.rnd.integerInRange(0, 700),0, 'diamont');
        diamante.body.gravity.y = 150;
   }
}
