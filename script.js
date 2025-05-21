window.addEventListener("load", function(){
  this.document.getElementById("preloader").style.display = "none";
  const canvas = this.document.getElementById("canvas");
  const ctx = canvas.getContext("2d");

  // set canvas size
  function resizeCanvas(){
    const tempImage = ctx.getImageData(0, 0, canvas.clientWidth, canvas.height);
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    ctx.putImageData(tempImage, 0, 0);
  }
  resizeCanvas();
  
  function flashScreen() {
    ctx.fillStyle = 'rgb(144 142 142 / 53%)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }

  // sky
  function skyEffect(){
    let gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
    gradient.addColorStop(0, '#0a0a1ee0');
    gradient.addColorStop(1, '#2c2c3ae6');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height)
  }

  function drawLightening(x, y, segments){
    ctx.beginPath();
    ctx.moveTo(x, y);
    for(let i=0; i< segments; i++){
      x += Math.random()*40 -20;
      y += Math.random()*40;
      ctx.lineTo(x,y);
      ctx.strokeStyle = "white";
      ctx.lineWidth = 2
      ctx.shadowBlur = 20;
      ctx.shadowColor = "white";
      ctx.stroke();
    }
  }

  function lightening(){
    let x = Math.random()*canvas.width;
    let y = 0;
    let segments = Math.random()*5+15;
    drawLightening(x, y, segments);

    if(Math.random() < 0.5)
      drawLightening(x, y, segments);

    // setInterval(() => {
    //     ctx.clearRect(0, 0, canvas.width, canvas.height);
    // }, 500);

    // setInterval(() => {
    //   if(Math.random() < 0.7){
    //     lightening()
    //   }
    // }, 2000);
  }

  const drops = [];
  let dx = Math.random()*2-2;
  let rainIntensity = Math.random()*20+500;

  function createDrops(){
    for(let i=0; i<rainIntensity; i++){
      let obj = {
        x: Math.random()*canvas.width,
        y: Math.random()*canvas.height,
        length: Math.random()*20+10,
        dy: Math.random()*5+10,
      }
      drops.push(obj)
    }
  }
  
  function intensityChange(){
    drops.length = 0;
    let m = 500;
    if(canvas.width <=400)
      m = 300;
    rainIntensity = Math.random()*20+m;
    createDrops();
  };
  intensityChange();

  function drawRainDrop(){
    dx = Math.random()*2-2;
    let rainColors = ["#cccccc", "#666666", "#a0c4ff"]
    for(let drop of drops){
      ctx.beginPath();
      ctx.moveTo(drop.x, drop.y);
      ctx.lineTo(drop.x+dx, drop.y+drop.length);
      ctx.strokeStyle = "#666666";
      if(Math.random() <0.05)
        ctx.strokeStyle = rainColors[Math.floor(Math.random()*rainColors.length)];
      ctx.shadowBlur = 0;
      ctx.stroke();

      drop.y +=drop.dy
      drop.x +=dx
      
      if(drop.y > canvas.height || drop.x < 0 || drop.x > canvas.width){
        drop.x = Math.random() * canvas.width;
        drop.y = -drop.length;
      }
    }
  }

  function thunder(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    skyEffect();
    if(Math.random() <0.2){
      flashScreen()
    }
    if(Math.random() < 0.1){
      lightening();
    }
    intensityChange();
    drawRainDrop();
    requestAnimationFrame(thunder)
  }
  thunder();
  this.window.addEventListener("resize", resizeCanvas)
})