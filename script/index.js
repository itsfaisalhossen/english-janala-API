const loadLessons = () => {
  const url = `https://openapi.programming-hero.com/api/levels/all`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => displayLessons(data.data));
};

const removeActive = () => {
  const lessonBtn = document.querySelectorAll(".lesson-btn");
  lessonBtn.forEach((btn) => btn.classList.remove("active"));
};

const loadLevelWord = (id) => {
  const url = `https://openapi.programming-hero.com/api/level/${id}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      removeActive(); // reomove all active class
      const clickBtn = document.getElementById(`lesson-btn-${id}`);
      clickBtn.classList.add("active"); // add active class only click element
      console.log(clickBtn);
      displayLevelWord(data.data);
    });
};

const displayLevelWord = (words) => {
  const wordContainerEl = document.getElementById("word-container");
  wordContainerEl.innerHTML = "";

  if (words.length === 0) {
    wordContainerEl.innerHTML = `
     <div class="text-center col-span-full">
      <img class="mx-auto" src="./assets/alert-error.png" alt="">
        <p class="font-bangla">এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।</p>
        <h2 class="text-4xl font-semibold mt-4">নেক্সট Lesson এ যান</h2>
     </div>
    `;
    return;
  }

  words.forEach((word) => {
    const wordDiv = document.createElement("div");
    wordDiv.innerHTML = `
              <div class="bg-white p-4 text-center h-100% rounded-xl">
                 <div class="space-y-3">
                  <h3 class="font-semibold text-xl">${
                    word.word ? word.word : "N/A"
                  }</h3>
                  <p class="font-medium">${word.pronunciation}</p>
                  <h3 class="font-semibold text-xl">${
                    word.meaning ? word.meaning : "N/A"
                  }</h3>
                 </div>
                 <div class="flex justify-between mt-8">
                   <button onclick="my_modal_5.showModal()" class="btn bg-[#1A91FF10] hover:bg-[#1A91FF80]">
                      <i class="fa-solid fa-circle-info"></i>
                    </button>
                    <button class="btn bg-[#1A91FF10] hover:bg-[#1A91FF80]">
                     <i class="fa-solid fa-volume-high"></i>
                    </button>
                 </div>
              </div>
            `;
    wordContainerEl.appendChild(wordDiv);
  });
};

const displayLessons = (lessons) => {
  const levelContainerEl = document.getElementById("level-container");
  levelContainerEl.innerHTML = "";

  for (const lesson of lessons) {
    const btnDiv = document.createElement("div");
    btnDiv.innerHTML = `
              <button id="lesson-btn-${lesson.level_no}" onclick="loadLevelWord(${lesson.level_no})" class="btn btn-outline btn-primary lesson-btn">
                <i class="fa-brands fa-leanpub"></i>  Lesson-${lesson.level_no}
              </button>
            `;
    levelContainerEl.appendChild(btnDiv);
  }
};
loadLessons();
