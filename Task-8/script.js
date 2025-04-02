
const routes={
    "":getHomePage(),
    "home":getHomePage(),
    "contacts":getContactPage(),
    "services":getServicesPage()
}

function getHomePage(){
    return `
    <h2>Welcome to Software Solutions</h2>
    <p>Find solutions for your problems</p>
    <img src="assets/laptop.jpg" alt="butterfly">
    `;
}
function getContactPage() {
    return `<h2>Contact Us</h2>
        <p>Email: hr@jobportal.com</p>
        <p>Phone: 123-456-7890</p>
        <img src="assets/contact.jpg" alt="Office Image">`;
}

function getServicesPage() {
    const services = [
        { title: "Web Development", description: "Building responsive and scalable web applications.", img: "https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg" },
        { title: "Backend Engineer", description: "Developing robust server-side applications and APIs.", img: "https://images.pexels.com/photos/5483074/pexels-photo-5483074.jpeg" },
        { title: "Data Scientist", description: "Analyzing data and building machine learning models.", img: "https://images.pexels.com/photos/373543/pexels-photo-373543.jpeg" },
        { title: "UX Designer", description: "Designing intuitive and user-friendly interfaces.", img: "https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg" }
    ];

    return services.map(service => `
        <div class="job-card">
            <img src="${service.img}" alt="${service.title}">
            <h3>${service.title}</h3>
            <p>${service.description}</p>
        </div>
    `).join("");
}

function handleRouting() {
    const hash = window.location.hash.substring(1) || 'home';
    document.querySelector(".page").innerHTML = routes[hash] || `<h2>Page Not Found</h2>`;
    document.querySelectorAll(".navbar ul li a").forEach(link => {
        link.classList.toggle("active", link.getAttribute("href") === `#${hash}`);
    });
    
}
window.addEventListener("hashchange", handleRouting);
window.addEventListener("load", handleRouting);