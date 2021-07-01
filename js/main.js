const baseUrl = `https://api.nytimes.com/svc/books/v3`;
const apiKey = `0nG5do2caU59G7F2PT1eRQD0RAsaX5Du`;

const getList = async () => {
  try {
    const res = await axios.get(
      `${baseUrl}/lists/names.json?api-key=${apiKey}`
    );

    return { success: true, data: res.data };
  } catch (error) {
    console.error("Xatolik sodir bo'ldi: " + error);
    return { success: false };
  }
};

const loading = document.getElementById("loading");
const error = document.getElementById("error");
const list = document.getElementById("list");

let activeLink;

const setList = async () => {
  list.innerHTML = "";

  loading.classList.remove("d-none");
  error.classList.add("d-none");
  list.classList.add("d-none");

  const res = await getList();
  loading.classList.add("d-none");

  if (res.success) {
    list.classList.remove("d-none");

    res.data.results.map((v, i) => {
      const a = document.createElement("a");
      a.href = `#${v.list_name_encoded}`;
      a.className = `list-group-item list-group-item-action`;
      a.onclick = (event) => {
        event.target.classList.add("active");

        activeLink?.classList?.remove("active");
        activeLink = event.target;

        setBooks(v);
      };
      a.innerHTML = `${v.list_name}
      <p
        class="
            d-flex
            justify-content-between
            align-items-center
            m-0
            mt-2
        "
        >
        <span><i class="far fa-calendar-alt me-1"></i> ${v.newest_published_date}</span>
        <span class="badge bg-warning text-dark ms-3">${v.updated}</span>
        </p>`;

      list.appendChild(a);
    });

    setBooks(res.data.results[0]);
  } else {
    error.classList.remove("d-none");
  }
};

setList();

const getBooks = async (list_name_encoded) => {
  console.log(list_name_encoded);

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

const loading2 = document.getElementById("loading2");
const error2 = document.getElementById("error2");
const books = document.getElementById("books");
const listName = document.getElementById("list-name");

const setBooks = async (obj) => {
  console.log("list group: " + obj);

  books.innerHTML = "";

  loading2.classList.remove("d-none");
  error2.classList.add("d-none");
  books.classList.add("d-none");

  const res = await getBooks(obj.list_name_encoded);

  if (res.success) {
    listName.innerHTML = `Bo'lim: ${obj.list_name}`;

    books.classList.remove("d-none");
    console.log( res.data.results);
    res.data.results.books.map((v, i) => {
      const book = document.createElement("div");
      book.className = `col-sm-6 col-lg-4 col-xl-3 mb-3`;
      book.innerHTML = `
        <div class="rounded shadow bg-white p-3">
        <img
            src="${v.book_image}"
            alt=""
            class="w-100 rounded"
        />
        <p class="fw-bold mb-2 mt-4">${v.title}</p>
        <p class="text-secondary">author: ${v.author}</p>
        <p>Price: <span class="text-warning">${v.price}</span></p>
        <a
            href="${v.amazon_product_url}"
            class="btn btn-dark w-100 rounded"
        >
            Buy
        </a>
        <button class="btn btn-light dropdown-toggle w-100" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
        Learn more
        </button>
        <ul class="dropdown-menu">
          <li><a class="dropdown-item" href="learn-more.html#${ res.data.results.list_name_encoded}">Product details</a></li>
          <li><a class="dropdown-item" href="learn-more.html#${v.book_uri}">More about the author</a></li>
        </ul>
        </div>
      `;

      books.appendChild(book);
    });
  } else {
    error2.classList.remove("d-none");
  }

  loading2.classList.add("d-none");
  console.log(res);
};
