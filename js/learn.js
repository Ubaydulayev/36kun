const baseUrl = `https://api.nytimes.com/svc/books/v3`;
const apiKey = `0nG5do2caU59G7F2PT1eRQD0RAsaX5Du`;

const getBook = async (list_name_encoded) => {
    try {
      const res = await axios.get(
        `${baseUrl}/lists/current/${list_name_encoded}.json?api-key=${apiKey}`
      );
  
      return { success: true, data: res.data };
    } catch (error) {
      console.error("Xatolik sodir bo'ldi: " + error);
      return { success: false };
    }
};

const loading = document.getElementById("loading");
const error = document.getElementById("error");
const booc = document.getElementById("book");

const setBook = async (list_name_encoded) => {
    console.log(list_name_encoded);
    booc.innerHTML = "";

    loading.classList.remove("d-none");
    error.classList.add("d-none");
    booc.classList.add("d-none");

    const res = await getBook();
    loading.classList.add("d-none");

    if (res.success) {
        booc.classList.remove("d-none");
        res.data.results.map((v, i) => {
            const div = document.createElement("div");
            div.className = `info`;
            div.innerHTML = `
            <div class="foto">
                <img src="${v.book_image}" alt="foto">
            </div>
            <div class="info">
                <h2>Information</h2>
                <p>${v.description}<span class="text-secondary">${v.published_date}</span></p>
            </div>
            `;
  
        booc.appendChild(div);
      });
  
      setProducts(res.data.results[0]);
    } else {
      error.classList.remove("d-none");
    }
  };

  const getProducts = async (list_name_encoded) => {
  
    try {
      const res = await axios.get(
        `${baseUrl}/lists/current/${list_name_encoded}.json?api-key=${apiKey}`
      );
  
      return { success: true, data: res.data };
    } catch (error) {
      console.error("Xatolik sodir bo'ldi: " + error);
      return { success: false };
    }
  };

  const books = document.getElementById("books");
  
  const setProducts = async (obj) => {
    console.log("list group: " + obj);
  
    books.innerHTML = "";
  
    const res = await getProducts(obj.list_name_encoded);
  
    if (res.success) {
      books.classList.remove("d-none");
      res.data.results.books.map((v, i) => {
        const book = document.createElement("div");
        book.className = `products`;
        book.innerHTML = `
        <h2>Product details</h2>
            <h6>Publisher :  ${v.publisher} (${v.newest_published_date})</h6>
            <h6>Language ‏ : English</h6>
            <h6>Paperback : ${v.display_name}</h6>
            <h6>ISBN-10 ‏ : ‎ ${v.primary_isbn10}</h6>
            <h6>ISBN-13 ‏ : ‎ ${v.primary_isbn13}</h6>
            <h6>Item Weight ‏ : ‎ ${v.price} pounds</h6>
            <h6>Dimensions ‏ : ‎ 5.19 x 1.92 x 8 inches </h6>
            <h6>Best Sellers Rank: 
              #${v.rank} in Books (See Top 100 in Books)
              #${v.rank_last_week} in Contemporary Women Fiction
              #${v.weeks_on_list} in Contemporary Romance (Books)
            </h6>
        `;
  
        books.appendChild(book);
      });
    }
    console.log(res);
  };