document.addEventListener("DOMContentLoaded",()=>{
    const thumbnails = document.querySelectorAll('.thumbnail');
    let lightbox = document.querySelector('.lightbox');
    let lightboxImg = document.getElementById('lightboxImg');
    let closebtn = document.getElementById('closebtn');
    let prevbtn = document.getElementById('prevBtn');
    let nextbtn = document.getElementById('nextBtn');

    let images = [];
    let currIndex = 0;

    if (!thumbnails.length) {
        console.error("No thumbnails found!");
        return;
    }

    thumbnails.forEach((thumbnail,index)=> {
        images.push(thumbnail.getAttribute('src'));
        console.log("he;lo")
        thumbnail.addEventListener("click",()=>{
            currIndex = index;
            openLigthBox();
        })
    });
    function openLigthBox(){
        lightboxImg.src = images[currIndex];
        lightbox.classList.add('active');
    }
    function closeLightBox(){
        lightbox.classList.remove('active');

    }
    function showprevImage(){
        currIndex = (currIndex-1 + images.length)%images.length;
        lightboxImg.src = images[currIndex];
    }
    function shownextImage(){
        currIndex = (currIndex+1+ images.length)%images.length;
        lightboxImg.src = images[currIndex];
    }

    closebtn.addEventListener("click",closeLightBox);
    prevbtn.addEventListener("click",showprevImage);
    nextbtn.addEventListener("click",shownextImage);

    lightbox.addEventListener("click",(e)=>{
        if(e.target === lightbox){
            closeLightBox();
        }
    })

    document.addEventListener("keydown", (e) => {
        if (lightbox.classList.contains("active")) {
            if (e.key === "ArrowLeft") showprevImage();
            if (e.key === "ArrowRight") shownextImage();
            if (e.key === "Escape") closeLightBox();
        }
    });
})