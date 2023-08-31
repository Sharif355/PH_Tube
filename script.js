// Get the Categories

const loadCategory = async () => {
    const res = await fetch(`https://openapi.programming-hero.com/api/videos/categories`)
    const data = await res.json();
    data.data.forEach(category => {
        const categoryContainer = document.getElementById('category-container');
        const categoryDiv = document.createElement('div');
        categoryDiv.innerHTML = `
        <a onclick = 'loadVideos(${category.category_id})' class="tab active:bg-[#FF1F3D] active:text-white ">${category.category}</a> 
        `
        categoryContainer.appendChild(categoryDiv);
    });
}

const loadVideos = async (id) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/videos/category/${id}`)
    const data = await res.json();
    console.log(data.data);
    const cardContainer = document.getElementById('card-container');
    cardContainer.innerHTML = '';
    data.data.forEach(result => {
        console.log(result.authors[0].verified);
        const cardDiv = document.createElement('div');
        cardDiv.innerHTML = `
     <div class="card  w-80 ">
        <figure>
          <img class ='w-80 h-52 relative'
            src="${result?.thumbnail}" 
            alt="Shoes"
          />
          <p class="absolute top-44 right-8 text-white bg-black font-inter font-normal ">${result?.others.posted_date ? result?.others.posted_date / 3600 : ''} hours</p>
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
        <p>${result?.authors[0].profile_name} <span>${result?.authors[0].verified ? result?.authors[0].verified : ''}</span> </p>
        <p>${result?.others.views} views</p>
        
      </div>
    </div>
      </div>
     `
        cardContainer.appendChild(cardDiv);
    });

}







loadCategory();