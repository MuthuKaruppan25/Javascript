document.addEventListener("DOMContentLoaded",()=>{
    const contentSection = document.getElementById("content");
    const loadingIcon = document.querySelector(".loading");
    let page = 1;
    let loading = false;

    fetchData();
    window.addEventListener("scroll",handleScroll);

    function handleScroll(){
        const {scrollTop ,scrollHeight,clientHeight} = document.documentElement;

        if(scrollTop+clientHeight >= scrollHeight-10){
            fetchData();
        }
    }

    async function fetchData() {
        if(loading)
            return;
        loading = true;
        loadingIcon.style.display = "block"; 
        try{
            const response = await fetch(`https://jsonplaceholder.typicode.com/posts?_limit=10&_page=${page}`);
            const data = await response.json();
            
            data.forEach(post => {
                const item = document.createElement("div");
                item.classList.add("post");
                item.innerHTML = `<h2>${post.title}</h2><p>${post.body}</p>`;
                contentSection.appendChild(item);
            });
    
        }
        catch(e){
            console.error("Error fetching data:", e);
        } finally {
            loading = false;
            loadingIndicator.style.display = "none"; 
        }

    }
})