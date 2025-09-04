const createEl = (arr) => {
  const htmlEl = arr.map((el) => `<span class="btn">${el}</span>`);
  return htmlEl.join(" ");
};

const manageSpinner = (status) => {
  if (status == true) {
    document.getElementById("spinner").classList.remove("hidden");
    document.getElementById("word-container").classList.add("hidden");
  } else {
    document.getElementById("word-container").classList.remove("hidden");
    document.getElementById("spinner").classList.add("hidden");
  }
};

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
  manageSpinner(true);
  const url = `https://openapi.programming-hero.com/api/level/${id}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      removeActive(); // reomove all active class
      const clickBtn = document.getElementById(`lesson-btn-${id}`);
      clickBtn.classList.add("active"); // add active class only click element
      displayLevelWord(data.data);
    });
};

const loadWordDetails = async (id) => {
  const url = `https://openapi.programming-hero.com/api/word/${id}`;
  const res = await fetch(url);
  const details = await res.json();
  displayWordDetails(details.data);
};

const displayWordDetails = (word) => {
  console.log(word);
  const detailsContainerEl = document.getElementById("details-container");
  detailsContainerEl.innerHTML = `
           <div class="">
            <h2 class="text-2xl font-semibold">
               ${word.word} (<i class="fa-solid fa-microphone"></i> : ${
    word.pronunciation
  })
            </h2>
          </div>
          <div class="space-y-2">
            <h2 class="text-2xl font-semibold">Meaning</h2>
            <p> ${word.meaning}</p>
          </div>
          <div class="">
            <h2 class="font-semibold">Example</h2>
            <p>
              ${word.sentence}
            </p>
          </div>
          <div class="space-y-3">
            <h2 class="font-semibold">Synonames</h2>
            <div class="flex gap-3 items-center">
           ${createEl(word.synonyms)}
            </div>
         </div>
  `;
  document.getElementById("word_modal").showModal();
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
    manageSpinner(false);
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
                   <button onclick="loadWordDetails(${
                     word.id
                   })" class="btn bg-[#1A91FF10] hover:bg-[#1A91FF80]">
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
  manageSpinner(false);
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

document.getElementById("btn-search").addEventListener("click", () => {
  removeActive();
  const input = document.getElementById("input-search");
  const searchValue = input.value.trim().toLowerCase();
  const url = `https://openapi.programming-hero.com/api/words/all`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      const allWords = data.data;
      const filterWords = allWords.filter((word) =>
        word.word.toLowerCase().includes(searchValue)
      );
      console.log(filterWords);
      displayLevelWord(filterWords);
    });
});
