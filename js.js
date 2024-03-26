const element=document.querySelectorAll(".card");
const cards=Array.from(element);
const classes=["image1","image2","image3","image4","image5","image6","image1","image2","image3","image4","image5","image6"];
const audio=new Audio();
const audio2=new Audio();
audio.src="audio/click.wav"
audio2.src="audio/mouseclick.mp3"
game=document.querySelector(".cards");
congrats=document.querySelector(".congrats");
playagain=document.querySelector(".button");
function fisheryates(arr){
     for(let i=0;i<arr.length;i++){
         const j=Math.floor(Math.random()*arr.length);
         [arr[i],arr[j]]=[arr[j],arr[i]];
     }  
}
fisheryates(classes);
function afficherimage(i){
      cards[i].classList.add(classes[i]);
      audio.play();
}

async function fermerimage(i){
    return new Promise((resolve)=>{
    setTimeout(()=>{cards[i].classList.remove(classes[i])
    resolve();
    },1500);
});
}
async function enleverimage(i){
    return new Promise((resolve)=>{
    setTimeout(()=>{cards[i].classList.replace(classes[i],"white")
    audio2.play();
    resolve();
    },1000);
    })

}   
 function play(){
    let j=0;
    let precedent;
    let encours=false;
    let cartesenleve=[];
  for(let i=0;i<cards.length;i++){
    cards[i].addEventListener("click", async function(){
       
    if(encours || cartesenleve.includes(i)){
      return;
    }
    else{
        j++;
    if((j % 2)==1){
      afficherimage(i);
      precedent=i;
        
    }
    else if((j%2)==0){
        if (i === precedent) {
            j--;
            encours = false;
            return;
        }
        afficherimage(i);

        encours=true;
        if(classes[i]==classes[precedent] && cards[i]!=cards[precedent]){
            await Promise.all([enleverimage(i),enleverimage(precedent)]);
            cartesenleve.push(precedent,i);
            if(cartesenleve.length==12){
                game.classList.add("hide"); 
                congrats.classList.remove('hide')
            }
            encours=false;
            
        }
        else if(classes[i]!=classes[precedent] && cards[i]!=cards[precedent]){
            await Promise.all([fermerimage(i),fermerimage(precedent)]);
            encours=false;
        
        }
        else{
            encours=false;
            return;
        }
      
    }
    }

    
    })
    
  }
}
play()  

playagain.addEventListener("click",()=>{
    location.reload(); 
})
playagain.addEventListener("mouseover",(e)=>{
     e.target.classList.add("button2");
})
playagain.addEventListener("mouseout",(e)=>{
    e.target.classList.remove("button2");
})