document.addEventListener("DOMContentLoaded", function () {
	// Ambil data JSON
	fetchData("assets/text/file.json")
		.then(data => {
			data.forEach(e => {
				if (e["name"] == "exp") {
					expShow(e);
				} else if (e["name"] == "project") {
					projcetShow(e);
				} else if (e['name'] == "skill") {
					initializeSkillNav(e)
				}
			});
		})
		.catch(error => {
			console.log("Error:", error);
			console.log("Try another method..");

			fetchData("../assets/text/file.json")
				.then(data => {
					data.forEach(e => {
						if (e["name"] == "exp") {
							expShow(e);
						} else if (e["name"] == "project") {
							projcetShow(e);
						} else if (e['name'] == "skill") {
							initializeSkillNav(e)
						}
					});
				})
				.catch(error => {
					console.error("Error:", error);
				});
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

			const expDescLink = document.createElement("a");
			expDescLink.href = item["exp_link"];
			expDescLink.textContent = item["exp_title"];

			const expDescContent = document.createElement("p");
			expDescContent.textContent = item["exp_desc"];

			const expDescSkills = document.createElement("ul");
			expDescSkills.classList.add("experience-skill-list");
			var skills = item["exp_skill"];
			skills.forEach((skill, index) => {
				const skillItemContainer = document.createElement("li");
				skillItemContainer.classList.add("experience-skill-item");
				const skillName = document.createElement("p");
				skillName.textContent = skill;

				skillItemContainer.appendChild(skillName);
				expDescSkills.appendChild(skillItemContainer);
			});

			expItemDesc.appendChild(expDescLink);
			expItemDesc.appendChild(expDescContent);
			expItemDesc.appendChild(expDescSkills);
			expItem.appendChild(expItemsYear);
			expItem.appendChild(expItemDesc);

			expItem.addEventListener("click", function () {
				const linkElement = expItem.querySelector('a');
				const targetUrl = linkElement.getAttribute("href");
				window.location.href = targetUrl;
			});
			c.appendChild(expItem)
		});
	});
}

async function projcetShow(data) {
	const protfolioList = document.getElementsByClassName("portfolio-list");
	const projectListItem = data.data
	projectListItem.sort((a, b) => new Date(b["project-year"]) - new Date(a["project-year"]));
	const container = Array.from(protfolioList);
	if (container.length != 0) {
		container.forEach(c => {
			projectListItem.forEach((item, index) => {
				if (index <= 3) {
					const portfItem = document.createElement("li");
					portfItem.classList.add("portfolio-item");

					const portImg = document.createElement("img");
					portImg.src = item["project-img"];
					portImg.classList.add("portfolio-img");

					const portfDescContainer = document.createElement("div");
					portfDescContainer.classList.add("portfolio-desc");

					const portfLink = document.createElement("a");
					portfLink.href = item["project-link"];
					portfLink.textContent = item["project-name"];
					portfLink.style = "text-transform: capitalize;";
					const portfDesc = document.createElement("p")
					portfDesc.textContent = item["project-made-for"];

					portfDescContainer.appendChild(portfLink);
					portfDescContainer.appendChild(portfDesc);

					portfItem.appendChild(portImg);
					portfItem.appendChild(portfDescContainer);

					portfItem.addEventListener("click", function () {
						const linkElement = portfItem.querySelector("a");
						window.location.href = linkElement.getAttribute("href");
					})

					c.appendChild(portfItem);
				}
			});
		});
	} else {
		const archiveList = document.querySelector(".archive-content-list");
		projectListItem.forEach(item => {
			const projectItem = document.createElement("ul");
			projectItem.classList.add("archive-content-item");
			var classListContentItem = ["con-year", "con-project", "con-made-at", "con-build-with", "con-link"]
			var projectListsItem = [new Date(item["project-year"]).getFullYear(),
			item["project-name"], item["project-made-for"],
			item["project-made-with"], item["project-link"]
			]
			classListContentItem.forEach((c, i) => {
				const elementLi = document.createElement("li");
				elementLi.classList.add(c);

				if (i == 4) {
					const linkHref = document.createElement("a")
					linkHref.href = projectListsItem[i];
					linkHref.textContent = "Go to Link";
					elementLi.appendChild(linkHref);
				} else {
					elementLi.textContent = projectListsItem[i];
				}
				projectItem.appendChild(elementLi);
			})
			projectItem.addEventListener("click", function () {
				const linkElement = projectItem.querySelector("a");
				window.location.href = linkElement.getAttribute("href");
			})
			archiveList.appendChild(projectItem);
		})
	}
}

async function initializeSkillNav(data) {
	const skillItemNav = document.querySelectorAll('.skill-nav-item');
	if (skillItemNav.length != 0) {
		skillItemNav[0].classList.add('skill-active');
		changeSkills(data, skillItemNav[0].getAttribute('name'));

		skillItemNav.forEach((link, index) => {
			link.addEventListener('click', function (e) {
				e.preventDefault();

				const stringCategory = this.getAttribute('name');
				this.classList.add('skill-active');

				skillItemNav.forEach((otherLink, otherIndex) => {
					if (otherIndex !== index) {
						otherLink.classList.remove("skill-active");
					}
				});

				changeSkills(data, stringCategory);
			});
		});
	}
}

async function changeSkills(data, stringName) {
	// data.data.filter(skill => skill['skill-category'].include(stringName))
	if (stringName == 'all') {
		const dataSkill = data.data.filter(skill => skill['skill-category'].includes('all'));
		skillShow(dataSkill);
	} else {
		const dataSkill = data.data.filter(skill => skill['skill-category'].includes(stringName));
		dataSkill.sort((a, b) => parseInt(b['skill-percentage']) - parseInt(a['skill-percentage']))
		skillShow(dataSkill)
	}

};

async function skillShow(data) {
	const skillListContainer = document.getElementsByClassName('skill-list');
	skillListContainer.innerHTML = ""
	const container = Array.from(skillListContainer)

	container.forEach(element => {
		element.innerHTML = "";
		data.forEach(item => {
			const eSkillList = document.createElement('li');
			eSkillList.classList.add("skill-item")

			const eSkillImg = document.createElement('img');
			eSkillImg.src = item['skill-icon'];
			eSkillImg.classList.add("skill-icon");

			const eSkillItemDesc = document.createElement('div');
			eSkillItemDesc.classList.add("skill-item-desc");

			const eSkillTitle = document.createElement('p');
			eSkillTitle.classList.add('skill-title');
			eSkillTitle.textContent = item['skill-name']

			const eSkillLine = document.createElement('span');
			eSkillLine.classList.add('skill-line');
			eSkillLine.style.width = item['skill-percentage'];

			const eSkillPerecentage = document.createElement('span');
			eSkillPerecentage.classList.add('skill-item-percentage');
			eSkillPerecentage.textContent = item['skill-percentage'];

			eSkillItemDesc.appendChild(eSkillTitle);
			eSkillItemDesc.appendChild(eSkillLine);

			eSkillList.appendChild(eSkillImg);
			eSkillList.appendChild(eSkillItemDesc);
			eSkillList.appendChild(eSkillPerecentage)

			element.appendChild(eSkillList)
		})
	})
}