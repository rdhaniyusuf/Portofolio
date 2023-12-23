document.addEventListener("DOMContentLoaded", function () {
	// Ambil data JSON
	fetchData("../assets/text/file.json")
		.then(data => {
			data.forEach(e => {
				if (e["name"] == "exp") {
					expShow(e);
				}
				else if (e["name"] == "project"){
					projcetShow(e);
				}
			});
		})
		.catch(error => {
			console.error("Error:", error);
			// Hapus class "is-loading" jika terjadi error
			jsonDataContainer.classList.remove("is-loading");
		});
});


async function fetchData(url) {
	const response = await fetch(url);
	if (!response.ok) {
		throw new Error(`Error fetching data: ${response.statusText}`);
	}
	return response.json();
}

async function expShow(data) {
	const experienceListsContainer = document.getElementsByClassName("experience-list");
	const container = Array.from(experienceListsContainer);

	container.forEach(c => {
		const experienceLists = data.data
		experienceLists.forEach(item => {
			const expItem = document.createElement("li");
			expItem.classList.add("experience-item");

			const expItemsYear = document.createElement("span");
			expItemsYear.textContent = item['exp_year'];

			const expItemDesc = document.createElement("div");
			expItemDesc.classList.add("experience-desc");

			const expDescLink = document.createElement("a")
			expDescLink.href = item["exp_link"]
			expDescLink.textContent = item["exp_title"]

			const expDescContent = document.createElement("p")
			expDescContent.textContent = item["exp_desc"]

			const expDescSkills = document.createElement("ul")
			expDescSkills.classList.add("experience-skill-list")
			var skills = item["exp_skill"];
			skills.forEach((skill, index) => {
				const skillItemContainer = document.createElement("li")
				skillItemContainer.classList.add("experience-skill-item")
				const skillName = document.createElement("p")
				skillName.textContent = skill

				skillItemContainer.appendChild(skillName)
				expDescSkills.appendChild(skillItemContainer)
			})

			expItemDesc.appendChild(expDescLink)
			expItemDesc.appendChild(expDescContent)
			expItemDesc.appendChild(expDescSkills)
			expItem.appendChild(expItemsYear)
			expItem.appendChild(expItemDesc)

			expItem.addEventListener("click", function () {
				const linkElement = expItem.querySelector('a');
				const targetUrl = linkElement.getAttribute("href");
				window.location.href = targetUrl;
			})
			c.appendChild(expItem)
		})
	})


}

async function projcetShow(data){
	const protfolioList = document.getElementsByClassName("portfolio-list");

	const container = Array.from(protfolioList);

	container.forEach(c => {
		const projectListItem = data.data
		projectListItem.sort((a,b) => new Date( b["project-year"]) - new Date(a["project-year"]))
		projectListItem.forEach((item, index) => {
			if (index<=3){
				const portfItem = document.createElement("li")
				portfItem.classList.add("portfolio-item")

				const portImg = document.createElement("img")
				portImg.src = item["project-img"]
				portImg.classList.add("portfolio-img")

				const portfDescContainer = document.createElement("div")
				portfDescContainer.classList.add("portfolio-desc")

				const portfLink = document.createElement("a")
				portfLink.href = item["project-link"]
				portfLink.textContent = item["project-name"]
				portfLink.style = "text-transform: capitalize;"
				const portfDesc = document.createElement("p")
				portfDesc.textContent = item["project-made-for"]

				portfDescContainer.appendChild(portfLink);
				portfDescContainer.appendChild(portfDesc);

				portfItem.appendChild(portImg)
				portfItem.appendChild(portfDescContainer)

				portfItem.addEventListener("click", function(){
					const linkElement = portfItem.querySelector("a")
					window.location.href = linkElement.getAttribute("href")
				})

				c.appendChild(portfItem)
			}
		});
	});
}
