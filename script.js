// Get the Categories

const loadCategory = async () => {
  const res = await fetch(`https://openapi.programming-hero.com/api/videos/categories`)
  const data = await res.json();
  data.data.forEach(category => {
    const categoryContainer = document.getElementById('category-container');
    const categoryDiv = document.createElement('div');
    categoryDiv.innerHTML = `
        <a onclick = 'loadVideos(${category.category_id}) ' class="tab tabs-boxed    px-5 active:bg-[#FF1F3D] focus:v active:text-white ">${category.category}</a> 
        `
    categoryContainer.appendChild(categoryDiv);
  });
}

const loadVideos = async (id, sortedData) => {
  const res = await fetch(`https://openapi.programming-hero.com/api/videos/category/${id}`)
  const data = await res.json();
  if (data.data.length !== 0) {
    const cardContainer = document.getElementById('card-container');
    cardContainer.innerHTML = '';
    data.data.forEach(result => {
      // console.log(result);
      const cardDiv = document.createElement('div');
      const seconds = result?.others.posted_date;
      const hours = Math.floor((seconds / 3600));
      const minutes = Math.floor((seconds % 3600) / 60);
      const hoursMinutes = seconds !== 0 ? `${hours ? hours + 'hrs' : ''} ${minutes ? minutes + 'min ago' : ''} ` : '';


      cardDiv.innerHTML = `
     <div class="card  w-80 ">
        <figure>
          <img class ='w-80 h-52 relative'
            src="${result?.thumbnail}" 
            alt="Shoes"
          />
          ${hoursMinutes ? `<p class="absolute top-44 right-8 text-white bg-black font-inter font-normal ">${hoursMinutes}</p>` : ''}
        </figure>
        <div class="flex gap-5 mt-5 ">
      <div ">
      <figure>
      <img class ='w-12 h-12 rounded-[50%]'
        src="${result?.authors[0].profile_picture}"
        alt="Shoes"
      />
    </figure>
      </div>
      <div>
        <p class= 'font-inter font-bold text-lg' >${result?.title}</p>
        <div class="flex gap-2">
      <p>${result?.authors[0].profile_name}</p>
      <p>${result?.authors[0].verified ? `<img src="images/fi_10629607.png" alt="verified" />` : ''}
      </p>
    </div>
        <p>${result?.others.views} views</p>
        
      </div>
    </div>
      </div>
     `
      cardContainer.appendChild(cardDiv);
    });
  }
  else {
    const cardContainer = document.getElementById('card-container');
    cardContainer.classList.remove('grid', 'grid-cols-1', 'md:grid-cols-2', 'lg:grid-cols-3')
    cardContainer.innerHTML = '';
    const cardDiv = document.createElement('div');
    cardDiv.innerHTML = `
    <div class="flex flex-col items-center justify-center text-center">
    <img src="images/Icon.png" alt="" />
    <h4 class="text-3xl font-medium font-inter">
      Oops!! Sorry, There is no content here
    </h4>
  </div>
    `
    cardContainer.appendChild(cardDiv);

  }

}
const sortByView = async (id) => {
  const res = await fetch(`https://openapi.programming-hero.com/api/videos/category/${id}`)
  const data = await res.json();
  const sortedData = data.data;
  sortedData.sort((a, b) => b.others.views - a.others.views);

  // loadVideos(id, sortedData);

}


loadCategory();
loadVideos("1000");