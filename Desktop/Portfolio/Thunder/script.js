window.addEventListener("load", function(){
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
    ctx.fillStyle = 'rgba(255, 255, 255, 0.2)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }

  // sky
  function skyEffect(){
    let gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
    gradient.addColorStop(0, '#0a0a1ee0');
    gradient.addColorStop(1, '#2c2c3ae0');
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
    rainIntensity = Math.random()*20+500;
    createDrops();
  };
  intensityChange();

  function drawRainDrop(){
    dx = Math.random()*2-2;
    for(let drop of drops){
      ctx.beginPath();
      ctx.moveTo(drop.x, drop.y);
      ctx.lineTo(drop.x+dx, drop.y+drop.length);
      ctx.strokeStyle = "white";
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
    if(Math.random() < 0.1){
      flashScreen()
      lightening();
    }
    intensityChange();
    drawRainDrop();
    requestAnimationFrame(thunder)
  }
  thunder();
  this.window.addEventListener("resize", resizeCanvas)
})